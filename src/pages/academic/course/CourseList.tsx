import React, { useState, useMemo, useEffect } from 'react';
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
  SubheaderRight,
} from '../../../components/layouts/Subheader/Subheader';
import FieldWrap from '../../../components/form/FieldWrap';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/layouts/Container/Container';
import PageWrapper from '../../../components/layouts/PageWrapper/PageWrapper';
import { Course } from '../../../types/academic/course';
import { useCourses } from '../../../api/courses.api';
import { HeroEye } from '../../../components/icon/heroicons';

function CourseList() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode('grid'); // Forzar grid en móviles
      }
    };
  
    handleResize(); // Corre al montar
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = useNavigate();
  const columnHelper = createColumnHelper<Course>();
  const { data: courses = [], isLoading, isError, error } = useCourses();

  

  const columns = useMemo(() => [
    columnHelper.accessor('grade', {
      cell: (info) => <span>{info.row.original.grade}</span>,
      header: 'Grado',
    }),
    columnHelper.accessor('count_of_students', {
      cell: (info) => <span>{info.row.original.count_of_students}</span>,
      header: 'N° Alumnos',
    }),
    columnHelper.accessor('shift', {
      cell: (info) => <span>{info.row.original.shift}</span>,
      header: 'Turno',
    }),
    columnHelper.accessor('head_teacher.name', {
      cell: (info) => (
        <span>
          {info.row.original.head_teacher?.name ?? 'Sin Asignar'}
        </span>
      ),
      header: 'Profesor Jefe',
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
    data: courses,
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
    <PageWrapper name='Lista Cursos'>
      <Subheader>
        <SubheaderLeft>
          <FieldWrap
            className="md:w-full sm:w-full w-full"
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
              placeholder='Cursos...'
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
              <CardTitle>Cursos</CardTitle>
              <Badge
                variant='outline'
                className='border-transparent px-4'
                rounded='rounded-full'>
                {table.getFilteredRowModel().rows.length} items
              </Badge>
            </CardHeaderChild>
            <CardHeaderChild>
            {
                window.innerWidth > 760 && (
                  <>
                  <Button
                    variant={viewMode === 'table' ? 'solid' : 'outline'}
                    color='blue'
                    icon='HeroTableCells'
                    size='lg'
                    onClick={() => setViewMode('table')}/>

                  <Button
                    variant={viewMode === 'grid' ? 'solid' : 'outline'}
                    color='blue'
                    icon='HeroSquares2X2'
                    size='lg'
                    onClick={() => setViewMode('grid')}/>
                  </>
                )
              }
            </CardHeaderChild>
          </CardHeader>

          <CardBody className='overflow-auto'>
            {viewMode === 'table' ? (
              <TableTemplate className='table-fixed max-md:min-w-[70rem]' table={table} />
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                {table.getFilteredRowModel().rows.slice(0, visibleCount).map((row) => {
                  const course = row.original;
                  return (
                    <div key={course.id} className='dark:bg-zinc-800 bg-zinc-200 shadow-md rounded-xl p-4 border border-zinc-500'>
                      <div className='flex justify-between items-center mb-2'>
                        <span className='text-indigo-400 font-semibold text-sm'>Curso ID: {course.id}</span>
                        <span className='text-sm font-medium text-gray-200'>{course.shift}</span>
                      </div>

                      <div className='text-center'>
                        <p className='text-lg font-semibold'>{course.grade}</p>
                        <p className='text-sm text-zinc-400'>Turno: {course.shift}</p>
                      </div>

                      <div className='text-sm mt-4'>
                        <p><strong>Profesor Jefe:</strong> {course.head_teacher?.name ?? 'Sin asignar'}</p>
                        <p><strong>N° Alumnos:</strong> {course.count_of_students}</p>
                      </div>

                      <div className='flex justify-center mt-4'>
                        <Button
                          size='sm'
                          variant='solid'
                          color='blue'
                          onClick={() => navigate(`ejercicio/${course.id}`)}>
                          Ver detalles
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardBody>

          {viewMode === 'grid' && table.getFilteredRowModel().rows.length > visibleCount && (
            <div className='flex justify-center p-4'>
              <Button onClick={() => setVisibleCount((prev) => prev + 8)} color='blue'>Ver más</Button>
            </div>
          )}

          {viewMode === 'table' && <TableCardFooterTemplate table={table} />}
        </Card>
      </Container>
    </PageWrapper>
  );
}

export default CourseList;
