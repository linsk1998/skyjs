import { symlink } from "fs";

//setImmediate在setTimeout之前执行
if(!this.setImmediate){
	if(this.Promise){
		(function(global){
			var index=0;
			var handles=new Map();
			global.setImmediate=function(fn){
				index++;
				var args=Array.from(arguments);
				args.shift();
				var p=Promise.resolve(index);
				handles.set(index,args);
				p.then(function(id){
					var args=handles.get(id);
					if(args){
						fn.apply(global,args);
						clearImmediate(id);
					}
				});
				return index;
			};
			global.clearImmediate=function(id){
				handles['delete'](id);
			};
		})(this);
	}
}else if(Sky.browser.ie11){
	(function(window){
		var setImmediateN=setImmediate;
		//TODO, ie11的setImmediate修复
	})(this);
}