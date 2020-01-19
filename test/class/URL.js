
describe('URL', function(){
	describe('解析URL', function(){
		var url=new URL("http://shengdiyage.us:80/abc/index.asp?id=1&t=1400#top");
		it('protocol', function(){
			expect(url.protocol).to.be.equal("http:");
		});
		it('hostname', function(){
			expect(url.hostname).to.be.equal("shengdiyage.us");
		});
		it('port', function(){
			expect(url.port).to.be.equal("80");
		});
		it('host', function(){
			expect(url.host).to.be.equal("shengdiyage.us:80");
		});
		it('origin', function(){
			expect(url.origin).to.be.equal("http://shengdiyage.us:80");
		});
		it('pathname', function(){
			expect(url.pathname).to.be.equal("/abc/index.asp");
		});
		it('search', function(){
			expect(url.search).to.be.equal("?id=1&t=1400");
		});
		it('hash', function(){
			expect(url.hash).to.be.equal("#top");
		});
		it('href', function(){
			expect(url.href).to.be.equal("http://shengdiyage.us:80/abc/index.asp?id=1&t=1400#top");
		});
	});
	it('username/password', function(){
		var url=new URL("http://admin:123456@shengdiyage.us/");
		expect(url.username).to.be.equal("admin");
		expect(url.password).to.be.equal("123456");
	});
	it('获取绝对路径', function(){
		var u=new URL("http://localhost:8080/linsk1998/skyjs/master/demo/class/URL.html");
		expect(new URL("/index.html",u).href).to.be.equal("http://localhost:8080/index.html");
		expect(new URL("?name=admin",u).href).to.be.equal("http://localhost:8080/linsk1998/skyjs/master/demo/class/URL.html?name=admin");
		expect(new URL("#/eg",u).href).to.be.equal("http://localhost:8080/linsk1998/skyjs/master/demo/class/URL.html#/eg");
		expect(new URL("./index.aspx",u).href).to.be.equal("http://localhost:8080/linsk1998/skyjs/master/demo/class/index.aspx");
		expect(new URL("../../index.php",u).href).to.be.equal("http://localhost:8080/linsk1998/skyjs/master/index.php");
	});
	describe('修改属性', function(){
		var url=new URL("http://shengdiyage.us/index.asp?id=1&t=1400");
		it('hostname', function(){
			url.hostname="linsk.me";
			expect(url.href).to.be.equal("http://linsk.me/index.asp?id=1&t=1400");
		});
		it('protocol', function(){
			url.protocol="https:";
			expect(url.href).to.be.equal("https://linsk.me/index.asp?id=1&t=1400");
		});
		it('port', function(){
			url.port="8080";
			expect(url.href).to.be.equal("https://linsk.me:8080/index.asp?id=1&t=1400");
		});
		it('host', function(){
			url.host="shengdiyage.us:808";
			expect(url.port).to.be.equal("808");
			expect(url.hostname).to.be.equal("shengdiyage.us");
		});
		it('pathname', function(){
			url.pathname="/abc/index.asp";
			expect(url.href).to.be.equal("https://shengdiyage.us:808/abc/index.asp?id=1&t=1400");
		});
		it('search', function(){
			url.search="?id=2&t=1400";
			expect(url.href).to.be.equal("https://shengdiyage.us:808/abc/index.asp?id=2&t=1400");
		});
		it('hash', function(){
			url.hash="#top";
			expect(url.href).to.be.equal("https://shengdiyage.us:808/abc/index.asp?id=2&t=1400#top");
		});
		it('href', function(){
			url.href="http://linsk.me/index.asp?id=1&t=1400";
			expect(url.pathname).to.be.equal("/index.asp");
			expect(url.origin).to.be.equal("http://linsk.me");
		});
		it('searchParams', function(){
			url.searchParams.set('id',"2");
			expect(url.search).to.be.equal("?id=2&t=1400");
			url.search="?id=3";
			expect(url.searchParams.get("id")).to.be.equal("3");
			expect(url.searchParams.has("t")).to.be.equal(false);
		});
	});
	describe('Reflect.set修改属性', function(){
		var url=new URL("http://shengdiyage.us/index.asp?id=1&t=1400");
		it('hostname', function(){
			Reflect.set(url,'hostname',"linsk.me");
			expect(url.href).to.be.equal("http://linsk.me/index.asp?id=1&t=1400");
		});
	});
});