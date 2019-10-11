
if(!Array.from){
	Array.from=function(arrayLike, mapFn, thisArg){
		var arr;
		if((arrayLike instanceof Map )||(arrayLike instanceof Set)){
			if(arrayLike.items){
				arrayLike=arrayLike.items;
			}
		}
		if(Sky.isString(arrayLike)){
			arr=new Array();
			for(var i=0;i<arrayLike.length;i++){
				arr.push(arrayLike.charAt(i));
			}
		}else if(Sky.isArrayLike(arrayLike)){
			try{
				arr=Array.prototype.slice.call(arrayLike);
			}catch(e){
				arr=new Array();
				for(var i=0;i<arrayLike.length;i++){
					arr.push(arrayLike[i]);
				}
			}
		}else{
			arr=new Array();
			var entries=arrayLike[Symbol.iterator];
			if(entries){
				var it=entries.call(arrayLike);
				while(true){
					var next=it.next();
					if(next.done) break ;
					arr.push(next.value);
				}
			}
		}
		if(mapFn){
			arr=arr.map( mapFn, thisArg);
		}
		return arr;
	};
}
if(!Array.isArray){
	Array.isArray=function(obj){
		return Object.prototype.toString.call(obj)==='[object Array]';
	};
}
if(!Array.of){
	Array.of=function(){
		return Array.prototype.slice.call(arguments);
	};
}
if(!Array.prototype.includes){
	Array.prototype.includes=function(search,start){
		return this.indexOf(search, start)!==-1;
	};
}
if(!Array.prototype.findIndex){
	Array.prototype.findIndex = function(callback, thisArg) {
		for(var i=0,j; i<this.length; i++){
			j=this[i];
			var r=callback.call(thisArg,j,i,this);
			if(r){
				return i;
			}
		}
		return -1;
	};
}
if(!Array.prototype.find){
	Array.prototype.find = function(callback, thisArg) {
		var i=this.findIndex(callback, thisArg);
		if(i>=0){
			return this[i];
		}
	};
}

(function(){
	function Iterator(arr){
		this.array=arr;
		this.i=0;
	}
	Iterator.prototype.next=function(){
		var result={};
		result.done=this.array.length<=this.i;
		result.value=this.array[this.i];
		if(!result.done){
			this.i++;
		}
		return result;
	};
	Array.prototype.entries=function(){
		return new Iterator(this);
	};
	Array.prototype[Symbol.iterator]=Array.prototype.entries;
})();