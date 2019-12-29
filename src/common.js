
Sky.noop=function(){};
Sky.toString=function(o){
	return new String(o).valueOf();
};
if(window.execScript){
	try{
		window.execScript([
			'Function alert(msg)',
			'	Msgbox Sky.toString(msg)',
			'End Function' //去除弹窗的图标
		].join('\n'), 'VBScript');
	}catch(e){}
}
