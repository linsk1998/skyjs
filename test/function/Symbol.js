
describe('Symbol', function(){
	it('Symbol', function(){
		var o={};
		var KEY1=Symbol();
		var KEY2=Symbol();
		expect(KEY1==KEY2).to.be.equal(false);
		o[KEY1]=2;
		expect(o[KEY1]).to.be.equal(2);
	});
	it('description', function(){
		var KEY1=Symbol("key");
		var KEY2=Symbol['for']("key");
		var KEY3=Symbol['for']("key");
		expect(KEY1===KEY2).to.be.equal(false);
		expect(KEY2===KEY3).to.be.equal(true);
		expect(Symbol.keyFor(KEY1)).to.be.equal(undefined);
		expect(Symbol.keyFor(KEY2)).to.be.equal("key");
	});
	it('Object.getOwnPropertySymbols', function(){
		var o={};
		var KEY=Symbol();
		o[KEY]=2;
		var symbols=Object.getOwnPropertySymbols(o);
		expect(symbols[0]).to.be.equal(KEY);
	});
});