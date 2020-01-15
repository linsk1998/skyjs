
(function(){
	function ES6Iterator(it){
		this.iterator=it;
	}
	ES6Iterator.prototype.next=function(){
		var r={};
		try{
			r.value=this.iterator.next();
			r.done=false;
		}catch(e){
			r.done=true;
		}
		return r;
	};
	ES6Iterator.prototype[Symbol.iterator]=function(){
		return this;
	};
	Sky.toES6Iterator=function(it){
		return new ES6Iterator(it);
	};
})();