import React from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

const LogHistoryTable = ({ logs }) => {
  return (
    <div className='bg-white dark:bg-slate-900 rounded-md border-2 border-slate-900 dark:border-slate-100 p-5 shadow-[3px_3px_0_#0f172a] dark:shadow-[3px_3px_0_#e2e8f0]'>
      <div className='flex items-center gap-2 mb-4'>
        <span className='live-dot' />
        <h3 className='font-bold text-base uppercase tracking-wide text-slate-900 dark:text-white'>
          Completion History
        </h3>
      </div>

      {logs.length === 0 ? (
        <div className='text-center py-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-md'>
          <Calendar size={28} className='mx-auto text-slate-300 dark:text-slate-600 mb-2' />
          <p className='text-xs font-bold text-slate-500 dark:text-slate-400'>No logs recorded yet</p>
        </div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='border-b-2 border-slate-900 dark:border-slate-100'>
                <th className='pb-2 text-xs font-bold uppercase text-slate-500 dark:text-slate-400'>Date</th>
                <th className='pb-2 text-xs font-bold uppercase text-slate-500 dark:text-slate-400'>Time</th>
                <th className='pb-2 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 text-right'>Status</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-200 dark:divide-slate-800'>
              {logs.map((log, index) => {
                const dateObj = new Date(log.completed_at);
                return (
                  <tr
                    key={log.id || index}
                    style={{ animationDelay: `${index * 30}ms` }}
                    className='animate-fade-in-up'
                  >
                    <td className='py-3 text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5'>
                      <Calendar size={14} className='text-slate-400' />
                      {dateObj.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                    </td>
                    <td className='py-3 text-sm text-slate-500 dark:text-slate-400'>
                      <span className='inline-flex items-center gap-1'>
                        <Clock size={12} />
                        {dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                    <td className='py-3 text-right'>
                      <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-500'>
                        <CheckCircle size={12} /> Completed
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LogHistoryTable;