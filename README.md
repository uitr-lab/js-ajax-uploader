# js-ajax-uploader




Add file drop listener to page and upload files to your upload handler ie: /your/upload

```js

	(new FileDropTarget(document.body, {
	    url:"/your/upload/handler",
	    data:{
	        shareName:"extra-data" //extra data to send to server 
	    }
	})).on('progress',(progress)=>{
		
		
	}).on('upload', (results) =>{
	    // update UI
	});

```