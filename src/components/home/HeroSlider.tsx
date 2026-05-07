import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiPlusCircle } from 'react-icons/fi';
import './HeroSlider.css';

interface Slide {
  id: number;
  image: string;
  kicker: string;
  title: string;
  description: string;
  cta: {
    primary: { label: string; link: string };
    secondary?: { label: string; link: string };
    tertiary?: { label: string; link: string };
  };
}

const slides: Slide[] = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1800&q=80',
    kicker: 'Dine with Mee Clinical Nutrition Platform',
    title: 'Healing Through Heritage',
    description: 'African foods as medicine for modern health',
    cta: {
      primary: { label: 'Explore Clinical Programs', link: '/health' },
      secondary: { label: 'Browse Therapeutic Meals', link: '/marketplace' },
      tertiary: { label: 'Become a Chef Partner', link: '/chef-partner' },
    },
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=1800&q=80',
    kicker: 'Future-Ready Family Wellness',
    title: 'Generational Wellness',
    description: 'Building healthier African futures through food',
    cta: {
      primary: { label: 'Take Health Assessment', link: '/health-assessment' },
      secondary: { label: 'Start Your Journey', link: '/signup' },
    },
  },
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide(prev => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
    },
    [currentSlide]
  );

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, isPaused, nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 1.1,
    },
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
    },
  };

  const slide = slides[currentSlide];

  return (
    <section
      className="relative h-screen min-h-150 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero slides"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 1.2, ease: 'easeInOut' },
          }}
          className="absolute inset-0"
        >
          {/* webhint-disable-next-line no-inline-styles */}
          <div
            className="absolute inset-0 bg-cover bg-center ken-burns-effect"
            style={{ '--bg-image': `url(${slide.image})` } as React.CSSProperties}
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-transparent to-transparent shadow-[inset_0_0_250px_50px_rgba(0,0,0,0.9)]" />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

          <div className="relative h-full flex items-center">
            <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                key={currentSlide}
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                className="max-w-xl lg:max-w-4xl"
              >
                <motion.span
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { delay: 0.4, duration: 0.6 } },
                  }}
                  className="inline-block text-white text-sm sm:text-base font-semibold tracking-wide uppercase mb-4 text-shadow-kicker"
                >
                  {slide.kicker}
                </motion.span>

                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8 } },
                  }}
                  className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-green-400 mb-6 leading-tight text-shadow-title"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.8 } },
                  }}
                  className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 font-light max-w-3xl text-shadow-description"
                >
                  {slide.description}
                </motion.p>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.8 } },
                  }}
                  className="flex flex-col sm:flex-row flex-wrap gap-4"
                >
                  <Link
                    to={slide.cta.primary.link}
                    className="w-full sm:w-auto flex items-center justify-center bg-transparent border-2 border-green-400 text-white hover:bg-green-400 hover:text-dwm-green-deep px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
                  >
                    <span>{slide.cta.primary.label}</span>
                    <FiChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  {slide.cta.secondary && (
                    <Link
                      to={slide.cta.secondary.link}
                      className="w-full sm:w-auto flex items-center justify-center bg-green-400/10 border-2 border-green-400/50 text-white hover:bg-green-400/30 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
                    >
                      <span>{slide.cta.secondary.label}</span>
                      <FiPlusCircle className="w-5 h-5 ml-2 group-hover:rotate-90 transition-transform" />
                    </Link>
                  )}
                  {slide.cta.tertiary && (
                    <Link
                      to={slide.cta.tertiary.link}
                      className="hidden md:flex w-full sm:w-auto items-center justify-center bg-green-400/10 border-2 border-green-400/50 text-white hover:bg-green-400/30 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
                    >
                      <span>{slide.cta.tertiary.label}</span>
                      <FiChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center group"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6 group-hover:-translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center group"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6 group-hover:translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3"
        role="group"
        aria-label="Hero slide controls"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-dwm-gold-light w-8' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : undefined}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 right-8 text-white/60 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-sm font-medium">Scroll</span>
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSlider;
