import PageWrapper from '../../../components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft, SubheaderRight } from '../../../components/layouts/Subheader/Subheader';
import Container from '../../../components/layouts/Container/Container';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import Card, { CardBody, CardHeader } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import useSaveBtn from '../../../hooks/useSaveBtn';
import { useParams } from 'react-router-dom';
import { useStudent, useUpdateStudent } from '../../../api/students.api';
import StudentTabsButtons, { TAB_STUDENT, TTabStudent } from './components/StudentsButtons';
import DetailStudent from './components/DetailStudent';
import Avatar from '../../../components/Avatar';
import { capitalizeFirstLetter } from '../../../utils/getCapitalize';
import ScheduleStudent from './components/ScheduleStudent';
import LeaveStudent from './components/LeaveStudent';
import AttendanceStudent from './components/AttendanceStudent';
import ResultStudents from './components/ResultStudents';
import Icon from '../../../components/icon/Icon';



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
  
  // const updateStudent = useUpdateStudent();
  // const [isSaving, setIsSaving] = useState<boolean>(false);
  // const

  // const formik = useFormik({
  //   enableReinitialize: true,
  //   initialValues: {
  //     first_name: student?.first_name || '',
  //     father_last_name: student?.father_last_name || '',
  //     mother_last_name: student?.mother_last_name || '',
  //     gender: student?.gender || 'male',
  //     date_of_birth: student?.date_of_birth || '',
  //     address: student?.residence?.address || '',
  //     phone: student?.contact_info?.phone || '',
  //   },
  //   onSubmit: async (values) => {
  //     setIsSaving(true);
  //     try {
  //       await updateStudent.mutateAsync({
  //         ...student!,
  //         first_name: values.first_name,
  //         father_last_name: values.father_last_name,
  //         mother_last_name: values.mother_last_name,
  //         gender: values.gender as 'male' | 'female' | 'other',
  //         date_of_birth: values.date_of_birth,
  //         residence: {
  //           ...(student?.residence || {}),
  //           address: values.address,
  //           commune: student?.residence?.commune || '',
  //         },
  //         contact_info: {
  //           ...(student?.contact_info || {}),
  //           phone: values.phone,
  //           email: student?.contact_info?.email || '',
  //         },
  //       });
  //     } finally {
  //       setTimeout(() => setIsSaving(false), 1200);
  //     }
  //   },
  // });

  // const { saveBtnText, saveBtnColor, saveBtnDisable } = useSaveBtn({
  //   isNewItem: false,
  //   isSaving,
  //   isDirty: formik.dirty,
  // });

  if (isLoading) return <p>Cargando...</p>;
  if (isError || !student) return <p>Error al cargar el estudiante.</p>;

  

  return (
    <PageWrapper>
      <Subheader>
        <SubheaderLeft>
          <span>Perfil de Alumno</span>
        </SubheaderLeft>
        <SubheaderRight>
          <Button
            variant='solid'
            color='blue'
            icon='HeroPencilSquare'
          >
            Editar Alumno
          </Button>
        </SubheaderRight>
      </Subheader>
      <Container breakpoint={null} className='flex justify-between gap-5 w-full h-full'>
        <div className='flex flex-col gap-4 w-2/12'>
          <Card>
            <CardBody>
              <div className='flex gap-4 '>
                <Avatar 
                  className='w-24 h-24'
                  rounded='rounded-md'
                />
                <div className='flex flex-col gap-2'>
                  {/* <span className='text-blue-700 font-semibold text-sm cursor-pointer'>AD{String(student.id).slice(-6)}</span> */}
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
              <h3 className="text-lg font-semibold">Primary Contact Info</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              {/* Phone */}
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-zinc-100 rounded">
                  <Icon  icon="HeroPhone" className="text-xl text-zinc-500" />
                </div>
                <div>
                  <div className="font-semibold">Phone Number</div>
                  <div className="text-gray-500">+1 46548 84498</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-zinc-100 rounded">
                  <Icon icon="HeroEnvelope" className="text-xl text-zinc-500" />
                </div>
                <div>
                  <div className="font-semibold">Email Address</div>
                  <div className="text-gray-500">jan@example.com</div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Sibling Information</h3>
            </CardHeader>
            <CardBody className="space-y-4 bg-zinc-50 p-4">
              {siblings.map((sib) => (
                <div
                  key={sib.id}
                  className="flex items-center space-x-4 p-3 bg-zinc-100 rounded"
                >
                  <Avatar className="rounded-full" />
                  <div>
                    <div className="font-semibold text-base">{sib.name}</div>
                    <div className="text-gray-500">{sib.course}</div>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        <div className="flex flex-col w-10/12  h-screen">
          {/* Header: pestañas fijas */}
          <div className="flex-shrink-0 flex items-center justify-between p-4 border-b">
            <StudentTabsButtons activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Contenido: crece y hace scroll interno */}
          <div className="flex-1 overflow-auto p-4">
            {activeTab.text === 'Detalle Alumno' && <DetailStudent student={student} />}

            {activeTab.text === 'Horario' && <ScheduleStudent />}

            {activeTab.text === 'Retiros' && <LeaveStudent /> }

            {activeTab.text === 'Asistencia' && <AttendanceStudent />}

            {activeTab.text === 'Notas' && <ResultStudents />}
          </div>
        </div>
      </Container>
    </PageWrapper>
  );
}

export default StudentDetail;
