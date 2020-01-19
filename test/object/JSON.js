
describe('JSON', function(){
	it('stringify', function(){
		var d=new Date();
		d.toJSON=function(){
			return "2019-09-15T07:49:12.660Z";
		};
		var o={
			a:"s\"tr",
			b:[1,2,NaN,undefined],
			c:false,
			d:{
				a:d,
				b:/reg/,
				c:function(){}
			},
			e:undefined
		};
		expect(JSON.stringify(o)).to.be.equal('{"a":"s\\"tr","b":[1,2,null,null],"c":false,"d":{"a":"2019-09-15T07:49:12.660Z","b":{}}}');
	});
	it('parse', function(){
		var o=JSON.parse("{\"a\":1,\"b\":2}");
		expect(o.a).to.be.equal(1);
	});
	it('security', function(){
		try{
			var o=JSON.parse("{a:1}");
		}catch(e){}finally{
			expect(o).to.be.equal(undefined);
		}
	});
	it('symbol', function(){
		var key=Symbol();
		var o={};
		o[key]=1;
		expect(JSON.stringify(o)).to.be.equal("{}");
	});
});