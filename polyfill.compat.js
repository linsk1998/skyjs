
var globalThis=this;
var Sky={};

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
		Symbol.sham=true;
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
			var proto=Object.getPrototypeOf(obj);
			return proto[key]!==value;
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
			Function.prototype.apply.call(target, thisArgument, argumentsList);
		},
		construct:function(target, argumentsList,NewTarget){
			if(!NewTarget){ NewTarget=target;}
			var o=Object.create(NewTarget.prototype);
			var o2=Reflect.apply(target,o,argumentsList);
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
	Array.prototype.entries=function(){
		return new Iterator(this);
	};
	Array.prototype[Symbol.iterator]=Array.prototype.entries;
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

Math.log2 = Math.log2 || function(n){ return Math.log(n) / Math.log(2); };

if(!this.Set || !this.Set.prototype.entries){
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
}else{
	(function(){
		var GSet=globalThis.Set;
		try{
			Set.call({});
		}catch(e){
			globalThis.Set=function(args){
				var set=new GSet(args);
				Object.setPrototypeOf(set,Object.getPrototypeOf(this));
				return set;
			};
			Set.prototype=GSet.prototype;
		}
	})();
}
if(!Set.prototype.remove){
	Set.prototype.remove=Set.prototype['delete'];
}
if(!Set.prototype[Symbol.iterator]){
	Set.prototype[Symbol.iterator]=Set.prototype.values;
}

if(!this.Map || !this.Map.prototype.entries){
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
}else{
	(function(){
		var GMap=globalThis.Map;
		try{
			Map.call({});
		}catch(e){
			globalThis.Map=function(args){
				var map=new GMap(args);
				Object.setPrototypeOf(map,Object.getPrototypeOf(this));
				return map;
			};
			Map.prototype=GMap.prototype;
		}
	})();
}
if(!Map.prototype.remove){
	Map.prototype.remove=Map.prototype['delete'];
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
				var arr=paramsString.split("?");
				if(arr.length>1){
					paramsString=arr[1];
				}
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
		window.VBURLDesc=properties;
		try{
			window.execScript([
				'Class VBURL',
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
//setImmediate在setTimeout之前执行
if(!this.setImmediate){
	if(!this.Promise){
		(function(global){
			var index=0;
			var handles=new Map();
			var ticks=null;
			global.setImmediate=function(fn){
				index++;
				if(!ticks){
					ticks=new Array();
					setTimeout(nextTick);
				}
				ticks.push(index);
				handles.set(index,arguments);
				return index;
			};
			function nextTick(){
				if(ticks && ticks.length){
					for(var i=0;i<ticks.length;i++){
						var id=ticks[i];
						var args=handles.get(id);
						if(args){
							var fn=args[0];
							args=Array.from(args);
							args.shift();
							try{
								fn.apply(global,args);
							}catch(e){
								console.error(e);
							}
						}
					}
					ticks=null;
					handles.clear();
				}
			}
			setImmediate.nextTick=nextTick;
			var setTimeoutN=setImmediate.setTimeout=setTimeout;
			if(document.addEventListener){
				global.setTimeout=function(fn,d){
					setTimeoutN(function(){
						setImmediate.nextTick();
						fn();
					},d)
				};
			}else{
				window.execScript("function setTimeout(fn,d){setImmediate.setTimeout(function(){setImmediate.nextTick();fn();},d)}");
			}
			global.clearImmediate=function(id){
				handles['delete'](id);
			};
		})(this);
	}
}

(function(global){
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
				setImmediate(function(){
					if(me._state===PENDING){
						me.data=value;
						me._state=RESOLVED;
						me._resolveds.forEach(callAll,me);
						me._resolveds=null;
					}
				});
			}
			function reject(reason) {
				setImmediate(function(){
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
						setImmediate(nextPromise(onResolved,resolve,resolve,reject),me.data);
						break ;
					case REJECTED:
						setImmediate(nextPromise(onRejected,reject,resolve,reject),me.data);
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
if(!this.DOMParser){
	DOMParser=function(){};
	(function(){
		DOMParser.prototype.parseFromString=function(txt){
			var xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async="false";
			xmlDoc.loadXML(txt);
			try{
				xmlDoc.evaluate=evaluate;
				return xmlDoc;
			}catch(e){
				console.error(e);
			}finally{
				xmlDoc=null;
			}
		};
		function evaluate( xpathExpression, contextNode, namespaceResolver, resultType, result){
			contextNode.setProperty("SelectionLanguage","XPath");
			var r=contextNode.selectNodes(xpathExpression);
			//TODO namespaceResolver, resultType, result
			return r;
		}
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