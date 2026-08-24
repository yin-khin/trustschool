import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  GraduationCap,
  BookOpen,
  Users,
  Camera,
  Save,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import {
  authAPI,
  studentAPI,
  teacherAPI,
  parentAPI,
  assetUrl,
} from "../../api";

const MyProfile = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({});

  useEffect(() => {
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = user?.profile || null;

      setProfile(data);
      if (data) {
        setForm({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          phone: data.phone || "",
          email: data.email || "",
          address: data.address || "",
          date_of_birth: data.date_of_birth || "",
          gender: data.gender || "",
        });
      }
    } catch (e) {
      console.error("Load profile error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      if (profile && profile.id) {
        if (user?.role === "student") {
          await studentAPI.update(profile.id, form);
        } else if (user?.role === "teacher") {
          await teacherAPI.update(profile.id, form);
        } else if (user?.role === "parent") {
          await parentAPI.update(profile.id, form);
        }
        setMessage("Profile updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error("Update profile error:", err);
      setMessage("Failed to update profile");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t("myProfile")}</h1>
        <p className="text-gray-500 text-sm">
          View and update your personal information
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">{t("loading")}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile card */}
          <div className="card p-6 text-center">
            <div className="w-28 h-28 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center text-3xl font-bold mb-4">
              {profile?.photo ? (
                <img
                  src={assetUrl(profile.photo)}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                getInitials(user?.full_name)
              )}
            </div>
            <h2 className="text-xl font-bold">
              {profile?.first_name} {profile?.last_name}
            </h2>
            <p className="text-sm text-emerald-600 capitalize mb-4">
              {user?.role}
            </p>

            <div className="space-y-3 text-sm text-left">
              <p className="flex items-center gap-2 text-gray-600">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                {profile?.student_id ||
                  profile?.teacher_id ||
                  "ID not assigned"}
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4 text-emerald-600" />
                {form.email || user?.email}
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4 text-emerald-600" />
                {form.phone || "-"}
              </p>
              {profile?.Class && (
                <p className="flex items-center gap-2 text-gray-600">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  {profile.Class.name} ({profile.Class.code})
                </p>
              )}
              {profile?.Section && (
                <p className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4 text-emerald-600" />
                  Section: {profile.Section.name}
                </p>
              )}
            </div>
          </div>

          {/* Edit form */}
          <div className="card p-6 lg:col-span-2">
            <h2 className="font-semibold text-lg mb-6">Edit Profile</h2>

            {message && (
              <div
                className={`mb-4 p-3 rounded-lg text-sm ${message.includes("success") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    className="input"
                    value={form.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="label">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    className="input"
                    value={form.last_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="label">{t("phone")}</label>
                  <input
                    type="text"
                    name="phone"
                    className="input"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="label">{t("email")}</label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="label">{t("gender")}</label>
                  <select
                    name="gender"
                    className="input"
                    value={form.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="male">{t("male")}</option>
                    <option value="female">{t("female")}</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="label">{t("dateOfBirth")}</label>
                  <input
                    type="date"
                    name="date_of_birth"
                    className="input"
                    value={form.date_of_birth}
                    onChange={handleChange}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="label">{t("address")}</label>
                  <textarea
                    name="address"
                    className="input"
                    rows="3"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn-primary" disabled={saving}>
                  <Save className="w-4 h-4 mr-1" />
                  {saving ? "Saving..." : t("save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
