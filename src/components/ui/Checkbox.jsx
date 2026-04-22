import React from 'react';

const Checkbox = ({ 
  checked = false,
  onChange,
  disabled = false,
  className = '',
  id,
  children,
  ...props 
}) => {
  const handleChange = (e) => {
    onChange?.(e.target.checked);
  };

  return (
    <div className={`checkbox-container ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="checkbox-input"
        {...props}
      />
      {children && (
        <label htmlFor={id} className="checkbox-label">
          {children}
        </label>
      )}
    </div>
  );
};

export { Checkbox };
