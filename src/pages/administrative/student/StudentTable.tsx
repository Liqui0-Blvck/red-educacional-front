import React, { useEffect, useMemo, useState } from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { format } from '@formkit/tempo';

import PageWrapper from '../../../components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft, SubheaderRight } from '../../../components/layouts/Subheader/Subheader';
import Container from '../../../components/layouts/Container/Container';
import Card, { CardHeader, CardHeaderChild, CardTitle, CardBody } from '../../../components/ui/Card';
import FieldWrap from '../../../components/form/FieldWrap';
import Input from '../../../components/form/Input';
import Icon from '../../../components/icon/Icon';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import TableTemplate, { TableCardFooterTemplate } from '../../../templates/common/TableParts.template';
import { StudentList } from '../../../types/administrative/Student';
import { capitalizeFirstLetter } from '../../../utils/getCapitalize';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../components/ui/Modal';
import { useStudents } from '../services/students.api';

function StudentTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
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

  const { data: students = [], isLoading, isError, error } = useStudents();
  const navigate = useNavigate();
  const columnHelper = createColumnHelper<StudentList>();

  const columns = useMemo(() => [
    columnHelper.accessor('dni', {
      cell: (info) => <span>{info.row.original.dni}</span>,
      header: 'RUN',
    }),
    columnHelper.accessor('first_name', {
      cell: (info) => <span>{capitalizeFirstLetter(info.row.original.first_name.toLowerCase())}</span>,
      header: 'Nombre',
    }),
    columnHelper.accessor('last_name', {
      cell: (info) => <span>{capitalizeFirstLetter(info.row.original.last_name.toLowerCase())}</span>,
      header: 'Segundo Nombre',
    }),
    columnHelper.accessor('father_last_name', {
      cell: (info) => <span>{capitalizeFirstLetter(info.row.original.father_last_name.toLowerCase())}</span>,
      header: 'Apellido Paterno',
    }),
    columnHelper.accessor('mother_last_name', {
      cell: (info) => <span>{capitalizeFirstLetter(info.row.original.mother_last_name.toLowerCase())}</span>,
      header: 'Apellido Materno',
    }),
    columnHelper.accessor('course', {
      cell: (info) => <span>{info.row.original.course}</span>,
      header: 'Curso',
    }),
    columnHelper.accessor('date_of_birth', {
      cell: (info) => <span>{format(info.row.original.date_of_birth, { date: 'short' }, 'es')}</span>,
      header: 'Fecha Nacimiento',
    }),
    columnHelper.display({
      id: 'acciones',
      header: 'Acciones',
      cell: (info) => (
        <Button
          variant='solid'
          color='blue'
          size='lg'
          icon='HeroEye'
          onClick={() => navigate(`/administracion/estudiantes/${info.row.original.id}`)}/>
      ),
    }),
  ], [navigate]);

  const table = useReactTable({
    data: students,
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

  if (isLoading) return <p>Cargando estudiantes...</p>;
  if (isError) return <p>Error al cargar estudiantes: {(error as Error).message}</p>;

  return (
    <PageWrapper name='Lista Estudiantes'>
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
              id='search'
              name='search'
              placeholder='Buscar estudiante...'
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </FieldWrap>
        </SubheaderLeft>
        <SubheaderRight>
          <Button 
            variant='solid'
            color='blue'  
            icon='HeroPlus'
            onClick={() => navigate(`/administracion/estudiantes/`)}
          >
            Añadir Estudiante
          </Button>
        </SubheaderRight>
      </Subheader>

      <Container breakpoint={null} className='w-full'>
        <Card className='h-full'>
          <CardHeader>
            <CardHeaderChild>
              <CardTitle>Estudiantes</CardTitle>
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
                  const student = row.original;
                  return (
                    <div 
                      key={student.id}
                      className='dark:bg-zinc-800 bg-zinc-100 shadow-md rounded-xl p-4 border dark:border-zinc-500 border-zinc-300'>
                      <div className='flex justify-between items-start mb-2'>
                        <span className='text-blue-700 font-semibold text-sm cursor-pointer'>AD{String(student.id).slice(-6)}</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${student.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {student.status ? '● Active' : '● Inactive'}
                        </span>
                      </div>
                      <div className='flex flex-col items-center text-center'>
                        <img
                          src={`https://ui-avatars.com/api/?name=${student.first_name}+${student.last_name}&background=random&size=64`}
                          alt='avatar'
                          className='w-16 h-16 rounded-full mb-2'
                        />
                        <p className='font-semibold text-sm'>{student.first_name} {student.last_name}</p>
                        <p className='text-sm dark:text-zinc-300 text-zinc-600'>{student.course ?? 'Sin curso'}</p>
                      </div>
                      <div className='flex justify-between text-xs dark:text-zinc-300 text-zinc-600 mt-4'>
                        <div className='text-center text-sm'>
                          <p className='font-medium'>RUN</p>
                          <p>{student.dni}</p>
                        </div>
                        <div className='text-center text-sm'>
                          <p className='font-medium'>Género</p>
                          <p>{student.gender === 'male' ? 'Masculino' : student.gender === 'female' ? 'Femenino' : 'Otro'}</p>
                        </div>
                        <div className='text-center text-sm'>
                          <p className='font-medium'>Ingreso</p>
                          <p>{student.entry_date ? format(student.entry_date, { date: 'short' }, 'es') : '-'}</p>
                        </div>
                      </div>
                      <div className='flex justify-around items-center mt-4 border-t pt-2'>
                       <Button
                          className='w-24'
                          variant='solid'
                          color='blue'
                          size='lg'
                          icon='HeroEye'
                          onClick={() => navigate(`/administracion/estudiantes/${student.id}`)}
                          >
                       </Button>

                       <Button
                          className='w-24'
                          variant='solid'
                          color='blue'
                          size='lg'
                          icon='HeroPhone'
                          >
                       </Button>

                       <Button
                          className='w-24'
                          variant='solid'
                          color='blue'
                          size='lg'
                          icon='HeroEnvelope'
                          >
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
              <Button variant='outline' onClick={() => setVisibleCount((prev) => prev + 8)} color='blue'>Ver más</Button>
            </div>
          )}

          {viewMode === 'table' && <TableCardFooterTemplate table={table} />}
        </Card>
      </Container>
    </PageWrapper>
  );
}

export default StudentTable;
