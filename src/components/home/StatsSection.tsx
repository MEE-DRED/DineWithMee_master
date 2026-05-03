import React, { useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { FiBookOpen, FiUsers, FiAward, FiHeart } from 'react-icons/fi';

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, target, {
        duration: 2,
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = `${Math.round(value).toLocaleString()}${suffix}`;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, target, suffix]);

  return <div ref={ref} className="tabular-nums" />;
};

const stats = [
  {
    id: 'meals',
    value: 500,
    suffix: '+',
    label: 'Therapeutic Meals',
    icon: <FiBookOpen className="w-8 h-8" />,
  },
  {
    id: 'users',
    value: 15000,
    suffix: '+',
    label: 'Active Users',
    icon: <FiUsers className="w-8 h-8" />,
  },
  {
    id: 'chefs',
    value: 50,
    suffix: '+',
    label: 'Partner Chefs',
    icon: <FiAward className="w-8 h-8" />,
  },
  {
    id: 'satisfaction',
    value: 98,
    suffix: '%',
    label: 'Satisfaction Rate',
    icon: <FiHeart className="w-8 h-8" />,
  },
];

const StatsSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-linear-to-br from-emerald-900 via-green-900 to-teal-900 relative overflow-hidden">
      <div className="absolute inset-0">
        {/* Background animations can be added here if desired */}
      </div>

      <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 bg-linear-to-r from-white via-emerald-200 to-lime-200 bg-clip-text text-transparent">
            Transforming African Health
          </h2>
          <p className="text-lg sm:text-xl text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
            Join thousands who are reclaiming their health through culturally relevant nutrition
          </p>
        </motion.div>

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
              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="relative bg-linear-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-xl border border-white/30 rounded-2xl p-6 sm:p-8 text-center overflow-hidden shadow-xl"
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                  <div className="relative flex items-center justify-center w-full h-full rounded-full bg-linear-to-br from-emerald-400 to-lime-400 text-emerald-900 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                </div>

                <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold bg-linear-to-br from-white via-emerald-100 to-lime-100 bg-clip-text text-transparent mb-3">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>

                <div className="text-base sm:text-lg text-emerald-50/90 font-medium tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
