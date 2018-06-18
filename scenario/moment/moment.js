function Moment(d){
	this._d=new Date(d);
}
Moment.parse=function(dateStr,pattern){
	var reg1=/(YYYY|YY|MM|M|dd|d|HH|H|mm|m|ss|s|SSS)/g;
	var keys=pattern.match(reg1);
	var moment=new Moment();
	var date=moment.toDate();
	if(!keys){
		return moment;
	}
	var values=dateStr.match(/(\d+)/);

	for(var i=0;i<values.length;i++){
		var key=keys[i];
		var value=parseInt(values[i]);
		switch(key){
			case "yyyy":
				date.setFullYear(value);
				break;
			case "yy":
				date.setYear(value+Math.floor(date.getYear()/100)*100);
				break;
			case "MM":
			case "M":
				date.setMonth(value-1);
				break;
			case "dd":
			case "d":
				date.setDate(value);
				break;
			case "HH":
			case "H":
				date.setHours(value);
				break;
			case "mm":
			case "m":
				date.setMinutes(value);
				break;
			case "ss":
			case "s":
				date.setSeconds(value);
				break;
			case "SSS":
				date.setMilliseconds(value);
				break;
			default:
		}
	}
	return moment;
};
function moment(arg1,arg2){
	if(arguments.length==2){
		return Moment.parse(arg1,arg2);
	}
	return new Moment(arg1);
}
moment.fn=Moment.prototype;
moment.fn.toDate=function(){
	return this._d;
};
moment.fn.format=function(pattern){
	var date=this.toDate();
	return pattern.replace(/YYYY/g,date.getFullYear())
		.replace(/YY/g,Sky.pad(date.getYear()%100,2))
		.replace(/MM/g,Sky.pad(date.getMonth()+1,2))
		.replace(/M/g,date.getMonth()+1)
		.replace(/DD/g,Sky.pad(date.getDate(),2))
		.replace(/D/g,date.getDate())
		.replace(/HH/g,Sky.pad(date.getHours(),2))
		.replace(/H/g,date.getHours())
		.replace(/hh/g,date.getHours()<13?date.getHours():Sky.pad(date.getHours()%12,2))
		.replace(/h/g,date.getHours()<13?date.getHours():(date.getHours()%12))
		.replace(/mm/g,Sky.pad(date.getMinutes(),2))
		.replace(/m/g,date.getMinutes())
		.replace(/ss/g,Sky.pad(date.getSeconds(),2))
		.replace(/s/g,date.getSeconds())
		.replace(/a/g,date.getHours()%12>1?"PM":"AM")
		.replace(/S{3}/g,Sky.pad(date.getMilliseconds(),3));
};
moment.fn.fromNow=function(){
	var date=this.toDate();
	var now=new Date();
	var dy=now.getFullYear()-date.getFullYear();
	if(dy>1){
		return dy+" 年前";
	}
	var dt=now.getDate()-date.getTime();
	if(dt<=0){
		return "未来";
	}else if(dt<10000){
		return "几秒前";
	}else{
		var s=Math.floor(dt/1000);
		if(s<30){
			return "10 秒前";
		}else if(s<60){
			return "30 秒前";
		}else{
			var m=Math.floor(s/60);
			if(m<10){
				return m+" 分钟前";
			}else if(s<30){
				return "10 分钟前";
			}else if(s<60){
				return "30 分钟前";
			}else{
				var h=Math.floor(m/60);
				if(h<24){
					return h+" 小时前";
				}else{
					var m1=date.getYear()*12+date.getMonth();
					var m2=now.getYear()*12+now.getMonth();
					if(m1!=m2){
						return (m2-m1)+" 月前";
					}else{
						return Math.floor(h/24)+" 天前";
					}
				}
			}
		}
	}
};