import React from 'react';

const Skeleton = ({ variant = 'text', className = '', lines = 3, count = 1 }) => {
  const baseClasses = 'animate-pulse bg-dwm-green-pale rounded';

  const variants = {
    text: 'h-4 w-full rounded',
    title: 'h-8 w-3/4 rounded',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-64 w-full rounded-2xl',
    image: 'h-48 w-full rounded-lg',
    button: 'h-10 w-24 rounded-lg',
    input: 'h-10 w-full rounded',
    table: 'h-12 w-full rounded',
    chart: 'h-48 w-full rounded-lg',
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className={`${baseClasses} ${variants.text}`}></div>
        ))}
      </div>
    );
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`${baseClasses} ${variants[variant] || variants.text} ${className}`}
          aria-label="Loading..."
          role="status"
        />
      ))}
    </>
  );
};

// Specific skeleton components for common use cases
export const MealCardSkeleton = () => (
  <div className="card">
    <Skeleton variant="image" />
    <div className="card-content space-y-3">
      <Skeleton variant="title" />
      <Skeleton variant="text" count={2} />
      <div className="flex gap-2">
        <Skeleton variant="button" />
        <Skeleton variant="button" />
      </div>
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-6">
    <Skeleton variant="title" className="w-1/3" />
    <div className="grid grid-cols-3 gap-6">
      <Skeleton variant="card" />
      <Skeleton variant="card" />
      <Skeleton variant="card" />
    </div>
  </div>
);

export { Skeleton };
