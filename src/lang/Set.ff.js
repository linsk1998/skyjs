
if(!Set.prototype.forEach){
	Set.prototype.forEach=function(callbackfn,thisArg){
		var it=this.entries();
		while(true){
			var next=it.next();
			if(next.done) break ;
			callbackfn.call(thisArg,next.value[1],next.value[0],this);
		}
	};
}