import React, { useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { FiHeart, FiZap, FiGitMerge, FiPlus, FiFeather } from 'react-icons/fi';
import { MealCardSkeleton } from '../ui/Skeleton';
import { fetchFeaturedMeals, addToCart } from '../../redux';
import type { RootState, AppDispatch } from '../../redux/store';

interface Meal {
  _id: string;
  id: string;
  name: string;
  imageUrl?: string;
  region: string;
  price?: number;
  currency?: string;
  healthTags: string[];
  calories?: number;
  protein?: number;
  description?: string;
}

const FeaturedMeals: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    featuredMeals,
    status: mealStatus,
    error: mealError,
  } = useSelector((state: RootState) => state.meals);

  useEffect(() => {
    if (mealStatus === 'idle') {
      dispatch(fetchFeaturedMeals());
    }
  }, [mealStatus, dispatch]);

  const handleAddToCart = (meal: Meal) => {
    dispatch(addToCart({ ...meal, id: meal._id, quantity: 1 }));
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

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  if (mealStatus === 'loading' || mealStatus === 'idle') {
    return (
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Featured Therapeutic Meals
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Curated meals designed for your wellness journey, blending tradition with nutritional
              science.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <MealCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (mealStatus === 'failed') {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Error loading meals: {mealError}</p>
      </div>
    );
  }

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Featured Therapeutic Meals
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Curated meals designed for your wellness journey, blending tradition with nutritional
            science.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredMeals.slice(0, 3).map((meal: Meal) => (
            <motion.article
              key={meal._id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-200/40 transition-all duration-300 border border-emerald-100/50 hover:border-emerald-200/70"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden bg-linear-to-br from-emerald-100 via-teal-50 to-emerald-50">
                {meal.imageUrl ? (
                  <img
                    src={meal.imageUrl}
                    alt={meal.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-emerald-200 to-teal-100">
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
                <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-sm font-semibold text-emerald-800 shadow-sm">
                  {meal.region}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-800 leading-tight">{meal.name}</h3>
                  <button
                    aria-label="Add to favorites"
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                  >
                    <FiHeart className="w-6 h-6" />
                  </button>
                </div>

                {meal.healthTags && meal.healthTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {meal.healthTags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
                      >
                        <FiFeather className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {meal.description || 'A delicious and nourishing meal, crafted with care.'}
                </p>

                {(meal.calories || meal.protein) && (
                  <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
                    {meal.calories && (
                      <div className="flex items-center gap-1">
                        <FiZap className="w-4 h-4 text-amber-500" />
                        <span>{meal.calories} cal</span>
                      </div>
                    )}
                    {meal.protein && (
                      <div className="flex items-center gap-1">
                        <FiGitMerge className="w-4 h-4 text-emerald-500" />
                        <span>{meal.protein}g protein</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      {meal.currency || 'RWF'} {meal.price?.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(meal)}
                    className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-full bg-linear-to-r from-emerald-500 to-teal-400 p-0.5 text-sm font-medium text-white shadow-md transition-all duration-300 hover:from-emerald-600 hover:to-teal-500 hover:shadow-lg"
                  >
                    <span className="relative flex items-center gap-2 rounded-full bg-white px-4 py-2 transition-all duration-300 group-hover/button:bg-opacity-0">
                      <FiPlus className="h-5 w-5 text-emerald-600 transition-colors duration-300 group-hover/button:text-white" />
                      <span className="font-bold text-emerald-700 transition-colors duration-300 group-hover/button:text-white">
                        Add to Cart
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedMeals;
