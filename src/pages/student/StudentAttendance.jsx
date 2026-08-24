import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Clock,
  UserX,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { attendanceAPI, studentAPI } from "../../api";
import { useAuth } from "../../context/AuthContext";

const StudentAttendance = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    present: 0,
    absent: 0,
    late: 0,
    excused: 0,
    percentage: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const myStudent = user?.profile;

      if (myStudent) {
        // Load attendance records
        const attRes = await attendanceAPI.getAll({
          student_id: myStudent.id,
          limit: 100,
        });
        setRecords(attRes.data.data || []);

        // Load attendance summary
        const reportRes = await attendanceAPI.getStudentReport(myStudent.id);
        if (reportRes.data?.data) {
          setSummary(reportRes.data.data);
        }
      }
    } catch (e) {
      console.error("Load attendance error:", e);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      present: "badge-success",
      absent: "badge-danger",
      late: "badge-warning",
      excused: "badge-info",
    };
    return map[status] || "badge-gray";
  };

  const stats = [
    {
      title: "Present",
      value: summary.present,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Absent",
      value: summary.absent,
      icon: UserX,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Late",
      value: summary.late,
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Rate",
      value: `${summary.percentage}%`,
      icon: CalendarCheck,
      color: "bg-blue-100 text-blue-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Attendance</h1>
        <p className="text-gray-500 text-sm">
          View your attendance records and summary
        </p>
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

      {/* Attendance records */}
      <div className="card overflow-x-auto no-scrollbar">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="table-header">Date</th>
              <th className="table-header">Status</th>
              <th className="table-header">Class</th>
              <th className="table-header">Remark</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {records.map((rec) => (
              <tr key={rec.id} className="hover:bg-gray-50">
                <td className="table-cell font-medium">{rec.date}</td>
                <td className="table-cell">
                  <span className={getStatusBadge(rec.status)}>
                    {rec.status}
                  </span>
                </td>
                <td className="table-cell">{rec.Class?.name || "-"}</td>
                <td className="table-cell">{rec.remark || "-"}</td>
              </tr>
            ))}
            {records.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="table-cell text-center text-gray-500 py-6"
                >
                  {loading ? "Loading..." : "No attendance records found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentAttendance;
