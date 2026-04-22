import React, { useState, useEffect } from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { 
  User, 
  Heart, 
  Activity, 
  TrendingUp,
  Save,
  Edit,
  Check
} from 'lucide-react';

const HealthProfile = () => {
  const { healthSummary, updateHealthData, loading } = useCustomer();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    bloodSugar: '',
    conditions: [],
    medications: [],
    allergies: [],
    lifestyle: {
      activityLevel: '',
      dietType: '',
      smokingStatus: '',
      alcoholConsumption: ''
    }
  });

  useEffect(() => {
    if (healthSummary) {
      setFormData({
        weight: healthSummary.weight || '',
        height: healthSummary.height || '',
        bloodPressureSystolic: healthSummary.bloodPressure?.split('/')[0] || '',
        bloodPressureDiastolic: healthSummary.bloodPressure?.split('/')[1] || '',
        bloodSugar: healthSummary.bloodSugar || '',
        conditions: healthSummary.conditions || [],
        medications: healthSummary.medications || [],
        allergies: healthSummary.allergies || [],
        lifestyle: healthSummary.lifestyle || {
          activityLevel: '',
          dietType: '',
          smokingStatus: '',
          alcoholConsumption: ''
        }
      });
    }
  }, [healthSummary]);

  const calculateBMI = (weight, height) => {
    if (!weight || !height) return null;
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getBMICategory = (bmi) => {
    if (!bmi) return '';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const getBloodPressureCategory = (systolic, diastolic) => {
    if (!systolic || !diastolic) return '';
    if (systolic < 120 && diastolic < 80) return 'Normal';
    if (systolic < 130 && diastolic < 80) return 'Elevated';
    if (systolic < 140 || diastolic < 90) return 'Stage 1 Hypertension';
    return 'Stage 2 Hypertension';
  };

  const getBloodSugarCategory = (bloodSugar) => {
    if (!bloodSugar) return '';
    if (bloodSugar < 100) return 'Normal';
    if (bloodSugar < 126) return 'Prediabetes';
    return 'Diabetes';
  };

  const handleSave = async () => {
    const updatedData = {
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      bloodPressure: `${formData.bloodPressureSystolic}/${formData.bloodPressureDiastolic}`,
      bloodSugar: parseFloat(formData.bloodSugar),
      bmi: calculateBMI(formData.weight, formData.height),
      conditions: formData.conditions,
      medications: formData.medications,
      allergies: formData.allergies,
      lifestyle: formData.lifestyle
    };

    const result = await updateHealthData(updatedData);
    if (result.success) {
      setIsEditing(false);
    }
  };

  const currentBMI = calculateBMI(formData.weight, formData.height);
  const currentBPCategory = getBloodPressureCategory(
    parseInt(formData.bloodPressureSystolic),
    parseInt(formData.bloodPressureDiastolic)
  );
  const currentSugarCategory = getBloodSugarCategory(parseFloat(formData.bloodSugar));

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Health Profile</h1>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          disabled={loading}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      {/* Health Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">BMI</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentBMI || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">
              {getBMICategory(currentBMI)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formData.bloodPressureSystolic && formData.bloodPressureDiastolic 
                ? `${formData.bloodPressureSystolic}/${formData.bloodPressureDiastolic}` 
                : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              {currentBPCategory}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blood Sugar</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formData.bloodSugar ? `${formData.bloodSugar} mg/dL` : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              {currentSugarCategory}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Health Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Health Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Measurements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
                disabled={!isEditing}
                placeholder="Enter weight"
              />
            </div>
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({...formData, height: e.target.value})}
                disabled={!isEditing}
                placeholder="Enter height"
              />
            </div>
          </div>

          {/* Blood Pressure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bp-systolic">Systolic Blood Pressure</Label>
              <Input
                id="bp-systolic"
                type="number"
                value={formData.bloodPressureSystolic}
                onChange={(e) => setFormData({...formData, bloodPressureSystolic: e.target.value})}
                disabled={!isEditing}
                placeholder="120"
              />
            </div>
            <div>
              <Label htmlFor="bp-diastolic">Diastolic Blood Pressure</Label>
              <Input
                id="bp-diastolic"
                type="number"
                value={formData.bloodPressureDiastolic}
                onChange={(e) => setFormData({...formData, bloodPressureDiastolic: e.target.value})}
                disabled={!isEditing}
                placeholder="80"
              />
            </div>
          </div>

          {/* Blood Sugar */}
          <div>
            <Label htmlFor="blood-sugar">Blood Sugar (mg/dL)</Label>
            <Input
              id="blood-sugar"
              type="number"
              value={formData.bloodSugar}
              onChange={(e) => setFormData({...formData, bloodSugar: e.target.value})}
              disabled={!isEditing}
              placeholder="95"
            />
          </div>

          {/* Medical Conditions */}
          <div>
            <Label>Medical Conditions</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.conditions.map((condition, index) => (
                <Badge key={index} variant="secondary">
                  {condition}
                  {isEditing && (
                    <button
                      className="ml-2 text-red-500"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          conditions: formData.conditions.filter((_, i) => i !== index)
                        });
                      }}
                    >
                      ×
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <Input
                className="mt-2"
                placeholder="Add condition and press Enter"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    setFormData({
                      ...formData,
                      conditions: [...formData.conditions, e.target.value.trim()]
                    });
                    e.target.value = '';
                  }
                }}
              />
            )}
          </div>

          {/* Medications */}
          <div>
            <Label>Current Medications</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.medications.map((medication, index) => (
                <Badge key={index} variant="secondary">
                  {medication}
                  {isEditing && (
                    <button
                      className="ml-2 text-red-500"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          medications: formData.medications.filter((_, i) => i !== index)
                        });
                      }}
                    >
                      ×
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <Input
                className="mt-2"
                placeholder="Add medication and press Enter"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    setFormData({
                      ...formData,
                      medications: [...formData.medications, e.target.value.trim()]
                    });
                    e.target.value = '';
                  }
                }}
              />
            )}
          </div>

          {/* Allergies */}
          <div>
            <Label>Allergies</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.allergies.map((allergy, index) => (
                <Badge key={index} variant="destructive">
                  {allergy}
                  {isEditing && (
                    <button
                      className="ml-2 text-white"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          allergies: formData.allergies.filter((_, i) => i !== index)
                        });
                      }}
                    >
                      ×
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <Input
                className="mt-2"
                placeholder="Add allergy and press Enter"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    setFormData({
                      ...formData,
                      allergies: [...formData.allergies, e.target.value.trim()]
                    });
                    e.target.value = '';
                  }
                }}
              />
            )}
          </div>

          {/* Lifestyle Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="activity-level">Activity Level</Label>
              <Select
                value={formData.lifestyle.activityLevel}
                onValueChange={(value) => setFormData({
                  ...formData,
                  lifestyle: {...formData.lifestyle, activityLevel: value}
                })}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="light">Light Activity</SelectItem>
                  <SelectItem value="moderate">Moderate Activity</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="very-active">Very Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="diet-type">Diet Type</Label>
              <Select
                value={formData.lifestyle.dietType}
                onValueChange={(value) => setFormData({
                  ...formData,
                  lifestyle: {...formData.lifestyle, dietType: value}
                })}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select diet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="omnivore">Omnivore</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="keto">Keto</SelectItem>
                  <SelectItem value="mediterranean">Mediterranean</SelectItem>
                  <SelectItem value="low-carb">Low Carb</SelectItem>
                  <SelectItem value="low-fat">Low Fat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="smoking-status">Smoking Status</Label>
              <Select
                value={formData.lifestyle.smokingStatus}
                onValueChange={(value) => setFormData({
                  ...formData,
                  lifestyle: {...formData.lifestyle, smokingStatus: value}
                })}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select smoking status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never</SelectItem>
                  <SelectItem value="former">Former</SelectItem>
                  <SelectItem value="current">Current</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="alcohol-consumption">Alcohol Consumption</Label>
              <Select
                value={formData.lifestyle.alcoholConsumption}
                onValueChange={(value) => setFormData({
                  ...formData,
                  lifestyle: {...formData.lifestyle, alcoholConsumption: value}
                })}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select alcohol consumption" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="occasional">Occasional</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="heavy">Heavy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthProfile;
