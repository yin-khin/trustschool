import { useEffect, useState } from 'react';
import { Bell, CheckCheck, Trash2, MessageSquare, FileText, CalendarCheck, Wallet, Megaphone, Clock, ClipboardList } from 'lucide-react';
import { notificationAPI } from '../api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await notificationAPI.getAll({ limit: 100 });
      setNotifications(res.data.data || []);
    } catch (e) {
      console.error('Load notifications error:', e);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type) => {
    const map = {
      assignment: FileText,
      attendance: CalendarCheck,
      exam: ClipboardList,
      fee: Wallet,
      announcement: Megaphone,
      message: MessageSquare,
      system: Bell
    };
    return map[type] || Bell;
  };

  const getTypeColor = (type) => {
    const map = {
      assignment: 'bg-orange-100 text-orange-600',
      attendance: 'bg-green-100 text-green-600',
      exam: 'bg-blue-100 text-blue-600',
      fee: 'bg-yellow-100 text-yellow-600',
      announcement: 'bg-purple-100 text-purple-600',
      message: 'bg-pink-100 text-pink-600',
      system: 'bg-gray-100 text-gray-600'
    };
    return map[type] || 'bg-gray-100 text-gray-600';
  };

  const getTimeAgo = (date) => {
    if (!date) return '';
    const diff = Date.now() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    return new Date(date).toLocaleDateString();
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationAPI.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (e) {
      console.error('Mark as read error:', e);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch (e) {
      console.error('Mark all read error:', e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await notificationAPI.delete(id);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (e) {
      console.error('Delete notification error:', e);
    }
  };

  const filtered = filter === 'all' ? notifications : notifications.filter(n => n.type === filter);
  const unreadCount = notifications.filter(n => !n.is_read).length;

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'assignment', label: 'Assignments' },
    { key: 'exam', label: 'Exams' },
    { key: 'fee', label: 'Fees' },
    { key: 'announcement', label: 'Announcements' },
    { key: 'message', label: 'Messages' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 text-sm">{unreadCount} unread notifications</p>
        </div>
        <button className="btn-secondary text-sm" onClick={handleMarkAllRead} disabled={unreadCount === 0}>
          <CheckCheck className="w-4 h-4 mr-1" /> Mark all as read
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f.key
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((notification) => {
            const Icon = getTypeIcon(notification.type);
            const color = getTypeColor(notification.type);
            return (
              <div
                key={notification.id}
                className={`card p-4 transition-colors ${notification.is_read ? 'bg-white' : 'bg-emerald-50/50'}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {!notification.is_read && (
                          <button
                            className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-100"
                            onClick={() => handleMarkAsRead(notification.id)}
                            title="Mark as read"
                          >
                            <CheckCheck className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-100"
                          onClick={() => handleDelete(notification.id)}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`badge ${notification.is_read ? 'badge-gray' : 'badge-info'}`}>
                        {notification.is_read ? 'Read' : 'New'}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getTimeAgo(notification.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              No notifications found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
