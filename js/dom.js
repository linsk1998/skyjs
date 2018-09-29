
Sky.byId=function(id){
	return document.getElementById(id);
};
Sky.hasClass=function(obj,cls){
	if(!obj) return false;
	return obj.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
};
Sky.addClass=function(obj,cls){
	if(!Sky.hasClass(obj,cls)) obj.className=obj.className.trim()+" "+cls;
};
Sky.removeClass=function(obj,cls){
	if(Sky.hasClass(obj,cls)){
		var reg = new RegExp('(\\s+|^)'+cls+'(\\s+|$)');
		obj.className=obj.className.replace(reg,' ');
	}
};
Sky.toggleClass=function(obj,cls){
	if(Sky.hasClass(obj,cls)){
		var reg = new RegExp('(\\s+|^)'+cls+'(\\s+|$)');
		obj.className=obj.className.replace(reg,' ');
	}else{
		obj.className=obj.className.trim()+" "+cls;
	}
};
Sky.getElementStyle=function(el, prop){
	if(el.currentStyle){//IE
		return el.currentStyle[prop] || el.style[prop];
	}else if(window.getComputedStyle){//非IE
		var propprop = prop.replace (/([A-Z])/g, "-$1");
		propprop = propprop.toLowerCase();
		var style=window.getComputedStyle(el,null);
		return style[prop] || style.getPropertyValue(propprop) || el.style[prop];
	}
	return '';
};
//获取元素位置
Sky.getPageTop=function(e){
	var offset;
	if(e.getBoundingClientRect){
		offset=e.getBoundingClientRect().top;
		offset+=Math.max(document.documentElement.scrollTop,document.body.scrollTop);
		if(Sky.browser.ie7 && !Sky.browser.quirks){
			//ie7会比正常多两个像素，因为ie7有个边框，我不知道怎么去掉，其他ie浏览器可以使用html{border:0 none;},知道怎么处理的朋友和我说下吧
			offset-=2;
		}
	}else{
		offset=e.offsetTop;
		if(e.offsetParent!=null) offset+=Sky.getPageTop(e.offsetParent);
	}
	return offset;
};
Sky.getPageLeft=function(e){
	var offset;
	if(e.getBoundingClientRect){
		offset=e.getBoundingClientRect().left;
		offset+=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
		if(Sky.browser.ie7 && !Sky.browser.quirks){
			offset-=2;
		}
	}else{
		offset=e.offsetLeft;
		if(e.offsetParent!=null) offset+=Sky.getPageLeft(e.offsetParent);
	}
	return offset;
};
Sky.getNextElement=function(element){
	var e = element.nextSibling;
	if(e == null){ return null;}
	if(e.nodeType==1){
		return e;
	}else{
		return Sky.getNextElement(e);
	}
};
Sky.getPrevElement=function(element){
	var e = element.previousSibling;
	if(e == null){ return null;}
	if(e.nodeType==1){
		return e;
	}else{
		return Sky.getPrevElement(e);
	}
};
Sky.getAttrs=function(ele){
	var arr=[];
	var i=ele.attributes.length;
	while(i-->0){
		var attr=ele.attributes[i];
		var key=attr.name,value=attr.value;
		if(attr.specified || key==="value"){
			if(value){
				arr.push(attr);
			}
		}
	}
	return arr;
};
Sky.getFormData=function(form){
	if(Sky.isString(form)){
		form=document.forms[form];
	}
	if(form.tagName.toUpperCase()!="FORM"){
		throw "form is not exit";
	}
	var o={};
	for(var i=0; i<form.length; i++){
		var input=form[i];
		if(input.name){
			var arr,name,value;
			switch (input.type) {
				case "checkbox":
					if(input.checked){
						if(arr=input.name.match(/(.*)\[\]$/)){
							name=arr[1];
							value=o[name];
							if(!value){
								o[name]=value=[];
							}
							if(input.value){
								value.push(input.value);
							}else{
								value.push("on");
							}
						}else if(arr=input.name.match(/(.*)\[([^\]]+)\]$/)){
							name=arr[1];
							var key=arr[2];
							value=o[name];
							if(!value){
								o[name]=value={};
							}
							if(input.value){
								value[key]=input.value;
							}else{
								value[key]="on";
							}
						}else{
							o[input.name]=input.value;
						}
					}
					break;
				case "radio":
					if(input.checked){
						o[input.name]=input.value;
					}
					break;
				default:
					o[input.name]=input.value;
			}
		}
	}
	return o;
};
Sky.setFormData=function(form,data){
	if(Sky.isString(form)){
		form=document.forms[form];
	}
	if(form.tagName.toUpperCase()!="FORM"){
		throw "form is not exit";
	}
	for(var i=0; i<form.length; i++){
		var input=form[i];
		if(input.name){
			var arr,name,value;
			switch (input.type) {
				case "checkbox":
					if(data){
						if(arr=input.name.match(/(.*)\[\]$/)){
							name=arr[1];
							if(name in data){
								value=data[name];
								if(value.split) value=value.split(",");
								if(value.indexOf && value.indexOf(input.value)>=0){
									input.checked=true;
								}else{
									input.checked=false;
								}
							}
						}else if(arr=input.name.match(/(.*)\[([^\]]+)\]$/)){
							name=arr[1];
							if(name in data){
								var key=arr[2];
								value=data[name];
								if(value && value[key]){
									input.value=value[key];
									input.checked=true;
								}else{
									input.checked=false;
								}
							}
						}else{
							if(input.name in data){
								value=data[input.name];
								if(value){
									input.value=value;
									input.checked=true;
								}else{
									input.checked=false;
								}
							}
						}
					}else{
						input.checked=false
					}
					break;
				case "radio":
					if(data){
						if(input.name in data){
							input.checked=data[input.name]==input.value;
						}
					}else{
						input.checked=false
					}
					break;
				default:
					if(data){
						if(input.name in data){
							input.value=data[input.name];
						}
					}else{
						input.value="";
					}
			}
		}
	}
};
Sky.clearFormData=function(form){
	if(Sky.isString(form)){
		form=document.forms[form];
	}
	if(form.tagName.toUpperCase()!="FORM"){
		throw "form is not exit";
	}
	for(var i=0; i<form.length; i++){
		var input=form[i];
		switch (input.type) {
			case "checkbox":
			case "radio":
				input.checked=false;
				break;
			default:
				input.value="";
		}
	}
};
if(document.getElementsByClassName){
	Sky.getElementsByClassName=function(className,e){
		e=e||document;
		return Array.from(e.getElementsByClassName(className));
	};
}else{
	Sky.getElementsByClassName=function(className,e){
		e=e||document;
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
Sky.destroy=function(ele){
	for(var key in ele){
		if(key.startsWith('on')){
			ele[key]=null;
		}
	}
	Sky.removeEvent(ele);
	var i=ele.childNodes.length;
	while(i--){
		var child=ele.childNodes[i];
		Sky.removeEvent(child);
	}
	var parent=ele.parentNode;
	if(parent){
		parent.removeChild(ele);
	}
};