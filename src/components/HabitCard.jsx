import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, ChevronRight, Star, Trash2 } from 'lucide-react';

const HabitCard = ({ habit, index, onComplete, onDelete }) => {
  return (
    <div
      style={{ animationDelay: `${index * 40}ms` }}
      className='animate-fade-in-up bg-white dark:bg-slate-900 rounded-md border-2 border-slate-900 dark:border-slate-100 p-5 shadow-[3px_3px_0_#0f172a] dark:shadow-[3px_3px_0_#e2e8f0] hover:shadow-[5px_5px_0_#0f172a] dark:hover:shadow-[5px_5px_0_#e2e8f0] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 flex flex-col justify-between h-full'
    >
      <div>
        <div className='flex items-start justify-between mb-3'>
          <h4 className='font-bold text-lg text-slate-900 dark:text-white tracking-tight line-clamp-1'>
            {habit.name}
          </h4>
          <div className='bg-indigo-500 text-white p-1.5 rounded-md border border-slate-900 dark:border-slate-100 shadow-[1px_1px_0_#0f172a]'>
            <Star size={14} />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2 mb-4'>
          <div className='bg-slate-50 dark:bg-slate-800 p-2 rounded border border-slate-900 dark:border-slate-100'>
            <p className='text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400'>Current Streak</p>
            <p className='text-lg font-black text-indigo-600 dark:text-indigo-400'>{habit.current_streak} days</p>
          </div>
          <div className='bg-slate-50 dark:bg-slate-800 p-2 rounded border border-slate-900 dark:border-slate-100'>
            <p className='text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400'>Longest Streak</p>
            <p className='text-lg font-black text-slate-700 dark:text-slate-300'>{habit.longest_streak} days</p>
          </div>
        </div>
      </div>

      <div className='flex items-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-800'>
        <button
          onClick={() => onComplete(habit.id)}
          className='flex-1 py-2 px-3 rounded-md border-2 border-slate-900 dark:border-slate-100 bg-indigo-500 text-white font-bold text-xs shadow-[2px_2px_0_#0f172a] dark:shadow-[2px_2px_0_#e2e8f0] hover:shadow-[3px_3px_0_#0f172a] dark:hover:shadow-[3px_3px_0_#e2e8f0] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all duration-100 flex items-center justify-center gap-1'
        >
          <CheckSquare size={14} /> Complete
        </button>
        <Link
          to={`/habits/${habit.id}`}
          className='p-2 rounded-md border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-[2px_2px_0_#0f172a] dark:shadow-[2px_2px_0_#e2e8f0] transition-all duration-100'
        >
          <ChevronRight size={14} />
        </Link>
        <button
          onClick={() => onDelete(habit.id)}
          className='p-2 rounded-md border-2 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-100'
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default HabitCard;