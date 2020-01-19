describe('Reflect', function(){
	it('apply', function(){
		var o={};
		var args=[o];
		function fn(a){
			expect(o).to.be.equal(this);
			expect(a).to.be.equal(o);
			return 1;
		}
		fn.apply=function(){
			expect(false).to.be.equal(true);
		};
		expect(Reflect.apply(fn,o,args)).to.be.equal(1);
	});
	it('construct', function(){
		var arr=[1,2,3];
		var arr2=Reflect.construct(Array,arr);
		expect(arr2.join(",")).to.be.equal("1,2,3");
	});
	it('defineProperty', function(){
		var obj={};
		Reflect.defineProperty(obj, 'x', {
			get:function(){
				return "y";
			}
		});
		expect(obj.x).to.be.equal("y");
	});
	it('getOwnPropertyDescriptor', function(){
		var obj={};
		var descriptor={
			get:function(){
				return "y";
			}
		};
		Reflect.defineProperty(obj, 'x', descriptor);
		expect(Reflect.getOwnPropertyDescriptor(obj,'x').get).to.be.equal(descriptor.get);
	});
});