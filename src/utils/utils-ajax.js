
Sky.ajaxSettings={
	headers:{
		'X-Requested-With':'XMLHttpRequest'
	},
	processData:true
};
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
	Sky.parseQuery=function(str){
		var params=new URLSearchParams(str);
		var o = new Object();
		params.forEach(parseOne,o);
		return o;
	};
	function parseOne(value,key){
		key=key.replace(/\]$/,"");
		var keys=key.split(/\]?\[/);
		var cur=this;
		for(var i=0;i<keys.length;i++){
			var k=keys[i];
			var v;
			if(i<keys.length-1){
				if(k){
					v=cur[k];
					if(!v){v=cur[k]=new Object();}
					checkLength(cur,k);
				}else{
					v=new Object();
					push(cur,v);
				}
				cur=v;
			}else{
				if(k){
					cur[k]=value;
					checkLength(cur,k);
				}else{
					push(cur,value);
				}
			}
		}
	}
	function push(arrlike,value){
		if(arrlike.length){
			arrlike[arrlike.length]=value;
			arrlike.length++;
		}else{
			arrlike[0]=value;
			arrlike.length=1;
		}
	}
	function checkLength(arrLike,k){
		var i=parseFloat(k);
		if(Number.isInteger(i) && i>=0){
			arrLike.length=Math.max(i+1,arrLike.length);
		}
	}
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
					var vi=value[i];
					if(Sky.isObject(vi)){
						add(vi,i,key,params);
					}else{
						add(vi,"",key,params);
					}
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
				var vi=value[i];
				if(Sky.isObject(vi)){
					add(vi,i,prefix+"["+key+"]",params);
				}else{
					add(vi,"",prefix+"["+key+"]",params);
				}
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
	var targetUrl=options.url;
	var success=options.success;
	var error=options.error;
	var dataType=options.dataType;
	var complete=options.complete;
	var type=options.type?options.type:"GET";
	var data=options.data?options.data:null;
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
						if(error) error(xhr,xhr.status);
					} else {
						if(success) success(xhr.responseXML.lastChild,xhr.status,xhr);
					}
				}else if(dataType.toUpperCase() == 'JSON') {
					var data;
					try {
						data=JSON.parse(xhr.responseText);
					}catch(err) {
						if(error) error(xhr,xhr.status,err);
					}
					if(data){
						if(success) success(data,xhr.status,xhr);
					}
				}else{
					if(success) success(xhr.responseText,xhr.status,xhr);
				}
			}else if(error){
				if(error) error(xhr,xhr.status);
			}
			if(complete) complete(xhr,xhr.status);
			xhr.onreadystatechange=null;
			xhr=null;
		}
	};
	xhr.open(type, targetUrl, true);
	var headers=Sky.ajaxSettings.headers;
	for(var header in headers){
		xhr.setRequestHeader(header,headers[header]);
	}
	if(options.cache===false) xhr.setRequestHeader("If-Modified-Since","0");
	if(options.type!="GET"){
		var contentType=options.contentType;
		var data=options.data;
		if(data){
			if(Sky.isPlainObject(data)){
				if(Sky.ajaxSettings.processData){
					xhr.setRequestHeader('application/x-www-form-urlencoded');
					xhr.send(Sky.param(data));
				}else{
					xhr.setRequestHeader('application/json');
					xhr.send(JSON.stringify(data));
				}
			}else{//字符串 ， 二进制流 ， 文件等
				if(Sky.isString(data)){
					contentType='text/plain';
				}else if((data instanceof URLSearchParams) || (data instanceof FormData)){
					contentType='application/x-www-form-urlencoded';
				}
				xhr.setRequestHeader('Content-Type',contentType);
			}
		}
	}
	xhr.send(data);
};
Sky.get=function(targetUrl,data){
	if(data){
		if(Sky.isString(data)){
			targetUrl+="?"+data;
		}else{
			var url=new URL(targetUrl,location);
			if(data instanceof URLSearchParams){
				url.search="?"+data.toString();
			}else if(Sky.isPlainObject(data)){
				url.search="?"+Sky.param(data);
			}
			targetUrl=url.href;
		}
	}
	return new Promise(function(resolve, reject){
		Sky.ajax({
			'type' : "GET",
			'url' : targetUrl,
			'success' : resolve,
			'error' : reject
		});
	});
};
Sky.post=function(targetUrl,data){
	return new Promise(function(resolve, reject){
		Sky.ajax({
			'type' : "POST",
			'url' : targetUrl,
			'data' : data,
			'success' : resolve,
			'error' : reject
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