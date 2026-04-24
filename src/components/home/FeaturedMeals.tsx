import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMeals, selectMeals, selectMealsLoading } from '../../redux';
import { useReduxCart } from '../../hooks/useReduxCart';
import { MealCardSkeleton } from '../ui/Skeleton';

interface Meal {
  _id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl?: string;
  calories?: number;
  protein?: number;
  healthTags?: string[];
  region?: string;
  isFeatured?: boolean;
}

const FeaturedMeals: React.FC = () => {
  const dispatch = useDispatch();
  const meals = useSelector(selectMeals);
  const loading = useSelector(selectMealsLoading);
  const { addItem } = useReduxCart();

  useEffect(() => {
    if (meals.length === 0) {
      dispatch(fetchMeals() as any);
    }
  }, [dispatch, meals.length]);

  // Filter for featured meals (limit to 6)
  const featuredMeals = meals
    .filter((meal: Meal) => meal.isFeatured)
    .slice(0, 6);

  const handleAddToCart = (meal: Meal) => {
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
    <section className="py-16 sm:py-20 lg:py-24 bg-dwm-off-white">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 lg:mb-16">
          <div className="mb-6 sm:mb-0">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block text-dwm-gold text-sm font-semibold tracking-wide uppercase mb-3"
            >
              Nutritionist Approved
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-dwm-green-deep"
            >
              Featured Therapeutic Meals
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 text-dwm-gold hover:text-dwm-gold-light font-semibold text-base transition-colors group"
            >
              <span>View All Meals</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
            {featuredMeals.map((meal: Meal) => (
              <motion.article
                key={meal._id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-dwm-lg overflow-hidden shadow-dwm-sm hover:shadow-dwm-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-dwm-green-pale">
                  {meal.imageUrl ? (
                    <img
                      src={meal.imageUrl}
                      alt={meal.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-dwm-green-light">
                      <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                          className="px-2 py-1 text-xs font-semibold bg-dwm-gold/90 text-dwm-green-deep rounded-md backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Region Badge */}
                  {meal.region && (
                    <div className="absolute top-3 right-3 px-2 py-1 text-xs font-medium bg-white/90 text-dwm-green-deep rounded-md backdrop-blur-sm">
                      {meal.region}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-serif text-xl font-semibold text-dwm-green-deep mb-2 line-clamp-2 group-hover:text-dwm-green-light transition-colors">
                    {meal.name}
                  </h3>
                  <p className="text-dwm-text-mid text-sm leading-relaxed mb-4 line-clamp-2">
                    {meal.description}
                  </p>

                  {/* Nutrition Info */}
                  {(meal.calories || meal.protein) && (
                    <div className="flex items-center gap-4 mb-4 text-xs text-dwm-text-light">
                      {meal.calories && (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                      <span className="text-2xl font-bold text-dwm-gold">
                        {meal.currency || 'RWF'} {meal.price?.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(meal)}
                      className="bg-dwm-green-deep hover:bg-dwm-green-light text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105"
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
            <p className="text-dwm-text-mid text-lg">No featured meals available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedMeals;
