/* 这个polyfill只适合解析URL，
 * URL对象创建后，属性修改，其他属性不会变化
 * 如果需要的话，用scenario文件夹的那个polyfill
  * */
try{
	if(new URL(location.href).href){
		Sky.support.URL=true;
	}else{
		Sky.support.URL=false;
	}
}catch(e){
	Sky.support.URL=false;
}
if(!Sky.support.URL){
	URL=function(relativePath, absolutePath){
		var path,arr;
		var pattern=/^[a-zA-Z]+:/;
		if(arr=relativePath.match(pattern)){
			this.href=relativePath;
			this.protocol=arr[0];
			path=relativePath.replace(pattern,"");
			pattern=/^\/*([^\/]+)/;
			var host=path.match(pattern)[1];
			path=path.replace(pattern,"");
			arr=host.split("@");
			if(arr.length>1){
				this.host=arr[1];
				arr=arr[0].split(":");
				if(arr.length>1){
					this.username=arr[0];
					this.password=arr[1];
				}else{
					this.username=arr[0];
				}
			}else{
				this.username="";
				this.password="";
				this.host=host;
			}
		}else if(absolutePath){
			var absInfo=absolutePath.indexOf?new URL(absolutePath):absolutePath;
			this.protocol=absInfo.protocol;
			this.hostname=absInfo.hostname;
			this.host=absInfo.host;
			this.origin=absInfo.origin;
			this.port=absInfo.port;
			this.username=absInfo.username || "";
			this.password=absInfo.password || "";
			this.pathname=absInfo.pathname;
			if(relativePath.startsWith("/")){
				path=relativePath;
			}else if(relativePath.startsWith("../")){
				path=absInfo.pathname+relativePath;
				pattern=/[^\/]+\/\.\.\//;
				while(pattern.test(path)){
					path=path.replace(pattern,"");
				}
				path=path.replace(/^(\/\.\.)+/,"");
			}else{
				if(relativePath.startsWith("#")){
					this.search=absInfo.search;
					this.hash=relativePath;
					this.href=absInfo.href.replace(/#.*$/,this.hash);
					return ;
				}else if(relativePath.startsWith("?")){
					path=absInfo.pathname+relativePath;
				}else{
					path=absInfo.pathname.replace(/[^\/]*$/,"")+relativePath.replace(/^\.\//,"");
				}
			}
		}else{
			throw "SYNTAX_ERROR";
		}
		pattern=/^[^#]*/;
		this.hash=path.replace(pattern,"");
		arr=path.match(pattern);
		path=arr[0];
		pattern=/^[^\?]*/;
		this.search=path.replace(pattern,"");
		arr=path.match(pattern);
		this.pathname=arr[0];

		pattern=/(.*):(\d+)$/;
		arr=this.host.match(pattern);
		this.port="";
		if(arr){
			this.hostname=arr[1];
			if(arr[2]!="80"){
				this.port=arr[2];
			}
		}else{
			this.hostname=this.host;
		}
		this.origin=this.protocol+"//"+this.host;
		var user=this.username;
		if(user){
			if(this.password){
				user+=":"+this.password;
			}
			user+="@";
		}
		this.href=this.protocol+"//"+user+this.host+this.pathname+this.search+this.hash;
	};
}