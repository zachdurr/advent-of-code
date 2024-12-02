const _testArr1 = [3, 4, 2, 1, 3, 3];
const _testArr2 = [4, 3, 5, 3, 9, 3];

export const getDifferences = (firstArray: number[], secondArray: number[]): number[] => {
	const differencesArray: number[] = [];

	while (firstArray.length > 0 && secondArray.length > 0) {
		const min1: number = Math.min(...firstArray);
		const min2: number = Math.min(...secondArray);

		differencesArray.push(Math.abs(min2 - min1));

		firstArray.splice(firstArray.indexOf(min1), 1);
		secondArray.splice(secondArray.indexOf(min2), 1);
	}

	return differencesArray;
};

export const getSum = (arrayOfNumbers: number[]): number => {
	let sum: number = 0;

	arrayOfNumbers.forEach((difference) => {
		sum += difference;
	});

	return sum;
};

export const getSimilarityCount = (arr1: number[], arr2: number[]) => {
	let totalSimilaritiesCount = 0;

	arr1.forEach((leftNum) => {
		let singleSimilarityCount = 0;

		arr2.forEach((rightNum) => {
			if (leftNum === rightNum) {
				singleSimilarityCount += 1;
			}
		});

		totalSimilaritiesCount += leftNum * singleSimilarityCount;
	});

	return totalSimilaritiesCount;
};
