
if(!("getSelection" in window)){
	Sky.clearSelect=function(){
		document.selection.empty();
	};
	Sky.getWord=function(){
		return document.selection.createRange().text;
	};
}
Sky.addFavorite=function(sURL, sTitle){
	try{
		window.external.addFavorite(sURL, sTitle);
	}catch (e){
		alert("\u52a0\u5165\u6536\u85cf\u5931\u8d25\uff0c\u8bf7\u4f7f\u7528Ctrl+D\u8fdb\u884c\u6dfb\u52a0");
	}
};
Sky.setHome=function(ele,url){
	ele.onclick=function(){
		try{
			this.style.behavior='url(#default#homepage)';
			this.setHomePage(url);
			return false;
		}catch(e){
			alert("抱歉，此操作被浏览器拒绝！");
		}
	};
};