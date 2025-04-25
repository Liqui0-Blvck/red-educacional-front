import PageWrapper from '../../../components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft } from '../../../components/layouts/Subheader/Subheader';
import Badge from '../../../components/ui/Badge';
import Container from '../../../components/layouts/Container/Container';
import { IButtonProps } from '../../../components/ui/Button';

import React, { useState } from 'react';
import Label from '../../../components/form/Label';
import Input from '../../../components/form/Input';
import FieldWrap from '../../../components/form/FieldWrap';
import Icon from '../../../components/icon/Icon';
import Radio, { RadioGroup } from '../../../components/form/Radio';
import { useFormik } from 'formik';
import Card, { CardBody, CardFooter, CardFooterChild, CardHeader, CardTitle } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import useSaveBtn from '../../../hooks/useSaveBtn';
import Validation from '../../../components/form/Validation';
import { useCreateStudent } from '../../../api/students.api';
import { Student } from '../../../types/administrative/Student';

function StudentCreate() {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const createStudent = useCreateStudent();

  const formik = useFormik({
    initialValues: {
      first_name: '',
      father_last_name: '',
      mother_last_name: '',
      gender: 'male',
      date_of_birth: '',
      address: '',
      phone: '',
    },
    onSubmit: async (values) => {
      setIsSaving(true);
      try {
        const newStudent: Partial<Student> = {
          first_name: values.first_name,
          father_last_name: values.father_last_name,
          mother_last_name: values.mother_last_name,
          gender: values.gender as 'male' | 'female' | 'other',
          date_of_birth: values.date_of_birth,
          residence: {
            address: values.address,
            commune: 'Por definir',
          },
          contact_info: {
            phone: values.phone,
            email: '',
          },
          identification_number: '',
          verification_digit: '',
          nationality: '',
          country_of_birth: '',
          nationality_type: 'chilean',
          speaks_native_language: false,
          belongs_to_pie: false,
          has_nee: false,
          guardians: [],
          created_at: '',
          updated_at: '',
        };
        await createStudent.mutateAsync(newStudent);
        formik.resetForm();
      } finally {
        setTimeout(() => setIsSaving(false), 1200);
      }
    },
  });

  const { saveBtnText, saveBtnColor, saveBtnDisable } = useSaveBtn({
    isNewItem: true,
    isSaving,
    isDirty: formik.dirty,
  });

  return (
    <PageWrapper>
      <Subheader>
        <SubheaderLeft>
          Nuevo Estudiante{' '}
          <Badge color='emerald' variant='outline' rounded='rounded-full' className='border-transparent'>
            Crear
          </Badge>
        </SubheaderLeft>
      </Subheader>
      <Container breakpoint={null} className='w-full h-full'>
        <Card className='h-full'>
          <CardBody>
            <div className='col-span-12 flex flex-col gap-4 sm:col-span-8 md:col-span-10'>
              <Card>
                <CardHeader>
                  <CardTitle>Formulario Estudiantil</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-12 lg:col-span-6'>
                      <Label htmlFor='first_name'>Nombre</Label>
                      <Validation isValid={formik.isValid} isTouched={formik.touched.first_name} invalidFeedback={formik.errors.first_name}>
                        <FieldWrap>
                          <Input id='first_name' name='first_name' onChange={formik.handleChange} value={formik.values.first_name} />
                        </FieldWrap>
                      </Validation>
                    </div>
                    <div className='col-span-12 lg:col-span-6'>
                      <Label htmlFor='father_last_name'>Apellido Paterno</Label>
                      <Input id='father_last_name' name='father_last_name' onChange={formik.handleChange} value={formik.values.father_last_name} />
                    </div>
                    <div className='col-span-12 lg:col-span-6'>
                      <Label htmlFor='mother_last_name'>Apellido Materno</Label>
                      <Input id='mother_last_name' name='mother_last_name' onChange={formik.handleChange} value={formik.values.mother_last_name} />
                    </div>
                    <div className='col-span-12 lg:col-span-6'>
                      <Label htmlFor='gender'>Género</Label>
                      <RadioGroup isInline>
                        {['male', 'female', 'other'].map((g) => (
                          <Radio key={g} label={g} name='gender' value={g} selectedValue={formik.values.gender} onChange={(e) => formik.setFieldValue('gender', e.target.value)} />
                        ))}
                      </RadioGroup>
                    </div>
                    <div className='col-span-12 lg:col-span-6'>
                      <Label htmlFor='date_of_birth'>Fecha Nacimiento</Label>
                      <Input type='date' id='date_of_birth' name='date_of_birth' onChange={formik.handleChange} value={formik.values.date_of_birth} />
                    </div>
                    <div className='col-span-12 lg:col-span-6'>
                      <Label htmlFor='address'>Dirección</Label>
                      <Input id='address' name='address' onChange={formik.handleChange} value={formik.values.address} />
                    </div>
                    <div className='col-span-12 lg:col-span-6'>
                      <Label htmlFor='phone'>Teléfono</Label>
                      <Input id='phone' name='phone' onChange={formik.handleChange} value={formik.values.phone} />
                    </div>
                  </div>
                </CardBody>
                <CardFooter>
                  <CardFooterChild>
                    <Button icon='HeroServer' variant='solid' color={saveBtnColor} isDisable={saveBtnDisable} onClick={() => formik.handleSubmit()}>
                      {saveBtnText}
                    </Button>
                  </CardFooterChild>
                </CardFooter>
              </Card>
            </div>
          </CardBody>
        </Card>
      </Container>
    </PageWrapper>
  );
}

export default StudentCreate;
