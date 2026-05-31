import { saveAs } from 'file-saver';

export function exportDashboardCsv(data: {
  totalEmployees: number;
  activeEmployees: number;
  presentToday: number;
  revenue: number;
  expenses: number;
  profit: number;
}) {
  const rows = [
    ['Metric', 'Value'],
    ['Total Employees', data.totalEmployees],
    ['Active Employees', data.activeEmployees],
    ['Present Today', data.presentToday],
    ['Revenue', data.revenue],
    ['Expenses', data.expenses],
    ['Profit', data.profit],
  ];

  const csv = rows
    .map((row) => row.join(','))
    .join('\n');

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  });

  saveAs(blob, 'amdox-bi-report.csv');
}