// === FILE: src/components/charts/ActivityBarChart.tsx ===
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

interface DataPoint { day?: string; date?: string; sessions?: number; bookings?: number; }

interface ActivityBarChartProps {
  data: DataPoint[];
  xKey?: string;
  dataKey?: string;
  height?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-border rounded-lg px-3 py-2 shadow-card-hover">
        <p className="font-inter text-xs text-text-secondary">{label}</p>
        <p className="font-barlow font-bold text-lg text-accent">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export const ActivityBarChart: React.FC<ActivityBarChartProps> = ({
  data, xKey = 'day', dataKey = 'sessions', height = 220,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} barCategoryGap="35%" margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
        <XAxis
          dataKey={xKey}
          tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#94A3B8' }}
          axisLine={false} tickLine={false}
        />
        <YAxis
          tick={{ fontFamily: 'Inter', fontSize: 11, fill: '#94A3B8' }}
          axisLine={false} tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#FFF0EB' }} />
        <Bar dataKey={dataKey} fill="#FF4D00" radius={[6, 6, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
};
