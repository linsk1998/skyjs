
Sky.support.XMLHttpRequest=true;
if(!this.XMLHttpRequest){
	Sky.support.XMLHttpRequest=false;
	XMLHttpRequest=function(){
		if(XMLHttpRequest.progid){
			return new ActiveXObject(XMLHttpRequest.progid);
		}
		var versions=["Microsoft.XMLHTTP","MSXML2.XMLHTTP","Msxml2.XMLHTTP.5.0"];
		var i=versions.length;
		while(i--){
			try{
				var progid=versions[i];
				var request=new ActiveXObject(progid);
				if(request){
					XMLHttpRequest.progid=progid;
					return request;
				}
			}catch(e){}
		}
	};
}