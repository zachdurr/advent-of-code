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

day1();
