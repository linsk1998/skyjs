
if(!Date.prototype.toJSON){
	Date.prototype.toJSON=Date.prototype.toISOString;
}
if(!Date.now){
	Date.now=function(){
		return new Date().getTime();
	};
}