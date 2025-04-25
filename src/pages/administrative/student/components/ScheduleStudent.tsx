import React from 'react';
import Card, { CardBody, CardHeader } from '../../../../components/ui/Card';
import Avatar from '../../../../components/Avatar';
import Icon from '../../../../components/icon/Icon';

// Asumiendo que tus variables vienen de un hook o props, ejemplo de datos de classSession:
// Puedes reemplazar `scheduleData` por tus datos reales via React Query
interface ClassSession {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  start_time: string; // '09:00'
  end_time: string;   // '09:45'
  subject_name: string;
  teacher_name: string;
  teacher_avatar: string;
}

const days: Array<ClassSession['day']> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const colors = ['bg-red-100', 'bg-blue-100', 'bg-emerald-100', 'bg-yellow-100', 'bg-purple-100'];

// Ejemplo de datos estáticos, reemplaza con tu hook `useClassSessions(studentId)`
const scheduleData: ClassSession[] = [
  // Monday
  { id: '1', day: 'Monday', start_time: '08:30', end_time: '09:15', subject_name: 'Matemáticas', teacher_name: 'Jacquelin', teacher_avatar: '/avatars/jacquelin.jpg' },
  { id: '2', day: 'Monday', start_time: '09:15', end_time: '10:00', subject_name: 'Historia', teacher_name: 'Erickson', teacher_avatar: '/avatars/erickson.jpg' },
  { id: 'b1', day: 'Monday', start_time: '10:00', end_time: '10:15', subject_name: 'Recreo 1', teacher_name: '', teacher_avatar: '' },
  { id: '3', day: 'Monday', start_time: '10:15', end_time: '11:00', subject_name: 'Química', teacher_name: 'Daniel', teacher_avatar: '/avatars/daniel.jpg' },
  { id: '4', day: 'Monday', start_time: '11:00', end_time: '11:45', subject_name: 'Física', teacher_name: 'Teresa', teacher_avatar: '/avatars/teresa.jpg' },
  { id: 'b2', day: 'Monday', start_time: '11:45', end_time: '12:00', subject_name: 'Recreo 2', teacher_name: '', teacher_avatar: '' },
  { id: '5', day: 'Monday', start_time: '12:00', end_time: '12:45', subject_name: 'Inglés', teacher_name: 'Hellana', teacher_avatar: '/avatars/hellana.jpg' },
  { id: '6', day: 'Monday', start_time: '12:45', end_time: '13:30', subject_name: 'Biología', teacher_name: 'Aaron', teacher_avatar: '/avatars/aaron.jpg' },
  { id: 'l1', day: 'Monday', start_time: '13:30', end_time: '14:15', subject_name: 'Almuerzo', teacher_name: '', teacher_avatar: '' },
  { id: '7', day: 'Monday', start_time: '14:15', end_time: '15:00', subject_name: 'Arte', teacher_name: 'Morgan', teacher_avatar: '/avatars/morgan.jpg' },
  { id: '8', day: 'Monday', start_time: '15:00', end_time: '15:45', subject_name: 'Literatura', teacher_name: 'Jacquelin', teacher_avatar: '/avatars/jacquelin.jpg' },
  { id: '9', day: 'Monday', start_time: '15:45', end_time: '16:30', subject_name: 'Educación Física', teacher_name: 'Teresa', teacher_avatar: '/avatars/teresa.jpg' },
  { id: '10', day: 'Monday', start_time: '16:30', end_time: '17:00', subject_name: 'Música', teacher_name: 'Erickson', teacher_avatar: '/avatars/erickson.jpg' },
  // Tuesday
  { id: '11', day: 'Tuesday', start_time: '08:30', end_time: '09:15', subject_name: 'Matemáticas', teacher_name: 'Daniel', teacher_avatar: '/avatars/daniel.jpg' },
  { id: '12', day: 'Tuesday', start_time: '09:15', end_time: '10:00', subject_name: 'Historia', teacher_name: 'Teresa', teacher_avatar: '/avatars/teresa.jpg' },
  { id: 'b3', day: 'Tuesday', start_time: '10:00', end_time: '10:15', subject_name: 'Recreo 1', teacher_name: '', teacher_avatar: '' },
  { id: '13', day: 'Tuesday', start_time: '10:15', end_time: '11:00', subject_name: 'Química', teacher_name: 'Morgan', teacher_avatar: '/avatars/morgan.jpg' },
  { id: '14', day: 'Tuesday', start_time: '11:00', end_time: '11:45', subject_name: 'Física', teacher_name: 'Jacquelin', teacher_avatar: '/avatars/jacquelin.jpg' },
  { id: 'b4', day: 'Tuesday', start_time: '11:45', end_time: '12:00', subject_name: 'Recreo 2', teacher_name: '', teacher_avatar: '' },
  { id: '15', day: 'Tuesday', start_time: '12:00', end_time: '12:45', subject_name: 'Inglés', teacher_name: 'Erickson', teacher_avatar: '/avatars/erickson.jpg' },
  { id: 'l2', day: 'Tuesday', start_time: '13:30', end_time: '14:15', subject_name: 'Almuerzo', teacher_name: '', teacher_avatar: '' },
  { id: '16', day: 'Tuesday', start_time: '14:15', end_time: '15:00', subject_name: 'Arte', teacher_name: 'Daniel', teacher_avatar: '/avatars/daniel.jpg' },
  { id: '17', day: 'Tuesday', start_time: '15:00', end_time: '15:45', subject_name: 'Literatura', teacher_name: 'Teresa', teacher_avatar: '/avatars/teresa.jpg' },
  { id: '18', day: 'Tuesday', start_time: '15:45', end_time: '16:30', subject_name: 'Educación Física', teacher_name: 'Morgan', teacher_avatar: '/avatars/morgan.jpg' },
  { id: '19', day: 'Tuesday', start_time: '16:30', end_time: '17:00', subject_name: 'Música', teacher_name: 'Jacquelin', teacher_avatar: '/avatars/jacquelin.jpg' },
  // Wednesday
  { id: '20', day: 'Wednesday', start_time: '08:30', end_time: '09:15', subject_name: 'Matemáticas', teacher_name: 'Hellana', teacher_avatar: '/avatars/hellana.jpg' },
  { id: '21', day: 'Wednesday', start_time: '09:15', end_time: '10:00', subject_name: 'Historia', teacher_name: 'Aaron', teacher_avatar: '/avatars/aaron.jpg' },
  { id: 'b5', day: 'Wednesday', start_time: '10:00', end_time: '10:15', subject_name: 'Recreo 1', teacher_name: '', teacher_avatar: '' },
  { id: '22', day: 'Wednesday', start_time: '10:15', end_time: '11:00', subject_name: 'Química', teacher_name: 'Erickson', teacher_avatar: '/avatars/erickson.jpg' },
  { id: '23', day: 'Wednesday', start_time: '11:00', end_time: '11:45', subject_name: 'Física', teacher_name: 'Daniel', teacher_avatar: '/avatars/daniel.jpg' },
  { id: 'b6', day: 'Wednesday', start_time: '11:45', end_time: '12:00', subject_name: 'Recreo 2', teacher_name: '', teacher_avatar: '' },
  { id: '24', day: 'Wednesday', start_time: '12:00', end_time: '12:45', subject_name: 'Inglés', teacher_name: 'Teresa', teacher_avatar: '/avatars/teresa.jpg' },
  { id: 'l3', day: 'Wednesday', start_time: '13:30', end_time: '14:15', subject_name: 'Almuerzo', teacher_name: '', teacher_avatar: '' },
  { id: '25', day: 'Wednesday', start_time: '14:15', end_time: '15:00', subject_name: 'Arte', teacher_name: 'Hellana', teacher_avatar: '/avatars/hellana.jpg' },
  { id: '26', day: 'Wednesday', start_time: '15:00', end_time: '15:45', subject_name: 'Literatura', teacher_name: 'Aaron', teacher_avatar: '/avatars/aaron.jpg' },
  { id: '27', day: 'Wednesday', start_time: '15:45', end_time: '16:30', subject_name: 'Educación Física', teacher_name: 'Morgan', teacher_avatar: '/avatars/morgan.jpg' },
  { id: '28', day: 'Wednesday', start_time: '16:30', end_time: '17:00', subject_name: 'Música', teacher_name: 'Erickson', teacher_avatar: '/avatars/erickson.jpg' },
  // Thursday
  { id: '29', day: 'Thursday', start_time: '08:30', end_time: '09:15', subject_name: 'Matemáticas', teacher_name: 'Jacquelin', teacher_avatar: '/avatars/jacquelin.jpg' },
  { id: '30', day: 'Thursday', start_time: '09:15', end_time: '10:00', subject_name: 'Historia', teacher_name: 'Daniel', teacher_avatar: '/avatars/daniel.jpg' },
  { id: 'b7', day: 'Thursday', start_time: '10:00', end_time: '10:15', subject_name: 'Recreo 1', teacher_name: '', teacher_avatar: '' },
  { id: '31', day: 'Thursday', start_time: '10:15', end_time: '11:00', subject_name: 'Química', teacher_name: 'Teresa', teacher_avatar: '/avatars/teresa.jpg' },
  { id: '32', day: 'Thursday', start_time: '11:00', end_time: '11:45', subject_name: 'Física', teacher_name: 'Erickson', teacher_avatar: '/avatars/erickson.jpg' },
  { id: 'b8', day: 'Thursday', start_time: '11:45', end_time: '12:00', subject_name: 'Recreo 2', teacher_name: '', teacher_avatar: '' },
  { id: '33', day: 'Thursday', start_time: '12:00', end_time: '12:45', subject_name: 'Inglés', teacher_name: 'Daniel', teacher_avatar: '/avatars/daniel.jpg' },
  { id: 'l4', day: 'Thursday', start_time: '13:30', end_time: '14:15', subject_name: 'Almuerzo', teacher_name: '', teacher_avatar: '' },
  { id: '34', day: 'Thursday', start_time: '14:15', end_time: '15:00', subject_name: 'Arte', teacher_name: 'Jacquelin', teacher_avatar: '/avatars/jacquelin.jpg' },
  { id: '35', day: 'Thursday', start_time: '15:00', end_time: '15:45', subject_name: 'Literatura', teacher_name: 'Teresa', teacher_avatar: '/avatars/teresa.jpg' },
  { id: '36', day: 'Thursday', start_time: '15:45', end_time: '16:30', subject_name: 'Educación Física', teacher_name: 'Morgan', teacher_avatar: '/avatars/morgan.jpg' },
  { id: '37', day: 'Thursday', start_time: '16:30', end_time: '17:00', subject_name: 'Música', teacher_name: 'Daniel', teacher_avatar: '/avatars/daniel.jpg' },
  // Friday
  { id: '38', day: 'Friday', start_time: '08:30', end_time: '09:15', subject_name: 'Matemáticas', teacher_name: 'Hellana', teacher_avatar: '/avatars/hellana.jpg' },
  { id: '39', day: 'Friday', start_time: '09:15', end_time: '10:00', subject_name: 'Historia', teacher_name: 'Aaron', teacher_avatar: '/avatars/aaron.jpg' },
  { id: 'b9', day: 'Friday', start_time: '10:00', end_time: '10:15', subject_name: 'Recreo 1', teacher_name: '', teacher_avatar: '' },
  { id: '40', day: 'Friday', start_time: '10:15', end_time: '11:00', subject_name: 'Química', teacher_name: 'Erickson', teacher_avatar: '/avatars/erickson.jpg' },
  { id: '41', day: 'Friday', start_time: '11:00', end_time: '11:45', subject_name: 'Física', teacher_name: 'Daniel', teacher_avatar: '/avatars/daniel.jpg' },
  { id: 'b10', day: 'Friday', start_time: '11:45', end_time: '12:00', subject_name: 'Recreo 2', teacher_name: '', teacher_avatar: '' },
  { id: '42', day: 'Friday', start_time: '12:00', end_time: '12:45', subject_name: 'Inglés', teacher_name: 'Jacquelin', teacher_avatar: '/avatars/jacquelin.jpg' },
  { id: 'l5', day: 'Friday', start_time: '13:30', end_time: '14:15', subject_name: 'Almuerzo', teacher_name: '', teacher_avatar: '' },
  { id: '43', day: 'Friday', start_time: '14:15', end_time: '15:00', subject_name: 'Arte', teacher_name: 'Hellana', teacher_avatar: '/avatars/hellana.jpg' },
  { id: '44', day: 'Friday', start_time: '15:00', end_time: '15:45', subject_name: 'Literatura', teacher_name: 'Aaron', teacher_avatar: '/avatars/aaron.jpg' },
  { id: '45', day: 'Friday', start_time: '15:45', end_time: '16:30', subject_name: 'Educación Física', teacher_name: 'Erickson', teacher_avatar: '/avatars/erickson.jpg' },
  { id: '46', day: 'Friday', start_time: '16:30', end_time: '17:00', subject_name: 'Música', teacher_name: 'Daniel', teacher_avatar: '/avatars/daniel.jpg' },
];

export default function ScheduleStudent() {
  return (
    <Card>
      <CardHeader className='border-b-2 border-zinc-100 dark:border-zinc-800 pb-2'>
        <h2>Horario</h2>
      </CardHeader>

      <CardBody className='bg-zinc-50 p-2'>
        <div className="grid grid-cols-5 gap-4">
          {days.map((day, idx) => (
            <div key={day}>
              <h3 className="mb-2 text-lg font-medium">{day}</h3>
              <div className="space-y-4">
                {scheduleData
                  .filter((session) => session.day === day)
                  .map((session) => (
                    <Card key={session.id} className={`${colors[idx]} shadow-sm`}>
                      <CardBody>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center text-gray-600 text-sm">
                            <Icon icon="HeroClock" className="mr-2" />
                            <span>{`${session.start_time} - ${session.end_time} AM`}</span>
                          </div>
                          <div className="font-semibold">Subject: {session.subject_name}</div>
                          <div className="flex items-center">
                            {
                              session.subject_name === 'Recreo 1' || session.subject_name === 'Recreo 2' || session.subject_name === 'Almuerzo' ? (
                                null
                              ) : (
                                <Avatar
                                  className="w-8 h-8 mr-2"
                                />
                              )
                            }
                            <span>{session.teacher_name}</span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
