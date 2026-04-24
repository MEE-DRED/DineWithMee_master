import React from 'react';
import { motion } from 'framer-motion';

export interface PageLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  message = 'Loading...',
  fullScreen = true,
}) => {
  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white z-50'
    : 'flex items-center justify-center py-12';

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center">
        {/* Animated Logo */}
        <motion.div
          className="relative w-20 h-20 mb-6"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-dwm-green-deep to-dwm-green-light opacity-75"></div>
          <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
            <span className="text-2xl font-serif font-bold text-dwm-green-deep">D</span>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.p
          className="text-dwm-text-mid font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {message}
        </motion.p>

        {/* Loading Dots */}
        <div className="flex space-x-2 mt-4">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-dwm-green-light rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const InlineLoader: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="flex items-center justify-center space-x-3 py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dwm-green-deep"></div>
      {message && <span className="text-dwm-text-mid">{message}</span>}
    </div>
  );
};

export const ButtonLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span>Loading...</span>
    </div>
  );
};

export default PageLoader;
