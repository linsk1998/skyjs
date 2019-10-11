
if(this.Proxy){
	(function(window){
		if(!Object.defineProperties){
			var seq=0;
			var HANDLE_KEY=Proxy.HANDLE_KEY;
			var TARGET_KEY=Proxy.TARGET_KEY;
			var DESC_KEY=Reflect.DESC_KEY;
			//从avalon学到的方式，通过VB
			window.VBProxySetter=function(target, property, value, receiver, handler){
				if(handler.set(target, property, value, receiver)===false){
					throw new TypeError("'set' on proxy: trap returned falsish for property '"+key+"'");
				}
			};
			window.VBProxyGetter=function(target,property, receiver, handler){
				return handler.get(target,property, receiver);
			};
			window.VBProxyFactory=function(target,handler){
				var className="VBProxyClass_"+(seq++);
				var buffer=["Class "+className];
				buffer.push('Public ['+TARGET_KEY+']');
				buffer.push('Public ['+HANDLE_KEY+']');
				buffer.push('Public ['+DESC_KEY+']');
				Object.keys(target).forEach(function(key){
					if(key.match(/[a-zA-Z0-9_$]/)){
						buffer.push(
							'Public Property Let ['+key+'](var)',
							'	Call VBProxySetter(['+TARGET_KEY+'],"'+key+'",var,Me,['+HANDLE_KEY+'])',
							'End Property',
							'Public Property Set ['+key+'](var)',
							'	Call VBProxySetter(['+TARGET_KEY+'],"'+key+'",var,Me,['+HANDLE_KEY+'])',
							'End Property',
							'Public Property Get ['+key+']',
							'	On Error Resume Next', //必须优先使用set语句,否则它会误将数组当字符串返回
							'	Set ['+key+']=VBProxyGetter(['+TARGET_KEY+'],"'+key+'",Me,['+HANDLE_KEY+'])',
							'	If Err.Number <> 0 Then',
							'		['+key+']=VBProxyGetter(['+TARGET_KEY+'],"'+key+'",Me,['+HANDLE_KEY+'])',
							'	End If',
							'	On Error Goto 0',
							'End Property');
					}
				});
				buffer.push('End Class');
				buffer.push(
					'Function '+className+'_Factory(target,handler)',
					'	Dim o',
					'	Set o = New '+className,
					'	Set '+className+'_Factory=o',
					'End Function'
				);
				try{
					window.execScript(buffer.join('\n'), 'VBScript');
				}catch(e){
					alert(buffer.join('\n'));
				}
				return window[className+'_Factory'](target,handler); //得到其产品
			};
		}
	})(this);
}
