# js-ajax-uploader




Add file drop listener to page and/or page elements and upload files to your upload handler ie: /your/upload

## Simple Usage

```html
<script src="dist/file.js"></script>
```

```js

	var dropTarget= (new FileDropTarget(document.body, {
	    url:"/your/upload/handler",
	    data:{
	        shareName:"extra-data" //extra data to send to server 
	    }
	})).on('progress',(progress)=>{
		
		
	}).on('upload', (results) =>{
	    // update UI
	});
	
	
	
	
	
	//...
	
	
	// You can also re-use the uploader to upload directly from input element
	// <input type="file" name="" onchange="dropTarget.uploadFiles(this.files, this);" />
	

```


 - Supports multiple drop handler targets on a single page
 - Target elements or css selectors 
 - Supports nested drop handler targets (ie folder/sub-folder structure)
