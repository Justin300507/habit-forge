import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Activity, Target, Flame, CheckCircle2, Plus } from 'lucide-react';
import API from '../api';

const parseError = (err) => {
  if (!err.response) return null;
  const detail = err.response?.data?.detail;
  if (!detail) return 'Something went wrong. Please try again.';
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) return detail.map(d => d.msg).join(', ');
  return 'Something went wrong. Please try again.';
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const displayName = localStorage.getItem('display_name') || 'User';

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await API.get('/stats/summary');
      // Backend returns aggregate counts and key metrics
      setStats(res.data);
      setError(null);
    } catch (err) {
      setError(parseError(err));
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className='min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin'></div>
          <p className='text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs'>Forging Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Header Section */}
        <div className='flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4'>
          <div>
            <h1 className='text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight'>
              Welcome back, <span className='text-indigo-500'>{displayName}</span>
            </h1>
            <p className='text-slate-500 dark:text-slate-400 font-bold mt-1'>
              Here is your progress for today.
            </p>
          </div>
          <button 
            onClick={() => navigate('/habits/new')}
            className='flex items-center justify-center gap-2 bg-indigo-500 text-white font-black px-6 py-3 rounded-md border-4 border-slate-900 dark:border-slate-100 shadow-[4px_4px_0_#0f172a] dark:shadow-[4px_4px_0_#e2e8f0] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase text-sm'
          >
            <Plus size={20} />
            New Habit
          </button>
        </div>

        {error && (
          <div className='mb-6 p-4 rounded-md border-2 border-red-500 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-bold'>
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
          <StatCard 
            label='Total Habits' 
            value={stats?.total_habits || 0} 
            icon={<Zap className='text-yellow-500' />} 
          />
          <StatCard 
            label='Active Today' 
            value={stats?.active_today || 0} 
            icon={<Activity className='text-blue-500' />} 
          />
          <StatCard 
            label='Completion Rate' 
            value={`${stats?.completion_rate || 0}%`} 
            icon={<CheckCircle2 className='text-green-500' />} 
          />
          <StatCard 
            label='Current Streak' 
            value={stats?.current_streak || 0} 
            icon={<Flame className='text-orange-500' />} 
          />
        </div>

        {/* Main Content Area */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 space-y-6'>
            <div className='bg-white dark:bg-slate-800 rounded-md border-4 border-slate-900 dark:border-slate-100 p-6 shadow-[6px_6px_0_#0f172a] dark:shadow-[6px_6px_0_#e2e8f0]'>
              <h2 className='text-xl font-black text-slate-900 dark:text-white uppercase mb-4 flex items-center gap-2'>
                <Target size={24} className='text-indigo-500' />
                Daily Objectives
              </h2>
              <div className='space-y-4'>
                {/* This section would typically map over a list of daily habits */}
                <p className='text-slate-500 dark:text-slate-400 text-sm italic'>
                  No habits scheduled for this time. Start by creating a new one!
                </p>
              </div>
            </div>
          </div>

          <div className='space-y-6'>
            <div className='bg-indigo-50 dark:bg-indigo-900/20 rounded-md border-4 border-indigo-500 p-6 shadow-[6px_6px_0_#4f46e5]'>
              <h3 className='text-lg font-black text-indigo-900 dark:text-indigo-100 uppercase mb-2'>
                Forge Tip
              </h3>
              <p className='text-indigo-700 dark:text-indigo-300 text-sm font-medium'>
                Consistency is the key to mastery. Try to complete your habits at the same time every day to build lasting neural pathways.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon }) => (
  <div className='bg-white dark:bg-slate-800 rounded-md border-4 border-slate-900 dark:border-slate-100 p-5 shadow-[6px_6px_0_#0f172a] dark:shadow-[6px_6px_0_#e2e8f0] flex items-center gap-4'>
    <div className='w-12 h-12 rounded-md bg-slate-50 dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-100 flex items-center justify-center shadow-[2px_2px_0_#0f172a] dark:shadow-[2px_2px_0_#e2e8f0]'>
      {icon}
    </div>
    <div>
      <p className='text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider'>{label}</p>
      <p className='text-2xl font-black text-slate-900 dark:text-white'>{value}</p>
    </div>
  </div>
);

export default DashboardPage;