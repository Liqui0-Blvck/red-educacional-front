// src/components/administration/TeacherForm.tsx
import React, { FC, useEffect, useState } from 'react'
import { Formik, Form, FieldArray, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper'
import Subheader, { SubheaderLeft, SubheaderRight } from '../../../../components/layouts/Subheader/Subheader'
import Card, { CardHeader, CardBody } from '../../../../components/ui/Card'
import FieldWrap from '../../../../components/form/FieldWrap'
import Label from '../../../../components/form/Label'
import Input from '../../../../components/form/Input'
import Textarea from '../../../../components/form/Textarea'
import SelectReact from '../../../../components/form/SelectReact'
import Button from '../../../../components/ui/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { Subject } from '../../../../types/academic/subject'
import { useSubjects } from '../../../../api/subject.api'
import { useCreateTeacher, useTeacher, useTeachers, useUpdateTeacher } from '../../services/teachers.api'
import { Teacher } from '../../../../types/administrative/Teacher'


const genderOptions = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Femenino' },
  { value: 'other', label: 'Otro' },
]

interface FormValues {
  rut: string
  email: string
  phone: string
  first_name: string
  second_name?: string
  father_last_name: string
  mother_last_name?: string
  birth_date?: string
  gender?: string
  address?: string
  social_links?: string
  profile_image: File | null
  department?: string
  subjects: Subject[]
}

// const validationSchema = Yup.object({
//   rut: Yup.string().required('RUN es obligatorio'),
//   email: Yup.string().email('Email inválido').required('Email es obligatorio'),
//   first_name: Yup.string().required('Nombre es obligatorio'),
//   father_last_name: Yup.string().required('Apellido Paterno obligatorio'),
//   subjects: Yup.array().min(1, 'Seleccione al menos una asignatura'),
// })

const TeacherForm: FC = () => {
  const navigate = useNavigate()
  const { teacherId } = useParams<{ teacherId: string }>()
  const isEdit = Boolean(teacherId)

  const { data: subjects = [] } = useSubjects()
  const { data: teacher } = useTeacher(teacherId!)
  const createMutation = useCreateTeacher()
  const updateMutation = useUpdateTeacher()

  const initialValues: FormValues = {
    rut: teacher?.teacher.rut ?? '',
    email: teacher?.teacher.email ?? '',
    phone: teacher?.teacher.phone ?? '',
    first_name: teacher?.teacher.first_name ?? '',
    second_name: teacher?.teacher.second_name ?? '',
    father_last_name: teacher?.teacher.father_last_name ?? '',
    mother_last_name: teacher?.teacher.mother_last_name ?? '',
    birth_date: teacher?.teacher.date_of_birth ?? '',
    gender: teacher?.teacher.gender ?? '',
    address: teacher?.teacher.address ?? '',
    profile_image: null,
    department: teacher?.teacher.department ?? '',
    subjects: teacher?.subject ?? [],
  }

  const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const payload: Teacher = {
      id: teacher?.id ?? '',
      teacher: {
        rut: values.rut,
        email: values.email,
        phone: values.phone,
        user_type: 'teacher',
        first_name: values.first_name,
        second_name: values.second_name || '',
        father_last_name: values.father_last_name,
        mother_last_name: values.mother_last_name || '',
        birth_date: values.birth_date,
        gender: values.gender || '',
        address: values.address || '',
        profile_image: values.profile_image || '',
        is_active: true,
        is_staff: false,
      },
      department: values.department,
      subjects: values.subjects,
    }

    if (isEdit) {
      await updateMutation.mutateAsync(payload)
    } else {
      await createMutation.mutateAsync(payload)
    }
    actions.setSubmitting(false)
    navigate('/administracion/personal/docentes')
  }

  return (
    <PageWrapper name={isEdit ? 'Editar Docente' : 'Nuevo Docente'}>
      <Subheader>
        <SubheaderLeft>
          <Button variant="outline" icon="HeroArrowLeft" onClick={() => navigate(-1)}>
            Volver
          </Button>
        </SubheaderLeft>
      </Subheader>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {formik => (
          <Form>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">{isEdit ? 'Editar Docente' : 'Nuevo Docente'}</h3>
              </CardHeader>
              <CardBody className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* RUN */}
                <div>
                  <Label htmlFor="rut">RUN</Label>
                  <FieldWrap>
                    <Input id="rut" name="rut" onChange={formik.handleChange} value={formik.values.rut} />
                  </FieldWrap>
                </div>
                {/* Email */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <FieldWrap>
                    <Input id="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
                  </FieldWrap>
                </div>
                {/* Teléfono */}
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <FieldWrap>
                    <Input id="phone" name="phone" onChange={formik.handleChange} value={formik.values.phone} />
                  </FieldWrap>
                </div>
                {/* Nombres y apellidos */}
                <div>
                  <Label htmlFor="first_name">Nombre</Label>
                  <FieldWrap>
                    <Input id="first_name" name="first_name" onChange={formik.handleChange} value={formik.values.first_name} />
                  </FieldWrap>
                </div>
                <div>
                  <Label htmlFor="second_name">Segundo Nombre</Label>
                  <FieldWrap>
                    <Input id="second_name" name="second_name" onChange={formik.handleChange} value={formik.values.second_name} />
                  </FieldWrap>
                </div>
                <div>
                  <Label htmlFor="father_last_name">Apellido Paterno</Label>
                  <FieldWrap>
                    <Input id="father_last_name" name="father_last_name" onChange={formik.handleChange} value={formik.values.father_last_name} />
                  </FieldWrap>
                </div>
                <div>
                  <Label htmlFor="mother_last_name">Apellido Materno</Label>
                  <FieldWrap>
                    <Input id="mother_last_name" name="mother_last_name" onChange={formik.handleChange} value={formik.values.mother_last_name} />
                  </FieldWrap>
                </div>
                {/* Fecha de nacimiento y género */}
                <div>
                  <Label htmlFor="birth_date">Fecha de Nacimiento</Label>
                  <FieldWrap>
                    <Input id="birth_date" type="date" name="birth_date" onChange={formik.handleChange} value={formik.values.birth_date} />
                  </FieldWrap>
                </div>
                <div>
                  <Label htmlFor="gender">Género</Label>
                  <FieldWrap>
                    <SelectReact
                      inputId="gender"
                      name="gender"
                      options={genderOptions}
                      value={genderOptions.find(o => o.value === formik.values.gender)}
                      onChange={(opt: any) => formik.setFieldValue('gender', opt?.value)}
                    />
                  </FieldWrap>
                </div>
                {/* Dirección */}
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Dirección</Label>
                  <FieldWrap>
                    <Textarea id="address" name="address" onChange={formik.handleChange} value={formik.values.address} rows={2} />
                  </FieldWrap>
                </div>
                {/* Enlaces sociales */}
                <div className="sm:col-span-2">
                  <Label htmlFor="social_links">Enlaces Sociales</Label>
                  <FieldWrap>
                    <Input id="social_links" name="social_links" onChange={formik.handleChange} value={formik.values.social_links} />
                  </FieldWrap>
                </div>
                {/* Imagen de perfil */}
                <div className="sm:col-span-2">
                  <Label htmlFor="profile_image">Imagen de Perfil</Label>
                  <FieldWrap>
                    <Input
                      id="profile_image"
                      name="profile_image"
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        if (e.currentTarget.files?.[0]) {
                          formik.setFieldValue('profile_image', e.currentTarget.files[0])
                        }
                      }}
                    />
                  </FieldWrap>
                </div>
                {/* Departamento */}
                <div>
                  <Label htmlFor="department">Departamento</Label>
                  <FieldWrap>
                    <Input id="department" name="department" onChange={formik.handleChange} value={formik.values.department} />
                  </FieldWrap>
                </div>
                {/* Selección múltiple de asignaturas */}
                <div className="sm:col-span-2">
                  <Label htmlFor="subjects">Asignaturas</Label>
                  <FieldWrap>
                    <SelectReact
                      inputId="subjects"
                      name="subjects"
                      options={subjects.map(s => ({ value: s.id, label: s.name }))}
                      isMulti
                      value={formik.values.subjects.map(s => ({ value: s.id, label: s.name }))}
                      onChange={(opts: any) =>
                        formik.setFieldValue(
                          'subjects',
                          opts.map((o: any) => ({ id: o.value, name: o.label })),
                        )
                      }
                    />
                  </FieldWrap>
                </div>
              </CardBody>
              <CardBody className="flex justify-end">
                <Button variant="solid" color="blue" onClick={() => formik.handleSubmit()} isLoading={formik.isSubmitting}>
                  {isEdit ? 'Actualizar' : 'Crear'}
                </Button>
              </CardBody>
            </Card>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  )
}

export default TeacherForm
