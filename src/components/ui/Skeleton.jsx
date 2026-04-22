import React from 'react';

const Skeleton = ({ variant = 'text', className = '', lines = 3 }) => {
  const baseClasses = 'animate-pulse bg-dwm-green-pale rounded';
  
  const variants = {
    text: (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-4 bg-dwm-green-pale rounded"></div>
        ))}
      </div>
    ),
    
    avatar: (
      <div className={`w-12 h-12 bg-dwm-green-pale rounded-full ${className}`}></div>
    ),
    
    card: (
      <div className={`p-4 bg-dwm-green-pale rounded-lg ${className}`}>
        <div className="h-4 bg-dwm-green-pale rounded mb-4"></div>
        <div className="h-4 bg-dwm-green-pale rounded mb-2"></div>
        <div className="h-4 bg-dwm-green-pale rounded"></div>
      </div>
    ),
    
    title: (
      <div className={`h-8 w-32 bg-dwm-green-pale rounded mb-4 ${className}`}></div>
    ),
    
    button: (
      <div className={`h-10 w-24 bg-dwm-green-pale rounded ${className}`}></div>
    ),
    
    input: (
      <div className={`h-10 w-full bg-dwm-green-pale rounded ${className}`}></div>
    ),
    
    table: (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-12 bg-dwm-green-pale rounded"></div>
        ))}
      </div>
    ),
    
    chart: (
      <div className={`h-48 bg-dwm-green-pale rounded-lg ${className}`}></div>
    )
  };

  return variants[variant] || variants.text;
};

export { Skeleton };
