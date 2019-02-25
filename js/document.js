
if(!('head' in document)) document.head=document.getElementsByTagName("head")[0];
location.origin=location.origin || location.protocol+"//"+location.host;
/** 判断一个节点后代是否包含另一个节点 **/
if(this.Node && Node.prototype && !Node.prototype.contains){
	Node.prototype.contains=function(arg){
		return !!(this.compareDocumentPosition(arg) & 16);
	}
}
if(!document.contains){
	document.contains=function(ele){
		var i,arr=document.all;
		for(i=0;i<arr.length;i++){
			if(arr[i]===ele){
				return true;
			}
		}
		return false;
	};
}
if(this.HTMLElement) {
	if(!document.head.children){
		HTMLElement.prototype.__defineGetter__("children", function() {
			var a=[];
			for(var i=0; i<this.childNodes.length; i++){
				var n=this.childNodes[i];
				if(n.nodeType==1){
					a.push(n);
				}
			}
			return a;
		});
	}
	if(!('innerText' in document.head)){
		(function(){
			HTMLElement.prototype.__defineGetter__( "innerText", function(){
				var anyString = "";
				var childS = this.childNodes;
				for(var i=0; i<childS.length; i++){
					var node=childS[i];
					if(node.nodeType==1){
						switch(node.tagName){
							case "BR":
								anyString+='\n';
								break ;
							case "SCRIPT":
							case "STYLE":
							case "TEMPLATE":
								break ;
							default :
								anyString+=node.innerText;
						}
					}else if(node.nodeType==3){
						var nodeValue=node.nodeValue;
						if(i==0)
							nodeValue=nodeValue.trimLeft();
						if(i==childS.length-1)
							nodeValue=nodeValue.trimRight();
						if(i>0 && i<childS.length-1){
							if(nodeValue.match(/^\s+$/)){
								if(checkBlock(childS[i-1]) || checkBlock(childS[i+1])){
									nodeValue="\n";
								}
							}
						}
						anyString+=nodeValue;
					}
				}
				return anyString.trim();
			});
			function checkBlock(node){
				switch(node.tagName){
					case "BR":
					case "SPAN":
					case "I":
					case "U":
					case "B":
					case "FONT":
						return false;
				}
				return true;
			}
		})();
		HTMLElement.prototype.__defineSetter__( "innerText", function(sText){
			this.textContent=sText;
		});
	}
}