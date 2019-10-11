
if(document.addEventListener){
	(function(){
		Sky.isReady=false;
		var p=new Promise(function(resolve, reject){
			document.addEventListener("DOMContentLoaded",function(){
				Sky.isReady=true;
				resolve();
			},false);
		});
		Sky.ready=function(callback){
			if(callback && !Sky.isReady){
				return p.then(callback);
			}
			return p;
		};
		Sky.then=function(callback){
			return p.then(callback);
		};
	})();
}