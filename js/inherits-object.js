
Sky.inherits=function(clazz,superClazz){
	Object.assign(clazz,superClazz);
	clazz.prototype=Object.create(superClazz.prototype);
	clazz.superclass=superClazz;//为了其他程序的代码方便获取父类
	clazz.prototype.constructor=clazz;
}

if(!Object.create){
	Object.create=function(proto){
		function F(){}
		F.prototype = proto;
		return new F();
	};
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
	if('__proto__' in Sky){
		Object.getPrototypeOf=function(object){
			return object.__proto__;
		};
	}else{
		Object.getPrototypeOf=function(object){
			var constructor=object.constructor;
			if(Sky.isFunction(constructor)){
				if(object!=constructor.prototype){
					return constructor.prototype;
				}else if('superclass' in constructor){
					return constructor.superclass.prototype;
				}
			}
			console.warn("cannot find Prototype");
			return Object.prototype;
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
}