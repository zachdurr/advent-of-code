import { describe } from 'node:test';
import { sortAscAndGetDifferences, getSum } from '../day1/day1.ts';

describe('sortAscAndGetDifferences', () => {
	it('should return the differences between corresponding elements of two arrays', () => {
		const arr1 = [3, 4, 2, 1, 3, 3];
		const arr2 = [4, 5, 6, 3, 9, 3];

		const result = sortAscAndGetDifferences(arr1, arr2);
		expect(result).toEqual([2, 1, 1, 2, 3, 5]);
	});
});

describe('getSum', () => {
	it('should return the sum of all elements in the array', () => {
		const arr = [3, 4, 2, 1, 3, 3];

		const result = getSum(arr);
		expect(result).toEqual(16);
	});
});
