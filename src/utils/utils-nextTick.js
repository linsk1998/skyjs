
	(function(setTimeout){
		var ticks=null;
		Sky.nextTick=function(fn){
			if(!ticks){
				ticks=new Array();
				setTimeout(next);
			}
			ticks.push(fn);
		};
		function next(){
			if(ticks && ticks.length){
				for(var i=0;i<ticks.length;i++){
					var fn=ticks[i];
					try{
						fn();
					}catch(e){
						console.error(e);
					}
				}
				ticks=null;
			}
		}
	})(this.Promise?Promise.prototype.then.bind(Promise.resolve(1)):(this.setImmediate?this.setImmediate:setTimeout));