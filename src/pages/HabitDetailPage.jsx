import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Trash2, Loader2 } from 'lucide-react';
import API from '../api';

const HabitDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const res = await API.get(`/habits/${id}`);
        setHabit(res.data);
      } catch (err) {
        setError('Failed to load habit details.');
      } finally {
        setLoading(false);
      }
    };
    fetchHabit();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this habit?')) return;
    try {
      await API.delete(`/habits/${id}`);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to delete habit.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="flex items-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-6 font-bold"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
        </button>

        {error && (
          <div className="p-4 mb-6 rounded-md border-2 border-red-500 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-bold">
            {error}
          </div>
        )}

        {habit && (
          <div className="bg-white dark:bg-slate-900 rounded-md border-4 border-slate-900 dark:border-slate-100 p-8 shadow-[6px_6px_0_#0f172a] dark:shadow-[6px_6px_0_#e2e8f0]">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  {habit.title}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2 font-bold">
                  Created on {new Date(habit.created_at).toLocaleDateString()}
                </p>
              </div>
              <button 
                onClick={handleDelete}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors"
              >
                <Trash2 size={24} />
              </button>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center p-4 bg-slate-100 dark:bg-slate-800 rounded-md border-2 border-slate-900 dark:border-slate-700">
                <CheckCircle2 className="text-indigo-500 mr-4" size={32} />
                <div>
                  <p className="font-black text-slate-900 dark:text-white uppercase">Status</p>
                  <p className="text-slate-600 dark:text-slate-300 font-bold">{habit.is_active ? 'Active' : 'Archived'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitDetailPage;