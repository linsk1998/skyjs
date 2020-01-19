
describe('Map', function () {
	it('set/get', function () {
		var m=new Map();
		m.set(1,"black");
		expect(m.get(1)).to.be.equal("black");
	});
	it('size', function () {
		var m=new Map();
		m.set(1,"2");
		expect(m.size).to.be.equal(1);
	});
	it('new Map([iterable])', function () {
		var m=new Map([[1,"black"],[2,"red"],["toString",2],[{x:1},3]]);
		expect(m.get(1)).to.be.equal("black");
	});
	it('forEach', function () {
		var m = new Map();
		m.set(1, "black");
		m.set(2, "red");
		m.set("toString", 2);
		m.set({x:1}, 3);
		var i=0;
		m.forEach(function(value, key, mapObj){
			expect(mapObj).to.be.equal(m);
			switch(i){
				case 0:
					expect(key).to.be.equal(1);
					expect(value).to.be.equal("black");
					break ;
				case 1:
					expect(key).to.be.equal(2);
					expect(value).to.be.equal("red");
					break ;
				case 2:
					expect(key).to.be.equal("toString");
					expect(value).to.be.equal(2);
					break ;
				case 3:
					expect(JSON.stringify(key)).to.be.equal('{"x":1}');
					expect(value).to.be.equal(3);
					break ;
			}
			i++;
		});
		expect(m.get("toString")).to.be.equal(2);
	});
	it('delete/clear', function () {
		var m=new Map();
		m.set(1,"11");
		m.set(2,"22")
		m.set(3,"33")
		expect(m.size).to.be.equal(3);
		m['delete'](2);
		expect(m.size).to.be.equal(2);
		m.clear();
		expect(m.size).to.be.equal(0); 
	});
	it('entries', function () {
		var myMap=new Map();
		myMap.set("0", "foo");
		myMap.set(1, "bar");
		myMap.set({}, "baz");
		var mapIter=myMap.entries();
		expect(JSON.stringify(mapIter.next().value)).to.be.equal('["0","foo"]');
		expect(JSON.stringify(mapIter.next().value)).to.be.equal('[1,"bar"]');
		expect(JSON.stringify(mapIter.next().value)).to.be.equal('[{},"baz"]');
	});
	it('Array.from', function(){
		var m=new Map([[1,"black"],[2,"red"],["toString",2],[{x:1},3]]);
		expect(JSON.stringify(Array.from(m))).to.be.equal('[[1,"black"],[2,"red"],["toString",2],[{"x":1},3]]');
	});
});