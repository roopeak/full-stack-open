interface Result {
	periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
	exerciseHours: Array<number>,
	target: number
) => {
	const periodLength = exerciseHours.length;
	const trainingDays = exerciseHours.filter(hours => hours > 0).length;
	const totalHours = exerciseHours.reduce((acc, curr) => acc + curr, 0);
	const average = totalHours / periodLength;
	const success = average >= target

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
	}
}

console.log(calculateExercises([3,0,2,4.5,0,3,1], 2));