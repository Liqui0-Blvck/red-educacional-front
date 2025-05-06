// src/types/administrative/Enrollment.ts

import { Student } from "./Student";

/** Valores posibles para el tipo de admisión */
export enum AdmissionType {
  Regular             = 'regular',
  Transfer            = 'transfer',
  PIEPriority         = 'pie_priority',
  MinistryRelocation  = 'ministry_relocation',
  SpecialProgram      = 'special_program',
  Other               = 'other',
}

/** Valores posibles para el estado de la matrícula */
export enum EnrollmentStatus {
  Postulado     = 'postulado',
  ListaEspera   = 'lista_espera',
  Seleccionado  = 'seleccionado',
  Aceptado      = 'aceptado',
  Matriculado   = 'matriculado',
  Rechazado     = 'rechazado',
}

/**
 * Representa un registro para la lista de matrículas
 * según EnrollmentListSerializer de Django REST Framework.
 */

export interface Enrollment {
  id: string
  student: string
  academic_year: string
  course: string
  school: string
  enrollment_number: number
  entry_date: string
  admission_type: AdmissionType
  status: EnrollmentStatus
  status_display: string
  isCurrent: boolean
  /** Fecha de creación (YYYY-MM-DD) */
  createdAt: string
  /** Fecha de modificación (YYYY-MM-DD) */
  updatedAt: string
}


export interface EnrollmentList{
  /** PK de la matrícula */
  id: string;

  /** Nombre completo del estudiante formateado */
  student: string;

  /** Año académico (__str__ de AcademicYear) */
  academic_year: string;

  /** Texto formateado "{Grado} {Nivel} {Letra}" */
  course: string;

  /** Nombre del establecimiento (__str__ de School) */
  school: string;

  /** Número de matrícula */
  enrollment_numerb: number;

  /** Fecha de ingreso (YYYY-MM-DD) */
  entry_date: string;

  /** Tipo de admisión */
  admission_type: AdmissionType;


  /** Etiqueta legible del estado (get_status_display) */
  status_display: string;

  /** Marca si la matrícula está activa */
  isCurrent: boolean;
}
