// src/pages/hrm/Attendance.tsx
import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  setMonth,
  setYear,
  getMonth,
  getYear,
  isWeekend,
} from 'date-fns';
import {
  Calendar,
  Clock,
  Download,
  Users,
  X,
} from 'lucide-react';

// ────────────────────────────────────────────────
// Mock data
// ────────────────────────────────────────────────
const mockAttendanceData: Record<string, Record<string, any>> = {
  '2025-02': {
    '2025-02-01': [
      { employee: 'Suyog Sutar', status: 'present', punchIn: '09:02', punchOut: '18:05', late: true },
      { employee: 'Priya Patel', status: 'present', punchIn: '08:45', punchOut: '17:50' },
    ],
    '2025-02-03': [
      { employee: 'Suyog Sutar', status: 'absent' },
      { employee: 'Amit Kumar', status: 'half-day', punchIn: '09:45', punchOut: '13:30' },
    ],
    '2025-02-05': [
      { employee: 'Sneha Joshi', status: 'present', punchIn: '08:55', punchOut: '19:15', late: true },
    ],
    '2025-02-10': [
      { employee: 'Rahul Sharma', status: 'present', punchIn: '09:00', punchOut: '18:00' },
      { employee: 'Vikram Singh', status: 'leave' },
    ],
    '2025-02-15': [
      { employee: 'Suyog Sutar', status: 'half-day', punchIn: '14:00', punchOut: '18:00' },
    ],
    '2025-02-20': [
      { employee: 'Amit Kumar', status: 'absent' },
    ],
    '2025-02-25': [
      { employee: 'Sneha Joshi', status: 'leave' },
    ],
  },
};

type AttendanceRecord = {
  employee: string;
  status: 'present' | 'absent' | 'half-day' | 'leave' | 'holiday';
  punchIn?: string;
  punchOut?: string;
  late?: boolean;
  date?: string;
};

const statusColors = {
  present: 'bg-green-100 text-green-800 border-green-300',
  absent: 'bg-red-100 text-red-800 border-red-300',
  'half-day': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  leave: 'bg-purple-100 text-purple-800 border-purple-300',
  holiday: 'bg-blue-100 text-blue-800 border-blue-300',
  weekend: 'bg-gray-100 text-gray-600 border-gray-300',
};

const statusLabels = {
  present: 'Present',
  absent: 'Absent',
  'half-day': 'Half Day',
  leave: 'Leave',
  holiday: 'Holiday',
  weekend: 'Weekend',
};

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const years = [2024, 2025, 2026, 2027];

export default function Attendance() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 1)); // Feb 2025
  const [activeTab, setActiveTab] = useState<'summary' | 'by-employee' | 'by-hour'>('summary');

  // Modal state
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const monthKey = format(currentDate, 'yyyy-MM');
  const dailyRecords = mockAttendanceData[monthKey] || {};

  // Flatten records
  const allRecords: AttendanceRecord[] = [];
  Object.entries(dailyRecords).forEach(([date, records]) => {
    (records as AttendanceRecord[]).forEach(r => {
      allRecords.push({ ...r, date });
    });
  });

  const employees = Array.from(new Set(allRecords.map(r => r.employee)));

  // Summary
  const calculateSummary = () => {
    let present = 0, absent = 0, halfDay = 0, leave = 0;
    allRecords.forEach(r => {
      if (r.status === 'present') present++;
      else if (r.status === 'absent') absent++;
      else if (r.status === 'half-day') halfDay++;
      else if (r.status === 'leave') leave++;
    });

    const totalWorkingDays = days.filter(d => !isWeekend(d)).length;
    const attendancePercent = totalWorkingDays > 0
      ? Math.round(((present + halfDay) / totalWorkingDays) * 100)
      : 0;

    return { present, absent, halfDay, leave, totalWorkingDays, attendancePercent };
  };

  const summary = calculateSummary();

  // By Hour data
  const hourBuckets = ['<08:00', '08:00–08:59', '09:00–09:59', '10:00+', 'No punch'];

  const getHourBucket = (time?: string): string => {
    if (!time) return 'No punch';
    const hour = parseInt(time.split(':')[0], 10);
    if (hour < 8) return '<08:00';
    if (hour === 8) return '08:00–08:59';
    if (hour === 9) return '09:00–09:59';
    return '10:00+';
  };

  const dailyHourCounts: Record<string, Record<string, number>> = {};
  days.forEach(day => {
    const dateKey = format(day, 'yyyy-MM-dd');
    dailyHourCounts[dateKey] = Object.fromEntries(hourBuckets.map(b => [b, 0]));

    const dayPunches = allRecords.filter(r => r.date === dateKey && r.punchIn);
    dayPunches.forEach(r => {
      const bucket = getHourBucket(r.punchIn);
      dailyHourCounts[dateKey][bucket]++;
    });
  });

  // Open details modal
  const openAttendanceDetails = (date: string) => {
    setSelectedDate(date);
    setShowDetailsModal(true);
  };

  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Attendance – {format(currentDate, 'MMMM yyyy')}
        </h1>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800">
            <Calendar size={18} className="text-gray-500 dark:text-gray-400" />
            <select
              value={months[getMonth(currentDate)]}
              onChange={e => setCurrentDate(prev => setMonth(prev, months.indexOf(e.target.value)))}
              className="bg-transparent border-none focus:outline-none font-medium"
            >
              {months.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800">
            <select
              value={getYear(currentDate)}
              onChange={e => setCurrentDate(prev => setYear(prev, Number(e.target.value)))}
              className="bg-transparent border-none focus:outline-none font-medium"
            >
              {years.map(y => <option key={y}>{y}</option>)}
            </select>
          </div>

          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Today
          </button>

          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-6 md:space-x-10 overflow-x-auto pb-1">
          {[
            { id: 'summary', label: 'Summary', icon: Calendar },
            { id: 'by-employee', label: 'By Employee', icon: Users },
            { id: 'by-hour', label: 'By Hour', icon: Clock },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-1 text-sm md:text-base font-medium border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* CONTENT */}
      <div>
        {/* SUMMARY */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { label: 'Present', value: summary.present, color: 'green' },
                { label: 'Absent', value: summary.absent, color: 'red' },
                { label: 'Half Days', value: summary.halfDay, color: 'yellow' },
                { label: 'Leaves', value: summary.leave, color: 'purple' },
                { label: 'Attendance %', value: `${summary.attendancePercent}%`, color: 'gray' },
              ].map(item => (
                <div
                  key={item.label}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm text-center"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                  <p className={`text-3xl font-bold mt-2 text-${item.color}-600 dark:text-${item.color}-400`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Calendar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap gap-4 text-sm">
                {Object.entries(statusLabels).map(([key, label]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${statusColors[key as keyof typeof statusColors].split(' ')[0]}`} />
                    <span className="text-gray-700 dark:text-gray-300">{label}</span>
                  </div>
                ))}
              </div>

              <div className="p-4">
                <div className="grid grid-cols-7 gap-1 text-center text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {days.map(day => {
                    const dateKey = format(day, 'yyyy-MM-dd');
                    const dayRecords = dailyRecords[dateKey] || [];
                    const status = isWeekend(day)
                      ? 'weekend'
                      : dayRecords.length > 0
                      ? dayRecords[0].status
                      : 'absent';

                    return (
                      <div
                        key={dateKey}
                        onClick={() => openAttendanceDetails(dateKey)}
                        className={`
                          aspect-square flex items-center justify-center rounded-lg text-center text-xs md:text-sm font-medium
                          cursor-pointer transition-colors
                          ${isToday(day) ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                          ${statusColors[status as keyof typeof statusColors]}
                          hover:opacity-90
                        `}
                      >
                        {format(day, 'd')}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BY EMPLOYEE */}
        {activeTab === 'by-employee' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Attendance by Employee
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px] text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                    <th className="p-4 text-left font-medium sticky left-0 bg-gray-50 dark:bg-gray-900 z-10 min-w-[180px]">
                      Employee
                    </th>
                    {days.map(day => (
                      <th
                        key={format(day, 'dd')}
                        className="p-3 text-center font-medium text-gray-600 dark:text-gray-400 min-w-[70px]"
                      >
                        {format(day, 'd')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => (
                    <tr key={emp} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <td className="p-4 font-medium sticky left-0 bg-white dark:bg-gray-800 z-10">
                        {emp}
                      </td>
                      {days.map(day => {
                        const dateKey = format(day, 'yyyy-MM-dd');
                        const record = allRecords.find(r => r.employee === emp && r.date === dateKey);
                        const status = record?.status || (isWeekend(day) ? 'weekend' : 'absent');

                        return (
                          <td
                            key={dateKey}
                            className="p-3 text-center cursor-pointer"
                            onClick={() => openAttendanceDetails(dateKey)}
                          >
                            <span
                              className={`inline-block px-2.5 py-1 text-xs rounded-full border ${statusColors[status]}`}
                            >
                              {status === 'present' && record?.late ? 'Late' : statusLabels[status]}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BY HOUR */}
        {activeTab === 'by-hour' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold">Daily Punch-in Distribution by Hour</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Count of employees who punched in during each time window
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                    <th className="p-4 text-left font-medium sticky left-0 bg-gray-50 dark:bg-gray-900 z-10 min-w-[160px]">
                      Date
                    </th>
                    {hourBuckets.map(bucket => (
                      <th key={bucket} className="p-4 text-center font-medium min-w-[110px]">
                        {bucket}
                      </th>
                    ))}
                    <th className="p-4 text-center font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {days.map(day => {
                    const dateKey = format(day, 'yyyy-MM-dd');
                    const counts = dailyHourCounts[dateKey] || {};
                    const total = hourBuckets.reduce((sum, b) => sum + (counts[b] || 0), 0);

                    const rowClass = isWeekend(day)
                      ? 'bg-gray-50/70 dark:bg-gray-900/40'
                      : isToday(day)
                      ? 'bg-blue-50/40 dark:bg-blue-950/30'
                      : '';

                    return (
                      <tr key={dateKey} className={`border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 ${rowClass}`}>
                        <td className="p-4 font-medium sticky left-0 bg-white dark:bg-gray-800 z-10">
                          {format(day, 'dd MMM (EEE)')}
                        </td>
                        {hourBuckets.map(bucket => (
                          <td key={bucket} className="p-4 text-center">
                            <span
                              className={`inline-block min-w-[2.5rem] px-3 py-1 rounded-full text-xs font-medium ${
                                (counts[bucket] || 0) > 0
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
                                  : 'text-gray-400 dark:text-gray-500'
                              }`}
                            >
                              {counts[bucket] || '—'}
                            </span>
                          </td>
                        ))}
                        <td className="p-4 text-center font-medium">{total || '—'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ──────────────────────────────────────────────── */}
      {/* Horizontal Attendance Details Popup */}
      {/* ──────────────────────────────────────────────── */}
      {showDetailsModal && selectedDate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowDetailsModal(false)} // close on backdrop click
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Attendance Details – {format(new Date(selectedDate), 'dd MMM yyyy (EEEE)')}
              </h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X size={24} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Horizontal content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Summary */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Summary</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-600 dark:text-gray-400">Status</dt>
                        <dd className="font-medium text-green-600 dark:text-green-400">Present</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600 dark:text-gray-400">Punch In</dt>
                        <dd className="font-medium">09:02 AM</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600 dark:text-gray-400">Punch Out</dt>
                        <dd className="font-medium">06:05 PM</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600 dark:text-gray-400">Total Hours</dt>
                        <dd className="font-medium">9h 3m</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600 dark:text-gray-400">Late</dt>
                        <dd className="font-medium text-yellow-600 dark:text-yellow-400">Yes (2 min)</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Remarks</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 min-h-[140px]">
                    <p className="text-gray-700 dark:text-gray-300">
                      Attended daily stand-up at 10:00 AM. Client call from 14:30–15:45. 
                      Completed project documentation from home after 17:00.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Actions</h3>
                  <div className="flex flex-col gap-3">
                    <button className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      Edit Attendance
                    </button>
                    <button className="w-full py-2.5 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors">
                      View Timesheet
                    </button>
                    <button className="w-full py-2.5 px-4 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg transition-colors">
                      Mark Absent
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-4 px-6 py-5 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}