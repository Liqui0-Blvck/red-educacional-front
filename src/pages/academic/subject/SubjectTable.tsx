import React, { useState, useMemo } from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import Card, {
  CardBody,
  CardHeader,
  CardHeaderChild,
  CardTitle,
} from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/form/Input';
import TableTemplate, {
  TableCardFooterTemplate,
} from '../../../templates/common/TableParts.template';
import Badge from '../../../components/ui/Badge';
import Subheader, {
  SubheaderLeft,
} from '../../../components/layouts/Subheader/Subheader';
import FieldWrap from '../../../components/form/FieldWrap';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/layouts/Container/Container';
import PageWrapper from '../../../components/layouts/PageWrapper/PageWrapper';
import { Course } from '../../../types/academic/course';
import { HeroEye } from '../../../components/icon/heroicons';
import { useSubjects } from '../../../api/subject.api';
import { Subject } from '../../../types/academic/subject';

function SubjectTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');


  const navigate = useNavigate();
  const columnHelper = createColumnHelper<Subject>();

  const { data: subjects = [], isLoading, isError, error } = useSubjects();
  console.log(subjects)


  const columns = useMemo(() => [
    columnHelper.accessor('code', {
      cell: (info) => <span>{info.row.original.code}</span>,
      header: 'Código',
    }),
    columnHelper.accessor('name', {
      cell: (info) => <span>{info.row.original.name}</span>,
      header: 'Nombre Asignatura',
    }),
    columnHelper.accessor('description', {
      cell: (info) => <span>{info.row.original.description}</span>,
      header: 'Descripción',
    }),
    columnHelper.display({
      id: 'acciones',
      header: 'Acciones',
      cell: (info) => (
        <div className='flex items-center justify-center'>
          <Button
            variant='solid'
            title='Ver'
            color='blue'
            onClick={() => navigate(`ejercicio/${info.row.original.id}`)}>
            <HeroEye style={{ fontSize: 20 }} />
          </Button>
        </div>
      ),
    }),
  ], [navigate]);

  const table = useReactTable({
    data: subjects,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    enableGlobalFilter: true,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 5 },
    },
  });

  if (isLoading) return <p>Cargando cursos...</p>;
  if (isError) return <p>Error al cargar cursos: {(error as Error).message}</p>;

  return (
    <PageWrapper name='Lista Asignaturas'>
      <Subheader>
        <SubheaderLeft>
          <FieldWrap
            firstSuffix={<Icon className='mx-2' icon='HeroMagnifyingGlass' />}
            lastSuffix={
              globalFilter && (
                <Icon
                  icon='HeroXMark'
                  color='red'
                  className='mx-2 cursor-pointer'
                  onClick={() => setGlobalFilter('')}
                />
              )
            }>
            <Input
              id='example'
              name='example'
              placeholder='Asignatura...'
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </FieldWrap>
        </SubheaderLeft>
      </Subheader>
      <Container breakpoint={null} className='w-full'>
        <Card className='h-full'>
          <CardHeader>
            <CardHeaderChild>
              <CardTitle>Asignaturas</CardTitle>
              <Badge
                variant='outline'
                className='border-transparent px-4'
                rounded='rounded-full'>
                {table.getFilteredRowModel().rows.length} items
              </Badge>
            </CardHeaderChild>
          </CardHeader>
          <CardBody className='overflow-auto'>
            <TableTemplate className='table-fixed max-md:min-w-[70rem]' table={table} />
          </CardBody>
          <TableCardFooterTemplate table={table} />
        </Card>
      </Container>
    </PageWrapper>
  );
}

export default SubjectTable;
