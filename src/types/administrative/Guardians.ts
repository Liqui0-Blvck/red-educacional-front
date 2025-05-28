





export interface Guardian {
  id: string
  rut: string
  first_name: string
  second_name: string
  father_last_name: string
  mother_last_name: string
  email: string
  phone: string
  is_active: boolean
  is_staff: boolean
  date_joined: string
  relationship_to_student: string
  photo: File | null;
}