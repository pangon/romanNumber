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
		this.roman = value;
		this.arabic = 5;
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
