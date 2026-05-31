'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface Props {
  data: {
    department: string;
    count: number;
  }[];
}

export default function EmployeesByDepartmentChart({
  data,
}: Props) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id="employeeBarGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#2563EB"
              />
              <stop
                offset="100%"
                stopColor="#60A5FA"
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="#E2E8F0"
          />

          <XAxis
            dataKey="department"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: '#64748B',
              fontSize: 12,
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: '#64748B',
              fontSize: 12,
            }}
          />

          <Tooltip
            formatter={(value) => [
              `${value} Employees`,
              'Count',
            ]}
            cursor={{
              fill: '#F8FAFC',
            }}
            contentStyle={{
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              boxShadow:
                '0 10px 25px rgba(0,0,0,0.08)',
            }}
          />

          <Bar
            dataKey="count"
            fill="url(#employeeBarGradient)"
            radius={[12, 12, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}