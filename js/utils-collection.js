
(function(){
	Sky.union=function(){
		var r=new Set();
		var i=arguments.length;
		while(i-->0){
			var c=arguments[i];
			c.forEach(union,r);
		}
		return r;
	};
	function union(value){
		this.add(value);
	}
	Sky.difference=function(q1){
		var r=Sky.union(q1);
		var i=arguments.length;
		while(i-->1){
			var c=arguments[i];
			r.forEach(function(item){
				if(c.has){
					if(!c.has(item)) r['delete'](item);
				}else if(c.indexOf){
					if(c.indexOf(item)<0) r['delete'](item);
				}
			},this);
		}
		return r;
	};
	Sky.intersection=function(q1){
		var r=Sky.union(q1);
		var i=arguments.length;
		while(i-->1){
			var c=arguments[i];
			c.forEach(intersection,r);
		}
		return r;
	};
	function intersection(value){
		this['delete'](value);
	}
})();