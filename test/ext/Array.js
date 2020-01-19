
describe('Array', function () {
	it('Array.prototype.indexOf', function () {
		var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
		expect(beasts.indexOf('bison')).to.be.equal(1);
		expect(beasts.indexOf('bison', 2)).to.be.equal(4);
		expect(beasts.indexOf('giraffe')).to.be.equal(-1);
	});
	it('Array.prototype.lastIndexOf', function () {
		var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];
		expect(animals.lastIndexOf('Dodo')).to.be.equal(3);
		expect(animals.lastIndexOf('Dodo',2)).to.be.equal(0);
		expect(animals.lastIndexOf('Tiger')).to.be.equal(1);
		expect(animals.lastIndexOf('Cat')).to.be.equal(-1);
	});
	it('Array.prototype.find', function () {
		var array1 = [5, 12, 8, 130, 44];
		var o={},i=0;
		var found = array1.find(function(element,index,array) {
			expect(this).to.be.equal(o);
			expect(array1).to.be.equal(array);
			expect(index).to.be.equal(i++);
			return element > 10;
		},o);
		expect(found).to.be.equal(12);
	});
	it('Array.prototype.findIndex', function () {
		var o={},i=0;
		function isBigEnough(element,index,array) {
			expect(this).to.be.equal(o);
			expect(arr).to.be.equal(array);
			expect(index).to.be.equal(i++);
			return element >= 15;
		}
		var arr=[12, 5, 8, 130, 44];
		expect(arr.findIndex(isBigEnough,o)).to.be.equal(3);
	});
	it('Array.prototype.forEach', function () {
		var o={},r=[],i=0;
		var words=["one","two","three","four"];
		words.forEach(function(word,index,array){
			expect(this).to.be.equal(o);
			expect(words).to.be.equal(array);
			expect(index).to.be.equal(i++);
			r.push(word);
		},o);
		expect(r.join(",")).to.be.equal("one,two,three,four");
	});
	it('Array.prototype.map', function () {
		var numbers = [1, 4, 9];
		var roots = numbers.map(Math.sqrt);
		expect(roots.join(",")).to.be.equal("1,2,3");

		var users = [{id:"admin", name:"管理员"}, {id:"100360", name:"王小明"}, {id:"100361", name:"张敏敏"}];
		var ids = users.map(function(user){
			return user.id;
		});
		expect(ids.join(",")).to.be.equal("admin,100360,100361");
	});
	it('Array.prototype.some', function () {
		var array = [1, 2, 3, 4, 5];
		var even = function(element) {
			// checks whether an element is even
			return element % 2 === 0;
		};
		expect(array.some(even)).to.be.equal(true);
		expect(array.every(even)).to.be.equal(false);
	});
	it('Array.prototype.every', function () {
		function isBelowThreshold(currentValue) {
			return currentValue < 40;
		}
		var array1 = [1, 30, 39, 29, 10, 13];
		expect(array1.every(isBelowThreshold)).to.be.equal(true);
		expect(array1.some(isBelowThreshold)).to.be.equal(true);
	});
	it('Array.prototype.reduce', function () {
		var array1 = [1, 2, 3, 4];
		var array2 = [14];
		var reducer = function(accumulator, currentValue){
			return accumulator + currentValue;
		}
		// 1 + 2 + 3 + 4
		expect(array1.reduce(reducer)).to.be.equal(10);
		// 5 + 1 + 2 + 3 + 4
		expect(array1.reduce(reducer, 5)).to.be.equal(15);
		// 14
		expect(array2.reduce(reducer)).to.be.equal(14);
	});
	it('Array.prototype.includes', function () {
		var array1 = [1, 30, 39, 29, 10, 13];
		expect(array1.includes(1)).to.be.equal(true);
		expect(array1.includes(2)).to.be.equal(false);
	});
	it('Array.prototype.entries', function () {
		var array1 = [1, 30, 39, 29, 10, 13];
		expect(array1.includes(1)).to.be.equal(true);
		expect(array1.includes(2)).to.be.equal(false);
	});
	it('Array.from', function () {
		expect(JSON.stringify(Array.from({}))).to.be.equal("[]");
		expect(JSON.stringify(Array.from("foo"))).to.be.equal('["f","o","o"]');
		expect(JSON.stringify(Array.from({'1':1,'length':2}))).to.be.equal('[null,1]');
		expect(JSON.stringify(Array.from(new Set([1,2,3,2])))).to.be.equal('[1,2,3]');
	});
	it('Array.isArray', function () {
		expect(Array.isArray([1, 2, 3])).to.be.equal(true);
		expect(Array.isArray({foo: 123})).to.be.equal(false);
		expect(Array.isArray("foobar")).to.be.equal(false);
		expect(Array.isArray(undefined)).to.be.equal(false);
	});
	it('Array.of', function () {
		expect(JSON.stringify(Array.of(7))).to.be.equal("[7]");
		expect(JSON.stringify(Array.of(1, 2, 3))).to.be.equal('[1,2,3]');
	});
});