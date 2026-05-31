'use client';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface Props {
  data: {
    date: string;
    present: number;
  }[];
}

export default function AttendanceTrendChart({
  data,
}: Props) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <AreaChart
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
              id="attendanceGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#3B82F6"
                stopOpacity={0.4}
              />
              <stop
                offset="100%"
                stopColor="#3B82F6"
                stopOpacity={0.03}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="#E2E8F0"
          />

          <XAxis
            dataKey="date"
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
            cursor={{
              stroke: '#3B82F6',
              strokeDasharray: '4 4',
            }}
            contentStyle={{
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              boxShadow:
                '0 10px 25px rgba(0,0,0,0.08)',
            }}
          />

          <Area
            type="monotone"
            dataKey="present"
            stroke="#2563EB"
            strokeWidth={3}
            fill="url(#attendanceGradient)"
            dot={{
              r: 4,
              fill: '#2563EB',
              strokeWidth: 2,
              stroke: '#fff',
            }}
            activeDot={{
              r: 7,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}