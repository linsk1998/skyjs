
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
				if(!element.hasAttribute(key)) return false;
			}else{
				if(element.getAttribute(key)!=value) return false;
			}
		}
		return true;
	}
	if(document.getElementsByClassName){
		Sky.getElementsByClassName=function(e,className){
			return Array.from(e.getElementsByClassName(className));
		};
	}else{
		Sky.getElementsByClassName=function(e,className){
			var result=[];
			var nodes= e.getElementsByTagName("*");
			for(var i=0;i<nodes.length;i++){
				if(Sky.hasClass(nodes[i],className)){
					result.push(nodes[i]);
				}
			}
			return result;
		};
	}
	Sky.matches=function(ele, selector, ancestor, canmid){
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
		if(!ancestor.contains(ele)){
			return false;
		}
		var selectors=parseSelector(selector);
		if(!canmid){
			var last=selectors[selectors.length-1];
			last=last[last.length-1];
			if(selectors.length==0 && selectors[0].length==0){
				return matchesInfo(ele,parseNodeSelector(last));
			}
		}
		var parents=[];
		var parent=ele;
		while(parent!=ancestor){
			if(parent){
				parents.push(parent);
			}else{
				break ;
			}
			parent=parent.parentNode;
		}
		var first;
		var checkIndex=0;
		for(var i=0;i<selectors.length;i++){
			while(true){
				var several=selectors[selectors.length-1-i];
				if(several.length+checkIndex>parents.length){
					return false;
				}
				if(!checkSeveral(parents,checkIndex,several)){
					if(checkIndex==0 && !canmid){
						return false;
					}
					checkIndex++;
				}else{
					first=parents[checkIndex];
					checkIndex+=selectors.length;
					break ;
				}
			}
		}
		return first;
	};
	function checkSeveral(parents,checkIndex,several){
		for(var i=0;i<several.length;i++){
			if(!matchesInfo(parents[checkIndex+i],parseNodeSelector(several[several.length-1-i]))){
				return false;
			}
		}
		return true;
	}
	function parseSelector(selector){
		selector=selector.replace(/\s+>\s+/g,">").trim();
		var arr=selector.split(/\s/);
		return arr.map(function(p){
			return p.split(">");
		});
	}
	var matches=function(element, selector){
		var nodeInfo=parseNodeSelector(selector);
		return matchesInfo(element,nodeInfo);
	};
	if(document.querySelectorAll){
		Sky.querySelector=function(e,selector){
			return Array.from(e.querySelectorAll(selector));
		};
	}else{
		Sky.querySelector=function(e,selector){
			return Array.from(Sky.query(selector,e));
		};
	}
	var Batch=function(){ Array.call(this);};
	Batch.prototype=Sky.fn={
		constructor: Batch,
		length: 0,
		indexOf:Array.prototype.indexOf,
		push:Array.prototype.push,
		splice:Array.prototype.splice,
		forEach:Array.prototype.forEach
	};
	Sky.ele=function(ele){
		var nodes=new Batch();
		if(ele){
			nodes.push(ele);
		}
		return nodes;
	};
	Sky.create=function(selector){
		var nodes=new Batch();
		var arr=selector.split(",");
		for(var i=0;i<arr.length;i++){
			nodes.push(createNode(arr[i]));
		}
		return nodes;
		function createNode(selector){
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
		}
	};
	Sky.query=function(selector,parent){
		parent=parent || document;
		var arr,node;
		arr=selector.match(/^#([a-zA-Z0-9_\-]+)$/);
		var nodes=new Batch();
		if(arr){
			node=document.getElementById(arr[1]);
			if(node && (parent==document || parent.contains(node))){
				return Sky.ele(node);
			}
			return nodes;
		}
		arr=selector.match(/^\.([a-zA-Z0-9_\-]+)$/);
		if(arr){
			arr=Sky.getElementsByClassName(parent,arr[1]);
			if(arr.length) nodes.push.apply(nodes,arr);
			return nodes;
		}
		selector=selector.replace(/\s+,\s+/g,",").replace(/\s+>\s+/g,">").replace(/\s+/g," ").trim();
		return query1(parent,selector);
	};
	function query1(ancestor,selector){
		var arr=selector.split(",");
		if(arr.length==1){
			return query2(ancestor,arr[0]);
		}
		var nodes=new Batch();
		arr.forEach(function(selector){
			query2(ancestor,selector).forEach(function(ele){
				nodes.push(ele);
			});
		});
		return nodes;
	}
	function query2(ancestor,selector){
		var arr=selector.split(" ");
		var arr2=[];
		arr.forEach(function(sub){
			arr2.push(sub.split(">"));
		});
		var nodes=query4(ancestor,arr2[0][0]);
		for(var i=0;i<arr2.length;i++){
			for(var j=0;i<arr2.length;i++){
				if(j==0){
					if(i!=0){
						nodes=query3(nodes,arr2[i][0]);
					}
				}else{
					nodes=nodes.children(arr2[i][0]);
				}
				if(nodes.length==0){
					return nodes;
				}
			}
		}
		return nodes;
	}
	function query3(ancestors,selector){
		var nodes=new Batch();
		ancestors.forEach(function(ele){
			var children=query4(ele,selector);
			for(var i=0; i<children.length; i++){
				var child=children[i];
				if(nodes.indexOf(child)<0){
					nodes.push(child);
				}
			}
		});
		return nodes;
	}
	function query4(e,selector){
		var r=new Batch();
		var nodeInfo=parseNodeSelector(selector);
		if(nodeInfo.id){
			var node=document.getElementById(nodeInfo.id);
			if(node){
				if(e.contains(node)){
					if(matchesInfo(e,nodeInfo)){
						r.push(node);
					}
				}
			}
			return r;
		}
		var nodes,i;
		if(nodeInfo.tagName){
			nodes= e.getElementsByTagName(nodeInfo.tagName);
		}else if(nodeInfo.classNames.length>0){
			nodes=Sky.getElementsByClassName(e,nodeInfo.classNames[0]);
		}else{
			nodes=e.getElementsByTagName("*");
		}
		for(i=0;i<nodes.length;i++){
			if(matchesInfo(nodes[i],nodeInfo)){
				r.push(nodes[i]);
			}
		}
		return r;
	}
	Sky.fn.children=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var children=ele.children;
			for(var i=0; i<children.length; i++){
				var child=children[i];
				if(nodes.indexOf(child)<0){
					if(selector && !matches(child,selector)){
						continue ;
					}
					nodes.push(child);
				}
			}
		});
		return nodes;
	};
	Sky.fn.find=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var children=query1(ele,selector);
			for(var i=0; i<children.length; i++){
				var child=children[i];
				if(nodes.indexOf(child)<0){
					nodes.push(child);
				}
			}
		});
		return nodes;
	};
	Sky.fn.parent=function(){
		var nodes=new Batch();
		this.forEach(function(ele){
			var parent=ele.parentNode;
			if(parent && nodes.indexOf(parent)<0){
				nodes.push(parent);
			}
		});
		return nodes;
	};
	Sky.fn.parents=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var parent=ele;
			while((parent=parent.parentNode) && parent!=document){
				if(nodes.indexOf(parent)<0){
					if(selector && !matches(parent,selector)){
						continue ;
					}
					nodes.push(parent);
				}
			};
		});
		return nodes;
	};
	Sky.fn.parentsUntil=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var parent=ele;
			while(parent=parent.parentNode){
				if(nodes.indexOf(parent)<0){
					nodes.push(parent);
					if(matches(parent,selector)) break ;
				}
			};
		});
		return nodes;
	};

	Sky.fn.siblings=function(selector){
		return this.parent().children(selector);
	};
	Sky.fn.nextAll=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var brother=ele;
			while(brother=Sky.getNextElement(brother)){
				if(nodes.indexOf(brother)<0){
					if(selector && !Sky.matches(brother,selector)){
						continue ;
					}
					nodes.push(parent);
				}
			}
		});
		return nodes;
	};
	Sky.fn.prevAll=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var brother=ele;
			while(brother=Sky.getPrevElement(brother)){
				if(nodes.indexOf(brother)<0){
					if(selector && !Sky.matches(brother,selector)){
						continue ;
					}
					nodes.push(parent);
				}
			}
		});
		return nodes;
	};
	Sky.fn.prev=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var brother=Sky.getPrevElement(ele);
			if(brother){
				if(nodes.indexOf(brother)<0){
					if(selector && !Sky.matches(brother,selector)){
						return ;
					}
					nodes.push(parent);
				}
			}
		});
		return nodes;
	};
	Sky.fn.next=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var brother=Sky.getNextElement(ele);
			if(brother){
				if(nodes.indexOf(brother)<0){
					if(selector && !Sky.matches(brother,selector)){
						return ;
					}
					nodes.push(parent);
				}
			}
		});
		return nodes;
	};
	Sky.fn.nextUntil=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var brother=ele;
			while(brother=Sky.getNextElement(brother)){
				if(nodes.indexOf(brother)<0){
					nodes.push(brother);
					if(Sky.matches(brother,selector)) break ;
				}
			};
		});
		return nodes;
	};
	Sky.fn.prevUntil=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var brother=ele;
			while(brother=Sky.getPrevElement(brother)){
				if(nodes.indexOf(brother)<0){
					nodes.push(brother);
					if(Sky.matches(brother,selector)) break ;
				}
			};
		});
		return nodes;
	};
	Sky.fn.first=function(){
		if(this.length){
			var nodes=new Batch();
			nodes.push(this[0]);
			return nodes;
		}
		return this;
	};
	Sky.fn.last=function(){
		if(this.length){
			var nodes=new Batch();
			nodes.push(this[this.length-1]);
			return nodes;
		}
		return this;
	};
	Sky.fn.eq=function(index){
		var nodes=new Batch();
		nodes.push(this[index]);
		return nodes;
	};
	Sky.fn.filter=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			if(Sky.matches(ele,selector)){
				nodes.push(ele );
			}
		});
		return nodes;
	};
	Sky.fn.not=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			if(!Sky.matches(ele,selector)){
				nodes.push(ele );
			}
		});
		return nodes;
	};
})();