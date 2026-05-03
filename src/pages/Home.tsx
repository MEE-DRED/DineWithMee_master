import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/home/HeroSlider';
import ClinicalFocusGrid from '../components/home/ClinicalFocusGrid';
import StatsSection from '../components/home/StatsSection';
import FeaturedMeals from '../components/home/FeaturedMeals';
import ProgramCard from '../components/home/ProgramCard';
import TestimonialsCarousel from '../components/home/TestimonialsCarousel';
import { programs } from '../data/programs';
import { testimonials } from '../data/testimonials';
import MEEImg from '../assets/mee.png';

import { FiFileText, FiCpu, FiShoppingCart, FiTrendingUp } from 'react-icons/fi';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Clinical Focus Section */}
      <ClinicalFocusGrid />

      {/* Purpose Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            {/* Left: Content - takes 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <span className="section-tag">Our Purpose</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-900 mb-6">
                The Dine with Mee Mission
              </h2>
              <div className="space-y-4 text-lg text-stone-600 leading-relaxed mb-8">
                <p>
                  We exist to close the gap between clinical nutrition science and the foods African
                  families already trust. Dine with Mee translates care plans into everyday meals,
                  empowering households to prevent disease and heal with confidence.
                </p>
                <p>
                  From chronic condition management, we build tools that feel local,
                  evidence-backed, and deeply human.
                </p>
              </div>
              <Link to="/health" className="btn-primary inline-block">
                Explore Our Evidence Model
              </Link>
            </motion.div>

            {/* Right: Image - takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative lg:col-span-2"
            >
              <div className="relative rounded-dwm-lg overflow-hidden shadow-dwm-lg max-w-md mx-auto lg:mx-0">
                <img
                  src={MEEImg}
                  alt="Cooking with confidence and style"
                  loading="lazy"
                  className="w-full h-auto object-contain"
                />
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Meals */}
      <FeaturedMeals />

      {/* How It Works Section */}
      <section className="py-20 lg:py-28 bg-linear-to-b from-white to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold text-primary-600 bg-primary-100 px-3 py-1 rounded-full">
              Simple Process
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-extrabold text-primary-900 mt-4 mb-5">
              Health Transformation in 4 Steps
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              We translate complex nutritional science into a simple, empowering journey that honors
              your heritage and fits your life.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            {/* Dashed Connector Line */}
            <div className="hidden lg:block absolute top-1/3 left-0 w-full h-px">
              <svg width="100%" height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  className="stroke-primary-200"
                />
              </svg>
            </div>

            {[
              {
                step: '01',
                title: 'Discover Your Path',
                description:
                  'Start with a quick, confidential health assessment. We listen to your story—your goals, conditions, and preferences.',
                icon: <FiFileText className="w-7 h-7" />,
              },
              {
                step: '02',
                title: 'Receive Your Plan',
                description:
                  'Our nutritionists craft a personalized meal plan featuring delicious, culturally-rich African dishes.',
                icon: <FiCpu className="w-7 h-7" />,
              },
              {
                step: '03',
                title: 'Enjoy & Nourish',
                description:
                  'Explore the marketplace, order your meals, and enjoy food that heals, delivered with care.',
                icon: <FiShoppingCart className="w-7 h-7" />,
              },
              {
                step: '04',
                title: 'Thrive & Track',
                description:
                  'See your progress with integrated health tracking and celebrate every step towards a healthier you.',
                icon: <FiTrendingUp className="w-7 h-7" />,
              },
            ].map(item => (
              <motion.div
                key={item.step}
                variants={{
                  initial: { opacity: 0, y: 50 },
                  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
                }}
                className="relative z-10 text-center bg-white p-6 rounded-2xl border border-transparent hover:border-primary-200 transition-all duration-300 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-primary-100 to-amber-100 text-primary-600 mb-5 border-4 border-white shadow-sm">
                    {item.icon}
                  </div>
                </motion.div>

                <h3 className="text-xl font-bold text-primary-900 mb-2">{item.title}</h3>

                <p className="text-neutral-600 text-sm leading-relaxed">{item.description}</p>

                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white font-bold text-sm w-10 h-10 flex items-center justify-center rounded-full border-4 border-white shadow-md">
                  {item.step}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Clinical Wellness Programs Section */}
      <section className="py-20 bg-linear-to-b from-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="section-tag">Clinical Wellness</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-900 mb-6">
              Structured Nutrition Programs
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Evidence-based programs designed for specific health conditions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <ProgramCard key={program.id} program={program} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <TestimonialsCarousel testimonials={testimonials} />

      {/* CTA Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-primary-900 overflow-hidden">
        {/* Abstract SVG background */}
        <div className="absolute inset-0 opacity-5 cta-background"></div>

        <div className="relative max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
              Begin Your Wellness Journey
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-primary-200 max-w-2xl mx-auto">
              Take the first step towards a healthier, more vibrant you. Our platform makes it
              simple to align your diet with your health goals, without sacrificing the flavors you
              love.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="w-full sm:w-auto inline-block bg-amber-500 text-primary-900 font-bold text-base px-8 py-4 rounded-lg shadow-lg hover:bg-amber-400 hover:scale-105 transform transition-all duration-300"
              >
                Create Your Free Account
              </Link>
              <Link
                to="/health"
                className="w-full sm:w-auto inline-block bg-transparent border-2 border-amber-500 text-amber-500 font-semibold text-base px-8 py-4 rounded-lg hover:bg-amber-500 hover:text-primary-900 transform transition-all duration-300"
              >
                Take a Health Assessment
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
