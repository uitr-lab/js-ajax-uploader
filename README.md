# js-ajax-uploader




Add file drop listener to page and/or page elements and upload files to your upload handler ie: /your/upload

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


 - Supports multiple drop handler targets on a single page
 - Supports nested drop handler targets (ie folder/sub-folder structure)
