import React, { useState, useEffect } from 'react';
import { useCustomer } from '../../context/CustomerContext';

const ProgressTracker = () => {
  const { progressData, healthSummary } = useCustomer();
  const [selectedMetric, setSelectedMetric] = useState('weight');
  const [timeRange, setTimeRange] = useState('month');

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-2">Health Progress Tracker</h2>
        <p className="text-gray-600">Track your health metrics over time</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2 mb-6">
        {['week', 'month', 'quarter', 'year'].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              timeRange === range
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Metric Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Metric
        </label>
        <select
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        >
          <option value="weight">Weight</option>
          <option value="blood_pressure">Blood Pressure</option>
          <option value="blood_sugar">Blood Sugar</option>
          <option value="steps">Daily Steps</option>
          <option value="calories">Calories</option>
        </select>
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-emerald-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Current</p>
          <p className="text-2xl font-bold text-emerald-900">75 kg</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Goal</p>
          <p className="text-2xl font-bold text-blue-900">70 kg</p>
        </div>
        <div className="bg-amber-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Progress</p>
          <p className="text-2xl font-bold text-amber-900">-5 kg</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-500">Progress chart will be displayed here</p>
        <p className="text-sm text-gray-400 mt-2">
          Showing {selectedMetric} data for the past {timeRange}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
          📥 Export Data
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
          ➕ Add Entry
        </button>
      </div>
    </div>
  );
};

export default ProgressTracker;
