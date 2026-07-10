import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import API from '../api';

const parseError = (err) => {
  if (!err.response) return null;
  const detail = err.response?.data?.detail;
  if (!detail) return 'Something went wrong. Please try again.';
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) return detail.map(d => d.msg).join(', ');
  return 'Something went wrong. Please try again.';
};

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [status, setStatus] = React.useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        setStatus(attempt === 1 ? 'Signing in...' : `Starting up... retrying (${attempt}/3)`);
        const res = await API.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.access_token);
        if (res.data.display_name) localStorage.setItem('display_name', res.data.display_name);
        if (res.data.user_id) localStorage.setItem('user_id', String(res.data.user_id));
        if (res.data.email) localStorage.setItem('user_email', res.data.email);
        navigate('/dashboard');
        return;
      } catch (err) {
        const msg = parseError(err);
        if (msg) { setError(msg); setStatus(null); setLoading(false); return; }
        if (attempt < 3) {
          setStatus(`Backend starting up... retrying in 15s (${attempt}/3)`);
          await sleep(15000);
        }
      }
    }
    setError('Backend took too long. Wait 30 seconds then try again.');
    setLoading(false);
  };

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden'>
      <div className='w-full max-w-sm animate-fade-in-up'>
        <div className='text-center mb-8'>
          <div className='w-14 h-14 rounded-md bg-indigo-500 border-4 border-slate-900 dark:border-slate-100 mx-auto mb-4 flex items-center justify-center shadow-[4px_4px_0_#0f172a] dark:shadow-[4px_4px_0_#e2e8f0]'>
            <Zap size={28} className='text-white' />
          </div>
          <h1 className='text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight'>
            HabitForge
          </h1>
          <p className='text-slate-500 dark:text-slate-400 text-sm font-bold mt-1'>
            Forge habits that stick.
          </p>
        </div>

        <div className='bg-white dark:bg-slate-900 rounded-md border-4 border-slate-900 dark:border-slate-100 p-6 shadow-[6px_6px_0_#0f172a] dark:shadow-[6px_6px_0_#e2e8f0] space-y-4'>
          {error && (
            <div className='p-3 rounded-md border-2 border-red-500 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-bold'>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className='space-y-4'>
            <div className='space-y-1'>
              <label className='text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300'>
                Email Address
              </label>
              <input
                type='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='you@example.com'
                className='w-full px-3 py-2 rounded-md border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
              />
            </div>

            <div className='space-y-1'>
              <label className='text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300'>
                Password
              </label>
              <input
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='••••••••'
                className='w-full px-3 py-2 rounded-md border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
              />
            </div>

            <button
              type='submit'
              disabled={loading || !email || !password}
              className='w-full py-2.5 rounded-md border-2 border-slate-900 dark:border-slate-100 bg-indigo-500 text-white font-bold shadow-[3px_3px_0_#0f172a] dark:shadow-[3px_3px_0_#e2e8f0] hover:shadow-[4px_4px_0_#0f172a] dark:hover:shadow-[4px_4px_0_#e2e8f0] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none transition-all duration-100'
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {loading && status && (
            <p className='text-center text-xs font-bold text-slate-500 dark:text-slate-400 animate-pulse'>
              {status}
            </p>
          )}
        </div>

        <p className='text-center text-sm font-bold text-slate-500 mt-6'>
          Don't have an account?{' '}
          <Link to='/register' className='text-indigo-500 hover:underline'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;