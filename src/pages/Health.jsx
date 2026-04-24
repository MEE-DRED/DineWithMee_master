import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { healthConditions, trimesters } from '../data/healthConditions';

const Health = () => {
  const navigate = useNavigate();
  const [expandedCondition, setExpandedCondition] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleCondition = (id) => {
    setExpandedCondition(expandedCondition === id ? null : id);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How are meal recommendations validated?",
      answer: "Meals are mapped to nutrition profiles, clinical goals, and evidence-informed guidance reviewed by our nutrition advisory team."
    },
    {
      question: "Do your programs replace medical treatment?",
      answer: "No. Dine with Mee supports preventive and adjunct nutrition care and should be used alongside clinician guidance."
    },
    {
      question: "Why focus on culturally relevant African foods?",
      answer: "Familiar foods improve adherence, reduce friction, and help users sustain healthier patterns over the long term."
    },
    {
      question: "How often is research content updated?",
      answer: "Our summaries are reviewed quarterly and updated whenever high-quality evidence materially changes clinical recommendations."
    }
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
              <span>Health Hub</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Health Hub
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Condition-focused care, maternal nutrition pathways, and research-backed guidance in one place.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Condition-Based Nutrition Programs */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
              Clinical Wellness Library
            </span>
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">
              Condition-Based Nutrition Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Each care card covers the condition, clinical risks, and an actionable nutrition strategy with direct meal pathways.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {healthConditions.map((condition, index) => (
              <motion.article
                key={condition.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-emerald-900 mb-3">
                  {condition.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {condition.preview}
                </p>
                <button
                  onClick={() => toggleCondition(condition.id)}
                  className="text-emerald-700 font-semibold hover:text-emerald-600 transition-colors inline-flex items-center gap-2"
                >
                  {expandedCondition === condition.id ? 'Close Guide' : 'Explore Guide'} →
                </button>

                {expandedCondition === condition.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 pt-6 border-t border-gray-200 space-y-6"
                  >
                    <div>
                      <h4 className="text-lg font-bold text-emerald-900 mb-2">Clinical focus</h4>
                      <p className="text-gray-700 leading-relaxed">
                        {condition.clinicalFocus}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-emerald-900 mb-3">Nutrition priorities</h4>
                      <ul className="space-y-2">
                        {condition.nutritionPriorities.map((priority, pIndex) => (
                          <li key={pIndex} className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{priority}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {condition.links.map((link, lIndex) => (
                        <a
                          key={lIndex}
                          href={link.href}
                          className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors"
                        >
                          {link.text}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.article>
            ))}
          </div>

          <p className="text-center text-sm text-gray-600 italic">
            This hub is educational and should complement, not replace, personalized medical care.
          </p>
        </div>
      </section>

      {/* Maternal Nutrition Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold mb-4">
              Trimester Guidance
            </span>
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">
              Structured Maternal Nutrition by Stage
            </h2>
            <p className="text-lg text-gray-600">
              Each trimester includes nutritional needs, food sources, practical guidance, and recommended meals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {trimesters.map((trimester, index) => (
              <motion.article
                key={trimester.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-xl border-2 border-pink-200"
              >
                <h3 className="text-xl font-bold text-emerald-900 mb-6">
                  {trimester.title}
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-pink-700 mb-2">Nutritional needs</h4>
                    <ul className="space-y-2">
                      {trimester.nutritionalNeeds.map((need, nIndex) => (
                        <li key={nIndex} className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{need}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-pink-700 mb-2">Food sources</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {trimester.foodSources}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-pink-700 mb-2">Guidance</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {trimester.guidance}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-pink-700 mb-2">Recommended meals</h4>
                    <div className="flex flex-wrap gap-2">
                      {trimester.recommendedMeals.map((meal, mIndex) => (
                        <span
                          key={mIndex}
                          className="px-3 py-1 bg-white border border-pink-200 rounded-full text-xs text-gray-700"
                        >
                          {meal}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/marketplace')}
              className="px-8 py-4 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors inline-flex items-center gap-2"
            >
              Browse Pregnancy-Friendly Meals →
            </button>
          </div>
        </div>
      </section>

      {/* Speak to Expert Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-900 to-emerald-800 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-2 bg-amber-400/20 text-amber-400 rounded-full text-sm font-semibold mb-4">
              Specialist Care
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Speak to a Nutrition Expert
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Get personalized maternal nutrition coaching aligned with trimester needs, symptoms, lab values, and lifestyle realities.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-amber-400 text-emerald-900 rounded-lg font-semibold hover:bg-amber-300 transition-colors"
            >
              Book Expert Session
            </button>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
              FAQ
            </span>
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">
              Research and Clinical Transparency
            </h2>
            <p className="text-lg text-gray-600">
              Answers to common questions about our evidence model and nutrition recommendations.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-emerald-50 transition-colors duration-200"
                  aria-expanded={openFaqIndex === index}
                >
                  <span className="text-lg font-semibold text-emerald-900 pr-8">
                    {faq.question}
                  </span>
                  <span className={`text-2xl text-emerald-700 flex-shrink-0 transition-transform duration-300 ${
                    openFaqIndex === index ? 'rotate-45' : ''
                  }`}>
                    +
                  </span>
                </button>
                {openFaqIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-8 pb-6"
                  >
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="bg-gradient-to-br from-amber-50 to-emerald-50 rounded-2xl p-12"
          >
            <span className="inline-block px-4 py-2 bg-emerald-700 text-white rounded-full text-sm font-semibold mb-4">
              Clinical Action
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-6">
              Ready to turn guidance into daily meals?
            </h2>
            <button
              onClick={() => navigate('/marketplace')}
              className="px-8 py-4 bg-emerald-800 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              Open Marketplace →
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Health;
