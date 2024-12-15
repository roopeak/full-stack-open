import patientData from '../../data/patients';

import { PatientEntry } from '../types';

const patients: PatientEntry[] = patientData;

const getEntries = (): PatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getEntries
};