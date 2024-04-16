export function ucwords(str) {
	return str.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/'\b\w/g, (c) => c.toLowerCase());
}

export function capitalizeSentence(str) {
	return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}
