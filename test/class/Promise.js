
describe('Promise', function(){
	it('基本用法', function(done){
		var promise1 = new Promise(function(resolve, reject) {
			setTimeout(function() {
				resolve('foo');
			},0);
		});
		promise1.then(function(value) {
			expect(value).to.be.equal("foo");
			done();
		});
	});
	it('链式调用', function(done){
		var promise1 = new Promise(function(resolve, reject) {
			setTimeout(function() {
				resolve('1');
			}, 0);
		});
		promise1.then(function(value) {
			expect(value).to.be.equal("1");
			return "2";
		}).then(function(value) {
			expect(value).to.be.equal("2");
			done();
		});
	});
	it('多步调用', function(done) {
		function createPromise(value,time){
			return new Promise(function(resolve, reject) {
				setTimeout(function() {
					resolve(value);
				}, time);
			});
		}
		createPromise("step1",0).then(function(value) {
			expect(value).to.be.equal("step1");
			return createPromise("step2",0);
		}).then(function(value) {
			expect(value).to.be.equal("step2");
			done();
		});
	});
	it('抛出异常', function(done){
		function createPromise(value,time){
			return new Promise(function(resolve, reject) {
				setTimeout(function() {
					resolve(value);
				}, time);
			});
		}
		createPromise("step1",100).then(function(value) {
			expect(value).to.be.equal("step1");
			return createPromise("step2",100);
		}).then(function(value) {
			throw new Error("Example Error");
		})['catch'](function(e){
			expect(e.message).to.be.equal("Example Error");
			done();
		});
	});
	it('运行顺序', function(done){
		var arr=[];
		setTimeout(function(){
			arr.push(0);
			expect(arr.length).to.be.equal(2);
			done();
		},0);
		Promise.resolve(1).then(function(){
			arr.push(1);
			expect(arr.length).to.be.equal(1);
			done();
		});
	});
	it('Promise.all', function(done){
		function createPromise(value,time){
			return new Promise(function(resolve, reject) {
				setTimeout(function() {
					resolve(value);
				}, time);
			});
		}
		Promise.all([
			createPromise("task1",60),
			createPromise("task2",100),
			createPromise("task3",30)
		]).then(function(values) {
			expect(JSON.stringify(values)).to.be.equal('["task1","task2","task3"]');
			done();
		});
	});
});