import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  LayoutDashboard, BookOpen, Clock, CalendarCheck, FileText, ClipboardList,
  Wallet, BookMarked, Megaphone, Users,
  Menu, X, LogOut, GraduationCap, Bell, ChevronDown, Award, User, Settings, MessageSquare, Languages
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { notificationAPI } from '../api';

const PortalLayout = () => {
  const { user, logout } = useAuth();
  const { t, lang, toggleLanguage } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) loadNotifications();
  }, [user]);

  const loadNotifications = async () => {
    try {
      const res = await notificationAPI.getAll({ limit: 5 });
      setNotifications(res.data.data || []);
    } catch (e) { /* silent */ }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  // Define navigation based on role
  const studentNav = [
    { name: t('dashboard'), path: '/portal/dashboard', icon: LayoutDashboard },
    { name: t('myClasses'), path: '/portal/my-classes', icon: BookOpen },
    { name: t('timetable'), path: '/portal/timetable', icon: Clock },
    { name: t('attendance'), path: '/portal/attendance', icon: CalendarCheck },
    { name: t('assignments'), path: '/portal/assignments', icon: ClipboardList },
    { name: t('exams'), path: '/portal/exams', icon: FileText },
    { name: t('results'), path: '/portal/results', icon: Award },
    { name: t('fees'), path: '/portal/fees', icon: Wallet },
    { name: t('library'), path: '/portal/library', icon: BookMarked },
    { name: t('announcements'), path: '/portal/announcements', icon: Megaphone },
    { name: t('messages'), path: '/portal/messages', icon: MessageSquare },
  ];

  const parentNav = [
    { name: t('dashboard'), path: '/portal/parent', icon: LayoutDashboard },
    { name: t('myChildren'), path: '/portal/parent/children', icon: Users },
    { name: t('attendance'), path: '/portal/parent/attendance', icon: CalendarCheck },
    { name: t('results'), path: '/portal/parent/results', icon: Award },
    { name: t('fees'), path: '/portal/parent/fees', icon: Wallet },
    { name: t('announcements'), path: '/portal/parent/announcements', icon: Megaphone },
    { name: t('messages'), path: '/portal/messages', icon: MessageSquare },
  ];

  const teacherNav = [
    { name: t('dashboard'), path: '/portal/teacher', icon: LayoutDashboard },
    { name: t('myClasses'), path: '/portal/teacher/classes', icon: BookOpen },
    { name: t('students'), path: '/portal/teacher/students', icon: Users },
    { name: t('attendance'), path: '/portal/teacher/attendance', icon: CalendarCheck },
    { name: t('marks'), path: '/portal/teacher/marks', icon: ClipboardList },
    { name: t('assignments'), path: '/portal/teacher/assignments', icon: FileText },
    { name: t('announcements'), path: '/portal/teacher/announcements', icon: Megaphone },
    { name: t('messages'), path: '/portal/messages', icon: MessageSquare },
  ];

  const getNavItems = () => {
    if (user?.role === 'parent') return parentNav;
    if (user?.role === 'teacher') return teacherNav;
    return studentNav;
  };

  const navItems = getNavItems();
  const bottomNav = navItems.slice(0, 4);

  const roleHomePath = user?.role === 'parent' ? '/portal/parent' : user?.role === 'teacher' ? '/portal/teacher' : '/portal/dashboard';

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-emerald-800 text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-emerald-700">
          <Link to={roleHomePath} className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8" />
            <div>
              <h1 className="text-lg font-bold leading-tight">{t('appName')}</h1>
              <p className="text-xs text-emerald-300">
                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)} Account
              </p>
            </div>
          </Link>
          <button className="lg:hidden text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-4 px-3 pb-20 overflow-y-auto h-[calc(100vh-4rem)] no-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-emerald-200 hover:bg-emerald-700 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}

          <div className="mt-4 pt-4 border-t border-emerald-700">
            <NavLink
              to="/portal/profile"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                  isActive ? 'bg-emerald-600 text-white' : 'text-emerald-200 hover:bg-emerald-700 hover:text-white'
                }`
              }
            >
              <User className="w-5 h-5 flex-shrink-0" />
              {t('myProfile')}
            </NavLink>
            <NavLink
              to="/portal/settings"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                  isActive ? 'bg-emerald-600 text-white' : 'text-emerald-200 hover:bg-emerald-700 hover:text-white'
                }`
              }
            >
              <Settings className="w-5 h-5 flex-shrink-0" />
              {t('settings')}
            </NavLink>
          </div>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-6 h-16">
            <button className="lg:hidden text-gray-600" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>

            <div className="hidden md:block">
              <p className="text-sm text-gray-500">{t('welcomeBack')},</p>
              <p className="font-semibold">{user?.full_name}</p>
            </div>

            <div className="flex items-center gap-2">
              {/* Language switcher */}
              <button
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                onClick={toggleLanguage}
                title="Switch language"
              >
                <Languages className="w-5 h-5" />
                <span className="text-xs ml-1 font-medium">{lang === 'en' ? 'ខ្មែរ' : 'EN'}</span>
              </button>

              {/* Messages */}
              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 relative" onClick={() => navigate('/portal/messages')}>
                <MessageSquare className="w-5 h-5" />
              </button>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 rounded-lg hover:bg-gray-100 relative" onClick={() => setShowNotif(!showNotif)}>
                  <Bell className="w-5 h-5 text-gray-600" />
                  {notifications.some(n => !n.is_read) && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </button>
                {showNotif && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="font-semibold text-sm">{t('notifications')}</h3>
                      <Link to="/portal/notifications" className="text-xs text-emerald-600 hover:underline" onClick={() => setShowNotif(false)}>
                        {t('viewAll')}
                      </Link>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="px-4 py-6 text-sm text-gray-500 text-center">No notifications</p>
                      ) : (
                        notifications.map((n) => (
                          <Link
                            key={n.id}
                            to="/portal/notifications"
                            onClick={() => setShowNotif(false)}
                            className="block px-4 py-3 border-b border-gray-50 hover:bg-gray-50"
                          >
                            <p className="text-sm font-medium">{n.title}</p>
                            <p className="text-xs text-gray-500 line-clamp-2">{n.message}</p>
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative">
                <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100" onClick={() => setProfileOpen(!profileOpen)}>
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold text-sm">
                    {getInitials(user?.full_name)}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium leading-tight">{user?.full_name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold">{user?.full_name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link to="/portal/profile" className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        <User className="w-4 h-4" /> {t('myProfile')}
                      </Link>
                      <Link to="/portal/settings" className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        <Settings className="w-4 h-4" /> {t('settings')}
                      </Link>
                      <button
                        className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
                        onClick={() => { setProfileOpen(false); handleLogout(); }}
                      >
                        <LogOut className="w-4 h-4" /> {t('logout')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6">
          <Outlet />
        </main>

        {/* Mobile bottom nav */}
        <nav className="bottom-nav">
          <div className="grid grid-cols-4 h-16">
            {bottomNav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-1 text-xs font-medium ${isActive ? 'text-emerald-600' : 'text-gray-500'}`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.name.split(' ')[0]}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default PortalLayout;
