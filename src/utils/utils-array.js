
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
Sky.union=function(){
	var set=new Set();
	for(var i=0;i<arguments.length;i++){
		var arr=arguments[i];
		if(!Array.isArray(arr)){
			arr=Array.from(arr);
		}
		var j=arr.length;
		while(j-->0){
			set.add(arr[j]);
		}
	}
	return Array.from(set);
};
Sky.difference=function(arg1){
	if(arguments.length===0){
		return new Array();
	}
	var set=new Set(arg1);
	for(var i=1;i<arguments.length;i++){
		var arr=arguments[i];
		if(!Array.isArray(arr)){
			arr=Array.from(arr);
		}
		var j=arr.length;
		while(j-->0){
			set['delete'](arr[j]);
		}
	}
	return Array.from(set);
};
Sky.intersection=function(arg1){
	if(arguments.length===0){
		return new Array();
	}
	var set=new Set(arg1);
	for(var i=1;i<arguments.length;i++){
		var arr=arguments[i];
		if(!Array.isArray(arr)){
			arr=Array.from(arr);
		}
		set.forEach(function(item){
			if(arr.indexOf(item)<0) this['delete'](item);
		},set);
	}
	return Array.from(set);
};