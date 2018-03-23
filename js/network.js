
Sky.ajax=function(options){
	var targetUrl=options.url;
	var success=options.success;
	var error=options.error;
	var dataType=options.dataType?options.dataType:'auto';
	var complete=options.complete;
	var xhr=new XMLHttpRequest();
	if(options.timeout) xhr.timeout=options.timeout;
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 ) {
			if(xhr.status == 200 || xhr.status==0){//本地访问为0
				var returnType=xhr.getResponseHeader("Content-Type");
				if(dataType=="auto" && returnType){
					if(returnType.match(/\/json/i)){
						dataType="JSON";
					}else if(returnType.match(/\/xml/i)){
						dataType="XML";
					}
				}
				if(dataType.toUpperCase() == 'XML') {
					if(!xhr.responseXML || !xhr.responseXML.lastChild || xhr.responseXML.lastChild.localName == 'parsererror') {
						if(error) error.call(xhr,xhr.responseText);
					} else {
						success.call(xhr,xhr.responseXML.lastChild);
					}
				}else if(dataType.toUpperCase() == 'JSON') {
					var data;
					try {
						data=JSON.parse(xhr.responseText);
					}catch(err) {
						if(error) error.call(xhr,xhr.responseText);
					}
					if(data) success.call(xhr,data);
				}else{
					success.call(xhr,xhr.responseText);
				}
			}else if(error){
				error.call(xhr,xhr.responseText);
			}
			if(complete) complete.call(xhr,xhr.responseText);
		}
	};
	if(options.type && options.type.toUpperCase()=="POST"){
		var contentType=options.contentType;
		var data=options.data;
		xhr.open('POST', targetUrl,options.async!==false);
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		if(data){
			if(Sky.isPlainObject(data) || data instanceof Map){
				xhr.setRequestHeader('Content-Type',contentType || 'application/x-www-form-urlencoded');
				xhr.send(Sky.buildQuery(data));
			}else{//字符串 ， 二进制流 ， 文件等
				if(contentType){
					contentType && xhr.setRequestHeader('Content-Type',contentType);
				}else if(Sky.isString(data)){
					xhr.setRequestHeader('Content-Type','text/plain');
				}
				xhr.send(data);
			}
		}else{
			xhr.send(null);
		}
	}else{
		xhr.open('GET',targetUrl,options.async!==false);
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.send(null);
	}
};
Sky.get=function(targetUrl,success,datatype,error){
	Sky.ajax({
		'url' : targetUrl,
		'type' : "GET",
		'dataType' : datatype,
		'success' : success,
		'error' : error
	});
};
Sky.ajax.get=function(targetUrl,datatype){
	return new Promise(function(resolve, reject){
		Sky.ajax({
			'url' : targetUrl,
			'type' : "GET",
			'dataType' : datatype,
			'success' : function(){
				resolve();
			},
			'error' : function(){
				reject();
			}
		});
	});
};
Sky.post=function(targetUrl,data,success,datatype,error){
	Sky.ajax({
		'url' : targetUrl,
		'type' : "POST",
		'data' : data,
		'dataType' : datatype,
		'success' : success,
		'error' : error
	});
};
Sky.ajax.post=function(targetUrl,data,dataType,contentType){
	return new Promise(function(resolve, reject){
		Sky.ajax({
			'url' : targetUrl,
			'type' : "POST",
			'data' : data,
			'dataType' : dataType,
			'contentType':contentType,
			'success' : function(){
				resolve();
			},
			'error' : function(){
				reject();
			}
		});
	});
};
Sky.getJSONP=function(url, callback){
	var cbname="cb"+Sky.id();
	if(url.indexOf("=?")!=-1){
		url=url.replace("=?","="+cbname);
	}else{
		url+=cbname;
	}
	var script=document.createElement("script");
	if(document.addEventListener()){
		window[cbname]=function(response){
			try{
				callback(response);
			}finally{
				delete window[cbname];
				script.parentNode.removeChild(script);
			}
		};
	}else{
		window[cbname]=function(response){
			try{
				callback(response);
			}finally{
				window[cbname]=undefined;
				script.parentNode.removeChild(script);
			}
		};
	}
	script.src=url;
	document.body.appendChild(script);
};