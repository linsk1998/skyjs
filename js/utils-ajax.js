
Sky.ajaxSettings={};
Sky.param=function(obj,traditional){
	if(traditional || Sky.ajaxSettings.traditional){
		var r=new URLSearchParams();
		var keys=Object.keys(obj);
		for(var i=0;i<keys.length;i++){
			var key=keys[i];
			r.append(key,obj[key]);
		}
		return r.toString();
	}
	return Sky.buildQuery(obj);
};
(function(){
	Sky.parseQuery=function(str){//TODO
		var arr;
		if(str.indexOf('?')!=-1){
			arr=str.split("?");
			str=arr[arr.length-1];
		}
		var o = new Object();
		var strs = str.split("&");
		for(var i = 0; i < strs.length; i ++) {
			arr=strs[i].split("=");
			if(arr.length!=2) break ;
			var key=arr[0],value=decodeURIComponent(arr[1]),name,k,v;
			if(arr=key.match(/(.*)\[\]$/)){
				name=arr[1];
				v=o[name];
				if(!v){
					o[name]=v=[];
				}
				v.push(value);
			}else if(arr=key.match(/(.*)\[([^\]]+)\]$/)){
				name=arr[1];
				k=arr[2];
				v=o[name];
				if(!v){
					o[name]=v={};
				}
				v[k]=value;
			}else{
				o[key]=value;
			}
		}
		return o;
	};
	Sky.buildQuery=function(obj){
		var params=new URLSearchParams();
		var keys=Object.keys(obj);
		var key,value;
		var i,j;
		for(j=0;j<keys.length;j++){
			key=keys[j];value=obj[key];
			if(value.toJSON) value=value.toJSON();
			if(Array.isArray(value)){
				for(i=0;i<value.length;i++){
					add(value[i],"",key,params);
				}
			}else if(Sky.isObject(value)){
				var keys=Object.keys(value);
				var k,v;
				for(i=0;i<keys.length;i++){
					k=keys[i];v=value[k];
					add(v,k,key,params);
				}
			}else{
				params.append(key,value);
			}
		}
		return params.toString();
	};
	function add(value,key,prefix,params){
		if(value.toJSON) value=value.toJSON();
		var i;
		if(Array.isArray(value)){
			for(i=0;i<value.length;i++){
				add(value[i],"",prefix+"["+key+"]",params);
			}
		}else if(Sky.isObject(value)){
			var keys=Object.keys(value);
			var k,v;
			for(i=0;i<keys.length;i++){
				k=keys[i];v=value[k];
				add(v,k,prefix+"["+key+"]",params);
			}
		}else{
			params.append(prefix+"["+key+"]",value);
		}
	}
})();
Sky.ajax=function(options){
	var dfd=Sky.Deferred();
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
						dfd.reject(xhr.responseText);
						if(error) error.call(xhr,xhr.responseText);
					} else {
						dfd.resolve(xhr.responseXML.lastChild);
						success.call(xhr,xhr.responseXML.lastChild);
					}
				}else if(dataType.toUpperCase() == 'JSON') {
					var data;
					try {
						data=JSON.parse(xhr.responseText);
					}catch(err) {
						dfd.reject(xhr.responseText);
						if(error) error.call(xhr,xhr.responseText);
					}
					if(data){
						dfd.resolve(data);
						success.call(xhr,data);
					}
				}else{
					dfd.resolve(xhr.responseText);
					success.call(xhr,xhr.responseText);
				}
			}else if(error){
				dfd.reject(xhr.responseText);
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
				xhr.send(Sky.param(data));
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
	return dfd;
};
Sky.get=function(targetUrl,success,datatype,error){
	return Sky.ajax({
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
	return Sky.ajax({
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
(function(){
	var i=0;
	Sky.getJSONP=function(url, callback){
		var cbname="cb"+(++i);
		var a=url.indexOf("?");
		var pathname=url.substring(0,a);
		var search=url.substring(a,url.length);
		search=search.replace("=?","=Sky."+cbname);
		url=pathname+search;

		var script=document.createElement("script");
		Sky[cbname]=function(response){
			try{
				callback(response);
			}finally{
				delete Sky[cbname];
				script.parentNode.removeChild(script);
				script=null;
			}
		};
		script.src=url;
		document.body.appendChild(script);
	};
})();