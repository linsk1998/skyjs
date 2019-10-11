
if(!Number.isNaN){
	Number.isNaN=function(value){
		return typeof value === "number" && isNaN(value);
	};
}
if(!Number.isInteger){
	Number.isInteger=function(value){
		return typeof value === "number" &&	isFinite(value) &&	Math.floor(value) === value;
	};
}
if(!Number.isFinite){
	Number.isFinite=function(value){
		return typeof value === 'number' && isFinite(value);
	};
}