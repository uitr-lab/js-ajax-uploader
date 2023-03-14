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

		document.body.ondragover = (ev) => {
			ev.preventDefault();
			console.log(ev);
		};
		document.body.ondragleave = (ev) => {
			console.log(ev);
		};
		document.body.ondrop = (ev) => {
			ev.preventDefault();
			var files = Array.prototype.slice.call(ev.dataTransfer.items, 0).filter((item) =>{
				return item.kind == "file";
			}).map((item)=>{
				return item.getAsFile(); 
			});


			if (files.length > 0) {

				var targets = (this._targets || []).filter((t)=>{
					return t.contains(ev.target);
				});

				if (targets.length == 1) {
					var callback = this._callbacks[this._targets.indexOf(targets[0])];
					callback(files);
					return;
				}


				if (targets.length > 1) {


					var containers=targets.map((t)=>{
						t.getContainer(ev.target);
					});

					//TODO select the inner most container;
					var bestContainer=(new DropTarget()).deepest(containers);
					var index=containers.indexOf(bestContainer);

					var callback = this._callbacks[this._targets.indexOf(targets[index])];
					callback(files);
					return;
				}




			}

		};


	}


	addTarget(item, callback) {


		this._targets = this._targets || [];
		this._callbacks = this._callbacks || [];

		this._targets.push(item);
		this._callbacks.push(callback);

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



			Promise.all(files.map((file) => {
				const formData = new FormData();
				formData.append("the_file", file);
				if (this.options.data) {
					var obj = JSON.parse(JSON.stringify(this.options.data));
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