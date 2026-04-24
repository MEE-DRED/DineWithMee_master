import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ClinicalProgram {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  color: string;
}

const programs: ClinicalProgram[] = [
  {
    id: 'diabetes',
    title: 'Diabetes Care',
    description: 'Low glycemic meal support, fiber-first planning, and guided blood sugar nutrition strategies.',
    image: 'https://www.azpcps.com/wp-content/uploads/2024/01/Diet-for-Diabetes-Management.jpg',
    link: '/programs/diabetes',
    color: 'blue',
  },
  {
    id: 'hypertension',
    title: 'Hypertension Support',
    description: 'Heart-conscious food pathways designed to lower sodium load and improve cardiometabolic outcomes.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&h=300&q=80',
    link: '/programs/hypertension',
    color: 'red',
  },
  {
    id: 'maternal',
    title: 'Maternal Health',
    description: 'Trimester-aligned nutrition protocols to support fetal development and maternal recovery.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&h=300&q=80',
    link: '/maternal',
    color: 'pink',
  },
  {
    id: 'obesity',
    title: 'Weight Management',
    description: 'Portion-smart, high satiety meal pathways supporting sustainable fat loss and metabolic balance.',
    image: 'https://www.heart.org/-/media/AHA/H4GM/Article-Images/Lose-Weight-and-Keep-It-Off.jpg?sc_lang=en',
    link: '/programs/weight-management',
    color: 'orange',
  },
  {
    id: 'sickle-cell',
    title: 'Sickle Cell Support',
    description: 'Iron and folate aware nutrition support to improve blood health, energy levels, and recovery resilience.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&h=300&q=80',
    link: '/programs/sickle-cell',
    color: 'purple',
  },
];

const ClinicalFocusGrid: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white" id="clinical-focus">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-tag"
          >
            Clinical Nutrition First
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-900 mb-4"
          >
            Our Clinical Focus
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-stone-600 leading-relaxed"
          >
            Every care path combines personalized nutrition intelligence with culturally relevant African meals and practical expert guidance.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {programs.map((program) => (
            <motion.article
              key={program.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="card hover-lift group"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-emerald-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {program.title}
                </h3>
                <p className="text-stone-600 leading-relaxed mb-4 line-clamp-3">
                  {program.description}
                </p>
                <Link
                  to={program.link}
                  className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-sm transition-colors group/link"
                >
                  <span>Explore Program</span>
                  <svg
                    className="w-5 h-5 group-hover/link:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Hover Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-amber-600 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.article>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-stone-600 mb-6 text-lg">
            Not sure which program is right for you?
          </p>
          <Link
            to="/health"
            className="btn-secondary inline-block"
          >
            Take Health Assessment
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ClinicalFocusGrid;
