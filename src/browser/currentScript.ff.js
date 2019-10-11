
if(Object.defineProperties){
	(function(){
		var supportStack=false;
		var currentScript=document.currentScript;
		if(!currentScript){
			var nodes=document.getElementsByTagName('SCRIPT');
			var currentScript=nodes[nodes.length-1];

			if("readyState" in currentScript){//IE9 IE10
				Sky.getCurrentScript=function(){
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
				Object.defineProperty(document,"currentScript",{
					enumerable:true,
					get:Sky.getCurrentScript
				});
			}else{
				document.addEventListener('load',function(e){
					if(e.target.tagName==="SCRIPT"){
						e.target.readyState="complete";
					}
				},true);
				Object.defineProperty(document,"currentScript",{
					enumerable:true,
					get:function(){
						var path=supportStack?Sky.getCurrentPath():null;
						var nodes=document.getElementsByTagName('SCRIPT');
						var arr=[];
						for(var i=0;i<nodes.length;i++){
							var node=nodes[i];
							if(node.readyState==="complete") {
								continue ;
							}
							if(node.src){
								if(path!==new URL(node.src,location).href){
									continue ;
								}
							}else if(path){
								continue ;
							}
							arr.push(node);
						}
						if(arr.length){
							return arr[arr.length-1];
						}
						return null;
					}
				});
			}
		}
		if(!Sky.getCurrentScript){//最新浏览器
			Sky.getCurrentScript=function(){
				return document.currentScript;
			};
		}
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
				supportStack=true;
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
		if(!supportStack){
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
}