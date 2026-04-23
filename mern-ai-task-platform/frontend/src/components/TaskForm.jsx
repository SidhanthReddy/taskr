import { useState, useContext } from 'react';
import API from '../api/axios';
import { ThemeContext } from '../context/ThemeContext';

const OPERATIONS = [
  { value: 'uppercase', label: 'Uppercase', icon: '▲' },
  { value: 'lowercase', label: 'Lowercase', icon: '▼' },
  { value: 'reverse', label: 'Reverse', icon: '↺' },
  { value: 'wordcount', label: 'Word Count', icon: '#' },
];

export default function TaskForm({ refresh }) {
  const { isDark } = useContext(ThemeContext);
  const [form, setForm] = useState({ title: '', input: '', operation: 'uppercase' });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.title.trim() || !form.input.trim()) return;
    setLoading(true);
    try {
      await API.post('/tasks', form);
      setForm({ title: '', input: '', operation: 'uppercase' });
      refresh();
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#E8622A] focus:ring-2 focus:ring-[#E8622A]/10 transition-all duration-200 ${
    isDark
      ? 'bg-[#2d2d2d] border-[#383838] text-white placeholder-[#555]'
      : 'bg-[#FAF7F2] border-[#EDE8DF] text-[#1A1208] placeholder-[#C5BAB0]'
  }`;

  return (
    <div className={`border rounded-2xl p-6 shadow-sm transition-colors duration-300 ${
      isDark ? 'bg-[#242424] border-[#2e2e2e]' : 'bg-white border-[#EDE8DF]'
    }`}>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1.5 h-5 bg-[#E8622A] rounded-full" />
        <h3 className={`font-['DM_Serif_Display',serif] text-lg ${isDark ? 'text-white' : 'text-[#1A1208]'}`}>New Task</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Title */}
        <div>
          <label className={`block text-[10px] font-semibold uppercase tracking-widest mb-1.5 ${isDark ? 'text-[#c9c9c9]' : 'text-[#5C4A35]'}`}>Task Title</label>
          <input
            value={form.title}
            placeholder="e.g. Format newsletter copy"
            onChange={e => setForm({ ...form, title: e.target.value })}
            className={inputClass}
          />
        </div>

        {/* Operation */}
        <div>
          <label className={`block text-[10px] font-semibold uppercase tracking-widest mb-1.5 ${isDark ? 'text-[#c9c9c9]' : 'text-[#5C4A35]'}`}>Operation</label>
          <div className="grid grid-cols-4 gap-1.5">
            {OPERATIONS.map(op => (
              <button
                key={op.value}
                onClick={() => setForm({ ...form, operation: op.value })}
                title={op.label}
                className={`py-2 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                  form.operation === op.value
                    ? 'bg-[#E8622A] text-white border-[#E8622A] shadow-sm'
                    : isDark
                      ? 'bg-[#2d2d2d] text-[#c9c9c9] border-[#383838] hover:border-[#E8622A]/40'
                      : 'bg-[#FAF7F2] text-[#5C4A35] border-[#EDE8DF] hover:border-[#E8622A]/40'
                }`}
              >
                <span className="block text-sm">{op.icon}</span>
                <span className="block text-[9px] mt-0.5">{op.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="mb-5">
        <label className={`block text-[10px] font-semibold uppercase tracking-widest mb-1.5 ${isDark ? 'text-[#c9c9c9]' : 'text-[#5C4A35]'}`}>Input Text</label>
        <textarea
          value={form.input}
          placeholder="Paste or type your text here…"
          rows={3}
          onChange={e => setForm({ ...form, input: e.target.value })}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          onClick={submit}
          disabled={loading || !form.title.trim() || !form.input.trim()}
          className="px-6 py-2.5 bg-[#E8622A] text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-[#D4551F] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Creating…
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Create Task
            </>
          )}
        </button>
      </div>
    </div>
  );
}