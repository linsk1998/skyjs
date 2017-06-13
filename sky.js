var Sky=function(arg1,arg2){
	if(Sky.isString(arg1)){
		if(arg2 && ('getElementsByName' in arg2)){
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
		a.b.c();
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
	if(ie) Sky.browser.ie=parseInt(Sky.browser.version);
})();
if (!Object.keys) {
	Object.keys = function(obj) {
		var result = [], prop;
		for(prop in obj) {
			if(Sky.hasOwn(obj, prop)) {
				result.push(prop);
			}
		}
		return result;
	};
}
Sky.support.defineProperty=!!Object.defineProperty && !!document.addEventListener;
if(Sky.support.__defineSetter__){
	Sky.support.defineProperty=true;
	if (!Object.defineProperty) {
		Object.defineProperty=function(obj, prop, descriptor){
			if(descriptor.get) obj.__defineGetter__(prop,descriptor.get);
			if(descriptor.set) obj.__defineSetter__(prop,descriptor.set);
		};
	}
}
//判断一个元素在数组中的位置
if(!Array.prototype.indexOf){
	Array.prototype.indexOf=function(e,fromIndex){
		fromIndex=isNaN(fromIndex)?0:fromIndex;
		for(var i=fromIndex,j;i<this.length; i++){
			j=this[i];
			if(j===e){return i;}
		}
		return -1;
	};
}
if (!Array.prototype.lastIndexOf) {
	Array.prototype.lastIndexOf = function(e, fromIndex) {
		fromIndex=isNaN(fromIndex)?this.length-1:fromIndex;
		for (var i=fromIndex,j; i<this.length; i--) {
			j=this[i];
			if(j===e){return i;}
		}
		return -1;
	};
}
//遍历数组
if(!Array.prototype.forEach ){
	Array.prototype.forEach =function(callback, thisArg){
		for(var i=0,j; i<this.length; i++){
			j=this[i];
			callback.call(thisArg,j,i,this);
		}
	};
}
if (!Array.prototype.map) {
	Array.prototype.map = function(fn, context) {
		var arr = [];
		for (var k = 0, length = this.length; k < length; k++) {
			arr.push(fn.call(context, this[k], k, this));
		}
		return arr;
	};
}
if (!Array.prototype.filter) {
	Array.prototype.filter = function(fn, context) {
		var arr = [];
		for (var k = 0, length = this.length; k < length; k++) {
			fn.call(context, this[k], k, this) && arr.push(this[k]);
		}
		return arr;
	};
}
if (!Array.prototype.some) {
	Array.prototype.some = function(fn, context) {
		var passed = false;
		for (var k = 0, length = this.length; k < length; k++) {
			if (passed === true) break;
			passed = !!fn.call(context, this[k], k, this);
		}
		return passed;
	};
}
if (!Array.prototype.every) {
	Array.prototype.every = function(fn, context) {
		var passed = true;
		for (var k = 0, length = this.length; k < length; k++) {
			if (passed === false) break;
			passed = !!fn.call(context, this[k], k, this);
		}
		return passed;
	};
}
/** 时间对象的格式化; **/
/* eg:format="%Y-%m-%d %H:%M:%S"; */
if (!Date.prototype.toLocaleFormat) {//部分浏览器支持
	Date.prototype.toLocaleFormat = function(format) {
		var Y=this.getFullYear();
		var M=Sky.pad(this.getMonth()+1,2);
		var D=Sky.pad(this.getDate(),2);
		var h=Sky.pad(this.getHours(),2);
		var m=Sky.pad(this.getMinutes(),2);
		var s=Sky.pad(this.getSeconds(),2);
		var o={
			"%x":Y+"/"+M+"/"+D,
			"%X":h+":"+m+":"+s,
			"%Y":Y,
			"%y":Sky.pad(this.getYear()%100,2),
			"%m":M,
			"%e":this.getDate(),
			"%d":D,
			"%H":h,
			"%i":Sky.pad(this.getHours()%12,2),
			"%M":m,
			"%S":s,
			"%p":this.getHours()%12>1?"PM":"AM",
			"%%":"%"
		};
		o["%T"]=o["%X"];
		return format.replace(/%[xXTYymedHiMSp%]/g,function(word){
			for(var k in o){
				if(k==word){
					return o[k];
				}
			}
			return word;
		});
	};
}
if (!Date.prototype.toISOString){//部分浏览器支持
	(function(){
		function pad(number) {
			if(number<10){
				return '0'+number;
			}
			return number;
		}
		Date.prototype.toISOString = function() {
			return this.getUTCFullYear()+
				'-'+pad(this.getUTCMonth()+1)+
				'-'+pad( this.getUTCDate() ) +
				'T'+pad( this.getUTCHours() ) +
				':'+pad( this.getUTCMinutes() ) +
				':'+pad( this.getUTCSeconds() ) +
				'.'+Sky.pad(this.getUTCMilliseconds(),3)+'Z';
		};
	})();
}
if(!Date.prototype.toJSON){
	Date.prototype.toJSON=Date.prototype.toISOString;
}
if(new Date().toLocaleString().match(/[a-z]/i)){//谷歌浏览器，360用谷歌内核，会显示成英文
	Date.prototype.toLocaleString = function() {
		return this.toLocaleFormat("%Y-%m-%d %H:%M:%S");
	};
	Date.prototype.toLocaleDateString = function() {
		return this.toLocaleFormat("%Y-%m-%d");
	};
	Date.prototype.toLocaleTimeString = function() {
		return this.toLocaleFormat("%H:%M:%S");
	};
}
/* eg:format="yyyy-MM-dd HH:mm:ss.SSS"; */
Date.prototype.format=function(format){//自己加的，没有浏览器支持
	format=format.replace(/yyyy/gi,this.getFullYear())
		.replace(/yy/gi,Sky.pad(this.getYear()%100,2))
		.replace(/MM/g,Sky.pad(this.getMonth()+1,2))
		.replace(/M/g,this.getMonth()+1)
		.replace(/dd/g,Sky.pad(this.getDate(),2))
		.replace(/d/g,this.getDate())
		.replace(/HH/g,Sky.pad(this.getHours(),2))
		.replace(/H/g,this.getHours())
		.replace(/hh/g,Sky.pad(this.getHours()%12,2))
		.replace(/h/g,this.getHours()%12)
		.replace(/mm/g,Sky.pad(this.getMinutes(),2))
		.replace(/m/g,this.getMinutes())
		.replace(/ss/g,Sky.pad(this.getSeconds(),2))
		.replace(/s/g,this.getSeconds())
		.replace(/sss/g,Sky.pad(this.getMilliseconds(),3))
		.replace(/a/g,this.getHours()%12>1?"PM":"AM")
		.replace(/S+/g,Sky.pad(this.getMilliseconds(),3));
	return format;
};
if(!Date.now){
	Date.now=function(){
		return new Date().getTime();
	};
}
document.head=document.getElementsByTagName("head")[0];
/** 判断一个节点后代是否包含另一个节点 **/
if(window.Node && Node.prototype && !Node.prototype.contains){
	Node.prototype.contains=function(arg){
		return !!(this.compareDocumentPosition(arg) & 16);
	}
}
if(!document.contains){
	document.contains=function(ele){
		var i,arr=document.all;
		for(i=0;i<arr.length;i++){
			if(arr[i]===ele){
				return true;
			}
		}
		return false;
	};
}
if(window.HTMLElement && !document.head.children) {
	HTMLElement.prototype.__defineGetter__("children", function() {
		var a=[];
		for(var i=0; i<this.childNodes.length; i++){
			var n=this.childNodes[i];
			if(n.nodeType==1){
				a.push(n);
			}
		}
		return a;
	});
}
//删除左右两端的空格
if(!String.prototype.trim){
	String.prototype.trim=function() {
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,'');
	};
}
if(!String.prototype.startsWith){
	String.prototype.startsWith=function(prefix,position){
		position=position?position:0;
		return this.slice(position, prefix.length) === prefix;
	};
}
if(!String.prototype.endsWith){
	String.prototype.endsWith=function(prefix,position){
		var length=prefix.length;
		position=position<length?position:this.length;
		return this.slice(position-length, position) === prefix;
	};
}
if(!String.prototype.includes) {
	String.prototype.includes = function(search, start) {
		if(typeof start!=='number'){
			start=0;
		}
		if(start+search.length>this.length){
			return false;
		}else{
			return this.indexOf(search, start)!==-1;
		}
	};
}
if(!String.prototype.repeat){
	String.prototype.repeat=function(count){
		if(count<0){
			throw 'RangeError repeat count must be non-negative';
		}
		if(count==Number.POSITIVE_INFINITY){
			throw 'RangeError repeat count must be less than infinity';
		}
		return new Array(count+1).join(this);
	};
}
if(!String.prototype.padStart){
	String.prototype.padStart=function(targetLength,padString){
		var x=targetLength-this.length;
		if(x<0) return this+"";
		if(!padString) padString=" ";
		return padString.repeat(Math.ceil(x/padString.length)).substr(0,x)+this;
	};
}
if(!String.prototype.padEnd){
	String.prototype.padEnd=function(targetLength,padString){
		var x=targetLength-this.length;
		if(x<0) return this+"";
		if(!padString) padString=" ";
		return this+padString.repeat(Math.ceil(x/padString.length)).substr(0,x);
	};
}
String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
	return this.replace(new RegExp(Sky.escapeRegExp(reallyDo), (ignoreCase ? "gi": "g")), replaceWith);
};
Math.log2 = Math.log2 || function(n){ return Math.log(n) / Math.log(2); };
if (!Function.prototype.bind){
	Function.prototype.bind=function(context){
		var self =this,args=Array.prototype.slice.call(arguments);
		return function(){
			return self.apply(context,args.slice(1));
		};
	};
}
Sky.isArray=function(obj){
	return Object.prototype.toString.call(obj)==='[object Array]';
};
if(!Array.isArray){
	Array.isArray=Sky.isArray;
}
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
	if(type=='[object String]' || type=='[object Number]' || type=='[object Function]' || type=='[object Boolean]'){
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
if(window.HTMLElement){
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
if(!window.Set){
	window.Set=function() {
		this.items=[];
		this.size=0;
	};
	Set.prototype.has=function(value){
		return this.items.indexOf(value)>=0;
	};
	Set.prototype.add=function(value) {
		if(!this.has(value)) {
			this.items.push(value);
			this.size=this.items.length;
		}
		return this;
	};
	//noinspection Deprecation
	Set.prototype['delete']=function(value){
		var i=this.items.indexOf(value);
		if(i>=0){
			this.items.splice(i,1);
			this.size=this.items.length;
			return true;
		}
		return false;
	};
	Set.prototype.clear=function(){
		this.items=[];
		this.size=0;
	};
	Set.prototype.forEach=function(callback,thisArg){
		for(var i=0,j;i<this.size; i++){
			j=this.items[i];
			callback.call(thisArg,j,j,this);
		}
	};
	Set.prototype.toArray=function(){
		return this.items.slice(0);
	};
}
if(!Set.prototype.remove){
	Set.prototype.remove=Set.prototype['delete'];
}
if(!Set.prototype.toArray){
	Set.prototype.toArray=function(){
		var a=[];
		this.forEach(function(item){
			a.push(item);
		});
		return a;
	};
}
if(!Set.prototype.addAll){
	Set.prototype.addAll=function(data){
		if(data.forEach){
			data.forEach(function(item){
				this.add(item);
			},this);
		}
		return this;
	};
}
if(!Set.prototype.removeAll){
	Set.prototype.removeAll=function(data){
		if(data.forEach){
			data.forEach(function(item){
				this.remove(item);
			},this);
		}
		return this;
	};
}
if(!Set.prototype.retainAll){
	Set.prototype.retainAll=function(data){
		this.forEach(function(item){
			if(data.has){
				if(!data.has(item)) this.remove(item);
			}else if(data.indexOf){
				if(data.indexOf(item)<0) this.remove(item);
			}
		},this);
		return this;
	};
}
if(!Set.prototype.toArray){
	Set.prototype.toArray=function(){
		var r=[];
		this.forEach(function(item){
			r.push(item);
		});
		return r;
	};
}
if(!window.console){
	window.console={};
	if(window.Debug){
		console.log=console.info=console.error=console.warn=function(data){
			window.status=data;
			Debug.writeln(data);
		};
	}else{
		console.log=console.info=console.error=console.warn=function(data){
			window.status=data;
		};
	}
}
if(!window.JSON){
	Sky.support.JSON=false;
	window.JSON={
		'stringify':function(obj){
			switch(obj){
				case null:
					return "null";
				case false:
				case true:
					return obj;
					break;
				default:
					var type=Object.prototype.toString.call(obj);
					switch(type){
						case '[object String]':
							return '"'+Sky.escapeString(obj)+'"';
						case '[object Number]':
							return isNaN(obj)?"null":obj.toString();
						case '[object Array]':
							return "["+obj.map(JSON.stringify).join(",")+"]";
						default:
							if(Sky.isFunction(obj.toJSON)){
								return JSON.stringify(obj.toJSON());
							}
							var items=[];
							for(var k in obj){
								if(Sky.hasOwn(obj,k)){
									var value=obj[k];
									if(value!==undefined){
										if(!Sky.isFunction(value)){
											items.push('"'+Sky.escapeString(k)+'":'+JSON.stringify(value));
										}
									}
								}
							}
							return "{"+items.join(",")+"}";
					}
			}
		},
		'parse':function(str){
			return eval('('+str+')');
		}
	};
}
if (!window.DOMParser){
	Sky.support.DOMParser=false;
	DOMParser=function(){};
	DOMParser.prototype.parseFromString=function(xmlStr){
		var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = "false";
		xmlDoc.loadXML(xmlStr);
		return xmlDoc;
	};
}
if(!this.Promise){
	(function(global){
		var PENDING = 'pending';
		var SEALED = 'sealed';
		var FULFILLED = 'fulfilled';
		var REJECTED = 'rejected';

// async calls
		var asyncSetTimer = typeof setImmediate !== 'undefined' ? setImmediate : setTimeout;
		var asyncQueue = [];
		var asyncTimer;

		function asyncFlush(){
			// run promise callbacks
			for (var i = 0; i < asyncQueue.length; i++)
				asyncQueue[i][0](asyncQueue[i][1]);
			// reset async asyncQueue
			asyncQueue = [];
			asyncTimer = false;
		}
		function asyncCall(callback, arg){
			asyncQueue.push([callback, arg]);
			if (!asyncTimer){
				asyncTimer = true;
				asyncSetTimer(asyncFlush, 0);
			}
		}
		function invokeResolver(resolver, promise) {
			function resolvePromise(value) {
				resolve(promise, value);
			}
			function rejectPromise(reason) {
				reject(promise, reason);
			}
			try {
				resolver(resolvePromise, rejectPromise);
			} catch(e) {
				console.error(e);
				rejectPromise(e);
			}
		}
		function invokeCallback(subscriber){
			var owner = subscriber.owner;
			var settled = owner.state_;
			var value = owner.data_;
			var callback = subscriber[settled];
			var promise = subscriber.then;
			if (typeof callback === 'function'){
				settled = FULFILLED;
				try {
					value = callback(value);
				} catch(e) {
					console.error(e);
					reject(promise, e);
				}
			}
			if (!handleThenable(promise, value)){
				if (settled === FULFILLED)
					resolve(promise, value);

				if (settled === REJECTED)
					reject(promise, value);
			}
		}
		function handleThenable(promise, value) {
			var resolved;
			try {
				if (promise === value)
					throw new TypeError('A promises callback cannot return that same promise.');

				if (value && (typeof value === 'function' || typeof value === 'object')){
					var then = value.then;  // then should be retrived only once
					if (typeof then === 'function'){
						then.call(value, function(val){
							if (!resolved){
								resolved = true;
								if (value !== val)
									resolve(promise, val);
								else
									fulfill(promise, val);
							}
						}, function(reason){
							if (!resolved){
								resolved = true;
								reject(promise, reason);
							}
						});
						return true;
					}
				}
			} catch (e) {
				if (!resolved)
					reject(promise, e);
				return true;
			}
			return false;
		}
		function resolve(promise, value){
			if (promise === value || !handleThenable(promise, value))
				fulfill(promise, value);
		}
		function fulfill(promise, value){
			if (promise.state_ === PENDING){
				promise.state_ = SEALED;
				promise.data_ = value;
				asyncCall(publishFulfillment, promise);
			}
		}
		function reject(promise, reason){
			if (promise.state_ === PENDING){
				promise.state_ = SEALED;
				promise.data_ = reason;

				asyncCall(publishRejection, promise);
			}
		}
		function publish(promise) {
			var callbacks = promise.then_;
			promise.then_ = undefined;
			for (var i = 0; i < callbacks.length; i++) {
				invokeCallback(callbacks[i]);
			}
		}
		function publishFulfillment(promise){
			promise.state_ = FULFILLED;
			publish(promise);
		}
		function publishRejection(promise){
			promise.state_ = REJECTED;
			publish(promise);
		}
		function Promise(resolver){
			if (typeof resolver !== 'function')
				throw new TypeError('Promise constructor takes a function argument');
			if (this instanceof Promise === false)
				throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');
			this.then_ = [];
			invokeResolver(resolver, this);
		}
		Promise.prototype = {
			constructor: Promise,
			state_: PENDING,
			then_: null,
			data_: undefined,
			then: function(onFulfillment, onRejection){
				var subscriber = {
					owner: this,
					then: new this.constructor(Sky.noop),
					fulfilled: onFulfillment,
					rejected: onRejection
				};
				if (this.state_ === FULFILLED || this.state_ === REJECTED){
					// already resolved, call callback async
					asyncCall(invokeCallback, subscriber);
				}else{
					this.then_.push(subscriber);
				}
				return subscriber.then;
			}
		};
		global.Promise=Promise;
	})(this);
	Promise.all=function(promises){
		if (!Sky.isArray(promises)) {
			throw new TypeError('You must pass an array to all.');
		}
		return new Promise(function(resolve,reject){
			var c=0;
			promises.forEach(function(one){
				one.then(function(){
					c++;
					if(c>=promises.length){
						resolve();
					}
				},function(){
					reject();
				});
			});
		});
	};
	Promise.race=function(promises){
		if (!Sky.isArray(promises)) {
			throw new TypeError('You must pass an array to all.');
		}
		return new Promise(function(resolve,reject){
			promises.forEach(function(one){
				one.then(function(){
					resolve();
				},function(){
					reject();
				});
			});
		});
	};
	Promise.resolve=function(arg){
		return new Promise(function(resolve,reject){
			resolve(arg)
		});
	};
	Promise.reject=function(arg){
		return Promise(function(resolve,reject){
			reject(arg)
		});
	};
}
Promise.prototype["catch"]=function(fail){
	console.warn("catch is incompatible. Please use then(undefined,onRejected) instead.");
	this.then(undefined,fail);
};
var StringBuilder;
if(!-[1,]){//ie6-8
	StringBuilder=function() {
		this._source=new Array();
	};
	StringBuilder.prototype.append = function(str){
		this._source.push(str);
	}
	StringBuilder.prototype.toString = function(){
		return this._source.join("");
	}
}else{
	StringBuilder=function() {
		this._source="";
	};
	StringBuilder.prototype.append = function(str){
		this._source+=str;
	}
	StringBuilder.prototype.toString = function(){
		return this._source;
	}
}
Sky.getCookie=function(name){
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null) return decodeURIComponent(arr[2]); return null;
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
if(!window.localStorage){
	Sky.support.localStorage=false;
	localStorage=new function(){
		var ele=document.createElement("localStorage");
		if(ele.addBehavior){
			ele.addBehavior("#default#userData");
			var head=document.documentElement.firstChild;
			head.appendChild(ele);
			this.getItem=function(key){
				ele.load("localStorage");
				return ele.getAttribute(key);
			};
			this.setItem=function(key,value){
				ele.setAttribute(key,value+"");
				ele.save("localStorage");
			};
			this.removeItem=function(key){
				ele.removeAttribute(key);
				ele.save("localStorage");
			};
		}
	}();
}
if(!window.sessionStorage){
	Sky.support.sessionStorage=false;
	sessionStorage=new function(){
		var ele=document.createElement("sessionStorage");
		var sessionId=Sky.getCookie("JSESSIONID");
		if(!sessionId){
			sessionId=Math.random()+"";
			Sky.setCookie("JSESSIONID",sessionId);
		}
		if(ele.addBehavior){
			ele.addBehavior("#default#userData");
			var head=document.documentElement.firstChild;
			head.appendChild(ele);
			this.getItem=function(key){
				ele.load(sessionId);
				return ele.getAttribute(key);
			};
			this.setItem=function(key,value){
				ele.setAttribute(key,value+"");
				ele.save(sessionId);
			};
			this.removeItem=function(key){
				ele.removeAttribute(key);
				ele.save(sessionId);
			};
		}
	}();
}
Sky.clearSelect="getSelection" in window ? function(){
	window.getSelection().removeAllRanges();
} : function(){
	document.selection.empty();
};
/*<a title="设为首页" onclick="this.style.behavior='url(#default#homepage)'; this.setHomePage('http://'+window.location.host);" href="javascript:void(0);">设为首页</a>
<a onclick="Sky.addFavorite('http://'+window.location.host,'站名');" href="javascript:void 0;">加入收藏</a> <a onclick="Sky.addFavorite(window.location,document.title)">加入收藏</a>*/
Sky.addFavorite=function(sURL, sTitle){
	try{
		window.external.addFavorite(sURL, sTitle);
	}catch (e){
		try{
			window.sidebar.addPanel(sTitle, sURL, "");
		}catch (e){
			if(Sky.browser.moblie){
				alert("请点击菜单上的“☆”加入收藏");
			}else{
				alert("\u52a0\u5165\u6536\u85cf\u5931\u8d25\uff0c\u8bf7\u4f7f\u7528Ctrl+D\u8fdb\u884c\u6dfb\u52a0");
			}
		}
	}
};
Sky.setHome=function(ele,url){
	ele.onclick=function(){
		try{
			this.style.behavior='url(#default#homepage)';
			this.setHomePage(url);
			return false;
		}catch(e){
			if('netscape' in window){
				try{
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				}catch(e){
					alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
					return false;
				}
			}
		}
	};
};
Sky.copyToClipboard=function(txt){
	if(window.clipboardData){
		try{
			window.clipboardData.setData("Text",txt);
			return ;
		}catch(e){
		}
	}
	var tip=Sky.browser.moblie?"长按复制到剪贴板：":"Ctrl+C复制到剪贴板：";
	prompt(tip,txt);
};
//document.getElementById("text").select();
//document.execCommand("copy",false,null);
//开头补零
Sky.pad=function(value,width,chars){
	if(!chars){chars=" ";}
	if(Sky.isNumber(value)){
		chars="0";
	}
	value+='';
	return value.padStart(width,chars);
};
//清除HTML代码
Sky.escapeHtml=function(str) {
	return str.replace(/&/g,'&amp;')
		.replace(/</g,'&lt;')
		.replace(/>/g,'&gt;');
};
Sky.escapeAttribute=function(str,quot){
	var esc=Sky.escapeHtml(str);
	if(!quot || quot=='"'){
		return esc.replace(/"/g,'&quot;');
	}else{
		return esc.replaceAll(quot.charAt(0),'&#'+quot.charCodeAt(0)+";");
	}
};
(function(){
	var div=document.createElement('div');
	var htmlEscapes={
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;',
		'`': '&#96;'
	};
	Sky.escape=function(text){
		return text.replace(/[&<>"'`]/g,function(i){
			return htmlEscapes[i];
		});
	};
	Sky.unescape=function(html){
		div.innerHTML=html;
		return div.innerText || div.textContent ;
	};
})();
Sky.escapeString=function(str) {
	var rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	rx_escapable.lastIndex = 0;
	return rx_escapable.test(str)
		? str.replace(rx_escapable, function(a) {
		var meta = {
			"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r": "\\r",	"\"": "\\\"","\\": "\\\\"
		};
		var c = meta[a];
		return typeof c === "string"
			? c
			: "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
	}): str;
};
Sky.escapeRegExp=function(str){
	if(str){
		var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g;
		reRegExpChars.lastIndex = 0;
		return (reRegExpChars.test(str))
			? str.replace(reRegExpChars, function(chr, leadingChar, whitespaceChar) {
			if (leadingChar) {
				var regexpEscapes = {
					'0': 'x30', '1': 'x31', '2': 'x32', '3': 'x33', '4': 'x34',
					'5': 'x35', '6': 'x36', '7': 'x37', '8': 'x38', '9': 'x39',
					'A': 'x41', 'B': 'x42', 'C': 'x43', 'D': 'x44', 'E': 'x45', 'F': 'x46',
					'a': 'x61', 'b': 'x62', 'c': 'x63', 'd': 'x64', 'e': 'x65', 'f': 'x66',
					'n': 'x6e', 'r': 'x72', 't': 'x74', 'u': 'x75', 'v': 'x76', 'x': 'x78'
				};
				chr = regexpEscapes[chr];
			} else if (whitespaceChar) {
				var stringEscapes = {
					'\\': '\\',
					"'": "'",
					'\n': 'n',
					'\r': 'r',
					'\u2028': 'u2028',
					'\u2029': 'u2029'
				};
				chr = stringEscapes[chr];
			}
			return '\\' + chr;
		})
			: str;
	}
	return "(?:)";
};
//获取字符串占位长度
Sky.strlen=function(str){
	var len=0;
	for (var i = 0; i < str.length; i++){
		if (str.charCodeAt(i) > 127 || str.charCodeAt(i) < 0){
			len+=2;
		}else{
			len++;
		}
	}
	return len;
};
//截取字符串占位长度
Sky.trunc=function(str,len,replaceStr){
	var relen=Sky.strlen(replaceStr);
	if(relen>len){
		for (var i = relen.length-1; i >= 0; i--){
			if (relen.charCodeAt(i) > 127 || relen.charCodeAt(i) < 0){
				len-=2;
			}else{
				len--;
			}
			if(len<0){
				i++;
				return replaceStr.substr(i,replaceStr.length-i);
			}
		}
	}else{
		len-=relen;
		var p=0;
		for (var i = 0; i < str.length; i++){
			if (str.charCodeAt(i) > 127 || str.charCodeAt(i) < 0){
				p+=2;
			}else{
				p++;
			}
			if(p>len){
				return str.substring(0,i)+replaceStr;
			}
		}
		return str;
	}
};
Sky.parseQuery=function(str){
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
	var s='';
	for(var key in obj){
		var value=obj[key];
		if(value.toJSON) value=value.toJSON();
		if(value.forEach){
			value.forEach(function(value){
				s=s+key+'[]='+encodeURIComponent(value)+'&';
			});
		}else if(Sky.isObject(value)){
			Sky.forOwn(value,function(v,k){
				s=s+key+'['+k+']='+encodeURIComponent(v)+'&';
			});
		}else{
			s=s+key+'='+encodeURIComponent(value)+'&';
		}
	}
	return s.substring(0,s.length-1);
};
Sky.parseURL=function(url) {
	var r={},arr,pattern;
	r.source=url;
	pattern=/^[^#]*/;
	r.hash=url.replace(pattern,"");
	arr=url.match(pattern);
	url=arr[0];
	pattern=/^([^:]+):[\/]*([^\/]+)/;
	arr=url.match(pattern);
	r.prefix=arr[0];
	r.protocol=arr[1];
	r.host=arr[2];
	pattern=/^([^:]+):(\d*)$/;
	arr=r.host.match(pattern);
	if(arr){
		r.hostname=arr[1];
		r.port=parseInt(arr[2]);
	}else{
		r.hostname= r.host;
		r.port="";
	}
	url=url.replace(r.prefix,"");
	pattern=/^[^\?]*/;
	arr=url.match(pattern);
	r.pathname=arr[0];
	r.search=url.replace(pattern,"");
	r.folder=r.pathname.replace(/\/[^\/]*$/,"");
	return r;
};
Sky.getAbsPath=function(relativePath, absolutePath) {
	if(relativePath.match(/^[a-zA-Z]+:/)){
		return relativePath;
	}
	var url=Sky.parseURL(absolutePath || location.href);
	var arr=relativePath.match(/^\.\//);
	if(arr){
		return url.prefix+url.folder+relativePath.substring(1,relativePath.length);
	}
	arr=relativePath.match(/^\//);
	if(arr){
		return url.prefix+relativePath;
	}
	return url.prefix+fixURI(url.folder + "/" + relativePath).replace(/^\/(\.\.\/)+/,"/");
	function fixURI(uri){
		var pattern=/[^\/]*\/\.\.\//;
		if(uri.match(pattern)){
			uri=uri.replace(pattern,"");
			return fixURI(uri);
		}else{
			return uri;
		}
	}
};
Sky.extend=function(){//扩展对象
	var args=arguments;
	if(args.length==0) return;
	if(args.length==1) return args[0];
	var temp=args[0]==true?args[1]:args[0]; //调用复制对象方法
	for (var n=args[0]==true?2:1; n<args.length; n++){
		for(var i in args[n]){
			if(Sky.hasOwn(args[n],i)){
				if(args[n][i]!=null && args[0]==true && Sky.isObject(args[n][i]) && Sky.isObject(temp[i])){
					temp[i]=Sky.extend(true,temp[i],args[n][i]);
					//temp[i] = args[n][i];
				}else{
					temp[i] = args[n][i];
				}
			}
		}
	}
	return temp;
};
Sky.dontEnumMembers = ["toString", "toLocaleString", "valueOf","hasOwnProperty", "isPrototypeOf","propertyIsEnumerable","constructor"];
Sky.forIn=function(obj,fn){
	for(var key in obj) {
		if(Sky.dontEnumMembers.indexOf(key)<0 && key.indexOf("__")!=0){
			if(fn.call(obj,obj[key],key)===false){
				break;
			}
		}
	}
};
Sky.forOwn=function(obj,fn){
	for(var key in obj) {
		if(Sky.hasOwn(obj,key)){
			if(fn.call(obj,obj[key],key)===false){
				break;
			}
		}
	}
};
Sky.hasOwn=function(obj,key){
	if(obj.hasOwnProperty){
		return obj.hasOwnProperty(key);
	}
	return Object.prototype.hasOwnProperty.call(obj,key);
};
Sky.apply=function(obj,config){
	for(var k in config) {
		if(Sky.hasOwn(config,key)){
			obj[k] = config[k];
		}
	}
	return obj;
};
Sky.applyIf=function(obj,config){
	for(var k in config) {
		if(Sky.hasOwn(config,k) && !(k in obj)){
			obj[k] = config[k];
		}
	}
	return obj;
};
Sky.times=function(n, iteratee, thisArg){
	if(n<1){
		return [];
	}
	var index = -1,
		result = Array(n);
	while (++index < n) {
		result[index] = iteratee.apply(this,thisArg);
	}
	return result;
};
Sky.findIndex=function(arr,key,value){
	for(var i=0; i<arr.length; i++){
		if(arr[i][key]===value){return i;}
	}
	return -1;
};
Sky.findLastIndex=function(arr,key,value){
	for(var i=arr.length-1; i>=0; i--){
		if(arr[i][key]===value){return i;}
	}
	return -1;
};
Sky.find=function(arr,key,value){
	for(var i=0; i<arr.length; i++){
		if(arr[i][key]===value){return value;}
	}
};
Sky.findLast=function(arr,key,value){
	for(var i=arr.length-1; i>=0; i--){
		if(arr[i][key]===value){return value;}
	}
};
Sky.shuffle=function(arr){
	var copyArr=arr.slice();
	var ubound=arr.length-1;
	for(var i=0; i<ubound; i++){
		var r=Sky.random(0,ubound);
		var tmp=copyArr[r];
		copyArr[r]=copyArr[i];
		copyArr[i]=tmp;
	}
	return copyArr;
};
Sky.sortBy=function(arr,key){
	return arr.sort(function(a,b){
		return a[key] > b[key];
	});
};
Sky.pluck=function(arr,key){
	return arr.map(function(item){
		return item[key];
	});
};
Sky.sortedIndex=function(arr,value){
	for(var i=0; i<arr.length; i++){
		if(arr[i]>=value){
			return i;
		}
	}
	return arr.length;
};
Sky.sortedLastIndex=function(arr,value){
	for(var i=arr.length-1; i>=0; i--){
		if(arr[i]<=value){
			return i+1;
		}
	}
};
if(!Sky.support.stack){
	Sky.setTimeout=window.setTimeout;
	window.setTimeout=function(func,delay){
		var currentPath=Sky.getCurrentPath();
		Sky.setTimeout(function(){
			Sky.currentPath=currentPath;
			func.call(this);
			Sky.currentPath=null;
		},delay);
	};
}
Sky.ajax=function(options){
	var targetUrl=options.url;
	var success=options.success;
	var error=options.error;
	var dataType=options.dataType?options.dataType:'text';
	var complete=options.complete;
	var xhr=Sky.ajax.createXMLHttpRequest();
	if(options.timeout) xhr.timeout=options.timeout;
	var currentPath;
	if(!Sky.support.stack){
		currentPath=Sky.getCurrentPath();
	}
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 ) {
			if(!Sky.support.stack){
				Sky.currentPath=currentPath;
			}
			if(xhr.status == 200 || xhr.status==0){//本地访问为0
				var returnType=xhr.getResponseHeader("Content-Type");
				if(returnType){
					var arr=returnType.split("/");
					if(arr && arr.length>1){
						dataType=arr[arr.length-1];
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
			if(!Sky.support.stack){
				Sky.currentPath=null;
			}
		}
	};
	if(options.type && options.type.toUpperCase()=="POST"){
		var contentType=options.contentType;
		var data=options.data;
		xhr.open('POST', targetUrl,options.async!==false);
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		if(data && Sky.isPlainObject(data)){
			xhr.setRequestHeader('Content-Type',contentType || 'application/x-www-form-urlencoded');
			xhr.send(Sky.buildQuery(data));
		}else{//字符串 ， 二进制流 ， 文件等
			if(Sky.isString(data)){
				xhr.setRequestHeader('Content-Type',contentType || 'text/plain');
			}else{
				contentType && xhr.setRequestHeader('Content-Type',contentType);
			}
			xhr.send(data);
		}
	}else{
		xhr.open('GET', targetUrl,options.async!==false);
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.send(null);
	}
};
Sky.ajax.createXMLHttpRequest=function(){
	var request=false;
	if(window.XMLHttpRequest){
		request = new XMLHttpRequest();
		if(request.overrideMimeType){
			request.overrideMimeType('text/xml');
		}
	}else if(window.ActiveXObject){
		var versions = ['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.7.0', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
		for(var i=0; i<versions.length; i++){
			try{
				request=new ActiveXObject(versions[i]);
				if(request){
					return request;
				}
			}catch(e){}
		}
	}
	return request;
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
	var currentPath;
	if(!Sky.support.stack){
		currentPath=Sky.getCurrentPath();
		window[cbname]=function(response){
			try{
				Sky.currentPath=currentPath;
				callback(response);
				Sky.currentPath=null;
			}finally{
				window[cbname]=undefined;
				script.parentNode.removeChild(script);
			}
		};
	}else{
		window[cbname]=function(response){
			try{
				callback(response);
			}finally{
				delete window[cbname];
				script.parentNode.removeChild(script);
			}
		};
	}
	script.src=url;
	document.body.appendChild(script);
};
if(!window.execScript){
	window.execScript=function(script,lang) {
		if(lang && lang.toUpperCase().indexOf("VB")>=0){
			return ;
		}
		window["eval"].call( window,script);
	};
}
Sky.getScript=function(src, func) {
	var script = document.createElement('script');
	script.async = "async";
	script.src = src;
	var currentPath;
	if(!Sky.support.stack){
		currentPath=Sky.getCurrentPath();
	}
	if(func){
		if('onreadystatechange' in script){
			script.onreadystatechange = function(){
				if(this.readyState == 'loaded'){
					document.head.appendChild(script);
				}else if(this.readyState == "complete"){
					this.onreadystatechange = null;
					if(!Sky.support.stack){
						Sky.currentPath=currentPath;
					}
					func();
					if(!Sky.support.stack){
						Sky.currentPath=null;
					}
				}
			};
		}else{
			script.onload = func;
			document.head.appendChild(script);
		}
	}else{
		document.head.appendChild(script);
	}
};
if("currentScript" in document){
	Sky.getCurrentScript=function(){
		return document.currentScript;
	};
}else{
	Sky.getCurrentScript=function(){
		var nodes=document.getElementsByTagName('SCRIPT');
		for(var i = nodes.length - 1; i >= 0; i--) {
			var node=nodes[i];
			if( node.readyState === "interactive") {
				return node;
			}
		}
		if(Sky.isReady){
			nodes=document.head.getElementsByTagName('SCRIPT');
		}
		return nodes[nodes.length-1];
	};
}
if(Sky.support.stack){
	Sky.getCurrentPath=function(){
		var e = new Error('err');
		var stack = e.stack || e.sourceURL || e.stacktrace || '';
		if(!stack){ try{a.b.c();}catch(e){
			stack=e.stack || e.sourceURL || e.stacktrace || '';
		}}
		var stacks=stack.split("\n");
		for(var i = stacks.length - 1; i >= 0; i--) {
			if(stacks[i]) {
				stack=stacks[i];
				break ;
			}
		}
		var path;
		var arr=stack.match(/^@(.*):\d+$/);
		if(arr){
			path=arr[1];
		}else if(arr=stack.match(/^\s+at (.*):\d+:\d+$/)){
			path=arr[1];
		}else if(arr=stack.match(/^\s+at [^\(]*\((.*):\d+:\d+\)$/)){
			path=arr[1];
		}else{
			return null;
		}
		if(path==location.href){
			return null;
		}
		return path;
	};
}else{
	Sky.getCurrentPath=function(){
		if(Sky.currentPath) return Sky.currentPath;
		var currentScript=Sky.getCurrentScript();
		if(currentScript && currentScript.src){
			return Sky.getAbsPath(currentScript.src,location.href);
		}
		return null;
	};
}
(function(){
	var uid=0;
	Sky.id=function(check) {
		uid++;
		var id=Date.now()+"_"+uid;
		if(check){
			if(Sky.byId(id)){
				return Sky.id(check);
			}
		}
		return id;
	};
})();
Sky.byId=function(id){
	document.getElementById(id);
}
Sky.attachEvent=function(obj, evt, func) {
	if(obj.addEventListener) {
		obj.addEventListener(evt, func, false);
	} else if(obj.attachEvent) {
		obj.attachEvent('on' + evt, function(e){
			e=e || window.event;
			e.target=e.target || e.srcElement;
			func.call(obj,e);
		});
	}
};
Sky.detachEvent=function(obj, evt, func, eventobj) {
	eventobj = !eventobj ? obj : eventobj;
	if(obj.removeEventListener) {
		obj.removeEventListener(evt, func, false);
	} else if(eventobj.detachEvent) {
		obj.detachEvent('on' + evt, func);
	}
};
Sky.fireEvent=function(e,eventName){
	if(e.dispatchEvent) {
		var ev = document.createEvent('Event');
		ev.initEvent(eventName, false, false);
		e.dispatchEvent(ev);
	}else{
		e.fireEvent("on"+eventName);
	}
};
Sky.hasClass=function(obj,cls){
	return obj.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
};
Sky.addClass=function(obj,cls){
	if(!Sky.hasClass(obj,cls)) obj.className+=" "+cls;
};
Sky.removeClass=function(obj,cls){
	if(Sky.hasClass(obj,cls)){
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		obj.className=obj.className.replace(reg,' ');
	}
};
Sky.toggleClass=function(obj,cls){
	if(Sky.hasClass(obj,cls)){
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		obj.className=obj.className.replace(reg,' ');
	}else{
		obj.className+=" "+cls;
	}
};
Sky.getElementStyle=function(el, prop){
	if(el.currentStyle){//IE
		return el.currentStyle[prop] || el.style[prop];
	}else if(window.getComputedStyle){//非IE
		var propprop = prop.replace (/([A-Z])/g, "-$1");
		propprop = propprop.toLowerCase();
		var style=window.getComputedStyle(el,null);
		return style[prop] || style.getPropertyValue(propprop) || el.style[prop];
	}
	return '';
};
//获取元素位置
Sky.getPageTop=function(e){
	var offset;
	if(e.getBoundingClientRect){
		offset=e.getBoundingClientRect().top;
		offset+=Math.max(document.documentElement.scrollTop,document.body.scrollTop);
		if(Sky.browser.ie7 && !Sky.browser.quirks){
			//ie7会比正常多两个像素，因为ie7有个边框，我不知道怎么去掉，其他ie浏览器可以使用html{border:0 none;},知道怎么处理的朋友和我说下吧
			offset-=2;
		}
	}else{
		offset=e.offsetTop;
		if(e.offsetParent!=null) offset+=Sky.getPageTop(e.offsetParent);
	}
	return offset;
};
Sky.getPageLeft=function(e){
	var offset;
	if(e.getBoundingClientRect){
		offset=e.getBoundingClientRect().left;
		offset+=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
		if(Sky.browser.ie7 && !Sky.browser.quirks){
			offset-=2;
		}
	}else{
		offset=e.offsetLeft;
		if(e.offsetParent!=null) offset+=Sky.getPageLeft(e.offsetParent);
	}
	return offset;
};
Sky.getNextElement=function(element){
	var e = element.nextSibling;
	if(e == null){ return null;}
	if(e.nodeType==1){
		return e;
	}else{
		return Sky.getNextElement(e);
	}
};
Sky.getFormData=function(form){
	if(Sky.isString(form)){
		form=document.forms[form];
	}
	if(!form.tagName.toUpperCase()=="FORM"){
		throw "form is not exit";
	}
	var o={};
	for(var i=0; i<form.length; i++){
		var input=form[i];
		if(input.name){
			var arr,name,value;
			switch (input.type) {
				case "checkbox":
					if(input.checked){
						if(arr=input.name.match(/(.*)\[\]$/)){
							name=arr[1];
							value=o[name];
							if(!value){
								o[name]=value=[];
							}
							if(input.value){
								value.push(input.value);
							}else{
								value.push("on");
							}
						}else if(arr=input.name.match(/(.*)\[([^\]]+)\]$/)){
							name=arr[1];
							var key=arr[2];
							value=o[name];
							if(!value){
								o[name]=value={};
							}
							if(input.value){
								value[key]=input.value;
							}else{
								value[key]="on";
							}
						}else{
							o[input.name]=input.value;
						}
					}
					break;
				case "radio":
					if(input.checked){
						o[input.name]=input.value;
					}
					break;
				default:
					o[input.name]=input.value;
			}
		}
	}
	return o;
};
Sky.setFormData=function(form,data){
	if(Sky.isString(form)){
		form=document.forms[form];
	}
	if(!form.tagName.toUpperCase()=="FORM"){
		throw "form is not exit";
	}
	for(var i=0; i<form.length; i++){
		var input=form[i];
		if(input.name){
			var arr,name,value;
			switch (input.type) {
				case "checkbox":
					if(data){
						if(arr=input.name.match(/(.*)\[\]$/)){
							name=arr[1];
							if(name in data){
								value=data[name];
								if(value.split) value=value.split(",");
								if(value.indexOf && value.indexOf(input.value)>=0){
									input.checked=true;
								}else{
									input.checked=false;
								}
							}
						}else if(arr=input.name.match(/(.*)\[([^\]]+)\]$/)){
							name=arr[1];
							if(name in data){
								var key=arr[2];
								value=data[name];
								if(value && value[key]){
									input.value=value[key];
									input.checked=true;
								}else{
									input.checked=false;
								}
							}
						}else{
							if(input.name in data){
								value=data[input.name];
								if(value){
									input.value=value;
									input.checked=true;
								}else{
									input.checked=false;
								}
							}
						}
					}else{
						input.checked=false
					}
					break;
				case "radio":
					if(data){
						if(input.name in data){
							input.checked=data[input.name]==input.value;
						}
					}else{
						input.checked=false
					}
					break;
				default:
					if(data){
						if(input.name in data){
							input.value=data[input.name];
						}
					}else{
						input.value="";
					}
			}
		}
	}
};
Sky.getPrevElement=function(element){
	var e = element.previousSibling;
	if(e == null){ return null;}
	if(e.nodeType==1){
		return e;
	}else{
		return Sky.getPrevElement(e);
	}
};
if(document.getElementsByClassName){
	Sky.getElementsByClassName=function(e,className){
		return Array.prototype.slice.call(e.getElementsByClassName(className));
	};
}else{
	Sky.getElementsByClassName=function(e,className){
		var result=[];
		var nodes= e.getElementsByTagName("*");
		for(var i=0;i<nodes.length;i++){
			if(Sky.hasClass(nodes[i],className)){
				result.push(nodes[i]);
			}
		}
		return result;
	};
}
(function(){
	function parseNodeSelector(selector){
		var result={};
		var reg=/^([a-zA-Z0-9_\-]+)/;
		var arr=selector.match(reg);
		if(arr){
			result.tagName=arr[1];
		}
		result.classNames=[];
		reg=/\.([a-zA-Z0-9_\-]+)/g;
		while(arr=reg.exec(selector)){
			result.classNames.push(arr[1]);
		}
		arr=selector.match(/#([a-zA-Z0-9_\-]+)/);
		if(arr){
			result.id=arr[1];
		}
		result.attribute={};
		reg=/\[([a-zA-Z0-9_\-]+)='?([a-zA-Z0-9_\-]+)'?\]/g;
		while(arr=reg.exec(selector)){
			result.attribute[arr[1]]=arr[2];
		}
		reg=/\[([a-zA-Z0-9_\-]+)\]/g;
		while(arr=reg.exec(selector)){
			result.attribute[arr[1]]=null;
		}
		return result;
	}
	function matchesInfo(element, nodeInfo){
		if(nodeInfo.tagName && nodeInfo.tagName.toLocaleUpperCase()!=element.tagName.toLocaleUpperCase()) return false;
		if(nodeInfo.id && nodeInfo.id!=element.id) return false;
		for(var i=0;i<nodeInfo.classNames.length;i++){
			if(!Sky.hasClass(element,nodeInfo.classNames[i])){
				return false;
			}
		}
		for(var key in nodeInfo.attribute){
			var value=nodeInfo.attribute[key];
			if(value===null){
				if(!element.hasAttribute(key)) return false;
			}else{
				if(element.getAttribute(key)!=value) return false;
			}
		}
		return true;
	}
	if(document.getElementsByClassName){
		Sky.getElementsByClassName=function(e,className){
			return Array.prototype.slice.call(e.getElementsByClassName(className));
		};
	}else{
		Sky.getElementsByClassName=function(e,className){
			var result=[];
			var nodes= e.getElementsByTagName("*");
			for(var i=0;i<nodes.length;i++){
				if(Sky.hasClass(nodes[i],className)){
					result.push(nodes[i]);
				}
			}
			return result;
		};
	}
	Sky.matches=function(element, selector){
		if(element.matches){
			Sky.matches=function(element, selector){return element.matches(selector);};
		}else if(element.matchesSelector){
			Sky.matches=function(element, selector){return element.matchesSelector(selector);};
		}else if(element.webkitMatchesSelector){
			Sky.matches=function(element, selector){return element.webkitMatchesSelector(selector);};
		}else if(element.msMatchesSelector){
			Sky.matches=function(element, selector){return element.msMatchesSelector(selector);};
		}else if(element.mozMatchesSelector){
			Sky.matches=function(element, selector){return element.mozMatchesSelector(selector);};
		}else if(element.oMatchesSelector){
			Sky.matches=function(element, selector){return element.oMatchesSelector(selector);};
		}else{
			Sky.matches=function(element, selector){
				var nodeInfo=parseNodeSelector(selector);
				return matchesInfo(element,nodeInfo);
			};
		}
		return Sky.matches(element, selector);
	}
	if(false && document.querySelectorAll){
		Sky.querySelector=function(e,selector){
			return Array.prototype.slice.call(e.querySelectorAll(selector));
		};
	}else{
		Sky.querySelector=function(parent,selector){
			var r=new Array();
			var arr,node;
			arr=selector.match(/^#([a-zA-Z0-9_\-]+)$/);
			if(arr){
				node=document.getElementById(arr[1]);
				if(node && (parent==document || parent.contains(node))){
					r.push(node);
				}
				return r;
			}
			arr=selector.match(/^\.([a-zA-Z0-9_\-]+)$/);
			if(arr){
				arr=Array.prototype.slice.call(Sky.getElementsByClassName(parent,arr[1]));
				if(arr.length) r.push.apply(r,arr);
				return r;
			}
			selector=selector.replace(/\s+,\s+/g,",").replace(/\s+>\s+/g,">").replace(/\s+/g," ").trim();
			var arr=selector.split(",");
			arr.forEach(function(selector){
				if(selector.match(/(>|\s)/)){
					r.push.apply(r,queryOne(parent,selector));
				}else{
					r.push.apply(r,queryNode(parent,selector));
				}
			});
			return r;
			function queryNode(e,selector){
				var r=[];
				var nodeInfo=parseNodeSelector(selector);
				if(nodeInfo.id){
					var node=document.getElementById(nodeInfo.id);
					if(node){
						if(e.contains(node)){
							if(matchesInfo(e,nodeInfo)){
								r.push(node);
							}
						}
					}
					return r;
				}
				var nodes,i;
				if(nodeInfo.tagName){
					nodes= e.getElementsByTagName(nodeInfo.tagName);
				}else if(nodeInfo.classNames.length>0){
					nodes=Sky.getElementsByClassName(e,nodeInfo.classNames[0]);
				}else{
					nodes=e.getElementsByTagName("*");
				}
				for(i=0;i<nodes.length;i++){
					if(matchesInfo(nodes[i],nodeInfo)){
						r.push(nodes[i]);
					}
				}
				return r;
			}
			function queryOne(e,selector){
				selector=selector+" ";
				var reg=/([0-9a-zA-Z_\-\[\]"'=#\.]+)(\s|>)/g;
				var selectors=[];
				var selectorsIsParent=[];
				var arr;
				while(arr=reg.exec(selector)){
					selectors.push(arr[1]);
					selectorsIsParent.push(arr[2]==">");
				}
				var leafSelector=selectors.reverse().shift();
				selectorsIsParent.reverse().shift();
				arr=queryNode(e,leafSelector);
				arr=arr.filter(function(ele,i){
					var checkIndex=0;
					var parent=ele;
					while((parent=parent.parentNode) && parent!=e){
						if(selectorsIsParent[checkIndex]){
							if(!Sky.matches(parent,selectors[checkIndex])) return false;
							checkIndex++;
						}else{
							if(Sky.matches(parent,selectors[checkIndex])){
								checkIndex++;
							}
						}
						if(checkIndex>=selectors.length){
							return true;
						}
					}
					return false;
				});
				return arr;
			}
		};
	}
	var Batch=function(){};
	Batch.prototype =Sky.fn= {
		constructor: Batch,
		length: 0,
		indexOf:Array.prototype.indexOf,
		push:Array.prototype.push,
		splice:Array.prototype.splice,
		forEach:Array.prototype.forEach
	};
	Sky.ele=function(ele){
		var nodes=new Batch();
		if(Sky.isElement(ele)){
			nodes.push(ele);
		}
		return nodes;
	};
	Sky.create=function(selector){
		var nodes=new Batch();
		var arr=selector.split(",");
		for(var i=0;i<arr.length;i++){
			nodes.push(createNode(arr[i]));
		}
		return nodes;
		function createNode(selector){
			var nodeInfo=parseNodeSelector(selector);
			var tagName=nodeInfo.tagName || "div";
			var node=document.createElement(tagName);
			if(nodeInfo.classNames.length) node.className=nodeInfo.classNames.join(" ");
			nodeInfo.id && (node.id=nodeInfo.id);
			for(var key in nodeInfo.attribute){
				node.setAttribute(key,nodeInfo.attribute[key]);
			}
			var arr=selector.match(/:content\((.*)\)$/);
			if(arr){
				node.appendChild(document.createTextNode(arr[1]));
			}
			return node;
		}
	};
	Sky.query=function(selector,parent){
		parent=parent || document;
		var arr=Sky.querySelector(parent,selector);
		var nodes=new Batch();
		nodes.push.apply(nodes,arr);
		return nodes;
	};
	Sky.fn.parent=function(){
		var nodes=new Batch();
		this.forEach(function(ele){
			var parent=ele.parentNode;
			if(parent && nodes.indexOf(parent)<0){
				nodes.push(parent);
			}
		});
		return nodes;
	};
	Sky.fn.parents=function(){
		var nodes=new Batch();
		this.forEach(function(ele){
			var parent=ele;
			while(parent=parent.parentNode){
				if(nodes.indexOf(parent)<0){
					nodes.push(parent);
				}
			};
		});
		return nodes;
	};
	Sky.fn.parents=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var parent=ele;
			while(parent=parent.parentNode){
				if(nodes.indexOf(parent)<0){
					if(selector && !Sky.matches(parent,selector)){
						continue ;
					}
					nodes.push(parent);
				}
			};
		});
		return nodes;
	};
	Sky.fn.parentsUntil=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var parent=ele;
			while(parent=parent.parentNode){
				if(nodes.indexOf(parent)<0){
					nodes.push(parent);
					if(Sky.matches(parent,selector)) break ;
				}
			};
		});
		return nodes;
	};
	Sky.fn.children=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var children=ele.childNodes;
			for(var i=0; i<children.length; i++){
				var child=children[i];
				if(child.nodeType==1){
					if(nodes.indexOf(child)<0){
						if(selector && !Sky.matches(child,selector)){
							continue ;
						}
						nodes.push(child);
					}
				}
			}
		});
		return nodes;
	};
	Sky.fn.find=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var arr=Sky.query(selector,ele);
			arr.forEach(function(item){
				if(nodes.indexOf(item)<0){
					nodes.push(item);
				}
			});
		});
		return nodes;
	};
	Sky.fn.siblings=function(selector){
		return this.parent().children(selector);
	};
	Sky.fn.nextAll=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var brother=ele;
			while(brother=Sky.getNextElement(brother)){
				if(nodes.indexOf(brother)<0){
					if(selector && !Sky.matches(brother,selector)){
						continue ;
					}
					nodes.push(parent);
				}
			}
		});
		return nodes;
	};
	Sky.fn.prevAll=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var brother=ele;
			while(brother=Sky.getPrevElement(brother)){
				if(nodes.indexOf(brother)<0){
					if(selector && !Sky.matches(brother,selector)){
						continue ;
					}
					nodes.push(parent);
				}
			}
		});
		return nodes;
	};
	Sky.fn.prev=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var brother=Sky.getPrevElement(ele);
			if(brother){
				if(nodes.indexOf(brother)<0){
					if(selector && !Sky.matches(brother,selector)){
						return ;
					}
					nodes.push(parent);
				}
			}
		});
		return nodes;
	};
	Sky.fn.next=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var brother=Sky.getNextElement(ele);
			if(brother){
				if(nodes.indexOf(brother)<0){
					if(selector && !Sky.matches(brother,selector)){
						return ;
					}
					nodes.push(parent);
				}
			}
		});
		return nodes;
	};
	Sky.fn.nextUntil=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var brother=ele;
			while(brother=Sky.getNextElement(brother)){
				if(nodes.indexOf(brother)<0){
					nodes.push(brother);
					if(Sky.matches(brother,selector)) break ;
				}
			};
		});
		return nodes;
	};
	Sky.fn.prevUntil=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var brother=ele;
			while(brother=Sky.getPrevElement(brother)){
				if(nodes.indexOf(brother)<0){
					nodes.push(brother);
					if(Sky.matches(brother,selector)) break ;
				}
			};
		});
		return nodes;
	};
	Sky.fn.first=function(){
		if(this.length){
			var nodes=new Batch();
			nodes.push(this[0]);
			return nodes;
		}
		return this;
	};
	Sky.fn.last=function(){
		if(this.length){
			var nodes=new Batch();
			nodes.push(this[this.length-1]);
			return nodes;
		}
		return this;
	};
	Sky.fn.eq=function(index){
		var nodes=new Batch();
		nodes.push(this[index]);
		return nodes;
	};
	Sky.fn.filter=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			if(Sky.matches(ele,selector)){
				nodes.push(ele );
			}
		});
		return nodes;
	};
	Sky.fn.not=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			if(!Sky.matches(ele,selector)){
				nodes.push(ele );
			}
		});
		return nodes;
	};
})();
Sky.fn.each=function(callback){
	this.forEach(function(item,index){
		callback.call(item,index);
	});
	return this;
};
Sky.fn.appendTo=function(parent){
	if(!parent) return this;
	if('append' in parent && parent.length>0){
		parent=parent[0];
	}
	if("appendChild" in parent){
		this.forEach(function(ele){
			parent.appendChild(ele);
		});
	}
	return this;
};
Sky.fn.append=function(sub){
	if(Sky.isString(sub)){
		return this.each(function(){
			var tn=document.createTextNode(sub);
			this.appendChild(tn);
		});
	}else if(sub.appendTo){
		sub.appendTo(this);
		return this;
	}else if(this.length){
		this[0].appendChild(sub);
	}
	return this;
};
Sky.fn.prepend=function(sub){
	if(Sky.isString(sub)){
		this.forEach(function(parent){
			var tn=document.createTextNode(sub);
			if(parent.childNodes.length){
				parent.insertBefore(tn,parent.firstChild);
			}else{
				parent.appendChild(tn);
			}
		});
	}else if(this.length){
		var parent=this[0];
		if(sub.each){
			sub.each(function(){
				if(parent.childNodes.length){
					parent.insertBefore(this,parent.firstChild);
				}else{
					parent.appendChild(this);
				}
			});
		}else{
			parent.appendChild(sub);
		}
	}
	return this;
};
Sky.fn.before=function(sub){
	var me=this;
	if(Sky.isString(sub)){
		this.forEach(function(dom){
			var tn=document.createTextNode(sub);
			var parent=dom.parentNode;
			if(parent){
				parent.insertBefore(tn,dom);
			}
		});
	}else if(this.length){
		var parent=this[0].parentNode;
		if(parent){
			if(sub.each){
				sub.each(function(dom){
					parent.insertBefore(this,me[0]);
				});
			}else{
				parent.insertBefore(sub);
			}
		}
	}
	return this;
};
Sky.fn.after=function(sub){
	if(Sky.isString(sub)){
		this.forEach(function(dom){
			var tn=document.createTextNode(sub);
			var parent=dom.parentNode;
			if(parent){
				if(dom.nextSibling){
					parent.insertBefore(tn,dom.nextSibling);
				}else{
					parent.appendChild(tn);
				}
			}
		});
	}else if(this.length){
		var dom=this[0];
		var parent=dom.parentNode;
		if(parent){
			if(sub.each){
				sub.each(function(){
					if(dom.nextSibling){
						parent.insertBefore(this,dom.nextSibling);
					}else{
						parent.appendChild(this);
					}
				});
			}else{
				if(dom.nextSibling){
					parent.insertBefore(sub,dom.nextSibling);
				}else{
					parent.appendChild(sub);
				}
			}
		}
	}
	return this;
};
Sky.fn.addClass=function(className){
	this.forEach(function(dom){
		Sky.addClass(dom,className);
	});
	return this;
};
Sky.fn.removeClass=function(className){
	this.forEach(function(dom){
		Sky.removeClass(dom,className);
	});
	return this;
};
Sky.fn.toggleClass=function(className){
	this.forEach(function(dom){
		Sky.toggleClass(dom,className);
	});
	return this;
};
Sky.fn.hasClass=function(className){
	for(var i=0;i<this.length;i++){
		if(Sky.hasClass(this[i],className)){
			return true;
		}
	}
	return false;
};
Sky.fn.css=function(name,value){
	if(Sky.isString(name)){
		name=name.replace(/\-\w/g,function(str){
			return str.toUpperCase();
		});
		if(value){
			this.forEach(function(ele){
				ele.style[name]=value;
			});
		}else if(Sky.isString(name)){
			this.forEach(function(ele){
				ele.style.cssText=name;
			});
		}
	}else{
		this.forEach(function(ele){
			Sky.forOwn(name,function(value,key){
				ele.style[key]=value;
			});
		});
	}
	return this;
};
Sky.fn.prop=function(key,value){
	if(value!==undefined){
		for(var i=0;i<this.length;i++){
			this[i][key]=value;
		}
		return this;
	}else{
		if(this.length>0){
			return this[0][key];
		}
	}
};
Sky.fn.attr=function(key,value){
	switch(key.toLowerCase()){
		case "class":
			console.error("'XXX.prop(\"className\")' XXX.addClass(\""+Sky.escapeString(value)+"\") is recommended");
			return this.prop("className",value);
		case "style":
			console.error("'XXX.css(\""+Sky.escapeString(value)+"\")' is recommended");
			return this.css(value);
	}
	if(value!==undefined){
		for(var i=0;i<this.length;i++){
			this[i].setAttribute(key,value);
		}
		return this;
	}else{
		if(this.length>0){
			return this[0].getAttribute(key);
		}
	}
};
Sky.fn.removeAttr=function(key){
	switch(key.toLowerCase()){
		case "class":
			console.error("'XXX.prop(\"className\",\"\")' is recommended");
			return this.prop("className","");
		case "style":
			console.error("'XXX.css(\"\")' is recommended");
			return this.css("");
	}
	for(var i=0;i<this.length;i++){
		this[i].removeAttribute(key);
	}
	return this;
};
Sky.fn.html=function(value){
	if(value){
		this.empty();
	}
	return this.prop("innerHTML",value);
};
Sky.fn.text=function(value){
	var node,tag;
	if(value!=undefined){
		for(var i=0;i<this.length;i++){
			node=this[i];
			tag=node.tagName.toUpperCase();
			switch(tag){
				case "TEXTAREA":
				case "INPUT":
				case "SELECT":
					break;
				default:
					node.innerHTML=Sky.escapeHtml(value);
			}
		}
		return this;
	}else{
		if(this.length>0){
			node=this[0];
			if('textContent' in node){
				return node.textContent;
			}
			return node.innerText;
		}
	}
};
Sky.fn.val=function(value){
	return this.prop("value",value);
};
Sky.fn.data=function(key,value){
	var attr="data-"+key;
	var node;
	if(value!==undefined){//set
		for(var i=0;i<this.length;i++){
			node=this[i];
			if(node.hasAttribute(attr)){
				node.setAttribute(attr,value);
			}
			if(!node.data) node.data={};
			node.data[key]=value;
		}
		return this;
	}else{//get
		if(this.length>0){
			node=this[0];
			if(!node.data) node.data={};
			if(value=node.data[key]){
				if(node.hasAttribute(attr)){
					node.setAttribute(attr,value);
				}
				return value;
			}else if(node.hasAttribute(attr)){
				value=node.getAttribute(attr);
				node.data[key]=value;
				return value;
			}
		}
		return null;
	}
};
Sky.fn.remove=function(selector){
	var r=this;
	if(selector){
		r=this.filter(selector);
	}
	r.forEach(function(item){
		var parent=item.parentNode;
		if(parent) parent.removeChild(item);
	});
	return this;
};
Sky.fn.destroy=function(){
	this.forEach(function(dom){
		var parent=dom.parentNode;
		if(parent) parent.removeChild(dom);
		if(dom.data && dom.data.events){
			dom.data.events.forOwn(function(events){
				if(events.forEach) events.forEach(function(callback){
					Sky.detachEvent(dom,events,callback);
				});
			});
		}
		for(var prop in dom){
			if(prop.startsWith("on")) dom[prop]=null;
		}
	});
	var $children=this.children();
	if($children.length) $children.destroy();
	this.splice(0,this.length);
	return this;
};
Sky.fn.empty=function(selector){
	this.children(selector).destroy();
	return this.prop("innerHTML",'');
};
Sky.fn.bind=function(event,callback){
	this.forEach(function(dom){
		if(!dom.data) dom.data={};
		if(!dom.data.events) dom.data.events={};
		if(!dom.data.events[event]) dom.data.events[event]=[];
		var events=dom.data.events[event];
		events.push(callback);
		Sky.attachEvent(dom,event,callback);
	});
	return this;
};
Sky.fn.unbind=function(event,callback){
	if(callback){
		this.forEach(function(dom){
			Sky.detachEvent(dom,event,callback);
		});
	}else{
		this.forEach(function(dom){
			if(!dom.data) dom.data={};
			if(!dom.data.events) dom.data.events={};
			if(!dom.data.events[event]) dom.data.events[event]=[];
			var events=dom.data.events.events[event];
			events.forEach(function(callback){
				Sky.detachEvent(dom,event,callback);
			});
		});
	}
	return this;
};
Sky.fn.trigger=function(event,callback){
	this.forEach(function(dom){
		Sky.fireEvent(dom,event,callback);
	});
	return this;
};
Sky.fn.click=function(callback){
	if(callback){
		return this.bind('click',callback);
	}
	return this.each(function(){
		this.click();
	});
};
Sky.fn.mouseenter=function(callback){
	return this.bind("mouseover",function(e){
		var related=e.relatedTarget=e.relatedTarget || e.fromElement || this;
		if(!related || (this=== e.target && related.contains(this))){
			callback.call(this, e);
		}
	});
};
Sky.fn.mouseleave=function(callback){
	return this.bind("mouseout",function(e){
		var related=e.relatedTarget=e.relatedTarget || e.toElement || this;
		if(!related || (this === e.target && related.contains(this))){
			callback.call(this, e);
		}
	});
};
if("ontouchstart" in document){
	Sky.fn.tap=function(callback){
		return this.bind("touchstart",function(e){console.log(e);
			this.data.lastTouchTime=Date.now();
		}).bind("touchend",function(e){
			if(Date.now()-this.data.lastTouchTime<200){
				callback.call(this,e);
			}
		});
	};
}else{
	Sky.fn.tap=Sky.fn.click;
}
if("ontouchstart" in document){
	Sky.fn.tap=function(callback){
		return this.bind("touchstart",function(e){console.log(e);
			this.data.lastTouchTime=Date.now();
		}).bind("touchend",function(e){
				if(Date.now()-this.data.lastTouchTime<200){
					callback.call(this,e);
				}
			});
	};
}else{
	Sky.fn.tap=Sky.fn.click;
}
Sky.fn.input=function(callback){
	if(Sky.browser.ie9){
		this.bind('change',callback);
		this.bind('selectionchange',callback);
		this.bind('keyup',callback);
		this.bind('input',callback);
	}else if('oninput' in document){
		return this.bind('input',callback);
	}else{
		return this.bind('propertychange',function(e){
			e=e || window.event;
			if(e.propertyName=='value'){
				if(!e.srcElement.disabled && !e.srcElement.readOnly){
					callback.call(e.srcElement,e || window.event);
				}
			}
		});
	}
};
Sky.fn.on=function(evt,arg1,arg2){// TODO 还在考虑中
	var func;
	if(Sky.isFunction(arg1)){
		func=arg1;
	}else if(Sky.isFunction(arg2)){
		func=arg2;
	}
	var target=e.target || e.srcElement || this;
	this.forEach(function(ele){
		if(ele.addEventListener) {
			ele.addEventListener(evt, func, false);
		} else if(obj.attachEvent) {
			ele.attachEvent('on' + evt, function(){
				func
			});
		}
		Sky.attachEvent(event,function(e){
			e=e || window.event;
			var target=e.target=e.target || e.srcElement;
			if(this==target){
				callback.call(this,e);
			}
		});
	});
};
/* ceil floor round */
(function(){
	function createRound(methodName) {
		var func = Math[methodName];
		return function(number, precision) {
			precision = precision === undefined ? 0 : (+precision || 0);
			if (precision) {
				precision =Math.pow(10,precision);
				return func(number * precision) / precision;
			}
			return func(number);
		};
	}
	Sky.round=createRound('round');
	Sky.floor=createRound('floor');
	Sky.ceil=createRound('ceil');
})();
Sky.random=function(a, b){
	var length=b-a+1;
	return Math.floor(Math.random()*length)+a;
};
Sky.UUID=function() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});
	return uuid;
};
window.execScript([
	'Function alert(msg)',
	'msgbox msg',
	'End Function' //去除弹窗的图标
].join('\n'), 'VBScript');
if(typeof alert=="unknown"){
	Sky.support.VBScript=true;
}
Sky.noop=function(){};
Sky.later=function(fn){
	setTimeout(fn,0);
};
if(!document.addEventListener){
	Sky.support.addEventListener=false;
	Sky.support.DOMContentLoaded=false;
	(function(){
		var d=document;
		var fn=[];
		var done=function(e){
			fn.forEach(function(item){
				if(Sky.isFunction(item)){
					item.call(d,window.event);
				}
			});
			done=Sky.noop;
		};
		if(window==window.top)(function() {
			try { d.documentElement.doScroll('left'); done.call(d); }
			catch (err) { setTimeout(arguments.callee, 0); }
		})();
		document.attachEvent("onreadystatechange",function(){
			if(d.readyState === "complete") {
				d.detachEvent("onreadystatechange", arguments.callee);
				done.call(d);
			}
		});
		document.addEventListener=function(event,callback){
			if(event=="DOMContentLoaded"){
				fn.push(callback);
			}else{
				document.attachEvent(event,callback);
			}
		};
		document.removeEventListener=function(event,callback){
			if(event=="DOMContentLoaded"){
				var index=fn.indexOf(callback);
				fn.splice(index,1);
			}else{
				document.detachEvent(event,callback);
			}
		};
	})();
}
(function(){
	Sky.isReady=false;
	var p=new Promise(function(resolve, reject){
		document.addEventListener("DOMContentLoaded",function(){
			Sky.isReady=true;
			resolve();
		},false);
	});
	Sky.ready=function(callback){
		if(callback) document.addEventListener("DOMContentLoaded",callback);
		return p;
	};
})();
function Observable(){
	var _events=new Array();
	var evt={};
	this.addEvent=function(ev,fn){
		evt[ev]=fn;
	};
	this.addListener=function(ev,fn,before){
		before=before?true:false;
		if(ev in evt) evt[ev]();
		_events.push({'ev':ev,'fn':fn,'before':before});
	};
	this.removeListener=function(ev,fn){
		for(var i=_events.length-1;i>=0;i--){
			var e=_events[i];
			if(e.ev==ev && (!fn || e.fn==fn)){
				_events.splice(i, 1);
			}
		}
	};
	this.on=function(ev,fn,before){
		this.addListener(ev,fn,true);
	};
	this.after=function(ev,fn,before){
		this.addListener(ev,fn,false);
	};
	this.dispatchEvent=function(ev,before,args){
		if(args==undefined){ args=[];}
		for(var i=0;i<_events.length;i++){
			var e=_events[i];
			if(e.ev==ev && e.before==before){
				if(e.fn.apply(this,args)===false){
					return false;
				}
			}
		}
		var when=before?'on':'after';
		var eventName=when+ev;
		if(this[eventName]){
			if(this[eventName].apply(this,args)==false){
				return false;
			}else{
				return true;
			}
		}
		eventName=when+ev.replace(/\b(\w)/g, function(m){
			return m.toUpperCase();
		});
		if(this[eventName]){
			if(this[eventName].apply(this,args)==false){
				return false;
			}else{
				return true;
			}
		}
		return true;
	};
	this.fireEvent=function(type,args){
		return this.dispatchEvent(type,true,args);
	};
	this.fireAfterEvent=function(type,args){
		return this.dispatchEvent(type,false,args);
	};
}
if(!window.$){
	window.$=Sky;
}
