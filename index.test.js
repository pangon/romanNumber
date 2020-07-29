"use strict";

const RomanNumber = require("./index");

const string2intTestcases = [
	["I", 1],
	["II", 2],
	["III", 3],
	["IV", 4],
	["V", 5],
	["1473", 1473],
	["CDXXIX", 429],
	["MCDLXXXII", 1482],
	["MCMLXXX", 1980],
	["MMMCMXCIX", 3999],
];

const int2stringTestcases = [
	[1, "I"],
	[3, "III"],
	[4, "IV"],
	[5, "V"],
	["1473", "MCDLXXIII"],
	[1968, "MCMLXVIII"],
	[2999, "MMCMXCIX"],
	[3000, "MMM"],
];

const errorTrowingTestcases = [
	[undefined, "value required"],
	[null, "value required"],
	[0, "invalid range"],
	["", "invalid value"],
	["IIII", "invalid value"],
	["CD1X", "invalid value"],
	["error", "invalid value"],
	["MMMMDMXCIX", "invalid value"],
	[10000, "invalid range"],
	[5.3, "invalid value"],
];

string2intTestcases.forEach((testCase) => ((input, expectedOutput) => {
	test(`converting string "${input}" to arabic`, () => { expect(new RomanNumber(input).toInt()).toBe(expectedOutput); });
	test(`converting string "${input}" to arabic (without using new)`, () => { expect(RomanNumber(input).toInt()).toBe(expectedOutput); });
})(testCase[0], testCase[1]));

int2stringTestcases.forEach((testCase) => ((input, expectedOutput) => {
	test(`converting arabic "${input}" to roman`, () => { expect(new RomanNumber(input).toString()).toBe(expectedOutput); });
	test(`converting arabic "${input}" to roman (without using new)`, () => { expect(RomanNumber(input).toString()).toBe(expectedOutput); });
})(testCase[0], testCase[1]));

errorTrowingTestcases.forEach((testCase) => ((input, expectedOutput) => {
	test(`using error throwing input "${input}"`, () => { expect(() => { new RomanNumber(input).toInt(); }).toThrow(expectedOutput); });
	test(`using error throwing input "${input}" (without using new)`, () => { expect(() => { RomanNumber(input).toInt(); }).toThrow(expectedOutput); });
})(testCase[0], testCase[1]));
