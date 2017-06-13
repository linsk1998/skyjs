Sky.declare=function(conf){
	var value,member;
	var hasProperty=false;
	var constructor=function(){
		var me=this;
		if(hasProperty){
			//在IE8中 Sky.support.defineProperty为false
			if(!Sky.support.defineProperty && Sky.support.VBScript){
				me=VBClassFactory(conf);
				me.constructor=constructor;
				for(member in conf.method){
					me[member]=conf.method[member].bind(me);
				}
				me.hasOwnProperty=function(){
					return false;
				};
			}
			var value;
			for(member in conf.property){
				value=conf.property[member];
				if(value && Sky.isObject(value)){
					if(Sky.support.defineProperty){
						Object.defineProperty(me, member ,conf.property[member]);
					}
				}else{
					me[member]=value;
				}
			}
		}
		//阻止自己添加属性，必须在配置里property加属性
		if(Object.preventExtensions) Object.preventExtensions(me);
		if(conf.constructor){
			conf.constructor.call(me);
		}
		return me;
	};
	if(conf.static){
		Sky.applyIf(constructor,conf.static);
	}
	if(conf.property){
		for(member in conf.property){
			value=conf.property[member];
			if(value && Sky.isObject(value)){
				hasProperty=true;
			}
		}
	}
	if(conf.method){
		Sky.applyIf(constructor.prototype,conf.method);
	}
	return constructor;
};
if(Sky.support.VBScript){
	var VBClassPool = {};
	var VBSetter=function(instance, propertys, name, value){
		var property = propertys[name];
		property.set.call(instance, value);
	};
	var VBGetter=function(instance, propertys, name){
		var property = propertys[name];
		return property.get.call(instance);
	};
	//从avalon学到的方式，通过VB
	var VBClassFactory=function(conf){
		var cacheKey=JSON.stringify(conf);
		var className=VBClassPool[cacheKey];
		if(!className){
			className="VBClass_"+Sky.id();
			VBClassPool[cacheKey] = className
			var buffer = ["Class "+className];
			var key;
			var uniq={
				'__propertys__':true
			};
			buffer.push('Public [__propertys__]');
			for(var i=0;i<Sky.dontEnumMembers.length;i++){
				key=Sky.dontEnumMembers[i];
				buffer.push('Public ['+key+']');
				uniq[key]=true;
			}
			for(key in conf.method){
				if(!uniq[key]){
					buffer.push('Public ['+key+']');
					uniq[key]=true;
				}
			}
			for(key in conf.property){
				if(!uniq[key]){
					var property=conf.property[key];
					if(property && Sky.isObject(property)){
						buffer.push(
							//由于不知对方会传入什么,因此set, let都用上
							'Public Property Let ['+key+'](value)', //setter
							'Call VBSetter(Me, [__propertys__], "'+key+'",value)',
							'End Property',
							'Public Property Set ['+key+'](value)', //setter
							'Call VBSetter(Me, [__propertys__], "' + name + '",value)',
							'End Property',
							'Public Property Get ['+key+']', //getter
							'On Error Resume Next', //必须优先使用set语句,否则它会误将数组当字符串返回
							'Set['+key+'] = VBGetter(Me, [__propertys__],"'+key+'")',
							'If Err.Number <> 0 Then',
							'['+key+'] = VBGetter(Me, [__propertys__],"'+key+'")',
							'End If',
							'On Error Goto 0',
							'End Property');
					}else{
						buffer.push('Public ['+key+']');
					}
					uniq[key]=true;
				}
			}
			buffer.push('End Class');
			buffer.push(
				'Function ' + className + '_Factory(property)', //创建实例并传入两个关键的参数
				'Dim o',
				'Set o = New '+className,
				'Set o.[__propertys__] = property',
				'Set '+className+'_Factory=o',
				'End Function'
			);
			window.execScript(buffer.join('\n'), 'VBScript');
		}
		return window[className + '_Factory'](conf.property); //得到其产品
	};
}