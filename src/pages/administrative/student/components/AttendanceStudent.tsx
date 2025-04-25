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
  Absent: { color: 'red', icon: 'HeroXCircle' },
  HalfDay: { color: 'blue', icon: 'HeroAdjustmentsHorizontal' },
  Late: { color: 'yellow', icon: 'HeroClock' },
  Holiday: { color: 'indigo', icon: 'HeroCalendarDays' },
};

// Meses abreviados
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// Generar datos ficticios: 31 días y 12 meses
const generateMockData = () => {
  const rows: any[] = [];
  for (let day = 1; day <= 31; day++) {
    const row: any = { day: String(day).padStart(2, '0') };
    months.forEach((m) => {
      // asigna estado aleatorio para ejemplo
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
    ...months.map((m) =>
      columnHelper.accessor(m as any, {
        header: m,
        cell: ({ getValue }) => {
          const status = getValue() as Status;
          const { color, icon } = statusColors[status];
          return (
            <Badge variant="solid" color={color} className="p-1">
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
    const count: Record<Status, number> = { Present:0, Absent:0, HalfDay:0, Late:0, Holiday:0 };
    data.forEach(row => months.forEach(m => count[row[m] as Status]++));
    return count;
  }, [data]);

  return (
    <div className="space-y-6">
      {/* Header con resumen y controles */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Attendance</h2>
          <div className="flex items-center space-x-4">
            <span>Last Updated on : 25 May 2024</span>
            <Button variant="outline" size="sm" icon="HeroArrowPath" />
            <select value={year} onChange={e => setYear(e.target.value)} className="border rounded px-2 py-1">
              <option>2023 / 2024</option>
              <option>2024 / 2025</option>
            </select>
          </div>
        </CardHeader>
        <CardBody className="grid grid-cols-5 gap-4">
          {(['Present','Absent','HalfDay','Late'] as Status[]).map((s) => (
            <Card key={s}>
              <CardBody className="flex items-center space-x-4">
                <Badge variant="outline" color={statusColors[s].color}>
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

      {/* Legend y tabla */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div className="space-x-2">
            {Object.entries(statusColors).map(([key, { color, icon }]) => (
              <Badge key={key} variant="outline" color={color} className="mr-2">
                <Icon icon={icon} /> {key}
              </Badge>
            ))}
          </div>
          <Button variant="outline" size="sm">Export</Button>
        </CardHeader>
        <CardBody>
          <TableTemplate table={table} />
          <TableCardFooterTemplate table={table} />
        </CardBody>
      </Card>
    </div>
  );
}
