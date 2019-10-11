
if(document.addEventListener){
	(function(factory){
		factory(globalThis.Sky);
	})(function(Sky){
		var notCapture=Sky.notCapture;
		Sky.attachEvent=function(ele, evt, func, useCapture){
			ele.addEventListener(evt, func, !!useCapture);
		};
		Sky.detachEvent=function(ele, evt, func, useCapture){
			ele.removeEventListener(evt, func, !!useCapture);
		};
		Sky.fireEvent=function(ele,evt,props){
			var e=document.createEvent('Event');
			var bubbles=true;
			var cancelable=true;
			if(props){
				if('bubbles' in props) bubbles=props.bubbles;
				if('cancelable' in props) cancelable=props.cancelable;
				if(bubbles && notCapture.includes(evt)){
					bubbles=false;
				}
				try{
					delete props.type;
					delete props.bubbles;
					delete props.cancelable;
				}catch(err){}
				Object.assign(e,props);
			}
			e.initEvent(evt,bubbles,cancelable);
			return ele.dispatchEvent(e);
		};
		Sky.fixEvent=function(e){
			var receiver=Sky.fixEvent.receiver[e.type];
			if(receiver) receiver(e);
			return e;
		};
		var watcher=Sky.fixEvent.watcher={};
		var proxy=Sky.fixEvent.proxy={};
		var receiver=Sky.fixEvent.receiver={};
		var dispatcher=Sky.fixEvent.dispatcher={};
		
		if(!("onwheel" in document)){
			if(!('onmousewheel' in document)){
				watcher.wheel='DOMMouseScroll';
				proxy.DOMMouseScroll=function(e){
					e.wheelDelta=-e.detail*40;
					return 'wheel';
				};
			}
		}
		if(!("onmouseenter" in document) && !document.attachEvent){
			watcher.mouseenter='mouseover';
			proxy.mouseover=function(e){
				var related=e.relatedTarget;
				if(related!==this && !this.contains(related)){
					return "mouseenter";
				}
			};
		}
		if(!("onmouseleave" in document) && !document.attachEvent){
			watcher.mouseleave='mouseout';
			proxy.mouseout=function(e){
				var related=e.relatedTarget;
				if( related!==this && !this.contains(related) ){
					return "mouseleave";
				}
			}
		}
	});
}