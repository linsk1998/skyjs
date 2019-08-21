
Sky.support.Symbol=true;
if(typeof Symbol!=="function"){
	Sky.support.Symbol=false;
	(function(window){
		var sqe=0;
		function Symbol(desc){
			this.__name__="@@"+desc+":"+sqe;
			sqe++;
		}
		Symbol.prototype.toString=function(){
			return this.__name__;
		};
		var cache={};
		Symbol['for']=function(desc){
			if(Object.prototype.hasOwnProperty.call(cache,desc)){
				return cache[desc];
			}
			var s=new Symbol(desc);
			s.__desc__=desc;
			cache[desc]=s;
			return s;
		};
		Symbol.keyFor=function(desc){
			return this.__desc__;
		};
		window.Symbol=function(desc){
			return new Symbol(desc);
		};
	})(this);
}