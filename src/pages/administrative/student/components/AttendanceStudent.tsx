import React, { useState, useMemo } from 'react';
import Card, { CardHeader, CardBody } from '../../../../components/ui/Card';
import Badge from '../../../../components/ui/Badge';
import Button from '../../../../components/ui/Button';
import Icon from '../../../../components/icon/Icon';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import TableTemplate, { TableCardFooterTemplate } from '../../../../templates/common/TableParts.template';

// Tipos de asistencia
type Status = 'Present' | 'Absent' | 'HalfDay' | 'Late' | 'Holiday';
const statusColors: Record<Status, { color: string; icon: string }> = {
  Present: { color: 'green', icon: 'HeroCheckCircle' },
  Absent:  { color: 'red',   icon: 'HeroXCircle'      },
  HalfDay: { color: 'blue',  icon: 'HeroAdjustmentsHorizontal' },
  Late:    { color: 'yellow',icon: 'HeroClock'        },
  Holiday: { color: 'indigo',icon: 'HeroCalendarDays' },
};

// Meses abreviados
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// Generar datos ficticios: 31 días y 12 meses
const generateMockData = () => {
  const rows: any[] = [];
  for (let day = 1; day <= 31; day++) {
    const row: any = { day: String(day).padStart(2, '0') };
    months.forEach(m => {
      const keys = Object.keys(statusColors) as Status[];
      row[m] = keys[Math.floor(Math.random() * keys.length)];
    });
    rows.push(row);
  }
  return rows;
};

export default function AttendanceStudent() {
  const [data] = useState(() => generateMockData());
  const [year, setYear] = useState('2024 / 2025');

  // Column helper
  const columnHelper = createColumnHelper<typeof data[0]>();

  // Definir columnas: día y meses
  const columns = useMemo(() => [
    columnHelper.accessor('day', { header: 'Date | Month' }),
    ...months.map(m =>
      columnHelper.accessor(m as any, {
        header: m,
        cell: ({ getValue }) => {
          const status = getValue() as Status;
          const { color, icon } = statusColors[status];
          return (
            <Badge 
              variant="solid" 
              //@ts-ignore
              color={color} 
              className="p-1">
              <Icon icon={icon} />
            </Badge>
          );
        },
      })
    ),
  ], []);

  // Tabla
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Cálculo resumen
  const summary = useMemo(() => {
    const count: Record<Status, number> = {
      Present:0, Absent:0, HalfDay:0, Late:0, Holiday:0
    };
    data.forEach(row =>
      months.forEach(m => count[row[m] as Status]++)
    );
    return count;
  }, [data]);

  return (
    <div className="space-y-6">
      {/* Resumen y controles */}
      <Card>
        <CardHeader className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <h2 className="text-lg font-semibold">Attendance</h2>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-2 w-full lg:w-auto">
            <span className="whitespace-nowrap">Last Updated on: 25 May 2024</span>
            <Button variant="outline" size="sm" icon="HeroArrowPath">Refresh</Button>
            <select
              value={year}
              onChange={e => setYear(e.target.value)}
              className="border rounded px-2 py-1 w-full sm:w-auto"
            >
              <option>2023 / 2024</option>
              <option>2024 / 2025</option>
            </select>
          </div>
        </CardHeader>

        <CardBody className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
          gap-4
          p-4
        ">
          {(['Present','Absent','HalfDay','Late','Holiday'] as Status[]).map(s => (
            <Card key={s} className="w-full">
              <CardBody className="flex items-center space-x-4">
                <Badge variant="outline" 
                  //@ts-ignore
                  color={statusColors[s].color}>
                  <Icon icon={statusColors[s].icon} />
                </Badge>
                <div>
                  <div className="font-semibold">{s}</div>
                  <div className="text-xl">{String(summary[s]).padStart(3,'0')}</div>
                </div>
              </CardBody>
            </Card>
          ))}
        </CardBody>
      </Card>

      {/* Leyenda y export */}
      <Card>
        <CardHeader className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {Object.entries(statusColors).map(([key, { color, icon }]) => (
              <Badge key={key} variant="outline" 
                //@ts-ignore
                color={color} className="flex items-center gap-1">
                <Icon icon={icon} /> {key}
              </Badge>
            ))}
          </div>
          <Button variant="outline" size="sm">Export</Button>
        </CardHeader>

        {/* Tabla scrollable */}
        <CardBody className="overflow-x-auto">
          <div className="min-w-[800px]">
            <TableTemplate table={table} />
            <TableCardFooterTemplate table={table} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
