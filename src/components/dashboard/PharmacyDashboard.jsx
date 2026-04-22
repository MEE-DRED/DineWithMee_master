import React, { useState } from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Users, 
  Package, 
  FileText, 
  Activity,
  Search,
  Filter,
  Plus,
  Sync,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';

const PharmacyDashboard = () => {
  const { 
    patients, 
    medications, 
    prescriptions, 
    inventory, 
    healthDataSync,
    consultations,
    complianceData,
    profile,
    loading,
    error 
  } = usePharmacy();
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
            Manage patients, medications, and health data integration
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6 border-b">
          {['overview', 'patients', 'medications', 'prescriptions', 'inventory', 'compliance'].map((view) => (
            <button
              key={view}
              onClick={() => setSelectedView(view)}
              className={`pb-2 px-4 font-medium transition-colors ${
                selectedView === view
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {selectedView === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{profile?.totalPatients || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Active care management
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{profile?.activePrescriptions || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Currently monitored
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Medication Adherence</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {complianceData.length > 0 
                      ? Math.round(complianceData.reduce((sum, item) => sum + item.adherenceRate, 0) / complianceData.length)
                      : 0}%
                  </div>
                  <Progress 
                    value={complianceData.length > 0 
                      ? Math.round(complianceData.reduce((sum, item) => sum + item.adherenceRate, 0) / complianceData.length)
                      : 0} 
                    className="mt-2" 
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sync Status</CardTitle>
                  <Sync className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {healthDataSync?.syncStatus === 'success' ? 'Active' : 'Inactive'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last sync: {healthDataSync ? new Date(healthDataSync.lastSync).toLocaleDateString() : 'Never'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Prescriptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {prescriptions.slice(0, 3).map((prescription) => (
                      <div key={prescription.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{prescription.patientName}</p>
                          <p className="text-sm text-gray-600">{prescription.medicationName} - {prescription.dosage}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={prescription.status === 'active' ? 'default' : 'secondary'}>
                            {prescription.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            Refills: {prescription.refillsRemaining}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inventory Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {inventory.filter(item => item.currentStock <= item.reorderLevel).map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                          <div>
                            <p className="font-medium">{item.medicationName}</p>
                            <p className="text-sm text-gray-600">Stock: {item.currentStock} (Reorder at {item.reorderLevel})</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      </div>
                    ))}
                    {inventory.filter(item => item.currentStock <= item.reorderLevel).length === 0 && (
                      <p className="text-gray-500 text-center py-4">All inventory levels are healthy</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Patients Tab */}
        {selectedView === 'patients' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Patient Management</CardTitle>
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
                    Add Patient
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patients.map((patient) => (
                  <div key={patient.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-lg">{patient.name}</h3>
                        <p className="text-gray-600">{patient.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Last Visit</p>
                        <p className="text-sm">{new Date(patient.lastVisit).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Conditions</p>
                        <p className="text-gray-600">{patient.conditions.join(', ')}</p>
                      </div>
                      <div>
                        <p className="font-medium">Medications</p>
                        <p className="text-gray-600">{patient.medications.join(', ')}</p>
                      </div>
                      <div>
                        <p className="font-medium">Healthcare Team</p>
                        <p className="text-gray-600">Dr: {patient.prescribingDoctor}</p>
                        <p className="text-gray-600">Nutritionist: {patient.nutritionist}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm">
                        View Prescriptions
                      </Button>
                      <Button variant="outline" size="sm">
                        Track Compliance
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Medications Tab */}
        {selectedView === 'medications' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Medication Database</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Medication
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medications.map((medication) => (
                  <div key={medication.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-lg">{medication.name}</h3>
                        <p className="text-gray-600">{medication.category}</p>
                      </div>
                      <Badge variant={medication.stockLevel > medication.reorderLevel ? 'default' : 'destructive'}>
                        {medication.stockLevel > medication.reorderLevel ? 'In Stock' : 'Low Stock'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Description</p>
                        <p className="text-gray-600">{medication.description}</p>
                      </div>
                      <div>
                        <p className="font-medium">Stock Level</p>
                        <p className="text-gray-600">{medication.stockLevel} units (Reorder at {medication.reorderLevel})</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="font-medium text-sm mb-2">Side Effects</p>
                      <div className="flex flex-wrap gap-2">
                        {medication.sideEffects.map((effect) => (
                          <Badge key={effect} variant="outline" className="text-xs">
                            {effect}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Check Interactions
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Prescriptions Tab */}
        {selectedView === 'prescriptions' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Prescription Management</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Prescription
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prescriptions.map((prescription) => (
                  <div key={prescription.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-lg">{prescription.patientName}</h3>
                        <p className="text-gray-600">{prescription.medicationName} - {prescription.dosage}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={prescription.status === 'active' ? 'default' : 'secondary'}>
                          {prescription.status}
                        </Badge>
                        <Badge variant="outline">
                          {prescription.refillsRemaining} refills left
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Prescribed By</p>
                        <p className="text-gray-600">{prescription.prescribedBy}</p>
                      </div>
                      <div>
                        <p className="font-medium">Frequency</p>
                        <p className="text-gray-600">{prescription.frequency}</p>
                      </div>
                      <div>
                        <p className="font-medium">Dates</p>
                        <p className="text-gray-600">
                          {new Date(prescription.prescribedDate).toLocaleDateString()} - 
                          {new Date(prescription.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Refill
                      </Button>
                      <Button variant="outline" size="sm">
                        Track Adherence
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Inventory Tab */}
        {selectedView === 'inventory' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Inventory Management</CardTitle>
                <Button size="sm">
                  <Sync className="h-4 w-4 mr-2" />
                  Sync Inventory
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventory.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-lg">{item.medicationName}</h3>
                        <p className="text-gray-600">Supplier: {item.supplier}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={item.currentStock > item.reorderLevel ? 'default' : 'destructive'}>
                          {item.currentStock > item.reorderLevel ? 'Adequate' : 'Low Stock'}
                        </Badge>
                        <span className="text-sm font-medium">${item.unitPrice}/unit</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Current Stock</p>
                        <p className="text-gray-600">{item.currentStock} units</p>
                      </div>
                      <div>
                        <p className="font-medium">Reorder Level</p>
                        <p className="text-gray-600">{item.reorderLevel} units</p>
                      </div>
                      <div>
                        <p className="font-medium">Last Restocked</p>
                        <p className="text-gray-600">{new Date(item.lastRestocked).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="font-medium">Next Restock</p>
                        <p className="text-gray-600">{new Date(item.nextRestockDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        Update Stock
                      </Button>
                      <Button variant="outline" size="sm">
                        Order More
                      </Button>
                      <Button variant="outline" size="sm">
                        View History
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Compliance Tab */}
        {selectedView === 'compliance' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Medication Compliance Tracking</CardTitle>
                <Button size="sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceData.map((data) => (
                  <div key={data.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-lg">{data.patientName}</h3>
                        <p className="text-gray-600">{data.medicationName}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={
                          data.adherenceRate >= 90 ? 'default' : 
                          data.adherenceRate >= 70 ? 'secondary' : 'destructive'
                        }>
                          {data.adherenceRate}% adherence
                        </Badge>
                        <Badge variant="outline">
                          {data.riskLevel} risk
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium">30-Day Performance</p>
                        <p className="text-gray-600">{data.last30Days} doses taken</p>
                      </div>
                      <div>
                        <p className="font-medium">Missed Doses</p>
                        <p className="text-gray-600">{data.missedDoses} doses missed</p>
                      </div>
                      <div>
                        <p className="font-medium">Last Updated</p>
                        <p className="text-gray-600">{new Date(data.lastUpdated).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Progress value={data.adherenceRate} className="h-2" />
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Send Reminder
                      </Button>
                      <Button variant="outline" size="sm">
                        Contact Patient
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

export default PharmacyDashboard;
