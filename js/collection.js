
if(!this.Map){
	Map=function(){
		this.items=[];
		this.size=0;
	};
	Map.prototype.entries=function(){
		return this.items.entries();
	};
	Map.prototype.clear=function(){
		this.items.splice(0,this.items.length);
		this.size=0;
	};
	Map.prototype["delete"]=function(key){
		var i=this.items.findIndex(function(item){
			return item[0]===key;
		});
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
				callbackfn.call(thisArg,j[1],j[0],i,this);
			}
		}
	};
	Map.prototype.get=function(key){
		var r=this.items.find(function(item){
			return item[0]===key;
		});
		if(r){
			return r[1];
		}
	};
	Map.prototype.has=function(key){
		return this.items.some(function(item){
			return item[0]===key;
		});
	};
	Map.prototype.set=function(key,value){
		var r=this.items.find(function(item){
			return item[0]===key;
		});
		if(r){
			r[1]=value;
		}else{
			this.items.push([key,value]);
		}
		this.size=this.items.length;
		return this;
	};
}
if(!Map.prototype.remove){
	Map.prototype.remove=Map.prototype['delete'];
}
if(!this.Set){
	Set=function(){
		this.items=[];
		this.size=0;
	};
	Set.prototype.has=function(value){
		return this.items.indexOf(value)>=0;
	};
	Set.prototype.add=function(value){
		if(!this.has(value)){
			this.items.push(value);
			this.size=this.items.length;
		}
	};
	Set.prototype['delete']=function(value){
		var i=this.items.indexOf(value);
		if(i>=0){
			this.items.splice(i,1);
			this.size=this.items.length;
			return true;
		}
		return false;
	};
	Set.prototype.clear=function(){
		this.items.splice(0,this.items.length);
		this.size=0;
	};
	Set.prototype.forEach=function(callback,thisArg){
		for(var i=0,j;i<this.size; i++){
			j=this.items[i];
			callback.call(thisArg,j,j,this);
		}
	};
	Set.prototype.toArray=function(){
		return this.items.slice(0);
	};
}
if(!Set.prototype.remove){
	Set.prototype.remove=Set.prototype['delete'];
}
if(!Set.prototype.toArray){
	Set.prototype.toArray=function(){
		var a=[];
		this.forEach(function(item){
			a.push(item);
		});
		return a;
	};
}
if(!Set.prototype.addAll){
	Set.prototype.addAll=function(data){
		if(data.forEach){
			data.forEach(function(item){
				this.add(item);
			},this);
		}
		return this;
	};
}
if(!Set.prototype.removeAll){
	Set.prototype.removeAll=function(data){
		if(data.forEach){
			data.forEach(function(item){
				this.remove(item);
			},this);
		}
		return this;
	};
}
if(!Set.prototype.retainAll){
	Set.prototype.retainAll=function(data){
		this.forEach(function(item){
			if(data.has){
				if(!data.has(item)) this.remove(item);
			}else if(data.indexOf){
				if(data.indexOf(item)<0) this.remove(item);
			}
		},this);
		return this;
	};
}
if(!Set.prototype.toArray){
	Set.prototype.toArray=function(){
		var r=[];
		this.forEach(function(item){
			r.push(item);
		});
		return r;
	};
}