import { useEffect, useState } from 'react';
import { Clock, BookOpen, MapPin, User } from 'lucide-react';
import { timetableAPI, classAPI } from '../../api';

const DAYS = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
];

const StudentTimetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      loadTimetables(selectedClass);
    }
  }, [selectedClass]);

  const loadData = async () => {
    try {
      const clsRes = await classAPI.getAll({ limit: 100 });
      const clsData = clsRes.data.data || [];
      setClasses(clsData);
      if (clsData.length > 0) {
        setSelectedClass(String(clsData[0].id));
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.error('Load classes error:', e);
      setLoading(false);
    }
  };

  const loadTimetables = async (classId) => {
    setLoading(true);
    try {
      const res = await timetableAPI.getAll({ class_id: classId });
      setTimetables(res.data.data || []);
    } catch (e) {
      console.error('Load timetable error:', e);
      setTimetables([]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m || '00'} ${ampm}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Timetable</h1>
          <p className="text-gray-500 text-sm">View your weekly class schedule</p>
        </div>
        {classes.length > 0 && (
          <select
            className="input max-w-xs"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>{cls.name} ({cls.code})</option>
            ))}
          </select>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading timetable...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {DAYS.map((day) => {
            const dayEntries = timetables
              .filter((t) => t.day_of_week === day.key)
              .sort((a, b) => (a.start_time || '').localeCompare(b.start_time || ''));

            return (
              <div key={day.key} className="card overflow-hidden">
                <div className="bg-emerald-600 text-white px-4 py-2.5 font-semibold text-sm">
                  {day.label}
                </div>
                <div className="p-3 space-y-2">
                  {dayEntries.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-4">No classes</p>
                  ) : (
                    dayEntries.map((entry) => (
                      <div key={entry.id} className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                        <div className="flex items-center gap-2 mb-1">
                          <BookOpen className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <p className="text-sm font-semibold text-gray-900">
                            {entry.Subject?.name || 'Subject'}
                          </p>
                        </div>
                        <div className="space-y-1 text-xs text-gray-500">
                          <p className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {formatTime(entry.start_time)} - {formatTime(entry.end_time)}
                          </p>
                          {entry.Teacher && (
                            <p className="flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5" />
                              {entry.Teacher.first_name} {entry.Teacher.last_name}
                            </p>
                          )}
                          {entry.room && (
                            <p className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5" />
                              Room: {entry.room}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentTimetable;