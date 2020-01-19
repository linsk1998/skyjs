
describe('nextTick', function(){
	it('nextTick顺序', function(done){
		var arr=[];
		setTimeout(function(){
			arr.push(2);
			expect(arr.length).to.be.equal(3);
			expect(arr[0]).to.be.equal(0);
			expect(arr[1]).to.be.equal(1);
			expect(arr[2]).to.be.equal(2);
			done();
		},500);
		Sky.nextTick(function(){
			Sky.nextTick(function(){
				Sky.nextTick(function(){
					Sky.nextTick(function(){
						Sky.nextTick(function(){
							Sky.nextTick(function(){
								Sky.nextTick(function(){
									arr.push(0);
								});
							});
						});
					});
				});
			});
		});
		setTimeout(function(){
			arr.push(1);
		});
	});
});