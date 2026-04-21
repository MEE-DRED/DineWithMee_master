import React from 'react';

const LoadingSpinner = ({ 
  size = 'sm', 
  className = '', 
  color = 'text-amber-600',
  ...props 
}) => {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const spinnerClasses = `
    animate-spin rounded-full border-2 border-gray-200 border-t-transparent
    ${sizeClasses[size] || sizeClasses.sm}
    ${color}
    ${className}
  `.trim();

  return (
    <div
      className={spinnerClasses}
      role="status"
      aria-label="Loading..."
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
