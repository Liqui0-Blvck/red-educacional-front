// src/components/student/HealthInfoForm.tsx
import React, { FC } from 'react';
import { Formik, Form, FieldArray, FormikHelpers } from 'formik';
import Card, { CardHeader, CardBody } from '../../../../../components/ui/Card';
import Input from '../../../../../components/form/Input';
import Textarea from '../../../../../components/form/Textarea';
import Label from '../../../../../components/form/Label';
import FieldWrap from '../../../../../components/form/FieldWrap';
import Validation from '../../../../../components/form/Validation';
import Button from '../../../../../components/ui/Button';
import SelectReact from '../../../../../components/form/SelectReact';
import { Student, ChronicDisease, Allergy } from '../../../../../types/administrative/Student';
import { useUpdateHealthInfo } from '../../../services/students.api';

const booleanOptions = [
  { value: true, label: 'Sí' },
  { value: false, label: 'No' },
];

const severityOptions = [
  { value: 'mild', label: 'Leve' },
  { value: 'moderate', label: 'Moderada' },
  { value: 'severe', label: 'Severa' },
];

interface HealthFormValues {
  is_insured: boolean;
  insurance_type: string;
  chronic_diseases: ChronicDisease[];
  allergies: Allergy[];
  receives_treatment: boolean;
  treatment_description: string;
}

export const HealthInfoForm: FC<{ student: Student }> = ({ student }) => {
  const { mutate, isPending } = useUpdateHealthInfo();

  const initial: HealthFormValues = {
    is_insured: student.health_info?.is_insured ?? false,
    insurance_type: student.health_info?.insurance_type ?? '',
    chronic_diseases:
      student.health_info?.chronic_diseases.map(cd => ({
        id: cd.id,
        name: cd.name,
        diagnosis_date: cd.diagnosis_date ?? '',
        severity: cd.severity,
        treatment_plan: cd.treatment_plan ?? '',
        notes: cd.notes ?? '',
      })) ?? [
        { id: '', name: '', diagnosis_date: '', severity: 'moderate', treatment_plan: '', notes: '' },
      ],
    allergies:
      student.health_info?.allergies.map(a => ({
        id: a.id,
        name: a.name,
        diagnosis_date: a.diagnosis_date ?? '',
        severity: a.severity,
        reaction: a.reaction ?? '',
        notes: a.notes ?? '',
      })) ?? [
        { id: '', name: '', diagnosis_date: '', severity: 'mild', reaction: '', notes: '' },
      ],
    receives_treatment: student.health_info?.receives_treatment ?? false,
    treatment_description: student.health_info?.treatment_description ?? '',
  };

  return (
    <Formik<HealthFormValues>
      enableReinitialize
      initialValues={initial}
      onSubmit={(values, actions: FormikHelpers<HealthFormValues>) => {
        // Actualiza solo la sección health_info
        mutate(
          { studentId: student.id, healthInfo: values },
          { onSuccess: () => actions.setSubmitting(false) }
        );
      }}
    >
      {formik => (
        <Form>
          <Card>
            <CardHeader className="border-b-2 border-zinc-100 dark:border-zinc-800 mb-2">
              <h3>Registro de Salud</h3>
            </CardHeader>
            <CardBody className="space-y-6">
              {/* Está asegurado? */}
              <div className="w-full flex items-center space-x-2">
                <div className='w-full'>
                  <Label htmlFor="is_insured">¿Está asegurado?</Label>
                  <Validation
                    isTouched={!!formik.touched.is_insured}
                    isValid={!formik.errors.is_insured}
                    invalidFeedback={formik.errors.is_insured || ''}
                  >
                    <FieldWrap>
                      <SelectReact
                        inputId="is_insured"
                        name="is_insured"
                        options={booleanOptions}
                        value={booleanOptions.find(o => o.value === formik.values.is_insured)}
                        onChange={(opt: any) => formik.setFieldValue('is_insured', opt?.value)}
                      />
                    </FieldWrap>
                  </Validation>
                </div>

                {/* Tipo de seguro */}
                <div className='w-full'>
                  <Label htmlFor="insurance_type">Tipo de seguro</Label>
                  <Validation
                    isTouched={!!formik.touched.insurance_type}
                    isValid={!formik.errors.insurance_type}
                    invalidFeedback={formik.errors.insurance_type || ''}
                  >
                    <FieldWrap>
                      <Input
                        id="insurance_type"
                        name="insurance_type"
                        value={formik.values.insurance_type}
                        onChange={formik.handleChange}
                      />
                    </FieldWrap>
                  </Validation>
                </div>
              </div>

              {/* Enfermedades Crónicas */}
              <div>
                <Label htmlFor='chronic_disaeases'>Enfermedades Crónicas</Label>
                <FieldArray name="chronic_diseases">
                  {({ push, remove }) => (
                    <>
                      {formik.values.chronic_diseases.map((cd, idx) => (
                        <div key={idx} className="space-y-2 mb-4 border p-3 rounded relative">
                            <div className="flex justify-between">
                              <strong>Enfermedad #{idx + 1}</strong>
                              <Button
                                variant="outline"
                                color="red"
                                className='absolute top-2 right-2'
                                size="sm"
                                onClick={() => remove(idx)}
                              >
                                Eliminar
                              </Button>
                            </div>
                            {/* Nombre */}
                            <div className='flex gap-2'>
                              <div className='w-full'>
                                <Label htmlFor={`chronic_diseases.${idx}.name`}>Nombre</Label>
                                <Validation
                                  isTouched={!!(formik.touched.chronic_diseases as any)?.[idx]?.name}
                                  isValid={
                                    !(formik.errors.chronic_diseases as any)?.[idx]?.name
                                  }
                                  invalidFeedback={
                                    (formik.errors.chronic_diseases as any)?.[idx]?.name || ''
                                  }
                                >
                                  <FieldWrap>
                                    <Input
                                      id={`chronic_diseases.${idx}.name`}
                                      name={`chronic_diseases[${idx}].name`}
                                      value={cd.name}
                                      onChange={formik.handleChange}
                                    />
                                  </FieldWrap>
                                </Validation>
                              </div>
                              {/* Fecha Diagnóstico */}
                              <div className='w-full'>
                                <Label htmlFor={`chronic_diseases.${idx}.diagnosis_date`}>
                                  Fecha de diagnóstico
                                </Label>
                                <Validation
                                  isTouched={
                                    !!(formik.touched.chronic_diseases as any)?.[idx]
                                      ?.diagnosis_date
                                  }
                                  isValid={
                                    !(formik.errors.chronic_diseases as any)?.[idx]
                                      ?.diagnosis_date
                                  }
                                  invalidFeedback={
                                    (formik.errors.chronic_diseases as any)?.[idx]
                                      ?.diagnosis_date || ''
                                  }
                                >
                                  <FieldWrap>
                                    <Input
                                      id={`chronic_diseases.${idx}.diagnosis_date`}
                                      type="date"
                                      name={`chronic_diseases[${idx}].diagnosis_date`}
                                      value={cd.diagnosis_date}
                                      onChange={formik.handleChange}
                                    />
                                  </FieldWrap>
                                </Validation>
                              </div>
                              {/* Severidad */}
                              <div className='w-full'>
                                <Label htmlFor={`chronic_diseases.${idx}.severity`}>Severidad</Label>
                                <Validation
                                  isTouched={
                                    !!(formik.touched.chronic_diseases as any)?.[idx]
                                      ?.severity
                                  }
                                  isValid={
                                    !(formik.errors.chronic_diseases as any)?.[idx]
                                      ?.severity
                                  }
                                  invalidFeedback={
                                    (formik.errors.chronic_diseases as any)?.[idx]
                                      ?.severity || ''
                                  }
                                >
                                  <FieldWrap>
                                    <SelectReact
                                      inputId={`chronic_diseases.${idx}.severity`}
                                      name={`chronic_diseases[${idx}].severity`}
                                      options={severityOptions}
                                      value={severityOptions.find(
                                        o => o.value === cd.severity
                                      )}
                                      onChange={(opt: any) =>
                                        formik.setFieldValue(
                                          `chronic_diseases[${idx}].severity`,
                                          opt?.value
                                        )
                                      }
                                    />
                                  </FieldWrap>
                                </Validation>
                              </div>
                          </div>
                          {/* Plan de Tratamiento */}
                          <div>
                            <Label htmlFor={`chronic_diseases.${idx}.treatment_plan`}>
                              Plan de tratamiento
                            </Label>
                            <Validation
                              isTouched={
                                !!(formik.touched.chronic_diseases as any)?.[idx]
                                  ?.treatment_plan
                              }
                              isValid={
                                !(formik.errors.chronic_diseases as any)?.[idx]
                                  ?.treatment_plan
                              }
                              invalidFeedback={
                                (formik.errors.chronic_diseases as any)?.[idx]
                                  ?.treatment_plan || ''
                              }
                            >
                              <FieldWrap>
                                <Textarea
                                  id={`chronic_diseases.${idx}.treatment_plan`}
                                  name={`chronic_diseases[${idx}].treatment_plan`}
                                  rows={3}
                                  value={cd.treatment_plan}
                                  onChange={formik.handleChange}
                                />
                              </FieldWrap>
                            </Validation>
                          </div>
                          {/* Notas */}
                          <div>
                            <Label htmlFor={`chronic_diseases.${idx}.notes`}>Notas</Label>
                            <Validation
                              isTouched={
                                !!(formik.touched.chronic_diseases as any)?.[idx]?.notes
                              }
                              isValid={
                                !(formik.errors.chronic_diseases as any)?.[idx]?.notes
                              }
                              invalidFeedback={
                                (formik.errors.chronic_diseases as any)?.[idx]?.notes || ''
                              }
                            >
                              <FieldWrap>
                                <Textarea
                                  id={`chronic_diseases.${idx}.notes`}
                                  name={`chronic_diseases[${idx}].notes`}
                                  rows={2}
                                  value={cd.notes}
                                  onChange={formik.handleChange}
                                />
                              </FieldWrap>
                            </Validation>
                          </div>
                        </div>
                      ))}
                      <Button
                        icon="HeroPlusCircle"
                        onClick={() =>
                          push({
                            id: '',
                            name: '',
                            diagnosis_date: '',
                            severity: 'moderate',
                            treatment_plan: '',
                            notes: '',
                          })
                        }
                      >
                        Agregar Enfermedad
                      </Button>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* Alergias */}
              <div>
                <Label htmlFor=''>Alergias</Label>
                <FieldArray name="allergies">
                  {({ push, remove }) => (
                    <>
                      {formik.values.allergies.map((al, idx) => (
                        <div key={idx} className="space-y-2 mb-4 border p-3 rounded">
                         
                          <div className="flex justify-between relative">
                            <strong>Alergia #{idx + 1}</strong>
                            <Button
                              variant="outline"
                              color="red"
                              size="sm"
                              className='absolute top-2 right-2'
                              onClick={() => remove(idx)}
                            >
                              Eliminar
                            </Button>
                          </div>
                          <div className='flex gap-2'> 
                            {/* Nombre */}
                            <div className='w-full'>
                              <Label htmlFor={`allergies.${idx}.name`}>Nombre</Label>
                              <Validation
                                isTouched={!!(formik.touched.allergies as any)?.[idx]?.name}
                                isValid={!(formik.errors.allergies as any)?.[idx]?.name}
                                invalidFeedback={(formik.errors.allergies as any)?.[idx]?.name || ''}
                              >
                                <FieldWrap>
                                  <Input
                                    id={`allergies.${idx}.name`}
                                    name={`allergies[${idx}].name`}
                                    value={al.name}
                                    onChange={formik.handleChange}
                                  />
                                </FieldWrap>
                              </Validation>
                            </div>
                         
                            {/* Fecha Diagnóstico */}
                            <div className='w-full'>
                              <Label htmlFor={`allergies.${idx}.diagnosis_date`}>Fecha diagnóstico</Label>
                              <Validation
                                isTouched={
                                  !!(formik.touched.allergies as any)?.[idx]?.diagnosis_date
                                }
                                isValid={
                                  !(formik.errors.allergies as any)?.[idx]?.diagnosis_date
                                }
                                invalidFeedback={
                                  (formik.errors.allergies as any)?.[idx]?.diagnosis_date || ''
                                }
                              >
                                <FieldWrap>
                                  <Input
                                    id={`allergies.${idx}.diagnosis_date`}
                                    type="date"
                                    name={`allergies[${idx}].diagnosis_date`}
                                    value={al.diagnosis_date}
                                    onChange={formik.handleChange}
                                  />
                                </FieldWrap>
                              </Validation>
                            </div>
                            {/* Severidad */}
                            <div className='w-full'>
                              <Label htmlFor={`allergies.${idx}.severity`}>Severidad</Label>
                              <Validation
                                isTouched={!!(formik.touched.allergies as any)?.[idx]?.severity}
                                isValid={!(formik.errors.allergies as any)?.[idx]?.severity}
                                invalidFeedback={(formik.errors.allergies as any)?.[idx]?.severity || ''}
                              >
                                <FieldWrap>
                                  <SelectReact
                                    inputId={`allergies.${idx}.severity`}
                                    name={`allergies[${idx}].severity`}
                                    options={severityOptions}
                                    value={severityOptions.find(o => o.value === al.severity)}
                                    onChange={(opt: any) =>
                                      formik.setFieldValue(
                                        `allergies[${idx}].severity`,
                                        opt?.value
                                      )
                                    }
                                  />
                                </FieldWrap>
                              </Validation>
                            </div>
                          </div>
                          {/* Reacción */}
                          <div>
                            <Label htmlFor={`allergies.${idx}.reaction`}>Reacción</Label>
                            <Validation
                              isTouched={!!(formik.touched.allergies as any)?.[idx]?.reaction}
                              isValid={!(formik.errors.allergies as any)?.[idx]?.reaction}
                              invalidFeedback={(formik.errors.allergies as any)?.[idx]?.reaction || ''}
                            >
                              <FieldWrap>
                                <Textarea
                                  id={`allergies.${idx}.reaction`}
                                  name={`allergies[${idx}].reaction`}
                                  rows={2}
                                  value={al.reaction}
                                  onChange={formik.handleChange}
                                />
                              </FieldWrap>
                            </Validation>
                          </div>
                          {/* Notas */}
                          <div>
                            <Label htmlFor={`allergies.${idx}.notes`}>Notas</Label>
                            <Validation
                              isTouched={!!(formik.touched.allergies as any)?.[idx]?.notes}
                              isValid={!(formik.errors.allergies as any)?.[idx]?.notes}
                              invalidFeedback={(formik.errors.allergies as any)?.[idx]?.notes || ''}
                            >
                              <FieldWrap>
                                <Textarea
                                  id={`allergies.${idx}.notes`}
                                  name={`allergies[${idx}].notes`}
                                  rows={2}
                                  value={al.notes}
                                  onChange={formik.handleChange}
                                />
                              </FieldWrap>
                            </Validation>
                          </div>
                        </div>
                      ))}
                      <Button
                        icon="HeroPlusCircle"
                        onClick={() =>
                          push({
                            id: '',
                            name: '',
                            diagnosis_date: '',
                            severity: 'mild',
                            reaction: '',
                            notes: '',
                          })
                        }
                      >
                        Agregar Alergia
                      </Button>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* Recibe Tratamiento */}
              <div>
                <Label htmlFor="receives_treatment">¿Recibe tratamiento?</Label>
                <Validation
                  isTouched={!!formik.touched.receives_treatment}
                  isValid={!formik.errors.receives_treatment}
                  invalidFeedback={formik.errors.receives_treatment || ''}
                >
                  <FieldWrap>
                    <SelectReact
                      inputId="receives_treatment"
                      name="receives_treatment"
                      options={booleanOptions}
                      value={booleanOptions.find(o => o.value === formik.values.receives_treatment)}
                      onChange={(opt: any) => formik.setFieldValue('receives_treatment', opt?.value)}
                    />
                  </FieldWrap>
                </Validation>
              </div>

              {/* Descripción del Tratamiento */}
              {formik.values.receives_treatment && (
                <div>
                  <Label htmlFor="treatment_description">Descripción del Tratamiento</Label>
                  <Validation
                    isTouched={!!formik.touched.treatment_description}
                    isValid={!formik.errors.treatment_description}
                    invalidFeedback={formik.errors.treatment_description || ''}
                  >
                    <FieldWrap>
                      <Textarea
                        id="treatment_description"
                        name="treatment_description"
                        rows={3}
                        value={formik.values.treatment_description}
                        onChange={formik.handleChange}
                      />
                    </FieldWrap>
                  </Validation>
                </div>
              )}

              {/* Botón Guardar */}
              <div className="flex justify-end mt-4">
                <Button variant="solid" color="blue" isLoading={isPending}
                 onClick={() => formik.handleSubmit()}>
                  Guardar Información de Salud
                </Button>
              </div>
            </CardBody>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default HealthInfoForm;
