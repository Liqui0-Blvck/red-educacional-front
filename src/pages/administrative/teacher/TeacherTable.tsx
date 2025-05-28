// src/components/administration/TeacherTable.tsx
import React, { useEffect, useMemo, useState } from 'react'
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import { format } from '@formkit/tempo'

import PageWrapper from '../../../components/layouts/PageWrapper/PageWrapper'
import Subheader, { SubheaderLeft, SubheaderRight } from '../../../components/layouts/Subheader/Subheader'
import Container from '../../../components/layouts/Container/Container'
import Card, {
  CardHeader,
  CardHeaderChild,
  CardTitle,
  CardBody,
} from '../../../components/ui/Card'
import FieldWrap from '../../../components/form/FieldWrap'
import Input from '../../../components/form/Input'
import Icon from '../../../components/icon/Icon'
import Button from '../../../components/ui/Button'
import Badge from '../../../components/ui/Badge'
import TableTemplate, { TableCardFooterTemplate } from '../../../templates/common/TableParts.template'
import { Teacher } from '../../../types/administrative/Teacher'
import { useTeachers } from '../services/teachers.api'
import Avatar from '../../../components/Avatar'

const TeacherTable: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [visibleCount, setVisibleCount] = useState(8)

  // switch to grid on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setViewMode('grid')
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const { data: teachers = [], isLoading, isError, error } = useTeachers()
  const navigate = useNavigate()
  const columnHelper = createColumnHelper<Teacher>()

  const columns = useMemo(
    () => [
      columnHelper.accessor('teacher.rut', {
        header: 'RUN',
        cell: info => <span>{info.row.original.teacher.rut}</span>,
      }),
      columnHelper.accessor('teacher.first_name', {
        header: 'Nombre',
        cell: info => <span>{info.row.original.teacher.first_name}</span>,
      }),
      columnHelper.accessor('teacher.father_last_name', {
        header: 'Apellido Paterno',
        cell: info => <span>{info.row.original.teacher.father_last_name}</span>,
      }),
      columnHelper.accessor('main_subject', {
        header: 'Asignatura',
        cell: info => <span>{info.getValue()}</span>,
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Acciones',
        cell: info => (
          <Button
            variant="solid"
            color="blue"
            size="sm"
            icon="HeroEye"
            onClick={() =>
              navigate(`/administracion/personal/docentes/${info.row.original.id}`)
            }
          />
        ),
      }),
    ],
    [columnHelper, navigate],
  )

  const table = useReactTable({
    data: teachers,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    enableGlobalFilter: true,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  })

  if (isLoading) return <p>Cargando docentes…</p>
  if (isError) return <p>Error al cargar docentes: {(error as Error).message}</p>

  return (
    <PageWrapper>
      <Subheader>
        <SubheaderLeft>
          <FieldWrap
            firstSuffix={<Icon icon="HeroMagnifyingGlass" className="mx-2" />}
            lastSuffix={
              globalFilter && (
                <Icon
                  icon="HeroXMark"
                  color="red"
                  className="mx-2 cursor-pointer"
                  onClick={() => setGlobalFilter('')}
                />
              )
            }
          >
            <Input
              id="search"
              name="search"
              placeholder="Buscar docente..."
              value={globalFilter}
              onChange={e => setGlobalFilter(e.target.value)}
            />
          </FieldWrap>
        </SubheaderLeft>
        <SubheaderRight>
          <Button
            variant="solid"
            color="blue"
            icon="HeroPlus"
            onClick={() => navigate('/administracion/personal/docentes/new')}
          >
            Añadir Docente
          </Button>
        </SubheaderRight>
      </Subheader>

      <Container breakpoint={null} className="w-full">
        <Card className="h-full">
          <CardHeader>
            <CardHeaderChild>
              <CardTitle>Docentes</CardTitle>
              <Badge variant="outline" className="border-transparent px-4" rounded="rounded-full">
                {table.getFilteredRowModel().rows.length} items
              </Badge>
            </CardHeaderChild>
            <CardHeaderChild>
              {window.innerWidth > 760 && (
                <>
                  <Button
                    variant={viewMode === 'table' ? 'solid' : 'outline'}
                    color="blue"
                    icon="HeroTableCells"
                    size="lg"
                    onClick={() => setViewMode('table')}
                  />
                  <Button
                    variant={viewMode === 'grid' ? 'solid' : 'outline'}
                    color="blue"
                    icon="HeroSquares2X2"
                    size="lg"
                    onClick={() => setViewMode('grid')}
                  />
                </>
              )}
            </CardHeaderChild>
          </CardHeader>

          <CardBody className="overflow-auto">
            {viewMode === 'table' ? (
              <TableTemplate className="table-fixed max-md:min-w-[70rem]" table={table} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {table
                  .getFilteredRowModel()
                  .rows.slice(0, visibleCount)
                  .map(row => {
                    const t = row.original
                    return (
                      <Card
                        key={t.id}
                        className="bg-zinc-100 dark:bg-zinc-800 shadow-md rounded-xl p-4 border dark:border-zinc-600 border-zinc-300"
                      >
                        <div className="flex flex-col items-center text-center">
                          {/* <img
                            src={
                              t.profile_image
                                ? URL.createObjectURL(t.profile_image)
                                : `https://ui-avatars.com/api/?name=${t.first_name}+${t.father_last_name}&background=random&size=64`
                            }
                            alt="avatar"
                            className="w-16 h-16 rounded-full mb-2"
                          /> */}
                          <Avatar />
                          <p className="font-semibold text-sm">
                            {t.teacher.first_name} {t.teacher.father_last_name}
                          </p>
                          <p className="text-sm dark:text-zinc-300 text-zinc-600">
                            {t.main_subject}
                          </p>
                        </div>
                        <div className="mt-4 space-y-1 text-sm">
                          <div>
                            <strong>Email:</strong> {t.teacher.email}
                          </div>
                          <div>
                            <strong>Teléfono:</strong> {t.teacher.phone}
                          </div>
                          {/* <div>
                            <strong>Activo:</strong> {t.is_active ? 'Sí' : 'No'}
                          </div> */}
                          <div>
                            <strong>Ingreso:</strong>{' '}
                            {format(t.teacher.date_joined, { date: 'short' }, 'es')}
                          </div>
                        </div>
                        <div className="flex justify-center mt-4 border-t pt-2">
                          <Button
                            variant="solid"
                            color="blue"
                            size="sm"
                            icon="HeroEye"
                            onClick={() =>
                              navigate(`/administracion/personal/docentes/${t.id}`)
                            }
                          />
                        </div>
                      </Card>
                    )
                  })}
              </div>
            )}
          </CardBody>

          {viewMode === 'grid' && table.getFilteredRowModel().rows.length > visibleCount && (
            <div className="flex justify-center p-4">
              <Button
                variant="outline"
                color="blue"
                onClick={() => setVisibleCount(c => c + 8)}
              >
                Ver más
              </Button>
            </div>
          )}

          {viewMode === 'table' && <TableCardFooterTemplate table={table} />}
        </Card>
      </Container>
    </PageWrapper>
  )
}

export default TeacherTable
