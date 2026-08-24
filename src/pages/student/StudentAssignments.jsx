import { useEffect, useState } from 'react';
import { ClipboardList, Calendar, Paperclip } from 'lucide-react';
import { assignmentAPI, classAPI } from '../../api';

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const clsRes = await classAPI.getAll({ limit: 100 });
      const classes = clsRes.data.data || [];

      if (classes.length > 0) {
        // Load assignments for all classes
        const assRes = await assignmentAPI.getAll({ limit: 100 });
        setAssignments(assRes.data.data || []);
      }
    } catch (e) {
      console.error('Load assignments error:', e);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return new Date(dueDate) < today;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Assignments</h1>
        <p className="text-gray-500 text-sm">View all assignments for your classes</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading assignments...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-orange-100 text-orange-600">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <span className={`badge ${assignment.status === 'active' ? 'badge-success' : assignment.status === 'closed' ? 'badge-gray' : 'badge-warning'}`}>
                  {assignment.status}
                </span>
              </div>

              <h2 className="font-semibold text-lg mb-1">{assignment.title}</h2>
              <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                {assignment.description || 'No description provided'}
              </p>

              <div className="space-y-2 text-xs text-gray-500">
                <p className="flex items-center gap-2">
                  <ClipboardList className="w-3.5 h-3.5" />
                  {assignment.Subject?.name || 'No subject'}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  Due: {formatDate(assignment.due_date)}
                  {isOverdue(assignment.due_date) && assignment.status === 'active' && (
                    <span className="badge-danger">Overdue</span>
                  )}
                </p>
                <p className="flex items-center gap-2">
                  <Paperclip className="w-3.5 h-3.5" />
                  {assignment.attachment ? 'Has attachment' : 'No attachment'}
                </p>
              </div>

              {assignment.Teacher && (
                <p className="text-xs text-emerald-600 mt-3">
                  Teacher: {assignment.Teacher.first_name} {assignment.Teacher.last_name}
                </p>
              )}
            </div>
          ))}
          {assignments.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">No assignments available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentAssignments;