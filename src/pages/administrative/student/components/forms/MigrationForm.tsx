import React, { FC } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import Card, { CardHeader, CardBody } from '../../../../../components/ui/Card';
import Input from '../../../../../components/form/Input';
import Label from '../../../../../components/form/Label';
import FieldWrap from '../../../../../components/form/FieldWrap';
import Validation from '../../../../../components/form/Validation';
import Button from '../../../../../components/ui/Button';
import SelectReact from '../../../../../components/form/SelectReact';
import { MigrationRecord, Student } from '../../../../../types/administrative/Student';
import { useUpdateMigrationInfo } from '../../../services/students.api';

const boolean_options = [
  { value: true, label: 'Sí' },
  { value: false, label: 'No' },
];

export const MigrationForm: FC<{ student: Student }> = ({ student }) => {
  const { mutate, isPending } = useUpdateMigrationInfo();

  return (
    <Formik<MigrationRecord>
      enableReinitialize
      initialValues={{
        is_foreign: student.migration_status?.is_foreign ?? false,
        entry_date_to_country: student.migration_status?.entry_date_to_country ?? '',
        previous_country_of_residence: student.migration_status?.previous_country_of_residence ?? '',
      }}
      onSubmit={(values, actions: FormikHelpers<MigrationRecord>) => {
        mutate(
          { studentId: student.id, migrationInfo: values },
          { onSuccess: () => actions.setSubmitting(false) }
        );
      }}
    >
      {formik => (
        <Form className="space-y-4">
          <Card>
            <CardHeader>Situación Migratoria</CardHeader>
            <CardBody className="space-y-4">
              <div>
                <Label htmlFor="is_foreign">¿Es extranjero?</Label>
                <Validation
                  isTouched={!!formik.touched.is_foreign}
                  isValid={!formik.errors.is_foreign}
                  invalidFeedback={formik.errors.is_foreign || ''}
                >
                  <FieldWrap>
                    <SelectReact
                      inputId="is_foreign"
                      name="is_foreign"
                      options={boolean_options}
                      value={boolean_options.find(o => o.value === formik.values.is_foreign)}
                      onChange={(opt: any) => formik.setFieldValue('is_foreign', opt?.value)}
                    />
                  </FieldWrap>
                </Validation>
              </div>

              {formik.values.is_foreign && (
                <>
                  <div>
                    <Label htmlFor="entry_date_to_country">Fecha de ingreso al país</Label>
                    <Validation
                      isTouched={!!formik.touched.entry_date_to_country}
                      isValid={!formik.errors.entry_date_to_country}
                      invalidFeedback={formik.errors.entry_date_to_country || ''}
                    >
                      <FieldWrap>
                        <Input
                          id="entry_date_to_country"
                          type="date"
                          name="entry_date_to_country"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.entry_date_to_country}
                        />
                      </FieldWrap>
                    </Validation>
                  </div>

                  <div>
                    <Label htmlFor="previous_country_of_residence">País anterior de residencia</Label>
                    <Validation
                      isTouched={!!formik.touched.previous_country_of_residence}
                      isValid={!formik.errors.previous_country_of_residence}
                      invalidFeedback={formik.errors.previous_country_of_residence || ''}
                    >
                      <FieldWrap>
                        <Input
                          id="previous_country_of_residence"
                          type="text"
                          name="previous_country_of_residence"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.previous_country_of_residence}
                        />
                      </FieldWrap>
                    </Validation>
                  </div>
                </>
              )}

              {/* Aquí el botón con type="submit" */}
              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => formik.handleSubmit()}
                  variant="solid"
                  color="blue"
                  isLoading={isPending}
                >
                  Guardar Migración
                </Button>
              </div>
            </CardBody>
          </Card>
        </Form>
      )}
    </Formik>
  );
};
