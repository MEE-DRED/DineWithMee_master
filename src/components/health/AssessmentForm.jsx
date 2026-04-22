import React, { useState, useEffect } from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { 
  ClipboardList, 
  CheckCircle, 
  AlertCircle, 
  Heart,
  Activity,
  Target,
  FileText
} from 'lucide-react';

const AssessmentForm = () => {
  const { healthSummary, updateHealthData } = useCustomer();
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState({
    personal: {
      age: '',
      gender: '',
      height: '',
      weight: '',
      activityLevel: ''
    },
    medical: {
      conditions: [],
      medications: [],
      familyHistory: [],
      symptoms: []
    },
    lifestyle: {
      diet: '',
      smoking: '',
      alcohol: '',
      stress: '',
      sleep: ''
    },
    goals: {
      primaryGoal: '',
      timeline: '',
      challenges: '',
      motivation: ''
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState(null);

  const steps = [
    { id: 'personal', title: 'Personal Information', icon: User },
    { id: 'medical', title: 'Medical History', icon: Heart },
    { id: 'lifestyle', title: 'Lifestyle Assessment', icon: Activity },
    { id: 'goals', title: 'Health Goals', icon: Target }
  ];

  const calculateHealthScore = (data) => {
    let score = 100;
    
    // Age factor
    const age = parseInt(data.personal.age);
    if (age > 65) score -= 10;
    else if (age > 50) score -= 5;
    
    // BMI factor
    const height = parseFloat(data.personal.height);
    const weight = parseFloat(data.personal.weight);
    if (height && weight) {
      const bmi = weight / ((height / 100) ** 2);
      if (bmi > 30) score -= 15;
      else if (bmi > 25) score -= 10;
      else if (bmi < 18.5) score -= 5;
    }
    
    // Activity level
    if (data.personal.activityLevel === 'sedentary') score -= 10;
    else if (data.personal.activityLevel === 'light') score -= 5;
    
    // Smoking
    if (data.lifestyle.smoking === 'current') score -= 20;
    else if (data.lifestyle.smoking === 'former') score -= 5;
    
    // Medical conditions
    if (data.medical.conditions.includes('Diabetes')) score -= 15;
    if (data.medical.conditions.includes('Hypertension')) score -= 10;
    if (data.medical.conditions.includes('Heart Disease')) score -= 20;
    
    return Math.max(0, Math.min(100, score));
  };

  const generateRecommendations = (data, score) => {
    const recommendations = [];
    
    if (score < 60) {
      recommendations.push({
        priority: 'high',
        category: 'Immediate',
        items: [
          'Consult with a healthcare provider for a comprehensive health evaluation',
          'Consider working with a nutritionist to develop a personalized meal plan',
          'Start with gentle physical activity and gradually increase intensity'
        ]
      });
    }
    
    if (data.personal.activityLevel === 'sedentary') {
      recommendations.push({
        priority: 'medium',
        category: 'Physical Activity',
        items: [
          'Start with 10-15 minute walks daily',
          'Consider incorporating strength training 2-3 times per week',
          'Find activities you enjoy to ensure consistency'
        ]
      });
    }
    
    if (data.lifestyle.smoking === 'current') {
      recommendations.push({
        priority: 'high',
        category: 'Smoking Cessation',
        items: [
          'Seek medical support for smoking cessation',
          'Consider nicotine replacement therapy',
          'Join a support group for quitting smoking'
        ]
      });
    }
    
    if (data.medical.conditions.includes('Hypertension')) {
      recommendations.push({
        priority: 'high',
        category: 'Blood Pressure Management',
        items: [
          'Monitor blood pressure regularly',
          'Reduce sodium intake to less than 2,300mg per day',
          'Practice stress management techniques'
        ]
      });
    }
    
    if (data.medical.conditions.includes('Diabetes')) {
      recommendations.push({
        priority: 'high',
        category: 'Diabetes Management',
        items: [
          'Monitor blood glucose levels as directed by your healthcare provider',
          'Follow a consistent carbohydrate-controlled meal plan',
          'Maintain regular meal timing'
        ]
      });
    }
    
    return recommendations;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const score = calculateHealthScore(assessmentData);
    const recommendations = generateRecommendations(assessmentData, score);
    
    setAssessmentResult({
      score,
      recommendations,
      completedAt: new Date().toISOString()
    });
    
    setIsSubmitting(false);
  };

  const updateAssessmentData = (step, field, value) => {
    setAssessmentData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value
      }
    }));
  };

  const toggleArrayItem = (step, field, item) => {
    setAssessmentData(prev => {
      const currentArray = prev[step][field] || [];
      const newArray = currentArray.includes(item)
        ? currentArray.filter(i => i !== item)
        : [...currentArray, item];
      
      return {
        ...prev,
        [step]: {
          ...prev[step],
          [field]: newArray
        }
      };
    });
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'personal':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <input
                  id="age"
                  type="number"
                  className="w-full mt-1 p-2 border rounded-md"
                  value={assessmentData.personal.age}
                  onChange={(e) => updateAssessmentData('personal', 'age', e.target.value)}
                  placeholder="Enter your age"
                />
              </div>
              <div>
                <Label>Gender</Label>
                <RadioGroup
                  value={assessmentData.personal.gender}
                  onValueChange={(value) => updateAssessmentData('personal', 'gender', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <input
                  id="height"
                  type="number"
                  className="w-full mt-1 p-2 border rounded-md"
                  value={assessmentData.personal.height}
                  onChange={(e) => updateAssessmentData('personal', 'height', e.target.value)}
                  placeholder="Enter height in cm"
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <input
                  id="weight"
                  type="number"
                  className="w-full mt-1 p-2 border rounded-md"
                  value={assessmentData.personal.weight}
                  onChange={(e) => updateAssessmentData('personal', 'weight', e.target.value)}
                  placeholder="Enter weight in kg"
                />
              </div>
            </div>
            
            <div>
              <Label>Activity Level</Label>
              <RadioGroup
                value={assessmentData.personal.activityLevel}
                onValueChange={(value) => updateAssessmentData('personal', 'activityLevel', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sedentary" id="sedentary" />
                  <Label htmlFor="sedentary">Sedentary (little or no exercise)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light">Light (1-3 days/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate">Moderate (3-5 days/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active">Active (6-7 days/week)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );
        
      case 'medical':
        return (
          <div className="space-y-6">
            <div>
              <Label>Medical Conditions (select all that apply)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {['Hypertension', 'Diabetes', 'Heart Disease', 'High Cholesterol', 'Asthma', 'Arthritis'].map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox
                      id={condition}
                      checked={assessmentData.medical.conditions.includes(condition)}
                      onCheckedChange={() => toggleArrayItem('medical', 'conditions', condition)}
                    />
                    <Label htmlFor={condition}>{condition}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label>Current Medications</Label>
              <Textarea
                className="mt-2"
                placeholder="List all current medications, dosages, and frequency"
                value={assessmentData.medical.medications.join('\n')}
                onChange={(e) => updateAssessmentData('medical', 'medications', e.target.value.split('\n').filter(m => m.trim()))}
              />
            </div>
            
            <div>
              <Label>Family History (select all that apply)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {['Heart Disease', 'Diabetes', 'High Blood Pressure', 'Stroke', 'Cancer', 'Obesity'].map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox
                      id={`family-${condition}`}
                      checked={assessmentData.medical.familyHistory.includes(condition)}
                      onCheckedChange={() => toggleArrayItem('medical', 'familyHistory', condition)}
                    />
                    <Label htmlFor={`family-${condition}`}>{condition}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label>Current Symptoms</Label>
              <Textarea
                className="mt-2"
                placeholder="Describe any current health symptoms or concerns"
                value={assessmentData.medical.symptoms.join('\n')}
                onChange={(e) => updateAssessmentData('medical', 'symptoms', e.target.value.split('\n').filter(s => s.trim()))}
              />
            </div>
          </div>
        );
        
      case 'lifestyle':
        return (
          <div className="space-y-6">
            <div>
              <Label>Diet Type</Label>
              <RadioGroup
                value={assessmentData.lifestyle.diet}
                onValueChange={(value) => updateAssessmentData('lifestyle', 'diet', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="balanced" id="balanced" />
                  <Label htmlFor="balanced">Balanced/Mixed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vegetarian" id="vegetarian" />
                  <Label htmlFor="vegetarian">Vegetarian</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vegan" id="vegan" />
                  <Label htmlFor="vegan">Vegan</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low-carb" id="low-carb" />
                  <Label htmlFor="low-carb">Low Carb</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label>Smoking Status</Label>
              <RadioGroup
                value={assessmentData.lifestyle.smoking}
                onValueChange={(value) => updateAssessmentData('lifestyle', 'smoking', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="never" />
                  <Label htmlFor="never">Never smoked</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="former" id="former" />
                  <Label htmlFor="former">Former smoker</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="current" id="current" />
                  <Label htmlFor="current">Current smoker</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label>Alcohol Consumption</Label>
              <RadioGroup
                value={assessmentData.lifestyle.alcohol}
                onValueChange={(value) => updateAssessmentData('lifestyle', 'alcohol', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none">None</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="occasional" id="occasional" />
                  <Label htmlFor="occasional">Occasional (1-2 drinks/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate">Moderate (3-7 drinks/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="heavy" id="heavy" />
                  <Label htmlFor="heavy">Heavy (7+ drinks/week)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label>Stress Level</Label>
              <RadioGroup
                value={assessmentData.lifestyle.stress}
                onValueChange={(value) => updateAssessmentData('lifestyle', 'stress', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low">Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate">Moderate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high">High</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label>Sleep Quality</Label>
              <RadioGroup
                value={assessmentData.lifestyle.sleep}
                onValueChange={(value) => updateAssessmentData('lifestyle', 'sleep', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="excellent" id="excellent" />
                  <Label htmlFor="excellent">Excellent (7-9 hours, quality sleep)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="good" id="good" />
                  <Label htmlFor="good">Good (6-7 hours, mostly quality)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="poor" id="poor" />
                  <Label htmlFor="poor">Poor (less than 6 hours or poor quality)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );
        
      case 'goals':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="primary-goal">Primary Health Goal</Label>
              <Textarea
                id="primary-goal"
                className="mt-2"
                placeholder="What is your main health objective? (e.g., lose weight, manage diabetes, improve energy)"
                value={assessmentData.goals.primaryGoal}
                onChange={(e) => updateAssessmentData('goals', 'primaryGoal', e.target.value)}
              />
            </div>
            
            <div>
              <Label>Timeline</Label>
              <RadioGroup
                value={assessmentData.goals.timeline}
                onValueChange={(value) => updateAssessmentData('goals', 'timeline', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1month" id="1month" />
                  <Label htmlFor="1month">1 month</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3months" id="3months" />
                  <Label htmlFor="3months">3 months</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="6months" id="6months" />
                  <Label htmlFor="6months">6 months</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1year" id="1year" />
                  <Label htmlFor="1year">1 year</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="challenges">Anticipated Challenges</Label>
              <Textarea
                id="challenges"
                className="mt-2"
                placeholder="What obstacles do you expect to face? (e.g., time constraints, food cravings, motivation)"
                value={assessmentData.goals.challenges}
                onChange={(e) => updateAssessmentData('goals', 'challenges', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="motivation">Motivation</Label>
              <Textarea
                id="motivation"
                className="mt-2"
                placeholder="What motivates you to achieve your health goals? (e.g., family, health concerns, personal growth)"
                value={assessmentData.goals.motivation}
                onChange={(e) => updateAssessmentData('goals', 'motivation', e.target.value)}
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (assessmentResult) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Complete!</h1>
          <p className="text-gray-600">Your health assessment has been processed</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Your Health Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{assessmentResult.score}/100</div>
              <Progress value={assessmentResult.score} className="mb-4" />
              <p className="text-gray-600">
                {assessmentResult.score >= 80 ? 'Excellent health status' :
                 assessmentResult.score >= 60 ? 'Good health with room for improvement' :
                 assessmentResult.score >= 40 ? 'Moderate health concerns' :
                 'Significant health improvement needed'}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Personalized Recommendations</h2>
          {assessmentResult.recommendations.map((rec, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {rec.category}
                  <Badge variant={rec.priority === 'high' ? 'destructive' : 'secondary'}>
                    {rec.priority} priority
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {rec.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <Button variant="outline" onClick={() => {
            setAssessmentResult(null);
            setCurrentStep(0);
            setAssessmentData({
              personal: { age: '', gender: '', height: '', weight: '', activityLevel: '' },
              medical: { conditions: [], medications: [], familyHistory: [], symptoms: [] },
              lifestyle: { diet: '', smoking: '', alcohol: '', stress: '', sleep: '' },
              goals: { primaryGoal: '', timeline: '', challenges: '', motivation: '' }
            });
          }}>
            Retake Assessment
          </Button>
          <Button>
            Schedule Consultation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Assessment</h1>
        <p className="text-gray-600">Complete this comprehensive assessment to get personalized health recommendations</p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
        </div>
        <Progress value={((currentStep + 1) / steps.length) * 100} />
      </div>

      {/* Step Navigation */}
      <div className="flex justify-center space-x-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                index === currentStep
                  ? 'bg-blue-100 text-blue-800'
                  : index < currentStep
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{step.title}</span>
            </div>
          );
        })}
      </div>

      {/* Current Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {React.createElement(steps[currentStep].icon, { className: "h-5 w-5" })}
            {steps[currentStep].title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        
        {currentStep === steps.length - 1 ? (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Complete Assessment'}
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default AssessmentForm;
