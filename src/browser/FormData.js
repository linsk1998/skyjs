
if(!this.FormData){
	FormData=function(form){
		var params=new URLSearchParams();
		if(form){
			var value;
			switch (input.type) {
				case "checkbox":
					if(input.checked){
						if(input.value){
							value=input.value;
						}else{
							value="on";
						}
					}
					break;
				case "radio":
					if(input.checked && input.value){
						params.append(input.name,input.value);
					}
					break;
				default:
					params.append(input.name,input.value);
			}
		}
		this._params=params;
	};
	FormData.prototype.append=function(key,value){
		this._params.append(key,value);
	};
	FormData.prototype.toString=function(){
		return this._params.toString();
	};
}