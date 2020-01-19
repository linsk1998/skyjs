
describe('Set', function () {
	it('add/delete/clear/size', function () {
		var s=new Set();
		s.add("ABC");
		s.add(2);
		s.add("ABC");
		s.add(5);
		s.add(6);
		expect(s.size).to.be.equal(4);
		s['delete'](6);
		expect(s.size).to.be.equal(3);
		s.clear();
		expect(s.size).to.be.equal(0);
	});
	it('new Set(iterable)', function () {
		var arr=[1,2,3,3];
		var s = new Set(arr);
		expect(s.size).to.be.equal(3);
		var s2 = new Set(s);
		expect(s2.size).to.be.equal(3);
	});
	it('forEach', function () {
		var s = new Set();
		s.add("Thomas Jefferson");
		s.add(1776);
		s.add("founding father");
		var str="",o={};
		s.forEach(function (value1,value2,set) {
			str+=value1+",";
			expect(value1).to.be.equal(value2);
			expect(set).to.be.equal(s);
			expect(this).to.be.equal(o);
		},o);
		expect(str).to.be.equal("Thomas Jefferson,1776,founding father,");
	});
	it('values', function () {
		var mySet = new Set();
		mySet.add("foo");
		mySet.add("bar");
		mySet.add("baz");
		var setIter = mySet.values();
		expect(setIter.next().value).to.be.equal("foo");
		expect(setIter.next().value).to.be.equal("bar");
		expect(setIter.next().value).to.be.equal("baz");
	});
	it('entries', function () {
		var mySet = new Set();
		mySet.add("foobar");
		mySet.add(1);
		mySet.add("baz");
		var setIter = mySet.entries();
		expect(JSON.stringify(setIter.next().value)).to.be.equal('["foobar","foobar"]');
		expect(JSON.stringify(setIter.next().value)).to.be.equal('[1,1]');
		expect(JSON.stringify(setIter.next().value)).to.be.equal('["baz","baz"]');
	});
	it('Array.from', function () {
		var mySet = new Set();
		mySet.add("foobar");
		mySet.add(1);
		mySet.add("baz");
		expect(JSON.stringify(Array.from(mySet))).to.be.equal('["foobar",1,"baz"]');
	});
});