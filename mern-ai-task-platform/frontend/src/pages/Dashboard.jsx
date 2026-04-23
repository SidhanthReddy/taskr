import { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { ThemeContext } from '../context/ThemeContext';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({ name: 'Alex Morgan' });
  const { isDark, toggleTheme } = useContext(ThemeContext);

  const fetchTasks = async () => {
    const res = await API.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className={`min-h-screen font-['DM_Sans',sans-serif] transition-colors duration-300 ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#FAF7F2]'}`}>

      {/* Top Nav */}
      <nav className={`border-b px-8 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-sm bg-opacity-90 transition-colors duration-300 ${
        isDark ? 'bg-[#1a1a1a] border-[#2e2e2e]' : 'bg-[#FAF7F2] border-[#EDE8DF]'
      }`}>
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#E8622A] rounded-lg flex items-center justify-center shadow-sm">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className={`font-['DM_Serif_Display',serif] text-xl tracking-tight ${isDark ? 'text-white' : 'text-[#1A1208]'}`}>Taskr</span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className={`text-xs uppercase tracking-widest font-medium ${isDark ? 'text-[#6b6b6b]' : 'text-[#A89880]'}`}>Signed in as</p>
            <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-[#1A1208]'}`}>{user.name}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#E8622A] flex items-center justify-center text-white font-bold text-sm shadow-sm cursor-pointer">
            {user.name.charAt(0)}
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
              isDark
                ? 'bg-[#2e2e2e] text-yellow-400 hover:bg-[#383838]'
                : 'bg-[#F0EBE3] text-[#5C4A35] hover:bg-[#EDE8DF]'
            }`}
          >
            {isDark ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <button
            onClick={handleLogout}
            className={`text-xs transition-colors duration-200 font-medium hover:text-[#E8622A] ${isDark ? 'text-[#6b6b6b]' : 'text-[#A89880]'}`}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs text-[#E8622A] uppercase tracking-[0.2em] font-semibold mb-1">Your Workspace</p>
          <h1 className={`text-4xl font-['DM_Serif_Display',serif] leading-tight ${isDark ? 'text-white' : 'text-[#1A1208]'}`}>
            Good to see you, {user.name.split(' ')[0]}.
          </h1>
          <p className={`mt-2 text-sm ${isDark ? 'text-[#9ca3af]' : 'text-[#A89880]'}`}>Manage and run your tasks from one place.</p>
        </div>

        {/* Task Form */}
        <div className="mb-10">
          <TaskForm refresh={fetchTasks} />
        </div>

        {/* Task List */}
        <TaskList tasks={tasks} refresh={fetchTasks} />
      </main>
    </div>
  );
}