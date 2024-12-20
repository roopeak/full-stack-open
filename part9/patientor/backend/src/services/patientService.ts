import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { 
  NonSensitivePatientEntry,
  NewPatientEntry, 
  PatientEntry 
} from '../types';

const getEntries = (): PatientEntry[] => {
  return patientData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = { 
    id: uuid(), 
    ...entry 
  };
  
  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};