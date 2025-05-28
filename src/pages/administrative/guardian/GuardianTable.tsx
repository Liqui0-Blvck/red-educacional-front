// src/components/administration/GuardianTable.tsx
import React, { useState, useMemo } from 'react'
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
import { Guardian } from '../../../types/administrative/Guardians'
import { useGuardians } from '../services/guardians.api'

const GuardianTable: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [visibleCount, setVisibleCount] = useState(8)

  const { data: guardians = [], isLoading, isError, error } = useGuardians()
  const navigate = useNavigate()
  const columnHelper = createColumnHelper<Guardian>()

  const columns = useMemo(
    () => [
      columnHelper.accessor('rut', {
        header: 'RUN',
        cell: info => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('first_name', {
        header: 'Nombre',
        cell: info => <span>{`${info.row.original.first_name} ${info.row.original.father_last_name}`}</span>,
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: info => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('phone', {
        header: 'Teléfono',
        cell: info => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('relationship_to_student', {
        header: 'Relación',
        cell: info => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('is_active', {
        header: 'Activo',
        cell: info => (
          <Badge
            variant="outline"
            color={info.getValue() ? 'emerald' : 'red'}
            className="px-2"
          >
            {info.getValue() ? 'Sí' : 'No'}
          </Badge>
        ),
      }),
      columnHelper.accessor('date_joined', {
        header: 'Registro',
        cell: info => (
          <span>{format(info.getValue(), { date: 'medium' }, 'es')}</span>
        ),
      }),
    ],
    [columnHelper],
  )

  const table = useReactTable({
    data: guardians,
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

  if (isLoading) return <p>Cargando apoderados...</p>
  if (isError) return <p>Error al cargar apoderados: {(error as Error).message}</p>

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
              placeholder="Buscar apoderado..."
              value={globalFilter}
              onChange={e => setGlobalFilter(e.target.value)}
            />
          </FieldWrap>
        </SubheaderLeft>
        <SubheaderRight>
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
        </SubheaderRight>
      </Subheader>

      <Container breakpoint={null} className="w-full">
        <Card className="h-full">
          <CardHeader>
            <CardHeaderChild>
              <CardTitle>Apoderados</CardTitle>
              <Badge variant="outline" className="border-transparent px-4" rounded="rounded-full">
                {table.getFilteredRowModel().rows.length} items
              </Badge>
            </CardHeaderChild>
          </CardHeader>

          <CardBody className="overflow-auto">
            {viewMode === 'table' ? (
              <TableTemplate className="table-fixed max-md:min-w-[70rem]" table={table} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {table.getFilteredRowModel().rows.slice(0, visibleCount).map(row => {
                  const g = row.original
                  return (
                    <Card
                      key={g.id}
                      className="bg-zinc-100 dark:bg-zinc-800 shadow-md rounded-xl p-4 border dark:border-zinc-600 border-zinc-300"
                    >
                      <div className="flex flex-col items-center text-center">
                        <img
                          src={
                            g.photo
                              ? URL.createObjectURL(g.photo)
                              : `https://ui-avatars.com/api/?name=${g.first_name}+${g.father_last_name}&background=random&size=64`
                          }
                          alt="avatar"
                          className="w-16 h-16 rounded-full mb-2"
                        />
                        <p className="font-semibold text-sm">
                          {g.first_name} {g.father_last_name}
                        </p>
                        <p className="text-sm dark:text-zinc-300 text-zinc-600">
                          {g.relationship_to_student}
                        </p>
                      </div>
                      <div className="mt-4 space-y-1 text-sm">
                        <div>
                          <strong>Email:</strong> {g.email}
                        </div>
                        <div>
                          <strong>Teléfono:</strong> {g.phone}
                        </div>
                        <div>
                          <strong>Activo:</strong> {g.is_active ? 'Sí' : 'No'}
                        </div>
                      </div>
                      <div className="flex justify-around items-center mt-4 border-t pt-2">
                        <Button
                          variant="solid"
                          color="blue"
                          size="sm"
                          icon="HeroEye"
                          onClick={() => navigate(`/administration/guardians/${g.id}`)}
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
              <Button variant="outline" color="blue" onClick={() => setVisibleCount(v => v + 8)}>
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

export default GuardianTable
