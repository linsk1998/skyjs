
if(!this.console){
	console={};
	if(this.Debug){
		console.log=console.info=console.error=console.warn=function(data){
			Debug.writeln(data);
		};
	}else{
		console.log=console.info=console.error=console.warn=function(data){
			window.status=data;
		};
		console.clear=function(){
			window.status='';
		};
	}
}