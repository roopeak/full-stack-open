import { z } from 'zod';
import { NewEntrySchema } from './utils';

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

export type NewPatientEntry = z.infer<typeof NewEntrySchema>;

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;