
//later is Deprecated
Sky.later=function(fn){
	setTimeout(fn,0);
};
//获取字符串占位长度
Sky.strlen=function(str){
	var len=0;
	for(var i = 0; i < str.length; i++){
		if (str.charCodeAt(i) > 127 || str.charCodeAt(i) < 0){
			len+=2;
		}else{
			len++;
		}
	}
	return len;
};
//截取字符串占位长度
Sky.trunc=function(str,len,replaceStr){
	var relen=Sky.strlen(replaceStr);
	if(relen>len){
		for (var i = relen.length-1; i >= 0; i--){
			if (relen.charCodeAt(i) > 127 || relen.charCodeAt(i) < 0){
				len-=2;
			}else{
				len--;
			}
			if(len<0){
				i++;
				return replaceStr.substr(i,replaceStr.length-i);
			}
		}
	}else{
		len-=relen;
		var p=0;
		for (var i = 0; i < str.length; i++){
			if (str.charCodeAt(i) > 127 || str.charCodeAt(i) < 0){
				p+=2;
			}else{
				p++;
			}
			if(p>len){
				return str.substring(0,i)+replaceStr;
			}
		}
		return str;
	}
};
Sky.parseQuery=function(str){
	var arr;
	if(str.indexOf('?')!=-1){
		arr=str.split("?");
		str=arr[arr.length-1];
	}
	var o = new Object();
	var strs = str.split("&");
	for(var i = 0; i < strs.length; i ++) {
		arr=strs[i].split("=");
		if(arr.length!=2) break ;
		var key=arr[0],value=decodeURIComponent(arr[1]),name,k,v;
		if(arr=key.match(/(.*)\[\]$/)){
			name=arr[1];
			v=o[name];
			if(!v){
				o[name]=v=[];
			}
			v.push(value);
		}else if(arr=key.match(/(.*)\[([^\]]+)\]$/)){
			name=arr[1];
			k=arr[2];
			v=o[name];
			if(!v){
				o[name]=v={};
			}
			v[k]=value;
		}else{
			o[key]=value;
		}
	}
	return o;
};
Sky.buildQuery=function(obj){
	var s='';
	if(obj instanceof Map){
		obj.forEach(fn);
	}else{
		Sky.forOwn(obj,fn);
	}
	function fn(value,key){
		if(value.toJSON) value=value.toJSON();
		if(value.forEach){
			value.forEach(function(value){
				s=s+key+'[]='+encodeURIComponent(value)+'&';
			});
		}else if(Sky.isObject(value)){
			Sky.forOwn(value,function(v,k){
				s=s+key+'['+k+']='+encodeURIComponent(v)+'&';
			});
		}else{
			s=s+key+'='+encodeURIComponent(value)+'&';
		}
	}
	return s.substring(0,s.length-1);
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
Sky.apply=function(obj,config){
	console.warn("Deprecated. use Object.assign");
	Sky.forIn(config,function(v,k){
		obj[k]=v;
	});
	return obj;
};
Sky.applyIf=function(obj,config){
	Sky.forIn(config,function(v,k){
		if(!(k in obj)){
			obj[k]=v;
		}
	});
	return obj;
};
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
(function(){
	var uid=0;
	Sky.id=function(check) {
		uid++;
		var id=Date.now()+"_"+uid;
		if(check){
			if(Sky.byId(id)){
				return Sky.id(check);
			}
		}
		return id;
	};
	var defaultNextSequence;
	var sequenceMap=new Map();
	Sky.uniqueId=function(arg1,arg2){
		if(Sky.isString(arg1)){
			var s=sequenceMap.get(arg1);
			if(Sky.isDefined(s)){
				s++;
			}else{
				if(Sky.isNumber(arg2)){
					s=arg2
				}else{
					s=1;
				}
			}
			sequenceMap.set(arg1,s);
			return s;
		}else{
			if(Sky.isDefined(defaultNextSequence)){
				defaultNextSequence++;
			}else{
				if(Sky.isNumber(arg1)){
					defaultNextSequence=arg1
				}else{
					defaultNextSequence=1;
				}
			}
			return defaultNextSequence;
		}
	};
})();
/* ceil floor round */
(function(){
	function createRound(methodName) {
		var func = Math[methodName];
		return function(number, precision) {
			precision = precision === undefined ? 0 : (+precision || 0);
			if (precision) {
				precision =Math.pow(10,precision);
				return func(number * precision) / precision;
			}
			return func(number);
		};
	}
	Sky.round=createRound('round');
	Sky.floor=createRound('floor');
	Sky.ceil=createRound('ceil');
})();
Sky.random=function(a,b){
	var length=b-a+1;
	return Math.floor(Math.random()*length)+a;
};
Sky.UUID=function() {
	return new Promise(function(resolve, reject){
		var d=new Date().getTime();
		var uuid='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
			var r=(d+Math.random()*16)%16|0;
			d=Math.floor(d/16);
			return (c=='x'?r:(r&0x3|0x8)).toString(16);
		});
		resolve(uuid);
	});
};