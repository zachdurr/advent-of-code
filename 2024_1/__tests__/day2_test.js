import { isSafeReport } from '../day2/day2.ts';

const testInput = [
	[7, 6, 4, 2, 1],
	[1, 2, 7, 8, 9],
	[9, 7, 6, 2, 1],
	[1, 3, 2, 4, 5],
	[8, 6, 4, 4, 1],
	[1, 3, 6, 7, 9],
];

describe('isSafeReport', () => {
	it('should return whether the report is safe', () => {
		const firstResult = isSafeReport(testInput[0]);
		const secondResult = isSafeReport(testInput[1]);
		const thirdResult = isSafeReport(testInput[2]);
		const fourthResult = isSafeReport(testInput[3]);
		const fifthResult = isSafeReport(testInput[4]);
		const sixthResult = isSafeReport(testInput[5]);
		expect(firstResult).toEqual(true);
		expect(secondResult).toEqual(true);
		expect(thirdResult).toEqual(false);
		expect(fourthResult).toEqual(false);
		expect(fifthResult).toEqual(true);
		expect(sixthResult).toEqual(false);
	});
});
