import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

// Stat component props
const Stat = {
  id: '',
  value: 0,
  suffix: '',
  label: '',
  icon: null,
};

const stats = [
  {
    id: 'meals',
    value: 500,
    suffix: '+',
    label: 'Therapeutic Meals',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    id: 'users',
    value: 15000,
    suffix: '+',
    label: 'Active Users',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    id: 'chefs',
    value: 50,
    suffix: '+',
    label: 'Partner Chefs',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    id: 'satisfaction',
    value: 98,
    suffix: '%',
    label: 'Satisfaction Rate',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

// Animated Counter Component
const AnimatedCounter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
};

const StatsSection = () => {
  const particleColors = [
    'bg-emerald-200/40',
    'bg-green-200/40',
    'bg-lime-200/40',
    'bg-teal-200/40',
    'bg-yellow-200/40',
    'bg-amber-200/40',
    'bg-orange-200/40',
    'bg-green-300/40',
  ];

  // Generate fixed positions for particles

  const particles = useMemo(() => {
    return [
      { id: 0, x: 5, duration: 4.5, delay: 0, left: 15, top: 20 },
      { id: 1, x: -8, duration: 6.2, delay: 0.3, left: 85, top: 35 },
      { id: 2, x: 3, duration: 5.8, delay: 0.6, left: 45, top: 70 },
      { id: 3, x: -6, duration: 7.1, delay: 0.9, left: 25, top: 85 },
      { id: 4, x: 7, duration: 4.3, delay: 1.2, left: 75, top: 15 },
      { id: 5, x: -4, duration: 6.7, delay: 1.5, left: 55, top: 45 },
      { id: 6, x: 2, duration: 5.2, delay: 1.8, left: 35, top: 60 },
      { id: 7, x: -9, duration: 7.8, delay: 2.1, left: 65, top: 25 },
      { id: 8, x: 4, duration: 4.9, delay: 2.4, left: 95, top: 55 },
      { id: 9, x: -7, duration: 6.4, delay: 2.7, left: 5, top: 40 },
      { id: 10, x: 6, duration: 5.6, delay: 3.0, left: 40, top: 90 },
      { id: 11, x: -5, duration: 7.3, delay: 3.3, left: 80, top: 75 },
    ];
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        {/* Large Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-emerald-300/20 to-lime-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-green-300/20 to-emerald-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-teal-300/20 to-cyan-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-yellow-300/20 to-amber-400/20 rounded-full blur-3xl"
        />

        {/* Floating Particles */}
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            animate={{
              y: [0, -30, 0],
              x: [0, particle.x, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
            className={`absolute w-2 h-2 ${particleColors[particle.id % particleColors.length]} rounded-full`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
          />
        ))}

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-4"
          >
            <span className="px-6 py-3 bg-gradient-to-r from-emerald-400/20 to-lime-400/20 backdrop-blur-sm border border-emerald-400/30 rounded-full text-emerald-200 font-bold text-sm tracking-wide uppercase shadow-lg shadow-emerald-400/10">
              BY THE NUMBERS
            </span>
          </motion.div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-emerald-200 to-lime-200 bg-clip-text text-transparent">
            Transforming African Health
          </h2>
          <p className="text-lg sm:text-xl text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
            Join thousands who are reclaiming their health through culturally relevant nutrition
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                type: 'spring',
                stiffness: 100,
              }}
              className="relative group"
            >
              {/* Card */}
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-xl border border-white/30 rounded-2xl p-6 sm:p-8 text-center overflow-hidden shadow-xl"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

                {/* Icon Container with Pulse Effect */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                  {/* Outer Glow Ring */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-lime-400 blur-md"
                  />
                  {/* Icon Circle */}
                  <div className="relative flex items-center justify-center w-full h-full rounded-full bg-gradient-to-br from-emerald-400 to-lime-400 text-emerald-900 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                </div>

                {/* Animated Number */}
                <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-white via-emerald-100 to-lime-100 bg-clip-text text-transparent mb-3">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <div className="text-base sm:text-lg text-emerald-50/90 font-medium tracking-wide">
                  {stat.label}
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute top-3 right-3 w-16 h-16 border-t border-r border-emerald-400/20 rounded-tr-2xl" />
                <div className="absolute bottom-3 left-3 w-16 h-16 border-b border-l border-lime-400/20 rounded-bl-2xl" />
              </motion.div>

              {/* Hover Glow Effect */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.4 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400 via-lime-400 to-yellow-400 blur-2xl -z-10"
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <p className="text-emerald-50/95 text-lg sm:text-xl mb-8 font-medium">
            Ready to be part of this movement?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="/signup"
              className="relative group bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-orange-900 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden"
            >
              <span className="relative z-10">Join Free Today</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-300 to-orange-300"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="/health"
              className="bg-emerald-500/10 backdrop-blur-sm border-2 border-emerald-400/40 hover:border-emerald-300/60 text-emerald-50 hover:bg-emerald-400/20 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Take Health Assessment
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
