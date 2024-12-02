const fs = require('node:fs');
const path = require('node:path');

const _testInput = [
	[7, 6, 4, 2, 1],
	[1, 2, 7, 8, 9],
	[9, 7, 6, 2, 1],
	[1, 3, 2, 4, 5],
	[8, 6, 4, 4, 1],
	[1, 3, 6, 7, 9],
];

const filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, 'utf8', (err: Error, data: string) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}

	const lines = data.split('\n').map((line) =>
		line
			.trim()
			.split(' ')
			.map((number: string) => parseInt(number, 10)),
	);

	// check if line is safe report
	// safe report if:
	// 1. The levels are either all increasing or all decreasing. and
	// 2. Any two adjacent levels differ by at least one and at most three.
	const isAscending = (arr: number[]) => {
		return arr.every((val, i, arr) => i === 0 || val >= arr[i - 1]);
	};

	const isDescending = (arr: number[]) => {
		return arr.every((val, i, arr) => i === 0 || val <= arr[i - 1]);
	};

	const isSafeReport = (arr: number[]) => {
		return (
			(isAscending(arr) || isDescending(arr)) &&
			arr.every(
				(val, i, arr) =>
					i === 0 || (Math.abs(val - arr[i - 1]) <= 3 && Math.abs(val - arr[i - 1]) >= 1),
			)
		);
	};

	const isSafeReportAfterRemovingOneNumber = (arr: number[]) => {
		// need to iterate thru each array and remove each index to see if the report is either ascending/descending/isSafeReport returns true
		// if it does, return true
		for (let i = 0; i < arr.length; i++) {
			const newArr = arr.slice(0, i).concat(arr.slice(i + 1));
			if (isSafeReport(newArr)) {
				return true;
			}
		}

		return false;
	};

	let safeReportCount = 0;
	const unsafeReports: number[][] = [];

	lines.forEach((line): void => {
		if (isSafeReport(line)) {
			safeReportCount += 1;
		} else {
			unsafeReports.push(line);
		}
	});
	unsafeReports.forEach((report: number[]): void => {
		if (isSafeReportAfterRemovingOneNumber(report)) {
			safeReportCount += 1;
		}
	});
	console.log(safeReportCount);
});
