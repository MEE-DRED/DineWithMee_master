import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ChefPartner = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    brandName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    experience: '',
    kitchenType: '',
    cuisines: [],
    signatureDishes: '',
    certification: '',
    portfolio: '',
    story: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'cuisines') {
      setFormData(prev => ({
        ...prev,
        cuisines: checked
          ? [...prev.cuisines, value]
          : prev.cuisines.filter(c => c !== value)
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
    }, 1500);
  };

  const benefits = [
    {
      title: "Brand Visibility",
      description: "Dedicated chef profile, featured placements, and storytelling space for your culinary identity."
    },
    {
      title: "Order Operations",
      description: "Simple order flow, clear prep timelines, and transparent earnings tracking in one workflow."
    },
    {
      title: "Nutrition Positioning",
      description: "Align your menu with preventive health needs and join a mission-driven food ecosystem."
    },
    {
      title: "Growth Support",
      description: "Campaign partnerships, retention insights, and seasonal promotion opportunities to scale."
    }
  ];

  const steps = [
    {
      num: 1,
      title: "Apply Online",
      description: "Share your profile, kitchen details, cuisine specialties, and signature dishes."
    },
    {
      num: 2,
      title: "Review & Call",
      description: "Our partnership team reviews your submission and schedules a qualification call."
    },
    {
      num: 3,
      title: "Menu Onboarding",
      description: "Finalize menu standards, pricing guidance, portions, and fulfillment readiness."
    },
    {
      num: 4,
      title: "Go Live",
      description: "Launch your menu on Dine with Mee and start receiving customer orders."
    }
  ];

  const cuisineOptions = [
    "West Africa",
    "East Africa",
    "North Africa",
    "Central Africa",
    "Southern Africa",
    "Pan-African Fusion"
  ];

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
              <span>Chef Partner</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Become an African Chef Partner
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-8">
              Bring your regional recipes to a wider audience and grow your culinary brand with a health-focused digital marketplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#chef-partner-apply"
                className="px-8 py-4 bg-amber-400 text-emerald-900 rounded-lg font-semibold hover:bg-amber-300 transition-colors"
              >
                Start Application
              </a>
              <button
                onClick={() => navigate('/marketplace')}
                className="px-8 py-4 bg-white text-emerald-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                See Live Marketplace
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Intro Section */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
              Chef Partnership Program
            </span>
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">
              Cook with Purpose. Earn with Pride.
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We partner with talented African chefs to deliver trusted meals that balance cultural heritage, nutrition quality, and modern convenience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.article
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-emerald-900 mb-6">
                Why partner with Dine with Mee?
              </h3>
              <ul className="space-y-4">
                {[
                  "Reach nutrition-conscious customers across local and diaspora markets",
                  "Showcase signature dishes with your chef profile and story",
                  "Access demand insights to plan smarter menus and inventory",
                  "Benefit from platform promotion, campaigns, and featured chef spots"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-amber-400 rounded-full mt-2 mr-4 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-amber-50 to-emerald-50 p-8 rounded-xl border-2 border-amber-200"
            >
              <h3 className="text-2xl font-bold text-emerald-900 mb-6">
                Partner Snapshot
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "18+", label: "African cuisines represented" },
                  { value: "48h", label: "Average onboarding response" },
                  { value: "4.7/5", label: "Average diner rating for chef partners" },
                  { value: "Weekly", label: "Performance and menu support touchpoints" }
                ].map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-emerald-900 mb-2">{metric.value}</div>
                    <div className="text-sm text-gray-600">{metric.label}</div>
                  </div>
                ))}
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
              What You Get
            </span>
            <h2 className="text-4xl font-bold text-emerald-900">
              Built for Professional African Chefs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-emerald-50 p-6 rounded-xl border border-emerald-200"
              >
                <h3 className="text-xl font-bold text-emerald-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
              How It Works
            </span>
            <h2 className="text-4xl font-bold text-emerald-900">
              4-Step Partnership Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 relative"
              >
                <div className="absolute -top-4 left-6 w-12 h-12 bg-amber-400 text-emerald-900 rounded-full flex items-center justify-center text-2xl font-bold">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-3 mt-6">
                  {step.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {step.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section id="chef-partner-apply" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Requirements */}
            <motion.article
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="lg:col-span-2"
            >
              <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-6">
                Eligibility
              </span>
              <h2 className="text-3xl font-bold text-emerald-900 mb-4">
                Who should apply?
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We welcome independent chefs, culinary teams, and food businesses that can deliver quality, consistency, and hygiene standards.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Professional kitchen setup (home-commercial or commercial)",
                  "Clear food safety and hygiene practices",
                  "Reliable prep capacity and order turnaround",
                  "Strong mastery of at least one African cuisine"
                ].map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm text-gray-600">
                Need help before applying?{' '}
                <button
                  onClick={() => navigate('/contact')}
                  className="text-emerald-700 font-semibold hover:text-emerald-600"
                >
                  Contact partnerships
                </button>
                .
              </p>
            </motion.article>

            {/* Application Form */}
            <motion.article
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-emerald-900 mb-2">
                Chef Partner Application
              </h2>
              <p className="text-gray-600 mb-8">
                Complete the form below and our partnerships team will contact you within 48 hours.
              </p>

              {submitStatus === 'success' && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg mb-6">
                  Thank you for applying! Our partnerships team will review your application and contact you within 48 hours.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Chef Brand / Kitchen Name
                    </label>
                    <input
                      type="text"
                      name="brandName"
                      value={formData.brandName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Years of Culinary Experience
                    </label>
                    <input
                      type="number"
                      name="experience"
                      min="0"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Kitchen Type
                    </label>
                    <select
                      name="kitchenType"
                      value={formData.kitchenType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="">Select kitchen type</option>
                      <option value="home-commercial">Home-Commercial Kitchen</option>
                      <option value="commercial">Commercial Kitchen</option>
                      <option value="restaurant">Restaurant Kitchen</option>
                      <option value="cloud">Cloud Kitchen</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Primary Cuisine Styles (choose at least one)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {cuisineOptions.map((cuisine) => (
                      <label key={cuisine} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="cuisines"
                          value={cuisine}
                          checked={formData.cuisines.includes(cuisine)}
                          onChange={handleChange}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm text-gray-700">{cuisine}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Top 3 Signature Dishes
                  </label>
                  <textarea
                    name="signatureDishes"
                    value={formData.signatureDishes}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="Example: Jollof Rice, Egusi Soup, Grilled Tilapia"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Food Safety Certification (Optional)
                    </label>
                    <input
                      type="text"
                      name="certification"
                      value={formData.certification}
                      onChange={handleChange}
                      placeholder="HACCP, local license, etc."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Instagram or Portfolio Link (Optional)
                    </label>
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      placeholder="https://"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Why do you want to partner with Dine with Mee?
                  </label>
                  <textarea
                    name="story"
                    value={formData.story}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      required
                      className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 mt-0.5"
                    />
                    <span className="text-sm text-gray-700">
                      I confirm that all information provided is accurate and I agree to be contacted by the Dine with Mee partnerships team.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-emerald-800 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                </button>
              </form>
            </motion.article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-900 to-emerald-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-2 bg-amber-400/20 text-amber-400 rounded-full text-sm font-semibold mb-4">
            Next Step
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to put your menu in front of more customers?
          </h2>
          <a
            href="#chef-partner-apply"
            className="px-8 py-4 bg-amber-400 text-emerald-900 rounded-lg font-semibold hover:bg-amber-300 transition-colors inline-block"
          >
            Apply Now →
          </a>
        </div>
      </section>
    </div>
  );
};

export default ChefPartner;
