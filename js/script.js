
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
				if(script.readyState==='loaded'){
					document.head.appendChild(script);
				}else if(script.readyState==='interactive'){
					if(!Object.defineProperty){
						document.currentScript=script;
					}
				}else if(script.readyState==='complete'){
					if(!Object.defineProperty){
						document.currentScript=void 0;
					}
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
	var nodes=document.getElementsByTagName('SCRIPT');
	var currentScript=nodes[nodes.length-1];
	Sky.support.getCurrentScript=true;
	if(document.currentScript!==void 0){//最新浏览器
	}else{
		if("readyState" in currentScript){
			Sky.getCurrentScript=function(){//IE11-
				var nodes=document.getElementsByTagName('SCRIPT');
				var i=nodes.length;
				while(i--){
					var node=nodes[i];
					if(node.readyState==="interactive"){
						return node;
					}
				}
				return null;
			};
			if(Object.defineProperty){
				Object.defineProperty(document,"currentScript",{
					enumerable:!!Object.defineProperties,//IE8不支持enumerable
					get:function(){
						return Sky.getCurrentScript();
					}
				});
			}else{
				window.execScript([
					'Class VBDocProxy',
					'	Public Property Get [currentScript]',
					'		[currentScript]=Sky.getCurrentScript()',
					'	End Property',
					'End Class',
					'Function VBDocProxyFactory()',
					'	Dim o',
					'	Set o = New VBDocProxy',
					'	Set VBDocProxyFactory = o',
					'End Function'
				].join('\n'), 'VBScript');
				window.document=VBDocProxyFactory();
			}
		}else{
			document.addEventListener('load',function(e){
				if(e.target.tagName==="SCRIPT"){
					e.target.readyState="complete";
				}
			},true);
			Sky.support.getCurrentScript=false;
			Object.defineProperty(document,"currentScript",{
				enumerable:true,
				get:function(){
					if(Sky.support.getCurrentPath){
						var path=Sky.getCurrentPath();
						var nodes=document.getElementsByTagName('SCRIPT');
						if(path){
							for(var i=0;i<nodes.length;i++){
								var node=nodes[i];
								if(path===new URL(node.src,location).href){
									if(node.readyState!=="complete") {
										return node;
									}
								}
							}
							return null;
						}
						if(Sky.isReady){
							return null;
						}
					}
					nodes=document.getElementsByTagName('SCRIPT');
					return nodes[nodes.length-1];
				}
			});
		}
	}
	if(!Sky.getCurrentScript){//最新浏览器
		Sky.getCurrentScript=function(){
			return document.currentScript;
		};
	}
	Sky.support.getCurrentPath=true;
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
					if(arr){
						if(arr[1]!=location.href && arr[1]!=location.origin+location.pathname+location.search){
							return arr[1];
						}
					}
				}
			};
		}
	}
	if(!Sky.getCurrentPath){
		Sky.support.getCurrentPath=false;
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