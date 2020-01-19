
if(!Map.prototype[Symbol.iterator]){
	Map.prototype[Symbol.iterator]=Map.prototype.entries;
}