import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, GraduationCap } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      detail: "123 Street, Phnom Penh, Cambodia",
    },
    { icon: Phone, title: "Phone", detail: "+855 23 456 888" },
    { icon: Mail, title: "Email", detail: "info@trust.edu.kh" },
    {
      icon: Clock,
      title: "Office Hours",
      detail: "Mon-Fri: 7:00 AM - 5:00 PM",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-emerald-800 to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-emerald-100">We'd love to hear from you</p>
        </div>
      </section>

      {/* Contact info + form */}
      <section className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
        {/* Contact info cards */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="card p-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                  <info.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm text-gray-900">
                  {info.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{info.detail}</p>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          {/* <div className="card p-6">
            <h3 className="font-semibold mb-4">Find Us</h3>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm font-medium">Interactive Map</p>
                <p className="text-xs">123 Street, Phnom Penh, Cambodia</p>
              </div>
            </div>
          </div> */}
          <div className="card p-6">
            <h3 className="font-semibold mb-4">Find Us</h3>

            <div className="rounded-lg overflow-hidden h-80 w-full">
              <iframe
                title="Trust School of Phnom Penh Location"
                src="https://www.google.com/maps?q=Royal+University+of+Phnom+Penh,+Russian+Federation+Boulevard,+Phnom+Penh,+Cambodia&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="card p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Send Us a Message
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Fill out the form and we'll get back to you soon.
          </p>

          {sent && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              ✓ Thank you! Your message has been sent successfully.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Full Name *</label>
              <input
                type="text"
                name="name"
                className="input"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="label">Email *</label>
              <input
                type="email"
                name="email"
                className="input"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="label">Phone</label>
              <input
                type="tel"
                name="phone"
                className="input"
                value={form.phone}
                onChange={handleChange}
                placeholder="+855 ..."
              />
            </div>
            <div>
              <label className="label">Message *</label>
              <textarea
                name="message"
                className="input"
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Write your message here..."
              />
            </div>
            <button type="submit" className="btn-primary w-full py-2.5">
              <Send className="w-4 h-4 mr-2" /> Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Apply now CTA */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-10 text-center text-white">
          <GraduationCap className="w-14 h-14 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Ready to Apply?</h2>
          <p className="text-emerald-100 mb-6">
            Enrollment for the new academic year is now open.
          </p>
          <button className="bg-white text-emerald-700 px-8 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors">
            Download Application Form
          </button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
