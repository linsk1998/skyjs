
if(!Proxy.revocable){
	(function(){
		var afterRevoke=function(){
			throw "illegal operation attempted on a revoked proxy";
		};
		Proxy.revocable=function(target,handler){
			var r={};
			r.proxy=new Proxy(target,handler);
			r.revoke=function(){
				handler.get=handler.set=afterRevoke;
			};
			return r;
		};
	})();
}