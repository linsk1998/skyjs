
Sky.fn.each=function(callback){
	this.forEach(function(item,index){
		callback.call(item,index);
	});
	return this;
};
Sky.fn.appendTo=function(parent){
	if(!parent) return this;
	if('append' in parent && parent.length>0){
		parent=parent[0];
	}
	if("appendChild" in parent){
		this.forEach(function(ele){
			parent.appendChild(ele);
		});
	}
	return this;
};
Sky.fn.append=function(){
	var args=Array.from(arguments,0);
	args.forEach(function(sub){
		if(!sub) return ;
		if(Sky.isString(sub) || Sky.isNumber(sub)){
			return this.each(function(){
				var tn=document.createTextNode(sub);
				this.appendChild(tn);
			});
		}else if(sub.appendTo){
			sub.appendTo(this);
			return this;
		}else if(this.length){
			this[0].appendChild(sub);
		}
	},this);
	return this;
};
Sky.fn.prepend=function(sub){
	if(Sky.isString(sub)){
		this.forEach(function(parent){
			var tn=document.createTextNode(sub);
			if(parent.childNodes.length){
				parent.insertBefore(tn,parent.firstChild);
			}else{
				parent.appendChild(tn);
			}
		});
	}else if(this.length){
		var parent=this[0];
		if(sub.each){
			sub.each(function(){
				if(parent.childNodes.length){
					parent.insertBefore(this,parent.firstChild);
				}else{
					parent.appendChild(this);
				}
			});
		}else{
			parent.appendChild(sub);
		}
	}
	return this;
};
Sky.fn.before=function(sub){
	var me=this;
	if(Sky.isString(sub)){
		this.forEach(function(dom){
			var tn=document.createTextNode(sub);
			var parent=dom.parentNode;
			if(parent){
				parent.insertBefore(tn,dom);
			}
		});
	}else if(this.length){
		var parent=this[0].parentNode;
		if(parent){
			if(sub.each){
				sub.each(function(dom){
					parent.insertBefore(this,me[0]);
				});
			}else{
				parent.insertBefore(sub);
			}
		}
	}
	return this;
};
Sky.fn.after=function(sub){
	if(Sky.isString(sub)){
		this.forEach(function(dom){
			var tn=document.createTextNode(sub);
			var parent=dom.parentNode;
			if(parent){
				if(dom.nextSibling){
					parent.insertBefore(tn,dom.nextSibling);
				}else{
					parent.appendChild(tn);
				}
			}
		});
	}else if(this.length){
		var dom=this[0];
		var parent=dom.parentNode;
		if(parent){
			if(sub.each){
				sub.each(function(){
					if(dom.nextSibling){
						parent.insertBefore(this,dom.nextSibling);
					}else{
						parent.appendChild(this);
					}
				});
			}else{
				if(dom.nextSibling){
					parent.insertBefore(sub,dom.nextSibling);
				}else{
					parent.appendChild(sub);
				}
			}
		}
	}
	return this;
};
Sky.fn.addClass=function(className){
	this.forEach(function(dom){
		Sky.addClass(dom,className);
	});
	return this;
};
Sky.fn.removeClass=function(className){
	this.forEach(function(dom){
		Sky.removeClass(dom,className);
	});
	return this;
};
Sky.fn.toggleClass=function(className){
	this.forEach(function(dom){
		Sky.toggleClass(dom,className);
	});
	return this;
};
Sky.fn.hasClass=function(className){
	for(var i=0;i<this.length;i++){
		if(Sky.hasClass(this[i],className)){
			return true;
		}
	}
	return false;
};
if(document.addEventListener){
	Sky.support.cssFloat="cssFloat";
}else{
	Sky.support.cssFloat="styleFloat";
}
Sky.fn.css=function(name,value){
	if(Sky.isString(name)){
		name=name.replace(/\-\w/g,function(str){
			return str.toUpperCase();
		});
		if(value){
			if(name=="float"){
				name=Sky.support.cssFloat;
			}
			this.forEach(function(ele){
				ele.style[name]=value;
			});
		}else if(Sky.isString(name)){
			this.forEach(function(ele){
				ele.style.cssText=name;
			});
		}
	}else{
		this.forEach(function(ele){
			Sky.forOwn(name,function(value,key){
				if(key=="float"){
					key=Sky.support.cssFloat;
				}
				ele.style[key]=value;
			});
		});
	}
	return this;
};
Sky.fn.prop=function(key,value){
	if(value!==undefined){
		for(var i=0;i<this.length;i++){
			this[i][key]=value;
		}
		return this;
	}else{
		if(this.length>0){
			return this[0][key];
		}
	}
};
Sky.fn.attr=function(key,value){
	switch(key.toLowerCase()){
		case "class":
			console.error("'XXX.prop(\"className\")' XXX.addClass(\""+Sky.escapeString(value)+"\") is recommended");
			return this.prop("className",value);
		case "style":
			console.error("'XXX.css(\""+Sky.escapeString(value)+"\")' is recommended");
			return this.css(value);
	}
	if(value!==undefined){
		for(var i=0;i<this.length;i++){
			this[i].setAttribute(key,value);
		}
		return this;
	}else{
		if(this.length>0){
			return this[0].getAttribute(key);
		}
	}
};
Sky.fn.removeAttr=function(key){
	switch(key.toLowerCase()){
		case "class":
			console.error("'XXX.prop(\"className\",\"\")' is recommended");
			return this.prop("className","");
		case "style":
			console.error("'XXX.css(\"\")' is recommended");
			return this.css("");
	}
	for(var i=0;i<this.length;i++){
		this[i].removeAttribute(key);
	}
	return this;
};
Sky.fn.html=function(value){
	if(value){
		this.empty();
	}
	return this.prop("innerHTML",value);
};
Sky.fn.text=function(value){
	var node,tag;
	if(value!=undefined){
		for(var i=0;i<this.length;i++){
			node=this[i];
			tag=node.tagName.toUpperCase();
			switch(tag){
				case "TEXTAREA":
				case "INPUT":
				case "SELECT":
					break;
				default:
					node.innerHTML=Sky.escapeHtml(value);
			}
		}
		return this;
	}else{
		if(this.length>0){
			node=this[0];
			if('textContent' in node){
				return node.textContent;
			}
			return node.innerText;
		}
	}
};
Sky.fn.val=function(value){
	return this.prop("value",value);
};

Sky.domData=new Map();
Sky.fn.data=function(key,value){
	var node;
	if(value!==undefined){//set
		for(var i=0;i<this.length;i++){
			node=this[i];
			var data=Sky.domData.get(node);
			if(!Sky.isDefined(data)) data={};
			data[key]=value;
			Sky.domData.set(node,data);
		}
		return this;
	}else{//get
		if(this.length>0){
			node=this[0];
			var data=Sky.domData.get(node);
			value=data[key];
			if(value!==undefined){
				return value;
			}
			var attr="data-"+key;
			if(node.hasAttribute(attr)){
				value=node.getAttribute(attr);
				return value;
			}
		}
	}
};
Sky.fn.removeData=function(key,value){
	this.forEach(function(node){
		Sky.domData["delete"](node);
	});
	return this;
};
Sky.fn.hide=function(){
	return this.css("display","none");
};
Sky.fn.show=function(){
	return this.css("display","");
};
Sky.fn.remove=function(selector){
	var r=this;
	if(selector){
		r=this.filter(selector);
	}
	r.forEach(function(item){
		var parent=item.parentNode;
		if(parent) parent.removeChild(item);
	});
	return this;
};
Sky.fn.destroy=function(){
	var $children=this.children();
	if($children.length) $children.destroy();
	this.forEach(function(dom){
		var parent=dom.parentNode;
		var data=Sky.domData.get(dom);
		Sky.domData["delete"](dom);
		Sky.detachEvent(dom);
		for(var prop in dom){
			if(prop.startsWith("on")) dom[prop]=null;
		}
		if(parent) parent.removeChild(dom);
	});
	this.splice(0,this.length);
	return this;
};
Sky.fn.empty=function(){
	this.children().destroy();
	return this.prop("innerHTML",'');
};