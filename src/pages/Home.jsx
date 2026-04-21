import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1800&q=80',
      kicker: 'Dine with Mee Clinical Nutrition Platform',
      title: 'Healing Through Heritage',
      description: 'African foods as medicine for modern health',
      ctaButtons: [
        { text: 'Explore Clinical Programs', link: '#clinical-focus', primary: true },
        { text: 'Browse Therapeutic Meals', link: '/marketplace', primary: false },
        { text: 'Become a Chef Partner', link: '/chef-partner', primary: false },
      ]
    },
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1800&q=80',
      kicker: 'Preventive Care Through Nutrition',
      title: "Nature's Prescription",
      description: 'Nutrition-powered prevention for NCDs',
      ctaButtons: [
        { text: 'Visit Health Hub', link: '/health', primary: true },
        { text: 'Read Nutrition Research', link: '/health#nutrition-research', primary: false },
      ]
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=1800&q=80',
      kicker: 'Future-Ready Family Wellness',
      title: 'Generational Wellness',
      description: 'Building healthier African futures through food',
      ctaButtons: [
        { text: 'Maternal Wellness Pathways', link: '/health#maternal-care-pathway', primary: true },
        { text: 'Start Your Journey', link: '#ready-to-heal', primary: false },
      ]
    }
  ];

  const clinicalFocusAreas = [
    {
      id: 'diabetes',
      title: 'Diabetes Care',
      description: 'Low glycemic meal support, fiber-first planning, and guided blood sugar nutrition strategies.',
      image: 'https://www.azpcps.com/wp-content/uploads/2024/01/Diet-for-Diabetes-Management.jpg',
      link: '/programs/diabetes'
    },
    {
      id: 'hypertension',
      title: 'Hypertension Support',
      description: 'Heart-conscious food pathways designed to lower sodium load and improve cardiometabolic outcomes.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&h=300&q=80',
      link: '/programs/hypertension'
    },
    {
      id: 'maternal',
      title: 'Maternal Health',
      description: 'Trimester-aligned nutrition protocols to support fetal development and maternal recovery.',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&h=300&q=80',
      link: '/programs/maternal'
    },
    {
      id: 'obesity',
      title: 'Weight Management',
      description: 'Portion-smart, high satiety meal pathways supporting sustainable fat loss and metabolic balance.',
      image: 'https://www.heart.org/-/media/AHA/H4GM/Article-Images/Lose-Weight-and-Keep-It-Off.jpg?sc_lang=en',
      link: '/programs/obesity'
    },
    {
      id: 'sickle-cell',
      title: 'Sickle Cell Support',
      description: 'Iron and folate aware nutrition support to improve blood health, energy levels, and recovery resilience.',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&h=300&q=80',
      link: '/programs/sickle-cell'
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="home-page">
      {/* Hero Slider */}
      <section className="hero-slider" aria-label="Hero slides">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content-wrap">
              <span className="hero-kicker">{slide.kicker}</span>
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              <div className="hero-cta-row">
                {slide.ctaButtons.map((button, btnIndex) => (
                  <Link
                    key={btnIndex}
                    to={button.link}
                    className={button.primary ? 'btn-primary' : 'btn-secondary'}
                  >
                    {button.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}

        <button
          className="hero-control prev absolute left-4 top-1/2 -translate-y-1/2 bg-dwm-green-deep/50 hover:bg-dwm-green-deep/70 text-white p-3 rounded-full transition-all"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          &#10094;
        </button>
        <button
          className="hero-control next absolute right-4 top-1/2 -translate-y-1/2 bg-dwm-green-deep/50 hover:bg-dwm-green-deep/70 text-white p-3 rounded-full transition-all"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          &#10095;
        </button>

        <div className="hero-dots absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2" role="tablist" aria-label="Hero slide controls">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`hero-dot w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-dwm-gold' : 'bg-dwm-white/50'}`}
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Clinical Focus Section */}
      <section className="section clinical-focus-section" id="clinical-focus">
        <div className="section-header text-left">
          <span className="section-tag">Clinical Nutrition First</span>
          <h2>Our Clinical Focus</h2>
          <p>Every care path combines personalized nutrition intelligence with culturally relevant African meals and practical expert guidance.</p>
        </div>

        <div className="clinical-focus-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinicalFocusAreas.map((area) => (
            <article key={area.id} className="clinical-card card">
              <img 
                src={area.image} 
                alt={area.title}
                className="card-image"
                loading="lazy"
              />
              <div className="card-content">
                <h3 className="text-xl font-semibold text-dwm-green-deep mb-2">{area.title}</h3>
                <p className="text-dwm-text-mid mb-4">{area.description}</p>
                <Link 
                  to={area.link} 
                  className="btn-secondary text-sm"
                >
                  Explore Program
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Purpose Section */}
      <section className="section purpose-section" id="our-purpose">
        <div className="purpose-layout grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="purpose-copy">
            <span className="section-tag">Our Purpose</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dwm-green-deep mb-4">
              The Dine with Mee Mission
            </h2>
            <p className="text-dwm-text-mid mb-4">
              We exist to close the gap between clinical nutrition science and the foods African families already trust. Dine with Mee translates care plans into everyday meals, empowering households to prevent disease and heal with confidence.
            </p>
            <p className="text-dwm-text-mid mb-6">
              From chronic condition management to maternal nourishment, we build tools that feel local, evidence-backed, and deeply human.
            </p>
            <Link to="/health#nutrition-research" className="btn-primary">
              Explore Our Evidence Model
            </Link>
          </div>
          <div className="purpose-media">
            <img 
              src="/images/Cooking%20with%20confidence%20and%20style.png" 
              alt="Cooking with confidence and style"
              className="rounded-dwm-lg shadow-dwm-lg"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Ready CTA Section */}
      <section className="section ready-cta bg-dwm-green-pale" id="ready-to-heal">
        <div className="ready-cta-box text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-dwm-green-deep mb-4">
            Ready to Heal?
          </h2>
          <p className="text-dwm-text-mid text-lg mb-8">
            Join Dine with Mee and discover how culturally relevant African foods can transform your health, prevent NCDs, and support your wellness journey.
          </p>
          <Link to="/signup" className="btn-primary">
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
