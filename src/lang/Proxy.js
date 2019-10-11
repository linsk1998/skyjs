Sky.support.Proxy=true;
if(!this.Proxy){
	Sky.support.Proxy=false;
	(function(window){
		var dfGetter=function(target, property, receiver){
			return target[property];
		};
		var dfSetter=function(target, property, value,  receiver){
			target[property]=value;
		};
		var HANDLE_KEY=Symbol("handler");
		var TARGET_KEY=Symbol("target");
		window.Proxy=function(target, handler){
			if(!handler.get){
				handler.get=dfGetter;
			}
			if(!handler.set){
				handler.set=dfSetter;
			}
			var me=Object.defineProperties?this:VBProxyFactory(target,handler);
			me[HANDLE_KEY]=handler;
			me[TARGET_KEY]=target;
			Sky.forIn(target,setProxyProperty,me);
			return me;
		};
		function setProxyProperty(value,key){
			Reflect.defineProperty(this,key,{
				enumerable:true,
				get:function(){
					var target=this[TARGET_KEY];
					var handler=this[HANDLE_KEY];
					return handler.get(target,key,this);
				},
				set:function(value){
					var target=this[TARGET_KEY];
					var handler=this[HANDLE_KEY];
					if(handler.set(target,key,value,this)===false){
						throw new TypeError("'set' on proxy: trap returned falsish for property '"+key+"'");
					}
				}
			});
		}
		Proxy.HANDLE_KEY=HANDLE_KEY;
		Proxy.TARGET_KEY=TARGET_KEY;
	})(this);
}
