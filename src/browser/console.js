
if(!this.console){
	console={};
	console.stack=[];
	console.log=console.info=console.error=console.warn=function(data){
		console.stack.push(data);
		window.status=data;
		Debug.writeln(data);
	};
	console.clear=function(){
		console.stack=[];
	};
}