
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