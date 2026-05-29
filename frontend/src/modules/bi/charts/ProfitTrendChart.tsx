'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from 'recharts';

interface Props {
  data: {
    month: string;
    profit: number;
  }[];
}

export default function ProfitTrendChart({
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
              id="profitGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#8B5CF6"
                stopOpacity={0.4}
              />
              <stop
                offset="95%"
                stopColor="#8B5CF6"
                stopOpacity={0.05}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />

          <XAxis
            dataKey="month"
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
            contentStyle={{
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow:
                '0 4px 12px rgba(0,0,0,0.08)',
            }}
          />

          <Area
            type="monotone"
            dataKey="profit"
            stroke="none"
            fill="url(#profitGradient)"
          />

          <Line
            type="monotone"
            dataKey="profit"
            stroke="#8B5CF6"
            strokeWidth={4}
            dot={{
              r: 5,
              fill: '#8B5CF6',
            }}
            activeDot={{
              r: 8,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}