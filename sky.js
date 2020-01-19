var globalThis=this;
var Sky=function(){
	return Sky.overload(arguments,this);
};
(function(){
	var rules=[];
	function ckeck(ckeckFunc,index){
		return ckeckFunc(this[index]);
	}
	function compare(x, y){//比较函数
		return x.checks.length-y.checks.length;
	}
	Sky.overload=function(checks,func,target){
		if(target){
			rules.push({
				'checks':checks,
				'func':func,
				'target':target
			});
			rules.sort(compare);
		}else{
			var args=checks;
			var thisVal=func;
			var i=rules.length;
			while(i--){
				var rule=rules[i];
				if(args.callee===rule.func){
					if(rule.checks.length>=args.length){
						if(rule.checks.every(ckeck,args)){
							return rule.target.apply(thisVal,args);
						}
					}
				}
			}
			return Sky;
		}
	};
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
Sky.is=function(obj,Clazz){
	obj=Object(obj);
	return obj instanceof Clazz;
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
	return obj!==void 0;
};
Sky.isWindow=function(obj){
	return obj && typeof obj === "object" && "setInterval" in obj;
};
Sky.isPlainObject=function(obj){
	if(obj===null){
		return true;
	}
	if(typeof obj!=="object" || obj.nodeType || Sky.isWindow(obj)){
		return false;
	}
	return Object.getPrototypeOf(obj)===Object.prototype;
};
Sky.isArrayLike=function(obj){
	var length=obj.length;
	if(typeof length !="number" || length<0 || isNaN(length) || Math.ceil(length)!=length){
		return false;
	}
	return true;
};
Sky.isArrayLikeObject=function(obj){
	if(typeof obj==="object" && Sky.isArrayLike(obj)){
		return true;
	}
	return false;
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
Sky.isNumeric=function(obj){
	var n=parseFloat(obj);
	return !isNaN(n);
};
Sky.isDocument=function(obj){
	return obj===document;
};

(function(){
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

Sky.noop=function(){};
Sky.toString=function(o){
	return new String(o).valueOf();
};
if(window.execScript){
	try{
		window.execScript([
			'Function alert(msg)',
			'	Msgbox Sky.toString(msg)',
			'End Function' //去除弹窗的图标
		].join('\n'), 'VBScript');
	}catch(e){}
}


if(!Number.isNaN){
	Number.isNaN=function(value){
		return typeof value === "number" && isNaN(value);
	};
}
if(!Number.isInteger){
	Number.isInteger=function(value){
		return typeof value === "number" &&	isFinite(value) &&	Math.floor(value) === value;
	};
}
if(!Number.isFinite){
	Number.isFinite=function(value){
		return typeof value === 'number' && isFinite(value);
	};
}

//删除左右两端的空格
if(!String.prototype.trim){
	String.prototype.trim=function() {
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,'');
	};
}
if(!String.prototype.trimStart){
	String.prototype.trimStart=function() {
		return this.replace(/^[\s\uFEFF\xA0]+/g,'');
	};
}
if(!String.prototype.trimEnd){
	String.prototype.trimEnd=function() {
		return this.replace(/[\s\uFEFF\xA0]+$/g,'');
	};
}
if(!String.prototype.startsWith){
	String.prototype.startsWith=function(prefix,position){
		if(prefix===null){ return false;}
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

if(!Function.prototype.bind){
	Function.prototype.bind=function(context){
		var self=this,args=Array.prototype.slice.call(arguments,1);
		return function(){
			return self.apply(context,args.concat(Array.from(arguments)));
		};
	};
}

if(typeof Symbol!=="function"){
	(function(window){
		var sqe=0;
		var all={};
		function Symbol(desc){
			this.__name__="@@"+desc+":"+sqe;
			sqe++;
			all[this.__name__]=this;
		}
		Symbol.prototype.toString=function(){
			return this.__name__;
		};
		var cache={};
		Symbol['for']=function(desc){
			if(Object.prototype.hasOwnProperty.call(cache,desc)){
				return cache[desc];
			}
			var s=new Symbol(desc);
			s.__desc__=desc;
			cache[desc]=s;
			return s;
		};
		Symbol.keyFor=function(desc){
			return this.__desc__;
		};
		window.Symbol=function(desc){
			return new Symbol(desc);
		};
		window.Symbol.sham=true;
		window.Symbol.iterator="@@iterator";
		Object.getOwnPropertySymbols=function(obj){
			var arr=[];
			for(var key in obj){
				if(key.startsWith("@@")){
					if(Object.prototype.hasOwnProperty.call(obj,key)){
						arr.push(all[key]);
					}
				}
			}
			return arr;
		};
	})(this);
}
if(!Symbol.iterator){
	Symbol.iterator=Symbol("iterator");
}

if(!('__proto__' in Object.prototype)){
	if(!Object.create){
		Object.create=function(proto){
			function F(){}
			F.prototype = proto;
			return new F();
		};
	}
	if(!Object.getPrototypeOf){
		Object.getPrototypeOf=function(obj){
			if(Object.prototype.hasOwnProperty.call(obj,'constructor')){
				return obj.__proto__;
			}
			return obj.constructor.prototype;
		};
		Sky.inherits=function(clazz,superClazz){
			Object.assign(clazz,superClazz);
			clazz.prototype=Object.create(superClazz.prototype);
			clazz.prototype.__proto__=superClazz.prototype;
			clazz.prototype.constructor=clazz;
		};
	}
}
if(!Object.defineProperties){
	Sky.hasOwn=function(obj,key){
		if(!(key in obj)){
			return false;
		}
		var value=obj[key];
		if(typeof obj==="object" && !(obj instanceof Object)){
			var constructor=obj.constructor;
			if(constructor){
				var proto=constructor.prototype;
				return proto[key]!==value;
			}
		}
		return Object.prototype.hasOwnProperty.call(obj,key);
	};
}
(function(){
	if(!Sky.propertyIsEnumerable('toString')){
		var dontEnums=["toString","toLocaleString","valueOf","hasOwnProperty", "isPrototypeOf","propertyIsEnumerable"];
		Object.keys=function(obj){
			var result=[],key;
			for(key in obj){
				if(Sky.hasOwn(obj,key) && !key.startsWith("@@") && !key.startsWith("__")){
					result.push(key);
				}
			}
			var i=dontEnums.length;
			while(i-->0){
				key=dontEnums[i];
				if(Sky.hasOwn(obj,key)){
					result.push(key);
				}
			}
			return result;
		};
		Sky.forIn=function(obj,fn,thisArg){
			thisArg=thisArg || window;
			for(var key in obj) {
				if(!(obj instanceof Object)){
					if(key.startsWith("__") || key==="constructor"){
						continue ;
					}
				}
				if(key.startsWith("@@")){
					continue ;
				}
				if(fn.call(thisArg,obj[key],key)===false){
					return false;
				}
			}
			var i=dontEnums.length;
			var proto=Object.getPrototypeOf(obj);
			//遍历nonEnumerableProps数组
			while(i--){
				var prop=dontEnums[i];
				if(prop in obj && obj[prop]!==proto[prop]){
					if(fn.call(thisArg,obj[prop],prop)===false){
						return false;
					}
				}
			}
			return true;
		};
		Sky.dontEnums=dontEnums;
	}
})();

if('__proto__' in Object.prototype){
	if(!Object.create){
		Object.create=function(proto){
			var o=new Object();
			o.__proto__=proto;
			return o;
		};
	}
	if(!Object.getPrototypeOf){
		Object.getPrototypeOf=function(object){
			return object.__proto__;
		};
	}
	if(!Object.setPrototypeOf){
		Object.setPrototypeOf=function(obj,proto){
			obj.__proto__=proto;
			return obj; 
		}
	}
}
if(!Sky.inherits){
	Sky.inherits=function(clazz,superClazz){
		Object.assign(clazz,superClazz);
		clazz.prototype=Object.create(superClazz.prototype);
		clazz.prototype.constructor=clazz;
	}
}
if(Object.prototype.__defineSetter__){
	if(!Object.defineProperty) {
		Object.defineProperty=function(obj, prop, descriptor){
			if(descriptor.value){
				delete obj[prop];
				obj[prop]=descriptor.value;
			}else{
				if(descriptor.get) obj.__defineGetter__(prop,descriptor.get);
				if(descriptor.set) obj.__defineSetter__(prop,descriptor.set);
			}
		};
	}
	if(!Object.defineProperties){
		Object.defineProperties=function(obj,properties){
			for(var key in properties){
				var descriptor=properties[key];
				Object.defineProperty(obj,key,descriptor);
			}
		};
	}
	if(!Object.getOwnPropertyDescriptor){
		Object.getOwnPropertyDescriptor=function(obj,key){
			if(Sky.hasOwn(obj,key)){
				var r={
					enumerable:true,
					configurable:true
				};
				r.set=obj.__lookupSetter__(key);
				r.get=obj.__lookupGetter__(key);
				return r;
			}
		};
	}
}
if(Object.defineProperties){
	Sky.hasOwn=function(obj,key){
		return Object.prototype.hasOwnProperty.call(obj,key);
	};
}

(function(){
	if(globalThis.Symbol){
		if(Symbol.sham){
			var keys=Object.keys;
			if(keys){
				Object.keys=function(obj){
					return keys.call(Object,obj).filter(checkSymbolKey);
				};
				function checkSymbolKey(key){
					return !key.startsWith("@@");
				}
			}
		}else{
			Sky.forIn=function(obj,fn,thisArg){
				thisArg=thisArg || window;
				for(var key in obj) {
					if(fn.call(thisArg,obj[key],key)===false){
						return false;
					}
				}
				return true;
			};
		}
	}
})();

if (!Object.is){
	Object.is=function(x, y){
		if(x===y){// Steps 1-5, 7-10
			// Steps 6.b-6.e: +0 != -0
			return x!==0 || 1/x===1/y;
		}else{
			// Step 6.a: NaN == NaN
			return x!==x && y!==y;
		}
	};
}
if(!Object.keys){
	Object.keys=function(obj){
		var result=[];
		for(var key in obj){
			if(Sky.hasOwn(obj,key) && !key.startsWith("@@")){
				result.push(key);
			}
		}
		return result;
	};
}
if(!Object.assign){
	Object.assign=function(target, varArgs){
		if(target==null){
			throw 'Cannot convert undefined or null to object';
		}
		var to=target;
		for(var i=1;i<arguments.length;i++){
			var obj=arguments[i];
			if(obj!=null){
				var keys=Object.keys(obj);
				for(var j=0;j<keys.length;j++){
					var key=keys[j];
					to[key]=obj[key];
				}
			}
		}
		return target;
	};
}
if(!Sky.forIn){
	Sky.forIn=function(obj,fn,thisArg){
		thisArg=thisArg || window;
		for(var key in obj) {
			if(key.startsWith("@@")){
				continue ;
			}
			if(fn.call(thisArg,obj[key],key)===false){
				return false;
			}
		}
		return true;
	};
}

if(!this.Reflect){
	this.Reflect={
		apply:function(target, thisArgument, argumentsList){
			return Function.prototype.apply.call(target, thisArgument, argumentsList);
		},
		construct:function(target, argumentsList,NewTarget){
			var o=Object.create(target.prototype);
			if(!NewTarget){ NewTarget=o;}
			var o2=Reflect.apply(target,NewTarget,argumentsList);
			if(o2!==void 0){
				return o2;
			}
			return o;
		}
	};
	Reflect.getPrototypeOf=Object.getPrototypeOf;
}

if(!Reflect.defineProperty){
	if(!Object.defineProperties){
		Reflect.DESC_KEY=Symbol("descriptor");
		Reflect.defineProperty=function(obj, prop, descriptor){
			if(!obj[Reflect.DESC_KEY]){
				obj[Reflect.DESC_KEY]=new Object();
			}
			obj[Reflect.DESC_KEY][prop]=descriptor;
		};
		Reflect.getOwnPropertyDescriptor=function(obj,prop){
			var descriptor=obj[Reflect.DESC_KEY];
			if(descriptor) return descriptor[prop];
		};
		Reflect.get=function(target,propertyKey,receiver){
			if(receiver===void 0){ receiver=target}
			var o=target,attributes;
			do{
				attributes=Reflect.getOwnPropertyDescriptor(o,propertyKey);
				if(attributes){
					if(attributes.get){
						return attributes.get.call(receiver);
					}
					return attributes.value;
				}
				o=Reflect.getPrototypeOf(o);
			}while(o && o!==Object.prototype);
			return target[propertyKey];
		};
		Reflect.set=function(target,propertyKey,value,receiver){
			if(receiver===void 0){ receiver=target}
			var o=target,attributes;
			do{
				attributes=Reflect.getOwnPropertyDescriptor(o,propertyKey);
				if(attributes){
					if(attributes.set){
						attributes.set.call(receiver,value);
					}
					return true;
				}
				o=Reflect.getPrototypeOf(o);
			}while(o && o!==Object.prototype);
			target[propertyKey]=value;
			return true;
		};
		Reflect.deleteProperty=function(target, prop){
			var descriptor=target[Reflect.DESC_KEY];
			delete descriptor[prop];
			delete target[prop];
		};
	}
}

if(!Reflect.defineProperty){
	if(Object.defineProperties){
		Reflect.defineProperty=function(target, propertyKey, attributes){
			try{
				Object.defineProperty(target, propertyKey, attributes);
				return true;
			}catch(e){
				console.error(e);
			}
			return false;
		};
		Reflect.getOwnPropertyDescriptor=Object.getOwnPropertyDescriptor;
		Reflect.get=function(target,propertyKey,receiver){
			if(receiver===void 0){ receiver=target}
			var o=target,attributes;
			do{
				attributes=Reflect.getOwnPropertyDescriptor(o,propertyKey);
				if(attributes){
					if(attributes.get){
						return attributes.get.call(receiver);
					}
					return attributes.value;
				}
				o=Reflect.getPrototypeOf(o);
			}while(o && o!==Object.prototype);
			return target[propertyKey];
		};
		Reflect.set=function(target,propertyKey,value,receiver){
			if(receiver===void 0){ 
				try{
					target[propertyKey]=value;
					return true;
				}catch(e){
					return false;
				}
			}
			var o=target,desc;
			do{
				desc=Reflect.getOwnPropertyDescriptor(o,propertyKey);
				if(desc){
					if(desc.set){
						try{
							descriptor.set.call(receiver,value);
							return true;
						}catch(e){
							return false;
						}
					}else if('value' in desc){
						target[propertyKey]=value;
						return true;
					}
				}
				o=Reflect.getPrototypeOf(o);
			}while(o && o!==Object.prototype);
			target[propertyKey]=value;
			return true;
		};
		Reflect.deleteProperty=function(target, key){
			delete target[key];
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
if(!Array.prototype.lastIndexOf){
	Array.prototype.lastIndexOf = function(e, fromIndex) {
		var i=isNaN(fromIndex)?this.length:fromIndex+1;
		while(i--){
			var j=this[i];
			if(j===e){return i;}
		}
		return -1;
	};
}
//遍历数组
if(!Array.prototype.forEach){
	Array.prototype.forEach =function(callback, thisArg){
		var len=this.length;
		for(var i=0,j;i<len && i<this.length; i++){
			j=this[i];
			callback.call(thisArg,j,i,this);
		}
	};
}
if(!Array.prototype.map){
	Array.prototype.map = function(fn, context) {
		var arr = [];
		for (var k = 0, length = this.length; k < length; k++) {
			arr.push(fn.call(context, this[k], k, this));
		}
		return arr;
	};
}
if(!Array.prototype.filter){
	Array.prototype.filter = function(fn, context) {
		var arr = [];
		for (var k = 0, length = this.length; k < length; k++) {
			fn.call(context, this[k], k, this) && arr.push(this[k]);
		}
		return arr;
	};
}
if(!Array.prototype.some){
	Array.prototype.some = function(fn, context) {
		var passed = false;
		for (var k = 0, length = this.length; k < length; k++) {
			if (passed === true) break;
			passed = !!fn.call(context, this[k], k, this);
		}
		return passed;
	};
}
if(!Array.prototype.every){
	Array.prototype.every = function(fn, context) {
		var passed = true;
		for (var k = 0, length = this.length; k < length; k++) {
			if (passed === false) break;
			passed = !!fn.call(context, this[k], k, this);
		}
		return passed;
	};
}
if(!Array.prototype.reduce){
	Array.prototype.reduce=function(callback){
		var i,value;
		if(arguments.length>=2){
			value=arguments[1];
			i=0;
		}else if(this.length>0){
			value=this[0];
			i=1;
		}else{
			throw new Error("Reduce of empty array with no initial value");
		}
		while(i<this.length){
			if (i in this) {
				value=callback(value,this[i],i,this);
			}
			i++;
		}
		return value;
	};
}

if(!Array.from){
	Array.from=function(arrayLike, mapFn, thisArg){
		var arr;
		if((arrayLike instanceof Map )||(arrayLike instanceof Set)){
			if(arrayLike.items){
				arrayLike=arrayLike.items;
			}
		}
		if(Sky.isString(arrayLike)){
			arr=new Array();
			for(var i=0;i<arrayLike.length;i++){
				arr.push(arrayLike.charAt(i));
			}
		}else if(Sky.isArrayLike(arrayLike)){
			try{
				arr=Array.prototype.slice.call(arrayLike);
			}catch(e){
				arr=new Array();
				for(var i=0;i<arrayLike.length;i++){
					arr.push(arrayLike[i]);
				}
			}
		}else{
			arr=new Array();
			var entries=arrayLike[Symbol.iterator];
			if(entries){
				var it=entries.call(arrayLike);
				while(true){
					var next=it.next();
					if(next.done) break ;
					arr.push(next.value);
				}
			}
		}
		if(mapFn){
			arr=arr.map( mapFn, thisArg);
		}
		return arr;
	};
}
if(!Array.isArray){
	Array.isArray=function(obj){
		return Object.prototype.toString.call(obj)==='[object Array]';
	};
}
if(!Array.of){
	Array.of=function(){
		return Array.prototype.slice.call(arguments);
	};
}
if(!Array.prototype.includes){
	Array.prototype.includes=function(search,start){
		return this.indexOf(search, start)!==-1;
	};
}
if(!Array.prototype.findIndex){
	Array.prototype.findIndex = function(callback, thisArg) {
		for(var i=0,j; i<this.length; i++){
			j=this[i];
			var r=callback.call(thisArg,j,i,this);
			if(r){
				return i;
			}
		}
		return -1;
	};
}
if(!Array.prototype.find){
	Array.prototype.find = function(callback, thisArg) {
		var i=this.findIndex(callback, thisArg);
		if(i>=0){
			return this[i];
		}
	};
}

(function(){
	function Iterator(arr){
		this.array=arr;
		this.i=0;
	}
	Iterator.prototype.next=function(){
		var result={};
		result.done=this.array.length<=this.i;
		result.value=this.array[this.i];
		if(!result.done){
			this.i++;
		}
		return result;
	};
	if(!Array.prototype.entries){
		Array.prototype.entries=function(){
			return new Iterator(this);
		};
	}
	if(!Array.prototype[Symbol.iterator]){
		Array.prototype[Symbol.iterator]=Array.prototype.entries;
	}
})();

(function(){
	function ES6Iterator(it){
		this.iterator=it;
	}
	ES6Iterator.prototype.next=function(){
		var r={};
		try{
			r.value=this.iterator.next();
			r.done=false;
		}catch(e){
			r.done=true;
		}
		return r;
	};
	ES6Iterator.prototype[Symbol.iterator]=function(){
		return this;
	};
	Sky.toES6Iterator=function(it){
		return new ES6Iterator(it);
	};
})();

(function(){
	/** 时间对象的格式化; **/
	/* eg:format="%Y-%m-%d %H:%M:%S"; */
	function pad2(number) {
		if(number<10){
			return '0'+number;
		}
		return number;
	}
	if(!Date.prototype.toLocaleFormat){//部分浏览器支持
		Date.prototype.toLocaleFormat = function(format) {
			var Y=this.getFullYear();
			var M=pad2(this.getMonth()+1);
			var D=pad2(this.getDate());
			var h=pad2(this.getHours());
			var m=pad2(this.getMinutes());
			var s=pad2(this.getSeconds());
			var o={
				"%x":Y+"/"+M+"/"+D,
				"%X":h+":"+m+":"+s,
				"%Y":Y,
				"%y":pad2(this.getYear()%100),
				"%m":M,
				"%e":this.getDate(),
				"%d":D,
				"%H":h,
				"%i":pad2(this.getHours()%12),
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
	if(!Date.prototype.toISOString){//部分浏览器支持
		Date.prototype.toISOString = function() {
			return this.getUTCFullYear()+
				'-'+pad2(this.getUTCMonth()+1)+
				'-'+pad2( this.getUTCDate() ) +
				'T'+pad2( this.getUTCHours() ) +
				':'+pad2( this.getUTCMinutes() ) +
				':'+pad2( this.getUTCSeconds() ) +
				'.'+new String(this.getUTCMilliseconds()).padStart(3,'0')+'Z';
		};
	}
})();

if(!Date.prototype.toJSON){
	Date.prototype.toJSON=Date.prototype.toISOString;
}
if(!Date.now){
	Date.now=function(){
		return new Date().getTime();
	};
}
//部分非IE浏览器的toLocaleString只显示英文
if(new Date().toLocaleString().match(/[a-z]/i)){
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

Math.log2 = Math.log2 || function(n){ return Math.log(n) / Math.log(2); };

if(this.Set){
	(function(){
		var GSet=globalThis.Set;
		globalThis.Set=function(args){
			var set=new GSet(args);
			Object.setPrototypeOf(set,Object.getPrototypeOf(this));
			if(args && set.size===0){
				args=Array.from(args);
				args.forEach(GSet.prototype.add,set);
			}
			return set;
		};
		Set.prototype=Object.create(GSet.prototype);;
		if(!Object.getOwnPropertyDescriptor(GSet.prototype,'size') && typeof GSet.prototype.size==="function"){
			Object.defineProperty(Set.prototype,'size',{
				get:function(){
					return GSet.prototype.size.call(this);
				},
				enumerable:true
			});
		}
		var m=new GSet();
		if(m!==m.add(1)){
			Set.prototype.add=function(value){
				GSet.prototype.add.call(this,value);
				return this;
			};
		}
		if(Set.prototype.iterator){
			if(!Set.prototype[Symbol.iterator]){
				Set.prototype[Symbol.iterator]=function(){
					return Sky.toES6Iterator(this.iterator());
				};
			}
			if(!Set.prototype.forEach){
				Set.prototype.forEach=function(callbackfn,thisArg){
					var it=this.iterator();
					while(true){
						try{
							var next=it.next();
						}catch(e){
							break ;
						}
						callbackfn.call(thisArg,next,next,this);
					}
				};
			}
		}
		if(!Set.prototype[Symbol.iterator]){
			if(Set.prototype.forEach){
				Set.prototype[Symbol.iterator]=function(){
					var arr=[];
					this.forEach(pushEach,arr);
					return arr.entries();
				};
			}
		}
		function pushEach(value){
			this.push(value);
		}
	})();
}

if(!this.Set){
	Set=function(arr){
		this.items=new Array();
		if(arr){
			var entries=arr[Symbol.iterator];
			if(entries){
				var it=entries.call(arr);
				while(true){
					var next=it.next();
					if(next.done) break ;
					this.add(next.value);
				}
			}
		}
		this.size=this.items.length;
	};
	Set.prototype.has=function(value){
		return this.items.indexOf(value)>=0;
	};
	Set.prototype.add=function(value){
		if(!this.has(value)){
			this.items.push(value);
			this.size=this.items.length;
		}
		return this;
	};
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
		this.items.splice(0,this.items.length);
		this.size=0;
	};
	Set.prototype.forEach=function(callback,thisArg){
		for(var i=0,j;i<this.size; i++){
			j=this.items[i];
			callback.call(thisArg,j,j,this);
		}
	};
	Set.prototype.values=function(){
		return this.items.entries();
	};
}
if(!Set.prototype[Symbol.iterator]){
	Set.prototype[Symbol.iterator]=Set.prototype.values;
}

if(this.Map){
	(function(){
		var GMap=globalThis.Map;
		globalThis.Map=function(args){
			var map=new GMap(args);
			Object.setPrototypeOf(map,Object.getPrototypeOf(this));
			if(args && map.size===0){
				args=Array.from(args);
				args.forEach(setEach,map);
			}
			return map;
		};
		function setEach(item){
			GMap.prototype.set.apply(this,item);
		}
		Map.prototype=Object.create(GMap.prototype);
		if(!Object.getOwnPropertyDescriptor(GMap.prototype,'size') && typeof GMap.prototype.size==="function"){
			Object.defineProperty(Map.prototype,'size',{
				get:function(){
					return GMap.prototype.size.call(this);
				},
				enumerable:true
			});
		}
		var m=new GMap();
		if(m!==m.set(1,1)){
			Map.prototype.set=function(key,value){
				GMap.prototype.set.call(this,key,value);
				return this;
			};
		}
		if(Map.prototype.iterator){
			if(!Map.prototype[Symbol.iterator]){
				Map.prototype[Symbol.iterator]=function(){
					return Sky.toES6Iterator(this.iterator());
				};
			}
			if(!Map.prototype.forEach){
				Map.prototype.forEach=function(callbackfn,thisArg){
					var it=this.iterator();
					while(true){
						try{
							var next=it.next();
						}catch(e){
							break ;
						}
						callbackfn.call(thisArg,next[1],next[0],this);
					}
				};
			}
		}
		if(!Map.prototype[Symbol.iterator]){
			if(Map.prototype.forEach){
				Map.prototype[Symbol.iterator]=function(){
					var arr=[];
					this.forEach(pushEach,arr);
					return arr.entries();
				};
			}
		}
		function pushEach(value,key){
			this.push([key,value]);
		}
	})();
}

if(!this.Map){
	Map=function(arr){
		this.items=new Array();
		if(arr){
			var entries=arr[Symbol.iterator];
			if(entries){
				var it=entries.call(arr);
				while(true){
					var next=it.next();
					if(next.done) break ;
					this.set(next.value[0],next.value[1]);
				}
			}
		}
		this.size=this.items.length;
	};
	Map.prototype.entries=function(){
		return this.items.entries();
	};
	Map.prototype.clear=function(){
		this.items.splice(0,this.items.length);
		this.size=0;
	};
	Map.prototype["delete"]=function(key){
		var i=Sky.findIndex(this.items,0,key);
		if(i>=0){
			var r=this.items[i];
			this.items.splice(i,1);
			this.size=this.items.length;
			return r;
		}
		return false;
	};
	Map.prototype.forEach=function(callbackfn,thisArg){
		var len=this.size;
		for(var i=0,j;i<len; i++){
			j=this.items[i];
			if(j){
				callbackfn.call(thisArg,j[1],j[0],this);
			}
		}
	};
	Map.prototype.get=function(key){
		var r=Sky.find(this.items,0,key);
		if(r){
			return r[1];
		}
	};
	Map.prototype.has=function(key){
		return Sky.findIndex(this.items,0,key)>=0;
	};
	Map.prototype.set=function(key,value){
		var r=Sky.find(this.items,0,key);
		if(r){
			r[1]=value;
		}else{
			this.items.push([key,value]);
		}
		this.size=this.items.length;
		return this;
	};
}
if(!Map.prototype[Symbol.iterator]){
	Map.prototype[Symbol.iterator]=Map.prototype.entries;
}

Sky.escapeString=function(str) {//from lodash
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
if(!this.JSON){
	JSON={
		'sham':true,
		'stringify':function(obj){
			switch(obj){
				case undefined:
				case null:
					return "null";
				case false:
				case true:
					return obj;
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
							if(obj.toJSON && Sky.isFunction(obj.toJSON)){
								return JSON.stringify(obj.toJSON());
							}
							var items=[];
							var keys=Object.keys(obj);
							for(var i=0;i<keys.length;i++){
								var key=keys[i];
								var value=obj[key];
								if(value!==void 0){
									if(!Sky.isFunction(value)){
										items.push('"'+Sky.escapeString(key)+'":'+JSON.stringify(value));
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

if(JSON.stringify(/reg/)!=="{}"){
	RegExp.prototype.toJSON=function(){return {};}
}
var URLSearchParams;
if(!this.URLSearchParams){
	URLSearchParams=function(paramsString){
		this._data=new Array();
		if(paramsString){
			var i,pair;
			if(Array.isArray(paramsString)){
				i=this._data.length=paramsString.length;
				while(i-->0){
					pair=paramsString[i];
					this._data[i]=new Array(pairs[1],pairs[0]);
				}
			}else{
				var pairs=paramsString.split("&");
				i=this._data.length=pairs.length;
				while(i-->0){
					pair=pairs[i];
					if(pair){
						var id=pair.indexOf("=");
						this._data[i]=new Array(decodeURIComponent(pair.substring(id+1,pair.length)),decodeURIComponent(pair.substring(0,id)));
					}
				}
			}
		}
	};
	URLSearchParams.prototype.append=function(key,value){
		this._data.push([value,key]);
	};
	URLSearchParams.prototype.get=function(key){
		var item=this._data.find(function(item){
			return item[1]==key;
		});
		if(item) return item[0];
		return null;
	};
	URLSearchParams.prototype.getAll=function(key){
		return this._data.filter(function(item){
			return item[1]==key;
		}).map(function(item){
			return item[0];
		});
	};
	URLSearchParams.prototype.set=function(key,value){
		var item=this._data.find(function(item){
			return item[1]==key;
		});
		if(item){
			item[0]=value;
		}else{
			this.append(key,value);
		}
	};
	URLSearchParams.prototype['delete']=function(key){
		this._data=this._data.filter(function(item){
			return item[1]!=key;
		});
	};
	URLSearchParams.prototype.has=function(key){
		return this._data.some(function(item){
			return item[1]==key;
		});
	};
	URLSearchParams.prototype.toString=function(){
		return this._data.map(function(item){
			return encodeURIComponent(item[1])+"="+encodeURIComponent(item[0]);
		}).join("&");
	};
	URLSearchParams.prototype.sort=function(){
		return this._data.sort(function(a,b){
			return a[1] > b[1];
		});
	};
	URLSearchParams.prototype.forEach=function(fn,thisArg){
		this._data.forEach.apply(this._data,arguments);
	};
}

if(!Object.defineProperties){
	var VBURLDesc;
	(function(window){
		var SearchParams=function(url){
			this.url=url;
		};
		SearchParams.prototype=Object.create(URLSearchParams.prototype);
		["append","set","delete"].forEach(function(method){
			SearchParams.prototype[method]=function(key,value){
				var searchParams=new URLSearchParams(this.url.search.replace(/^\?/,""));
				searchParams[method].apply(searchParams,arguments);
				this.url.search="?"+searchParams.toString();
			};
		});
		["getAll","get","has","toString"].forEach(function(method){
			SearchParams.prototype[method]=function(key,value){
				var searchParams=new URLSearchParams(this.url.search.replace(/^\?/,""));
				return searchParams[method].apply(searchParams,arguments);
			};
		});
		var properties={
			host:{
				enumerable:true,
				get:function(){
					if(this.port){
						return this.hostname+":"+this.port;
					}
					return this.hostname;
				},
				set:function(value){
					var pattern=/(.*):(\d+)$/;
					var arr=value.match(pattern);
					this.port="";
					if(arr){
						this.hostname=arr[1];
						this.port=arr[2];
					}else{
						this.hostname=value;
					}
				}
			},
			origin:{
				enumerable:true,
				get:function(){
					return this.protocol+"//"+this.host;
				}
			},
			href:{
				enumerable:true,
				get:function(){
					var user=this.username;
					if(user){
						if(this.password){
							user+=":"+this.password;
						}
						user+="@";
					}
					return this.protocol+"//"+user+this.host+this.pathname+this.search+this.hash;
				},
				set:function(value){
					var url=new URL(value);
					this.protocol=url.protocol;
					this.hostname=url.hostname;
					this.pathname=url.pathname;
					this.port=url.port;
					this.search=url.search;
					this.hash=url.hash;
					this.username=url.username;
					this.password=url.password;
				}
			}
		};
		function URL(relativePath, absolutePath){
			var path,arr;
			this.port=this.search=this.hash=this.username=this.password="";
			this.searchParams=new SearchParams(this);
			var pattern=/^[a-zA-Z]+:/;
			if(arr=relativePath.match(pattern)){
				this.protocol=arr[0];
				path=relativePath.replace(pattern,"");
				pattern=/^\/*([^\/]+)/;
				var host=path.match(pattern)[1];
				path=path.replace(pattern,"");
				arr=host.split("@");
				if(arr.length>1){
					this.host=arr[1];
					arr=arr[0].split(":");
					if(arr.length>1){
						this.username=arr[0];
						this.password=arr[1];
					}else{
						this.username=arr[0];
					}
				}else{
					this.host=host;
				}
			}else if(absolutePath){
				var absInfo=absolutePath.indexOf?new URL(absolutePath):absolutePath;
				this.protocol=absInfo.protocol;
				this.hostname=absInfo.hostname;
				this.port=absInfo.port;
				if(absInfo.username) this.username=absInfo.username;
				if(absInfo.password) this.password=absInfo.password;
				this.pathname=absInfo.pathname;
				if(relativePath.startsWith("#")){
					this.search=absInfo.search;
					this.hash=relativePath;
					return VBUrlFactory(this);
				}else if(relativePath.startsWith("?")){
					var a=relativePath.indexOf("#");
					if(a<0){
						this.search=relativePath;
						this.hash="";
					}else{
						this.search=relativePath.substr(0,a);
						this.hash=relativePath.substring(a,relativePath.length);
					}
					return VBUrlFactory(this);
				}else if(relativePath.startsWith("/")){
					path=relativePath;
				}else if(relativePath.startsWith("../")){
					path=absInfo.pathname.replace(/\/[^\/]*$/,"/")+relativePath;
					pattern=/[^\/]+\/\.\.\//;
					while(pattern.test(path)){
						path=path.replace(pattern,"");
					}
					path=path.replace(/^(\/\.\.)+/,"");
				}else{
					path=absInfo.pathname.replace(/[^\/]*$/,"")+relativePath.replace(/^\.\//,"");
				}
			}else{
				throw "SYNTAX_ERROR";
			}
			pattern=/^[^#]*/;
			this.hash=path.replace(pattern,"");
			arr=path.match(pattern);
			path=arr[0];
			pattern=/^[^\?]*/;
			this.search=path.replace(pattern,"");
			arr=path.match(pattern);
			this.pathname=arr[0];
			return VBUrlFactory(this);
		}
		//var DESC_KEY=Reflect.DESC_KEY;
		//URL.prototype[DESC_KEY]=properties;
		VBURLDesc=properties;
		try{
			window.execScript([
				'Class VBURL',
				'	Public [constructor]',
				'	Public [protocol]',
				'	Public [hostname]',
				'	Public [pathname]',
				'	Public [port]',
				'	Public [search]',
				'	Public [searchParams]',
				'	Public [hash]',
				'	Public [username]',
				'	Public [password]',
				//'	Public ['+DESC_KEY+']',
				'	Public Property Let [host](var)',
				'		Call VBURLDesc.host.set.call(Me,var)',
				'	End Property',
				'	Public Property Get [host]',
				'		[host]=VBURLDesc.host.get.call(Me)',
				'	End Property',
				'	Public Property Get [origin]',
				'		[origin]=VBURLDesc.origin.get.call(Me)',
				'	End Property',
				'	Public Property Let [href](var)',
				'		Call VBURLDesc.href.set.call(Me,var)',
				'	End Property',
				'	Public Property Get [href]',
				'		[href]=VBURLDesc.href.get.call(Me)',
				'	End Property',
				'End Class',
				'Function VBUrlFactory(url)',
				'	Dim o',
				'	Set o = New VBURL',
				//'	Set o.['+DESC_KEY+'] = url.['+DESC_KEY+']',
				'	Call Object.assign(o,url)',
				'	Set o.searchParams.url = o',
				'	Set o.constructor = URL',
				'	Set VBUrlFactory = o',
				'End Function'
			].join('\n'), 'VBScript');
		}catch(e){
			window.VBUrlFactory=function(url){
				if(url.host){
					properties.host.set.call(url,url.host);
				}else{
					url.host=properties.host.get.call(url);
				}
				url.href=properties.href.get.call(url);
				url.origin=properties.origin.get.call(url);
				return url;
			};/*//TODO
			var desc=new Object();
			URL.prototype[DESC_KEY]=desc;
			desc.pathname=desc.search=desc.hash={};*/
		}
		window.URL=URL;
	})(this);
}

if(Object.defineProperties){
	(function(window){
		var SearchParams=function(url){
			this._url=url;
		};
		SearchParams.prototype=Object.create(URLSearchParams.prototype);
		["append","set","delete"].forEach(function(method){
			SearchParams.prototype[method]=function(){
				var searchParams=new URLSearchParams(this._url.search.replace(/^\?/,""));
				searchParams[method].apply(searchParams,arguments);
				this._url.search="?"+searchParams.toString();
			};
		});
		["getAll","get","has","toString"].forEach(function(method){
			SearchParams.prototype[method]=function(){
				var searchParams=new URLSearchParams(this._url.search.replace(/^\?/,""));
				return searchParams[method].apply(searchParams,arguments);
			};
		});
		var url=null;
		try{
			url=new URL(location.href);
		}catch(e){
		}
		var properties={
			host:{
				enumerable:true,
				get:function(){
					if(this.port){
						return this.hostname+":"+this.port;
					}
					return this.hostname;
				},
				set:function(value){
					var pattern=/(.*):(\d+)$/;
					var arr=value.match(pattern);
					this.port="";
					if(arr){
						this.hostname=arr[1];
						this.port=arr[2];
					}else{
						this.hostname=value;
					}
				}
			},
			origin:{
				enumerable:true,
				get:function(){
					return this.protocol+"//"+this.host;
				}
			},
			href:{
				enumerable:true,
				get:function(){
					var user=this.username;
					if(user){
						if(this.password){
							user+=":"+this.password;
						}
						user+="@";
					}
					return this.protocol+"//"+user+this.host+this.pathname+this.search+this.hash;
				},
				set:function(value){
					var url=new URL(value);
					this.protocol=url.protocol;
					this.hostname=url.hostname;
					this.pathname=url.pathname;
					this.port=url.port;
					this.search=url.search;
					this.hash=url.hash;
					this.username=url.username;
					this.password=url.password;
				}
			}
		};
		if(!url || !('href' in url)){
			var URL=function(relativePath, absolutePath){
				var path,arr;
				this.port=this.search=this.hash=this.username=this.password="";
				this.searchParams=new SearchParams(this);
				var pattern=/^[a-zA-Z]+:/;
				if(arr=relativePath.match(pattern)){
					this.protocol=arr[0];
					path=relativePath.replace(pattern,"");
					pattern=/^\/*([^\/]+)/;
					var host=path.match(pattern)[1];
					path=path.replace(pattern,"");
					arr=host.split("@");
					if(arr.length>1){
						this.host=arr[1];
						arr=arr[0].split(":");
						if(arr.length>1){
							this.username=arr[0];
							this.password=arr[1];
						}else{
							this.username=arr[0];
						}
					}else{
						this.host=host;
					}
				}else if(absolutePath){
					var absInfo=absolutePath.indexOf?new URL(absolutePath):absolutePath;
					this.protocol=absInfo.protocol;
					this.hostname=absInfo.hostname;
					this.port=absInfo.port;
					if(absInfo.username) this.username=absInfo.username;
					if(absInfo.password) this.password=absInfo.password;
					this.pathname=absInfo.pathname;
					if(relativePath.startsWith("#")){
						this.search=absInfo.search;
						this.hash=relativePath;
						return this;
					}else if(relativePath.startsWith("?")){
						var a=relativePath.indexOf("#");
						if(a<0){
							this.search=relativePath;
							this.hash="";
						}else{
							this.search=relativePath.substr(0,a);
							this.hash=relativePath.substring(a,relativePath.length);
						}
						return this;
					}else if(relativePath.startsWith("/")){
						path=relativePath;
					}else if(relativePath.startsWith("../")){
						path=absInfo.pathname.replace(/\/[^\/]*$/,"/")+relativePath;
						pattern=/[^\/]+\/\.\.\//;
						while(pattern.test(path)){
							path=path.replace(pattern,"");
						}
						path=path.replace(/^(\/\.\.)+/,"");
					}else{
						path=absInfo.pathname.replace(/[^\/]*$/,"")+relativePath.replace(/^\.\//,"");
					}
				}else{
					throw "SYNTAX_ERROR";
				}
				pattern=/^[^#]*/;
				this.hash=path.replace(pattern,"");
				arr=path.match(pattern);
				path=arr[0];
				pattern=/^[^\?]*/;
				this.search=path.replace(pattern,"");
				arr=path.match(pattern);
				this.pathname=arr[0];
				return this;
			};
			Object.defineProperties(URL.prototype,properties);
			window.URL=URL;
		}else{
			if(!('origin' in url)){
				Object.defineProperty(window.URL.prototype,"origin",properties.origin);
			}
			if(!('searchParams' in url)){
				Object.defineProperty(window.URL.prototype,"searchParams",{
					enumerable:true,
					get:function(){
						var searchParams=new SearchParams(this);
						Object.defineProperty(this,"searchParams",{
							enumerable:true,
							value:searchParams
						});
						return searchParams;
					}
				});
			}
		}
	})(this);
}

	(function(setTimeout){
		var ticks=null;
		Sky.nextTick=function(fn){
			if(!ticks){
				ticks=new Array();
				setTimeout(next);
			}
			ticks.push(fn);
		};
		function next(){
			if(ticks && ticks.length){
				for(var i=0;i<ticks.length;i++){
					var fn=ticks[i];
					try{
						fn();
					}catch(e){
						console.error(e);
					}
				}
				ticks=null;
			}
		}
	})(this.Promise?Promise.prototype.then.bind(Promise.resolve(1)):(this.setImmediate?this.setImmediate:setTimeout));

(function(global){
	var nextTick=Sky.nextTick;
	var PENDING=Symbol("pending");
	var RESOLVED=Symbol("resolved");
	var REJECTED=Symbol("rejected");
	if(!global.Promise){
		function Promise(executor){
			this._resolveds=[];
			this._rejecteds=[];
			this._state=PENDING;//resolved | rejected
			
			var me=this;
			function resolve(value) {
				nextTick(function(){
					if(me._state===PENDING){
						me.data=value;
						me._state=RESOLVED;
						me._resolveds.forEach(callAll,me);
						me._resolveds=null;
					}
				});
			}
			function reject(reason) {
				nextTick(function(){
					if(me._state===PENDING){
						me.data=reason;
						me._state=REJECTED;
						me._rejecteds.forEach(callAll,me);
						me._rejecteds=null;
					}
				});
			}
			try{
				executor(resolve, reject);
			}catch(e){
				reject(e);
			}
		}
		function callAll(fn){
			fn.call(this,this.data);
		}
		function nextPromise(before,after,resolve,reject){
			return function(value){
				try{
					var x=before(value);
					if(x && (typeof x.then==="function")){
						x.then(resolve, reject);
					}else{
						after(x);
					}
				}catch(r){
					reject(r);
				}
			};
		}
		Promise.prototype.then=function(onResolved, onRejected){
			var me=this;
			onResolved=onResolved || Sky.noop;
			onRejected=onRejected || Sky.noop;
			return new Promise(function(resolve,reject){
				switch(me._state){
					case RESOLVED:
						nextTick(nextPromise(onResolved,resolve,resolve,reject),me.data);
						break ;
					case REJECTED:
						nextTick(nextPromise(onRejected,reject,resolve,reject),me.data);
						break ;
					default:
						me._resolveds.push(nextPromise(onResolved,resolve,resolve,reject));
						me._rejecteds.push(nextPromise(onRejected,reject,resolve,reject));
				}
			});
		};
		Promise.prototype['catch']=function(onRejected){
			return this.then(undefined,onRejected);
		};
		Promise.all=function(promises){
			if (!Array.isArray(promises)) {
				throw new TypeError('You must pass an array to all.');
			}
			return new Promise(function(resolve,reject){
				if(promises.length==0) return resolve(new Array());
				var result=new Array(promises.length);
				var c=0;
				promises.forEach(function(one,index){
					if(typeof one.then==="function"){
						one.then(function(data){
							c++;
							result[index]=data;
							if(c>=promises.length){
								resolve(result);
							}
						},function(data){
							reject(data);
						});
					}else{
						c++;
						result[index]=one;
						if(c>=promises.length){
							resolve(result);
						}
					}
				});
			});
		};
		Promise.race=function(promises){
			if (!Array.isArray(promises)) {
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
		global.Promise=Promise;
	}
})(this);
if(!('finally' in Promise.prototype)){
	Promise.prototype['finally']=function(onCompleted){
		return this.then(onCompleted,onCompleted);
	};
}
if(!Promise.allSettled){
	Promise.allSettled=function(promises){
		if (!Array.isArray(promises)) {
			throw new TypeError('You must pass an array to all.');
		}
		return new Promise(function(resolve,reject){
			if(promises.length==0) return resolve(new Array());
			var result=new Array(promises.length);
			var c=0;
			promises.forEach(function(one,index){
				if(typeof one.then==="function"){
					one['finally'](function(data){
						c++;
						result[index]=data;
						if(c>=promises.length){
							resolve(result);
						}
					});
				}else{
					c++;
					result[index]=one;
					if(c>=promises.length){
						resolve(result);
					}
				}
			});
		});
	};
}

if(!this.Proxy){
	(function(window){
		var dfGetter=function(target, property, receiver){
			return target[property];
		};
		var dfSetter=function(target, property, value,  receiver){
			target[property]=value;
		};
		var HANDLE_KEY=Symbol("handler");
		var TARGET_KEY=Symbol("target");
		window.Proxy=function(target, handler){
			if(!handler.get){
				handler.get=dfGetter;
			}
			if(!handler.set){
				handler.set=dfSetter;
			}
			var me=Object.defineProperties?this:VBProxyFactory(target,handler);
			me[HANDLE_KEY]=handler;
			me[TARGET_KEY]=target;
			Sky.forIn(target,setProxyProperty,me);
			return me;
		};
		function setProxyProperty(value,key){
			Reflect.defineProperty(this,key,{
				enumerable:true,
				get:function(){
					var target=this[TARGET_KEY];
					var handler=this[HANDLE_KEY];
					return handler.get(target,key,this);
				},
				set:function(value){
					var target=this[TARGET_KEY];
					var handler=this[HANDLE_KEY];
					if(handler.set(target,key,value,this)===false){
						throw new TypeError("'set' on proxy: trap returned falsish for property '"+key+"'");
					}
				}
			});
		}
		Proxy.sham=true;
		Proxy.HANDLE_KEY=HANDLE_KEY;
		Proxy.TARGET_KEY=TARGET_KEY;
	})(this);
}


if(this.Proxy){
	(function(window){
		if(!Object.defineProperties){
			var seq=0;
			var HANDLE_KEY=Proxy.HANDLE_KEY;
			var TARGET_KEY=Proxy.TARGET_KEY;
			var DESC_KEY=Reflect.DESC_KEY;
			//从avalon学到的方式，通过VB
			window.VBProxySetter=function(target, property, value, receiver, handler){
				if(handler.set(target, property, value, receiver)===false){
					throw new TypeError("'set' on proxy: trap returned falsish for property '"+key+"'");
				}
			};
			window.VBProxyGetter=function(target,property, receiver, handler){
				return handler.get(target,property, receiver);
			};
			window.VBProxyFactory=function(target,handler){
				var className="VBProxyClass_"+(seq++);
				var buffer=["Class "+className];
				buffer.push('Public ['+TARGET_KEY+']');
				buffer.push('Public ['+HANDLE_KEY+']');
				buffer.push('Public ['+DESC_KEY+']');
				Object.keys(target).forEach(function(key){
					if(key.match(/[a-zA-Z0-9_$]/)){
						buffer.push(
							'Public Property Let ['+key+'](var)',
							'	Call VBProxySetter(['+TARGET_KEY+'],"'+key+'",var,Me,['+HANDLE_KEY+'])',
							'End Property',
							'Public Property Set ['+key+'](var)',
							'	Call VBProxySetter(['+TARGET_KEY+'],"'+key+'",var,Me,['+HANDLE_KEY+'])',
							'End Property',
							'Public Property Get ['+key+']',
							'	On Error Resume Next', //必须优先使用set语句,否则它会误将数组当字符串返回
							'	Set ['+key+']=VBProxyGetter(['+TARGET_KEY+'],"'+key+'",Me,['+HANDLE_KEY+'])',
							'	If Err.Number <> 0 Then',
							'		['+key+']=VBProxyGetter(['+TARGET_KEY+'],"'+key+'",Me,['+HANDLE_KEY+'])',
							'	End If',
							'	On Error Goto 0',
							'End Property');
					}
				});
				buffer.push('End Class');
				buffer.push(
					'Function '+className+'_Factory(target,handler)',
					'	Dim o',
					'	Set o = New '+className,
					'	Set '+className+'_Factory=o',
					'End Function'
				);
				try{
					window.execScript(buffer.join('\n'), 'VBScript');
				}catch(e){
					alert(buffer.join('\n'));
				}
				return window[className+'_Factory'](target,handler); //得到其产品
			};
		}
	})(this);
}


if(!Proxy.revocable){
	(function(){
		var afterRevoke=function(){
			throw "illegal operation attempted on a revoked proxy";
		};
		Proxy.revocable=function(target,handler){
			var r={};
			r.proxy=new Proxy(target,handler);
			r.revoke=function(){
				handler.get=handler.set=afterRevoke;
			};
			return r;
		};
	})();
}

if(!this.XMLHttpRequest){
	Sky.createXMLHttpRequest=function(){
		if(Sky.XHRProgid){
			return new ActiveXObject(Sky.XHRProgid);
		}
		var versions=["Microsoft.XMLHTTP","MSXML2.XMLHTTP","Msxml2.XMLHTTP.5.0"];
		var i=versions.length;
		while(i--){
			try{
				var progid=versions[i];
				var request=new ActiveXObject(progid);
				if(request){
					Sky.XHRProgid=progid;
					return request;
				}
			}catch(e){}
		}
	};
	XMLHttpRequest=Sky.createXMLHttpRequest;//如果你不想要ie6使用new XMLHttpRequest来创建，则去掉这2行
	XMLHttpRequest.sham=true;
}else{
	Sky.createXMLHttpRequest=function(){
		return new XMLHttpRequest();
	};
}

location.origin=location.origin || location.protocol+"//"+location.host;

if(!('head' in document)) document.head=document.getElementsByTagName("head")[0];



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

if(this.Node && Node.prototype){
	/** 判断一个节点后代是否包含另一个节点 **/
	if(!Node.prototype.contains){
		Node.prototype.contains=function(arg){
			return !!(this.compareDocumentPosition(arg) & 16);
		}
	}
	if(!('parentElement' in document.head)){
		Node.prototype.__defineGetter__("parentElement", function() {
			var parent=this.parentNode;
			if(parent && parent.nodeType===1){
				return parent;
			}
			return null;
		});
	}
}
if(this.HTMLElement) {
	if(!('children' in document.head)){
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
	if(!('previousElementSibling' in document.head)){
		HTMLElement.prototype.__defineGetter__("previousElementSibling", function(){
			return Sky.getPrevElement(this);
		});
	}
	if(!('nextElementSibling' in document.head)){
		HTMLElement.prototype.__defineGetter__("nextElementSibling", function(){
			return Sky.getNextElement(this);
		});
	}
	if(!('innerText' in document.head)){
		(function(){
			HTMLElement.prototype.__defineGetter__( "innerText", function(){
				var anyString = "";
				var childS = this.childNodes;
				for(var i=0; i<childS.length; i++){
					var node=childS[i];
					if(node.nodeType==1){
						switch(node.tagName){
							case "BR":
								anyString+='\n';
								break ;
							case "SCRIPT":
							case "STYLE":
							case "TEMPLATE":
								break ;
							default :
								anyString+=node.innerText;
						}
					}else if(node.nodeType==3){
						var nodeValue=node.nodeValue;
						if(i==0)
							nodeValue=nodeValue.trimLeft();
						if(i==childS.length-1)
							nodeValue=nodeValue.trimRight();
						if(i>0 && i<childS.length-1){
							if(nodeValue.match(/^\s+$/)){
								if(checkBlock(childS[i-1]) || checkBlock(childS[i+1])){
									nodeValue="\n";
								}
							}
						}
						anyString+=nodeValue;
					}
				}
				return anyString.trim();
			});
			function checkBlock(node){
				switch(node.tagName){
					case "BR":
					case "SPAN":
					case "I":
					case "U":
					case "B":
					case "FONT":
						return false;
				}
				return true;
			}
		})();
		HTMLElement.prototype.__defineSetter__( "innerText", function(sText){
			this.textContent=sText;
		});
	}
}

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
	if(value==null || seconds<=0) {
		value='';
		seconds=-2592000;
	}
	if(!isNaN(seconds)){
		expires=new Date();
		expires.setTime(expires.getTime() + seconds * 1000);
	}
	document.cookie=name+'='+encodeURIComponent(value)
		+(expires?'; expires='+expires.toGMTString():'')
		+'; path='+path
		+(domain?'; domain='+domain:'');
};

if(!this.localStorage){
	localStorage=new function(){
		var ele=document.createElement("localStorage");
		if(ele.addBehavior){
			ele.addBehavior("#default#userData");
			document.head.appendChild(ele);
			this.getItem=function(key){
				ele.load("localStorage");
				return ele.getAttribute(key);
			};
			this.setItem=function(key,value){
				ele.setAttribute(key,new String(value));
				ele.save("localStorage");
			};
			this.removeItem=function(key){
				ele.removeAttribute(key);
				ele.save("localStorage");
			};
		}
	}();
	localStorage.sham=true;
}
if(!this.sessionStorage){
	sessionStorage=new function(){
		var ele=document.createElement("sessionStorage");
		var sessionId=Sky.getCookie("JSESSIONID");
		if(!sessionId){
			sessionId=Math.random().toString(16).replace("0.","");
			Sky.setCookie("JSESSIONID",sessionId);
		}
		if(ele.addBehavior){
			ele.addBehavior("#default#userData");
			document.head.appendChild(ele);
			this.getItem=function(key){
				ele.load(sessionId);
				return ele.getAttribute(key);
			};
			this.setItem=function(key,value){
				ele.setAttribute(key,new String(value));
				ele.save(sessionId);
			};
			this.removeItem=function(key){
				ele.removeAttribute(key);
				ele.save(sessionId);
			};
		}
	}();
	sessionStorage.sham=true;
}

if(!Object.defineProperties){
	Sky.getCurrentScript=function(){
		var nodes=document.getElementsByTagName('SCRIPT');
		var i=nodes.length;
		while(i--){
			var node=nodes[i];
			if(node.readyState==="interactive"){
				return node;
			}
		}
		return null;
	};
	if(Object.defineProperty){
		Object.defineProperty(document,"currentScript",{
			get:Sky.getCurrentScript
		});
	}
	Reflect.defineProperty(document,"currentScript",{
		enumerable:true,
		get:Sky.getCurrentScript
	});
	Sky.getCurrentPath=function(){
		var currentScript=Sky.getCurrentScript();
		return new URL(currentScript.src,location).href;
	};
}

if(Object.defineProperties){
	(function(){
		var supportStack=false;
		var currentScript=document.currentScript;
		if(!currentScript){
			var nodes=document.getElementsByTagName('SCRIPT');
			var currentScript=nodes[nodes.length-1];

			if("readyState" in currentScript){//IE9 IE10
				Sky.getCurrentScript=function(){
					var nodes=document.getElementsByTagName('SCRIPT');
					var i=nodes.length;
					while(i--){
						var node=nodes[i];
						if(node.readyState==="interactive"){
							return node;
						}
					}
					return null;
				};
				Object.defineProperty(document,"currentScript",{
					enumerable:true,
					get:Sky.getCurrentScript
				});
			}else{
				document.addEventListener('load',function(e){
					if(e.target.tagName==="SCRIPT"){
						e.target.readyState="complete";
					}
				},true);
				Object.defineProperty(document,"currentScript",{
					enumerable:true,
					get:function(){
						var path=supportStack?Sky.getCurrentPath():null;
						var nodes=document.getElementsByTagName('SCRIPT');
						var arr=[];
						for(var i=0;i<nodes.length;i++){
							var node=nodes[i];
							if(node.readyState==="complete") {
								continue ;
							}
							if(node.src){
								if(path!==new URL(node.src,location).href){
									continue ;
								}
							}else if(path){
								continue ;
							}
							arr.push(node);
						}
						if(arr.length){
							return arr[arr.length-1];
						}
						return null;
					}
				});
			}
		}
		if(!Sky.getCurrentScript){//最新浏览器
			Sky.getCurrentScript=function(){
				return document.currentScript;
			};
		}
		try{
			throw new Error('get stack');
		}catch(e){
			var stackHandler={
				'stack':[
					/^@(.*):\d+$/,// Firefox
					/^\s+at (.*):\d+:\d+$/,//Chrome
					/^\s+at [^\(]*\((.*):\d+:\d+\)$/ //IE11
				],
				'stacktrace':[
					/\(\) in\s+(.*?\:\/\/\S+)/m//opera
				]
			};
			var stackResult=handleStack(e,stackHandler);
			if(stackResult){
				supportStack=true;
				Sky.getCurrentPath=function(){
					try{
						throw new Error('get stack');
					}catch(e){
						var arr=getLastStack(e[stackResult.name]).match(stackResult.pattern);
						if(arr){
							if(arr[1]!=location.href && arr[1]!=location.origin+location.pathname+location.search){
								return arr[1];
							}
						}
					}
				};
			}
		}
		if(!supportStack){
			Sky.getCurrentPath=function(){
				var currentScript=Sky.getCurrentScript();
				return new URL(currentScript.src,location).href;
			};
		}
		function getLastStack(stack){
			var stacks=stack.trim().split("\n");;
			return stacks[stacks.length-1];
		}
		function handleStack(e,stackHandler){
			for(var name in stackHandler){
				var stacks=e[name];
				if(stacks){
					var patterns=stackHandler[name];
					var stack=getLastStack(stacks);
					var i=patterns.length;
					while(i--){
						var pattern=patterns[i];
						if(pattern.test(stack)){
							return {'name':name,'pattern':pattern};
						}
					}
				}
			}
		}
	})();
}

if(!this.console){
	console={};
	console.stack=[];
	console.log=console.info=console.error=console.warn=function(data){
		console.stack.push(data);
		window.status=data;
		Debug.writeln(data);
	};
	console.clear=function(){
		console.stack=[];
	};
}

if(typeof Event!=="function"){
	if(document.createEvent){
		Event=function(evt,init){
			var e=document.createEvent('Event');
			if(init){
				e.initEvent(evt,init.bubbles,init.cancelable);
			}else{
				e.initEvent(evt,false,false);
			}
			return e;
		};
	}else{
		Event=function(evt,init){
			var e=document.createEventObject();
			e.type=evt;
			if(init){
				e.bubbles=init.bubbles;
				e.cancelable=init.cancelable;
			}else{
				e.bubbles=false;
				e.cancelable=false;
			}
			return e;
		};
	}
}


Sky.forOwn=function(obj,fn,thisArg){
	thisArg=thisArg || window;
	var keys=Object.keys(obj);
	for(var i=0;i<keys.length;i++){
		var key=keys[i];
		if(fn.call(thisArg,obj[key],key)===false){
			return false;
		}
	}
	return true;
};
Sky.pick=function(obj,keys){
	var rest={};
	if(obj){
		var i=keys.length;
		while(i--){
			var key=keys[i];
			if(Sky.hasOwn(obj,key)){
				rest[key]=obj[key];
			}
		}
	}
	return rest;
};
Sky.omit=function(obj,keys){
	var rest={};
	if(obj){
		var ownKeys=Object.keys(obj);
		var i=ownKeys.length;
		while(i--){
			var key=ownKeys[i];
			if(keys.indexOf(key)<0){
				rest[key]=obj[key];
			}
		}
	}
	return rest;
};
Sky.extend=function(){//扩展对象
	var args=arguments;
	if(args.length==0) return;
	if(args.length==1) return args[0];
	var temp=args[0]==true?args[1]:args[0]; //调用复制对象方法
	for (var n=args[0]==true?2:1;n<args.length;n++){
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
Sky.applyIf=function(obj,config){
	Sky.forIn(config,function(v,k){
		if(!(k in obj)){
			obj[k]=v;
		}
	});
	return obj;
};

//数字开头补零
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
Sky.escapeRegExp=function(str){//from lodash
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
Sky.replaceAll=function(str, reallyDo, replaceWith, ignoreCase) {
	return str.replace(new RegExp(Sky.escapeRegExp(reallyDo), (ignoreCase ? "gi": "g")), replaceWith);
};
//获取字符串占位长度
Sky.strlen=function(str){
	var len=0;
	for(var i = 0; i < str.length; i++){
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

(function(){
	var defaultNextSequence;
	var sequenceMap=new Map();
	Sky.nextSequence=function(arg1,arg2){
		if(Sky.isString(arg1)){
			var s=sequenceMap.get(arg1);
			if(Sky.isDefined(s)){
				s++;
			}else{
				if(Sky.isNumber(arg2)){
					s=arg2
				}else{
					s=1;
				}
			}
			sequenceMap.set(arg1,s);
			return s;
		}else{
			return Sky.uniqueId();
		}
	};
	Sky.uniqueId=function(name){
		if(Sky.isDefined(defaultNextSequence)){
			defaultNextSequence++;
		}else{
			defaultNextSequence=1;
		}
		if(!name){
			return defaultNextSequence;
		}
		return name+defaultNextSequence;
	};
})();
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
Sky.random=function(a,b){
	var length=b-a+1;
	return Math.floor(Math.random()*length)+a;
};
Sky.UUID=function() {
	return new Promise(function(resolve, reject){
		var d=new Date().getTime();
		var uuid='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
			var r=(d+Math.random()*16)%16|0;
			d=Math.floor(d/16);
			return (c=='x'?r:(r&0x3|0x8)).toString(16);
		});
		resolve(uuid);
	});
};

Sky.times=function(n,iteratee,thisArg){
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
		if(arr[i][key]===value){return arr[i];}
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
Sky.union=function(){
	var set=new Set();
	for(var i=0;i<arguments.length;i++){
		var arr=arguments[i];
		if(!Array.isArray(arr)){
			arr=Array.from(arr);
		}
		var j=arr.length;
		while(j-->0){
			set.add(arr[j]);
		}
	}
	return Array.from(set);
};
Sky.difference=function(arg1){
	if(arguments.length===0){
		return new Array();
	}
	var set=new Set(arg1);
	for(var i=1;i<arguments.length;i++){
		var arr=arguments[i];
		if(!Array.isArray(arr)){
			arr=Array.from(arr);
		}
		var j=arr.length;
		while(j-->0){
			set['delete'](arr[j]);
		}
	}
	return Array.from(set);
};
Sky.intersection=function(arg1){
	if(arguments.length===0){
		return new Array();
	}
	var set=new Set(arg1);
	for(var i=1;i<arguments.length;i++){
		var arr=arguments[i];
		if(!Array.isArray(arr)){
			arr=Array.from(arr);
		}
		set.forEach(function(item){
			if(arr.indexOf(item)<0) this['delete'](item);
		},set);
	}
	return Array.from(set);
};

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

if(!document.addEventListener){
	Sky.getScript=function(src,func,charset){
		var script=document.createElement('script');
		script.charset=charset || "UTF-8";
		script.src=src;
		script.async=true;
		if(func){
			var event='onreadystatechange';
			script.attachEvent(event,function(){
				if(script.readyState==='loaded'){
					document.head.appendChild(script);
				}else if(script.readyState==='complete'){
					script.detachEvent(event,arguments.callee);
					var evt=window.event;
					func.call(script,evt);
				}
			});
		}else{
			document.head.appendChild(script);
		}
		return script;
	};
}

if(document.addEventListener){
	Sky.getScript=function(src,func,charset){
		var script=document.createElement('script');
		script.charset=charset || "UTF-8";
		script.src=src;
		script.async=true;
		if(func){
			if('onafterscriptexecute' in script){
				script.onafterscriptexecute=func;
			}else{
				script.onload=func;
			}
		}
		document.head.appendChild(script);
		return script;
	};
}

if(!("getSelection" in window)){
	Sky.clearSelect=function(){
		document.selection.empty();
	};
	Sky.getWord=function(){
		return document.selection.createRange().text;
	};
}
Sky.addFavorite=function(sURL, sTitle){
	try{
		window.external.addFavorite(sURL, sTitle);
	}catch (e){
		alert("\u52a0\u5165\u6536\u85cf\u5931\u8d25\uff0c\u8bf7\u4f7f\u7528Ctrl+D\u8fdb\u884c\u6dfb\u52a0");
	}
};
Sky.setHome=function(ele,url){
	ele.onclick=function(){
		try{
			this.style.behavior='url(#default#homepage)';
			this.setHomePage(url);
			return false;
		}catch(e){
			alert("抱歉，此操作被浏览器拒绝！");
		}
	};
};

if("getSelection" in window){
	Sky.clearSelect=function(){
		window.getSelection().removeAllRanges();
	};
	Sky.getWord=function(){
		return window.getSelection().toString();
	};
}
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

if(!document.addEventListener){
	(function(){
		Sky.isReady=false;
		var p=new Promise(function(resolve, reject){
			if(window===window.top){
				(function() {
					try{
						document.documentElement.doScroll('left');
						Sky.isReady=true;
						resolve();
					}catch(e){
						setTimeout(arguments.callee, 0);
					}
				})();
			}else{
				document.attachEvent("onreadystatechange",function(){
					if(document.readyState === "complete") {
						document.detachEvent("onreadystatechange", arguments.callee);
						Sky.isReady=true;
						resolve();
					}
				});
			}
		});
		Sky.ready=function(callback){
			if(callback && !Sky.isReady){
				return p.then(callback);
			}
			return p;
		};
		Sky.then=function(callback){
			return p.then(callback);
		};
	})();
}


if(document.addEventListener){
	(function(){
		Sky.isReady=false;
		var p=new Promise(function(resolve, reject){
			document.addEventListener("DOMContentLoaded",function(){
				Sky.isReady=true;
				resolve();
			},false);
		});
		Sky.ready=function(callback){
			if(callback && !Sky.isReady){
				return p.then(callback);
			}
			return p;
		};
		Sky.then=function(callback){
			return p.then(callback);
		};
	})();
}

Sky.byId=function(id){
	return document.getElementById(id);
};
Sky.hasClass=function(obj,cls){
	if(!obj) return false;
	return obj.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
};
Sky.addClass=function(obj,cls){
	if(!Sky.hasClass(obj,cls)) obj.className=obj.className.trim()+" "+cls;
};
Sky.removeClass=function(obj,cls){
	if(Sky.hasClass(obj,cls)){
		var reg = new RegExp('(\\s+|^)'+cls+'(\\s+|$)');
		obj.className=obj.className.replace(reg,' ');
	}
};
Sky.toggleClass=function(obj,cls){
	if(Sky.hasClass(obj,cls)){
		var reg = new RegExp('(\\s+|^)'+cls+'(\\s+|$)');
		obj.className=obj.className.replace(reg,' ');
	}else{
		obj.className=obj.className.trim()+" "+cls;
	}
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
Sky.getPrevElement=function(element){
	var e = element.previousSibling;
	if(e == null){ return null;}
	if(e.nodeType==1){
		return e;
	}else{
		return Sky.getPrevElement(e);
	}
};
Sky.getParents=function(ele){
	var arr=[];
	var p=ele.parentNode;
	while(p!==null){
		arr.push(p);
		p=p.parentNode;
	}
	return arr;
};
Sky.getAttrs=function(ele){
	var arr=[];
	var i=ele.attributes.length;
	while(i-->0){
		var attr=ele.attributes[i];
		var key=attr.name,value=attr.value;
		if(attr.specified || key==="value"){
			if(value){
				arr.push(attr);
			}
		}
	}
	return arr;
};

Sky.destroy=function(ele){
	var parent=ele.parentNode;
	if(parent){
		parent.removeChild(ele);
	}
	for(var key in ele){
		if(key.startsWith('on') || key.startsWith('@@')){
			ele[key]=null;
		}
	}
	Sky.removeEvent(ele);
	var i=ele.childNodes.length;
	while(i--){
		var child=ele.childNodes[i];
		if(Sky.isElement(child)){
			Sky.destroy(ele);
		}
	}
};

Sky.getElementStyle=function(el, prop){
	return el.currentStyle[prop] || el.style[prop];
};

if(!document.getElementsByClassName){
	Sky.getElementsByClassName=function(className,e){
		e=e||document;
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

if(document.getElementsByClassName){
	Sky.getElementsByClassName=function(className,e){
		e=e||document;
		return Array.from(e.getElementsByClassName(className));
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
				if(!element.getAttribute(key)) return false;
			}else{
				if(element.getAttribute(key)!=value) return false;
			}
		}
		return true;
	}
	if(document.querySelectorAll){
		Sky.querySelector=function(selector,e){
			if(!e || e===document){
				return Array.from(document.querySelectorAll(selector));
			}else{
				var noId=false;
				if(!e.id){
					e.id="SKY"+Sky.uniqueId();
					noId=true;
				}
				var r=Array.from(document.querySelectorAll("#"+e.id+" "+selector));
				if(noId){
					e.removeAttribute('id');
				}
				return r;
			}
		};
	}else{
		Sky.querySelector=function(selector,ancestor){
			ancestor=ancestor || document;
			var arr,node,result;
			arr=selector.match(/^#([a-zA-Z0-9_\-]+)$/);
			if(arr){
				result=new Array();
				node=document.getElementById(arr[1]);
				if(node && (ancestor==document || ancestor.contains(node))){
					result.push(node);
				}
				return result;
			}
			arr=selector.match(/^\.([a-zA-Z0-9_\-]+)$/);
			if(arr){
				return Sky.getElementsByClassName(arr[1],ancestor);
			}
			selector=formatSelector(selector.replace(/\s+,\s+/g,","));
			return queryAndConcat(ancestor,selector);
		};
	}
	function formatSelector(selector){
		return selector.replace(/\s+>\s+/g,">").replace(/\s+/g," ").trim();
	}
	function queryAndConcat(ancestor,selector){
		var arr=selector.split(",");
		if(arr.length==1){
			return querySelector(ancestor,arr[0]);
		}
		var nodes=[];
		var i=arr.length;
		while(i--){
			selector=arr[i];
			arr=arr.concat(querySelector(ancestor,selector));
		}
		return nodes;
	}
	function parseSeriesSelector(selector){
		return selector.split(">").map(parseNodeSelector);
	}
	function queryById(ancestor,nodeInfo){
		var node=document.getElementById(nodeInfo.id);
		if(node && ancestor.contains(node)){
			if(matchesInfo(node,nodeInfo)){
				return node;
			}
		}
		return null;
	}
	function parseSelector(selector){
		var arr=selector.split(" ");
		return arr.map(parseSeriesSelector);
	}
	function querySelector(ancestor,selector){
		var rels=parseSelector(selector);
		if(rels[0].length==1){
			var first=rels[0][0];
			if(first.id){
				first=queryById(ancestor,first);
				if(first){
					rels.shift();
					return queryByRel(first,rels);
				}
			}
		}
		return queryByRel(ancestor,rels);
	}
	function queryByRel(ancestor,rels){
		var lastGroup=rels[rels.length-1];
		var lastInfo=lastGroup[lastGroup.length-1];
		var lasts;
		if(lastInfo.tagName){
			lasts=ancestor.getElementsByTagName(lastInfo.tagName);
		}else{
			lasts=ancestor.getElementsByTagName("*");
		}
		var result=[];
		for(var i=0;i<lasts.length;i++){
			var ele=lasts[i];
			if(checkRels(ancestor,rels,ele)){
				result.push(ele);
			}
		}
		return result;
	}
	function checkRels(ancestor,rels,ele){
		var i=rels.length-1;
		var series=rels[i];
		var next=checkSeries(ancestor,ele,series);
		if(!next){
			return false;
		}
		if(i<=0){
			return true;
		}
		return !!matches(next,rels,ancestor,i-1);
	}
	function checkSeries(ancestor,ele,series){
		var j=series.length;
		while(j--){
			var nodeInfo=series[j];
			if(matchesInfo(ele,nodeInfo)){
				ele=ele.parentNode;
				if(j>0 && ele===ancestor){
					return null;
				}
			}else{
				return null;
			}
		}
		return ele;
	}
	function matches(ele, rels, ancestor,i){
		var next,first=null;
		while(i>=0){
			var series=rels[i];
			next=checkSeries(ancestor,ele,series);
			if(next){
				if(!first){
					first=ele;
				}
				ele=next;
				i--;
				continue ;
			}
			if(ele===document.body){
				return false;
			}
			ele=ele.parentNode;
			if(ele===ancestor){
				return false;
			}
		}
		return first;
	}
	/**
	 * 向上匹配，匹配成功返回匹配到的元素，没有比配到返回null
	 * **/
	Sky.matches=function(ele, selector, ancestor){
		ancestor=ancestor || document;
		var rels=parseSelector(formatSelector(selector));
		return matches(ele, rels, ancestor,rels.length-1);
	};
	Sky.matchesSelector=function(ele, selector, ancestor){
		ancestor=ancestor || document;
		if(ancestor==document){
			if(ele.matches){
				return ele.matches(selector);
			}else if(ele.matchesSelector){
				return ele.matchesSelector(selector);
			}else if(ele.msMatchesSelector){
				return ele.msMatchesSelector(selector);
			}else if(ele.mozMatchesSelector){
				return ele.mozMatchesSelector(selector);
			}
		}
		var rels=parseSelector(formatSelector(selector));
		return checkRels(ancestor,rels,ele);
	};
	Sky.createSelector=function(selector){
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
	};
})();

Sky.getFormData=function(form){
	if(Sky.isString(form)){
		form=document.forms[form];
	}
	if(form.tagName.toUpperCase()!="FORM"){
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
	if(form.tagName.toUpperCase()!="FORM"){
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
Sky.clearFormData=function(form){
	if(Sky.isString(form)){
		form=document.forms[form];
	}
	if(form.tagName.toUpperCase()!="FORM"){
		throw "form is not exit";
	}
	for(var i=0; i<form.length; i++){
		var input=form[i];
		switch (input.type) {
			case "checkbox":
			case "radio":
				input.checked=false;
				break;
			default:
				input.value="";
		}
	}
};

Sky.notCapture=["load","unload","scroll","resize","blur","focus","mouseenter","mouseleave","input","propertychange"];

if(!document.addEventListener){
	(function(factory){
		factory(globalThis.Sky);
	})(function(Sky){
		Sky.attachEvent=function(ele, evt, func){
			ele.attachEvent( 'on'+evt, func);
		};
		Sky.detachEvent=function(ele, evt, func){
			ele.detachEvent('on'+evt, func);
		};
		Sky.fireEvent=function(ele,evt,props){
			if(!props){
				return ele.fireEvent("on"+evt);
			}
			var e=document.createEventObject();
			if('bubbles' in props){
				e.cancelBubble=!props.bubbles;
			}
			try{
				delete props.type;
				delete props.bubbles;
				delete props.returnValue;
			}catch(err){}
			Object.assign(e, props);
			ele.fireEvent("on"+evt,e);
		};
		Sky.fixEvent=function(){
			var e=window.event;
			e.target=e.srcElement;
			e.stopPropagation=stopPropagation;
			e.preventDefault=preventDefault;
			e.currentTarget=this;
			var receiver=Sky.fixEvent.receiver[e.type];
			if(receiver) receiver(e);
			return e;
		};
		var watcher=Sky.fixEvent.watcher={};
		var proxy=Sky.fixEvent.proxy={};
		var receiver=Sky.fixEvent.receiver={};
		var dispatcher=Sky.fixEvent.dispatcher={};
		function stopPropagation(){
			this.cancelBubble=true;
		}
		function preventDefault(){
			if(this.cancelable===false){
				throw "cancelable:false";
			}
			this.defaultPrevented=true;
			this.returnValue=false;
		}
		if(!("onwheel" in document)){
			if('onmousewheel' in document){
				watcher.wheel='mousewheel';
				proxy.mousewheel=function(){ return "wheel";};
			}
		}
		watcher.input='propertychange';
		proxy.propertychange=function(e){
			if(e.propertyName==='value'){
				var target=e.srcElement;
				if(!target.disabled && !target.readOnly){
					return "input";
				}
			}
		};
		dispatcher.input=function(props){
			props.propertyName='value';
		};
		receiver.mouseleave=function(e){
			e.relatedTarget=e.toElement;
		};
		receiver.mouseenter=function(e){
			e.relatedTarget=e.fromElement;
		};
	});
}

if(document.addEventListener){
	(function(factory){
		factory(globalThis.Sky);
	})(function(Sky){
		var notCapture=Sky.notCapture;
		Sky.attachEvent=function(ele, evt, func, useCapture){
			ele.addEventListener(evt, func, !!useCapture);
		};
		Sky.detachEvent=function(ele, evt, func, useCapture){
			ele.removeEventListener(evt, func, !!useCapture);
		};
		Sky.fireEvent=function(ele,evt,props){
			var e=document.createEvent('Event');
			var bubbles=true;
			var cancelable=true;
			if(props){
				if('bubbles' in props) bubbles=props.bubbles;
				if('cancelable' in props) cancelable=props.cancelable;
				if(bubbles && notCapture.includes(evt)){
					bubbles=false;
				}
				try{
					delete props.type;
					delete props.bubbles;
					delete props.cancelable;
				}catch(err){}
				Object.assign(e,props);
			}
			e.initEvent(evt,bubbles,cancelable);
			return ele.dispatchEvent(e);
		};
		Sky.fixEvent=function(e){
			var receiver=Sky.fixEvent.receiver[e.type];
			if(receiver) receiver(e);
			return e;
		};
		var watcher=Sky.fixEvent.watcher={};
		var proxy=Sky.fixEvent.proxy={};
		var receiver=Sky.fixEvent.receiver={};
		var dispatcher=Sky.fixEvent.dispatcher={};
		
		if(!("onwheel" in document)){
			if(!('onmousewheel' in document)){
				watcher.wheel='DOMMouseScroll';
				proxy.DOMMouseScroll=function(e){
					e.wheelDelta=-e.detail*40;
					return 'wheel';
				};
			}
		}
		if(!("onmouseenter" in document) && !document.attachEvent){
			watcher.mouseenter='mouseover';
			proxy.mouseover=function(e){
				var related=e.relatedTarget;
				if(related!==this && !this.contains(related)){
					return "mouseenter";
				}
			};
		}
		if(!("onmouseleave" in document) && !document.attachEvent){
			watcher.mouseleave='mouseout';
			proxy.mouseout=function(e){
				var related=e.relatedTarget;
				if( related!==this && !this.contains(related) ){
					return "mouseleave";
				}
			}
		}
	});
}

if(document.addEventListener){
	(function(window){
		var EVENTS=Symbol("events");
		var CAPTURES=Symbol("captures");
		function addEvent(ele, evt, func, useCapture){
			var key=useCapture?CAPTURES:EVENTS;
			var set,map=ele[key];
			if(!map){
				map=ele[key]=new Object();
			}
			set=map[evt];
			if(!set){
				set=map[evt]=new Array();
			}
			if(!set.includes(func)){
				set.push(func);
			}
		}
		function removeEvent(ele, evt, func, useCapture){
			var key=useCapture?CAPTURES:EVENTS;
			var map=ele[key];
			if(map){
				var set=map[evt];
				if(set){
					var i=set.indexOf(func);
					if(i>=0){
						set.splice(i,1);
					}
				}
			}
		}
		function isEmpty(ele, evt, useCapture){
			var key=useCapture?CAPTURES:EVENTS;
			var map=ele[key];
			if(!map) return false;
			var set=map[evt];
			if(set) return set.length;
		}
		function dispatchEvent(ele, evt, e){
			var map,set,func,i;
			if(e.eventPhase<=2){
				map=ele[CAPTURES];
				if(map){
					set=map[evt];
					if(set && set.length){
						for(i=0;i<set.length;i++){
							func=set[i];
							func.call(ele,e);
							if(e.cancelBubble){
								return ;
							}
						}
					}
				}
			}
			if(e.eventPhase>=2){
				map=ele[EVENTS];
				if(map){
					set=map[evt];
					if(set && set.length){
						for(i=0;i<set.length;i++){
							func=set[i];
							func.call(ele,e);
							if(e.cancelBubble){
								return ;
							}
						}
					}
				}
			}
		}
		function ffProxy(e){
			e=Sky.fixEvent.call(this,e);
			var proxy=Sky.fixEvent.proxy[e.type];
			if(proxy){
				var evt=proxy.call(this,e);
				if(evt){
					dispatchEvent(this,evt,e);
				}
			}
		}
		Sky.addEvent=function(ele, evt, func, useCapture){
			addEvent(ele,evt,func,useCapture);
			var type=Sky.fixEvent.watcher[evt];
			if(type){
				return Sky.attachEvent(ele,type,ffProxy,useCapture);
			}else{
				type=evt;
			}
			Sky.attachEvent(ele,type,func,useCapture);
		};
		Sky.removeEvent=function(ele, evt, func, useCapture){
			removeEvent(ele, evt, func, useCapture);
			var type=Sky.fixEvent.watcher[evt];
			if(type){
				if(isEmpty(ele, evt, useCapture)){
					Sky.detachEvent(ele,type,ffProxy,useCapture);
				}
				return ;
			}else{
				type=evt;
			}
			Sky.detachEvent(ele,type,func,useCapture);
		};
		Sky.dispatchEvent=function(ele, evt, props){
			var fixEvent=Sky.fixEvent;
			if(evt in fixEvent.dispatcher){
				props=props || new Object();
				fixEvent.dispatcher[evt](props);
			}
			var type=fixEvent.watcher[evt] || evt;
			Sky.fireEvent(ele,type,props);
		};
	})(this);
}

(function(window){
	var EVENTS=Symbol("events");
	Sky.delegate=function(ele,evt,selector,func){
		var proxyHandle=function(e){
			e=Sky.fixEvent.call(ele,e);
			if(e.target===document){
				return ;
			}
			var me=Sky.matches(e.target, selector, ele);
			if(me){
				var proxy=Sky.fixEvent.proxy[e.type];
				if(proxy){
					var evt=proxy.call(this,e);
					if(evt){
						return func.call(me, e);
					}
				}else{
					var related;
					switch(evt){
						case 'mouseleave':
							related=e.relatedTarget || e.toElement;
							if(related===me || me.contains(related)){
								return ;
							}
							break;
						case 'mouseenter':
							related=e.relatedTarget || e.fromElement;
							if(related===me || me.contains(related)){
								return ;
							}
							break;
					}
					return func.call(me, e);
				}
			}
		};
		proxyHandle.target=func;
		proxyHandle.element=ele;
		proxyHandle.selector=selector;
		proxyHandle.event=evt;
		var events=ele[EVENTS];
		if(!events){events=ele[EVENTS]=new Array();}
		events.push(proxyHandle);
		var type=Sky.fixEvent.watcher[evt];
		if(!type){
			switch(evt){
				case 'mouseleave':
					type='mouseout';
					break;
				case 'mouseenter':
					type='mouseover';
					break;
				default:
					type=evt;
			}
		}
		Sky.attachEvent(ele,type,proxyHandle);
	};
	Sky.undelegate=function(ele,evt,selector,func){
		var events=ele[EVENTS];
		if(events){
			var removes=events.filter(filterHandler,{
				event:evt,selector:selector,func:func
			});
			var i=events.length;
			while(i-->0){
				var proxy=events[i];
				if(removes.includes(proxy)){
					events.splice(i,1);
					Sky.detachEvent(ele,proxy.event,proxy);
				}
			}
		}
	};
	function filterHandler(item){
		if(this.event){
			if(this.event==item.event){
				if(this.selector){
					if(this.selector==item.selector){
						if(this.func){
							if(this.func===item.target){
								return true;
							}
						}else{
							return true;
						}
					}
				}else{
					return true;
				}
			}
		}else{
			return true;
		}
	}
})();