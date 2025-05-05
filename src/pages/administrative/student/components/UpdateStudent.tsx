import React, { FC } from 'react'
import PersonalInfoForm from './forms/PersonalInfoForm'
import GuardiansForm from './forms/GuardiansForm'
import HealthInfoForm from './forms/HealthInfoForm'
import ResidenceForm from './forms/ResidenceForm'
import { EthnicityForm } from './forms/EthnicityForm'
import { MigrationForm } from './forms/MigrationForm'
import { Student } from '../../../../types/administrative/Student'
import { VulnerabilityForm } from './forms/VulnerabilityForm'






// Componente Principal
interface IUpdateStudent { student: Student }
const UpdateStudent: FC<IUpdateStudent> = ({ student }) => {
  return (
    <div className="w-full space-y-6">
      <PersonalInfoForm student={student} />
      <GuardiansForm guardians={student.guardians || []} />
      <ResidenceForm student={student} />
      <HealthInfoForm student={student} />
      <EthnicityForm student={student} />
      <MigrationForm student={student} />
      <VulnerabilityForm student={student} />
    </div>
  )
}

export default UpdateStudent
