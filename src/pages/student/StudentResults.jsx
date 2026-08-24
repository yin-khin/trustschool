import { useEffect, useState } from "react";
import { Award, TrendingUp, BookOpen, Percent } from "lucide-react";
import { markAPI, studentAPI } from "../../api";
import { useAuth } from "../../context/AuthContext";

const StudentResults = () => {
  const { user } = useAuth();
  const [results, setResults] = useState({
    marks: [],
    summary: { totalSubjects: 0, totalMarks: 0, average: 0, percentage: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const myStudent = user?.profile;

      if (myStudent) {
        const res = await markAPI.getStudentResults(myStudent.id);
        if (res.data?.data) {
          setResults(res.data.data);
        }
      }
    } catch (e) {
      console.error("Load results error:", e);
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (grade) => {
    const map = {
      A: "text-green-600 bg-green-100",
      B: "text-blue-600 bg-blue-100",
      C: "text-yellow-600 bg-yellow-100",
      D: "text-orange-600 bg-orange-100",
      F: "text-red-600 bg-red-100",
    };
    return map[grade] || "text-gray-600 bg-gray-100";
  };

  const stats = [
    {
      title: "Subjects",
      value: results.summary.totalSubjects,
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Marks",
      value: results.summary.totalMarks,
      icon: Award,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Average",
      value: results.summary.average,
      icon: TrendingUp,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Percentage",
      value: `${results.summary.percentage}%`,
      icon: Percent,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Results</h1>
        <p className="text-gray-500 text-sm">
          View your exam results and performance
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

      {/* Results table */}
      <div className="card overflow-x-auto no-scrollbar">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="table-header">Exam</th>
              <th className="table-header">Subject</th>
              <th className="table-header">Marks</th>
              <th className="table-header">Grade</th>
              <th className="table-header">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {results.marks.map((mark) => (
              <tr key={mark.id} className="hover:bg-gray-50">
                <td className="table-cell font-medium">
                  {mark.Exam?.name || "-"}
                </td>
                <td className="table-cell">{mark.Subject?.name || "-"}</td>
                <td className="table-cell">
                  {mark.marks_obtained} / {mark.total_marks}
                </td>
                <td className="table-cell">
                  <span className={`badge ${getGradeColor(mark.grade)}`}>
                    {mark.grade || "-"}
                  </span>
                </td>
                <td className="table-cell">{mark.Exam?.exam_date || "-"}</td>
              </tr>
            ))}
            {results.marks.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="table-cell text-center text-gray-500 py-6"
                >
                  {loading ? "Loading..." : "No results available yet"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentResults;
