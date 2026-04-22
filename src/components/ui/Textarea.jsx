import React from 'react';

const Textarea = ({ 
  className = '', 
  placeholder,
  value,
  onChange,
  disabled = false,
  rows = 4,
  ...props 
}) => {
  const classes = [
    'form-textarea',
    className
  ].filter(Boolean).join(' ');

  return (
    <textarea
      className={classes}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      rows={rows}
      {...props}
    />
  );
};

export { Textarea };
