
describe('Node/Element', function(){
	it('contains', function(){
		expect('contains' in document.body).to.be.equal(true);
	});
	it('innerText', function(){
		expect('innerText' in document.body).to.be.equal(true);
	});
	it('children', function(){
		expect('children' in document.body).to.be.equal(true);
	});
	it('parentElement', function(){
		expect('parentElement' in document.body).to.be.equal(true);
	});
});