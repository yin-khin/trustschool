import { useEffect, useState } from "react";
import { CalendarDays, ChevronDown, ChevronUp } from "lucide-react";
import { announcementAPI, assetUrl } from "../../api";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const res = await announcementAPI.getAll({ limit: 100 });
        setArticles(res.data.data || []);
      } catch (error) {
        console.error("Load news error:", error);
      }
    };
    loadArticles();
  }, []);

  const fmt = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  const getColor = (c) =>
    ({
      Achievement: "badge-success",
      Facilities: "badge-info",
      Event: "badge-warning",
    })[c] || "badge-gray";
  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <div className="space-y-12">
      <section className="bg-gradient-to-br from-emerald-800 to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">School News</h1>
          <p className="text-emerald-100">
            Click any article to read the full story
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4">
        <div className="space-y-4">
          {articles.map((a) => {
            const isOpen = openId === a.id;
            return (
              <div key={a.id} className="card overflow-hidden">
                <button
                  className="w-full text-left"
                  onClick={() => toggle(a.id)}
                >
                  <div className="flex items-center gap-4 p-4 lg:p-5 hover:bg-gray-50">
                    {a.photo ? (
                      <img
                        src={assetUrl(a.photo)}
                        alt={a.title}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-emerald-100 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`badge ${getColor(a.type)}`}>
                          {a.type || "Notice"}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />{" "}
                          {fmt(a.published_at || a.created_at)}
                        </span>
                      </div>
                      <h2 className="font-semibold text-lg text-gray-900">
                        {a.title}
                      </h2>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {a.content}
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
                  <div className="px-4 pb-5 lg:px-6 lg:pb-6 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed mt-4 whitespace-pre-line">
                      {a.content}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default News;
