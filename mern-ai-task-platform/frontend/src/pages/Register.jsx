import { useState, useContext } from 'react';
import API from '../api/axios';
import { ThemeContext } from '../context/ThemeContext';

export default function Register() {
  const { isDark } = useContext(ThemeContext);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await API.post('/auth/register', form);
      alert('Registered successfully');
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:border-[#E8622A] focus:ring-2 focus:ring-[#E8622A]/10 transition-all duration-200 ${
    isDark
      ? 'bg-[#2d2d2d] border-[#383838] text-white placeholder-[#555]'
      : 'bg-white border-[#EDE8DF] text-[#1A1208] placeholder-[#C5BAB0]'
  }`;

  return (
    <div className="min-h-screen flex font-['DM_Sans',sans-serif] transition-colors duration-300">

      {/* Left Panel — Visual (unchanged in both modes) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1A1208] relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0">
          <div className="absolute top-[-80px] right-[-80px] w-96 h-96 rounded-full bg-[#E8622A] opacity-10 blur-3xl" />
          <div className="absolute bottom-[-60px] left-[-60px] w-80 h-80 rounded-full bg-[#E8622A] opacity-15 blur-3xl" />
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

        {/* Feature highlights */}
        <div className="relative z-10">
          <div className="mb-6 w-14 h-1 bg-[#E8622A] rounded-full" />
          <h2 className="text-[#FAF7F2] font-['DM_Serif_Display',serif] text-4xl leading-snug mb-6">
            Start doing<br />more with less<br />effort.
          </h2>
          <div className="space-y-4">
            {[
              { icon: '⚡', text: 'Run text tasks instantly — uppercase, reverse, word count & more.' },
              { icon: '🗂️', text: 'Keep all your tasks organized in one clean dashboard.' },
              { icon: '🔒', text: 'Your tasks are private, secure, and always available.' },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#2E2416] flex items-center justify-center text-sm shrink-0 mt-0.5">
                  {f.icon}
                </div>
                <p className="text-[#A89880] text-sm leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-[#5C4A35] text-xs uppercase tracking-widest">Already trusted by 2,000+ teams</p>
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

          <p className="text-xs text-[#E8622A] uppercase tracking-[0.2em] font-semibold mb-2">Get started</p>
          <h1 className={`text-3xl font-['DM_Serif_Display',serif] mb-1 ${isDark ? 'text-white' : 'text-[#1A1208]'}`}>Create account</h1>
          <p className={`text-sm mb-8 ${isDark ? 'text-[#9ca3af]' : 'text-[#A89880]'}`}>Join Taskr and simplify your workflow.</p>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-widest mb-1.5 ${isDark ? 'text-[#c9c9c9]' : 'text-[#5C4A35]'}`}>Full Name</label>
              <input
                placeholder="Jane Smith"
                onChange={e => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
            </div>

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
                  Creating account…
                </span>
              ) : 'Create Account'}
            </button>
          </div>

          <p className={`text-center mt-6 text-sm ${isDark ? 'text-[#9ca3af]' : 'text-[#A89880]'}`}>
            Already have an account?{' '}
            <a href="/" className="text-[#E8622A] font-semibold hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}