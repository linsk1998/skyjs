
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