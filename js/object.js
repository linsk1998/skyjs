
if('__proto__' in Object.prototype){
	Sky.inherits=function(clazz,superClazz){
		Object.assign(clazz,superClazz);
		clazz.prototype=Object.create(superClazz.prototype);
		clazz.prototype.constructor=clazz;
	}
}else{
	Sky.inherits=function(clazz,superClazz){
		Object.assign(clazz,superClazz);
		clazz.prototype=Object.create(superClazz.prototype);
		clazz.prototype.__proto__=superClazz.prototype;
		clazz.prototype.constructor=clazz;
	}
}
if(!Object.create){
	if('__proto__' in Object.prototype){
		Object.create=function(proto){
			var o=new Object();
			o.__proto__=proto;
			return o;
		};
	}else{
		Object.create=function(proto){
			function F(){}
			F.prototype = proto;
			return new F();
		};
	}
}
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

if(!Object.getPrototypeOf){
	if('__proto__' in Object.prototype){
		Object.getPrototypeOf=function(object){
			return object.__proto__;
		};
	}else{
		Object.getPrototypeOf=function(obj){
			if(Object.prototype.hasOwnProperty.call(obj,'constructor')){
				return obj.__proto__;
			}
			return obj.constructor.prototype;
		};
	}
}
if(Sky.support.__defineSetter__){
	if(!Object.defineProperty) {
		Object.defineProperty=function(obj, prop, descriptor){
			if(descriptor.get) obj.__defineGetter__(prop,descriptor.get);
			if(descriptor.set) obj.__defineSetter__(prop,descriptor.set);
			if(descriptor.value) obj[prop]=descriptor.value;
		};
	}
	if(!Object.defineProperties){
		Object.defineProperties=function(obj,properties){
			for(var key in properties){
				var descriptor=properties[key];
				if(descriptor.get) obj.__defineGetter__(key,descriptor.get);
				if(descriptor.set) obj.__defineSetter__(key,descriptor.set);
				if(descriptor.value) obj[key]=descriptor.value;
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
}else{
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
	if(Sky.support.Symbol){
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
		Object.values=function(obj){
			var keys=Object.keys(obj);
			return keys.map(getValues,obj);
		};
		function getValues(key){
			return this[key];
		}
		Sky.toString=null;
		if(Sky.propertyIsEnumerable('toString')){
			var keys=Object.keys;
			if(keys){
				Object.keys=function(obj){
					return keys.call(Object,obj).filter(checkSymbolKey);
				};
				Object.values=function(obj){
					var result=[];
					Sky.forOwn(obj,function(value,key){
						result.push(obj[key]);
					});
					return result;
				};
				function checkSymbolKey(key){
					return !key.startsWith("@@");
				}
			}else{
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
		}else{
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
				var i=Sky.dontEnums.length;
				var proto=Object.getPrototypeOf(obj);
				//遍历nonEnumerableProps数组
				while(i--){
					var prop=Sky.dontEnums[i];
					if(prop in obj && obj[prop]!==proto[prop]){
						if(fn.call(thisArg,obj[prop],prop)===false){
							return false;
						}
					}
				}
				return true;
			};
		}
	}
})();

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
if(!Object.assign){
	Object.assign=function(target, varArgs){
		if(target==null){
			throw 'Cannot convert undefined or null to object';
		}
		var to=Object(target);
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