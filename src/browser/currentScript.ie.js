
if(!Object.defineProperties){
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
	if(Object.defineProperty){
		Object.defineProperty(document,"currentScript",{
			get:Sky.getCurrentScript
		});
	}
	Reflect.defineProperty(document,"currentScript",{
		enumerable:true,
		get:Sky.getCurrentScript
	});
	Sky.getCurrentPath=function(){
		var currentScript=Sky.getCurrentScript();
		return new URL(currentScript.src,location).href;
	};
}