import { GraduationCap, Users, Target, Eye, HeartHandshake, ShieldCheck, ArrowRight, Medal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import schoolImg from '../../../school.jpg';

const About = () => {
  const { t } = useLanguage();

  const values = [
    { icon: Target, title: 'Mission', desc: 'To provide quality education that empowers students with knowledge, skills, and values to become responsible citizens and lifelong learners.' },
    { icon: Eye, title: 'Vision', desc: 'To be the leading educational institution in Cambodia, nurturing future generations with excellence and integrity.' },
    { icon: HeartHandshake, title: 'Core Values', desc: 'Integrity, Excellence, Respect, Creativity, and Community. We believe in building character alongside academics.' },
    { icon: ShieldCheck, title: 'Safety First', desc: 'Our campus is secure with CCTV, trained staff, and strict safety procedures to ensure students are always protected.' },
  ];

  const milestones = [
    { year: '2001', title: 'School Founded', desc: 'Opened our doors with 150 students and 10 teachers.' },
    { year: '2008', title: 'New Campus', desc: 'Moved to our current campus with modern facilities.' },
    { year: '2014', title: 'Computer Lab', desc: 'Introduced computer education with 50 modern PCs.' },
    { year: '2019', title: 'STEM Program', desc: 'Launched our specialized STEM program.' },
    { year: '2024', title: '2,000 Students', desc: 'Reached 2,000 students with 100+ dedicated staff.' },
  ];

  return (
    <div className="space-y-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-emerald-800 to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">About Trust School</h1>
          <p className="text-emerald-100 max-w-2xl mx-auto">
            For over two decades, we have been shaping the minds of Cambodia's future leaders.
            Learn about our story, mission, and the values that guide us.
          </p>
        </div>
      </section>

      {/* School intro with image */}
      <section className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <img src={schoolImg} alt="Our School" className="rounded-2xl shadow-lg w-[450px] h-[400px] object-cover" />
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Founded in 2001, Trust School began with a simple vision: to provide Cambodian students with
            a world-class education rooted in our rich cultural heritage. Starting with just 20 students,
            we have grown into one of the nation's most respected educational institutions.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Today, we serve over 2,000 students from primary through high school, with modern facilities,
            a dedicated team of 100+ teachers, and a curriculum that blends the best of Cambodian
            and international education standards.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We believe every student has the potential to succeed, and our role is to nurture that
            potential with guidance, encouragement, and the tools they need to thrive.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="card p-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Journey</h2>
        <div className="relative">
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-emerald-200" />
          <div className="space-y-8">
            {milestones.map((ms, idx) => (
              <div key={idx} className={`relative flex flex-col lg:flex-row gap-4 ${idx % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="absolute left-4 lg:left-1/2 top-2 w-2 h-2 rounded-full bg-emerald-600 -translate-x-1/2" />
                <div className="ml-10 lg:ml-0 lg:w-1/2 lg:px-8 lg:text-right">
                  {idx % 2 === 0 ? (
                    <div className="card p-4">
                      <p className="text-emerald-600 font-bold">{ms.year}</p>
                      <h3 className="font-semibold">{ms.title}</h3>
                      <p className="text-sm text-gray-500">{ms.desc}</p>
                    </div>
                  ) : (
                    <div className="hidden" />
                  )}
                  {idx % 2 === 1 ? (
                    <div className="card p-4">
                      <p className="text-emerald-600 font-bold">{ms.year}</p>
                      <h3 className="font-semibold">{ms.title}</h3>
                      <p className="text-sm text-gray-500">{ms.desc}</p>
                    </div>
                  ) : (
                    <div className="hidden" />
                  )}
                </div>
                <div className="lg:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-emerald-600 rounded-2xl p-12 text-center text-white">
          <Medal className="w-16 h-16 mx-auto mb-4 text-emerald-200" />
          <h2 className="text-3xl font-bold mb-2">Join Our Community</h2>
          <p className="text-emerald-100 mb-6">Begin your child's journey to success today.</p>
          <Link to="/contact" className="bg-white text-emerald-700 px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-emerald-50 transition-colors">
            {t('applyNow')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
