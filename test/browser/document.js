
describe('document', function () {
	it('document.head', function () {
		expect(document.head).to.be.equal(document.getElementsByTagName("HEAD")[0]);
	});
	it('document.contains', function () {
		expect(document.contains(document.body)).to.be.equal(true);
	});
	it('document.currentScript', function () {
		expect('currentScript' in document).to.be.equal(true);
	});
});