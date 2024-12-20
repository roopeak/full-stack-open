import { z } from 'zod';
import { NewPatientEntry, Gender } from "./types";

export const NewEntrySchema = z.object({
	name: z.string(),
	ssn: z.string(),
	dateOfBirth: z.string().date(),
	occupation: z.string(),
	gender: z.nativeEnum(Gender)
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
	return NewEntrySchema.parse(object);
};