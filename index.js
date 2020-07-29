class RomanNumber {
	constructor(value) {
		switch(typeof value) {
			case "string":
				this.constructFromString(value);
				break;
			case "number":
				this.constructFromNumber(value);
				break;
			default:
				throw new Error('invalid value');
		}
	}

	constructFromString(value) {
		let regex = /^(M{1,3})?(CM|DC{0,3}|CD|C{1,3})?(XC|LX{0,3}|XL|X{1,3})?(IX|VI{0,3}|IV|I{1,3})?$/;
		const matches = value.match(regex);
		if(!matches) {
			if(parseInt(value, 10) == value) {
				this.constructFromNumber(parseInt(value, 10));
				return;
				}
			throw new Error("invalid value");
			}

		let arabic = 0;

		//thousand component
		let component = matches[1];
		if(component) {
			arabic += 1000 * (["M", "MM", "MMM"].indexOf(component) + 1); //indexOf returns -1 when not matched
		}

		//hundred component
		component = matches[2];
		if(component) {
			arabic += 100 * (["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"].indexOf(component) + 1);
		}

		//ten component
		component = matches[3];
		if(component) {
			arabic += 10 * (["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"].indexOf(component) + 1);
		}

		//unit component
		component = matches[4];
		if(component) {
			arabic += 1 * (["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"].indexOf(component) + 1);
		}

		if(arabic === 0) throw new Error("invalid value");

		this.roman = value;
		this.arabic = arabic;
	}

	constructFromNumber(value) {
		this.roman = "V";
		this.arabic = value;
	}

	toInt() {
		return this.arabic;
	}

	toString() {
		return this.roman;
	}
}

module.exports = RomanNumber;
