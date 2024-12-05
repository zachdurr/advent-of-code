import { readFile } from 'node:fs/promises';

const day3 = async (): Promise<void> => {
	try {
		const parseAndMultiply = (mulString: string): number => {
			const numbers = mulString.split('(')[1].split(',');
			const firstNumber = parseInt(numbers[0]);
			const secondNumber = parseInt(numbers[1].split(')')[0]);
			const product = firstNumber * secondNumber;
			return product;
		};

		const getSumOfMuls = (dataString: string): number => {
			const mulRegEx = new RegExp(/mul\(\d{1,3},\d{1,3}\)/g);
			const matches = dataString.match(mulRegEx);
			let sum = 0;
			matches?.forEach((match) => {
				sum += parseAndMultiply(match);
			});

			return sum;
		};

		const getSumOfEnabledMuls = (dataString: string) => {
			let sum = 0;
			const doDontRegEx = /mul\(\d*,\d*\)|don\'t\(\)|do\(\)/g;
			const validMatches = [...dataString.matchAll(doDontRegEx)].map((match) => match[0]);
			let disabled = false;
			validMatches.forEach((match) => {
				if (match === 'do()') {
					disabled = false;
				} else if (match === "don't()") {
					disabled = true;
				} else if (!disabled) {
					sum += parseAndMultiply(match);
				}
			});

			return sum;
		};

		await readFile('./day3/input.txt').then((data) => {
			const rawDataString = data.toString();

			console.log('day 3, part 1: ', getSumOfMuls(rawDataString));
			console.log('day 3, part 2: ', getSumOfEnabledMuls(rawDataString));
		});
	} catch (err) {
		console.error(err);
	}
};

const day4 = async (): Promise<void> => {
	const xmasArr = await readFile('./day4/input.txt').then((data) => {
		return data
			.toString()
			.split('\n')
			.map((line) => line.trim());
	});
	const length = xmasArr.length;

	const part1 = () => {
		let count = 0;

		// valid directions (vertical, horizontal and diagonals)
		const directions: [number, number][] = [
			[0, -1],
			[0, 1],
			[-1, 0],
			[1, 0],
			[-1, -1],
			[1, 1],
			[-1, 1],
			[1, -1],
		];

		for (let i = 0; i < length; i++) {
			for (let j = 0; j < xmasArr[i].length; j++) {
				const y = xmasArr[i][j];

				// check for X
				if (y === 'X') {
					// check all 8 directions for "XMAS"
					for (const [di, dj] of directions) {
						// check that loop doesn't go out of bounds
						if (
							0 <= i + 3 * di &&
							i + 3 * di < length &&
							0 <= j + 3 * dj &&
							j + 3 * dj < xmasArr[i].length
						) {
							// look for matches
							if (
								xmasArr[i + di][j + dj] === 'M' &&
								xmasArr[i + 2 * di][j + 2 * dj] === 'A' &&
								xmasArr[i + 3 * di][j + 3 * dj] === 'S'
							) {
								count += 1;
							}
						}
					}
				}
			}
		}

		console.log(`day 4, part 1:  ${count}`);
	};
	const part2 = (): void => {
		let count = 0;

		// directions for diagonals (top-right, bottom-right, bottom-left, top-left)
		const directions: [number, number][] = [
			[1, 1],
			[1, -1],
			[-1, -1],
			[-1, 1],
		];

		// loop through the grid
		for (let i = 0; i < length; i++) {
			for (let j = 0; j < xmasArr[i].length; j++) {
				const y = xmasArr[i][j];

				if (y === 'A') {
					let masCount = 0;

					try {
						// check all diagonal directions
						for (const [di, dj] of directions) {
							if (0 <= i + di && i + di < length && 0 <= j + dj && j + dj < xmasArr[i].length) {
								// check for valid X pattern
								if (xmasArr[i + di][j + dj] === 'S' && xmasArr[i - di]?.[j - dj] === 'M') {
									masCount += 1;
								}
								if (xmasArr[i + di][j + dj] === 'M' && xmasArr[i - di]?.[j - dj] === 'S') {
									masCount += 1;
								}
							}
						}

						if (masCount === 4) {
							count += 1;
						}
					} catch (err) {
						console.log('Error:', err);
					}
				}
			}
		}

		console.log(`day 4, part 2:  ${count}`);
	};
	part1();
	part2();
};

day3();
day4();
