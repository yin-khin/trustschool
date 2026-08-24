import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import PortalLayout from './layouts/PortalLayout';
import PublicLayout from './layouts/PublicLayout';

// Public pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Programs from './pages/public/Programs';
import News from './pages/public/News';
import Events from './pages/public/Events';
import Gallery from './pages/public/Gallery';
import Contact from './pages/public/Contact';

// Profile pages
import MyProfile from './pages/profile/MyProfile';
import Settings from './pages/profile/Settings';
import Notifications from './pages/Notifications';
import Messages from './pages/Messages';

// Student pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentClasses from './pages/student/StudentClasses';
import StudentTimetable from './pages/student/StudentTimetable';
import StudentAttendance from './pages/student/StudentAttendance';
import StudentAssignments from './pages/student/StudentAssignments';
import StudentExams from './pages/student/StudentExams';
import StudentResults from './pages/student/StudentResults';
import StudentFees from './pages/student/StudentFees';
import StudentLibrary from './pages/student/StudentLibrary';
import StudentAnnouncements from './pages/student/StudentAnnouncements';

// Parent pages
import ParentDashboard from './pages/parent/ParentDashboard';
import ParentChildren from './pages/parent/ParentChildren';
import ParentAttendance from './pages/parent/ParentAttendance';
import ParentFees from './pages/parent/ParentFees';
import ParentAnnouncements from './pages/parent/ParentAnnouncements';
import ParentResults from './pages/parent/ParentResults';

// Teacher pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherClasses from './pages/teacher/TeacherClasses';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import TeacherMarks from './pages/teacher/TeacherMarks';
import TeacherAssignments from './pages/teacher/TeacherAssignments';
import TeacherAnnouncements from './pages/teacher/TeacherAnnouncements';
import TeacherStudents from './pages/teacher/TeacherStudents';

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/portal/dashboard" replace />;
  }
  return children;
};

function AppRoutes() {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="programs" element={<Programs />} />
        <Route path="news" element={<News />} />
        <Route path="events" element={<Events />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Auth pages */}
      <Route path="/login" element={isLoggedIn ? <Navigate to="/portal/dashboard" replace /> : <Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Portal */}
      <Route path="/portal" element={
        <ProtectedRoute>
          <PortalLayout />
        </ProtectedRoute>
      }>
        {/* Profile pages */}
        <Route path="profile" element={<MyProfile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="messages" element={<Messages />} />

        {/* Student pages */}
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="my-classes" element={<StudentClasses />} />
        <Route path="timetable" element={<StudentTimetable />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="assignments" element={<StudentAssignments />} />
        <Route path="exams" element={<StudentExams />} />
        <Route path="results" element={<StudentResults />} />
        <Route path="fees" element={<StudentFees />} />
        <Route path="library" element={<StudentLibrary />} />
        <Route path="announcements" element={<StudentAnnouncements />} />

        {/* Parent pages */}
        <Route path="parent" element={<ParentDashboard />} />
        <Route path="parent/children" element={<ParentChildren />} />
        <Route path="parent/attendance" element={<ParentAttendance />} />
        <Route path="parent/fees" element={<ParentFees />} />
        <Route path="parent/results" element={<ParentResults />} />
        <Route path="parent/announcements" element={<ParentAnnouncements />} />

        {/* Teacher pages */}
        <Route path="teacher" element={<TeacherDashboard />} />
        <Route path="teacher/classes" element={<TeacherClasses />} />
        <Route path="teacher/students" element={<TeacherStudents />} />
        <Route path="teacher/attendance" element={<TeacherAttendance />} />
        <Route path="teacher/marks" element={<TeacherMarks />} />
        <Route path="teacher/assignments" element={<TeacherAssignments />} />
        <Route path="teacher/announcements" element={<TeacherAnnouncements />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
