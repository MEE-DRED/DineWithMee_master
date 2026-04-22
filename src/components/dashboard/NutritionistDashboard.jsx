import React, { useState } from 'react';
import { useNutritionist } from '../../context/NutritionistContext';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Star,
  Clock,
  FileText,
  Plus,
  Search,
  Filter
} from 'lucide-react';

const NutritionistDashboard = () => {
  const { 
    clients, 
    schedule, 
    consultations, 
    mealPlans, 
    analytics, 
    profile,
    loading,
    error 
  } = useNutritionist();
  const { user } = useAuth();
  const [selectedView, setSelectedView] = useState('overview');

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
            Welcome back, {profile?.name || user?.name}!
          </h1>
          <p className="text-gray-600">
            Manage your clients, consultations, and meal plans
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6 border-b">
          {['overview', 'clients', 'schedule', 'meal-plans'].map((view) => (
            <button
              key={view}
              onClick={() => setSelectedView(view)}
              className={`pb-2 px-4 font-medium transition-colors ${
                selectedView === view
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {view.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {selectedView === 'overview' && (
          <div className="space-y-6">
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics?.totalClients || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {analytics?.activeClients || 0} active
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Consultations This Month</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics?.consultationsThisMonth || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    ${(analytics?.revenueThisMonth || 0).toLocaleString()} revenue
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Client Satisfaction</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics?.clientSatisfaction || 0}/5</div>
                  <Progress value={(analytics?.clientSatisfaction || 0) * 20} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Health Improvement Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics?.healthImprovementRate || 0}%</div>
                  <Progress value={analytics?.healthImprovementRate || 0} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Consultations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {consultations.slice(0, 3).map((consultation) => (
                      <div key={consultation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{consultation.clientName}</p>
                          <p className="text-sm text-gray-600">{consultation.type}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={consultation.status === 'completed' ? 'default' : 'secondary'}>
                            {consultation.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(consultation.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {schedule.slice(0, 3).map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <p className="font-medium">{appointment.clientName}</p>
                          <p className="text-sm text-gray-600">{appointment.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {new Date(appointment.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                          <p className="text-xs text-gray-500">{appointment.duration} min</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Clients Tab */}
        {selectedView === 'clients' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Client Management</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Client
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clients.map((client) => (
                  <div key={client.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-lg">{client.name}</h3>
                        <p className="text-gray-600">{client.email}</p>
                      </div>
                      <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                        {client.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Health Profile</p>
                        <p className="text-gray-600">BMI: {client.healthProfile.bmi}</p>
                        <p className="text-gray-600">Conditions: {client.healthProfile.conditions.join(', ')}</p>
                      </div>
                      <div>
                        <p className="font-medium">Last Assessment</p>
                        <p className="text-gray-600">{new Date(client.healthProfile.lastAssessment).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="font-medium">Member Since</p>
                        <p className="text-gray-600">{new Date(client.joinDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm">
                        Schedule Consultation
                      </Button>
                      <Button variant="outline" size="sm">
                        Create Meal Plan
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Schedule Tab */}
        {selectedView === 'schedule' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Consultation Schedule</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Consultation
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedule.map((appointment) => (
                  <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-lg">{appointment.clientName}</h3>
                        <p className="text-gray-600">{appointment.type}</p>
                      </div>
                      <Badge variant={appointment.status === 'scheduled' ? 'default' : 'secondary'}>
                        {appointment.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Date & Time</p>
                        <p className="text-gray-600">
                          {new Date(appointment.date).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Duration</p>
                        <p className="text-gray-600">{appointment.duration} minutes</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Clock className="h-4 w-4 mr-2" />
                        Start Session
                      </Button>
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Meal Plans Tab */}
        {selectedView === 'meal-plans' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Meal Plans</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Meal Plan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mealPlans.map((plan) => (
                  <div key={plan.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-lg">{plan.name}</h3>
                        <p className="text-gray-600">For: {plan.clientName}</p>
                      </div>
                      <Badge variant={plan.status === 'active' ? 'default' : 'secondary'}>
                        {plan.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Duration</p>
                        <p className="text-gray-600">{plan.duration}</p>
                      </div>
                      <div>
                        <p className="font-medium">Total Meals</p>
                        <p className="text-gray-600">{plan.meals} meals</p>
                      </div>
                      <div>
                        <p className="font-medium">Created</p>
                        <p className="text-gray-600">{new Date(plan.createdDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Share with Client
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NutritionistDashboard;
