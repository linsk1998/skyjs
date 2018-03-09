
Sky.later=function(fn){
	setTimeout(fn,0);
};
Sky.clearSelect="getSelection" in window ? function(){
	window.getSelection().removeAllRanges();
} : function(){
	document.selection.empty();
};
Sky.addFavorite=function(sURL, sTitle){
	try{
		window.external.addFavorite(sURL, sTitle);
	}catch (e){
		try{
			window.sidebar.addPanel(sTitle, sURL, "");
		}catch (e){
			if(Sky.browser.moblie){
				alert("请点击菜单上的“☆”加入收藏");
			}else{
				alert("\u52a0\u5165\u6536\u85cf\u5931\u8d25\uff0c\u8bf7\u4f7f\u7528Ctrl+D\u8fdb\u884c\u6dfb\u52a0");
			}
		}
	}
};
Sky.setHome=function(ele,url){
	ele.onclick=function(){
		try{
			this.style.behavior='url(#default#homepage)';
			this.setHomePage(url);
			return false;
		}catch(e){
			if('netscape' in window){
				try{
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				}catch(e){
					alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
					return false;
				}
			}
		}
	};
};
Sky.copyToClipboard=function(txt){
	if(window.clipboardData){
		try{
			window.clipboardData.setData("Text",txt);
			return ;
		}catch(e){
		}
	}
	var tip=Sky.browser.moblie?"长按复制到剪贴板：":"Ctrl+C复制到剪贴板：";
	prompt(tip,txt);
};
//document.getElementById("text").select();
//document.execCommand("copy",false,null);
//开头补零
//Deprecated
Sky.pad=function(value,width,chars){
	if(!chars){chars=" ";}
	if(Sky.isNumber(value)){
		chars="0";
	}
	value+='';
	return value.padStart(width,chars);
};
//清除HTML代码
Sky.escapeHtml=function(str) {
	return str.replace(/&/g,'&amp;')
		.replace(/</g,'&lt;')
		.replace(/>/g,'&gt;');
};
Sky.escapeAttribute=function(str,quot){
	var esc=Sky.escapeHtml(str);
	if(!quot || quot=='"'){
		return esc.replace(/"/g,'&quot;');
	}else{
		return esc.replaceAll(quot.charAt(0),'&#'+quot.charCodeAt(0)+";");
	}
};
(function(){
	var div=document.createElement('div');
	var htmlEscapes={
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;',
		'`': '&#96;'
	};
	Sky.escape=function(text){
		return text.replace(/[&<>"'`]/g,function(i){
			return htmlEscapes[i];
		});
	};
	Sky.unescape=function(html){
		div.innerHTML=html;
		return div.innerText || div.textContent ;
	};
})();
Sky.escapeString=function(str) {//from lodash
	var rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	rx_escapable.lastIndex = 0;
	return rx_escapable.test(str)
		? str.replace(rx_escapable, function(a) {
		var meta = {
			"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r": "\\r",	"\"": "\\\"","\\": "\\\\"
		};
		var c = meta[a];
		return typeof c === "string"
			? c
			: "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
	}): str;
};
Sky.escapeRegExp=function(str){//from lodash
	if(str){
		var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g;
		reRegExpChars.lastIndex = 0;
		return (reRegExpChars.test(str))
			? str.replace(reRegExpChars, function(chr, leadingChar, whitespaceChar) {
			if (leadingChar) {
				var regexpEscapes = {
					'0': 'x30', '1': 'x31', '2': 'x32', '3': 'x33', '4': 'x34',
					'5': 'x35', '6': 'x36', '7': 'x37', '8': 'x38', '9': 'x39',
					'A': 'x41', 'B': 'x42', 'C': 'x43', 'D': 'x44', 'E': 'x45', 'F': 'x46',
					'a': 'x61', 'b': 'x62', 'c': 'x63', 'd': 'x64', 'e': 'x65', 'f': 'x66',
					'n': 'x6e', 'r': 'x72', 't': 'x74', 'u': 'x75', 'v': 'x76', 'x': 'x78'
				};
				chr = regexpEscapes[chr];
			} else if (whitespaceChar) {
				var stringEscapes = {
					'\\': '\\',
					"'": "'",
					'\n': 'n',
					'\r': 'r',
					'\u2028': 'u2028',
					'\u2029': 'u2029'
				};
				chr = stringEscapes[chr];
			}
			return '\\' + chr;
		})
			: str;
	}
	return "(?:)";
};
//获取字符串占位长度
Sky.strlen=function(str){
	var len=0;
	for(var i = 0; i < str.length; i++){
		if (str.charCodeAt(i) > 127 || str.charCodeAt(i) < 0){
			len+=2;
		}else{
			len++;
		}
	}
	return len;
};
//截取字符串占位长度
Sky.trunc=function(str,len,replaceStr){
	var relen=Sky.strlen(replaceStr);
	if(relen>len){
		for (var i = relen.length-1; i >= 0; i--){
			if (relen.charCodeAt(i) > 127 || relen.charCodeAt(i) < 0){
				len-=2;
			}else{
				len--;
			}
			if(len<0){
				i++;
				return replaceStr.substr(i,replaceStr.length-i);
			}
		}
	}else{
		len-=relen;
		var p=0;
		for (var i = 0; i < str.length; i++){
			if (str.charCodeAt(i) > 127 || str.charCodeAt(i) < 0){
				p+=2;
			}else{
				p++;
			}
			if(p>len){
				return str.substring(0,i)+replaceStr;
			}
		}
		return str;
	}
};
Sky.parseQuery=function(str){
	var arr;
	if(str.indexOf('?')!=-1){
		arr=str.split("?");
		str=arr[arr.length-1];
	}
	var o = new Object();
	var strs = str.split("&");
	for(var i = 0; i < strs.length; i ++) {
		arr=strs[i].split("=");
		if(arr.length!=2) break ;
		var key=arr[0],value=decodeURIComponent(arr[1]),name,k,v;
		if(arr=key.match(/(.*)\[\]$/)){
			name=arr[1];
			v=o[name];
			if(!v){
				o[name]=v=[];
			}
			v.push(value);
		}else if(arr=key.match(/(.*)\[([^\]]+)\]$/)){
			name=arr[1];
			k=arr[2];
			v=o[name];
			if(!v){
				o[name]=v={};
			}
			v[k]=value;
		}else{
			o[key]=value;
		}
	}
	return o;
};
Sky.buildQuery=function(obj){
	var s='';
	if(obj instanceof Map){
		obj.forEach(fn);
	}else{
		Sky.forOwn(obj,fn);
	}
	function fn(value,key){
		if(value.toJSON) value=value.toJSON();
		if(value.forEach){
			value.forEach(function(value){
				s=s+key+'[]='+encodeURIComponent(value)+'&';
			});
		}else if(Sky.isObject(value)){
			Sky.forOwn(value,function(v,k){
				s=s+key+'['+k+']='+encodeURIComponent(v)+'&';
			});
		}else{
			s=s+key+'='+encodeURIComponent(value)+'&';
		}
	}
	return s.substring(0,s.length-1);
};
//不推荐使用，推荐用URL类
Sky.parseURL=function(url) {
	var r={},arr,pattern;
	r.href=url;
	pattern=/^[^#]*/;
	r.hash=url.replace(pattern,"");
	arr=url.match(pattern);
	url=arr[0];
	pattern=/^([^:]+):[\/]*([^\/]+)/;
	arr=url.match(pattern);
	r.origin=arr[0];
	r.protocol=arr[1];
	r.host=arr[2];
	pattern=/^([^:]+):(\d*)$/;
	arr=r.host.match(pattern);
	if(arr){
		r.hostname=arr[1];
		r.port=parseInt(arr[2]);
	}else{
		r.hostname=r.host;
		r.port="";
	}
	url=url.replace(r.origin,"");
	pattern=/^[^\?]*/;
	arr=url.match(pattern);
	r.pathname=arr[0];
	r.search=url.replace(pattern,"");
	r.folder=r.pathname.replace(/\/[^\/]*$/,"");
	return r;
};
//不推荐使用，推荐用URL类
Sky.getAbsPath=function(relativePath, absolutePath){
	if(relativePath.match(/^[a-zA-Z]+:/)){
		return relativePath;
	}
	var url=Sky.parseURL(absolutePath || location.href);
	var arr=relativePath.match(/^\.\//);
	if(arr){
		return url.origin+url.folder+relativePath.substring(1,relativePath.length);
	}
	arr=relativePath.match(/^\//);
	if(arr){
		return url.origin+relativePath;
	}
	return url.origin+fixURI(url.folder + "/" + relativePath).replace(/^\/(\.\.\/)+/,"/");
	function fixURI(uri){
		var pattern=/[^\/]*\/\.\.\//;
		if(uri.match(pattern)){
			uri=uri.replace(pattern,"");
			return fixURI(uri);
		}else{
			return uri;
		}
	}
};
Sky.extend=function(){//扩展对象
	var args=arguments;
	if(args.length==0) return;
	if(args.length==1) return args[0];
	var temp=args[0]==true?args[1]:args[0]; //调用复制对象方法
	for (var n=args[0]==true?2:1;n<args.length;n++){
		for(var i in args[n]){
			if(Sky.hasOwn(args[n],i)){
				if(args[n][i]!=null && args[0]==true && Sky.isObject(args[n][i]) && Sky.isObject(temp[i])){
					temp[i]=Sky.extend(true,temp[i],args[n][i]);
					//temp[i] = args[n][i];
				}else{
					temp[i] = args[n][i];
				}
			}
		}
	}
	return temp;
};
Sky.apply=function(obj,config){
	console.warn("Deprecated. use Object.assign");
	Sky.forIn(config,function(v,k){
		obj[k]=v;
	});
	return obj;
};
Sky.applyIf=function(obj,config){
	Sky.forIn(config,function(v,k){
		if(!(k in obj)){
			obj[k]=v;
		}
	});
	return obj;
};
Sky.times=function(n,iteratee,thisArg){
	if(n<1){
		return [];
	}
	var index = -1,
		result = Array(n);
	while (++index < n) {
		result[index] = iteratee.apply(this,thisArg);
	}
	return result;
};
Sky.findIndex=function(arr,key,value){
	for(var i=0; i<arr.length; i++){
		if(arr[i][key]===value){return i;}
	}
	return -1;
};
Sky.findLastIndex=function(arr,key,value){
	for(var i=arr.length-1; i>=0; i--){
		if(arr[i][key]===value){return i;}
	}
	return -1;
};
Sky.find=function(arr,key,value){
	for(var i=0; i<arr.length; i++){
		if(arr[i][key]===value){return arr[i];}
	}
};
Sky.findLast=function(arr,key,value){
	for(var i=arr.length-1; i>=0; i--){
		if(arr[i][key]===value){return value;}
	}
};
Sky.shuffle=function(arr){
	var copyArr=arr.slice();
	var ubound=arr.length-1;
	for(var i=0; i<ubound; i++){
		var r=Sky.random(0,ubound);
		var tmp=copyArr[r];
		copyArr[r]=copyArr[i];
		copyArr[i]=tmp;
	}
	return copyArr;
};
Sky.sortBy=function(arr,key){
	return arr.sort(function(a,b){
		return a[key] > b[key];
	});
};
Sky.pluck=function(arr,key){
	return arr.map(function(item){
		return item[key];
	});
};
Sky.sortedIndex=function(arr,value){
	for(var i=0; i<arr.length; i++){
		if(arr[i]>=value){
			return i;
		}
	}
	return arr.length;
};
Sky.sortedLastIndex=function(arr,value){
	for(var i=arr.length-1; i>=0; i--){
		if(arr[i]<=value){
			return i+1;
		}
	}
};
(function(){
	var uid=0;
	Sky.id=function(check) {
		uid++;
		var id=Date.now()+"_"+uid;
		if(check){
			if(Sky.byId(id)){
				return Sky.id(check);
			}
		}
		return id;
	};
	var defaultNextSequence;
	var sequenceMap=new Map();
	Sky.nextSequence=function(arg1,arg2){
		if(Sky.isString(arg1)){
			var s=sequenceMap.get(arg1);
			if(Sky.isDefined(s)){
				s++;
			}else{
				if(Sky.isNumber(arg2)){
					s=arg2
				}else{
					s=1;
				}
			}
			sequenceMap.set(arg1,s);
			return s;
		}else{
			if(Sky.isDefined(defaultNextSequence)){
				defaultNextSequence++;
			}else{
				if(Sky.isNumber(arg1)){
					defaultNextSequence=arg1
				}else{
					defaultNextSequence=1;
				}
			}
			return defaultNextSequence;
		}
	};
})();
/* ceil floor round */
(function(){
	function createRound(methodName) {
		var func = Math[methodName];
		return function(number, precision) {
			precision = precision === undefined ? 0 : (+precision || 0);
			if (precision) {
				precision =Math.pow(10,precision);
				return func(number * precision) / precision;
			}
			return func(number);
		};
	}
	Sky.round=createRound('round');
	Sky.floor=createRound('floor');
	Sky.ceil=createRound('ceil');
})();
Sky.random=function(a,b){
	var length=b-a+1;
	return Math.floor(Math.random()*length)+a;
};
Sky.UUID=function() {
	return new Promise(function(resolve, reject){
		var d=new Date().getTime();
		var uuid='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
			var r=(d+Math.random()*16)%16|0;
			d=Math.floor(d/16);
			return (c=='x'?r:(r&0x3|0x8)).toString(16);
		});
		resolve(uuid);
	});
};
if("currentScript" in document){
	Sky.getCurrentScript=function(){
		return document.currentScript;
	};
}else{
	Sky.getCurrentScript=function(){
		var nodes=document.getElementsByTagName('SCRIPT');
		for(var i=nodes.length-1;i>=0;i--){
			var node=nodes[i];
			if(node.readyState==="interactive") {
				return node;
			}
		}
		if(Sky.isReady){
			nodes=document.head.getElementsByTagName('SCRIPT');
		}
		return nodes[nodes.length-1];
	};
}
(function(){
	var currentScript=Sky.getCurrentScript();
	Sky.currentPath=Sky.getAbsPath(currentScript.src,location.href);
	Sky.getCurrentPath=function(){
		var path;
		var e=new Error('err');
		if(e.fileName){
			path=e.fileName;
		}else if(e.sourceURL){
			path=e.fileName;
		}
		if(path==location.href){
			return null;
		}
		return path;
	};
	if(Sky.currentPath==Sky.getCurrentPath()){
		return ;
	}
	Sky.getCurrentPath=function(){
		var path;
		var e=new Error('err');
		var stack = e.stack || e.stacktrace || '';
		if(!stack){
			try{ throw e; }catch(e){
				stack=e.stack || e.stacktrace || '';
			}
		}
		var stacks=stack.trim().split("\n");
		stack=stacks[stacks.length-1];
		var arr=stack.match(/^@(.*):\d+$/);
		if(arr){
			path=arr[1];
		}else if(arr=stack.match(/^\s+at (.*):\d+:\d+$/)){
			path=arr[1];
		}else if(arr=stack.match(/^\s+at [^\(]*\((.*):\d+:\d+\)$/)){
			path=arr[1];
		}else{
			path=stack;
		}
		if(path==location.href){
			return null;
		}
		return path;
	};
	if(Sky.currentPath==Sky.getCurrentPath()){
		return ;
	}
	Sky.getCurrentPath=function(){
		var nodes=document.getElementsByTagName('SCRIPT');
		for(var i=nodes.length-1;i>=0;i--){
			var node=nodes[i];
			if(node.readyState==="interactive") {
				return Sky.getAbsPath(node.src,location.href);
			}
		}
	};
})();
(function(){
	Sky.isReady=false;
	var p=new Promise(function(resolve, reject){
		if(document.addEventListener){
			document.addEventListener("DOMContentLoaded",function(){
				Sky.isReady=true;
				resolve();
			},false);
		}else if(window==window.top){
			(function() {
				try{
					document.documentElement.doScroll('left');
					Sky.isReady=true;
					resolve();
				}catch(e){
					setTimeout(arguments.callee, 0);
				}
			})();
		}else{
			document.attachEvent("onreadystatechange",function(){
				if(document.readyState === "complete") {
					document.detachEvent("onreadystatechange", arguments.callee);
					Sky.isReady=true;
					resolve();
				}
			});
		}
	});
	Sky.ready=function(callback){
		if(callback && !Sky.isReady){
			p.then(callback);
		}
		return p;
	};
})();
