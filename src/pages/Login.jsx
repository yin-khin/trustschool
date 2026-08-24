import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  GraduationCap,
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  Languages,
  Home,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const Login = () => {
  const { login } = useAuth();
  const { t, lang, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    if (result.success) {
      // Redirect based on role
      if (result.user.role === "student") navigate("/portal/dashboard");
      else if (result.user.role === "parent") navigate("/portal/parent");
      else if (result.user.role === "teacher") navigate("/portal/teacher");
      else navigate("/portal/dashboard");
    } else {
      setError(result.message || "Login failed");
    }
    setLoading(false);
  };

  const fillDemo = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-800 p-4">
      {/* Top bar with language and home */}
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="flex items-center gap-2 text-white hover:text-emerald-200 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-sm font-medium">{t("home")}</span>
        </Link>
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 text-white hover:text-emerald-200 transition-colors px-3 py-1.5 rounded-lg bg-white/10"
        >
          <Languages className="w-4 h-4" />
          <span className="text-sm">{lang === "en" ? "ខ្មែរ" : "English"}</span>
        </button>
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-xl mb-4">
            <GraduationCap className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-white">{t("appName")}</h1>
          <p className="text-emerald-200 mt-1">{t("tagline")}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
          <h2 className="text-2xl font-bold mb-1">{t("welcomeBack")}</h2>
          <p className="text-gray-500 text-sm mb-6">
            Login with your email and password
          </p>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">{t("email")}</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  className="input pl-9"
                  placeholder="e.g. student@school.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="label">{t("password")}</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input pl-9 pr-10"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              {/* <Link
                to="/forgot-password"
                className="text-sm text-emerald-600 hover:underline"
              >
                {t("forgotPassword")}
              </Link> */}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-2.5 text-base"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                t("signIn")
              )}
            </button>
          </form>

          {/* Demo accounts */}
          {/* <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-sm text-gray-700 mb-3">🔑 {t('demoAccounts')}</p>
            <div className="space-y-2 text-xs">
              <button onClick={() => fillDemo('student@school.com', 'student123')}
                className="w-full text-left px-3 py-2 bg-white rounded-lg border hover:border-emerald-400 hover:bg-emerald-50">
                🎓 Student: student@school.com / student123
              </button>
              <button onClick={() => fillDemo('parent@school.com', 'parent123')}
                className="w-full text-left px-3 py-2 bg-white rounded-lg border hover:border-emerald-400 hover:bg-emerald-50">
                👨‍👩‍👧 Parent: parent@school.com / parent123
              </button>
              <button onClick={() => fillDemo('teacher@school.com', 'teacher123')}
                className="w-full text-left px-3 py-2 bg-white rounded-lg border hover:border-emerald-400 hover:bg-emerald-50">
                👨‍🏫 Teacher: teacher@school.com / teacher123
              </button>
              <Link to="/" className="block px-3 py-2 text-center text-emerald-600 hover:underline">
                ← Back to Home
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
