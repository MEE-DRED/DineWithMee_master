import React, { useState, useEffect } from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Activity, 
  Calendar, 
  Heart, 
  TrendingUp, 
  Clock,
  BookOpen,
  ShoppingCart,
  User
} from 'lucide-react';

const CustomerDashboard = () => {
  const { 
    healthSummary, 
    progressData, 
    upcomingConsultations, 
    recommendedContent,
    cartItems,
    loading,
    error 
  } = useCustomer();
  const { user } = useAuth();
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading Dashboard</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Here's your health overview and personalized recommendations
          </p>
        </div>

        {/* Health Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">BMI</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{healthSummary?.bmi || 'N/A'}</div>
              <p className="text-xs text-muted-foreground">
                {healthSummary?.bmi < 25 ? 'Normal' : healthSummary?.bmi < 30 ? 'Overweight' : 'Obese'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{healthSummary?.bloodPressure || 'N/A'}</div>
              <p className="text-xs text-muted-foreground">
                {healthSummary?.bloodPressure === '120/80' ? 'Normal' : 'Monitor'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blood Sugar</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{healthSummary?.bloodSugar || 'N/A'} mg/dL</div>
              <p className="text-xs text-muted-foreground">
                {healthSummary?.bloodSugar < 100 ? 'Normal' : 'Elevated'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Health Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{healthSummary?.healthScore || 'N/A'}/100</div>
              <Progress value={healthSummary?.healthScore || 0} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progress Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Health Progress
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant={selectedTimeRange === 'week' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTimeRange('week')}
                  >
                    Week
                  </Button>
                  <Button
                    variant={selectedTimeRange === 'month' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTimeRange('month')}
                  >
                    Month
                  </Button>
                  <Button
                    variant={selectedTimeRange === 'year' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTimeRange('year')}
                  >
                    Year
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progressData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{new Date(data.date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">
                          Weight: {data.weight}kg | BP: {data.bp} | Glucose: {data.glucose} mg/dL
                        </p>
                      </div>
                      <Badge variant="outline">
                        {index === 0 ? 'Latest' : `${progressData.length - index} ${progressData.length - index === 1 ? 'day' : 'days'} ago`}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Consultations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Consultations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingConsultations.map((consultation) => (
                  <div key={consultation.id} className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{consultation.nutritionist}</p>
                      <Badge variant={consultation.status === 'confirmed' ? 'default' : 'secondary'}>
                        {consultation.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {new Date(consultation.date).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Activity className="h-4 w-4" />
                      {consultation.type}
                    </div>
                  </div>
                ))}
                {upcomingConsultations.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No upcoming consultations</p>
                )}
              </div>
              <Button className="w-full mt-4" variant="outline">
                Book New Consultation
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Content */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Recommended Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedContent.map((content) => (
                <div key={content.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{content.category}</Badge>
                    <span className="text-sm text-gray-500">
                      {content.type === 'article' ? content.readTime : content.duration}
                    </span>
                  </div>
                  <h3 className="font-medium mb-2">{content.title}</h3>
                  <Button variant="outline" size="sm" className="w-full">
                    {content.type === 'article' ? 'Read' : 'Watch'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shopping Cart Summary */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Shopping Cart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{cartItems.length} items</p>
                <p className="text-gray-600">
                  Total: ${cartItems.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0).toFixed(2)}
                </p>
              </div>
              <Button>
                View Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;
