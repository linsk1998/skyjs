
if(!document.addEventListener){
	(function(factory){
		factory(globalThis.Sky);
	})(function(Sky){
		Sky.attachEvent=function(ele, evt, func){
			ele.attachEvent( 'on'+evt, func);
		};
		Sky.detachEvent=function(ele, evt, func){
			ele.detachEvent('on'+evt, func);
		};
		Sky.fireEvent=function(ele,evt,props){
			if(!props){
				return ele.fireEvent("on"+evt);
			}
			var e=document.createEventObject();
			if('bubbles' in props){
				e.cancelBubble=!props.bubbles;
			}
			try{
				delete props.type;
				delete props.bubbles;
				delete props.returnValue;
			}catch(err){}
			Object.assign(e, props);
			ele.fireEvent("on"+evt,e);
		};
		Sky.fixEvent=function(){
			var e=window.event;
			e.target=e.srcElement;
			e.stopPropagation=stopPropagation;
			e.preventDefault=preventDefault;
			e.currentTarget=this;
			var receiver=Sky.fixEvent.receiver[e.type];
			if(receiver) receiver(e);
			return e;
		};
		var watcher=Sky.fixEvent.watcher={};
		var proxy=Sky.fixEvent.proxy={};
		var receiver=Sky.fixEvent.receiver={};
		var dispatcher=Sky.fixEvent.dispatcher={};
		function stopPropagation(){
			this.cancelBubble=true;
		}
		function preventDefault(){
			if(this.cancelable===false){
				throw "cancelable:false";
			}
			this.defaultPrevented=true;
			this.returnValue=false;
		}
		if(!("onwheel" in document)){
			if('onmousewheel' in document){
				watcher.wheel='mousewheel';
				proxy.mousewheel=function(){ return "wheel";};
			}
		}
		watcher.input='propertychange';
		proxy.propertychange=function(e){
			if(e.propertyName==='value'){
				var target=e.srcElement;
				if(!target.disabled && !target.readOnly){
					return "input";
				}
			}
		};
		dispatcher.input=function(props){
			props.propertyName='value';
		};
		receiver.mouseleave=function(e){
			e.relatedTarget=e.toElement;
		};
		receiver.mouseenter=function(e){
			e.relatedTarget=e.fromElement;
		};
	});
}