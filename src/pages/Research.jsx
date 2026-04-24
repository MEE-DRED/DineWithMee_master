import React, { useState } from 'react';
import { motion } from 'framer-motion';

const researchArticles = [
  {
    tag: "Diabetes",
    title: "High-Fiber African Staples and Glycemic Stability",
    description: "Reviewing how legumes, fermented grains, and leafy greens improve post-meal blood glucose response in adults.",
    tagColor: "bg-purple-100 text-purple-700"
  },
  {
    tag: "Cardiometabolic",
    title: "Sodium Reduction Strategies in Urban African Diets",
    description: "Behavior-focused interventions for reducing sodium intake while preserving familiar flavor profiles.",
    tagColor: "bg-red-100 text-red-700"
  },
  {
    tag: "Maternal Care",
    title: "Trimester Nutrition Patterns and Birth Outcomes",
    description: "Association between iron/folate-rich diets and improved maternal and neonatal outcomes in community cohorts.",
    tagColor: "bg-pink-100 text-pink-700"
  }
];

const researchSummaries = [
  {
    title: "NCD Prevention",
    finding: "Diet quality is one of the strongest modifiable factors in long-term NCD risk reduction.",
    application: "Goal-based filtering highlights meals with high fiber, lower sodium, and improved nutrient density."
  },
  {
    title: "Maternal Nutrition",
    finding: "Trimester-specific micronutrient intake improves maternal energy and fetal growth outcomes.",
    application: "Maternal care pathways prioritize stage-based meal recommendations and expert review."
  },
  {
    title: "Behavior Change",
    finding: "People sustain healthier diets when choices remain culturally familiar and easy to access.",
    application: "Regional meal catalog with local ingredients keeps adherence practical and meaningful."
  }
];

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

const Research = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
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
              <span>Nutrition Research</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Nutrition Research
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Clinical evidence, practical summaries, and transparent nutrition insights powering Dine with Mee programs.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Latest Articles Section */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
              Latest Articles
            </span>
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">
              Clinical Nutrition and African Food Systems
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Curated resources highlighting food-as-medicine pathways for chronic disease prevention and maternal health outcomes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {researchArticles.map((article, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
              >
                <span className={`inline-block px-3 py-1 ${article.tagColor} rounded-full text-xs font-semibold mb-4`}>
                  {article.tag}
                </span>
                <h3 className="text-xl font-bold text-emerald-900 mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {article.description}
                </p>
                <a
                  href="#"
                  className="text-emerald-700 font-semibold hover:text-emerald-600 transition-colors inline-flex items-center gap-2"
                >
                  Read Article →
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Research Summaries Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
              Research Summaries
            </span>
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">
              What the Evidence Says
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Concise interpretations of current evidence translated into practical recommendations used inside Dine with Mee.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {researchSummaries.map((summary, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-xl border-2 border-emerald-200 hover:border-emerald-400 transition-colors duration-300"
              >
                <h3 className="text-2xl font-bold text-emerald-900 mb-4">
                  {summary.title}
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-emerald-700 mb-2">Finding:</p>
                    <p className="text-gray-700 leading-relaxed">
                      {summary.finding}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-700 mb-2">How we apply it:</p>
                    <p className="text-gray-700 leading-relaxed">
                      {summary.application}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
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
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
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
      <section className="py-20 bg-emerald-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Health Journey?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Explore our clinical programs and discover personalized meal recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/programs"
                className="px-8 py-4 bg-amber-400 text-emerald-900 rounded-lg font-semibold hover:bg-amber-300 transition-colors inline-block"
              >
                Explore Programs
              </a>
              <a
                href="/marketplace"
                className="px-8 py-4 bg-white text-emerald-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                Browse Marketplace
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Research;
