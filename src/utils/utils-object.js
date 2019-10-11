

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
Sky.extend=function(){//扩展对象
	var args=arguments;
	if(args.length==0) return;
	if(args.length==1) return args[0];
	var temp=args[0]==true?args[1]:args[0]; //调用复制对象方法
	for (var n=args[0]==true?2:1;n<args.length;n++){
		for(var i in args[n]){
			if(Sky.hasOwn(args[n],i)){
				if(args[n][i]!=null && args[0]==true && Sky.isObject(args[n][i]) && Sky.isObject(temp[i])){
					temp[i]=Sky.extend(true,temp[i],args[n][i]);
					//temp[i] = args[n][i];
				}else{
					temp[i] = args[n][i];
				}
			}
		}
	}
	return temp;
};
Sky.applyIf=function(obj,config){
	Sky.forIn(config,function(v,k){
		if(!(k in obj)){
			obj[k]=v;
		}
	});
	return obj;
};