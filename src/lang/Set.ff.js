
if(this.Set){
	(function(){
		var GSet=globalThis.Set;
		globalThis.Set=function(args){
			var set=new GSet(args);
			Object.setPrototypeOf(set,Object.getPrototypeOf(this));
			if(args && set.size===0){
				args=Array.from(args);
				args.forEach(GSet.prototype.add,set);
			}
			return set;
		};
		Set.prototype=Object.create(GSet.prototype);;
		if(!Object.getOwnPropertyDescriptor(GSet.prototype,'size') && typeof GSet.prototype.size==="function"){
			Object.defineProperty(Set.prototype,'size',{
				get:function(){
					return GSet.prototype.size.call(this);
				},
				enumerable:true
			});
		}
		var m=new GSet();
		if(m!==m.add(1)){
			Set.prototype.add=function(value){
				GSet.prototype.add.call(this,value);
				return this;
			};
		}
		if(Set.prototype.iterator){
			if(!Set.prototype[Symbol.iterator]){
				Set.prototype[Symbol.iterator]=function(){
					return Sky.toES6Iterator(this.iterator());
				};
			}
			if(!Set.prototype.forEach){
				Set.prototype.forEach=function(callbackfn,thisArg){
					var it=this.iterator();
					while(true){
						try{
							var next=it.next();
						}catch(e){
							break ;
						}
						callbackfn.call(thisArg,next,next,this);
					}
				};
			}
		}
		if(!Set.prototype[Symbol.iterator]){
			if(Set.prototype.forEach){
				Set.prototype[Symbol.iterator]=function(){
					var arr=[];
					this.forEach(pushEach,arr);
					return arr.entries();
				};
			}
		}
		function pushEach(value){
			this.push(value);
		}
	})();
}