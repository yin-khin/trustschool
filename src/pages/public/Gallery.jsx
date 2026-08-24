import { useState } from 'react';
import { Building2, BookOpen, Monitor, FlaskConical, Trophy, Users, GraduationCap, Image as ImageIcon, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import schoolImg from '../../../school.jpg';

const Gallery = () => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = [
    { key: 'all', label: 'All', icon: ImageIcon },
    { key: 'building', label: 'School Building', icon: Building2 },
    { key: 'classroom', label: 'Classroom', icon: Users },
    { key: 'library', label: 'Library', icon: BookOpen },
    { key: 'computer', label: 'Computer Lab', icon: Monitor },
    { key: 'science', label: 'Science Lab', icon: FlaskConical },
    { key: 'sports', label: 'Sports', icon: Trophy },
    { key: 'event', label: 'Events', icon: GraduationCap },
  ];

  const photos = [
    { src: schoolImg, category: 'building', label: 'School Building', desc: 'Our main building' },
    { src: schoolImg, category: 'classroom', label: 'Classroom', desc: 'Modern learning spaces' },
    { src: schoolImg, category: 'library', label: 'Library', desc: 'Our library collection' },
    { src: schoolImg, category: 'computer', label: 'Computer Lab', desc: '50 modern computers' },
    { src: schoolImg, category: 'science', label: 'Science Lab', desc: 'Chemistry and physics lab' },
    { src: schoolImg, category: 'sports', label: 'Sports Day', desc: 'Annual sports event' },
    { src: schoolImg, category: 'event', label: 'Graduation', desc: 'Graduation ceremony' },
    { src: schoolImg, category: 'event', label: 'School Festival', desc: 'Cultural festival' },
    { src: schoolImg, category: 'classroom', label: 'Students Activity', desc: 'Group learning' },
    { src: schoolImg, category: 'building', label: 'Campus', desc: 'Green campus' },
    { src: schoolImg, category: 'library', label: 'Reading Corner', desc: 'Reading corner' },
    { src: schoolImg, category: 'sports', label: 'Football Field', desc: 'Sports field' },
  ];

  const filtered = filter === 'all' ? photos : photos.filter(p => p.category === filter);

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="bg-gradient-to-br from-emerald-800 to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">School Gallery</h1>
          <p className="text-emerald-100">Explore our campus, classrooms, labs, and events</p>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === cat.key
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
              }`}
            >
              <cat.icon className="w-4 h-4 inline mr-1" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {filtered.map((photo, idx) => (
            <div
              key={idx}
              className="relative rounded-xl overflow-hidden group cursor-pointer"
              onClick={() => setSelected(photo)}
            >
              <img src={photo.src} alt={photo.label} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div>
                  <p className="text-white font-semibold">{photo.label}</p>
                  <p className="text-white/70 text-sm">{photo.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <button className="absolute top-4 right-4 text-white" onClick={() => setSelected(null)}>
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-4xl">
            <img src={selected.src} alt={selected.label} className="rounded-xl max-h-[75vh] w-auto mx-auto" />
            <div className="text-center text-white mt-4">
              <p className="text-xl font-semibold">{selected.label}</p>
              <p className="text-white/70">{selected.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;