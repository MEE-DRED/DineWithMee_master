import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMeals, selectMeals, selectMealsLoading } from '../../redux';
import { useReduxCart } from '../../hooks/useReduxCart';
import { MealCardSkeleton } from '../ui/Skeleton';

// Meal component props
const Meal = {
  _id: '',
  name: '',
  description: '',
  price: 0,
  currency: '',
  imageUrl: '',
  calories: 0,
  protein: 0,
  healthTags: [],
  region: '',
  isFeatured: false,
};

const FeaturedMeals = () => {
  const dispatch = useDispatch();
  const meals = useSelector(selectMeals);
  const loading = useSelector(selectMealsLoading);
  const { addItem } = useReduxCart();

  useEffect(() => {
    if (meals.length === 0) {
      dispatch(fetchMeals());
    }
  }, [dispatch, meals.length]);

  // Filter for featured meals (limit to 6)
  const featuredMeals = meals.filter(meal => meal.isFeatured).slice(0, 6);

  const handleAddToCart = meal => {
    addItem({
      id: meal._id,
      name: meal.name,
      price: meal.price,
      currency: meal.currency,
      image: meal.imageUrl,
      quantity: 1,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(251, 191, 36, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)
            `,
          }}
        />
      </div>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 lg:mb-16">
          <div className="mb-6 sm:mb-0">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 text-amber-600 text-sm font-semibold tracking-wide uppercase mb-3 rounded-full backdrop-blur-sm"
            >
              Nutritionist Approved
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-600 bg-clip-text text-transparent mb-2"
            >
              Featured Therapeutic Meals
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-lg max-w-2xl"
            >
              Discover our handpicked selection of nutritionally balanced meals designed by expert
              nutritionists
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-base rounded-xl transition-all duration-300 group shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span>View All Meals</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Meals Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <MealCardSkeleton key={i} />
            ))}
          </div>
        ) : featuredMeals.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {featuredMeals.map(meal => (
              <motion.article
                key={meal._id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-100/50 hover:border-emerald-200/70"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-emerald-100 via-teal-50 to-emerald-50">
                  {meal.imageUrl ? (
                    <img
                      src={meal.imageUrl}
                      alt={meal.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-200 to-teal-100">
                      <svg
                        className="w-16 h-16 text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Health Tags */}
                  {meal.healthTags && meal.healthTags.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {meal.healthTags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-lg shadow-sm backdrop-blur-sm border border-amber-300/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Region Badge */}
                  {meal.region && (
                    <div className="absolute top-3 right-3 px-3 py-1.5 text-xs font-bold bg-white/90 backdrop-blur-sm text-emerald-700 rounded-lg shadow-sm border border-emerald-200/50">
                      {meal.region}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-serif text-xl font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {meal.name}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {meal.description}
                  </p>

                  {/* Nutrition Info */}
                  {(meal.calories || meal.protein) && (
                    <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
                      {meal.calories && (
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                            />
                          </svg>
                          <span>{meal.calories} cal</span>
                        </div>
                      )}
                      {meal.protein && (
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          <span>{meal.protein}g protein</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        {meal.currency || 'RWF'} {meal.price?.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(meal)}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <p className="text-slate-600 text-lg font-medium">
                No featured meals available at the moment.
              </p>
              <p className="text-slate-500 text-sm mt-2">
                Check back soon for new therapeutic meal options!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedMeals;
