
describe('Symbol', function(){
	it('键名', function(){
		var o={};
		var KEY=Symbol();
		o[KEY]=1;
		expect(o[KEY]).to.be.equal(1);
	});
	it('枚举', function(){
		var STATUS={
			OPENED:Symbol("TEST"),
			CLOSED:Symbol("TEST"),
			DONE:Symbol("TEST")
		};
		var status=STATUS.OPENED;
		switch(status){
			case STATUS.OPENED:
			case STATUS.CLOSED:
			case STATUS.DONE:
		}
		expect(status!==STATUS.DONE).to.be.equal(true);
	});
});