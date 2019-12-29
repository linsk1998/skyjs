
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
	if(globalThis.Symbol && !Symbol.sham){
		Sky.forIn=function(obj,fn,thisArg){
			thisArg=thisArg || window;
			for(var key in obj) {
				if(fn.call(thisArg,obj[key],key)===false){
					return false;
				}
			}
			return true;
		};
	}else{
		var keys=Object.keys;
		if(keys){
			Object.keys=function(obj){
				return keys.call(Object,obj).filter(checkSymbolKey);
			};
			function checkSymbolKey(key){
				return !key.startsWith("@@");
			}
		}
	}
})();