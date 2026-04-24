import React, { useState } from 'react';

const LazyImage = ({
  src,
  alt,
  className = '',
  fallback = null,
  placeholder = null,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError && fallback) {
    return fallback;
  }

  return (
    <div className="relative">
      {!isLoaded && placeholder && (
        <div className="absolute inset-0">
          {placeholder}
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        {...props}
      />
    </div>
  );
};

export default LazyImage;
