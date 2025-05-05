import React, { FC } from 'react';
import { useFormik } from 'formik';
import Card, { CardHeader, CardBody } from '../../../../../components/ui/Card';
import Input from '../../../../../components/form/Input';
import Label from '../../../../../components/form/Label';
import FieldWrap from '../../../../../components/form/FieldWrap';
import Validation from '../../../../../components/form/Validation';
import Button from '../../../../../components/ui/Button';
import { Student } from '../../../../../types/administrative/Student';


const ResidenceForm: FC<{ student: Student }> = ({ student }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address: student.residence?.address || '',
      commune: student.residence?.commune || '',
    },
    onSubmit: values => {
      console.log('Guardar Residencia:', values)
    }
  })
  return (
    <>
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <Card>
        <CardHeader className='border-b-2 border-zinc-100 dark:border-zinc-800 mb-2'>
          <h3>Residencia</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="address">Dirección</Label>
              <Validation isTouched={!!formik.touched.address} isValid={formik.isValid} invalidFeedback={formik.errors.address as string}>
                <FieldWrap>
                  <Input id="address" name="address" value={formik.values.address} onChange={formik.handleChange} />
                </FieldWrap>
              </Validation>
            </div>
            <div>
              <Label htmlFor="commune">Comuna</Label>
              <Validation isTouched={!!formik.touched.commune} isValid={formik.isValid} invalidFeedback={formik.errors.commune as string}>
                <FieldWrap>
                  <Input id="commune" name="commune" value={formik.values.commune} onChange={formik.handleChange} />
                </FieldWrap>
              </Validation>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button  variant="solid" color="blue">Guardar Residencia</Button>
          </div> 

        </CardBody>
      </Card>
    </form>
    </>
    
  )
}

export default ResidenceForm