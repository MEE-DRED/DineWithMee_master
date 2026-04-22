import React from 'react';

const Label = ({ 
  children, 
  className = '', 
  htmlFor,
  ...props 
}) => {
  const classes = [
    'form-label',
    className
  ].filter(Boolean).join(' ');

  return (
    <label
      className={classes}
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
};

export { Label };
