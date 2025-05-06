// src/components/administration/EnrollmentTable.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

import PageWrapper from '../../../components/layouts/PageWrapper/PageWrapper'
import Subheader, { SubheaderLeft } from '../../../components/layouts/Subheader/Subheader'
import FieldWrap from '../../../components/form/FieldWrap'
import Input from '../../../components/form/Input'
import Card, { CardBody, CardHeader, CardHeaderChild, CardTitle } from '../../../components/ui/Card'
import Badge from '../../../components/ui/Badge'
import Button from '../../../components/ui/Button'
import Icon from '../../../components/icon/Icon'
import TableTemplate, { TableCardFooterTemplate } from '../../../templates/common/TableParts.template'

import { EnrollmentList } from '../../../types/administrative/Enrollment'
import { useEnrollments } from '../services/enrollments.api'
import Container from '../../../components/layouts/Container/Container'

const EnrollmentTable: React.FC = () => {
  const navigate = useNavigate()
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState<string>('')

  const { data: enrollments, isLoading, isError, error } = useEnrollments()



  const columnHelper = createColumnHelper<EnrollmentList>()

  const columns = [
    columnHelper.accessor('student', {
      header: 'Estudiante',
      cell: info => <span className="whitespace-nowrap">{info.getValue()}</span>,
    }),
    columnHelper.accessor('academic_year', {
      header: 'Año Académico',
      cell: info => <span>{info.row.original.academic_year}</span>,
    }),
    columnHelper.accessor('course', {
      header: 'Curso',
      cell: info => <span>{info.getValue()}</span>,
    }),
    // columnHelper.accessor('enrollmentNumber', {
    //   header: 'Matrícula Nº',
    //   cell: info => <span>{info.getValue()}</span>,
    // }),
    columnHelper.accessor('entry_date', {
      header: 'Fecha Ingreso',
      cell: info => <span>{info.row.original.entry_date}</span>,
    }),
    columnHelper.accessor('admission_type', {
      header: 'Tipo Ingreso',
      cell: info => (
        <Badge variant="outline" className="border-transparent">
          {info.row.original.admission_type}
        </Badge>
      ),
    }),
    columnHelper.accessor('status_display', {
      header: 'Estado',
      cell: info => (
        <Badge color={info.row.original.isCurrent ? 'emerald' : 'zinc'} variant="solid">
          {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Acciones',
      cell: info => (
        <div className="flex justify-center">
          <Button
            variant="solid"
            color="blue"
            size="sm"
            title="Ver detalle"
            onClick={() => navigate(`/administracion/matriculas/${info.row.original.id}`)}
          >
            <Icon icon="HeroEye" />
          </Button>
        </div>
      ),
    }),
  ]

  const table = useReactTable({
    data: enrollments ?? [],
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    enableGlobalFilter: true,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  if (isLoading) return <p>Cargando matrículas...</p>
  if (isError)   return <p>Error al cargar matrículas: {(error as Error).message}</p>


  return (
    <PageWrapper name="Listado de Matrículas">
      <Subheader>
        <SubheaderLeft>
          <FieldWrap>
            <Input
              id="search-enrollments"
              name="search"
              placeholder="Buscar matrícula..."
              value={globalFilter}
              onChange={e => setGlobalFilter(e.target.value)}
            />
          </FieldWrap>
        </SubheaderLeft>
      </Subheader>

      <Container breakpoint={null} className='w-full'>
        <Card className='w-full'>
            <CardHeader>
              <CardHeaderChild>
                <CardTitle>Matrículas</CardTitle>
                <Badge variant="outline" className="border-transparent">
                  {table.getFilteredRowModel().rows.length} items
                </Badge>
              </CardHeaderChild>
            </CardHeader>

            <CardBody className="overflow-auto">
              <TableTemplate table={table} className="table-fixed" />
            </CardBody>

            <TableCardFooterTemplate table={table} />
          </Card>
      </Container>
    </PageWrapper>
  )
}

export default EnrollmentTable
