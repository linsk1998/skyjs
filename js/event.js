
(function(window){
	if(document.addEventListener){
		Sky.attachEvent=function(obj, evt, func){
			obj.addEventListener(evt, func, false);
		};
		Sky.detachEvent=function(obj, evt, func){
			obj.removeEventListener(evt, func, false);
		};
		Sky.fireEvent=function(e,eventName){
			var ev=document.createEvent('Event');
			ev.initEvent(eventName, false, false);
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
	function stopPropagation(){
		this.cancelBubble=true;
	}
	function preventDefault(){
		this.returnValue=false;
	}
	var eventMap=new Map();
	var proxyMap=new Map();
	proxyMap.addEvent=function(ele,evt,proxyHandle){
		var handles=this.get(ele);
		if(!handles){
			handles=new Array();
			this.set(ele,handles);
		}
		handles.push(proxyHandle);
		Sky.attachEvent(ele,evt,proxyHandle);
	};
	proxyMap.removeEvent=function(ele,evt,func,selector){
		var proxyList=this.get(ele);
		if(!proxyList) return ;
		var arr=proxyList.filter(function(handle){
			if(evt){
				if(handle.event!=evt){
					return true;
				}
			}
			if(selector){
				if(handle.selector!=selector){
					return true;
				}
			}
			if(func){
				if(handle.target!=func){
					return true;
				}
			}
			Sky.detachEvent(ele,evt,handle);
			return false;
		});
		this.set(ele,arr);
	};
	Sky.addEvent=function(ele, evt, func){
		evt=evt.toLowerCase();
		var events=eventMap.get(ele);
		if(!events){
			events={};
			eventMap.set(ele,events);
		}
		var handles=events[evt];
		if(!handles){
			handles=new Set();
			events[evt]=handles;
		}
		if(!handles.has(func)){
			handles.add(func);
			if(evt in Sky.event.fix){
				Sky.event.fix[evt].attachEvent(ele,evt,func);
			}else if(ele.addEventListener){
				Sky.attachEvent(ele,evt,func);
			}else{
				var proxyHandle=function(e){
					e=e || window.event;
					e.target=e.srcElement;
					e.currentTarget=ele;
					e.relatedTarget=e.toElement || e.fromElement;
					e.stopPropagation=stopPropagation;
					e.preventDefault=preventDefault;
					return func.call(ele,e);
				};
				proxyHandle.target=func;
				proxyHandle.element=ele;
				proxyHandle.event=evt;
				proxyMap.addEvent(ele,evt,proxyHandle);
			}
		}
	};
	Sky.removeEvent=function(ele, evt, func) {
		var events=eventMap.get(ele);
		if(!events) return ;
		if(evt){
			var handles=events[evt];
			if(!handles) return ;
			if(func){
				handles['delete'](func);
				if(evt in Sky.event.fix){
					Sky.event.fix[evt].detachEvent(ele,evt,func);
				}else if(ele.removeEventListener){
					ele.removeEventListener(evt, func, false);
				}else{
					proxyMap.removeEvent(ele, evt, func);
				}
			}else{
				handles.forEach(function(func){
					Sky.removeEvent(ele, evt, func);
				});
			}
		}else{
			for(evt in events){
				Sky.removeEvent(ele, evt);
			}
		}
	};
	Sky.trigger=function(ele, evt){
		var events=eventMap.get(ele);
		if(!events) return ;
		var handles=events[evt];
		if(!handles) return ;
		if('on'+evt in ele){
			Sky.fireEvent(ele, evt);
		}else{
			handles.forEach(function(func){
				var e={};
				e.target=ele;
				e.currentTarget=ele;
				e.relatedTarget=ele;
				e.stopPropagation=stopPropagation;
				e.preventDefault=preventDefault;
				try{
					func.call(ele,e);
				}catch(e){
					console.error(e);
				}
			});
		}
	};
	Sky.event={};
	Sky.event.fix={};
	if(!("onmouseenter" in document) && !Sky.browser.ie){
		Sky.event.fix.mouseenter={
			attachEvent:function(ele, evt, func){
				var proxyHandle=function(e){
					var target= e.target;
					var related=e.relatedTarget;
					if(!related || (related!==ele && !ele.contains(related)) ){
						return func.call(ele, e);
					}
				};
				proxyHandle.target=func;
				proxyHandle.element=ele;
				proxyHandle.event=evt;
				proxyMap.addEvent(ele,"mouseover",proxyHandle);
			},
			detachEvent:function(ele, evt, func){
				proxyMap.removeEvent(ele, evt, func);
			}
		};
	}
	if(!("onmouseleave" in document) && !Sky.browser.ie){
		Sky.event.fix.mouseleave={
			attachEvent:function(ele, evt, func){
				var proxyHandle=function(e){
					var target=e.target;
					var related=e.relatedTarget;
					if(!related || (related!==ele && !ele.contains(related)) ){
						return func.call(ele, e);
					}
				};
				proxyHandle.target=func;
				proxyHandle.element=ele;
				proxyHandle.event=evt;
				proxyMap.addEvent(ele,"mouseout",proxyHandle);
			},
			detachEvent:function(ele, evt, func){
				proxyMap.removeEvent(ele, evt, func);
			}
		};
	}
	if(Sky.browser.ie9){
		Sky.event.fix.input={
			attachEvent:function(ele, evt, func){
				Sky.attachEvent(ele,'change',func);
				Sky.attachEvent(ele,'selectionchange',func);
				Sky.attachEvent(ele,'keyup',func);
				Sky.attachEvent(ele,'input',func);
			},
			detachEvent:function(ele, evt, func){
				Sky.detachEvent(ele,'change',func);
				Sky.detachEvent(ele,'selectionchange',func);
				Sky.detachEvent(ele,'keyup',func);
				Sky.detachEvent(ele,'input',func);
			}
		};
	}else if(document.attachEvent){
		Sky.event.fix.input={
			attachEvent:function(ele, evt, func){
				var proxyHandle=function(e){
					e=e || window.event;
					if(e.propertyName=='value'){
						if(!e.srcElement.disabled && !e.srcElement.readOnly){
							e.target=e.srcElement;
							e.currentTarget=ele;
							e.stopPropagation=stopPropagation;
							e.preventDefault=preventDefault;
							return func.call(ele,e);
						}
					};
				};
				proxyMap.addEvent(ele,"propertychange",proxyHandle);
			},
			detachEvent:function(ele, evt, func){
				proxyMap.removeEvent(ele, evt, func);
			}
		};
	}
	Sky.delegate=function(ele,evt,selector,func){
		var proxyHandle=function(e){
			e=e || window.event;
			e.target || (e.target=e.srcElement);
			if(e.target==document){
				return ;
			}
			e.stopPropagation || (e.stopPropagation=stopPropagation);
			e.preventDefault || (e.preventDefault=preventDefault);
			e.currentTarget || (e.currentTarget=ele);
			var me=Sky.matches(e.target, selector, ele);
			if(me){
				var related;
				switch(evt){
					case 'mouseleave':
						related=e.relatedTarget || e.toElement;
						break;
					case 'mouseenter':
						related=e.relatedTarget || e.fromElement;
						break;
					default:
						return func.call(me,e);
				}
				if(!related || (related!==me && !me.contains(related)) ){
					return func.call(me, e);
				}
			}
		};
		proxyHandle.target=func;
		proxyHandle.element=ele;
		proxyHandle.selector=selector;
		proxyHandle.event=evt;
		switch(evt){
			case 'mouseleave':
				proxyMap.addEvent(ele,'mouseout',proxyHandle);
				break;
			case 'mouseenter':
				proxyMap.addEvent(ele,'mouseover',proxyHandle);
				break;
			default:
				proxyMap.addEvent(ele,evt,proxyHandle);
		}
	};
	Sky.undelegate=function(ele,evt,selector,func){
		proxyMap.removeEvent(ele, evt, func, selector);
	};
})(this);