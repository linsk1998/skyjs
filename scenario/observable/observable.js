
function Observable(){
	var events=new Array();
	function addListener(ev,fn,after){
		after=after?true:false;
		events.push({'ev':ev,'fn':fn,'after':after});
	}
	this.off=function(ev,fn){
		for(var i=events.length-1;i>=0;i--){
			var e=events[i];
			if(e.ev==ev && (!fn || e.fn==fn)){
				events.splice(i, 1);
			}
		}
	};
	this.on=function(ev,fn,after){
		addListener(ev,fn,false);
	};
	this.after=function(ev,fn,after){
		addListener(ev,fn,true);
	};
	this.emit=function(ev,after,args){
		if(arguments.length==2){
			if(Array.isArray(after)){
				args=after;
				after=false;
			}
		}
		for(var i=0;i<events.length;i++){
			var e=events[i];
			if(e.ev==ev && e.after==!!after){
				if(e.fn.apply(this,args)===false){
					return false;
				}
			}
		}
		return true;
	};
}
