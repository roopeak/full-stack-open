import { NewPatientEntry, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseEntry = (value: unknown): string => {
	if (!value || !isString(value)) {
		throw new Error('Incorrect or missing value');
	}
	return value;
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect date: ' + date);
	}
	return date;
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isGender(gender)) {
		throw new Error('Incorrect or missing gender');
	}
	return gender;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}
	
	if ('name' in object && 'ssn' in object && 'dateOfBirth' in object 
		&& 'occupation' in object && 'gender' in object) {
		const newEntry: NewPatientEntry = {
			name: parseEntry(object.name),
			ssn: parseEntry(object.ssn),
			dateOfBirth: parseDate(object.dateOfBirth),
			occupation: parseEntry(object.occupation),
			gender: parseGender(object.gender),
		};
		return newEntry;
	};

	throw new Error('Incorrect data: some fields are missing');
};