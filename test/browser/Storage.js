describe('Storage', function(){
	it('localStorage', function(){
		localStorage.setItem('key',"value");
		expect(localStorage.getItem('key')).to.be.equal("value");
		localStorage.removeItem('key');
		expect(localStorage.getItem('key')).to.be.equal(null);
	});
	it('sessionStorage', function(){
		sessionStorage.setItem('key',"value");
		expect(sessionStorage.getItem('key')).to.be.equal("value");
		sessionStorage.removeItem('key');
		expect(sessionStorage.getItem('key')).to.be.equal(null);
	});
});