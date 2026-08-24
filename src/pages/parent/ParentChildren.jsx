import { useEffect, useState } from "react";
import { GraduationCap, Phone, Mail, MapPin, BookOpen } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { parentAPI, studentAPI } from "../../api";

const ParentChildren = () => {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setChildren(user?.profile?.Students || []);
    } catch (e) {
      console.error("Load children error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Children</h1>
        <p className="text-gray-500 text-sm">
          View information about your children
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">
          Loading children...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children.map((child) => (
            <div
              key={child.id}
              className="card p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">
                    {child.first_name} {child.last_name}
                  </h2>
                  <p className="text-sm text-gray-500">{child.student_id}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  Roll: {child.roll_number || "-"}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  {child.phone || "-"}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  {child.email || "-"}
                </p>
                {child.address && (
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    {child.address}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 mt-4">
                <span
                  className={`badge ${child.status === "active" ? "badge-success" : "badge-gray"}`}
                >
                  {child.status}
                </span>
                {child.blood_group && (
                  <span className="badge-info">Blood: {child.blood_group}</span>
                )}
              </div>
            </div>
          ))}
          {children.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No children found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ParentChildren;
