import { useContext } from 'react';
import API from '../api/axios';
import { ThemeContext } from '../context/ThemeContext';

const STATUS_STYLES = {
  pending:  { dot: 'bg-[#C5BAB0]',  badge: 'bg-[#F0EBE3] text-[#7A6550]',   darkBadge: 'bg-[#2e2e2e] text-[#9ca3af]',  label: 'Pending' },
  running:  { dot: 'bg-blue-400',    badge: 'bg-blue-50 text-blue-600',        darkBadge: 'bg-blue-950 text-blue-400',     label: 'Running' },
  success:  { dot: 'bg-emerald-400', badge: 'bg-emerald-50 text-emerald-700',  darkBadge: 'bg-emerald-950 text-emerald-400', label: 'Done' },
  failed:   { dot: 'bg-red-400',     badge: 'bg-red-50 text-red-600',          darkBadge: 'bg-red-950 text-red-400',       label: 'Failed' },
};

const OP_LABELS = {
  uppercase: 'Uppercase',
  lowercase: 'Lowercase',
  reverse:   'Reverse',
  wordcount: 'Word Count',
};

export default function TaskItem({ task, refresh }) {
  const { isDark } = useContext(ThemeContext);
  const status = STATUS_STYLES[task.status] || STATUS_STYLES.pending;

  const runTask = async () => {
    try {
      await API.post(`/tasks/${task._id}/run`);
      refresh();
    } catch (err) {
      alert(err.response?.data?.msg || 'Error running task');
    }
  };

  const isDisabled = task.status === 'running' || task.status === 'success';

  return (
    <div className={`border rounded-2xl p-5 shadow-sm transition-all duration-200 group ${
      isDark
        ? 'bg-[#242424] border-[#2e2e2e] hover:shadow-md hover:border-[#E8622A]/20'
        : 'bg-white border-[#EDE8DF] hover:shadow-md hover:border-[#E8622A]/20'
    }`}>
      <div className="flex items-start justify-between gap-3">
        {/* Left */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h4 className={`font-semibold text-sm truncate ${isDark ? 'text-white' : 'text-[#1A1208]'}`}>{task.title}</h4>
            {/* Operation chip */}
            <span className="text-[10px] font-semibold text-[#E8622A] bg-[#FDF0E8] border border-[#F5D5C0] px-2 py-0.5 rounded-full uppercase tracking-wide shrink-0">
              {OP_LABELS[task.operation] || task.operation}
            </span>
          </div>

          {/* Status badge */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className={`w-1.5 h-1.5 rounded-full ${status.dot} ${task.status === 'running' ? 'animate-pulse' : ''}`} />
            <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${isDark ? status.darkBadge : status.badge}`}>
              {status.label}
            </span>
          </div>

          {/* Result */}
          {task.result && (
            <div className={`border rounded-xl px-3.5 py-2.5 ${isDark ? 'bg-[#2d2d2d] border-[#383838]' : 'bg-[#FAF7F2] border-[#EDE8DF]'}`}>
              <p className={`text-[10px] font-semibold uppercase tracking-widest mb-1 ${isDark ? 'text-[#6b6b6b]' : 'text-[#A89880]'}`}>Result</p>
              <p className={`text-sm font-medium break-words ${isDark ? 'text-white' : 'text-[#1A1208]'}`}>{task.result}</p>
            </div>
          )}
        </div>

        {/* Run button */}
        <button
          onClick={runTask}
          disabled={isDisabled}
          className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
            isDisabled
              ? isDark
                ? 'text-[#555] border-[#333] bg-[#2d2d2d] cursor-not-allowed'
                : 'text-[#C5BAB0] border-[#EDE8DF] bg-[#FAF7F2] cursor-not-allowed'
              : 'text-white bg-[#E8622A] border-[#E8622A] hover:bg-[#D4551F] active:scale-95 shadow-sm'
          }`}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3l14 9-14 9V3z" />
          </svg>
          {task.status === 'running' ? 'Running…' : task.status === 'success' ? 'Done' : 'Run'}
        </button>
      </div>
    </div>
  );
}