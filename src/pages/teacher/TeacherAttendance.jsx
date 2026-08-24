import { useEffect, useState } from 'react';
import { CalendarCheck, CheckCircle2, UserX, Clock } from 'lucide-react';
import { classAPI, studentAPI, attendanceAPI } from '../../api';

const TeacherAttendance = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [records, setRecords] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      loadStudents(selectedClass);
    }
  }, [selectedClass]);

  const loadClasses = async () => {
    try {
      const res = await classAPI.getAll({ limit: 100 });
      const clsData = res.data.data || [];
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

  const loadStudents = async (classId) => {
    setLoading(true);
    try {
      const res = await studentAPI.getByClass(classId);
      const studentData = res.data.data || [];
      setStudents(studentData);

      // Load existing attendance for this date
      const attRes = await attendanceAPI.getByClassAndDate(classId, date);
      const attData = attRes.data.data || [];
      const attMap = {};
      attData.forEach(a => {
        attMap[a.student_id] = a.status;
      });
      setRecords(attMap);
    } catch (e) {
      console.error('Load students error:', e);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (studentId, status) => {
    setRecords(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const recordsArray = students.map(s => ({
        student_id: s.id,
        class_id: parseInt(selectedClass),
        date,
        status: records[s.id] || 'present'
      }));

      await attendanceAPI.create({ records: recordsArray });
      setMessage('Attendance saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (e) {
      console.error('Save attendance error:', e);
      setMessage('Failed to save attendance');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (status) => {
    const map = {
      present: 'bg-green-100 text-green-700 border-green-300',
      absent: 'bg-red-100 text-red-700 border-red-300',
      late: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      excused: 'bg-blue-100 text-blue-700 border-blue-300'
    };
    return map[status] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const stats = [
    { title: 'Present', value: Object.values(records).filter(s => s === 'present').length, icon: CheckCircle2, color: 'bg-green-100 text-green-600' },
    { title: 'Absent', value: Object.values(records).filter(s => s === 'absent').length, icon: UserX, color: 'bg-red-100 text-red-600' },
    { title: 'Late', value: Object.values(records).filter(s => s === 'late').length, icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
    { title: 'Total', value: students.length, icon: CalendarCheck, color: 'bg-blue-100 text-blue-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-500 text-sm">Mark attendance for your classes</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            className="input max-w-xs"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>{cls.name} ({cls.code})</option>
            ))}
          </select>
          <input
            type="date"
            className="input max-w-xs"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="card p-4 fade-in">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {message && (
        <div className={`p-3 rounded-lg text-sm ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      {/* Attendance table */}
      <div className="card overflow-x-auto no-scrollbar">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="table-header">Student</th>
              <th className="table-header">Roll</th>
              <th className="table-header">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="table-cell font-medium">
                  {student.first_name} {student.last_name}
                </td>
                <td className="table-cell">{student.roll_number || '-'}</td>
                <td className="table-cell">
                  <div className="flex gap-1.5">
                    {['present', 'absent', 'late', 'excused'].map((status) => (
                      <button
                        key={status}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                          records[student.id] === status
                            ? getStatusColor(status)
                            : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => handleStatusChange(student.id, status)}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="3" className="table-cell text-center text-gray-500 py-6">
                  {loading ? 'Loading...' : 'No students in this class'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {students.length > 0 && (
        <div className="flex justify-end">
          <button className="btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Attendance'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TeacherAttendance;