
if(!this.Map){
	Map=function(arr){
		this.items=new Array();
		if(arr){
			var entries=arr[Symbol.iterator];
			if(entries){
				var it=entries.call(arr);
				while(true){
					var next=it.next();
					if(next.done) break ;
					this.set(next.value[0],next.value[1]);
				}
			}
		}
		this.size=this.items.length;
	};
	Map.prototype.entries=function(){
		return this.items.entries();
	};
	Map.prototype.clear=function(){
		this.items.splice(0,this.items.length);
		this.size=0;
	};
	Map.prototype["delete"]=function(key){
		var i=Sky.findIndex(this.items,0,key);
		if(i>=0){
			var r=this.items[i];
			this.items.splice(i,1);
			this.size=this.items.length;
			return r;
		}
		return false;
	};
	Map.prototype.forEach=function(callbackfn,thisArg){
		var len=this.size;
		for(var i=0,j;i<len; i++){
			j=this.items[i];
			if(j){
				callbackfn.call(thisArg,j[1],j[0],this);
			}
		}
	};
	Map.prototype.get=function(key){
		var r=Sky.find(this.items,0,key);
		if(r){
			return r[1];
		}
	};
	Map.prototype.has=function(key){
		return Sky.findIndex(this.items,0,key)>=0;
	};
	Map.prototype.set=function(key,value){
		var r=Sky.find(this.items,0,key);
		if(r){
			r[1]=value;
		}else{
			this.items.push([key,value]);
		}
		this.size=this.items.length;
		return this;
	};
}
if(!Map.prototype[Symbol.iterator]){
	Map.prototype[Symbol.iterator]=Map.prototype.entries;
}