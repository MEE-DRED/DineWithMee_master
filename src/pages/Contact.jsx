import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        topic: '',
        phone: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 text-sm text-emerald-100 mb-4">
              <a href="/" className="hover:text-amber-400 transition-colors">Home</a>
              <span>›</span>
              <span>Contact</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Contact Dine with Mee
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Speak with our nutrition care team, partnership desk, or customer support specialists.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.article
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-6">
                Get in Touch
              </span>
              <h2 className="text-3xl font-bold text-emerald-900 mb-4">
                We are here to support your wellness journey
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Whether you need program guidance, order support, or partnership information, our team responds quickly with personalized help.
              </p>

              <div className="mb-8">
                <button
                  onClick={() => navigate('/chef-partner')}
                  className="w-full px-6 py-4 bg-emerald-800 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Become an African Chef Partner
                </button>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-amber-400 pl-4">
                  <h3 className="font-bold text-emerald-900 mb-1">Email</h3>
                  <p className="text-gray-700">care@dinewithmee.com</p>
                </div>
                <div className="border-l-4 border-amber-400 pl-4">
                  <h3 className="font-bold text-emerald-900 mb-1">Phone</h3>
                  <p className="text-gray-700">+250 700 000 000</p>
                </div>
                <div className="border-l-4 border-amber-400 pl-4">
                  <h3 className="font-bold text-emerald-900 mb-1">Office</h3>
                  <p className="text-gray-700">Kigali Health Innovation District, Rwanda</p>
                </div>
                <div className="border-l-4 border-amber-400 pl-4">
                  <h3 className="font-bold text-emerald-900 mb-1">Support Hours</h3>
                  <p className="text-gray-700">Mon - Fri: 8:00 AM to 7:00 PM CAT</p>
                </div>
              </div>
            </motion.article>

            {/* Contact Form */}
            <motion.article
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-emerald-900 mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Tell us how we can help and a specialist will respond shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="topic" className="block text-sm font-semibold text-gray-700 mb-2">
                      Topic
                    </label>
                    <select
                      id="topic"
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    >
                      <option value="">Choose topic</option>
                      <option value="clinical">Clinical Program Support</option>
                      <option value="orders">Meal Orders</option>
                      <option value="partnerships">Partnerships</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg">
                    Thank you! Your message has been sent successfully. We'll respond shortly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-emerald-800 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.article>
          </div>
        </div>
      </section>

      {/* Map/Additional Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Looking to become a chef partner?
            </h2>
            <p className="text-emerald-100 mb-8 text-lg">
              Join our network of talented African chefs and reach nutrition-conscious customers across local and diaspora markets.
            </p>
            <button
              onClick={() => navigate('/chef-partner')}
              className="px-8 py-4 bg-amber-400 text-emerald-900 rounded-lg font-semibold hover:bg-amber-300 transition-colors"
            >
              View Chef Partner Program →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
