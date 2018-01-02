(function(window){
	function attachEvent(obj, evt, func){
		if(obj.addEventListener){
			obj.addEventListener(evt, func, false);
		}else if(obj.attachEvent){
			obj.attachEvent( 'on'+evt, func);
		}
	}
	function detachEvent(obj, evt, func){
		if(obj.removeEventListener){
			obj.removeEventListener(evt, func, false);
		}else if(obj.detachEvent){
			obj.detachEvent('on'+evt, func);
		}
	}
	var eventMap=new Map();
	var proxyMap=new Map();
	proxyMap.addEvent=function(ele,func){
		var handles=this.get(ele);
		if(!handles){
			handles=new Array();
			this.set(ele,handles);
		}
		handles.push(func);
	};
	Sky.attachEvent=function(obj, evt, func){
		evt=evt.toLowerCase();
		var events=eventMap.get(obj);
		if(!events){
			events={};
			eventMap.set(obj,events);
		}
		var handles=events[evt];
		if(!handles){
			handles=new Set();
			events[evt]=handles;
		}
		if(!handles.has(func)){
			handles.add(func);
			if('on'+evt in obj){
				attachEvent(obj, evt, func);
			}else{//TODO

			}
		}
	};
	Sky.detachEvent=function(obj, evt, func) {
		var events=eventMap.get(obj);
		if(!events) return ;
		if(evt){
			var handles=events[evt];
			if(!handles) return ;
			if(func){
				detachEvent(obj, evt, func);
				handles['delete'](func);
			}else{
				handles.forEach(function(func){
					Sky.detachEvent(obj, evt, func);
				});
			}
		}else{
			for(evt in events){
				Sky.detachEvent(obj, evt);
			}
			eventMap['delete'](obj);
			proxyMap['delete'](obj);
		}
	};
	Sky.fireEvent=function(e,eventName){
		if(e.dispatchEvent) {
			var ev = document.createEvent('Event');
			ev.initEvent(eventName, false, false);
			e.dispatchEvent(ev);
		}else{
			e.fireEvent("on"+eventName);
		}
	};
	Sky.event={};
	Sky.event.fix={};
	Sky.fn.bind=function(event,callback){
		this.forEach(function(dom){
			Sky.attachEvent(dom,event,callback);
		});
		return this;
	};
	Sky.fn.unbind=function(event,callback){
		this.forEach(function(dom){
			Sky.detachEvent(dom,event,callback);
		});
		return this;
	};
	Sky.fn.trigger=function(event){
		this.forEach(function(dom){
			Sky.fireEvent(dom,event);
		});
		return this;
	};
	var stopPropagation=function(){
		this.cancelBubble=true;
	};
	var preventDefault=function(){
		this.returnValue=false;
	};
	Sky.fn.on=function(evt,selector,func){
		if(func){
			return this.delegate(evt,selector,func);
		}
		func=selector;
		if(evt.addEventListener){
			return this.bind(evt,func);
		}
		this.forEach(function(ele){
			var proxyHandle=function(e){
				e=e || window.event;
				e.target=e.target || e.srcElement;
				e.currentTarget=ele;
				e.stopPropagation=stopPropagation;
				e.preventDefault=preventDefault;
				return func.call(ele,e);
			};
			proxyHandle.target=func;
			proxyHandle.element=ele;
			proxyHandle.event=evt;
			proxyMap.addEvent(ele,proxyHandle);
			Sky.attachEvent(ele,evt,proxyHandle);
		});
	};
	Sky.fn.delegate=function(evt,selector,func){
		return this.forEach(function(ele){
			var proxyHandle=function(e){
				e=e || window.event;
				e.target=e.target || e.srcElement;
				e.stopPropagation=e.stopPropagation || stopPropagation;
				e.preventDefault=e.preventDefault || preventDefault;
				e.currentTarget=ele;
				var me=Sky.matches(e.target, selector, ele, true);
				if(me){
					return func.call(me,e);
				}
			};
			proxyHandle.target=func;
			proxyHandle.element=ele;
			proxyHandle.selector=selector;
			proxyHandle.event=evt;
			proxyMap.addEvent(ele,proxyHandle);
			Sky.attachEvent(ele,evt,proxyHandle);
		});
	};
	Sky.fn.off=Sky.fn.undelegate=function(evt,arg2,arg3){
		var selector,func;
		if(Sky.isString(arg2)){
			selector=arg2;
			if(Sky.isFunction(arg3)){
				func=arg3;
			}
		}else if(Sky.isFunction(arg2)){
			func=arg2;
		}
		return this.forEach(function(ele){
			var proxyList=proxyMap.get(ele);
			if(!proxyList) return ;
			var arr=proxyList.filter(function(handle){
				if(evt){
					if(handle.event!=evt){
						return false;
					}
				}
				if(selector){
					if(handle.selector!=selector){
						return false;
					}
				}
				if(func){
					if(handle.target!=func){
						return false;
					}
				}
				Sky.detachEvent(ele,evt,handle);
				return true;
			});
			for(var i=arr.length-1;i>=0;i--){
				proxyList.splice(i,1);
			}
		});
	};
	if(Sky.browser.ie || "onmouseenter" in document){
		Sky.fn.mouseenter=function(func){
			return this.bind("mouseenter",func);
		};
	}else{
		Sky.fn.mouseenter=function(func){
			this.forEach(function(ele){
				var proxyHandle=function(e){
					var target= e.target;
					var related=e.relatedTarget;
					if(!related || (related!==ele && !ele.contains(related)) ){
						return func.call(ele, e);
					}
				};
				attachEvent(ele,"mouseover",proxyHandle);
			});
			return this;
		};
	}
	if(Sky.browser.ie || "onmouseleave" in document){
		Sky.fn.mouseleave=function(func){
			return this.bind("mouseleave",func);
		};
	}else{
		Sky.fn.mouseleave=function(func){
			this.forEach(function(ele){
				var proxyHandle=function(e){
					var target=e.target;
					var related=e.relatedTarget;
					if(!related || (related!==ele && !ele.contains(related)) ){
						return func.call(ele, e);
					}
				};
				attachEvent(ele,"mouseout",proxyHandle);
			});
			return this;
		};
	}
})(this);
Sky.fn.click=function(callback){
	if(callback){
		return this.bind('click',callback);
	}
	return this.each(function(){
		this.click();
	});
};
if("ontouchstart" in document){
	Sky.fn.tap=function(callback){
		return this.bind("touchstart",function(e){
			this.data.lastTouchTime=Date.now();
		}).bind("touchend",function(e){
			if(Date.now()-this.data.lastTouchTime<200){
				callback.call(this,e);
			}
		});
	};
}else{
	Sky.fn.tap=Sky.fn.click;
}
Sky.fn.input=function(callback){
	if(Sky.browser.ie9){
		this.bind('change',callback);
		this.bind('selectionchange',callback);
		this.bind('keyup',callback);
		this.bind('input',callback);
	}else if('oninput' in document){
		return this.bind('input',callback);
	}else{
		return this.bind('propertychange',function(e){
			e=e || window.event;
			if(e.propertyName=='value'){
				if(!e.srcElement.disabled && !e.srcElement.readOnly){
					callback.call(e.srcElement,e || window.event);
				}
			}
		});
	}
};