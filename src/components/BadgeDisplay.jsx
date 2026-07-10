import React from 'react';
import { Star, Award, Zap, Target } from 'lucide-react';

const BadgeDisplay = ({ badges }) => {
  const getIcon = (name) => {
    if (name.toLowerCase().includes('streak')) return <Zap size={18} />;
    if (name.toLowerCase().includes('first')) return <Star size={18} />;
    return <Award size={18} />;
  };

  return (
    <div className='bg-white dark:bg-slate-900 rounded-md border-2 border-slate-900 dark:border-slate-100 p-5 shadow-[3px_3px_0_#0f172a] dark:shadow-[3px_3px_0_#e2e8f0]'>
      <div className='flex items-center gap-2 mb-4'>
        <span className='live-dot' />
        <h3 className='font-bold text-base uppercase tracking-wide text-slate-900 dark:text-white'>
          Earned Badges
        </h3>
      </div>

      {badges.length === 0 ? (
        <div className='text-center py-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-md'>
          <Award size={32} className='mx-auto text-slate-300 dark:text-slate-600 mb-2' />
          <p className='text-xs font-bold text-slate-500 dark:text-slate-400'>No badges earned yet</p>
          <p className='text-[10px] text-slate-400 mt-1'>Complete habits to unlock achievements!</p>
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-3'>
          {badges.map((badge, index) => (
            <div
              key={badge.id || index}
              style={{ animationDelay: `${index * 40}ms` }}
              className='animate-fade-in-up flex items-center gap-2.5 p-2.5 rounded-md border-2 border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 shadow-[1px_1px_0_#0f172a] dark:shadow-[1px_1px_0_#e2e8f0]'
            >
              <div className='bg-indigo-500 text-white p-1.5 rounded-md border border-slate-900 dark:border-slate-100'>
                {getIcon(badge.name)}
              </div>
              <div>
                <p className='text-xs font-bold text-slate-900 dark:text-white line-clamp-1'>
                  {badge.name}
                </p>
                <p className='text-[9px] text-slate-500 dark:text-slate-400'>
                  {badge.earned_at ? new Date(badge.earned_at).toLocaleDateString() : 'Just now'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BadgeDisplay;