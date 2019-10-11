
if(!document.addEventListener){
	(function(window){
		var notCapture=Sky.notCapture;
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
		function createIeNotCaptureProxy(ieTrigger){
			return function(e){
				e=Sky.fixEvent.call(this,e);
				e.eventPhase=2;
				return ieTrigger.call(this,e);
			};
		}
		function createIeProxy(ieTrigger){
			return function(){
				var parents,i,current;
				var e=window.event;
				if(!e.eventPhase){
					e=Sky.fixEvent.call(this,e);
					e.eventPhase=1;
					parents=Sky.getParents(e.target);
					i=parents.length;
					while(i-->0){
						current=parents[i];
						e.currentTarget=current;
						e.returnValue=ieTrigger.call(current,e);
						e.defaultPrevented=e.returnValue===false;
						if(e.cancelBubble){
							return ;
						}
					}
				}
				if(e.target===this){
					e.eventPhase=2;
				}else{
					e.eventPhase=3;
				}
				e.currentTarget=this;
				return ieTrigger.call(this,e);
			};
		}
		function commonTrigger(e){
			dispatchEvent(this,e.type,e);
			var proxy=Sky.fixEvent.proxy[e.type];
			if(proxy){
				var evt=proxy.call(this,e);
				if(evt){
					dispatchEvent(this,evt,e);
				}
			}
		}
		var ieProxy=createIeProxy(commonTrigger);
		var ieNotCaptureProxy=createIeNotCaptureProxy(commonTrigger);
		Sky.addEvent=function(ele, evt, func, useCapture){
			var type=Sky.fixEvent.watcher[evt] || evt;
			addEvent(ele, evt, func, useCapture);
			if(notCapture.includes(evt)){
				ele['on'+type]=ieNotCaptureProxy;
			}else{
				ele['on'+type]=ieProxy;
			}
		};
		Sky.removeEvent=function(ele, evt, func, useCapture){
			removeEvent(ele, evt, func, useCapture);
			var watcher=Sky.fixEvent.watcher[evt];
			if(watcher){
				if(isEmpty(ele, evt, useCapture) && isEmpty(ele, watcher, useCapture)){
					ele['on'+watcher]=null;
				}
			}else if(isEmpty(ele, evt, useCapture)){
				ele['on'+evt]=null;
			}
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