import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart2 } from 'lucide-react';

const WeeklyChart = ({ data }) => {
  return (
    <div className='bg-white dark:bg-slate-900 rounded-md border-2 border-slate-900 dark:border-slate-100 p-5 shadow-[3px_3px_0_#0f172a] dark:shadow-[3px_3px_0_#e2e8f0]'>
      <h3 className='font-bold text-base uppercase tracking-wide text-slate-900 dark:text-white mb-4'>
        Weekly Completion Trend
      </h3>
      {(!data || data.length === 0) ? (
        <div className='h-[240px] flex flex-col items-center justify-center text-center gap-2 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-md'>
          <BarChart2 size={28} className='text-slate-300 dark:text-slate-600' />
          <p className='text-sm font-bold text-slate-500 dark:text-slate-400'>No activity logged yet</p>
          <p className='text-xs text-slate-400'>Mark habits complete to populate the chart</p>
        </div>
      ) : (
        <ResponsiveContainer width='100%' height={240}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray='3 3' stroke='#475569' strokeOpacity={0.2} />
            <XAxis dataKey='day' tick={{ fontSize: 11, fill: '#64748b', fontWeight: 'bold' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b', fontWeight: 'bold' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#0f172a', border: '2px solid #0f172a', borderRadius: '4px', color: '#f1f5f9', fontFamily: 'Space Grotesk' }} />
            <Bar dataKey='completions' fill='#6366f1' radius={[4, 4, 0, 0]} stroke='#0f172a' strokeWidth={2} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default WeeklyChart;