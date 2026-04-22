import React from 'react';

const Progress = ({ 
  value = 0, 
  max = 100, 
  className = '',
  color = 'blue',
  size = 'medium',
  showLabel = false,
  ...props 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizeClasses = {
    small: 'h-1',
    medium: 'h-2',
    large: 'h-3'
  };
  
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  };

  const classes = [
    'w-full bg-gray-200 rounded-full',
    sizeClasses[size] || sizeClasses.medium,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="progress-container">
      {showLabel && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-dwm-text-mid">Progress</span>
          <span className="font-medium text-dwm-green-deep">
            {percentage.toFixed(1)}%
          </span>
        </div>
      )}
      <div className={classes} {...props}>
        <div 
          className={`${colorClasses[color] || colorClasses.blue} h-2 rounded-full transition-all`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export { Progress };
