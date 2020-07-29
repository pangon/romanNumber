const RomanNumber = require("./index");

const string2intTestcases = [
	[ "I", 1 ],
	[ "II", 2 ],
	[ "III", 3 ],
	[ "IV", 4 ],
	[ "V", 5 ],
	[ "1473", 1473 ],
	[ "CDXXIX", 429 ],
	[ "MCDLXXXII", 1482 ],
	[ "MCMLXXX", 1980 ],
	[ "MMMCMXCIX", 3999 ],
];

const int2stringTestcases = [
	[ 1, "I" ],
	[ 3, "I" ],
	[ 4, "I" ],
	[ 5, "I" ],
	[ "1473", 1473 ],
	[ 1968, "I" ],
	[ 2999, "I" ],
	[ 3000, "I" ],
	[ 10000, "I" ],
];

const errorTrowingTestcases = [
	[ null, 4 ],
	[ 0, 4 ],
	[ "", 4 ],
	[ "IIII", 4 ],
	[ "CD1X", 1473 ],
	[ "error", 1473 ],
	[ "MMMMDMXCIX", 99999 ],
];

string2intTestcases.forEach(
	testCase => ((input, expectedOutput) => test("converting string '" + input + "' to arabic", () => { expect(new RomanNumber(input).toInt()).toBe(expectedOutput); }))(testCase[0], testCase[1])
)

int2stringTestcases.forEach(
	testCase => ((input, expectedOutput) => test("converting arabic '" + input + "' to roman", () => { expect(new RomanNumber(input).toString()).toBe(expectedOutput); }))(testCase[0], testCase[1])
)
