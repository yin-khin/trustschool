import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  CalendarCheck,
  Wallet,
  Megaphone,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { announcementAPI, attendanceAPI, feeAPI } from "../../api";

const ParentDashboard = () => {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [attendanceRate, setAttendanceRate] = useState(null);
  const [feesDue, setFeesDue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load parent's children
      setChildren(user?.profile?.Students || []);

      // Load announcements
      const annRes = await announcementAPI.getAll({ limit: 5 });
      setAnnouncements(annRes.data.data || []);

      const myChildren = user?.profile?.Students || [];
      if (myChildren.length > 0) {
        const childId = myChildren[0].id;
        const [attendanceRes, feesRes] = await Promise.all([
          attendanceAPI.getStudentReport(childId),
          feeAPI.getAll({ student_id: childId, limit: 100 }),
        ]);
        setAttendanceRate(attendanceRes.data.data?.percentage ?? null);
        setFeesDue(
          (feesRes.data.data || []).filter(
            (fee) => !["paid", "cancelled"].includes(fee.status),
          ).length,
        );
      }
    } catch (e) {
      console.error("Load parent dashboard error:", e);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: "Children",
      value: children.length,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Attendance",
      value: attendanceRate == null ? "-" : `${attendanceRate}%`,
      icon: CalendarCheck,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Fees Due",
      value: feesDue,
      icon: Wallet,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Announcements",
      value: announcements.length,
      icon: Megaphone,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 lg:p-8 text-white">
        <h1 className="text-2xl lg:text-3xl font-bold">
          Hello, {user?.full_name?.split(" ")[0] || "Parent"} 👋
        </h1>
        <p className="text-emerald-100 mt-1">Welcome to your parent portal</p>
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
        {/* My Children */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">My Children</h2>
            <Link
              to="/portal/parent/children"
              className="text-sm text-emerald-600 flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-2">
            {children.map((child) => (
              <div
                key={child.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {child.first_name} {child.last_name}
                  </p>
                  <p className="text-xs text-gray-500">{child.student_id}</p>
                </div>
              </div>
            ))}
            {children.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                No children assigned
              </p>
            )}
          </div>
        </div>

        {/* Announcements */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Announcements</h2>
            <Link
              to="/portal/parent/announcements"
              className="text-sm text-emerald-600 flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-2">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-3 rounded-lg hover:bg-gray-50">
                <p className="text-sm font-medium">{ann.title}</p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {ann.content}
                </p>
              </div>
            ))}
            {announcements.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                No announcements yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
