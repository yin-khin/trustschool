import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { announcementAPI, examAPI } from "../../api";

const Events = () => {
  const [openId, setOpenId] = useState(null);
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const [examRes, announcementRes] = await Promise.all([
          examAPI.getAll({ limit: 100 }),
          announcementAPI.getAll({ limit: 100 }),
        ]);
        const exams = (examRes.data.data || []).map((exam) => ({
          id: `exam-${exam.id}`,
          title: exam.name,
          date: exam.exam_date,
          time: `${exam.start_time || ""} - ${exam.end_time || ""}`,
          location: exam.room || "School campus",
          category: "Academic",
          desc: `${exam.Subject?.name || "Exam"} - ${exam.Class?.name || "All classes"}`,
          detail: `Total marks: ${exam.total_marks || 100}. Pass marks: ${exam.pass_marks || 40}.`,
        }));
        const announcements = (announcementRes.data.data || [])
          .filter((item) => ["event", "holiday"].includes(item.type))
          .map((item) => ({
            id: `announcement-${item.id}`,
            title: item.title,
            date: item.published_at || item.created_at,
            time: "",
            location: "School campus",
            category: item.type === "holiday" ? "Holiday" : "Event",
            desc: item.content,
            detail: item.content,
          }));
        setEvents([...exams, ...announcements]);
      } catch (error) {
        console.error("Load events error:", error);
      }
    };
    loadEvents();
  }, []);

  const categories = ["all", ...new Set(events.map((event) => event.category))];
  const filtered =
    filter === "all" ? events : events.filter((e) => e.category === filter);
  const fmt = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="space-y-12">
      <section className="bg-gradient-to-br from-emerald-800 to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">School Events</h1>
          <p className="text-emerald-100">Click any event for full details</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === cat ? "bg-emerald-600 text-white" : "bg-white border border-gray-200 text-gray-600"}`}
            >
              {cat === "all" ? "All Events" : cat}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((ev) => {
            const isOpen = openId === ev.id;
            return (
              <div key={ev.id} className="card overflow-hidden">
                <button
                  className="w-full text-left"
                  onClick={() => setOpenId(isOpen ? null : ev.id)}
                >
                  <div className="flex items-center gap-4 p-5 hover:bg-gray-50">
                    <div className="w-14 h-14 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <CalendarDays className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="badge-info">{ev.category}</span>
                        <span className="text-xs text-gray-500">
                          {fmt(ev.date)}
                        </span>
                      </div>
                      <h2 className="font-semibold text-lg">{ev.title}</h2>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {ev.desc}
                      </p>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 border-t border-gray-100">
                    <div className="grid md:grid-cols-3 gap-4 mt-4 text-sm text-gray-600">
                      <span className="flex items-center gap-2">
                        <Clock3 className="w-4 h-4 text-emerald-600" />{" "}
                        {ev.time}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600" />{" "}
                        {ev.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-emerald-600" />{" "}
                        {fmt(ev.date)}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-4">{ev.detail}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Events;
