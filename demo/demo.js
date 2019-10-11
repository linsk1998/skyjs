
function run(ele){
	var p=ele.parentNode;
	var pre=p.previousElementSibling || p.previousSibling;
	eval(pre.innerText);
}