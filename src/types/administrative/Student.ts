export type Guardian = {
  id: string;
  first_name: string;
  last_name: string;
  identification_number: string;
  relationship: string;
  phone?: string;
  email?: string;
  address?: string;
  occupation?: string;
};

export type Student = {
  id: string;
  identification_number: string;
  verification_digit: string;
  first_name: string;
  last_name: string;
  father_last_name: string;
  mother_last_name: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
  nationality: string;
  country_of_birth: string;
  nationality_type: 'chilean' | 'foreigner';
  native_ethnicity?: string;
  religion?: 'catholic' | 'evangelical' | 'other' | 'none';
  speaks_native_language: boolean;
  belongs_to_pie: boolean;
  pie_entry_date?: string;
  has_nee: boolean;
  nee_type?: 'permanent' | 'transitory';
  nee_description?: string;
  status: string

  // Relaciones
  guardians: Guardian[];

  // Datos Relacionados
  residence?: {
    address: string;
    commune: string;
  };
  contact_info?: {
    phone?: string;
    email?: string;
  };
  health_info?: {
    is_insured: boolean;
    insurance_type?: string;
    chronic_diseases?: string;
    allergies?: string;
    receives_treatment: boolean;
    treatment_description?: string;
  };
  ethnicity_record?: {
    belongs_to_indigenous_people: boolean;
    indigenous_group?: string;
  };
  migration_status?: {
    is_foreign: boolean;
    entry_date_to_country?: string;
    previous_country_of_residence?: string;
  };
  siblings_in_school?: {
    id: string;
    name: string;
    course: string;
  }[];
  vulnerability_info?: {
    is_in_social_program: boolean;
    social_program_name?: string;
    is_in_vulnerable_situation: boolean;
    vulnerability_description?: string;
  };

  created_at: string;
  updated_at: string;
};


export type StudentList = {
  id: string;
  dni: string
  first_name: string;
  last_name: string;
  father_last_name: string;
  mother_last_name: string;
  status: string
  gender: string
  date_of_birth: string
  course: string
  entry_date: string
}