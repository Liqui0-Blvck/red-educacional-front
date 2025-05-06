// src/components/administration/EnrollmentDetail.tsx
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PageWrapper from '../../../components/layouts/PageWrapper/PageWrapper'
import Subheader, { SubheaderLeft, SubheaderRight } from '../../../components/layouts/Subheader/Subheader'
import Card, { CardHeader, CardBody } from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Badge from '../../../components/ui/Badge'
import Avatar from '../../../components/Avatar'
import Label from '../../../components/form/Label'
import { useEnrollment } from '../services/enrollments.api'
import { format } from '@formkit/tempo'
import { Guardian } from '../../../types/administrative/Student'
import { useStudent } from '../services/students.api'
import { capitalizeFirstLetter } from '../../../utils/getCapitalize'
import Container from '../../../components/layouts/Container/Container'

const EnrollmentDetail: React.FC = () => {
  const { enrollmentId: id } = useParams<{ enrollmentId: string }>()
  const navigate = useNavigate()
  const { data: enrollment, isLoading, isError, error } = useEnrollment(id!)
  const { data: student } = useStudent(enrollment?.student!)

  if (isLoading) return <p>Cargando detalle...</p>
  if (isError)   return <p>Error al cargar detalle: {(error as Error).message}</p>
  if (!enrollment) return <p>No se encontró la matrícula.</p>

  return (
    <PageWrapper name="Detalle de Matrícula">
      <Subheader>
        <SubheaderLeft>
          <Button
            variant="outline"
            color="zinc"
            size="sm"
            icon="HeroArrowLeft"
            onClick={() => navigate(-1)}
          >
            Volver
          </Button>
        </SubheaderLeft>
        <SubheaderRight>
          <Button
            variant="solid"
            color="blue"
            size="sm"
            icon="HeroPencilSquare"
            onClick={() => navigate(`/administration/enrollments/${id}/edit`)}
          >
            Editar
          </Button>
        </SubheaderRight>
      </Subheader>

      <Container breakpoint={null} className="w-full overflow-x-auto">
        <Card>
          <CardHeader className="flex justify-between items-baseline">
            <h3 className="text-lg font-semibold">Matrícula #{enrollment.enrollment_number}</h3>
            <span className="text-sm text-gray-500">
              Creada el {format(enrollment.createdAt, { date: 'short' }, 'es')}
            </span>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor='student'>Estudiante</Label>
                <p className="mt-1">
                  {`${capitalizeFirstLetter(student?.first_name)}
                    ${capitalizeFirstLetter(student?.last_name)}
                    ${capitalizeFirstLetter(student?.father_last_name)}
                    ${capitalizeFirstLetter(student?.mother_last_name)}`
                    
                    }</p>
              </div>
              <div>
                <Label htmlFor='academic_year'>Año Académico</Label>
                <p className="mt-1">{enrollment.academic_year}</p>
              </div>
              <div>
                <Label htmlFor='course'>Curso</Label>
                <p className="mt-1">{enrollment.course}</p>
              </div>
              <div>
                <Label htmlFor='school'>Establecimiento</Label>
                <p className="mt-1">{enrollment.school}</p>
              </div>
              <div>
                <Label htmlFor='entry_date'>Fecha de Ingreso</Label>
                <p className="mt-1">{format(enrollment.entry_date, { date: 'full' }, 'es')}</p>
              </div>
              <div>
                <Label htmlFor='admission_type'>Tipo de Ingreso</Label>
                <p className="mt-1">{enrollment.admission_type.replace('_', ' ')}</p>
              </div>
              <div>
                <Label htmlFor='status'>Estado</Label>
                <Badge
                  variant="solid"
                  color={enrollment.isCurrent ? 'emerald' : 'zinc'}
                  className="mt-1"
                >
                  {enrollment.status}
                </Badge>
              </div>
              <div>
                <Label htmlFor='enrollment_current'>Matrícula Activa</Label>
                <p className="mt-1">{enrollment.isCurrent ? 'Sí' : 'No'}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Apoderados */}
        <Card className='mt-10'>
          <CardHeader className="border-b-2 border-zinc-100 dark:border-zinc-800 mb-2">
            <h2 className="text-lg font-semibold">Información de los Padres</h2>
          </CardHeader>
          <CardBody className="flex flex-col gap-4 py-4">
            {student?.guardians.length! > 0 && student?.guardians.map((g: Guardian) => (
              <Card
                key={g.id}
                className="w-full rounded-md border dark:border-zinc-700 border-zinc-200"
              >
                <CardBody className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4">
                  {/* Avatar + Nombre */}
                  <div className="flex items-center gap-3 w-full md:w-1/3">
                    <Avatar />
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {g.first_name} {g.father_last_name}
                      </span>
                      <span className="text-sm text-zinc-500">
                        {g.relationship_to_student}
                      </span>
                    </div>
                  </div>
                  {/* Teléfono */}
                  <div className="w-full md:w-1/3 flex flex-col gap-1">
                    <span className="text-sm text-zinc-600">Teléfono</span>
                    <p className="font-medium">{g.phone ?? '–'}</p>
                  </div>
                  {/* Email */}
                  <div className="w-full md:w-1/3 flex flex-col gap-1">
                    <span className="text-sm text-zinc-600">Email</span>
                    <p className="font-medium">{g.email ?? '–'}</p>
                  </div>
                </CardBody>
              </Card>
            ))}
            {student?.guardians.length! === 0 && (
              <p className="text-center text-zinc-500">No hay apoderados registrados.</p>
            )}
          </CardBody>
        </Card>
      </Container>
    </PageWrapper>
  )
}

export default EnrollmentDetail
