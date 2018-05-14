
function EventEmitter(){
	this._events=new Array();
}
EventEmitter.prototype._events=null;
EventEmitter.prototype.on=function(ev,fn,after){
	after=!!after;
	this._events.push({'ev':ev,'fn':fn,'after':after});
};
EventEmitter.prototype.before=function(ev,fn){
	EventEmitter.prototype.on.call(ev,fn);
};
EventEmitter.prototype.after=function(ev,fn){
	EventEmitter.prototype.on.call(ev,fn,true);
};
EventEmitter.prototype.off=function(ev,fn){
	var events=this._events;
	for(var i=events.length-1;i>=0;i--){
		var e=events[i];
		if(e.ev==ev && (!fn || e.fn==fn)){
			events.splice(i, 1);
		}
	}
};
EventEmitter.prototype.emit=function(ev,after,args){
	var events=this._events;
	if(arguments.length==2){
		if(Array.isArray(after)){
			args=after;
			after=false;
		}
	}
	for(var i=0;i<events.length;i++){
		var e=events[i];
		if(e.ev==ev && e.after==!!after){
			var result=(args==void 0)?e.fn.call(this):e.fn.apply(this,args);
			if(result===false){
				return false;
			}
		}
	}
	return true;
};
