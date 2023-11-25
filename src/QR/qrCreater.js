function createObject() {
	let arr = [],
		char = "a";
	for (var i = 0; i < 26; i++) {
		arr.push({ ["key" + i]: char });
		char = "" + char.charCodeAt(0);
		char++;
		char = String.fromCharCode(parseInt(char));
	}
	return arr;
}

export function getBase64EncodedRegNo(regno) {
	let rollno = regno.split("");
	let arr = createObject();
	let coded = rollno.map((c) => {
		return Object.values(arr[c])[0];
	});

	coded = coded.map((ch) => {
		let res = String.fromCharCode(ch.toString().charCodeAt(0) - (100 * 10) / 100);
		res = res == "," ? String.fromCharCode(ch.toString().charCodeAt(0) - (100 * 10) / 100 + 1) : res;
		return res;
	});
	coded = coded.toString();
	for (let i = 0; i < coded.length; i++) coded = coded.replace(",", "");
	console.log(coded);
	return coded;
}
