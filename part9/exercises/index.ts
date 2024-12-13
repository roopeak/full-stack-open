import express from 'express';
import calculateBmi from './bmiCalculator';
import { isNotNumber } from './utils';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
})

app.get('/bmi', (req, res) => {
	const height = req.query.height;
	const weight = req.query.weight;

	if (!weight || !height || isNotNumber(weight) || isNotNumber(height)) {
		res.status(500).json({ error: 'malformatted parameters'});
	} else {
		const bmi = calculateBmi(Number(height), Number(weight));
	
		res.json({
			weight: weight,
			height: height,
			bmi: bmi
		});
	}

})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});