
if(document.addEventListener){
	(function(window){
		var EVENTS=Symbol("events");
		var CAPTURES=Symbol("captures");
		function addEvent(ele, evt, func, useCapture){
			var key=useCapture?CAPTURES:EVENTS;
			var set,map=ele[key];
			if(!map){
				map=ele[key]=new Object();
			}
			set=map[evt];
			if(!set){
				set=map[evt]=new Array();
			}
			if(!set.includes(func)){
				set.push(func);
			}
		}
		function removeEvent(ele, evt, func, useCapture){
			var key=useCapture?CAPTURES:EVENTS;
			var map=ele[key];
			if(map){
				var set=map[evt];
				if(set){
					var i=set.indexOf(func);
					if(i>=0){
						set.splice(i,1);
					}
				}
			}
		}
		function isEmpty(ele, evt, useCapture){
			var key=useCapture?CAPTURES:EVENTS;
			var map=ele[key];
			if(!map) return false;
			var set=map[evt];
			if(set) return set.length;
		}
		function dispatchEvent(ele, evt, e){
			var map,set,func,i;
			if(e.eventPhase<=2){
				map=ele[CAPTURES];
				if(map){
					set=map[evt];
					if(set && set.length){
						for(i=0;i<set.length;i++){
							func=set[i];
							func.call(ele,e);
							if(e.cancelBubble){
								return ;
							}
						}
					}
				}
			}
			if(e.eventPhase>=2){
				map=ele[EVENTS];
				if(map){
					set=map[evt];
					if(set && set.length){
						for(i=0;i<set.length;i++){
							func=set[i];
							func.call(ele,e);
							if(e.cancelBubble){
								return ;
							}
						}
					}
				}
			}
		}
		function ffProxy(e){
			e=Sky.fixEvent.call(this,e);
			var proxy=Sky.fixEvent.proxy[e.type];
			if(proxy){
				var evt=proxy.call(this,e);
				if(evt){
					dispatchEvent(this,evt,e);
				}
			}
		}
		Sky.addEvent=function(ele, evt, func, useCapture){
			addEvent(ele,evt,func,useCapture);
			var type=Sky.fixEvent.watcher[evt];
			if(type){
				return Sky.attachEvent(ele,type,ffProxy,useCapture);
			}else{
				type=evt;
			}
			Sky.attachEvent(ele,type,func,useCapture);
		};
		Sky.removeEvent=function(ele, evt, func, useCapture){
			removeEvent(ele, evt, func, useCapture);
			var type=Sky.fixEvent.watcher[evt];
			if(type){
				if(isEmpty(ele, evt, useCapture)){
					Sky.detachEvent(ele,type,ffProxy,useCapture);
				}
				return ;
			}else{
				type=evt;
			}
			Sky.detachEvent(ele,type,func,useCapture);
		};
		Sky.dispatchEvent=function(ele, evt, props){
			var fixEvent=Sky.fixEvent;
			if(evt in fixEvent.dispatcher){
				props=props || new Object();
				fixEvent.dispatcher[evt](props);
			}
			var type=fixEvent.watcher[evt] || evt;
			Sky.fireEvent(ele,type,props);
		};
	})(this);
}