import { useEffect, useState } from 'react';
import { BookOpen, Users, Clock } from 'lucide-react';
import { classAPI, subjectAPI } from '../../api';

const TeacherClasses = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [clsRes, subRes] = await Promise.all([
        classAPI.getAll({ limit: 100 }),
        subjectAPI.getAll({ limit: 100 })
      ]);
      setClasses(clsRes.data.data || []);
      setSubjects(subRes.data.data || []);
    } catch (e) {
      console.error('Load classes error:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
        <p className="text-gray-500 text-sm">View all classes and subjects you teach</p>
      </div>

      {/* Classes grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((cls) => (
          <div key={cls.id} className="card p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="badge-success">{cls.code}</span>
            </div>
            <h2 className="font-semibold text-lg">{cls.name}</h2>
            <p className="text-sm text-gray-500">{cls.room || 'Room not assigned'}</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> {cls.Students?.length || 0} students
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Capacity: {cls.capacity || 40}
              </span>
            </div>
          </div>
        ))}
        {classes.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">No classes assigned yet</div>
        )}
      </div>

      {/* Subjects */}
      <div>
        <h2 className="text-lg font-semibold mb-3">My Subjects</h2>
        <div className="card overflow-x-auto no-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Subject</th>
                <th className="table-header">Code</th>
                <th className="table-header">Credits</th>
                <th className="table-header">Class</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {subjects.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="table-cell font-medium">{sub.name}</td>
                  <td className="table-cell">{sub.code}</td>
                  <td className="table-cell">{sub.credit}</td>
                  <td className="table-cell">{sub.Class?.name || '-'}</td>
                </tr>
              ))}
              {subjects.length === 0 && (
                <tr>
                  <td colSpan="4" className="table-cell text-center text-gray-500 py-6">No subjects yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherClasses;