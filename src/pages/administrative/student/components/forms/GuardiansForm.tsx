import React, { FC } from 'react';
import { Formik, Form, FormikHelpers, useFormik, FieldArray } from 'formik';
import Card, { CardHeader, CardBody } from '../../../../../components/ui/Card';
import Input from '../../../../../components/form/Input';
import Label from '../../../../../components/form/Label';
import FieldWrap from '../../../../../components/form/FieldWrap';
import Validation from '../../../../../components/form/Validation';
import Button from '../../../../../components/ui/Button';
import SelectReact from '../../../../../components/form/SelectReact';
import { Guardian } from '../../../../../types/administrative/Student';
import Avatar from '../../../../../components/Avatar';

export interface GuardiansFormValues {
  guardians: Array<Guardian & { photo: File | null }>
}

const GuardiansForm: FC<{ guardians: Guardian[] }> = ({ guardians }) => (
  <Formik<GuardiansFormValues>
    enableReinitialize
    initialValues={{ guardians: guardians.map(g => ({ ...g, photo: null })) }}
    onSubmit={(values, actions: FormikHelpers<GuardiansFormValues>) => {
      console.log('Guardar Apoderados:', values.guardians)
      actions.setSubmitting(false)
    }}
  >
    {formik => (
      <Form onSubmit={formik.handleSubmit} className="space-y-4">
        <Card>
          <CardHeader className='border-b-2 border-zinc-100 dark:border-zinc-800 mb-2'>
            <h3>Apoderados / Padres </h3>
          </CardHeader>
          <CardBody>
            <FieldArray name="guardians">
              {({ push, remove }) => (
                <>
                  {formik.values.guardians.map((g, i) => (
                    <div key={i} className="border rounded p-4 mb-4 relative">
                      <div className="flex items-center gap-4 mb-2">
                        <Avatar 
                          //@ts-ignore
                          src={g.photo ? URL.createObjectURL(g.photo) : g.photoUrl || ''} />
                        <FieldWrap>
                          <Input
                            id={`guardians.${i}.photo`}
                            name={`guardians[${i}].photo`}
                            type="file"
                            accept="image/*"
                            onChange={e => {
                              if (e.target.files?.[0]) {
                                formik.setFieldValue(`guardians[${i}].photo`, e.target.files[0])
                              }
                            }}
                          />
                        </FieldWrap>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <Label htmlFor={`guardians.${i}.first_name`}>Primer Nombre</Label>
                          <Validation
                            isTouched={!!(formik.touched.guardians as any)?.[i]?.first_name}
                            isValid={!((formik.errors.guardians as any)?.[i]?.first_name)}
                            invalidFeedback={((formik.errors.guardians as any)?.[i]?.first_name) as string}
                          >
                            <FieldWrap>
                              <Input
                                disabled
                                id={`guardians.${i}.first_name`}
                                name={`guardians[${i}].first_name`}
                                value={g.first_name}
                                onChange={formik.handleChange}
                              />
                            </FieldWrap>
                          </Validation>
                        </div>
                        <div>
                          <Label htmlFor={`guardians.${i}.second_name`}>Segundo Nombre</Label>
                          <Validation
                            isTouched={!!(formik.touched.guardians as any)?.[i]?.second_name}
                            isValid={!((formik.errors.guardians as any)?.[i]?.second_name)}
                            invalidFeedback={((formik.errors.guardians as any)?.[i]?.second_name) as string}
                          >
                            <FieldWrap>
                              <Input
                                disabled
                                id={`guardians.${i}.second_name`}
                                name={`guardians[${i}].second_name`}
                                value={g.second_name}
                                onChange={formik.handleChange}
                              />
                            </FieldWrap>
                          </Validation>
                        </div>

                        <div>
                          <Label htmlFor={`guardians.${i}.father_last_name`}>Apellido Paterno</Label>
                          <Validation
                            isTouched={!!(formik.touched.guardians as any)?.[i]?.father_last_name}
                            isValid={!((formik.errors.guardians as any)?.[i]?.father_last_name)}
                            invalidFeedback={((formik.errors.guardians as any)?.[i]?.father_last_name) as string}
                          >
                            <FieldWrap>
                              <Input
                                disabled
                                id={`guardians.${i}.father_last_name`}
                                name={`guardians[${i}].father_last_name`}
                                value={g.father_last_name}
                                onChange={formik.handleChange}
                              />
                            </FieldWrap>
                          </Validation>
                        </div>

                        <div>
                          <Label htmlFor={`guardians.${i}.mother_last_name`}>Apellido Materno</Label>
                          <Validation
                            isTouched={!!(formik.touched.guardians as any)?.[i]?.mother_last_name}
                            isValid={!((formik.errors.guardians as any)?.[i]?.mother_last_name)}
                            invalidFeedback={((formik.errors.guardians as any)?.[i]?.mother_last_name) as string}
                          >
                            <FieldWrap>
                              <Input
                                disabled
                                id={`guardians.${i}.mother_last_name`}
                                name={`guardians[${i}].mother_last_name`}
                                value={g.mother_last_name}
                                onChange={formik.handleChange}
                              />
                            </FieldWrap>
                          </Validation>
                        </div>

                        <div>
                          <Label htmlFor={`guardians.${i}.phone`}>Télefono</Label>
                          <Validation
                            isTouched={!!(formik.touched.guardians as any)?.[i]?.phone}
                            isValid={!((formik.errors.guardians as any)?.[i]?.phone)}
                            invalidFeedback={((formik.errors.guardians as any)?.[i]?.phone) as string}
                          >
                            <FieldWrap>
                              <Input
                                id={`guardians.${i}.phone`}
                                name={`guardians[${i}].phone`}
                                value={g.phone}
                                onChange={formik.handleChange}
                              />
                            </FieldWrap>
                          </Validation>
                        </div>

                        <div>
                          <Label htmlFor={`guardians.${i}.email`}>Email</Label>
                          <Validation
                            isTouched={!!(formik.touched.guardians as any)?.[i]?.email}
                            isValid={!((formik.errors.guardians as any)?.[i]?.email)}
                            invalidFeedback={((formik.errors.guardians as any)?.[i]?.email) as string}
                          >
                            <FieldWrap>
                              <Input
                                id={`guardians.${i}.email`}
                                name={`guardians[${i}].email`}
                                value={g.email}
                                onChange={formik.handleChange}
                              />
                            </FieldWrap>
                          </Validation>
                        </div>
                        {/* ... más campos ... */}
                      </div>
                      
                      {/* <Button
                        className="absolute top-2 right-2"
                        variant="outline" 
                        color="red" 
                        size="lg" 
                        icon="HeroTrash"
                        onClick={() => remove(i)} /> */}
                      
                    </div>
                  ))}
                  <Button
                    icon="HeroPlusCircle" onClick={() => push({
                    id: '', identification_number: '', first_name: '', second_name: '', father_last_name: '', mother_last_name: '', relationship_to_student: '', phone: '', email: '', address: '', occupation: '', photo: null
                  })}>
                    Agregar Apoderado
                  </Button>
                </>
              )}
            </FieldArray>
            <div className="flex justify-end mt-4">
              <Button variant="solid" color="blue">Guardar Apoderados</Button>
            </div>
          </CardBody>
        </Card>
      </Form>
    )}
  </Formik>
)

export default GuardiansForm