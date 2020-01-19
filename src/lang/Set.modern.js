
if(!Set.prototype[Symbol.iterator]){
	Set.prototype[Symbol.iterator]=Set.prototype.entries;
}