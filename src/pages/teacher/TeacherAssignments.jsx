import { useEffect, useState } from 'react';
import { ClipboardList, Calendar, Paperclip, Plus, X } from 'lucide-react';
import { assignmentAPI, classAPI, subjectAPI } from '../../api';

const TeacherAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    subject_id: '',
    class_id: '',
    due_date: '',
    status: 'active'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [assRes, clsRes, subRes] = await Promise.all([
        assignmentAPI.getAll({ limit: 100 }),
        classAPI.getAll({ limit: 100 }),
        subjectAPI.getAll({ limit: 100 })
      ]);
      setAssignments(assRes.data.data || []);
      setClasses(clsRes.data.data || []);
      setSubjects(subRes.data.data || []);
    } catch (e) {
      console.error('Load assignments error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await assignmentAPI.create(form);
      setMessage('Assignment created successfully!');
      setShowForm(false);
      setForm({ title: '', description: '', subject_id: '', class_id: '', due_date: '', status: 'active' });
      loadData();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Create assignment error:', err);
      setMessage('Failed to create assignment');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-500 text-sm">Manage assignments for your classes</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="w-4 h-4 mr-1" /> : <Plus className="w-4 h-4 mr-1" />}
          {showForm ? 'Cancel' : 'New Assignment'}
        </button>
      </div>

      {message && (
        <div className={`p-3 rounded-lg text-sm ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      {/* Create form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="card p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Title *</label>
              <input
                type="text"
                name="title"
                className="input"
                value={form.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="label">Due Date *</label>
              <input
                type="date"
                name="due_date"
                className="input"
                value={form.due_date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="label">Subject *</label>
              <select
                name="subject_id"
                className="input"
                value={form.subject_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select subject</option>
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Class *</label>
              <select
                name="class_id"
                className="input"
                value={form.class_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select class</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>{cls.name} ({cls.code})</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="label">Description</label>
              <textarea
                name="description"
                className="input"
                rows="3"
                value={form.description}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Creating...' : 'Create Assignment'}
            </button>
          </div>
        </form>
      )}

      {/* Assignments list */}
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
                </p>
                <p className="flex items-center gap-2">
                  <Paperclip className="w-3.5 h-3.5" />
                  {assignment.attachment ? 'Has attachment' : 'No attachment'}
                </p>
              </div>

              {assignment.Class && (
                <p className="text-xs text-emerald-600 mt-3">
                  Class: {assignment.Class.name} ({assignment.Class.code})
                </p>
              )}
            </div>
          ))}
          {assignments.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">No assignments created yet</div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherAssignments;