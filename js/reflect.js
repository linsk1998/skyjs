
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
		Object.getOwnPropertyDescriptor=Reflect.getOwnPropertyDescriptor;
		Object.defineProperty=function(target, propertyKey, attributes){
			if(!Reflect.defineProperty(target, propertyKey, attributes)){
				throw new Error("defineProperty Error");
			}
		};
	}else{
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
	}
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
				return value;
			}
			o=Reflect.getPrototypeOf(o);
		}while(o && o!==Object.prototype);
		return target[propertyKey]=value;
	};
}