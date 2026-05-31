'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface Props {
  data: {
    name: string;
    amount: number;
  }[];
}

export default function RevenueExpenseChart({
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
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />

          <XAxis
            dataKey="name"
            tick={{
              fill: '#64748b',
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{
              fill: '#64748b',
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            formatter={(value) => [
              `₹${Number(value).toLocaleString()}`,
              'Amount',
            ]}
            contentStyle={{
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              boxShadow:
                '0 10px 25px rgba(0,0,0,0.08)',
            }}
          />

          <Bar
            dataKey="amount"
            shape={(props: any) => {
              const {
                x,
                y,
                width,
                height,
                payload,
              } = props;

              const fill =
                payload.name === 'Revenue'
                  ? '#3B82F6'
                  : '#EF4444';

              return (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  rx={12}
                  fill={fill}
                />
              );
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}