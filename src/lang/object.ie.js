
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