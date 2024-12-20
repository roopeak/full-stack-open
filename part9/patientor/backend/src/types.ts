export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface DiagnoseEntry {
	code: string;
	name: string;
	latin?: string;
}

export interface PatientEntry {
	id: string;
  name: string;
  occupation: string;
  gender: string;
  ssn?: string;
  dateOfBirth?: string;
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;