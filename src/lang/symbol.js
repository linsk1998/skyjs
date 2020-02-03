
if(typeof Symbol!=="function"){
	(function(window){
		var sqe=0;
		var all={};
		function Symbol(desc){
			this.__name__="@@"+desc+":"+sqe;
			sqe++;
			all[this.__name__]=this;
		}
		Symbol.prototype.toString=function(){
			return this.__name__;
		};
		var cache={};
		window.Symbol=function(desc){
			return new Symbol(desc);
		};
		window.Symbol['for']=function(desc){
			if(Object.prototype.hasOwnProperty.call(cache,desc)){
				return cache[desc];
			}
			var s=new Symbol(desc);
			s.__desc__=desc;
			cache[desc]=s;
			return s;
		};
		window.Symbol.keyFor=function(symbol){
			return symbol.__desc__;
		};
		window.Symbol.sham=true;
		window.Symbol.iterator="@@iterator";
		Object.getOwnPropertySymbols=function(obj){
			var arr=[];
			for(var key in obj){
				if(key.startsWith("@@")){
					if(Object.prototype.hasOwnProperty.call(obj,key)){
						arr.push(all[key]);
					}
				}
			}
			return arr;
		};
	})(this);
}
if(!Symbol.iterator){
	Symbol.iterator=Symbol("iterator");
}