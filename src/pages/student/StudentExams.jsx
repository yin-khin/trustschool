import { useEffect, useState } from 'react';
import { FileText, Calendar, Clock, MapPin, BookOpen } from 'lucide-react';
import { examAPI, classAPI } from '../../api';

const StudentExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const clsRes = await classAPI.getAll({ limit: 100 });
      const classes = clsRes.data.data || [];

      if (classes.length > 0) {
        const examRes = await examAPI.getAll({ limit: 100 });
        setExams(examRes.data.data || []);
      }
    } catch (e) {
      console.error('Load exams error:', e);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m || '00'} ${ampm}`;
  };

  const getStatusBadge = (status) => {
    const map = {
      scheduled: 'badge-info',
      ongoing: 'badge-warning',
      completed: 'badge-success',
      cancelled: 'badge-danger'
    };
    return map[status] || 'badge-gray';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Exams</h1>
        <p className="text-gray-500 text-sm">View your exam schedule</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading exams...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams.map((exam) => (
            <div key={exam.id} className="card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600">
                  <FileText className="w-5 h-5" />
                </div>
                <span className={`badge ${getStatusBadge(exam.status)}`}>{exam.status}</span>
              </div>

              <h2 className="font-semibold text-lg mb-1">{exam.name}</h2>

              <div className="space-y-2 text-xs text-gray-500 mt-3">
                <p className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  {exam.Subject?.name || 'No subject'}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(exam.exam_date)}
                </p>
                {(exam.start_time || exam.end_time) && (
                  <p className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    {formatTime(exam.start_time)} - {formatTime(exam.end_time)}
                  </p>
                )}
                {exam.room && (
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    Room: {exam.room}
                  </p>
                )}
                <p className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" />
                  Total Marks: {exam.total_marks} | Pass: {exam.pass_marks}
                </p>
              </div>

              {exam.Class && (
                <p className="text-xs text-emerald-600 mt-3">
                  Class: {exam.Class.name} ({exam.Class.code})
                </p>
              )}
            </div>
          ))}
          {exams.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">No exams scheduled</div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentExams;