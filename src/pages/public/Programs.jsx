import { useEffect, useState } from "react";
import { BookOpen, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { classAPI, subjectAPI } from "../../api";

const Programs = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [classRes, subjectRes] = await Promise.all([
          classAPI.getAll({ limit: 100 }),
          subjectAPI.getAll({ limit: 100 }),
        ]);
        setClasses(classRes.data.data || []);
        setSubjects(subjectRes.data.data || []);
      } catch (error) {
        console.error("Load programs error:", error);
      }
    };
    loadData();
  }, []);

  return (
    <div className="space-y-16">
      <section className="bg-gradient-to-br from-emerald-800 to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Academic Programs</h1>
          <p className="text-emerald-100 max-w-2xl mx-auto">
            A complete educational pathway designed to develop academic
            excellence and lifelong learning skills.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4">
        <div className="space-y-8">
          {classes.map((classItem) => {
            const classSubjects = subjects.filter(
              (subject) => subject.class_id === classItem.id,
            );
            const displayedSubjects =
              classSubjects.length > 0 ? classSubjects : subjects;
            return (
              <div key={classItem.id} className="card overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 px-6 py-6 lg:px-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {classItem.name}
                      </h2>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="badge-info">
                          Code: {classItem.code}
                        </span>
                        <span className="badge-info">
                          Capacity: {classItem.capacity || 0}
                        </span>
                        <span className="badge-success">
                          {classItem.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <p className="text-gray-600 mb-3">
                    {classItem.Students?.length || 0} students enrolled in this
                    class.
                  </p>
                  <p className="text-gray-500 mb-6">
                    Classes and subjects are loaded from the school database.
                  </p>
                  <h3 className="font-semibold mb-3">Subjects</h3>
                  <div className="flex flex-wrap gap-2">
                    {displayedSubjects.map((subject) => (
                      <span key={subject.id} className="badge-info">
                        {subject.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-semibold mt-6 mb-3">Classes</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge-success">
                      {classItem.room || "Room not assigned"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          {classes.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No academic programs found.
            </p>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-emerald-600 rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Start Your Journey</h2>
          <Link
            to="/contact"
            className="inline-flex items-center bg-white text-emerald-700 px-8 py-3 rounded-xl font-semibold hover:bg-emerald-50"
          >
            Contact Us <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Programs;
