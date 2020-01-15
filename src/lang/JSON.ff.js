
if(JSON.stringify(/reg/)!=="{}"){
	RegExp.prototype.toJSON=function(){return {};}
}