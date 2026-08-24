import { useEffect, useState } from 'react';
import { ClipboardList, Save } from 'lucide-react';
import { examAPI, classAPI, studentAPI, markAPI } from '../../api';

const TeacherMarks = () => {
  const [exams, setExams] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      loadStudents(selectedClass);
    }
  }, [selectedClass]);

  const loadData = async () => {
    try {
      const [examRes, clsRes] = await Promise.all([
        examAPI.getAll({ limit: 100 }),
        classAPI.getAll({ limit: 100 })
      ]);
      setExams(examRes.data.data || []);
      setClasses(clsRes.data.data || []);
      if (examRes.data.data?.length > 0) {
        setSelectedExam(String(examRes.data.data[0].id));
      }
      if (clsRes.data.data?.length > 0) {
        setSelectedClass(String(clsRes.data.data[0].id));
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.error('Load data error:', e);
      setLoading(false);
    }
  };

  const loadStudents = async (classId) => {
    setLoading(true);
    try {
      const res = await studentAPI.getByClass(classId);
      const studentData = res.data.data || [];
      setStudents(studentData);

      // Load existing marks for this exam
      if (selectedExam) {
        const markRes = await markAPI.getAll({ exam_id: selectedExam, limit: 100 });
        const markData = markRes.data.data || [];
        const markMap = {};
        markData.forEach(m => {
          markMap[m.student_id] = {
            marks_obtained: m.marks_obtained,
            total_marks: m.total_marks,
            remark: m.remark
          };
        });
        setMarks(markMap);
      }
    } catch (e) {
      console.error('Load students error:', e);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkChange = (studentId, field, value) => {
    setMarks(prev => ({
      ...prev,
      [studentId]: { ...(prev[studentId] || {}), [field]: value }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const exam = exams.find(e => e.id === parseInt(selectedExam));
      const records = students.map(s => ({
        exam_id: parseInt(selectedExam),
        student_id: s.id,
        subject_id: exam?.subject_id,
        marks_obtained: parseFloat(marks[s.id]?.marks_obtained) || 0,
        total_marks: parseInt(marks[s.id]?.total_marks) || exam?.total_marks || 100,
        remark: marks[s.id]?.remark || ''
      }));

      await markAPI.create({ records });
      setMessage('Marks saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (e) {
      console.error('Save marks error:', e);
      setMessage('Failed to save marks');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marks Entry</h1>
          <p className="text-gray-500 text-sm">Enter marks for exams</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            className="input max-w-xs"
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
          >
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>{exam.name}</option>
            ))}
          </select>
          <select
            className="input max-w-xs"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>{cls.name} ({cls.code})</option>
            ))}
          </select>
        </div>
      </div>

      {message && (
        <div className={`p-3 rounded-lg text-sm ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      {/* Marks table */}
      <div className="card overflow-x-auto no-scrollbar">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="table-header">Student</th>
              <th className="table-header">Roll</th>
              <th className="table-header">Marks Obtained</th>
              <th className="table-header">Total Marks</th>
              <th className="table-header">Remark</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="table-cell font-medium">
                  {student.first_name} {student.last_name}
                </td>
                <td className="table-cell">{student.roll_number || '-'}</td>
                <td className="table-cell">
                  <input
                    type="number"
                    className="input max-w-[100px]"
                    value={marks[student.id]?.marks_obtained || ''}
                    onChange={(e) => handleMarkChange(student.id, 'marks_obtained', e.target.value)}
                    placeholder="0"
                  />
                </td>
                <td className="table-cell">
                  <input
                    type="number"
                    className="input max-w-[100px]"
                    value={marks[student.id]?.total_marks || ''}
                    onChange={(e) => handleMarkChange(student.id, 'total_marks', e.target.value)}
                    placeholder="100"
                  />
                </td>
                <td className="table-cell">
                  <input
                    type="text"
                    className="input max-w-[150px]"
                    value={marks[student.id]?.remark || ''}
                    onChange={(e) => handleMarkChange(student.id, 'remark', e.target.value)}
                    placeholder="Remark"
                  />
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="5" className="table-cell text-center text-gray-500 py-6">
                  {loading ? 'Loading...' : 'No students in this class'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {students.length > 0 && (
        <div className="flex justify-end">
          <button className="btn-primary" onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-1" />
            {saving ? 'Saving...' : 'Save Marks'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TeacherMarks;