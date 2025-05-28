import PageWrapper from '../../../components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft, SubheaderRight } from '../../../components/layouts/Subheader/Subheader';
import Container from '../../../components/layouts/Container/Container';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import Card, { CardBody, CardHeader } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import useSaveBtn from '../../../hooks/useSaveBtn';
import { useParams } from 'react-router-dom';
import StudentTabsButtons, { TAB_STUDENT, TTabStudent } from './components/StudentsButtons';
import DetailStudent from './components/DetailStudent';
import Avatar from '../../../components/Avatar';
import { capitalizeFirstLetter } from '../../../utils/getCapitalize';
import ScheduleStudent from './components/ScheduleStudent';
import LeaveStudent from './components/LeaveStudent';
import AttendanceStudent from './components/AttendanceStudent';
import ResultStudents from './components/ResultStudents';
import Icon from '../../../components/icon/Icon';
import UpdateStudent from './components/UpdateStudent';
import { useStudent } from '../services/students.api';



const siblings = [
  {
    id: '1',
    name: 'Ralph Claudia',
    course: 'III, B',
    avatar: '/avatars/ralph.jpg',
  },
  {
    id: '2',
    name: 'Julie Scott',
    course: 'V, A',
    avatar: '/avatars/julie.jpg',
  },
];

function StudentDetail() {
  const { studentId } = useParams();
  const { data: student, isLoading, isError } = useStudent(studentId!);
  const [activeTab, setActiveTab] = useState<TTabStudent>(TAB_STUDENT.DETAIL);
  const [editable, setEditable] = useState(false);

  if (isLoading) return <p>Cargando...</p>;
  if (isError || !student) return <p>Error al cargar el estudiante.</p>;

  return (
    <PageWrapper>
      <Subheader>
        <SubheaderLeft>
          <Button 
            variant='outline'
            icon='HeroArrowLeft'
            onClick={() => window.history.back()}
          />
          <span>Perfil de Alumno</span>
        </SubheaderLeft>
        <SubheaderRight>
          <Button
            variant='solid'
            color='blue'
            icon={editable ? 'HeroSave' : 'HeroPencil'}
            onClick={() => setEditable(!editable)}
          >
            {editable ? 'Ver Perfil' : 'Editar Alumno'}
          </Button>
        </SubheaderRight>
      </Subheader>

      {/* Container responsive: flex-col en mobile, flex-row en lg+ */}
      <Container
        breakpoint={null}
        className='flex flex-col lg:flex-row gap-5 w-full h-full'
      >
        {editable ? (
          <div className='w-full'>
            <UpdateStudent student={student} />
          </div>
        ) : (
          <>
            {/* Sidebar */}
            <div className='w-full lg:w-3/12 flex flex-col gap-4'>
              <Card>
                <CardBody>
                  <div className='flex gap-4'>
                    <Avatar 
                      className='w-24 h-24'
                      rounded='rounded-md'
                    />
                    <div className='flex flex-col gap-2'>
                      <span className={`text-xs font-medium px-2 py-1 rounded-md ${student.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {student.status ? '● Active' : '● Inactive'}
                      </span>
                      <span>
                        {capitalizeFirstLetter(student.first_name.toLowerCase())} {capitalizeFirstLetter(student.father_last_name.toLowerCase())}
                      </span>
                      <span>
                        {student.identification_number}-{student.verification_digit}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Contacto</h3>
                </CardHeader>
                <CardBody className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-zinc-100 rounded">
                      <Icon icon="HeroPhone" className="text-xl text-zinc-500" />
                    </div>
                    <div>
                      <div className="font-semibold">N° Telefónico</div>
                      <div className="text-gray-500">{student.contact_info?.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-zinc-100 rounded">
                      <Icon icon="HeroEnvelope" className="text-xl text-zinc-500" />
                    </div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-gray-500">{student.contact_info?.email}</div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Sibling Information</h3>
                </CardHeader>
                <CardBody className="space-y-4 bg-zinc-50 p-4">
                  {siblings?.map(sib => (
                    <div
                      key={sib.id}
                      className="flex items-center space-x-4 p-3 bg-zinc-100 rounded"
                    >
                      <Avatar className="rounded-full" />
                      <div>
                        <div className="font-semibold text-base">
                          {capitalizeFirstLetter(sib.name)}
                        </div>
                        <div className="text-gray-500">
                          {sib.course}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardBody>
              </Card>
            </div>

           {/* Main Content */}
            <div className="w-full lg:w-10/12 flex flex-col">
              {/* Tabs header: scrollable en móvil */}
              <div className="flex-shrink-0 overflow-x-auto border-b">
                <div className="flex flex-nowrap space-x-2 px-4">
                  <StudentTabsButtons activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
              </div>

              {/* Tab panels */}
              <div className="flex-1 overflow-auto p-4">
                {activeTab.text === 'Detalle Alumno' && <DetailStudent student={student} />}
                {activeTab.text === 'Horario'         && <ScheduleStudent />}
                {activeTab.text === 'Retiros'         && <LeaveStudent />}
                {activeTab.text === 'Asistencia'      && <AttendanceStudent />}
                {activeTab.text === 'Notas'           && <ResultStudents />}
              </div>
            </div>

          </>
        )}
      </Container>
    </PageWrapper>
  );
}

export default StudentDetail;