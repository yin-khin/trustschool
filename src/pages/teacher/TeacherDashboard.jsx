import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, CalendarCheck, ClipboardList, ArrowRight, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { classAPI, subjectAPI, announcementAPI } from '../../api';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [clsRes, subRes, annRes] = await Promise.all([
        classAPI.getAll({ limit: 100 }),
        subjectAPI.getAll({ limit: 100 }),
        announcementAPI.getAll({ limit: 5 })
      ]);
      setClasses(clsRes.data.data || []);
      setSubjects(subRes.data.data || []);
      setAnnouncements(annRes.data.data || []);
    } catch (e) {
      console.error('Load teacher dashboard error:', e);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { title: 'My Classes', value: classes.length, icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
    { title: 'Subjects', value: subjects.length, icon: GraduationCap, color: 'bg-purple-100 text-purple-600' },
    { title: 'Students', value: classes.reduce((s, c) => s + (c.Students?.length || 0), 0), icon: Users, color: 'bg-green-100 text-green-600' },
    { title: 'Attendance', value: '95%', icon: CalendarCheck, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 lg:p-8 text-white">
        <h1 className="text-2xl lg:text-3xl font-bold">
          Hello, {user?.full_name?.split(' ')[0] || 'Teacher'} 👋
        </h1>
        <p className="text-emerald-100 mt-1">Welcome to your teacher portal</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Classes */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">My Classes</h2>
            <Link to="/portal/teacher/classes" className="text-sm text-emerald-600 flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-2">
            {classes.map((cls) => (
              <div key={cls.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{cls.name}</p>
                  <p className="text-xs text-gray-500">{cls.code} • {cls.Students?.length || 0} students</p>
                </div>
              </div>
            ))}
            {classes.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No classes assigned yet</p>
            )}
          </div>
        </div>

        {/* Announcements */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Announcements</h2>
            <Link to="/portal/teacher/announcements" className="text-sm text-emerald-600 flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-2">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-3 rounded-lg hover:bg-gray-50">
                <p className="text-sm font-medium">{ann.title}</p>
                <p className="text-xs text-gray-500 line-clamp-1">{ann.content}</p>
              </div>
            ))}
            {announcements.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No announcements yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;