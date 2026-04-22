import React, { useState } from 'react';

const Select = ({ 
  children, 
  value, 
  onValueChange, 
  placeholder = 'Select an option',
  className = '',
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue) => {
    onValueChange?.(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className={`select-container ${className}`} {...props}>
      <SelectTrigger onClick={() => setIsOpen(!isOpen)}>
        <SelectValue placeholder={placeholder}>
          {value || placeholder}
        </SelectValue>
      </SelectTrigger>
      
      {isOpen && (
        <SelectContent>
          {React.Children.map(children, (child) => 
            React.cloneElement(child, {
              onSelect: handleSelect
            })
          )}
        </SelectContent>
      )}
    </div>
  );
};

const SelectTrigger = ({ children, onClick, className = '' }) => {
  return (
    <div 
      className={`select-trigger ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const SelectValue = ({ children, placeholder, className = '' }) => {
  return (
    <span className={`select-value ${className}`}>
      {children || placeholder}
    </span>
  );
};

const SelectContent = ({ children, className = '' }) => {
  return (
    <div className={`select-content ${className}`}>
      {children}
    </div>
  );
};

const SelectItem = ({ value, children, onSelect, className = '' }) => {
  return (
    <div 
      className={`select-item ${className}`}
      onClick={() => onSelect?.(value)}
    >
      {children}
    </div>
  );
};

export { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
};
