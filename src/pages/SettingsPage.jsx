import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, User, Shield, Bell, LogOut, Save } from 'lucide-react';
import API from '../api';

const parseError = (err) => {
  if (!err.response) return null;
  const detail = err.response?.data?.detail;
  if (!detail) return 'Something went wrong. Please try again.';
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) return detail.map(d => d.msg).join(', ');
  return 'Something went wrong. Please try again.';
};

const SettingsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  const [displayName, setDisplayName] = React.useState(localStorage.getItem('display_name') || '');
  const [email, setEmail] = React.useState(localStorage.getItem('user_email') || '');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('display_name');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    navigate('/login');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // In a real app, this would call a PUT /auth/me or /users/me endpoint
      // For now, we simulate the update and update local storage
      localStorage.setItem('display_name', displayName);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(parseError(err) || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col p-4 md:p-8'>
      <div className='max-w-4xl mx-auto w-full'>
        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 rounded-md bg-indigo-500 border-4 border-slate-900 dark:border-slate-100 flex items-center justify-center shadow-[4px_4px_0_#0f172a] dark:shadow-[4px_4px_0_#e2e8f0]'>
              <Zap size={24} className='text-white' />
            </div>
            <h1 className='text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight'>
              Settings
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className='flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-bold rounded-md border-2 border-slate-900 shadow-[4px_4px_0_#0f172a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all'
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='md:col-span-1 space-y-2'>
            <button className='w-full flex items-center gap-3 p-3 bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-100 font-bold text-slate-900 dark:text-white shadow-[4px_4px_0_#0f172a] dark:shadow-[4px_4px_0_#e2e8f0]'>
              <User size={20} /> Profile
            </button>
            <button className='w-full flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 font-bold text-slate-500 dark:text-slate-400 opacity-60 cursor-not-allowed'>
              <Shield size={20} /> Security
            </button>
            <button className='w-full flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 font-bold text-slate-500 dark:text-slate-400 opacity-60 cursor-not-allowed'>
              <Bell size={20} /> Notifications
            </button>
          </div>

          <div className='md:col-span-2'>
            <div className='bg-white dark:bg-slate-900 rounded-md border-4 border-slate-900 dark:border-slate-100 p-6 shadow-[8px_8px_0_#0f172a] dark:shadow-[8px_8px_0_#e2e8f0]'>
              <h2 className='text-xl font-black text-slate-900 dark:text-white uppercase mb-6'>Profile Information</h2>
              
              {error && (
                <div className='mb-4 p-3 rounded-md border-2 border-red-500 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-bold'>
                  {error}
                </div>
              )}

              {success && (
                <div className='mb-4 p-3 rounded-md border-2 border-green-500 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 text-xs font-bold'>
                  {success}
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className='space-y-6'>
                <div className='space-y-1'>
                  <label className='text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    disabled
                    value={email}
                    className='w-full p-3 bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-md text-slate-500 cursor-not-allowed font-medium'
                  />
                  <p className='text-[10px] text-slate-400 font-bold uppercase'>Email cannot be changed</p>
                </div>

                <div className='space-y-1'>
                  <label className='text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300'>
                    Display Name
                  </label>
                  <input
                    type='text'
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className='w-full p-3 bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-100 rounded-md focus:ring-0 focus:border-indigo-500 transition-colors font-bold text-slate-900 dark:text-white'
                  />
                </div>

                <button
                  type='submit'
                  disabled={loading}
                  className='w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-md border-2 border-slate-900 shadow-[4px_4px_0_#0f172a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50'
                >
                  {loading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;