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