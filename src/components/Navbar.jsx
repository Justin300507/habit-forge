import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Settings, LogOut, Target, Zap } from 'lucide-react';

const Navbar = ({ onLogout }) => {
  const navClass = ({ isActive }) =>
    isActive
      ? 'flex items-center gap-2.5 px-4 py-3 rounded-md text-sm font-bold border-2 border-slate-900 dark:border-slate-100 bg-indigo-500 text-white shadow-[2px_2px_0_#0f172a] dark:shadow-[2px_2px_0_#e2e8f0] transition-all duration-150'
      : 'flex items-center gap-2.5 px-4 py-3 rounded-md text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border-2 border-transparent transition-all duration-150';

  return (
    <aside className='w-64 bg-white dark:bg-slate-900 border-r-4 border-slate-900 dark:border-slate-100 flex flex-col px-4 py-6 fixed h-full z-10'>
      <div className='flex items-center gap-3 px-2 mb-8'>
        <div className='w-10 h-10 rounded-md bg-indigo-500 border-2 border-slate-900 dark:border-slate-100 flex items-center justify-center shadow-[2px_2px_0_#0f172a] dark:shadow-[2px_2px_0_#e2e8f0]'>
          <Zap size={20} className='text-white' />
        </div>
        <span className='font-black text-xl tracking-tight text-slate-900 dark:text-white'>
          HabitForge
        </span>
      </div>

      <nav className='flex-1 space-y-2'>
        <NavLink to='/dashboard' className={navClass}>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>
        <NavLink to='/settings' className={navClass}>
          <Settings size={18} /> Settings
        </NavLink>
      </nav>

      <div className='pt-4 border-t-2 border-slate-900 dark:border-slate-100'>
        <button
          onClick={onLogout}
          className='w-full flex items-center gap-2.5 px-4 py-3 rounded-md text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 border-2 border-transparent hover:border-red-600 dark:hover:border-red-400 transition-all duration-150'
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Navbar;