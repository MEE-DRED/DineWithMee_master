import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialsCarousel = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate testimonials every 6 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-900 to-emerald-800 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-amber-400/20 text-amber-400 rounded-full text-sm font-semibold mb-4">
            Success Stories
          </span>
          <h2 className="text-4xl font-bold mb-4">
            Real Results from Real People
          </h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Hear from members who transformed their health with evidence-based African nutrition.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative h-96 md:h-80">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 h-full flex flex-col justify-between">
                  {/* Quote */}
                  <div className="flex-1">
                    <div className="text-6xl text-amber-400 mb-4">"</div>
                    <p className="text-xl md:text-2xl leading-relaxed mb-6">
                      {testimonials[currentIndex].quote}
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].author}
                      className="w-16 h-16 rounded-full object-cover border-4 border-amber-400"
                    />
                    <div>
                      <div className="font-bold text-lg">{testimonials[currentIndex].author}</div>
                      <div className="text-emerald-200 text-sm">
                        {testimonials[currentIndex].role} · {testimonials[currentIndex].location}
                      </div>
                      <div className="text-amber-400 text-xs mt-1">
                        {testimonials[currentIndex].condition}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white/10 backdrop-blur hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white/10 backdrop-blur hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-amber-400'
                    : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
