import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProgramById } from '../data/programs';
import { motion } from 'framer-motion';

const ProgramDetail = () => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const program = getProgramById(programId);

  useEffect(() => {
    if (program) {
      document.title = `${program.title} | Dine with Mee`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [program]);

  if (!program) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-emerald-900 mb-4">Program Not Found</h1>
          <p className="text-gray-600 mb-8">The program you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/programs')}
            className="px-8 py-3 bg-emerald-800 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            View All Programs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-emerald-900 py-4">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between text-white">
            <div className="text-xl font-bold">
              Dine with <span className="text-amber-400">Mee</span>
            </div>
            <nav className="hidden md:flex gap-6 text-sm">
              <a href="/" className="hover:text-amber-400 transition-colors">Home</a>
              <a href="/programs" className="hover:text-amber-400 transition-colors">Explore All Programs</a>
              <a href="/health" className="hover:text-amber-400 transition-colors">Health Hub</a>
            </nav>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-6">
            {program.category}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 mb-8 leading-tight">
            {program.title}
          </h1>
        </motion.div>

        {/* Hero Image */}
        {program.image && (
          <motion.figure
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl"
          >
            <img
              src={program.image}
              alt={program.title}
              className="w-full h-full object-cover"
              style={{ objectPosition: program.imagePosition || '50% 50%' }}
            />
          </motion.figure>
        )}

        {/* Meta Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-4 text-sm text-gray-600 mb-12 pb-8 border-b border-gray-200"
        >
          <span>{program.date}</span>
          <span>•</span>
          <span>{program.readTime}</span>
        </motion.div>

        {/* Program Content Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-lg max-w-none"
        >
          {program.sections.map((section, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-3xl font-bold text-emerald-900 mb-6">
                {section.title}
              </h2>

              {/* Content Paragraphs */}
              {section.content && section.content.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-gray-700 leading-relaxed mb-4 text-lg">
                  {paragraph}
                </p>
              ))}

              {/* List Items */}
              {section.list && (
                <ul className="space-y-3 mb-6">
                  {section.list.map((item, lIndex) => (
                    <li key={lIndex} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-amber-400 rounded-full mt-2 mr-4 flex-shrink-0" />
                      <span className="text-gray-700 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Table */}
              {section.table && (
                <div className="overflow-x-auto my-8">
                  <table className="w-full border-collapse bg-emerald-50 rounded-lg overflow-hidden shadow-md">
                    <thead>
                      <tr className="bg-emerald-800 text-white">
                        {section.table.headers.map((header, hIndex) => (
                          <th
                            key={hIndex}
                            className="px-6 py-4 text-left text-sm font-semibold"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, rIndex) => (
                        <tr
                          key={rIndex}
                          className={rIndex % 2 === 0 ? 'bg-white' : 'bg-emerald-50'}
                        >
                          {row.map((cell, cIndex) => (
                            <td
                              key={cIndex}
                              className="px-6 py-4 text-gray-700 border-t border-emerald-100"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-white border-2 border-emerald-800 text-emerald-800 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
          >
            Return Home
          </button>
          <button
            onClick={() => navigate('/programs')}
            className="px-8 py-4 bg-emerald-800 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Explore All Programs
          </button>
        </motion.div>
      </article>
    </div>
  );
};

export default ProgramDetail;
