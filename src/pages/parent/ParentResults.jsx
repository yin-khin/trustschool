import { useEffect, useState } from "react";
import { Award, TrendingUp, BookOpen } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { parentAPI, studentAPI, markAPI } from "../../api";

const ParentResults = () => {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState("");
  const [results, setResults] = useState({
    marks: [],
    summary: { totalSubjects: 0, totalMarks: 0, average: 0, percentage: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChildren();
  }, []);

  useEffect(() => {
    if (selectedChild) loadResults(selectedChild);
  }, [selectedChild]);

  const loadChildren = async () => {
    try {
      const myChildren = user?.profile?.Students || [];
      setChildren(myChildren);
      if (myChildren.length > 0) setSelectedChild(String(myChildren[0].id));
      else setLoading(false);
    } catch (e) {
      console.error("Load children error:", e);
      setLoading(false);
    }
  };

  const loadResults = async (childId) => {
    setLoading(true);
    try {
      const res = await markAPI.getStudentResults(childId);
      if (res.data?.data) setResults(res.data.data);
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Results</h1>
          <p className="text-gray-500 text-sm">
            View your children's academic results
          </p>
        </div>
        {children.length > 0 && (
          <select
            className="input max-w-xs"
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
          >
            {children.map((child) => (
              <option key={child.id} value={child.id}>
                {child.first_name} {child.last_name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4 fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold">
                {results.summary.totalSubjects}
              </p>
              <p className="text-xs text-gray-500">Subjects</p>
            </div>
          </div>
        </div>
        <div className="card p-4 fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-600">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold">{results.summary.totalMarks}</p>
              <p className="text-xs text-gray-500">Total Marks</p>
            </div>
          </div>
        </div>
        <div className="card p-4 fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-green-100 text-green-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold">{results.summary.average}</p>
              <p className="text-xs text-gray-500">Average</p>
            </div>
          </div>
        </div>
        <div className="card p-4 fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-100 text-orange-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold">{results.summary.percentage}%</p>
              <p className="text-xs text-gray-500">Percentage</p>
            </div>
          </div>
        </div>
      </div>

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

export default ParentResults;
