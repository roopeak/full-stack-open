import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import { isNotNumber } from './utils';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const height = req.query.height;
	const weight = req.query.weight;

	if (!weight || !height || isNotNumber(weight) || isNotNumber(height)) {
		res.status(500).json({ error: 'malformatted parameters' });
	} else {
		const bmi = calculateBmi(Number(height), Number(weight));
	
		res.json({
			weight: weight,
			height: height,
			bmi: bmi
		});
	}
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  daily_exercises.forEach((hour: string) => {
    if (isNotNumber(Number(hour))) {
      res.status(500).json({ error: 'malformatted parameters' });
    }
  });

  if (!daily_exercises || !target) {
    res.status(500).json({ error: 'parameters missing' });
  } else {  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const dailyHours: number[] = daily_exercises.map(Number);
    res.json(calculateExercises(dailyHours, Number(target)));
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});