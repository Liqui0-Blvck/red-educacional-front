export type AuthTokens = {
  access: string | null 
  refresh: string | null
}

export type TPerfil = {
  id: number
  email: string
  first_name: string
  second_name: string | null
  father_last_name: string
  mother_last_name: string
  is_staff: boolean
  is_active: boolean
  date_joined: string
  groups: any[] // o string[] si defines grupos por nombre
  user_permissions: any[] // o string[]
  birth_date: string | null
  gender: string | null
  address: string | null
  phone_number: string | null
  profile_image: string | null
  social_links: string | null
  last_modified: string
  user_type: "alumno" | "docente" | "apoderado" | "administrador" | "asistente_educacion"
  user_type_detail?: {
    department?: string
    role?: string
    relationship_to_student?: string
    subjects?: string[]
    area_of_assistance?: string
  }
}



export type TConfiguracion = {
  idioma_preferido: string
  configuraciones_notificaciones: boolean
  configuraciones_privacidad: boolean
  estilo_aplicacion: string
  color_aplicacion: string
  fuente_aplicacion: string
}