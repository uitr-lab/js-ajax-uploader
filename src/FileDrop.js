import {
	EventEmitter
} from 'events';


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
				var targets = (this._targets || []).filter((t) => {
					return true;
				});

				if (targets.length == 1) {
					var callback = this._callbacks[this._targets.indexOf(targets[0])];
					callback(files);
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
		this.element = target;
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

}

window.FileDropTarget = FileDropTarget;