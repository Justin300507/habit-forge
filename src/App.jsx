import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HabitDetailPage from './pages/HabitDetailPage';
import SettingsPage from './pages/SettingsPage';

const PrivateRoute = ({ children }) => {
  return localStorage.getItem('token') ? children : <Navigate to='/login' replace />;
};

function AppRoutes() {
  const navigate = useNavigate();
  const [dark, setDark] = React.useState(() => localStorage.getItem('theme') === 'dark');

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const onLogout = () => {
    ['token', 'display_name', 'user_id', 'user_email'].forEach(k => localStorage.removeItem(k));
    navigate('/login');
  };

  const pageProps = { dark, setDark, onLogout };

  return (
    <Routes>
      <Route path='/login' element={<LoginPage {...pageProps} />} />
      <Route path='/register' element={<RegisterPage {...pageProps} />} />
      <Route path='/dashboard' element={<PrivateRoute><DashboardPage {...pageProps} /></PrivateRoute>} />
      <Route path='/habits/:id' element={<PrivateRoute><HabitDetailPage {...pageProps} /></PrivateRoute>} />
      <Route path='/settings' element={<PrivateRoute><SettingsPage {...pageProps} /></PrivateRoute>} />
      <Route path='/' element={<Navigate to='/dashboard' replace />} />
      <Route path='*' element={<Navigate to='/dashboard' replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}