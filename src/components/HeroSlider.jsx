import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&h=900&fit=crop',
      title: 'Nutrition for Your Health Journey',
      subtitle: 'Personalized meal plans crafted by expert nutritionists',
      cta: 'Start Your Journey',
      ctaLink: '/signup',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1600&h=900&fit=crop',
      title: 'African Cuisine, Health-First',
      subtitle: 'Discover delicious meals that honor tradition and wellness',
      cta: 'Explore Marketplace',
      ctaLink: '/marketplace',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1600&h=900&fit=crop',
      title: 'Meet Nia, Your AI Nutritionist',
      subtitle: 'Get personalized recommendations powered by AI',
      cta: 'Chat with Nia',
      ctaLink: '/chat',
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-dwm-green-deep opacity-50" />

          {/* Content */}
          <div className="relative h-full flex items-center justify-center text-center text-white px-6 z-20">
            <div className="max-w-4xl">
              <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
                {slide.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to={slide.ctaLink}
                  className="bg-gradient-to-r from-dwm-gold to-dwm-gold-light hover:from-dwm-gold-light hover:to-dwm-gold text-dwm-green-deep font-semibold py-4 px-8 rounded-dwm-md transition-all duration-300 shadow-dwm-lg hover:shadow-dwm-md hover:scale-105"
                >
                  {slide.cta}
                </Link>
                <Link
                  to="/marketplace"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-dwm-green-deep font-semibold py-4 px-8 rounded-dwm-md transition-all duration-300"
                >
                  View Meals
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-dwm-gold w-8'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default HeroSlider;
