
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