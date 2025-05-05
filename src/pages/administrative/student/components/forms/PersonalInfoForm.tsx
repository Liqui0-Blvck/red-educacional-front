import React, { FC } from 'react';
import { Formik, Form, FormikHelpers, useFormik } from 'formik';
import Card, { CardHeader, CardBody } from '../../../../../components/ui/Card';
import Input from '../../../../../components/form/Input';
import Label from '../../../../../components/form/Label';
import FieldWrap from '../../../../../components/form/FieldWrap';
import Validation from '../../../../../components/form/Validation';
import Button from '../../../../../components/ui/Button';
import SelectReact from '../../../../../components/form/SelectReact';
import { Student } from '../../../../../types/administrative/Student';
import Textarea from '../../../../../components/form/Textarea';
import { useUpdateStudent } from '../../../../../api/students.api';

const gender_options = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Femenino' },
  { value: 'other', label: 'Otro' },
]

const religion_options = [
  { value: 'catholic', label: 'Cátolica'},
  { value: 'evangelical', label: 'Evangelica'},
  { value: 'other', label: 'Otro'},
  { value: 'none', label: 'Ninguno'}
]

const nee_type_options = [
  { value: 'permanent', label: 'Permanente'},
  { value: 'transitory', label: 'Transitorio'}
]

const boolean_options = [
  { value: true, label: 'Sí'},
  { value: false, label: 'No'}
]

const PersonalInfoForm: FC<{ student: Student }> = ({ student }) => {
  const { mutate, isPending } = useUpdateStudent();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: student.first_name,
      last_name: student.last_name,
      father_last_name: student.father_last_name,
      mother_last_name: student.mother_last_name,
      date_of_birth: student.date_of_birth,
      gender: student.gender,
      nationality: student.nationality,
      country_of_birth: student.country_of_birth,
      religion: student.religion,
      speak_native_lenguage: student.speaks_native_language,
      belongs_to_pie: student.belongs_to_pie,
      pie_entry_date: student.pie_entry_date,
      has_nee: student.has_nee,
      nee_type: student.nee_type,
      nee_description: student.nee_description,
      status: student.status,
      phone: student.contact_info?.phone,
      email: student.contact_info?.email,
    },
    onSubmit: values => {
      const contact_info = {
        phone: values.phone,
        email: values.email,
      }
      mutate({ ...student, ...values, contact_info });
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <Card>
        <CardHeader className='border-b-2 border-zinc-100 dark:border-zinc-800 mb-2'>
            <h3>Información Personal</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="first_name">Primer Nombre</Label>
              <Validation isTouched={!!formik.touched.first_name} isValid={formik.isValid} invalidFeedback={formik.errors.first_name as string}>
                <FieldWrap>
                  <Input id="first_name" name="first_name" value={formik.values.first_name} onChange={formik.handleChange} />
                </FieldWrap>
              </Validation>
            </div>
            <div>
              <Label htmlFor="last_name">Segundo Nombre</Label>
              <Validation isTouched={!!formik.touched.last_name} isValid={formik.isValid} invalidFeedback={formik.errors.last_name as string}>
                <FieldWrap>
                  <Input id="last_name" name="last_name" value={formik.values.last_name} onChange={formik.handleChange} />
                </FieldWrap>
              </Validation>
            </div>
            <div>
              <Label htmlFor="father_last_name">Apellido Paterno</Label>
              <Validation isTouched={!!formik.touched.father_last_name} isValid={formik.isValid} invalidFeedback={formik.errors.father_last_name as string}>
                <FieldWrap>
                  <Input id="father_last_name" name="father_last_name" value={formik.values.father_last_name} onChange={formik.handleChange} />
                </FieldWrap>
              </Validation>
            </div>
            <div>
              <Label htmlFor="mother_last_name">Apellido Materno</Label>
              <Validation isTouched={!!formik.touched.mother_last_name} isValid={formik.isValid} invalidFeedback={formik.errors.mother_last_name as string}>
                <FieldWrap>
                  <Input id="mother_last_name" name="mother_last_name" value={formik.values.mother_last_name} onChange={formik.handleChange} />
                </FieldWrap>
              </Validation>
            </div>

            <div>
              <Label htmlFor="phone">Télefono</Label>
              <Validation isTouched={!!formik.touched.phone} isValid={formik.isValid} invalidFeedback={formik.errors.phone as string}>
                <FieldWrap>
                  <Input id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} />
                </FieldWrap>
              </Validation>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Validation isTouched={!!formik.touched.email} isValid={formik.isValid} invalidFeedback={formik.errors.email as string}>
                <FieldWrap>
                  <Input id="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
                </FieldWrap>
              </Validation>
            </div>

            <div>
              <Label htmlFor="date_of_birth">Fecha de Nacimiento</Label>
              <Validation isTouched={!!formik.touched.date_of_birth} isValid={formik.isValid} invalidFeedback={formik.errors.date_of_birth as string}>
                <FieldWrap>
                  <Input id="date_of_birth" type="date" name="date_of_birth" value={formik.values.date_of_birth} onChange={formik.handleChange} />
                </FieldWrap>
              </Validation>
            </div>
            <div>
              <Label htmlFor="nationality">Nacionalidad</Label>
              <Validation isTouched={!!formik.touched.nationality} isValid={formik.isValid} invalidFeedback={formik.errors.nationality as string}>
                <FieldWrap>
                  <Input disabled id="nationality" name="nationality" value={formik.values.nationality} onChange={formik.handleChange} />
                </FieldWrap>
              </Validation>
            </div>

            <div>
              <Label htmlFor="country_of_birth">País de Nacimiento</Label>
              <Validation isTouched={!!formik.touched.country_of_birth} isValid={formik.isValid} invalidFeedback={formik.errors.country_of_birth as string}>
                <FieldWrap>
                  <Input disabled id="country_of_birth" name="country_of_birth" value={formik.values.country_of_birth} onChange={formik.handleChange} />
                </FieldWrap>
              </Validation>
            </div>

            <div>
              <Label htmlFor="religion">Religión</Label>
              <Validation isTouched={!!formik.touched.religion} isValid={formik.isValid} invalidFeedback={formik.errors.religion as string}>
                <FieldWrap>
                  <SelectReact
                    inputId="religion"
                    name="religion"
                    placeholder='Religion'
                    options={religion_options}
                    value={religion_options.find(o => o.value === formik.values.religion)}
                    onChange={(opt: any) => formik.setFieldValue('religion', opt?.value)}
                  />
                </FieldWrap>
              </Validation>
            </div>

            <div>
              <Label htmlFor="speak_native_lenguage">Lenguaje Nativo</Label>
              <Validation isTouched={!!formik.touched.speak_native_lenguage} isValid={formik.isValid} invalidFeedback={formik.errors.speak_native_lenguage as string}>
                <FieldWrap>
                  <SelectReact
                    inputId="speak_native_lenguage"
                    name="speak_native_lenguage"
                    placeholder='Lenguaje Nativo'
                    options={boolean_options}
                    value={boolean_options.find(o => o.value === formik.values.speak_native_lenguage)}
                    onChange={(opt: any) => formik.setFieldValue('speak_native_lenguage', opt?.value)}
                  />
                </FieldWrap>
              </Validation>
            </div>

            <div>
              <Label htmlFor="belongs_to_pie">Pertenece a PIE {`(Programa de Integración Escolar)`}</Label>
              <Validation isTouched={!!formik.touched.belongs_to_pie} isValid={formik.isValid} invalidFeedback={formik.errors.belongs_to_pie as string}>
                <FieldWrap>
                  <SelectReact
                    inputId="belongs_to_pie"
                    name="belongs_to_pie"
                    placeholder='Pertenece a PIE'
                    options={boolean_options}
                    value={boolean_options.find(o => o.value === formik.values.belongs_to_pie)}
                    onChange={(opt: any) => formik.setFieldValue('belongs_to_pie', opt?.value)}
                  />
                </FieldWrap>
              </Validation>
            </div>

            {
              formik.values.has_nee && (
                <div>
                <Label htmlFor="pie_entry_date">Fecha Ingreso a PIE</Label>
                <Validation isTouched={!!formik.touched.pie_entry_date} isValid={formik.isValid} invalidFeedback={formik.errors.pie_entry_date as string}>
                  <FieldWrap>
                    <Input id="pie_entry_date" type="date" name="pie_entry_date" value={formik.values.pie_entry_date} onChange={formik.handleChange} />
                  </FieldWrap>
                </Validation>
              </div>
              )
            }

            <div>
              <Label htmlFor="has_nee">Tiene Nee {'(Necesidad Educativa Especial)'}</Label>
              <Validation isTouched={!!formik.touched.has_nee} isValid={formik.isValid} invalidFeedback={formik.errors.has_nee as string}>
                <FieldWrap>
                  <SelectReact
                    inputId="has_nee"
                    name="has_nee"
                    placeholder='Tiene NEE'
                    options={boolean_options}
                    value={boolean_options.find(o => o.value === formik.values.has_nee)}
                    onChange={(opt: any) => formik.setFieldValue('has_nee', opt?.value)}
                  />
                </FieldWrap>
              </Validation>
            </div>
            
            

            {
              formik.values.has_nee && (
                <>
                

                <div>
                  <Label htmlFor="nee_type">Tipo de NEE</Label>
                  <Validation isTouched={!!formik.touched.nee_type} isValid={formik.isValid} invalidFeedback={formik.errors.nee_type as string}>
                    <FieldWrap>
                      <SelectReact
                        inputId="nee_type"
                        name="nee_type"
                        placeholder='Tipo de NEE'
                        isDisabled={!formik.values.has_nee}
                        isClearable
                        isSearchable
                        className='w-full'
                        classNamePrefix='react-select'
                        options={nee_type_options}
                        value={nee_type_options.find(o => o.value === formik.values.nee_type)}
                        onChange={(opt: any) => formik.setFieldValue('nee_type', opt?.value)}
                      />
                    </FieldWrap>
                  </Validation>
                </div>

                <div>
                  <Label htmlFor="nee_description">Descripción Nee</Label>
                  <Validation isTouched={!!formik.touched.nee_description} isValid={formik.isValid} invalidFeedback={formik.errors.nee_description as string}>
                    <FieldWrap>
                      <Textarea 
                        name='nee_description'
                        id='nee_description'
                        placeholder='Descripción de la Necesidad Educativa Especial'
                        value={formik.values.nee_description}
                        onChange={formik.handleChange}
                        rows={4}
                        className='resize-none'
                      />
                    </FieldWrap>
                  </Validation>
                </div>
                
              </>
              )
            }
          </div>
         

          
          <div className="flex justify-end mt-4">
            <Button variant="solid" isLoading={isPending} onClick={() => {
              formik.handleSubmit();
            }} color="blue">Guardar Personal</Button>
          </div>
        </CardBody>
      </Card>
    </form>
  )
}

export default PersonalInfoForm;