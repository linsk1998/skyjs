
if(!this.Promise){
	(function(global){
		var PENDING = 'pending';
		var SEALED = 'sealed';
		var FULFILLED = 'fulfilled';
		var REJECTED = 'rejected';

// async calls
		var asyncSetTimer = typeof setImmediate !== 'undefined' ? setImmediate : setTimeout;
		var asyncQueue = [];
		var asyncTimer;

		function asyncFlush(){
			// run promise callbacks
			for (var i = 0; i < asyncQueue.length; i++)
				asyncQueue[i][0](asyncQueue[i][1]);
			// reset async asyncQueue
			asyncQueue = [];
			asyncTimer = false;
		}
		function asyncCall(callback, arg){
			asyncQueue.push([callback, arg]);
			if (!asyncTimer){
				asyncTimer = true;
				asyncSetTimer(asyncFlush, 0);
			}
		}
		function invokeResolver(resolver, promise) {
			function resolvePromise(value) {
				resolve(promise, value);
			}
			function rejectPromise(reason) {
				reject(promise, reason);
			}
			try {
				resolver(resolvePromise, rejectPromise);
			} catch(e) {
				console.error(e);
				rejectPromise(e);
			}
		}
		function invokeCallback(subscriber){
			var owner = subscriber.owner;
			var settled = owner.state_;
			var value = owner.data_;
			var callback = subscriber[settled];
			var promise = subscriber.then;
			if (typeof callback === 'function'){
				settled = FULFILLED;
				try {
					value = callback(value);
				} catch(e) {
					console.error(e);
					reject(promise, e);
				}
			}
			if (!handleThenable(promise, value)){
				if (settled === FULFILLED)
					resolve(promise, value);

				if (settled === REJECTED)
					reject(promise, value);
			}
		}
		function handleThenable(promise, value) {
			var resolved;
			try {
				if (promise === value)
					throw new TypeError('A promises callback cannot return that same promise.');

				if (value && (typeof value === 'function' || typeof value === 'object')){
					var then = value.then;  // then should be retrived only once
					if (typeof then === 'function'){
						then.call(value, function(val){
							if (!resolved){
								resolved = true;
								if (value !== val)
									resolve(promise, val);
								else
									fulfill(promise, val);
							}
						}, function(reason){
							if (!resolved){
								resolved = true;
								reject(promise, reason);
							}
						});
						return true;
					}
				}
			} catch (e) {
				if (!resolved)
					reject(promise, e);
				return true;
			}
			return false;
		}
		function resolve(promise, value){
			if (promise === value || !handleThenable(promise, value))
				fulfill(promise, value);
		}
		function fulfill(promise, value){
			if (promise.state_ === PENDING){
				promise.state_ = SEALED;
				promise.data_ = value;
				asyncCall(publishFulfillment, promise);
			}
		}
		function reject(promise, reason){
			if (promise.state_ === PENDING){
				promise.state_ = SEALED;
				promise.data_ = reason;

				asyncCall(publishRejection, promise);
			}
		}
		function publish(promise) {
			var callbacks = promise.then_;
			promise.then_ = undefined;
			for (var i = 0; i < callbacks.length; i++) {
				invokeCallback(callbacks[i]);
			}
		}
		function publishFulfillment(promise){
			promise.state_ = FULFILLED;
			publish(promise);
		}
		function publishRejection(promise){
			promise.state_ = REJECTED;
			publish(promise);
		}
		function Promise(resolver){
			if (typeof resolver !== 'function')
				throw new TypeError('Promise constructor takes a function argument');
			if (this instanceof Promise === false)
				throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');
			this.then_ = [];
			invokeResolver(resolver, this);
		}
		Promise.prototype = {
			constructor: Promise,
			state_: PENDING,
			then_: null,
			data_: undefined,
			then: function(onFulfillment, onRejection){
				var subscriber = {
					owner: this,
					then: new this.constructor(Sky.noop),
					fulfilled: onFulfillment,
					rejected: onRejection
				};
				if (this.state_ === FULFILLED || this.state_ === REJECTED){
					// already resolved, call callback async
					asyncCall(invokeCallback, subscriber);
				}else{
					this.then_.push(subscriber);
				}
				return subscriber.then;
			}
		};
		global.Promise=Promise;
	})(this);
	Promise.all=function(promises){
		if (!Sky.isArray(promises)) {
			throw new TypeError('You must pass an array to all.');
		}
		return new Promise(function(resolve,reject){
			var result=new Array(promises.length);
			var c=0;
			promises.forEach(function(one,index){
				one.then(function(data){
					c++;
					result[index]=data;
					if(c>=promises.length){
						resolve(result);
					}
				},function(){
					reject();
				});
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
}