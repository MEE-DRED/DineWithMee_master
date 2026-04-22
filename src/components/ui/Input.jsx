import React from 'react';

const Input = ({ 
  className = '', 
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  ...props 
}) => {
  const classes = [
    'form-input',
    className
  ].filter(Boolean).join(' ');

  return (
    <input
      type={type}
      className={classes}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      {...props}
    />
  );
};

export { Input };
