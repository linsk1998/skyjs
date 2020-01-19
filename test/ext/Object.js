
describe('Object', function () {
	it('Object.keys', function () {
		var o={a:1,toString:2};
		var key=Symbol("key");
		o[key]=3;
		expect(Object.keys(o).toString()).to.be.equal("a,toString");
	});
	it('Object.assign', function () {
		var o1 = { a: 1, b: 1, c: 1 };
		var o2 = { b: 2, c: 2 };
		var o3 = { c: 3 };
		var obj = Object.assign( o1, o2, o3);
		expect(obj).to.be.equal(o1);
		expect(JSON.stringify(o1)).to.be.equal('{"a":1,"b":2,"c":3}');
	});
	it('Object.getPrototypeOf', function () {
		function Animal(){}
		var animal=new Animal();
		expect(Object.getPrototypeOf(animal)).to.be.equal(Animal.prototype);
	});
	it('Object.create', function () {
		function Animal(){ alert(1);}
		var animal=Object.create(Animal.prototype);
		expect(animal instanceof Animal).to.be.equal(true);
	});
	it('Object.create(null)', function () {
		var o=Object.create(null);
		expect('toString' in o).to.be.equal(false);
	});
	it('Object.defineProperty', function () {
		var obj={};
		Object.defineProperty(obj, 'x', {
			get:function(){
				return "y";
			}
		});
		expect(obj.x).to.be.equal("y");
	});
});