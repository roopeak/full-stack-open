import { isNotNumber } from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Values {
	dailyHours: number[];
	target: number;
}

const parseArguments = (args: string[]): Values => {
	const paramData = args.splice(2);
	const splicedData: number[] = [];

	for (const data of paramData) {
		if (isNotNumber(data)) throw new Error('Provided values were not numbers!');
		splicedData.push(Number(data));
	}

	return {
		dailyHours: splicedData.slice(0, -1),
		target: splicedData[0],
	};
};

const calculateExercises = (
	dailyHours: Array<number>,
	target: number
): Result => {
	const periodLength = dailyHours.length;
	const trainingDays = dailyHours.filter(hours => hours > 0).length;
	const totalHours = dailyHours.reduce((acc, curr) => acc + curr, 0);
	const average = totalHours / periodLength;
	const success = average >= target;

	let rating;
	let ratingDescription;

	if (average < target) {
		rating = 1;
		ratingDescription = 'not too bad but could be better';
	} else if (average === target) {
		rating = 2;
		ratingDescription = 'you met your target';
	} else {
		rating = 3;
		ratingDescription = 'you exceeded your target';
	}

	return {
		periodLength: periodLength,
		trainingDays: trainingDays,
		success: success,
		rating: rating,
		ratingDescription: ratingDescription,
		target: target,
		average: average
	};
};

try {
	const parameters = parseArguments(process.argv);
	console.log(calculateExercises(parameters.dailyHours, parameters.target));
} catch (error: unknown) {
	if (error instanceof Error) {
		console.log('Error:', error.message);
	}
}

export default calculateExercises;