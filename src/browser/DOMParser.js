if(!this.DOMParser){
	DOMParser=function(){};
	(function(){
		DOMParser.prototype.parseFromString=function(txt){
			var xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async="false";
			xmlDoc.loadXML(txt);
			try{
				xmlDoc.evaluate=evaluate;
				return xmlDoc;
			}catch(e){
				console.error(e);
			}finally{
				xmlDoc=null;
			}
		};
		function evaluate( xpathExpression, contextNode, namespaceResolver, resultType, result){
			contextNode.setProperty("SelectionLanguage","XPath");
			var r=contextNode.selectNodes(xpathExpression);
			//TODO namespaceResolver, resultType, result
			return r;
		}
	})();
}