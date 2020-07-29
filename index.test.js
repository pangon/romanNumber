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
	[ 3, "III" ],
	[ 4, "IV" ],
	[ 5, "V" ],
	[ 5.3, "V" ],
	[ "1473", "MCDLXXIII" ],
	[ 1968, "MCMLXVIII" ],
	[ 2999, "MMCMXCIX" ],
	[ 3000, "MMM" ],
];

const errorTrowingTestcases = [
	[ null, 4 ],
	[ 0, 4 ],
	[ "", 4 ],
	[ "IIII", 4 ],
	[ "CD1X", 1473 ],
	[ "error", 1473 ],
	[ "MMMMDMXCIX", 99999 ],
	[ 10000, "I" ],
];

string2intTestcases.forEach(
	testCase => ((input, expectedOutput) => test("converting string '" + input + "' to arabic", () => { expect(new RomanNumber(input).toInt()).toBe(expectedOutput); }))(testCase[0], testCase[1])
)

int2stringTestcases.forEach(
	testCase => ((input, expectedOutput) => test("converting arabic '" + input + "' to roman", () => { expect(new RomanNumber(input).toString()).toBe(expectedOutput); }))(testCase[0], testCase[1])
)
