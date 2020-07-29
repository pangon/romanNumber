const THOUSANDS = ["M", "MM", "MMM"];
const HUNDREDS = ["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
const TENS = ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
const UNITS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

class RomanNumber {
	constructor(input) {
		switch(typeof input) {
			case "string":
				this.constructFromString(input);
				break;
			case "number":
				this.constructFromNumber(input);
				break;
			default:
				throw new Error('invalid value');
		}
	}

	constructFromString(inputString) {
		let regex = /^(M{1,3})?(CM|DC{0,3}|CD|C{1,3})?(XC|LX{0,3}|XL|X{1,3})?(IX|VI{0,3}|IV|I{1,3})?$/;
		const matches = inputString.match(regex);
		if(!matches) {
			if(parseInt(inputString, 10) == inputString) {
				this.constructFromNumber(parseInt(inputString, 10));
				return;
				}
			throw new Error("invalid value");
			}

		let arabic = 0;

		//thousand component
		let component = matches[1];
		if(component) {
			arabic += 1000 * (THOUSANDS.indexOf(component) + 1); //indexOf returns -1 when not matched
		}

		//hundred component
		component = matches[2];
		if(component) {
			arabic += 100 * (HUNDREDS.indexOf(component) + 1);
		}

		//ten component
		component = matches[3];
		if(component) {
			arabic += 10 * (TENS.indexOf(component) + 1);
		}

		//unit component
		component = matches[4];
		if(component) {
			arabic += 1 * (UNITS.indexOf(component) + 1);
		}

		if(arabic === 0) throw new Error("invalid value");

		this.roman = inputString;
		this.arabic = arabic;
	}

	constructFromNumber(inputNumber) {
		if(!isFinite(inputNumber) || (Math.floor(inputNumber) !== inputNumber)) throw new Error("invalid value");
		if((inputNumber < 1) || (inputNumber > 3999)) throw new Error("invalid range");

		let roman = "";
		const originalInputNumber = inputNumber;

		//unit component
		let component = inputNumber % 10;
		if(component !== 0) roman = UNITS[component - 1] + roman;

		if(inputNumber > component) { //stop if number has been already entirely parsed already
			//ten component
			inputNumber -= component;
			inputNumber /= 10;
			component = inputNumber % 10;
			if(component !== 0) roman = TENS[component - 1] + roman;
		}

		if(inputNumber > component) {
			//hundred component
			inputNumber -= component;
			inputNumber /= 10;
			component = inputNumber % 10;
			if(component !== 0) roman = HUNDREDS[component - 1] + roman;
		}

		if(inputNumber > component) {
			//thousand component
			inputNumber -= component;
			inputNumber /= 10;
			component = inputNumber % 10;
			if(component !== 0) roman = THOUSANDS[component - 1] + roman;
		}

		this.roman = roman;
		this.arabic = originalInputNumber;
	}

	toInt() {
		return this.arabic;
	}

	toString() {
		return this.roman;
	}
}

module.exports = RomanNumber;
