import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProgramCard = ({ program, delay = 0 }) => {
  const navigate = useNavigate();

  // Calculate nutrition percentages if we have nutrition data
  const getNutritionData = () => {
    // For now, use placeholder percentages
    // In production, these would come from program data
    return {
      protein: 30,
      carbs: 45,
      fats: 25,
    };
  };

  const nutrition = getNutritionData();

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group cursor-pointer"
      onClick={() => navigate(`/programs/${program.id}`)}
    >
      {/* Image */}
      {program.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            style={{ objectPosition: program.imagePosition || '50% 50%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute top-4 left-4 px-3 py-1 bg-amber-400 text-emerald-900 text-xs font-semibold rounded-full">
            {program.category}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-emerald-900 mb-3 group-hover:text-emerald-700 transition-colors">
          {program.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {program.preview}
        </p>

        {/* Nutrition Bars */}
        <div className="space-y-2 mb-4">
          <div className="text-xs font-semibold text-gray-700 mb-2">Macro Balance</div>

          {/* Protein Bar */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 w-16">Protein</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${nutrition.protein}%` }}
              />
            </div>
            <span className="text-xs text-gray-600 w-8 text-right">{nutrition.protein}%</span>
          </div>

          {/* Carbs Bar */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 w-16">Carbs</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${nutrition.carbs}%` }}
              />
            </div>
            <span className="text-xs text-gray-600 w-8 text-right">{nutrition.carbs}%</span>
          </div>

          {/* Fats Bar */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 w-16">Fats</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${nutrition.fats}%` }}
              />
            </div>
            <span className="text-xs text-gray-600 w-8 text-right">{nutrition.fats}%</span>
          </div>
        </div>

        {/* Read Time */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>{program.readTime}</span>
          <span>{program.date}</span>
        </div>

        {/* CTA Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/programs/${program.id}`);
          }}
          className="w-full py-2 bg-emerald-800 text-white rounded-lg font-semibold text-sm
                     hover:bg-emerald-700 transition-colors duration-300
                     group-hover:bg-emerald-700"
        >
          View Program →
        </button>
      </div>

      {/* Hover Preview (Optional Enhancement) */}
      <div className="absolute inset-0 bg-emerald-900/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-center pointer-events-none">
        <h4 className="text-white font-bold text-lg mb-2">{program.title}</h4>
        <p className="text-emerald-100 text-sm leading-relaxed">
          {program.preview}
        </p>
      </div>
    </motion.article>
  );
};

export default ProgramCard;
