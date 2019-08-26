
if(document.addEventListener){
	Sky.attachEvent=function(obj, evt, func, useCapture){
		obj.addEventListener(evt, func, !!useCapture);
	};
	Sky.detachEvent=function(obj, evt, func, useCapture){
		obj.removeEventListener(evt, func, !!useCapture);
	};
	Sky.fireEvent=function(e,eventName){
		var ev=document.createEvent('Event');
		ev.initEvent(eventName, true, true);
		e.dispatchEvent(ev);
	};
}else{
	Sky.attachEvent=function(obj, evt, func){
		obj.attachEvent( 'on'+evt, func);
	};
	Sky.detachEvent=function(obj, evt, func){
		obj.detachEvent('on'+evt, func);
	};
	Sky.fireEvent=function(e,eventName){
		e.fireEvent("on"+eventName);
	};
}
(function(window){
	var notCapture=["load","unload","scroll","resize","blur","focus","mouseenter","mouseleave","input","propertychange"];
	var EVENTS=Symbol("events");
	var CAPTURES=Symbol("captures");

	
	function attachEvent(obj, evt, func){
		obj['on'+evt]=func;
	}
	function detachEvent(obj, evt){
		obj['on'+evt]=null;
	}

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
	function stopPropagation(){
		this.cancelBubble=true;
	}
	function preventDefault(){
		this.defaultPrevented=true;
		this.returnValue=false;
	}
	function createIeNotCaptureProxy(ieTrigger){
		return function(){
			var e=window.event;
			e.currentTarget=this;
			e.target=e.srcElement;
			e.stopPropagation=stopPropagation;
			e.preventDefault=preventDefault;
			e.eventPhase=2;
			return ieTrigger.call(this,e);
		};
	}
	function createIeProxy(ieTrigger){
		return function(){
			var parents,i,current;
			var e=window.event;
			if(!e.eventPhase){
				e.target=e.srcElement;
				e.stopPropagation=stopPropagation;
				e.preventDefault=preventDefault;
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
	var fix={
		addEvent:{},
		removeEvent:{},
		dispatchEvent:{}
	};
	if(!("onwheel" in document)){
		if('onmousewheel' in document){
			var ieWheelProxy=function(e){
				dispatchEvent(this, 'wheel', e);
			};
			if(document.attachEvent){
				ieWheelProxy=createIeProxy(ieWheelProxy);
				fix.addEvent.wheel=function(ele, evt, func, useCapture){
					addEvent(ele, evt, func, useCapture);
					attachEvent(ele, 'mousewheel', ieWheelProxy);
				};
				fix.removeEvent.wheel=function(ele, evt, func, useCapture){
					removeEvent(ele, evt, func, useCapture);
					if(isEmpty(ele, evt, useCapture)){
						detachEvent(ele, 'mousewheel', ieWheelProxy);
					}
				};
			}else{
				fix.addEvent.wheel=function(ele, evt, func, useCapture){
					addEvent(ele, evt, func, useCapture);
					ele.addEventListener('mousewheel', ieWheelProxy, !!useCapture);
				};
				fix.removeEvent.wheel=function(ele, evt, func, useCapture){
					removeEvent(ele, evt, func, useCapture);
					if(isEmpty(ele, evt, useCapture)){
						ele.removeEventListener('mousewheel', ieWheelProxy, !!useCapture);
					}
				};
			}
			fix.dispatchEvent.wheel=function(ele){
				Sky.fireEvent(ele,'mousewheel');
			};
		}else{
			function ffWheelProxy(e){
				e.wheelDelta=-e.detail*40;
				dispatchEvent(this, "wheel", e);
			}
			fix.addEvent.wheel=function(ele, evt, func, useCapture){
				addEvent(ele, evt, func, useCapture);
				ele.addEventListener('DOMMouseScroll', ffWheelProxy, !!useCapture);
			};
			fix.removeEvent.wheel=function(ele, evt, func, useCapture){
				removeEvent(ele, evt, func, useCapture);
				if(isEmpty(ele, evt, useCapture)){
					ele.removeEventListener('DOMMouseScroll', ffWheelProxy, !!useCapture);
				}
			};
			fix.dispatchEvent.wheel=function(ele, evt){
				Sky.fireEvent(ele,'DOMMouseScroll');
			};
		}
	}
	if(Sky.browser.ie9){
		function ie9InputProxy(e){
			dispatchEvent(this, 'input', e);
		}
		fix.addEvent.input=function(ele, evt, func, useCapture){
			addEvent(ele, evt, func, useCapture);
			ele.addEventListener('selectionchange', ie9InputProxy, !!useCapture);
			ele.addEventListener('keyup', ie9InputProxy, !!useCapture);
			ele.addEventListener('input', ie9InputProxy, !!useCapture);
		};
		fix.removeEvent.input=function(ele, func, useCapture){
			removeEvent(ele, evt, func, useCapture);
			if(isEmpty(ele, evt, useCapture)){
				ele.removeEventListener('selectionchange', ie9InputProxy, !!useCapture);
				ele.removeEventListener('keyup', ie9InputProxy, !!useCapture);
				ele.removeEventListener('input', ie9InputProxy, !!useCapture);
			}
		};
	}else if(document.attachEvent){
		var ieInputProxy=createIeProxy(function(e){
			if(e.propertyName==='value'){
				var target=e.srcElement;
				if(!target.disabled && !target.readOnly){
					dispatchEvent(target,"input",e);
				}
			}
		});
		fix.addEvent.input=function(ele, evt, func, useCapture){
			addEvent(ele, evt, func, useCapture);
			attachEvent(ele, 'propertychange', ieInputProxy);
		};
		fix.removeEvent.input=function(ele, evt, func, useCapture){
			removeEvent(ele, evt, func, useCapture);
			if(isEmpty(ele, evt, useCapture)){
				detachEvent(ele, 'propertychange', ieInputProxy);
			}
		};
		fix.dispatchEvent.input=function(ele, evt){
			var e=document.createEventObject();
			e.propertyName='value';
			ele.fireEvent('onpropertychange', e);
		};
	}
	if(!("onmouseenter" in document) && !Sky.browser.ie){
		function mouseenterProxy(e){
			var target= e.target;
			var related=e.relatedTarget;
			if(!related || (related!==this && !this.contains(related)) ){
				dispatchEvent(this, 'mouseenter', e);
			}
		}
		fix.addEvent.mouseenter=function(ele, evt, func, useCapture){
			addEvent(ele, evt, func, useCapture);
			ele.addEventListener('mouseover', mouseenterProxy, !!useCapture);
		};
		fix.removeEvent.mouseenter=function(ele, func, useCapture){
			removeEvent(ele, evt, func, useCapture);
			if(isEmpty(ele, evt, useCapture)){
				ele.removeEventListener('mouseover', mouseenterProxy, !!useCapture);
			}
		};
	}
	if(!("onmouseleave" in document) && !Sky.browser.ie){
		function mouseleaveProxy(e){
			var target= e.target;
			var related=e.relatedTarget;
			if(!related || (related!==this && !this.contains(related)) ){
				dispatchEvent(this, 'mouseleave', e);
			}
		}
		fix.addEvent.mouseleave=function(ele, evt, func, useCapture){
			addEvent(ele, evt, func, useCapture);
			ele.addEventListener('mouseout', mouseleaveProxy, !!useCapture);
		};
		fix.removeEvent.mouseleave=function(ele, func, useCapture){
			removeEvent(ele, evt, func, useCapture);
			if(isEmpty(ele, evt, useCapture)){
				ele.removeEventListener('mouseout', mouseleaveProxy, !!useCapture);
			}
		};
	}


	if(document.addEventListener){
		Sky.addEvent=function(ele, evt, func, useCapture){
			var fixfunc=fix.addEvent[evt];
			if(fixfunc){
				fixfunc(ele, evt, func, useCapture);
			}else{
				addEvent(ele, evt, func, useCapture);
				ele.addEventListener(evt, func, !!useCapture);
			}
		};
		Sky.removeEvent=function(ele, evt, func, useCapture){
			var fixfunc=fix.removeEvent[evt];
			if(fixfunc){
				fixfunc(ele, evt, func, useCapture);
			}else{
				removeEvent(ele, evt, func, useCapture);
				ele.removeEventListener(ffWheelProxy, !!useCapture);
			}
		};
	}else{
		function commonTrigger(e){
			dispatchEvent(this,e.type,e);
		}
		var ieProxy=createIeProxy(commonTrigger);
		var ieNotCaptureProxy=createIeNotCaptureProxy(commonTrigger);
		Sky.addEvent=function(ele, evt, func, useCapture){
			var fixfunc=fix.addEvent[evt];
			if(fixfunc){
				fixfunc(ele, evt, func, useCapture);
			}else{
				addEvent(ele, evt, func, useCapture);
				if(notCapture.includes(evt)){
					attachEvent(ele, evt, ieNotCaptureProxy);
				}else{
					attachEvent(ele, evt, ieProxy);
				}
			}
		};
		Sky.removeEvent=function(ele, evt, func, useCapture){
			var fixfunc=fix.removeEvent[evt];
			if(fixfunc){
				fixfunc(ele, evt, func, useCapture);
			}else{
				removeEvent(ele, evt, func, useCapture);
				detachEvent(ele, evt);
			}
		};
	}
	Sky.dispatchEvent=function(ele, evt){
		var fixfunc=fix.dispatchEvent[evt];
		if(fixfunc){
			fixfunc(ele, evt);
		}else{
			Sky.fireEvent(ele,evt);
		}
	};
	Sky.delegate=Sky.undelegate=Sky.noop;
})(this);