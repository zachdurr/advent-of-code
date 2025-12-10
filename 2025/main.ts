import { readFile } from 'node:fs/promises';

const day1 = async (): Promise<void> => {
	const startingPosition: number = 50;
	let currentPosition: number = startingPosition;
	let exactZeroCounter: number = 0;
	let totalZeroCounter: number = 0;

	const handleAdd = (number: number): number => {
		// if number is greater than max position, return 0 + number - max position - 1
		// i.e. if number is 100, return 0.
		return (currentPosition + number) % 100;
	};

	const handleSub = (number: number): number => {
		// if number is less than min position, return max position - number + 1
		// i.e. if number is -1, return 99.
		if (currentPosition - number < 0) {
			return (currentPosition - number + 100) % 100;
		} else return currentPosition - number;
	};

	const handleMovement = (movement: string): void => {
		const twoDigitMovementNumber = parseInt(movement.slice(1)) % 100;
		const fullMovementNumber = parseInt(movement.slice(1));
		const distanceToZero = getDistanceToZero(movement[0]);
		if (fullMovementNumber >= distanceToZero) {
			const numberOfTimesPassingZero = Math.floor((fullMovementNumber - distanceToZero) / 100) + 1;
			totalZeroCounter += numberOfTimesPassingZero;
		}
		if (movement[0] === 'L') {
			currentPosition = handleSub(twoDigitMovementNumber);
		} else if (movement[0] === 'R') {
			currentPosition = handleAdd(twoDigitMovementNumber);
		} else {
			throw new Error('Invalid movement');
		}
	};

	const getDistanceToZero = (direction: string): number => {
		if (currentPosition === 0) {
			return 100;
		} else if (direction === 'L') {
			return currentPosition;
		} else if (direction === 'R') {
			return 100 - currentPosition;
		} else return currentPosition;
	};

	const data: string = await readFile('day1.txt', 'utf8');
	const lines: string[] = data.split('\n');
	lines.forEach((line) => {
		handleMovement(line);
		if (currentPosition === 0) exactZeroCounter++;
	});
	console.log('exactZeroCounter: ', exactZeroCounter);
	console.log('totalZeroCounter: ', totalZeroCounter);
};

const day2 = async (): Promise<void> => {
	const data: string = await readFile('day2.txt', 'utf8');
	const dataArr: string[] = data.split(',');
	const invalidIds: number[] = [];
	let invalidIdCount: number = 0;

	dataArr.forEach((dataSet: string) => {
		const lowEnd: number = parseInt(dataSet.split('-')[0]);
		const highEnd: number = parseInt(dataSet.split('-')[1]);

		const part1 = () => {
			for (let i = lowEnd; i <= highEnd; i++) {
				const numString: string = i.toString();

				if (numString.length % 2 !== 0) continue;

				const midPoint: number = numString.length / 2;

				const firstHalfOfNumString: string = numString.slice(0, midPoint);
				const secondHalfOfNumString: string = numString.slice(midPoint);
				if (firstHalfOfNumString === secondHalfOfNumString) invalidIds.push(i);
			}
		};

		const part2 = () => {
			for (let i = lowEnd; i <= highEnd; i++) {
				const indexNumString = i.toString();

				for (let j = 1; j <= Math.floor(indexNumString.length / 2); j++) {
					if (indexNumString.length % j !== 0) continue;
					const slice = indexNumString.slice(0, j);
					const numOfTimesToRepeat = indexNumString.length / j;

					if (slice.repeat(numOfTimesToRepeat) === indexNumString) {
						invalidIds.push(i);
						break;
					}
				}
			}
		};
		// part1();
		part2();
	});

	invalidIds.forEach((id) => {
		invalidIdCount += id;
	});
	console.log('invalidIdCount: ', invalidIdCount);
};

// day1();
day2();
