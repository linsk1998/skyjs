
Sky.getScript=function(src,func,charset){
	var script=document.createElement('script');
	if(!charset){charset="UTF-8"};
	script.charset=charset;
	script.src=src;
	script.async=true;
	if(func){
		var event='onreadystatechange';
		if(event in script){
			script.attachEvent(event,function(){
				if(script.readyState=='loaded'){
					document.head.appendChild(script);
				}else if(script.readyState=='complete'){
					script.detachEvent(event,arguments.callee);
					var evt=window.event;
					//evt.target=evt.currentTarget=evt.srcElement;
					func.call(script,evt);
				}
			});
		}else{
			if('onafterscriptexecute' in script){
				script.onafterscriptexecute=func;
			}else{
				script.onload=func;
			}
			document.head.appendChild(script);
		}
	}else{
		document.head.appendChild(script);
	}
	return script;
};
(function(){
	Sky.support.getCurrentPath=true;
	Sky.support.getCurrentScript=true;
	if("currentScript" in document){//最新浏览器
		Sky.getCurrentScript=function(){
			return document.currentScript;
		};
	}else{
		var currentScript;
		Sky.getCurrentScript=function(){//IE
			var nodes=document.getElementsByTagName('SCRIPT');
			var i=nodes.length;
			while(i--){
				var node=nodes[i];
				if(node.readyState==="interactive") {
					return node;
				}
			}
		};
		currentScript=Sky.getCurrentScript();
		if(!currentScript){//非IE的低版本
			try{
				throw new Error('get stack');
			}catch(e){
				var stackHandler={
					'stack':[
						/^@(.*):\d+$/,// Firefox
						/^\s+at (.*):\d+:\d+$/,//Chrome
						/^\s+at [^\(]*\((.*):\d+:\d+\)$/ //IE11
					],
					'stacktrace':[
						/\(\) in\s+(.*?\:\/\/\S+)/m//opera
					]
				};
				var stackResult=handleStack(e,stackHandler);
				if(stackResult){
					Sky.getCurrentPath=function(){
						try{
							throw new Error('get stack');
						}catch(e){
							var arr=getLastStack(e[stackResult.name]).match(stackResult.pattern);
							if(arr && arr[1]!=location.href){
								return arr[1];
							}
						}
					};
					//同时加载多个相同的js会有问题
					Sky.support.getCurrentScript=false;
					Sky.getCurrentScript=function(){
						var nodes=(Sky.isReady?document.head:document).getElementsByTagName('SCRIPT');
						var i=nodes.length;
						var currentPath=Sky.getCurrentPath();
						if(currentPath){
							while(i--){
								var node=nodes[i];
								if(new URL(node.src,location).href==currentPath) {
									return node;
								}
							}
						}else{
							return nodes[nodes.length-1];
						}
					};
				}else{//同时加载多个js会有问题
					Sky.support.getCurrentScript=false;
					Sky.support.getCurrentPath=false;
					Sky.getCurrentScript=function(){
						var nodes=(Sky.isReady?document.head:document).getElementsByTagName('SCRIPT');
						return nodes[nodes.length-1];
					};
				}
			}
		}
	}
	if(!Sky.getCurrentPath){
		Sky.getCurrentPath=function(){
			var currentScript=Sky.getCurrentScript();
			return new URL(currentScript.src,location).href;
		};
	}
	function getLastStack(stack){
		var stacks=stack.trim().split("\n");;
		return stacks[stacks.length-1];
	}
	function handleStack(e,stackHandler){
		for(var name in stackHandler){
			var stacks=e[name];
			if(stacks){
				var patterns=stackHandler[name];
				var stack=getLastStack(stacks);
				var i=patterns.length;
				while(i--){
					var pattern=patterns[i];
					if(pattern.test(stack)){
						return {'name':name,'pattern':pattern};
					}
				}
			}
		}
	}
})();