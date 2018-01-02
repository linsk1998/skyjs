(function(window){
	var frameDoc;
	var routes=[];
	var queue=[];
	var route;
	window.router=function(arg1,arg2){
		if(Sky.isFunction(arg1)){
			add(null,arg1);
		}else if(Sky.isFunction(arg2)){
			add(arg1,arg2);
		}else if(Sky.isString(arg1)){
			go(arg1);
		}else if(Sky.isElement(arg1)){
			var hash=Sky.parseURL(arg1.href).hash;
			go(hash);
		}else{
			if(route===undefined){
				return init();
			}
			return route;
		}
	};
	function init(){
		if(!('onhashchange' in window)){
			go=function(hash){
				detach(hash);
				if(hash){
					location.hash=hash;
				}else{
					location.href="#";
				}
			};
		}else if(window.HashChangeEvent){
			window.onhashchange=function(e){
				detach(Sky.parseURL(e.newURL).hash);
			};
		}else{
			go=function(hash){
				queue.push(hash);
				location.href=hash;
			};
			window.onhashchange=function(e){
				var hash=queue.shift() || location.hash;
				detach(hash);
			};
		}
		detach(location.hash);
	}
	function detach(hash){
		route=hash;
		routes.forEach(function(item){
			var path=item.path;
			try{
				var arr;
				if(Sky.isString(path) && path===hash || path==null){
					item.handler(hash);
				}else if(Sky.isRegExp(path) && (arr=path.test(hash))){
					arr[0]=hash;
					item.handler.apply(hash,arr);
				}
			}catch(e){
				console.error(e);
			}
		});
	}
	function go(hash){
		location.href=hash;
	}
	function add(path,handler){
		routes.push({'path':path,'handler':handler});
	}
})(this);