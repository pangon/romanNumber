const RomanNumber = require("./index");

const string2intTestcases = [
	[ "I", 1 ],
	[ "II", 2 ],
	[ "III", 3 ],
	[ "IV", 4 ],
	[ "V", 5 ],
	[ "1473", 1473 ],
	[ "CDXXIX", 99999 ],
	[ "MCDLXXXII", 99999 ],
	[ "MCMLXXX", 99999 ],
	[ "MMMMCMXCIX", 99999 ],
	[ "MMMMDMXCIX", 99999 ],
];

const int2stringTestcases = [
	[ 1, "I" ],
	[ 3, "I" ],
	[ 4, "I" ],
	[ 5, "I" ],
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
];

string2intTestcases.forEach(
	testCase => ((input, expectedOutput) => test("converting string '" + input + "'", () => { expect(RomanNumber(input).toInt()).toBe(expectedOutput); }))(testCase[0], testCase[1])
)
