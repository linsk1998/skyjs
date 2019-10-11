
(function(window){
	var EVENTS=Symbol("events");
	Sky.delegate=function(ele,evt,selector,func){
		var proxyHandle=function(e){
			e=Sky.fixEvent.call(ele,e);
			if(e.target===document){
				return ;
			}
			var me=Sky.matches(e.target, selector, ele);
			if(me){
				var proxy=Sky.fixEvent.proxy[e.type];
				if(proxy){
					var evt=proxy.call(this,e);
					if(evt){
						return func.call(me, e);
					}
				}else{
					var related;
					switch(evt){
						case 'mouseleave':
							related=e.relatedTarget || e.toElement;
							if(related===me || me.contains(related)){
								return ;
							}
							break;
						case 'mouseenter':
							related=e.relatedTarget || e.fromElement;
							if(related===me || me.contains(related)){
								return ;
							}
							break;
					}
					return func.call(me, e);
				}
			}
		};
		proxyHandle.target=func;
		proxyHandle.element=ele;
		proxyHandle.selector=selector;
		proxyHandle.event=evt;
		var events=ele[EVENTS];
		if(!events){events=ele[EVENTS]=new Array();}
		events.push(proxyHandle);
		var type=Sky.fixEvent.watcher[evt];
		if(!type){
			switch(evt){
				case 'mouseleave':
					type='mouseout';
					break;
				case 'mouseenter':
					type='mouseover';
					break;
				default:
					type=evt;
			}
		}
		Sky.attachEvent(ele,type,proxyHandle);
	};
	Sky.undelegate=function(ele,evt,selector,func){
		var events=ele[EVENTS];
		if(events){
			var removes=events.filter(filterHandler,{
				event:evt,selector:selector,func:func
			});
			var i=events.length;
			while(i-->0){
				var proxy=events[i];
				if(removes.includes(proxy)){
					events.splice(i,1);
					Sky.detachEvent(ele,proxy.event,proxy);
				}
			}
		}
	};
	function filterHandler(item){
		if(this.event){
			if(this.event==item.event){
				if(this.selector){
					if(this.selector==item.selector){
						if(this.func){
							if(this.func===item.target){
								return true;
							}
						}else{
							return true;
						}
					}
				}else{
					return true;
				}
			}
		}else{
			return true;
		}
	}
})();