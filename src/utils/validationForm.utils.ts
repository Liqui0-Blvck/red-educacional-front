import * as Yup from 'yup';


export const SignUpValidation = Yup.object({
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
    .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .matches(/\d/, 'Debe contener al menos un número')
    .matches(/[!@#$%^&*()_+{}\[\]:;"\'<>,.?~`]/, 'Debe contener al menos un carácter especial')
    .required('La contraseña es obligatoria'),
  re_password: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Las contraseñas deben coincidir')
    .required('La confirmación de contraseña es obligatoria'),
})

export const PerfilSchema = Yup.object().shape({
	first_name: Yup.string()
		.required('El primer nombre es requerido')
		.max(50, 'El primer nombre no debe exceder 50 caracteres'),
	father_last_name: Yup.string()
		.required('El apellido paterno es requerido')
		.max(50, 'El apellido paterno no debe exceder 50 caracteres'),
	fecha_nacimiento: Yup.date()
		.required('La fecha de nacimiento es requerida')
		.max(new Date(), 'La fecha de nacimiento no puede ser en el futuro'),
	genero: Yup.string()
		.required('El género es requerido')
		.oneOf(['Masculino', 'Femenino', 'Otro'], 'El género debe ser Masculino, Femenino u Otro'),
	numero_telefono: Yup.string()
		.required('El número de teléfono es requerido')
});



export const gimnasioValidationSchema = Yup.object().shape({
  nombre: Yup
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede exceder los 50 caracteres')
    .required('El nombre es obligatorio'),
  
  direccion: Yup
    .string()
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(100, 'La dirección no puede exceder los 100 caracteres'),
  
  ciudad: Yup
    .string()
    .min(3, 'La ciudad debe tener al menos 3 caracteres')
    .max(50, 'La ciudad no puede exceder los 50 caracteres'),
  
  telefono: Yup
    .string()
    .matches(/^[0-9]{10}$/, 'El teléfono debe tener 10 dígitos')
		.required('El Teléfono es obligatorio'),

  email: Yup
    .string()
    .email('Debe ser un correo electrónico válido')
    .required('El correo electrónico es obligatorio'),
  
  sitio_web: Yup
    .string()
    .url('Debe ser una URL válida')
});


export const miembroValidatorSchema = Yup.object().shape({
  email: Yup
    .string()
    .email('Debe ser un correo electrónico válido')
    .required('El correo electrónico es obligatorio'),
  
  first_name: Yup
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .required('El nombre es obligatorio'),
  
  second_name: Yup
    .string()
    .min(2, 'El segundo nombre debe tener al menos 2 caracteres')
    .notRequired(),
  
  father_last_name: Yup
    .string()
    .min(2, 'El apellido paterno debe tener al menos 2 caracteres')
    .required('El apellido paterno es obligatorio'),
  
  mother_last_name: Yup
    .string()
    .min(2, 'El apellido materno debe tener al menos 2 caracteres')
    .required('El apellido materno es obligatorio'),
  
  fecha_nacimiento: Yup
    .date()
    .required('La fecha de nacimiento es obligatoria')
    .nullable()
    .transform((value, originalValue) => originalValue === '' ? null : value),

  genero: Yup
    .string()
    .oneOf(['Masculino', 'Femenino', 'Otro'], 'El género no es válido')
    .required('El género es obligatorio'),

  direccion: Yup
    .string()
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .required('La dirección es obligatoria'),

  numero_telefono: Yup
    .string()
    .matches(/^\+569\d{8}$/, 'El número de teléfono debe comenzar con +569 y tener 8 dígitos adicionales')
    .required('El número de teléfono es obligatorio'),
});



export const restablecimientoContraseñaMiembro = Yup.object({
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres.')
    .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula.')
    .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula.')
    .matches(/\d/, 'La contraseña debe contener al menos un número.')
    .matches(/[@$!%*?&#]/, 'La contraseña debe contener al menos un carácter especial.')
    .required('Se requiere una contraseña.'),
  re_password: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Las contraseñas deben coincidir.')
    .required('Se requiere confirmar la contraseña.')
});