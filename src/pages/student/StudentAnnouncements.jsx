import { useEffect, useState } from 'react';
import { Megaphone, Calendar, User } from 'lucide-react';
import { announcementAPI } from '../../api';

const StudentAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await announcementAPI.getAll({ limit: 100 });
      setAnnouncements(res.data.data || []);
    } catch (e) {
      console.error('Load announcements error:', e);
    } finally {
      setLoading(false);
    }
  };

  const getTypeBadge = (type) => {
    const map = {
      general: 'badge-info',
      exam: 'badge-warning',
      holiday: 'badge-success',
      event: 'badge-purple',
      notice: 'badge-gray',
      urgent: 'badge-danger'
    };
    return map[type] || 'badge-gray';
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
        <p className="text-gray-500 text-sm">View all school announcements</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading announcements...</div>
      ) : (
        <div className="space-y-4">
          {announcements.map((ann) => (
            <div key={ann.id} className="card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600">
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">{ann.title}</h2>
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(ann.published_at)}
                    </p>
                  </div>
                </div>
                <span className={`badge ${getTypeBadge(ann.type)}`}>{ann.type}</span>
              </div>
              <p className="text-sm text-gray-600 mt-3 whitespace-pre-line">{ann.content}</p>
            </div>
          ))}
          {announcements.length === 0 && (
            <div className="text-center py-8 text-gray-500">No announcements available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentAnnouncements;