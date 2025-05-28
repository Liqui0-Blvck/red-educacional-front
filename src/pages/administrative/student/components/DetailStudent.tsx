import React, { FC } from 'react'
import Card, { CardBody, CardHeader } from '../../../../components/ui/Card'
import Avatar from '../../../../components/Avatar'
import Icon from '../../../../components/icon/Icon'
import { Student, Sibling } from '../../../../types/administrative/Student'
import { Guardian } from '../../../../types/administrative/Guardians'

interface IDetailStudentProps {
  student: Student
}

const DetailStudent: FC<IDetailStudentProps> = ({ student }) => {
  return (
    <div className="w-full flex flex-col gap-6 overflow-y-auto">
      {/* Padres / Apoderados */}
      <Card>
        <CardHeader className="border-b-2 border-zinc-100 dark:border-zinc-800 mb-2">
          <h2 className="text-lg font-semibold">Información de los Padres</h2>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 py-4">
          {student.guardians.map((g: Guardian) => (
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
        </CardBody>
      </Card>

      {/* Dirección + Historial Médico */}
      <div className="w-full flex flex-col lg:flex-row gap-5">
        {/* Dirección */}
        <Card className="w-full lg:w-1/2">
          <CardHeader className="border-b-2 border-zinc-100 dark:border-zinc-800 mb-2">
            <h2 className="text-lg font-semibold">Dirección</h2>
          </CardHeader>
          <CardBody className="flex items-start gap-3 p-4">
            <Icon icon="HeroMapPin" size="text-xl" className="text-blue-500" />
            <div>
              <span className="font-medium">Dirección Actual</span>
              <p className="text-zinc-500">{student.residence?.address ?? '–'}</p>
            </div>
          </CardBody>
        </Card>

        {/* Historial Médico */}
        <Card className="w-full lg:w-1/2">
          <CardHeader className="border-b-2 border-zinc-100 dark:border-zinc-800 mb-2">
            <h2 className="text-lg font-semibold">Historial Médico</h2>
          </CardHeader>
          <CardBody className="flex flex-col sm:flex-row gap-4 p-4">
            {/* Enfermedades Crónicas */}
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Enfermedades Crónicas</h4>
              {student.health_info?.chronic_diseases?.length ? (
                student.health_info.chronic_diseases.map((d, idx) => (
                  <div key={idx} className="flex items-start gap-3 mb-3">
                    <Icon icon="HeroHeartPulse" size="text-xl" className="text-red-500" />
                    <div>
                      <p className="font-medium">{d.name}</p>
                      <p className="text-sm text-zinc-600">
                        Diagnóstico: {d.diagnosis_date} — Severidad: {d.severity}
                      </p>
                      {d.treatment_plan && <p>Plan: {d.treatment_plan}</p>}
                      {d.notes && <p className="italic text-xs">{d.notes}</p>}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-zinc-500">No hay enfermedades crónicas registradas.</p>
              )}
            </div>

            {/* Alergias */}
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Alergias</h4>
              {student.health_info?.allergies?.length ? (
                student.health_info.allergies.map((a, idx) => (
                  <div key={idx} className="flex items-start gap-3 mb-3">
                    <Icon icon="HeroExclamationCircle" size="text-xl" className="text-yellow-500" />
                    <div>
                      <p className="font-medium">{a.name}</p>
                      <p className="text-sm text-zinc-600">
                        Diagnóstico: {a.diagnosis_date} — Severidad: {a.severity}
                      </p>
                      {a.reaction && <p>Reacción: {a.reaction}</p>}
                      {a.notes && <p className="italic text-xs">{a.notes}</p>}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-zinc-500">No hay alergias registradas.</p>
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Etnia + Migración + Vulnerabilidad + Hermanos */}
      <div className="w-full flex flex-col xl:flex-row gap-5">
        {/* Etnia */}
        {student.ethnicity_record && (
          <Card className="w-full">
            <CardHeader className="border-b-2 border-zinc-100 dark:border-zinc-800 mb-2">
              <h2 className="text-lg font-semibold">Etnia</h2>
            </CardHeader>
            <CardBody className="p-4">
              <p>
                <span className="font-medium">Pertenece a pueblo indígena: </span>
                {student.ethnicity_record.belongs_to_indigenous_people ? 'Sí' : 'No'}
              </p>
              {student.ethnicity_record.belongs_to_indigenous_people && (
                <p>
                  <span className="font-medium">Grupo indígena: </span>
                  {student.ethnicity_record.indigenous_group ?? '–'}
                </p>
              )}
            </CardBody>
          </Card>
        )}

        {/* Migración */}
        {student.migration_status && (
          <Card className="w-full">
            <CardHeader className="border-b-2 border-zinc-100 dark:border-zinc-800 mb-2">
              <h2 className="text-lg font-semibold">Migración</h2>
            </CardHeader>
            <CardBody className="p-4 space-y-2">
              <p>
                <span className="font-medium">Es extranjero: </span>
                {student.migration_status.is_foreign ? 'Sí' : 'No'}
              </p>
              {student.migration_status.is_foreign && (
                <>
                  <p>
                    <span className="font-medium">Ingreso al país: </span>
                    {student.migration_status.entry_date_to_country}
                  </p>
                  <p>
                    <span className="font-medium">País anterior: </span>
                    {student.migration_status.previous_country_of_residence ?? '–'}
                  </p>
                </>
              )}
            </CardBody>
          </Card>
        )}

        {/* Vulnerabilidad */}
        {student.vulnerability_info && (
          <Card className="w-full">
            <CardHeader className="border-b-2 border-zinc-100 dark:border-zinc-800 mb-2">
              <h2 className="text-lg font-semibold">Vulnerabilidad</h2>
            </CardHeader>
            <CardBody className="p-4 space-y-2">
              <p>
                <span className="font-medium">Programa social: </span>
                {student.vulnerability_info.is_in_social_program ? 'Sí' : 'No'}
              </p>
              {student.vulnerability_info.is_in_social_program && (
                <p>
                  <span className="font-medium">Nombre programa: </span>
                  {student.vulnerability_info.social_program_name}
                </p>
              )}
              <p>
                <span className="font-medium">En situación vulnerable: </span>
                {student.vulnerability_info.is_in_vulnerable_situation ? 'Sí' : 'No'}
              </p>
              {student.vulnerability_info.is_in_vulnerable_situation && (
                <p className="italic text-sm">
                  {student.vulnerability_info.vulnerability_description}
                </p>
              )}
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  )
}

export default DetailStudent
