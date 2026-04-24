import React from 'react';
import { useNavigate } from 'react-router-dom';
import { programs } from '../data/programs';
import { motion } from 'framer-motion';

const Programs = () => {
  const navigate = useNavigate();

  const handleProgramClick = (programId) => {
    navigate(`/programs/${programId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero Section */}
      <div className="bg-emerald-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-2 bg-amber-400/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              Clinical Wellness Programs
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Explore All Programs
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Choose any pathway below to open the full editorial article with implementation guidance and practical nutrition structure.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.article
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
              onClick={() => handleProgramClick(program.id)}
            >
              {/* Program Image */}
              {program.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ objectPosition: program.imagePosition || '50% 50%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-amber-400 text-emerald-900 text-xs font-semibold rounded-full">
                    {program.category}
                  </span>
                </div>
              )}

              {/* Program Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-emerald-900 mb-3 group-hover:text-emerald-700 transition-colors">
                  {program.title}
                </h3>

                <p className="text-sm text-gray-500 mb-4">
                  {program.date} • {program.readTime}
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {program.preview}
                </p>

                <button
                  className="w-full py-3 bg-emerald-800 text-white rounded-lg font-semibold
                           hover:bg-emerald-700 transition-colors duration-300
                           group-hover:bg-emerald-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProgramClick(program.id);
                  }}
                >
                  View Program →
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-white border-2 border-emerald-800 text-emerald-800 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              Return Home
            </button>
            <button
              onClick={() => navigate('/programs/glycemic-reset')}
              className="px-8 py-4 bg-emerald-800 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              Open Featured Program
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Programs;
