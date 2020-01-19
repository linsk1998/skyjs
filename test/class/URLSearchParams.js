
describe('URLSearchParams', function () {
	it('解析参数', function(){
		var url = "mod=viewthread&tid=4596&t=1&t=2";
		var params = new URLSearchParams(url);
		expect(params.get("mod")).to.be.equal("viewthread");
		expect(JSON.stringify(params.getAll("t"))).to.be.equal('["1","2"]');
		expect(params.get("tid")).to.be.equal("4596");
	});
	it('删除', function(){
		var url = "mod=viewthread&tid=4596&t=1&t=2";
		var params=new URLSearchParams(url);
		expect(params.has("tid")).to.be.equal(true);
		params['delete']("tid");
		expect(params.has("tid")).to.be.equal(false);
	});
	it('拼接参数', function(){
		var params = new URLSearchParams();
		params.set('key',"value");
		params.append('results',"A");
		params.append('results',"B");
		params.append('results',"D");
		expect(params.toString()).to.be.equal("key=value&results=A&results=B&results=D");
	});
});