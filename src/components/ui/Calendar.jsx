import React from 'react';

const Calendar = ({ 
  className = '',
  selected,
  onSelect,
  ...props 
}) => {
  // Simple calendar component - in a real app you'd use a library like react-datepicker
  return (
    <div className={`calendar ${className}`} {...props}>
      <div className="calendar-header">
        <button className="calendar-nav-btn">Previous</button>
        <span className="calendar-title">December 2024</span>
        <button className="calendar-nav-btn">Next</button>
      </div>
      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="calendar-weekday">{day}</div>
          ))}
        </div>
        <div className="calendar-days">
          {Array.from({ length: 35 }, (_, i) => {
            const day = i - 2; // Start from appropriate day
            const isCurrentMonth = day >= 1 && day <= 31;
            const isSelected = selected && selected.getDate() === day;
            
            return (
              <div
                key={i}
                className={`calendar-day ${isCurrentMonth ? 'current-month' : 'other-month'} ${isSelected ? 'selected' : ''}`}
                onClick={() => isCurrentMonth && onSelect?.(new Date(2024, 11, day))}
              >
                {isCurrentMonth ? day : ''}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { Calendar };
