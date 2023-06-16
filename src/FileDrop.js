import {
	EventEmitter
} from 'events';



class DropTarget{

	deepest(validTargets){
		validTargets=validTargets.filter((target)=>{
			/**
			 * remove any targets that contain another valid target (only allow deepest nested item)
			 */
			return validTargets.filter((otherTarget)=>{
				return target!==otherTarget&&target.contains(otherTarget);
			}).length==0
		});

		return validTargets[0];

	}

}

export class FileDropPageListener extends EventEmitter {

	constructor() {
		super();


		var activeTarget=null;
		var container=null;


		document.body.ondragover = (ev) => {
			ev.preventDefault();
			console.log(ev);


			var target=this.getTarget(ev.target);
			

			if(!target){

				if(activeTarget){
					activeTarget.classList.remove('drop-target');
					activeTarget=null;
				}
				return;
			}


			container=target.getContainer(target);
			if(container!==activeTarget){

				if(activeTarget){
					activeTarget.classList.remove('drop-target');
				}

				activeTarget=container;
				activeTarget.classList.add('drop-target');
			}
			


		};
		document.body.ondragleave = (ev) => {
			console.log(ev);
		};
		document.body.ondrop = (ev) => {
			ev.preventDefault();
			var files = Array.prototype.slice.call(ev.dataTransfer.items, 0).filter((item) =>{
				return item.kind == "file";
			}).map((item)=>{
 
				if(item.getAsFileSystemHandle){
					return item.getAsFileSystemHandle();
				}

				// No support for uploading folders
				return item.getAsFile(); 
			});

			
			
			this.uploadFiles(files, ev.target);
			


			if(activeTarget){
				activeTarget.classList.remove('drop-target');
				activeTarget=null;
			}

		};


	}

	_resolveFiles(files){
		return new Promise((resolve, reject)=>{

			if(files[0] instanceof Promise){
				Promise.all(files).then((fileHandles)=>{

					var actualFiles=this._flattenHandles(fileHandles).then((actualFiles)=>{
						if(actualFiles.length>0){
							Promise.all(actualFiles.files||actualFiles).then(resolve).catch(reject);
							return;
						}
					})

					return;

					

				});

				
			}else{
				resolve(files);
			}



		})
	}

	_flattenHandles(fileHandles, path){
		var actualFiles=[];

		if(fileHandles[0] instanceof Promise){
			return Promise.all(fileHandles).then((fileHandles)=>{
				return this._flattenHandles(fileHandles, path);
			});
		}

		return Promise.all(fileHandles.map((handle, i)=>{
			if(handle.kind=="file"){
				actualFiles.push(handle.getFile().then((file)=>{

				
					return {
						file:file,
						path:path||"/"
					};
					
				}));
				return Promise.resolve(true);
			}

			if(handle.kind=="directory"){

			
				
				return this._entries(handle).then((entries)=>{

					return this._flattenHandles(entries, (path||"")+"/"+handle.name).then((handles)=>{
						actualFiles=actualFiles.concat(handles);
						return handles;
					})
				});
			}

		})).then(()=>{
			return actualFiles;
		});

	}

	_entries(folderHandle){

		var interator=folderHandle.entries();
		var items=[];
		var _iterate=(entry)=>{

			return entry.then((item)=>{
				if(item.done){
					return true;
				}
				items.push(item.value[1]);
				return _iterate(interator.next());
			});

		}

		return _iterate(interator.next()).then(()=>{
			return items;
		})
		
		
		
	}

	addTarget(item, callback) {


		this._targets = this._targets || [];
		this._callbacks = this._callbacks || [];

		this._targets.push(item);
		this._callbacks.push(callback);

	}


	getTarget(target){



		var targets = (this._targets || []).filter((t)=>{
			return t.contains(target);
		});

		if (targets.length == 1) {
			return targets[0];
		}


		if (targets.length > 1) {


			var containers=targets.map((t)=>{
				return t.getContainer(target);
			});

			//TODO select the inner most container;
			var bestContainer=(new DropTarget()).deepest(containers);
			var index=containers.indexOf(bestContainer);

			return targets[index];
		}


		return null;

	}


	uploadFiles(files, target){

		var files=Array.prototype.slice.call(files, 0);

		if (files.length > 0) {

			this._resolveFiles(files).then((resolvedFiles)=>{
			

				var targets = (this._targets || []).filter((t)=>{
					return t.contains(target);
				});

				if (targets.length == 1) {
					var callback = this._callbacks[this._targets.indexOf(targets[0])];
					callback(resolvedFiles);
					return;
				}


				if (targets.length > 1) {


					var containers=targets.map((t)=>{
						return t.getContainer(target);
					});

					//TODO select the inner most container;
					var bestContainer=(new DropTarget()).deepest(containers);
					var index=containers.indexOf(bestContainer);

					var callback = this._callbacks[this._targets.indexOf(targets[index])];
					callback(resolvedFiles);
					return;
				}
			});


		}

	}
}

export class FileDropTarget extends EventEmitter {

	static FileDropPageListener;

	constructor(target, options) {
		super();
		this.elementOrSelector = target;
		this.options = options

		if (!FileDropTarget.FileDropPageListener) {
			FileDropTarget.FileDropPageListener = new FileDropPageListener();
		}

		FileDropTarget.FileDropPageListener.addTarget(this, (files) => {


			this.emit('start', files);
			Promise.all(files.map((fileInfo) => {
				const formData = new FormData();
				formData.append("the_file", fileInfo.file||fileInfo);
				if (this.options.data) {

					var data=this.options.data;

					if(typeof data=='function'){
						data=data(this, fileInfo);
					}

					//remove references, ensure json compatible
					var obj = JSON.parse(JSON.stringify(data));
					Object.keys(obj).forEach((key) => {
						formData.append(key, obj[key]);
					});
				}

				formData.append('submit', '');


				return fetch(this.options.url, {
						method: "POST",
						body: formData,
					})
					.then((response) => response.json())
					.then((result) => {
						console.log("Success:", result);
						return result;
					})
					.catch((error) => {
						console.error(error);
					});

			})).then((results)=>{
				this.emit('upload', results);
			});


		});
	}
	getTargets(){	

	
		if(typeof this.elementOrSelector=='string'){

			return Array.prototype.slice.call(document.querySelectorAll(this.elementOrSelector));
		}

		return [this.elementOrSelector];
	}	

	uploadFiles(files, target){
		FileDropTarget.FileDropPageListener.uploadFiles(files, target||document.body);
	}

	getContainer(targetEl){
		return this._match;
	}

	contains(targetEl){

		var matches=this.getTargets().filter((el)=>{
			return el.contains(targetEl);
		});


		if(matches.length==1){
			this._match=matches[0];
			return true;
		}

		if(matches.length>=1){
			//TODO: select the most inner most element 
			this._match=(new DropTarget()).deepest(matches);
			return true;
		}

		return false;




	}

}

window.FileDropTarget = FileDropTarget;