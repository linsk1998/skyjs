
if(document.addEventListener){
	Sky.getScript=function(src,func,charset){
		var script=document.createElement('script');
		script.charset=charset || "UTF-8";
		script.src=src;
		script.async=true;
		if(func){
			if('onafterscriptexecute' in script){
				script.onafterscriptexecute=func;
			}else{
				script.onload=func;
			}
		}
		document.head.appendChild(script);
		return script;
	};
}