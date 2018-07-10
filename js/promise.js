//setImmediate在setTimeout之前执行
if(!this.setImmediate){
	(function(global){
		var index=0;
		var handles=new Map();
		if(this.Promise){
			global.setImmediate=function(fn){
				index++;
				var args=Array.from(arguments);
				args.shift();
				var p=Promise.resolve(index);
				handles.set(index,args);
				p.then(function(id){
					var args=handles.get(id);
					if(args){
						fn.apply(global,args);
						clearImmediate(id);
					}
				});
				return index;
			};
		}else{
			var setTimeoutN=setTimeout;
			var ticks=null;
			global.setImmediate=function(fn){
				index++;
				if(!ticks){
					ticks=new Array();
					setTimeoutN(nextTick);
				}
				ticks.push(index);
				handles.set(index,arguments);
				return index;
			};
			var setTimeoutN=setImmediate.setTimeout=setTimeout;
			if(Sky.browser.ie){
				window.execScript('function setTimeout(fn,time){time=time || 1;return setImmediate.setTimeout(fn,time);}');
			}else{
				global.setTimeout=function(fn,time){
					time=time || 11;
					return setTimeoutN(fn,time);
				};
			}
			function nextTick(){
				for(var i=0;i<ticks.length;i++){
					var id=ticks[i];
					var args=handles.get(id);
					if(args){
						var fn=args[0];
						args=Array.from(args);
						args.shift();
						try{
							fn.apply(global,args);
						}catch(e){
							console.error(e);
						}
					}
				}
				ticks=null;
				handles.clear();
			}
		}
		global.clearImmediate=function(id){
			handles['delete'](id);
		};
	})(this);
}
(function(global){
	function Deferred(){
		this._resolveds=[];
		this._rejecteds=[];
		this._state="pending";//resolved | rejected
	}
	Deferred.prototype.state=function(){
		return this._state;
	};
	Deferred.prototype.done=function(fn){
		if(this._state=="resolved"){
			fn.call(this,this.data);
		}else if(this._state=="pending"){
			this._resolveds.push(fn);
		}
		return this;
	};
	Deferred.prototype.fail=function(fn){
		if(this._state=="rejected"){
			fn.call(this,this.data);
		}else if(this._state=="pending"){
			this._rejecteds.push(fn);
		}
		return this;
	};
	Deferred.prototype.always=function(fn){
		if(this._state=="pending"){
			this._resolveds.push(fn);
			this._rejecteds.push(fn);
		}else{
			fn.call(this,this.data);
		}
	};
	Deferred.prototype.resolve=function(d){
		if(this._state=="pending"){
			this.data=d;
			this._state="resolved";
			this._resolveds.forEach(callAll,this);
			this._resolveds=null;
		}
		return this;
	};
	Deferred.prototype.reject=function(d){
		if(this._state=="pending"){
			this.data=d;
			this._state="rejected";
			this._rejecteds.forEach(callAll,this);
			this._rejecteds=null;
		}
		return this;
	};
	function callAll(fn){
		fn.call(this,this.data);
	}
	if(!this.Promise){
		function Promise(executor){
			Deferred.call(this);
			var me=this;
			function resolve(value) {
				setImmediate(function(){
					me.resolve(value);
				});
			}
			function reject(reason) {
				setImmediate(function(){
					me.reject(reason);
				});
			}
			try{
				executor(resolve, reject);
			}catch(e){
				reject(e);
			}
		}
		Promise.prototype=Object.create(Deferred.prototype);
		Promise.prototype.constructor=Promise;
		function nextPromise(before,after,resolve,reject){
			return function(value){
				try{
					var x=before(value);
					if(typeof x.then==="function"){
						x.then(resolve, reject);
					}else{
						after(x);
					}
				}catch(r){
					reject(r);
				}
			};
		}
		Promise.prototype.then=function(onResolved, onRejected){
			var me=this;
			onResolved=onResolved || Sky.noop;
			onRejected=onRejected || Sky.noop;
			return new Promise(function(resolve,reject){
				switch(me.state()){
					case "resolved":
						setImmediate(nextPromise(onResolved,resolve,resolve,reject),me.data);
						break ;
					case "rejected":
						setImmediate(nextPromise(onRejected,reject,resolve,reject),me.data);
						break ;
					default:
						me._resolveds.push(nextPromise(onResolved,resolve,resolve,reject));
						me._rejecteds.push(nextPromise(onRejected,reject,resolve,reject));
				}
			});
		};
		Promise.prototype['catch']=function(onRejected){
			return this.then(undefined,onRejected);
		};
		Promise.all=function(promises){
			if (!Sky.isArray(promises)) {
				throw new TypeError('You must pass an array to all.');
			}
			return new Promise(function(resolve,reject){
				if(promises.length==0) return resolve(new Array());
				var result=new Array(promises.length);
				var c=0;
				promises.forEach(function(one,index){
					if(one instanceof Promise){
						one.then(function(data){
							c++;
							result[index]=data;
							if(c>=promises.length){
								resolve(result);
							}
						},function(data){
							reject(data);
						});
					}else{
						c++;
						result[index]=one;
						if(c>=promises.length){
							resolve(result);
						}
					}
				});
			});
		};
		Promise.race=function(promises){
			if (!Array.isArray(promises)) {
				throw new TypeError('You must pass an array to all.');
			}
			return new Promise(function(resolve,reject){
				promises.forEach(function(one){
					one.then(function(){
						resolve();
					},function(){
						reject();
					});
				});
			});
		};
		Promise.resolve=function(arg){
			return new Promise(function(resolve,reject){
				resolve(arg)
			});
		};
		Promise.reject=function(arg){
			return Promise(function(resolve,reject){
				reject(arg)
			});
		};
		global.Promise=Promise;
	}
	Sky.Deferred=function(){
		return new Deferred();
	};
})(this);

Sky.when=function(subordinate){
	if(arguments.length==1){
		return arguments[0];
	}
	var resolveValues=Array.from(arguments);
	var dfd=Sky.Deferred();
	var i=0;
	resolveValues.forEach(function(item){
		item.done(function(){
			i++;
			if(i==resolveValues.length){
				dfd.resolve();
			}
		});
	});
	return dfd;
};