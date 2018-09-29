
var fs=require("fs");
var out='';
out+=fs.readFileSync(__dirname+'/js/overload.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/core.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/extend.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/promise.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/browser.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/storage.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/network.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/script.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/utils.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/event.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/dom.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/selector.js', 'utf-8');
fs.writeFileSync(__dirname+'/sky.js', out, 'utf-8');