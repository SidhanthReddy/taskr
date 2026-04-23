import { useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/auth/login', form);
      login(res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.msg || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full px-4 py-3 border rounded-xl text-sm placeholder-[#C5BAB0] focus:outline-none focus:border-[#E8622A] focus:ring-2 focus:ring-[#E8622A]/10 transition-all duration-200 ${
    isDark
      ? 'bg-[#2d2d2d] border-[#383838] text-white placeholder-[#555]'
      : 'bg-white border-[#EDE8DF] text-[#1A1208]'
  }`;

  return (
    <div className={`min-h-screen flex font-['DM_Sans',sans-serif] transition-colors duration-300`}>

      {/* Left Panel — Visual (unchanged in both modes) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1A1208] relative overflow-hidden flex-col justify-between p-12">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-[-80px] left-[-80px] w-96 h-96 rounded-full bg-[#E8622A] opacity-10 blur-3xl" />
          <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 rounded-full bg-[#E8622A] opacity-15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#E8622A] opacity-5 blur-2xl" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(#FAF7F2 1px, transparent 1px), linear-gradient(90deg, #FAF7F2 1px, transparent 1px)',
              backgroundSize: '48px 48px'
            }}
          />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-3 z-10">
          <div className="w-9 h-9 bg-[#E8622A] rounded-lg flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-white font-['DM_Serif_Display',serif] text-2xl tracking-tight">Taskr</span>
        </div>

        {/* Center content */}
        <div className="relative z-10">
          <div className="mb-6 w-14 h-1 bg-[#E8622A] rounded-full" />
          <h2 className="text-[#FAF7F2] font-['DM_Serif_Display',serif] text-4xl leading-snug mb-4">
            Automate your<br />text tasks,<br />effortlessly.
          </h2>
          <p className="text-[#A89880] text-sm leading-relaxed max-w-xs">
            Create, run, and manage text operations in one elegant workspace. Built for people who value clarity.
          </p>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10">
          <div className="border border-[#2E2416] rounded-xl p-5 backdrop-blur-sm bg-white/5">
            <p className="text-[#EDE8DF] text-sm italic leading-relaxed mb-3">
              "Taskr turned repetitive text work into a one-click habit. I don't know how I managed before."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#E8622A] flex items-center justify-center text-white text-xs font-bold">S</div>
              <div>
                <p className="text-[#FAF7F2] text-xs font-semibold">Sana K.</p>
                <p className="text-[#A89880] text-xs">Content Lead</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className={`flex-1 flex items-center justify-center px-8 py-12 transition-colors duration-300 ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#FAF7F2]'}`}>
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-10 lg:hidden">
            <div className="w-8 h-8 bg-[#E8622A] rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className={`font-['DM_Serif_Display',serif] text-xl ${isDark ? 'text-white' : 'text-[#1A1208]'}`}>Taskr</span>
          </div>

          <p className="text-xs text-[#E8622A] uppercase tracking-[0.2em] font-semibold mb-2">Welcome back</p>
          <h1 className={`text-3xl font-['DM_Serif_Display',serif] mb-1 ${isDark ? 'text-white' : 'text-[#1A1208]'}`}>Sign in</h1>
          <p className={`text-sm mb-8 ${isDark ? 'text-[#9ca3af]' : 'text-[#A89880]'}`}>Enter your credentials to continue.</p>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-widest mb-1.5 ${isDark ? 'text-[#c9c9c9]' : 'text-[#5C4A35]'}`}>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                onChange={e => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold uppercase tracking-widest mb-1.5 ${isDark ? 'text-[#c9c9c9]' : 'text-[#5C4A35]'}`}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                onChange={e => setForm({ ...form, password: e.target.value })}
                className={inputClass}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3.5 bg-[#E8622A] text-white font-semibold text-sm rounded-xl shadow-sm hover:bg-[#D4551F] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in…
                </span>
              ) : 'Sign In'}
            </button>
          </div>

          <p className={`text-center mt-6 text-sm ${isDark ? 'text-[#9ca3af]' : 'text-[#A89880]'}`}>
            No account yet?{' '}
            <a href="/register" className="text-[#E8622A] font-semibold hover:underline">Create one</a>
          </p>
        </div>
      </div>
    </div>
  );
}