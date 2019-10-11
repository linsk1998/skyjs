
(function(){
	function parseNodeSelector(selector){
		var result={};
		var reg=/^([a-zA-Z0-9_\-]+)/;
		var arr=selector.match(reg);
		if(arr){
			result.tagName=arr[1];
		}
		result.classNames=[];
		reg=/\.([a-zA-Z0-9_\-]+)/g;
		while(arr=reg.exec(selector)){
			result.classNames.push(arr[1]);
		}
		arr=selector.match(/#([a-zA-Z0-9_\-]+)/);
		if(arr){
			result.id=arr[1];
		}
		result.attribute={};
		reg=/\[([a-zA-Z0-9_\-]+)='?([a-zA-Z0-9_\-]+)'?\]/g;
		while(arr=reg.exec(selector)){
			result.attribute[arr[1]]=arr[2];
		}
		reg=/\[([a-zA-Z0-9_\-]+)\]/g;
		while(arr=reg.exec(selector)){
			result.attribute[arr[1]]=null;
		}
		return result;
	}
	function matchesInfo(element, nodeInfo){
		if(nodeInfo.tagName && nodeInfo.tagName.toLocaleUpperCase()!=element.tagName.toLocaleUpperCase()) return false;
		if(nodeInfo.id && nodeInfo.id!=element.id) return false;
		for(var i=0;i<nodeInfo.classNames.length;i++){
			if(!Sky.hasClass(element,nodeInfo.classNames[i])){
				return false;
			}
		}
		for(var key in nodeInfo.attribute){
			var value=nodeInfo.attribute[key];
			if(value===null){
				if(!element.getAttribute(key)) return false;
			}else{
				if(element.getAttribute(key)!=value) return false;
			}
		}
		return true;
	}
	if(document.querySelectorAll){
		Sky.querySelector=function(selector,e){
			if(!e || e===document){
				return Array.from(document.querySelectorAll(selector));
			}else{
				var noId=false;
				if(!e.id){
					e.id="SKY"+Sky.uniqueId();
					noId=true;
				}
				var r=Array.from(document.querySelectorAll("#"+e.id+" "+selector));
				if(noId){
					e.removeAttribute('id');
				}
				return r;
			}
		};
	}
	function formatSelector(selector){
		return selector.replace(/\s+>\s+/g,">").replace(/\s+/g," ").trim();
	}
	function queryAndConcat(ancestor,selector){
		var arr=selector.split(",");
		if(arr.length==1){
			return querySelector(ancestor,arr[0]);
		}
		var nodes=[];
		var i=arr.length;
		while(i--){
			selector=arr[i];
			arr=arr.concat(querySelector(ancestor,selector));
		}
		return nodes;
	}
	function parseSeriesSelector(selector){
		return selector.split(">").map(parseNodeSelector);
	}
	function queryById(ancestor,nodeInfo){
		var node=document.getElementById(nodeInfo.id);
		if(node && ancestor.contains(node)){
			if(matchesInfo(node,nodeInfo)){
				return node;
			}
		}
		return null;
	}
	function parseSelector(selector){
		var arr=selector.split(" ");
		return arr.map(parseSeriesSelector);
	}
	function querySelector(ancestor,selector){
		var rels=parseSelector(selector);
		if(rels[0].length==1){
			var first=rels[0][0];
			if(first.id){
				first=queryById(ancestor,first);
				if(first){
					rels.shift();
					return queryByRel(first,rels);
				}
			}
		}
		return queryByRel(ancestor,rels);
	}
	function queryByRel(ancestor,rels){
		var lastGroup=rels[rels.length-1];
		var lastInfo=lastGroup[lastGroup.length-1];
		var lasts;
		if(lastInfo.tagName){
			lasts=ancestor.getElementsByTagName(lastInfo.tagName);
		}else{
			lasts=ancestor.getElementsByTagName("*");
		}
		var result=[];
		for(var i=0;i<lasts.length;i++){
			var ele=lasts[i];
			if(checkRels(ancestor,rels,ele)){
				result.push(ele);
			}
		}
		return result;
	}
	function checkRels(ancestor,rels,ele){
		var i=rels.length-1;
		var series=rels[i];
		var next=checkSeries(ancestor,ele,series);
		if(!next){
			return false;
		}
		if(i<=0){
			return true;
		}
		return !!matches(next,rels,ancestor,i-1);
	}
	function checkSeries(ancestor,ele,series){
		var j=series.length;
		while(j--){
			var nodeInfo=series[j];
			if(matchesInfo(ele,nodeInfo)){
				ele=ele.parentNode;
				if(j>0 && ele===ancestor){
					return null;
				}
			}else{
				return null;
			}
		}
		return ele;
	}
	function matches(ele, rels, ancestor,i){
		var next,first=null;
		while(i>=0){
			var series=rels[i];
			next=checkSeries(ancestor,ele,series);
			if(next){
				if(!first){
					first=ele;
				}
				ele=next;
				i--;
				continue ;
			}
			if(ele===document.body){
				return false;
			}
			ele=ele.parentNode;
			if(ele===ancestor){
				return false;
			}
		}
		return first;
	}
	/**
	 * 向上匹配，匹配成功返回匹配到的元素，没有比配到返回null
	 * **/
	Sky.matches=function(ele, selector, ancestor){
		ancestor=ancestor || document;
		var rels=parseSelector(formatSelector(selector));
		return matches(ele, rels, ancestor,rels.length-1);
	};
	Sky.matchesSelector=function(ele, selector, ancestor){
		ancestor=ancestor || document;
		if(ancestor==document){
			if(ele.matches){
				return ele.matches(selector);
			}else if(ele.matchesSelector){
				return ele.matchesSelector(selector);
			}else if(ele.msMatchesSelector){
				return ele.msMatchesSelector(selector);
			}else if(ele.mozMatchesSelector){
				return ele.mozMatchesSelector(selector);
			}
		}
		var rels=parseSelector(formatSelector(selector));
		return checkRels(ancestor,rels,ele);
	};
	Sky.createSelector=function(selector){
		var nodeInfo=parseNodeSelector(selector);
		var tagName=nodeInfo.tagName || "div";
		var node=document.createElement(tagName);
		if(nodeInfo.classNames.length) node.className=nodeInfo.classNames.join(" ");
		nodeInfo.id && (node.id=nodeInfo.id);
		for(var key in nodeInfo.attribute){
			node.setAttribute(key,nodeInfo.attribute[key]);
		}
		var arr=selector.match(/:content\((.*)\)$/);
		if(arr){
			node.appendChild(document.createTextNode(arr[1]));
		}
		return node;
	};
})();