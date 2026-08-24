import { Outlet, Link, useLocation } from "react-router-dom";
import {
  GraduationCap,
  Home,
  Info,
  BookOpen,
  Image as Images,
  Newspaper,
  CalendarDays,
  Mail,
  Phone,
  MapPin,
  Languages,
  LogIn,
  Menu,
  X,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useState } from "react";
import Schools from "../../school.jpg";
const PublicLayout = () => {
  const { t, lang, toggleLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: t("home"), path: "/", icon: Home },
    { name: t("about"), path: "/about", icon: BookOpen },
    { name: t("programs"), path: "/programs", icon: BookOpen },
    { name: t("news"), path: "/news", icon: Newspaper },
    { name: t("events"), path: "/events", icon: CalendarDays },
    // { name: t("gallery"), path: "/gallery", icon: Images },
    { name: t("contact"), path: "/contact", icon: Mail },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> +855 23 222 888
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> info@trust.edu.kh
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Languages className="w-3.5 h-3.5" />
              {lang === "en" ? "ខ្មែរ" : "English"}
            </button>
            <Link
              to="/login"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" /> {t("login")}
            </Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              {/* <GraduationCap className="w-6 h-6" /> */}
              <img src={Schools} alt="Trust School" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                Trust School
              </h1>
              <p className="text-xs text-emerald-600 font-medium">
                {t("tagline")}
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/login" className="ml-2 btn-primary">
              {t("login")}
            </Link>
          </nav>

          <button
            className="lg:hidden text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                  isActive(item.path)
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-medium bg-primary text-white"
            >
              {t("login")}
            </Link>
          </nav>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-emerald-900 text-emerald-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  {/* <GraduationCap className="w-5 h-5" /> */}
                  <img src={Schools} alt="Trust School" className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-white">Trust School</h3>
              </div>
              <p className="text-sm text-emerald-200">{t("schoolIntro")}</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-white">
                    {t("home")}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white">
                    {t("about")}
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-white">
                    {t("gallery")}
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-white">
                    {t("login")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Phnom Penh, Cambodia
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> +855 23 456 888
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> info@trust.edu.kh
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Hours</h4>
              <ul className="space-y-1 text-sm">
                <li>Mon - Fri: 7:00 AM - 5:00 PM</li>
                <li>Saturday: 7:00 AM - 12:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-800 mt-8 pt-6 text-center text-sm text-emerald-300">
            © 2026 Trust School. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
