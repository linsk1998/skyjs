
if(!this.Reflect){
	this.Reflect={
		apply:function(target, thisArgument, argumentsList){
			Function.prototype.apply.call(target, thisArgument, argumentsList);
		},
		construct:function(target, argumentsList,NewTarget){
			if(!NewTarget){ NewTarget=target;}
			var o=Object.create(NewTarget.prototype);
			var o2=Reflect.apply(target,o,argumentsList);
			if(o2!==void 0){
				return o2;
			}
			return o;
		}
	};
	Reflect.getPrototypeOf=Object.getPrototypeOf;
}