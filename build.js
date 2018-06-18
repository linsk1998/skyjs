var https=require('https');
var fs=require("fs");
//get 请求外网
https.get("https://raw.githubusercontent.com/linsk1998/dollar/master/%24.js",function(req,res){
	var out='';
	req.on('data',function(data){
		out+=data;
	});
	req.on('end',function(){
		out+=fs.readFileSync(__dirname+'/js/core.js', 'utf-8');
		out+=fs.readFileSync(__dirname+'/js/extend.js', 'utf-8');
		out+=fs.readFileSync(__dirname+'/js/promise.js', 'utf-8');
		out+=fs.readFileSync(__dirname+'/js/url-read.js', 'utf-8');
		out+=fs.readFileSync(__dirname+'/js/storage.js', 'utf-8');
		out+=fs.readFileSync(__dirname+'/js/network.js', 'utf-8');
		out+=fs.readFileSync(__dirname+'/js/script.js', 'utf-8');
		out+=fs.readFileSync(__dirname+'/js/utils.js', 'utf-8');
		out+=fs.readFileSync(__dirname+'/js/event.js', 'utf-8');
		out+=fs.readFileSync(__dirname+'/js/dom.js', 'utf-8');
		out+=fs.readFileSync(__dirname+'/js/selector.js', 'utf-8');
		fs.writeFileSync(__dirname+'/sky.js', out, 'utf-8');
	});
});