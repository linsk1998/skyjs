
if(!this.Reflect){
	this.Reflect={
		apply:function(target, thisArgument, argumentsList){
			return Function.prototype.apply.call(target, thisArgument, argumentsList);
		},
		construct:function(target, argumentsList,NewTarget){
			var o=Object.create(target.prototype);
			if(!NewTarget){ NewTarget=o;}
			var o2=Reflect.apply(target,NewTarget,argumentsList);
			if(o2!==void 0){
				return o2;
			}
			return o;
		}
	};
	Reflect.getPrototypeOf=Object.getPrototypeOf;
}