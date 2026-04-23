import { useState, useMemo, useContext } from 'react';
import TaskItem from './TaskItem';
import { ThemeContext } from '../context/ThemeContext';

const SORT_OPTIONS = [
  { value: 'status', label: 'By status' },
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'title',  label: 'Title A–Z' },
];

const STATUS_ORDER = { running: 0, pending: 1, failed: 2, success: 3 };

function getTime(task) {
  if (task.createdAt) return new Date(task.createdAt).getTime();
  if (task._id?.length === 24) return parseInt(task._id.substring(0, 8), 16) * 1000;
  return 0;
}

export default function TaskList({ tasks, refresh }) {
  const { isDark } = useContext(ThemeContext);
  const [sort, setSort] = useState('status');

  const sorted = useMemo(() => {
    const list = [...tasks];
    if (sort === 'newest') return list.sort((a, b) => getTime(b) - getTime(a));
    if (sort === 'oldest') return list.sort((a, b) => getTime(a) - getTime(b));
    if (sort === 'title')  return list.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'status') return list.sort((a, b) => (STATUS_ORDER[a.status] ?? 9) - (STATUS_ORDER[b.status] ?? 9));
    return list;
  }, [tasks, sort]);

  return (
    <div>
      {/* Header + Sort */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 bg-[#E8622A] rounded-full" />
          <h3 className={`font-['DM_Serif_Display',serif] text-lg ${isDark ? 'text-white' : 'text-[#1A1208]'}`}>
            Your Tasks
            {tasks.length > 0 && (
              <span className={`ml-2 text-sm font-['DM_Sans',sans-serif] font-normal ${isDark ? 'text-[#6b6b6b]' : 'text-[#A89880]'}`}>
                ({tasks.length})
              </span>
            )}
          </h3>
        </div>

        {/* Sort dropdown */}
        {tasks.length > 1 && (
          <div className="flex items-center gap-2">
            <svg className={`w-3.5 h-3.5 ${isDark ? 'text-[#6b6b6b]' : 'text-[#A89880]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9M3 12h5m13 0l-4-4m4 4l-4 4" />
            </svg>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className={`text-xs font-semibold border rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#E8622A] cursor-pointer transition-colors duration-200 ${
                isDark
                  ? 'bg-[#242424] border-[#383838] text-[#c9c9c9]'
                  : 'bg-white border-[#EDE8DF] text-[#5C4A35]'
              }`}
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Empty state */}
      {tasks.length === 0 ? (
        <div className={`border border-dashed rounded-2xl px-8 py-14 text-center transition-colors duration-300 ${
          isDark ? 'bg-[#242424] border-[#2e2e2e]' : 'bg-white border-[#EDE8DF]'
        }`}>
          <div className="w-12 h-12 bg-[#FDF0E8] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-[#E8622A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className={`font-['DM_Serif_Display',serif] text-lg mb-1 ${isDark ? 'text-white' : 'text-[#1A1208]'}`}>No tasks yet</p>
          <p className={`text-sm ${isDark ? 'text-[#9ca3af]' : 'text-[#A89880]'}`}>Create your first task above to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map(task => (
            <TaskItem key={task._id} task={task} refresh={refresh} />
          ))}
        </div>
      )}
    </div>
  );
}