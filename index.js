"use strict";

const THOUSANDS = ["M", "MM", "MMM"];
const HUNDREDS = ["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
const TENS = ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
const UNITS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
const ROMAN_REGEX = /^(M{1,3})?(CM|DC{0,3}|CD|C{1,3})?(XC|LX{0,3}|XL|X{1,3})?(IX|VI{0,3}|IV|I{1,3})?$/;

function RomanNumber(input) {
	// this is needed, instead of a class definition, in order to allow for a direct usage of the exported object, without explicit instantation with "new"
	if(!(this instanceof RomanNumber)) return new RomanNumber(input);

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

RomanNumber.prototype.constructFromString = function(inputString) {
	// regex matching will at the same time validate the input and parse it
	const matches = inputString.match(ROMAN_REGEX);

	// not expexted roman string format
	if(!matches) {
		// if the string represent exactly a decimal number, accept it and use the constructFromNumber constructor
		if(parseInt(inputString, 10) == inputString) {
			this.constructFromNumber(parseInt(inputString, 10));
			return;
			}

		throw new Error("invalid value");
		}

	let arabic = 0;

	// thousand component
	let component = matches[1];
	if(component) {
		arabic += 1000 * (THOUSANDS.indexOf(component) + 1); //indexOf returns -1 when not matched
	}

	// hundred component
	component = matches[2];
	if(component) {
		arabic += 100 * (HUNDREDS.indexOf(component) + 1);
	}

	// ten component
	component = matches[3];
	if(component) {
		arabic += 10 * (TENS.indexOf(component) + 1);
	}

	// unit component
	component = matches[4];
	if(component) {
		arabic += 1 * (UNITS.indexOf(component) + 1);
	}

	// this can happen only in the empty inputString case
	if(arabic === 0) throw new Error("invalid value");

	this.roman = inputString;
	this.arabic = arabic;
};

RomanNumber.prototype.constructFromNumber = function(inputNumber) {
	// validate input
	if(!isFinite(inputNumber) || (Math.floor(inputNumber) !== inputNumber)) throw new Error("invalid value");
	if((inputNumber < 1) || (inputNumber > 3999)) throw new Error("invalid range");

	let roman = "";
	const originalInputNumber = inputNumber;

	// unit component
	let component = inputNumber % 10;
	if(component !== 0) roman = UNITS[component - 1] + roman;

	// ten component
	if(inputNumber > component) { // stop if number has been already entirely parsed already
		inputNumber -= component;
		inputNumber /= 10;
		component = inputNumber % 10;
		if(component !== 0) roman = TENS[component - 1] + roman;
	}

	// hundred component
	if(inputNumber > component) {
		inputNumber -= component;
		inputNumber /= 10;
		component = inputNumber % 10;
		if(component !== 0) roman = HUNDREDS[component - 1] + roman;
	}

	// thousand component
	if(inputNumber > component) {
		inputNumber -= component;
		inputNumber /= 10;
		component = inputNumber % 10;
		if(component !== 0) roman = THOUSANDS[component - 1] + roman;
	}

	this.roman = roman;
	this.arabic = originalInputNumber;
};

RomanNumber.prototype.toInt = function() { return this.arabic; };
RomanNumber.prototype.toString = function() { return this.roman; };

module.exports = RomanNumber;
