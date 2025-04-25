import React, { FC } from 'react'
import Card, { CardBody, CardHeader } from '../../../../components/ui/Card'
import Avatar from '../../../../components/Avatar'
import Icon from '../../../../components/icon/Icon'
import { Guardian, Student } from '../../../../types/administrative/Student'

interface IDetailStudentProps {
  student: Student
}

const DetailStudent: FC<IDetailStudentProps> = ({ student }) => {
  return (
   <div className='w-full flex flex-col gap-4 overflow-y-auto'>
     <Card>
      <CardHeader className='border-b-2 border-zinc-100 dark:border-zinc-800 mb-2'>
        <h2 className='text-lg font-semibold'>Información de los Padres</h2>
      </CardHeader>
      <CardBody className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 py-4'>
          {
            student.guardians.map((guardian: Guardian) => {
              return (
                <Card className='w-full rounded-md border dark:border-zinc-700 border-zinc-200'>
                  <CardBody className='flex justify-between'>
                    <div className='w-3/12 items-center flex'>
                      <Avatar />
                      <div className='px-2 flex flex-col gap-2'>
                        <span>{`${guardian.first_name} ${guardian.last_name}`}</span>
                        <span className='font-medium'>{guardian.relationship} / Apoderado</span>
                      </div>
                    </div>

                    <div className='w-3/12 flex flex-col justify-center gap-2 p-2'>
                      <span>Télefono</span>
                      <p className='font-medium'>{guardian.phone ?? 'No hay datos'}</p>
                    </div>

                    <div className='w-3/12 flex flex-col justify-center gap-2 p-2'>
                      <span>Email</span>
                      <p className='font-medium'>{guardian.email ?? 'No hay datos'}</p>
                    </div>
                  </CardBody>
                </Card>
              )
            })
          }
        </div>
      </CardBody>
    </Card>

    <div className='w-full flex gap-5'>
      <Card className='w-1/2'>
        <CardHeader className='border-b-2 border-zinc-100 dark:border-zinc-800 mb-2'>
          <h2 className='text-lg font-semibold'>Dirección</h2>
        </CardHeader>
        <CardBody className='flex flex-col gap-4'>
          <div className='flex px-2'>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
                <Icon icon='HeroMapPin' size='text-xl' className='text-blue-500' />
                <span className='text-lg font-medium'>Dirección Actual</span>
              </div>
              <span className='font-light ml-6 dark:text-zinc-700 text-zinc-500'>{student.residence?.address}</span>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className='w-1/2'> 
        <CardHeader className='border-b-2 border-zinc-100 dark:border-zinc-800 mb-2'>
          <h2 className='text-lg font-semibold'>Historial Médico</h2>
        </CardHeader>

        <CardBody className='w-full flex gap-4'>
          <div className='flex flex-col gap-2 w-full'>
            <span className='text-lg font-medium'>Alergia Conocida</span>
            <p>{student.health_info?.allergies ?? '-'}</p>
          </div>
          <div className='flex flex-col gap-2 w-full items-center'>
            <span className='text-lg font-medium'>Medicamentos</span>
            <p>{student.health_info?.treatment_description ?? '-' }</p>
          </div>
        </CardBody>
      </Card>
    </div>


    <div>
      
    </div>

      
   </div>
  )
}

export default DetailStudent
