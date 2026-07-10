import React from 'react';
import { Plus, X } from 'lucide-react';

const HabitForm = ({ onSubmit, onClose }) => {
  const [name, setName] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit({ name });
      setName('');
    } catch (err) {
      // Handled by parent
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='animate-scale-in bg-white dark:bg-slate-900 rounded-md border-4 border-slate-900 dark:border-slate-100 p-6 shadow-[6px_6px_0_#0f172a] dark:shadow-[6px_6px_0_#e2e8f0] max-w-md w-full relative'>
      <button
        onClick={onClose}
        className='absolute top-4 right-4 p-1 rounded-md border-2 border-slate-900 dark:border-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
      >
        <X size={16} />
      </button>

      <h3 className='text-xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight'>
        Forge New Habit
      </h3>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='space-y-1'>
          <label className='text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300'>
            Habit Name
          </label>
          <input
            type='text'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='e.g. Read 15 pages, Drink 3L water'
            className='w-full px-3 py-2 rounded-md border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
          />
        </div>

        <div className='flex gap-3 pt-2'>
          <button
            type='button'
            onClick={onClose}
            className='flex-1 py-2 rounded-md border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-100'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={submitting || !name.trim()}
            className='flex-1 py-2 rounded-md border-2 border-slate-900 dark:border-slate-100 bg-indigo-500 text-white font-bold shadow-[3px_3px_0_#0f172a] dark:shadow-[3px_3px_0_#e2e8f0] hover:shadow-[4px_4px_0_#0f172a] dark:hover:shadow-[4px_4px_0_#e2e8f0] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none transition-all duration-100 flex items-center justify-center gap-1.5'
          >
            <Plus size={16} /> {submitting ? 'Forging...' : 'Forge Habit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HabitForm;