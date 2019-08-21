
var fs=require("fs");
var out='';
out+=fs.readFileSync(__dirname+'/js/overload.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/support.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/data.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/date.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/symbol.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/object.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/function.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/collection.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/../url-polyfill/URLSearchParams.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/../url-polyfill/URL.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/JSON.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/proxy.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/setImmediate.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/promise.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/request.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/document.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/currentScript.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/console.js', 'utf-8');
fs.writeFileSync(__dirname+'/sky-polyfill.js', out, 'utf-8');
out+=fs.readFileSync(__dirname+'/js/utils-script.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/utils-ready.js', 'utf-8');

out+=fs.readFileSync(__dirname+'/js/utils-ajax.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/utils-element.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/utils-event.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/utils-selector.js', 'utf-8');

out+=fs.readFileSync(__dirname+'/js/utils-string.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/utils-number.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/utils-array.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/utils-object.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/utils-collection.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/utils-browser.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/utils-form.js', 'utf-8');
out+=fs.readFileSync(__dirname+'/js/storage.js', 'utf-8');
fs.writeFileSync(__dirname+'/sky.js', out, 'utf-8');