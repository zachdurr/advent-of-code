import { readFile } from 'node:fs/promises';

const day3 = async () => {
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

			console.log('part 1: ', getSumOfMuls(rawDataString));
			console.log('part 2: ', getSumOfEnabledMuls(rawDataString));
		});
	} catch (err) {
		console.error(err);
	}
};

day3();
