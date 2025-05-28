import React, { FC } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import Card, { CardHeader, CardBody } from '../../../../../components/ui/Card';
import Input from '../../../../../components/form/Input';
import Label from '../../../../../components/form/Label';
import FieldWrap from '../../../../../components/form/FieldWrap';
import Validation from '../../../../../components/form/Validation';
import Button from '../../../../../components/ui/Button';
import SelectReact from '../../../../../components/form/SelectReact';
import { EthnicityRecord, Student } from '../../../../../types/administrative/Student';
import { useUpdateEthnicityInfo } from '../../../services/students.api';


const boolean_options = [
  { value: true, label: 'Sí' },
  { value: false, label: 'No' },
];

export const EthnicityForm: FC<{ student: Student }> = ({ student }) => {
  const { mutate, isPending } = useUpdateEthnicityInfo()

  return (
    <Formik<EthnicityRecord>
    enableReinitialize
    initialValues={{
      belongs_to_indigenous_people: student.ethnicity_record?.belongs_to_indigenous_people ?? false,
      indigenous_group: student.ethnicity_record?.indigenous_group ?? '',
    }}
    onSubmit={(values, actions: FormikHelpers<EthnicityRecord>) => {
      console.log('Guardar Etnia:', values);
      actions.setSubmitting(false);

      mutate(
        { studentId: student.id, ethnicityInfo: values },
        { onSuccess: () => actions.setSubmitting(false) }
      )
    }}
  >
    {formik => (
      <Form onSubmit={formik.handleSubmit} className="space-y-4">
        <Card>
          <CardHeader>Etnia</CardHeader>
          <CardBody className="space-y-4">
            <div>
              <Label htmlFor="belongs_to_indigenous_people">¿Perteneciente a Pueblo Indígena?</Label>
              <Validation
                isTouched={!!formik.touched.belongs_to_indigenous_people}
                isValid={!formik.errors.belongs_to_indigenous_people}
                invalidFeedback={''}
              >
                <FieldWrap>
                  <SelectReact
                    inputId="belongs_to_indigenous_people"
                    name="belongs_to_indigenous_people"
                    //@ts-ignore
                    options={boolean_options}
                    //@ts-ignore
                    value={boolean_options.find(o => o.value === formik.values.belongs_to_indigenous_people)}
                    //@ts-ignore
                    onChange={opt => formik.setFieldValue('belongs_to_indigenous_people', opt?.value)}
                  />
                </FieldWrap>
              </Validation>
            </div>
            {formik.values.belongs_to_indigenous_people && (
              <div>
                <Label htmlFor="indigenous_group">Grupo Indígena</Label>
                <Validation
                  isTouched={!!formik.touched.indigenous_group}
                  isValid={!formik.errors.indigenous_group}
                  invalidFeedback={formik.errors.indigenous_group || ''}
                >
                  <FieldWrap>
                    <Input
                      id="indigenous_group"
                      name="indigenous_group"
                      value={formik.values.indigenous_group}
                      onChange={formik.handleChange}
                    />
                  </FieldWrap>
                </Validation>
              </div>
            )}
            <div className="flex justify-end mt-4">
              <Button 
                variant="solid" 
                color="blue"
                isLoading={isPending}
                onClick={() => {
                  formik.handleSubmit();
                }}
                >
                Guardar Etnia
              </Button>
            </div>
          </CardBody>
        </Card>
      </Form>
    )}
  </Formik>
  )
}
