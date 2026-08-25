import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  Trophy,
  HeartPulse,
  Building2,
  Library,
  Monitor,
  FlaskConical,
  ArrowRight,
  Star,
  CalendarDays,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import {
  classAPI,
  teacherAPI,
  announcementAPI,
  publicAPI,
  assetUrl,
} from "../../api";
import schoolImg from "../../../school.jpg";

const Home = () => {
  const { t } = useLanguage();
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [slides, setSlides] = useState([]);
  const [activeHero, setActiveHero] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [clsRes, tchRes, annRes, siteRes] = await Promise.all([
          classAPI.getAll({ limit: 100 }),
          teacherAPI.getAll({ limit: 100 }),
          announcementAPI.getAll({ limit: 3 }),
          publicAPI.getSite(),
        ]);
        setClasses(clsRes.data.data || []);
        setTeachers(tchRes.data.data || []);
        setAnnouncements(annRes.data.data || []);
        setSlides(
          Array.isArray(siteRes.data.data)
            ? siteRes.data.data
            : [siteRes.data.data],
        );
      } catch (e) {
        console.error("Load home data error:", e);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const timer = setInterval(
      () => setActiveHero((current) => (current + 1) % slides.length),
      5000,
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  const site = slides[activeHero] || {};
  const heroImage = site.heroImage
    ? site.heroImage.startsWith("data:") || site.heroImage.startsWith("http")
      ? site.heroImage
      : assetUrl(site.heroImage)
    : schoolImg;

  const stats = [
    {
      icon: Users,
      value: classes.reduce((s, c) => s + (c.Students?.length || 0), 0),
      label: "Students",
    },
    { icon: BookOpen, value: classes.length, label: "Classes" },
    {
      icon: GraduationCap,
      value: teachers.length,
      label: "Teachers",
    },
    { icon: Award, value: "-", label: "Pass Rate" },
  ];

  const programs = [
    {
      icon: BookOpen,
      title: "Primary Education",
      desc: "Grades 1-6 with strong foundation in Khmer, Math, and Sciences.",
    },
    {
      icon: GraduationCap,
      title: "Secondary Education",
      desc: "Grades 7-9 building critical thinking and advanced subjects.",
    },
    {
      icon: Award,
      title: "High School",
      desc: "Grades 10-12 preparing students for university and careers.",
    },
    {
      icon: Trophy,
      title: "STEM Program",
      desc: "Science, Technology, Engineering and Mathematics focus.",
    },
  ];

  const facilities = [
    { icon: Building2, label: "Modern Classrooms" },
    { icon: Library, label: "Library" },
    { icon: Monitor, label: "Computer Lab" },
    { icon: FlaskConical, label: "Science Lab" },
    { icon: HeartPulse, label: "Health Center" },
    { icon: Trophy, label: "Sports Facilities" },
  ];

  const galleryImages = [
    { src: schoolImg, label: "School Building" },
    { src: schoolImg, label: "Classroom" },
    { src: schoolImg, label: "Library" },
    { src: schoolImg, label: "Sports" },
    { src: schoolImg, label: "Computer Lab" },
    { src: schoolImg, label: "Graduation" },
  ];

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="relative h-[620px] overflow-hidden text-white">
        <img
          src={heroImage}
          alt={site.schoolName || "School"}
          className="absolute inset-0 h-[620px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 lg:py-36">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              {site.schoolName || t("welcomeToSchool")}
            </h1>
            <p className="text-xl lg:text-2xl text-emerald-200 font-medium mb-8">
              {site.motto || t("schoolMotto")}
            </p>
            <p className="text-emerald-100 mb-8 max-w-lg">
              {site.intro || t("schoolIntro")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors"
              >
                {t("applyNow")}
              </Link>
              <Link
                to="/about"
                className="border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                {t("learnMore")}
              </Link>
            </div>
          </div>
          <div className="absolute bottom-24 right-4 hidden sm:block bg-white text-emerald-700 px-6 py-4 rounded-xl shadow-lg">
            <p className="text-3xl font-bold">
              {site.yearsOfExcellence || "25+"}
            </p>
            <p className="text-sm">Years of Excellence</p>
          </div>
        </div>
        {slides.length > 1 && (
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id || index}
                type="button"
                onClick={() => setActiveHero(index)}
                aria-label={`Show Hero ${index + 1}`}
                className={`h-2 w-2 rounded-full ${index === activeHero ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <img
          src={schoolImg}
          alt="About our school"
          className="rounded-2xl   w-[480px] h-[420px] object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            About Trust School
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Founded in 2001, Trust School has been providing exceptional
            education to students in Cambodia for over two decades. Our
            commitment to academic excellence, character development, and
            holistic growth has made us one of the leading schools in the
            nation.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Our experienced teachers, modern facilities, and innovative
            curriculum prepare students to become confident, responsible, and
            successful individuals ready to contribute to society.
          </p>
          <Link to="/about" className="btn-primary">
            {t("learnMore")} <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Academic Programs
            </h2>
            <p className="text-gray-500">
              Comprehensive education from primary to high school
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((prog, idx) => (
              <div
                key={idx}
                className="card p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <prog.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{prog.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {prog.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Our Teachers
          </h2>
          <p className="text-gray-500">
            Meet our dedicated and qualified educators
          </p>
        </div>
        <div className="grid grid-cols-1  h-50  md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.slice(0, 4).map((teacher) => (
            <div
              key={teacher.id}
              className="card  hover:shadow-lg  h-50 transition-shadow"
            >
              <div className=" h-60  overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                {teacher.photo ? (
                  <img
                    src={assetUrl(teacher.photo)}
                    alt={teacher.first_name}
                    className="w-full h-100 object-cover"
                  />
                ) : (
                  <GraduationCap className="w-16 h-16 text-white/50" />
                )}
              </div>
              <div className="p-4  text-center">
                <h3 className="font-semibold">
                  {teacher.first_name} {teacher.last_name}
                </h3>
                <p className="text-xs text-emerald-600">
                  {teacher.specialization || "Teacher"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {teacher.qualification}
                </p>
              </div>
            </div>
          ))}
          {teachers.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              {t("noTeachers")}
            </div>
          )}
        </div>
      </section>

      {/* Facilities */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Our Facilities
            </h2>
            <p className="text-gray-500">
              Modern facilities to support learning
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {facilities.map((facility, idx) => (
              <div
                key={idx}
                className="card p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                  <facility.icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium">{facility.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {/* <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {t("gallery")}
            </h2>
            <p className="text-gray-500">Take a look inside our campus</p>
          </div>
          <Link
            to="/gallery"
            className="text-emerald-600 flex items-center gap-1 hover:underline"
          >
            {t("viewAll")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="relative rounded-xl overflow-hidden group cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <p className="text-white font-medium">{img.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Announcements */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            School Announcements
          </h2>
          <div className="space-y-4">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-amber-500" />
                  <h3 className="font-semibold">{ann.title}</h3>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {ann.content}
                </p>
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {new Date(ann.published_at).toLocaleDateString()}
                </p>
              </div>
            ))}
            {announcements.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No announcements yet
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
