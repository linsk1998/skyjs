
describe('Proxy', function(){
	it('get', function(){
		var person = {
			name: "张三"
		};//debugger;
		var proxy = new Proxy(person, {
			get:function(target, property) {
				if(property in target) {
					success=true;
					return "李四";
				}else{
					throw "Property \"" + property + "\" does not exist.";
				}
			}
		});
		expect(proxy.name).to.be.equal("李四");
	});
	it('set', function(){
		var success=false;
		var person = {
			name: "张三"
		};
		var proxy = new Proxy(person, {
			set:function(target, property, value) {
				if(property in target) {
					target[property]=value;
					success=true;
				}else{
					throw "Property \"" + property + "\" does not exist.";
				}
			}
		});
		proxy.name="李四";
		expect(success).to.be.equal(true);
	});
});