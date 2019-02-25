
Sky.toString=null;
if(!Sky.propertyIsEnumerable('toString')){
	Sky.dontEnums=["toString","toLocaleString","valueOf","hasOwnProperty", "isPrototypeOf","propertyIsEnumerable"];
	Sky.forIn=function(obj,fn,thisArg){
		thisArg=thisArg || window;
		for(var key in obj) {
			if(!(obj instanceof Object)){
				if(key.startsWith("__") || key=="constructor"){
					continue ;
				}
			}
			if(fn.call(thisArg,obj[key],key)===false){
				return false;
			}
		}
		var nonEnumIdx=Sky.dontEnums.length;
		var proto=Object.getPrototypeOf(obj);
		//遍历nonEnumerableProps数组
		while(nonEnumIdx--){
			var prop=Sky.dontEnums[nonEnumIdx];
			if(prop in obj && obj[prop]!==proto[prop]){
				if(fn.call(thisArg,obj[prop],prop)===false){
					return false;
				}
			}
		}
		return true;
	};
	Sky.forOwn=function(obj,fn,thisArg){
		thisArg=thisArg || window;
		var type=typeof obj;
		if(type=="unknow"){
			return true;
		}
		if(type!="object"){
			obj=Object(obj);
		}
		for(var key in obj) {
			if(!(obj instanceof Object)){
				if(key.startsWith("__") || key=="constructor"){
					continue ;
				}
			}
			if(Sky.hasOwn(obj,key)){
				if(fn.call(thisArg,obj[key],key)===false){
					return false;
				}
			}
		}
		for(var i=0;i<Sky.dontEnums.length;i++){
			var prop=Sky.dontEnums[i];
			if(Sky.hasOwn(obj,prop)){
				if(fn.call(thisArg,obj[prop],prop)===false){
					return false;
				}
			}
		}
		return true;
	};
	Sky.hasOwn=function(obj,key){
		if(!(key in obj)){
			return false;
		}
		var value=obj[key];
		if(typeof obj=="object" && !(obj instanceof Object)){
			if(Sky.isFunction(value)){
				return true;
			}
			return false;
		}
		return Object.prototype.hasOwnProperty.call(obj,key);
	};
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
	Sky.forOwn=function(obj,fn,thisArg){
		thisArg=thisArg || window;
		for(var key in obj) {
			if(Object.prototype.hasOwnProperty.call(obj,key)){
				if(fn.call(thisArg,obj[key],key)===false){
					return false;
				}
			}
		}
		return true;
	};
	Sky.hasOwn=function(obj,key){
		return Object.prototype.hasOwnProperty.call(obj,key);
	};
}
Sky.pick=function(obj,keys){
	var rest={};
	if(obj){
		Sky.forOwn(obj, function(value,key){
			if(keys.indexOf(key)>=0){
				rest[key]=value;
			}
		});
	}
	return rest;
};
Sky.omit=function(obj,keys){
	var rest={};
	if(obj){
		Sky.forOwn(obj, function(value,key){
			if(keys.indexOf(key)<0){
				rest[key]=value;
			}
		});
	}
	return rest;
};

if(!Object.values){
	Object.values=function(obj){
		var result=[];
		Sky.forOwn(obj,function(value,key){
			result.push(obj[key]);
		});
		return result;
	};
}
if(!Object.keys){
	Object.keys=function(obj){
		var result=[];
		Sky.forOwn(obj,function(value,key){
			result.push(key);
		});
		return result;
	};
}
if(!Object.assign){
	Object.assign=function(target, varArgs){
		if(target==null){
			throw 'Cannot convert undefined or null to object';
		}
		var to=Object(target);
		for(var i=1;i<arguments.length;i++){
			var obj=arguments[i];
			if(obj!=null){
				Sky.forOwn(obj,function(v,k){
					to[k]=v;
				});
			}
		}
		return target;
	};
}