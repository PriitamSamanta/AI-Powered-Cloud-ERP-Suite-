'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface Props {
  data: {
    type: string;
    count: number;
  }[];
}

const COLORS = [
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
];

export default function LeaveDistributionChart({
  data,
}: Props) {
  const total = data.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="type"
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={105}
            paddingAngle={4}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => [
              `${value} Employees`,
              'Count',
            ]}
            contentStyle={{
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              boxShadow:
                '0 10px 25px rgba(0,0,0,0.08)',
            }}
          />

          <Legend />

          <text
            x="50%"
            y="46%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-500 text-xs"
          >
            Total
          </text>

          <text
            x="50%"
            y="56%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-900 text-lg font-bold"
          >
            {total}
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}