const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / ((height / 100) * (height / 100));
  if (bmi <= 18.4) {
    return 'Underweight';
  } else if (18.5 <= bmi && bmi <= 24.9) {
    return 'Normal range';
  } else if (25.0 <= bmi) {
    return 'Overweight'
  }
}

console.log(calculateBmi(180,274));