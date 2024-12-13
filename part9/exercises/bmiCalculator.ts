require.main === module

interface Values {
  height: number,
  weight: number
}

const parseArguments = (args: string[]): Values => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
} 

const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / ((height / 100) * (height / 100));
  if (bmi <= 18.4) {
    return 'Underweight';
  } else if (18.5 <= bmi && bmi <= 24.9) {
    return 'Normal range';
  } else if (25.0 <= bmi) {
    return 'Overweight';
  }

  return;
}

try {
  if (require.main === module) {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  }
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log('Error:', error.message);
  }
}

export default calculateBmi;