import React, { useState, useMemo } from 'react';
import Card, { CardBody, CardHeader } from '../../../../components/ui/Card';
import Badge from '../../../../components/ui/Badge';
import TableTemplate, { TableCardFooterTemplate } from '../../../../templates/common/TableParts.template';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

// Tipo Leave con datos ficticios
interface Leave {
  id: string;
  type: 'Medical' | 'Casual' | 'Maternity' | 'Paternity' | 'Special';
  start_date: string;
  end_date: string;
  days: number;
  applied_on: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

// Mock data ficticios
const mockLeaves: Leave[] = [
  { id: '1', type: 'Medical',    start_date: '2024-05-05', end_date: '2024-05-09', days: 5, applied_on: '2024-05-05', status: 'Approved' },
  { id: '2', type: 'Casual',     start_date: '2024-05-07', end_date: '2024-05-07', days: 1, applied_on: '2024-05-07', status: 'Approved' },
  { id: '3', type: 'Special',    start_date: '2024-05-09', end_date: '2024-05-09', days: 1, applied_on: '2024-05-09', status: 'Pending'  },
  { id: '4', type: 'Casual',     start_date: '2024-05-08', end_date: '2024-05-08', days: 1, applied_on: '2024-05-04', status: 'Approved' },
  { id: '5', type: 'Medical',    start_date: '2024-05-08', end_date: '2024-05-11', days: 4, applied_on: '2024-05-08', status: 'Pending'  },
];

export default function LeaveStudent() {
  // Estado de ordenamiento
  const [sorting, setSorting] = useState<SortingState>([]);

  // Resumen de usos por tipo
  const summary = useMemo(() => {
    const types: Array<'Medical' | 'Casual' | 'Maternity' | 'Paternity'> = [
      'Medical', 'Casual', 'Maternity', 'Paternity'
    ];
    return types.map(type => {
      const leavesOfType = mockLeaves.filter(l => l.type === type);
      const used       = leavesOfType.reduce((sum, l) => sum + l.days, 0);
      const defaultCap = type === 'Medical' ? 10 : type === 'Casual' ? 12 : 10;
      return { type, used, available: defaultCap - used };
    });
  }, []);

  // Columnas de la tabla
  const columnHelper = createColumnHelper<Leave>();
  const columns = [
    columnHelper.accessor('type', { header: 'Leave Type' }),
    columnHelper.display({
      id: 'leave_date',
      header: 'Leave Date',
      cell: ({ row }) => {
        const s = new Date(row.original.start_date)
          .toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' });
        const e = new Date(row.original.end_date)
          .toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' });
        return `${s} - ${e}`;
      },
    }),
    columnHelper.accessor('days', { header: 'No of Days' }),
    columnHelper.accessor('applied_on', {
      header: 'Applied On',
      cell: info =>
        new Date(info.getValue())
          .toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' }),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => {
        const status = info.getValue();
        const color  = status === 'Approved' ? 'emerald'
                     : status === 'Pending'  ? 'yellow'
                     : 'red';
        return <Badge 
          variant="outline" 
          //@ts-ignore
          color={color}>{status}</Badge>;
      },
    }),
  ];

  // Inicializamos la tabla
  const table = useReactTable({
    data: mockLeaves,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  return (
    <div className="space-y-6">
      {/* Resumen de tipos de retiro */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-4
        gap-4
      ">
        {summary.map(({ type, used, available }) => (
          <Card key={type} className="w-full">
            <CardBody>
              <div className="font-semibold text-lg mb-2">
                {type} Leave
              </div>
              <div className="flex justify-between text-sm">
                <span>Used: {used}</span>
                <span>Available: {available}</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Tabla de retiros */}
      <Card className="w-full">
        <CardHeader className="border-b-2 border-zinc-100 dark:border-zinc-800 pb-2">
          <h2 className="text-lg font-semibold">Retiros</h2>
        </CardHeader>
        {/* Hacemos el contenedor scrollable en móvil */}
        <CardBody className="overflow-x-auto">
          <div className="min-w-[600px]">
            <TableTemplate table={table} />
            <TableCardFooterTemplate table={table} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
