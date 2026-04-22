import React, { useState, useEffect } from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Progress, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui";

const ProgressTracker = () => {
  const { progressData, healthSummary } = useCustomer();
  const [selectedMetric, setSelectedMetric] = useState('weight');
  const [timeRange, setTimeRange] = useState('month');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (progressData && progressData.length > 0) {
      const filteredData = filterDataByTimeRange(progressData, timeRange);
      setChartData(filteredData);
    }
  }, [progressData, timeRange]);

  const filterDataByTimeRange = (data, range) => {
    const now = new Date();
    const startDate = new Date();
    
    switch (range) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return data;
    }
    
    return data.filter(item => new Date(item.date) >= startDate);
  };

  const getMetricValue = (item, metric) => {
    switch (metric) {
      case 'weight':
        return item.weight;
      case 'bp':
        return item.bp;
      case 'glucose':
        return item.glucose;
      default:
        return null;
    }
  };

  const getMetricUnit = (metric) => {
    switch (metric) {
      case 'weight':
        return 'kg';
      case 'bp':
        return 'mmHg';
      case 'glucose':
        return 'mg/dL';
      default:
        return '';
    }
  };

  const calculateTrend = (data, metric) => {
    if (data.length < 2) return { trend: 'stable', change: 0 };
    
    const latest = getMetricValue(data[data.length - 1], metric);
    const previous = getMetricValue(data[data.length - 2], metric);
    
    if (latest === null || previous === null) return { trend: 'stable', change: 0 };
    
    const change = latest - previous;
    const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';
    
    return { trend, change };
  };

  const getGoalProgress = (metric) => {
    const currentValue = chartData.length > 0 ? getMetricValue(chartData[chartData.length - 1], metric) : null;
    
    if (currentValue === null) return 0;
    
    // Define target goals based on metric
    let target;
    switch (metric) {
      case 'weight':
        target = 70; // Example target weight
        break;
      case 'bp':
        target = 120; // Example target systolic BP
        break;
      case 'glucose':
        target = 95; // Example target blood sugar
        break;
      default:
        return 0;
    }
    
    return Math.min(100, Math.max(0, (1 - Math.abs(currentValue - target) / target) * 100));
  };

  const exportData = () => {
    const csvContent = [
      ['Date', 'Weight (kg)', 'Blood Pressure', 'Glucose (mg/dL)'],
      ...chartData.map(item => [
        new Date(item.date).toLocaleDateString(),
        item.weight || '',
        item.bp || '',
        item.glucose || ''
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health-progress-${timeRange}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const trend = calculateTrend(chartData, selectedMetric);
  const goalProgress = getGoalProgress(selectedMetric);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Progress Tracker</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Log Data
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Metric</label>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weight">Weight</SelectItem>
              <SelectItem value="bp">Blood Pressure</SelectItem>
              <SelectItem value="glucose">Blood Sugar</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Time Range</label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Value</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {chartData.length > 0 && getMetricValue(chartData[chartData.length - 1], selectedMetric) !== null
                ? `${getMetricValue(chartData[chartData.length - 1], selectedMetric)} ${getMetricUnit(selectedMetric)}`
                : 'No data'}
            </div>
            <p className="text-xs text-muted-foreground">
              Latest measurement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trend</CardTitle>
            {trend.trend === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : trend.trend === 'down' ? (
              <TrendingDown className="h-4 w-4 text-red-600" />
            ) : (
              <Activity className="h-4 w-4 text-muted-foreground" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trend.change !== 0 ? `${Math.abs(trend.change).toFixed(1)} ${getMetricUnit(selectedMetric)}` : 'Stable'}
            </div>
            <p className="text-xs text-muted-foreground">
              {trend.trend === 'up' ? 'Increasing' : trend.trend === 'down' ? 'Decreasing' : 'No change'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(goalProgress)}%</div>
            <Progress value={goalProgress} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Progress History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chartData.length > 0 ? (
              chartData.map((item, index) => {
                const value = getMetricValue(item, selectedMetric);
                const isLatest = index === chartData.length - 1;
                
                return (
                  <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
                    isLatest ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-medium">
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                      {isLatest && (
                        <Badge variant="default">Latest</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-bold">
                        {value !== null ? `${value} ${getMetricUnit(selectedMetric)}` : 'N/A'}
                      </div>
                      {selectedMetric === 'bp' && item.bp && (
                        <div className="text-sm text-gray-600">
                          {item.bp.split('/')[1]} diastolic
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Activity className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No progress data available for the selected time range</p>
                <Button variant="outline" className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Measurement
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Health Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Health Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-medium text-green-800 mb-2">Positive Trends</h3>
              <ul className="text-sm text-green-700 space-y-1">
                {trend.trend === 'down' && selectedMetric === 'weight' && (
                  <li>• Weight is trending down - great progress!</li>
                )}
                {trend.trend === 'down' && selectedMetric === 'bp' && (
                  <li>• Blood pressure is improving</li>
                )}
                {trend.trend === 'down' && selectedMetric === 'glucose' && (
                  <li>• Blood sugar levels are decreasing</li>
                )}
                {goalProgress > 75 && (
                  <li>• You're close to reaching your goal!</li>
                )}
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="font-medium text-yellow-800 mb-2">Areas for Improvement</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                {trend.trend === 'up' && selectedMetric === 'weight' && (
                  <li>• Consider reviewing your diet and exercise routine</li>
                )}
                {trend.trend === 'up' && selectedMetric === 'bp' && (
                  <li>• Monitor blood pressure and consult your doctor</li>
                )}
                {trend.trend === 'up' && selectedMetric === 'glucose' && (
                  <li>• Review your carbohydrate intake</li>
                )}
                {goalProgress < 50 && (
                  <li>• Consider setting more achievable short-term goals</li>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;
