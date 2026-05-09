import React, { useState, useRef, useEffect } from 'react';
import {
  FiChevronDown,
  FiTrendingUp,
  FiDollarSign,
  FiBarChart,
  FiAward,
  FiStar,
  FiCheck,
} from 'react-icons/fi';

const sortOptions = [
  { value: 'featured', label: 'Featured', icon: <FiAward /> },
  { value: 'price-low', label: 'Price: Low to High', icon: <FiTrendingUp /> },
  {
    value: 'price-high',
    label: 'Price: High to Low',
    icon: <FiTrendingUp className="transform rotate-180" />,
  },
  { value: 'calories-low', label: 'Calories: Low to High', icon: <FiBarChart /> },
  {
    value: 'calories-high',
    label: 'Calories: High to Low',
    icon: <FiBarChart className="transform rotate-180" />,
  },
  { value: 'protein-high', label: 'Protein: High to Low', icon: <FiStar /> },
  { value: 'name-asc', label: 'Name: A-Z', icon: <FiDollarSign /> },
];

const SortDropdown = ({ sortBy, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = sortOptions.find(option => option.value === sortBy);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors flex items-center justify-between"
      >
        <div className="flex items-center">
          {selectedOption.icon}
          <span className="ml-2">{selectedOption.label}</span>
        </div>
        <FiChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          {sortOptions.map(option => (
            <div
              key={option.value}
              onClick={() => {
                onSortChange(option.value);
                setIsOpen(false);
              }}
              className="px-4 py-3 hover:bg-emerald-50 cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center">
                {option.icon}
                <span className="ml-2">{option.label}</span>
              </div>
              {sortBy === option.value && <FiCheck className="text-emerald-500" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
