import React, { useState } from 'react';
import Card, { CardHeader, CardBody } from '../../../../components/ui/Card';
import Icon from '../../../../components/icon/Icon';
import Badge from '../../../../components/ui/Badge';
import Button from '../../../../components/ui/Button';

// Datos ficticios de resultados
interface SubjectResult {
  subject: string;
  maxMarks: number;
  minMarks: number;
  obtained: number;
  result: 'Pass' | 'Fail';
}
interface TestResult {
  id: string;
  title: string;
  month: string;
  subjects: SubjectResult[];
  rank: number;
  totalMax: number;
  totalObtained: number;
  percentage: number;
  overallResult: 'Pass' | 'Fail';
}

const mockResults: TestResult[] = [
  {
    id: 'may',
    title: 'Monthly Test',
    month: 'May',
    subjects: [
      { subject: 'English (150)', maxMarks: 100, minMarks: 35, obtained: 65, result: 'Pass' },
      { subject: 'Mathematics (214)', maxMarks: 100, minMarks: 35, obtained: 73, result: 'Pass' },
      { subject: 'Physics (120)', maxMarks: 100, minMarks: 35, obtained: 55, result: 'Pass' },
      { subject: 'Chemistry (110)', maxMarks: 100, minMarks: 35, obtained: 90, result: 'Pass' },
      { subject: 'Spanish (140)', maxMarks: 100, minMarks: 35, obtained: 88, result: 'Pass' },
    ],
    rank: 30,
    totalMax: 500,
    totalObtained: 395,
    percentage: 79.5,
    overallResult: 'Pass',
  },
  {
    id: 'apr',
    title: 'Monthly Test',
    month: 'Apr',
    subjects: [
      { subject: 'English (150)', maxMarks: 100, minMarks: 35, obtained: 60, result: 'Pass' },
      { subject: 'Mathematics (214)', maxMarks: 100, minMarks: 35, obtained: 70, result: 'Pass' },
      { subject: 'Physics (120)', maxMarks: 100, minMarks: 35, obtained: 50, result: 'Pass' },
      { subject: 'Chemistry (110)', maxMarks: 100, minMarks: 35, obtained: 85, result: 'Pass' },
      { subject: 'Spanish (140)', maxMarks: 100, minMarks: 35, obtained: 92, result: 'Pass' },
    ],
    rank: 25,
    totalMax: 500,
    totalObtained: 357,
    percentage: 71.4,
    overallResult: 'Pass',
  },
];

export default function ResultStudents() {
  const [expandedId, setExpandedId] = useState<string | null>(mockResults[0].id);
  const [year, setYear] = useState('2024 / 2025');

  return (
    <div className="space-y-4 p-6">
      {/* Year selector */}
      <div className="flex justify-end">
        <select value={year} onChange={e => setYear(e.target.value)} className="border rounded px-2 py-1">
          <option>2023 / 2024</option>
          <option>2024 / 2025</option>
        </select>
      </div>

      {mockResults.map(test => {
        const isOpen = expandedId === test.id;
        return (
          <Card key={test.id}>
            <CardHeader
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setExpandedId(isOpen ? null : test.id)}
            >
              <div className="flex items-center space-x-2">
                <Badge variant="solid" color="green">
                  <Icon icon="HeroCheckCircle" />
                </Badge>
                <span className="font-semibold">{test.title} ({test.month})</span>
              </div>
              <Icon icon={isOpen ? 'HeroChevronUp' : 'HeroChevronDown'} />
            </CardHeader>
            {isOpen && (
              <CardBody>
                <table className="w-full text-left">
                  <thead className="bg-zinc-100">
                    <tr>
                      <th className="px-3 py-2">Subject</th>
                      <th className="px-3 py-2">Max Marks</th>
                      <th className="px-3 py-2">Min Marks</th>
                      <th className="px-3 py-2">Marks Obtained</th>
                      <th className="px-3 py-2">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {test.subjects.map((s, i) => (
                      <tr key={i} className="border-b">
                        <td className="px-3 py-2">{s.subject}</td>
                        <td className="px-3 py-2">{s.maxMarks}</td>
                        <td className="px-3 py-2">{s.minMarks}</td>
                        <td className="px-3 py-2">{s.obtained}</td>
                        <td className="px-3 py-2">
                          <Badge variant="outline" color={s.result === 'Pass' ? 'green' : 'red'}>
                            {s.result}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Summary Footer */}
                <div className="mt-4 bg-blue-900 text-white p-3 flex justify-between">
                  <span>Rank: {test.rank}</span>
                  <span>Total: {test.totalMax}</span>
                  <span>Marks Obtained: {test.totalObtained}</span>
                  <span>Percentage: {test.percentage.toFixed(2)}</span>
                  <span>Result: <span className={test.overallResult === 'Pass' ? 'text-green-400' : 'text-red-400'}>{test.overallResult}</span></span>
                </div>
              </CardBody>
            )}
          </Card>
        );
      })}
    </div>
  );
}