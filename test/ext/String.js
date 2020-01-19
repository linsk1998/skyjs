
describe('String', function () {
	it('String.prototype.trim', function () {
		expect(("  ss  ").trim()).to.be.equal("ss");
	});
	it('String.prototype.trimStart', function () {
		expect(("  ss  ").trimStart()).to.be.equal("ss  ");
	});
	it('String.prototype.trimEnd', function () {
		expect(("  ss  ").trimEnd()).to.be.equal("  ss");
	});
	it('String.prototype.startsWith', function () {
		expect(("abcd").startsWith("ab")).to.be.equal(true);
		expect(("abcd").startsWith("as")).to.be.equal(false);
	});
	it('String.prototype.endsWith', function () {
		expect(("abcd").endsWith("cd")).to.be.equal(true);
		expect(("abcd").endsWith("bd")).to.be.equal(false);
	});
	it('String.prototype.includes', function () {
		expect(("abcd").includes("cd")).to.be.equal(true);
		expect(("abcd").includes("bd")).to.be.equal(false);
	});
	it('String.prototype.repeat', function () {
		expect(("abc").repeat(3)).to.be.equal("abcabcabc");
	});
	it('String.prototype.padStart', function () {
		expect(("20").padStart(5,"0")).to.be.equal("00020");
		expect(("200").padStart(1,"0")).to.be.equal("200");
		expect(("abc").padStart(10)).to.be.equal("       abc");
		expect(("abc").padStart(10,"foo")).to.be.equal("foofoofabc");
		expect(("abc").padStart(6,"123456")).to.be.equal("123abc");
		expect(("abc").padStart(1)).to.be.equal("abc");
	});
	it('String.prototype.padEnd', function () {
		expect(("abc").padEnd(10)).to.be.equal("abc       ");
		expect(("abc").padEnd(10,"foo")).to.be.equal("abcfoofoof");
		expect(("abc").padEnd(6,"123456")).to.be.equal("abc123");
		expect(("abc").padEnd(1)).to.be.equal("abc");
	});
});