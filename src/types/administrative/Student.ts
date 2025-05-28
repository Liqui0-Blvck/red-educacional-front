// src/types/administrative/Student.ts

import { Guardian } from "./Guardians";

/** Valores posibles para género */
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

/** Valores posibles de religión */
export enum Religion {
  Catholic     = 'catholic',
  Evangelical  = 'evangelical',
  Other        = 'other',
  None         = 'none',
}

/** Tipo de ingreso PIE */
export type AdmissionType =
  | 'regular'
  | 'transfer'
  | 'pie_priority'
  | 'ministry_relocation'
  | 'special_program'
  | 'other';

/** Tipo de NEE */
export type NEEType = 'permanent' | 'transitory';

/** Opción boolean con label */
export interface BooleanOption {
  value: boolean;
  label: string;
}


/** Datos de residencia */
export interface Residence {
  address: string;
  commune: string;
}

/** Contacto del estudiante */
export interface ContactInfo {
  phone?: string;
  email?: string;
}

/** Registro de etnia */
export interface EthnicityRecord {
  belongs_to_indigenous_people: boolean;
  indigenous_group?: string;
}

/** Estado migratorio */
export interface MigrationRecord {
  is_foreign: boolean;
  entry_date_to_country?: string;
  previous_country_of_residence?: string;
}

/** Hermano(a) en el mismo establecimiento */
export interface Sibling {
  id: string;
  name: string;
  course: string;
}

/** Información de vulnerabilidad */
export interface VulnerabilityRecord {
  is_in_social_program: boolean;
  social_program_name?: string;
  is_in_vulnerable_situation: boolean;
  vulnerability_description?: string;
}

/** Detalle de matrícula */
export interface EnrollmentInfo {
  id: string;
  created_at: string;
  updated_at: string;
  enrollment_number: number;
  entry_date: string;
  admission_type: AdmissionType;
  previous_school: string;
  status: string;
  is_current: boolean;
  student: number;
  academic_year: number;
  course: number;
  school: number;
}

/** Enfermedad crónica asociada */
export interface ChronicDisease {
  id?: string;
  name: string;
  diagnosis_date: string;            // "YYYY-MM-DD"
  severity: 'mild' | 'moderate' | 'severe';
  treatment_plan?: string;
  notes?: string;
}

/** Alergia asociada */
export interface Allergy {
  id?: string;
  name: string;
  diagnosis_date: string;            // "YYYY-MM-DD"
  severity: 'mild' | 'moderate' | 'severe';
  reaction?: string;
  notes?: string;
}

/** Registro de salud completo */
export interface HealthRecord {
  is_insured: boolean;
  insurance_type?: string;
  receives_treatment: boolean;
  treatment_description?: string;
  chronic_diseases: ChronicDisease[];
  allergies: Allergy[];
  updated_at?: string;
}

/** Tipo principal de estudiante */
export interface Student {
  id: string;
  identification_number: string;
  verification_digit: string;

  // Datos personales
  first_name: string;
  last_name?: string;
  father_last_name: string;
  mother_last_name: string;
  date_of_birth: string;             // "YYYY-MM-DD"
  gender: Gender;
  nationality: string;
  country_of_birth: string;
  nationality_type: 'chilean' | 'foreigner';
  religion?: Religion;
  speaks_native_language: boolean;

  // Programas especiales
  belongs_to_pie: boolean;
  pie_entry_date?: string;           // "YYYY-MM-DD"
  has_nee: boolean;
  nee_type?: NEEType;
  nee_description?: string;
  status: string;

  // Relaciones
  guardians: Guardian[];
  residence?: Residence;
  contact_info?: ContactInfo;
  health_info?: HealthRecord;
  ethnicity_record?: EthnicityRecord;
  migration_status?: MigrationRecord;
  siblings_in_school?: Sibling[];
  vulnerability_info?: VulnerabilityRecord;
  enrollment_info?: EnrollmentInfo[];

  created_at: string;
  updated_at: string;
}

/** Para listados ligeros */
export interface StudentList {
  id: string;
  dni: string;                       // ej. "12345678-9"
  first_name: string;
  last_name: string;
  father_last_name: string;
  mother_last_name: string;
  status: string;
  gender: Gender;
  date_of_birth: string;
  course: string;
  entry_date: string;
}
