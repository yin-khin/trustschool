import { useEffect, useState } from "react";
import { Search, Users, GraduationCap, Mail, Phone } from "lucide-react";
import { classAPI, studentAPI, assetUrl } from "../../api";

const TeacherStudents = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) loadStudents(selectedClass);
  }, [selectedClass]);

  const loadClasses = async () => {
    try {
      const res = await classAPI.getAll({ limit: 100 });
      const clsData = res.data.data || [];
      setClasses(clsData);
      if (clsData.length > 0) setSelectedClass(String(clsData[0].id));
      else setLoading(false);
    } catch (e) {
      console.error("Load classes error:", e);
      setLoading(false);
    }
  };

  const loadStudents = async (classId) => {
    setLoading(true);
    try {
      const res = await studentAPI.getByClass(classId);
      setStudents(res.data.data || []);
    } catch (e) {
      console.error("Load students error:", e);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter((s) => {
    if (!search) return true;
    const term = search.toLowerCase();
    return (
      s.first_name?.toLowerCase().includes(term) ||
      s.last_name?.toLowerCase().includes(term) ||
      s.student_id?.toLowerCase().includes(term) ||
      s.email?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-500 text-sm">
            View and search students in your classes
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            className="input max-w-xs"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name} ({cls.code})
              </option>
            ))}
          </select>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="input pl-9 max-w-xs"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="card p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                {student.photo ? (
                  <img
                    src={assetUrl(student.photo)}
                    alt={student.first_name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <GraduationCap className="w-6 h-6" />
                )}
              </div>
              <div>
                <h2 className="font-semibold">
                  {student.first_name} {student.last_name}
                </h2>
                <p className="text-xs text-gray-500">{student.student_id}</p>
              </div>
            </div>
            <div className="space-y-2 text-xs text-gray-500">
              {student.Section && (
                <p className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5" /> Section:{" "}
                  {student.Section.name}
                </p>
              )}
              {student.email && (
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> {student.email}
                </p>
              )}
              {student.phone && (
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" /> {student.phone}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span
                className={`badge ${student.status === "active" ? "badge-success" : "badge-gray"}`}
              >
                {student.status}
              </span>
              {student.roll_number && (
                <span className="badge-info">Roll: {student.roll_number}</span>
              )}
            </div>
          </div>
        ))}
        {filteredStudents.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            {loading ? "Loading..." : "No students found"}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherStudents;
