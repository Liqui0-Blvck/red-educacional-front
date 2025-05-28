import { Subject } from "../academic/subject"





export interface Teacher {
  id: string
  teacher: {
    first_name: string
    second_name: string
    father_last_name: string
    mother_last_name: string
    rut: string
    date_of_birth: string
    phone: string
    email: string
    gender: string
    profile_image: string
    date_joined: string
    is_active: boolean
    address: string
    last_modified: string
    department: string

  }
  jec_hours: number
  sep_hours: number
  total_hours: number
  main_subject: string
  role_description: string
  subject: Subject[]
}