
if(!this.XMLHttpRequest){
	Sky.createXMLHttpRequest=function(){
		if(Sky.XHRProgid){
			return new ActiveXObject(Sky.XHRProgid);
		}
		var versions=["Microsoft.XMLHTTP","MSXML2.XMLHTTP","Msxml2.XMLHTTP.5.0"];
		var i=versions.length;
		while(i--){
			try{
				var progid=versions[i];
				var request=new ActiveXObject(progid);
				if(request){
					Sky.XHRProgid=progid;
					return request;
				}
			}catch(e){}
		}
	};
	XMLHttpRequest=Sky.createXMLHttpRequest;//如果你不想要ie6使用new XMLHttpRequest来创建，则去掉这2行
	XMLHttpRequest.sham=true;
}else{
	Sky.createXMLHttpRequest=function(){
		return new XMLHttpRequest();
	};
}