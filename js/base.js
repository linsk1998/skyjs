var Sky=function(arg1,arg2){
	if(Sky.isString(arg1)){
		if(arg2 && ('getElementsByTagName' in arg2)){
			return Sky.query(arg1,arg2);
		}
		if(arg1.match(/[\s>,#]+/)){
			return Sky.query(arg1);
		}
		return Sky.create(arg1);
	}
	if(Sky.isFunction(arg1)){
		Sky.ready().then(arg1);
	}
	return Sky.ele(arg1);
};
if(typeof $=="undefined"){
	$=Sky;
}
Sky.support={};
(function(){
	try{
		Sky.a.b.c();
	}catch(e){
		var stack=e.stack || e.sourceURL || e.stacktrace || '';
		Sky.support.stack=!!stack;
	}
	var userAgent = navigator.userAgent.toLowerCase();
	Sky.browser={
		version:(userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1],
		webkit:/webkit/.test( userAgent ),
		opera:/opera/.test( userAgent ),
		msie:/msie/.test( userAgent ) && !/opera/.test( userAgent ),
		firefox:/firefox/.test( userAgent ),
		safari:/safari/.test( userAgent ),
		chrome:/chrome/.test( userAgent ),
		android:/android/.test( userAgent ),
		ios:/(iphone|ipad|ipod)/.test( userAgent ),
		mobile:/mobile/.test( userAgent ),
		quirks:(document.compatMode == 'BackCompat')
	};
	var ie="ActiveXObject" in window;
	Sky.browser.ie5=ie&&!document.compatMode;//ie5及以下
	Sky.browser.ie6=ie&&!!document.compatMode&&!window.XMLHttpRequest;
	Sky.browser.ie7=ie&&!!window.XMLHttpRequest&&!document.querySelector;
	Sky.browser.ie8=ie&&!!document.querySelector&&!document.addEventListener;
	Sky.browser.ie9=ie&&!!document.addEventListener&&!window.atob;
	Sky.browser.ie10=ie&&!!window.atob&&!!window.attachEvent;
	Sky.browser.ie11=ie&&!!window.atob&&!window.attachEvent;
	if(Sky.browser.ie11){
		Sky.browser.ie=11;
	}else if(ie){
		Sky.browser.ie=parseInt(Sky.browser.version);
	}
})();

Sky.isArray=function(a){
	return Array.isArray(a);
};
Sky.isDate=function(obj){
	return Object.prototype.toString.call(obj)==='[object Date]';
};
Sky.isRegExp=function(obj){
	return Object.prototype.toString.call(obj)==='[object RegExp]';
};
Sky.isString=function(obj){
	return Object.prototype.toString.call(obj)==='[object String]';
};
Sky.isFunction=function(obj){
	return Object.prototype.toString.call(obj)==='[object Function]';
};
Sky.isNumber=function(obj){
	return Object.prototype.toString.call(obj)==='[object Number]';
};
Sky.isObject=function(obj){
	var type=typeof obj;
	if(type!=="object"){
		return false;
	}
	type=Object.prototype.toString.call(obj);
	switch(type){
		case '[object String]':
		case '[object Number]':
		case '[object Function]':
		case '[object Boolean]':
			return false;
	}
	return true;
};
Sky.isDefined=function(obj){
	return obj!==undefined;
};
Sky.isPlainObject=function(obj){
	var key;
	if(typeof obj !=="object"){
		return false;
	}
	if(obj.toString()!=='[object Object]'){
		return false;
	}
	var hasOwn=Object.prototype.hasOwnProperty;
	try{
		if(obj.constructor && obj.constructor!=Object){
			return false;
		}
	}catch(e){
		return false;
	}
	for( key in obj ){
		if(!hasOwn.call(obj,key)){
			return false;
		}
	}
	return true;
};
Sky.isArrayLike=function(obj){
	var length=obj.length;
	if(typeof length !="number" || length<0 || isNaN(length) || Math.ceil(length)!=length){
		return false;
	}
	return true;
};
Sky.isNumeric=function(obj){
	var n=parseFloat(obj);
	return !isNaN(n);
};
if(this.HTMLElement){
	Sky.isElement=function(obj){
		return obj instanceof HTMLElement;
	};
}else{
	Sky.isElement=function(obj){
		return obj?obj.nodeType===1:false;
	};
}
Sky.isEmpty=function(obj){
	if(obj==null) return true;
	if(Sky.isNumber(obj.length)){
		return !obj.length;
	}
	if(Sky.isNumber(obj.size)){
		return !obj.size;
	}
	if(Sky.isFunction(obj.size)){
		return !obj.size();
	}
	if(Sky.isFunction(obj.toArray)){
		return !obj.toArray().length;
	}
	return false;
};

if(!{toString: null}.propertyIsEnumerable('toString')){
	Sky.dontEnums = ["toString", "toLocaleString", "valueOf","hasOwnProperty", "isPrototypeOf","propertyIsEnumerable","constructor"];
	Sky.forIn=function(obj,fn){
		for(var key in obj) {
			if(key.startsWith("__")!=0 || typeof obj!=="unknown"){
				if(fn.call(obj,obj[key],key)===false){
					return false;
				}
			}
		}
		var nonEnumIdx=Sky.dontEnums.length;
		var constructor=obj.constructor;
		var proto=Sky.isFunction(constructor) && constructor.prototype || Object.prototype;
		//遍历nonEnumerableProps数组
		while (nonEnumIdx--) {
			var prop = Sky.dontEnums[nonEnumIdx];
			if(prop in obj && obj[prop]!==proto[prop]){
				if(fn.call(obj,obj[prop],prop)===false){
					return false;
				}
			}
		}
		return true;
	};
}else{
	Sky.forIn=function(obj,fn){
		for(var key in obj) {
			if(fn.call(obj,obj[key],key)===false){
				return false;
			}
		}
		return true;
	};
}
Sky.forOwn=function(obj,fn){
	return Sky.forIn(obj,function(value,key){
		if(Sky.hasOwn(obj,key)){
			if(fn.call(obj,obj[key],key)===false){
				return false;
			}
		}
	});
};
Sky.hasOwn=function(obj,key){
	if(obj.hasOwnProperty){
		return obj.hasOwnProperty(key);
	}
	return Object.prototype.hasOwnProperty.call(obj,key);
};
Sky.getCookie=function(name){
	var arr=document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if(arr != null) return decodeURIComponent(arr[2]); return null;
};
Sky.setCookie=function(name,value){
	var path="/";
	var seconds;
	var domain;
	var expires;
	if(arguments.length>2){
		for(var i=2;i<arguments.length;i++){
			if(Sky.isNumber(arguments[i])){
				seconds=arguments[i];
			}else if(Sky.isString(arguments[i])){
				if(arguments[i].indexOf(".")>=0){
					domain=arguments[i];
				}else if(arguments[i].indexOf("/")>=0){
					path=arguments[i];
				}
			}
		}
	}
	if(value == null || seconds <= 0) {
		value = '';
		seconds = -2592000;
	}
	if(!isNaN(seconds)){
		expires=new Date();
		expires.setTime(expires.getTime() + seconds * 1000);
	}
	document.cookie = name + '=' + encodeURIComponent(value)
		+ (expires ? '; expires=' + expires.toGMTString() : '')
		+ '; path=' + path
		+ (domain ? '; domain=' + domain : '')
};
Sky.support.VBScript=false;
if(window.execScript){
	window.execScript([
		'Function alert(msg)',
		'msgbox msg',
		'End Function' //去除弹窗的图标
	].join('\n'), 'VBScript');
	if(typeof alert=="unknown"){
		Sky.support.VBScript=true;
	}
}
Sky.noop=function(){};