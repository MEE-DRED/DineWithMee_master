import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';

const PharmacyContext = createContext();

const pharmacyReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    case 'SET_PATIENTS':
      return {
        ...state,
        patients: action.payload,
        loading: false,
      };

    case 'SET_MEDICATIONS':
      return {
        ...state,
        medications: action.payload,
        loading: false,
      };

    case 'SET_PRESCRIPTIONS':
      return {
        ...state,
        prescriptions: action.payload,
        loading: false,
      };

    case 'SET_INVENTORY':
      return {
        ...state,
        inventory: action.payload,
        loading: false,
      };

    case 'SET_HEALTH_DATA_SYNC':
      return {
        ...state,
        healthDataSync: action.payload,
        loading: false,
      };

    case 'SET_CONSULTATIONS':
      return {
        ...state,
        consultations: action.payload,
        loading: false,
      };

    case 'SET_COMPLIANCE_DATA':
      return {
        ...state,
        complianceData: action.payload,
        loading: false,
      };

    case 'SET_PROFILE':
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };

    case 'ADD_PATIENT':
      return {
        ...state,
        patients: [...state.patients, action.payload],
      };

    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: state.patients.map(patient =>
          patient.id === action.payload.id ? action.payload : patient
        ),
      };

    case 'UPDATE_INVENTORY':
      return {
        ...state,
        inventory: state.inventory.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case 'ADD_PRESCRIPTION':
      return {
        ...state,
        prescriptions: [...state.prescriptions, action.payload],
      };

    default:
      return state;
  }
};

const initialState = {
  loading: false,
  error: null,
  patients: [],
  medications: [],
  prescriptions: [],
  inventory: [],
  healthDataSync: null,
  consultations: [],
  complianceData: [],
  profile: null,
};

export const PharmacyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pharmacyReducer, initialState);
  const { user } = useAuth();

  const loadPharmacyData = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Mock patients data
      const mockPatients = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          dateOfBirth: '1985-05-15',
          conditions: ['Hypertension', 'Diabetes Type 2'],
          medications: ['Lisinopril', 'Metformin'],
          lastVisit: '2024-04-10',
          prescribingDoctor: 'Dr. Smith',
          nutritionist: 'Dr. Sarah Johnson',
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          dateOfBirth: '1990-08-22',
          conditions: ['Hypertension'],
          medications: ['Amlodipine'],
          lastVisit: '2024-04-08',
          prescribingDoctor: 'Dr. Johnson',
          nutritionist: 'Dr. Mike Chen',
        },
      ];

      // Mock medications
      const mockMedications = [
        {
          id: 1,
          name: 'Lisinopril',
          category: 'ACE Inhibitor',
          description: 'Used for treating high blood pressure',
          sideEffects: ['Dry cough', 'Dizziness', 'Headache'],
          interactions: ['NSAIDs', 'Potassium supplements'],
          stockLevel: 150,
          reorderLevel: 50,
        },
        {
          id: 2,
          name: 'Metformin',
          category: 'Biguanide',
          description: 'Used for treating Type 2 diabetes',
          sideEffects: ['Nausea', 'Diarrhea', 'Stomach upset'],
          interactions: ['Contrast dye', 'Alcohol'],
          stockLevel: 200,
          reorderLevel: 75,
        },
      ];

      // Mock prescriptions
      const mockPrescriptions = [
        {
          id: 1,
          patientId: 1,
          patientName: 'John Doe',
          medicationId: 1,
          medicationName: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once daily',
          prescribedBy: 'Dr. Smith',
          prescribedDate: '2024-04-01',
          expiryDate: '2024-06-01',
          status: 'active',
          refillsRemaining: 2,
        },
        {
          id: 2,
          patientId: 1,
          patientName: 'John Doe',
          medicationId: 2,
          medicationName: 'Metformin',
          dosage: '500mg',
          frequency: 'Twice daily',
          prescribedBy: 'Dr. Smith',
          prescribedDate: '2024-04-01',
          expiryDate: '2024-06-01',
          status: 'active',
          refillsRemaining: 3,
        },
      ];

      // Mock inventory
      const mockInventory = [
        {
          id: 1,
          medicationId: 1,
          medicationName: 'Lisinopril',
          currentStock: 150,
          reorderLevel: 50,
          lastRestocked: '2024-03-15',
          nextRestockDate: '2024-04-20',
          supplier: 'PharmaCorp',
          unitPrice: 12.50,
        },
        {
          id: 2,
          medicationId: 2,
          medicationName: 'Metformin',
          currentStock: 200,
          reorderLevel: 75,
          lastRestocked: '2024-03-20',
          nextRestockDate: '2024-04-25',
          supplier: 'MediSupply',
          unitPrice: 8.75,
        },
      ];

      // Mock health data sync
      const mockHealthDataSync = {
        lastSync: '2024-04-12T10:30:00Z',
        totalPatientsSynced: 45,
        syncStatus: 'success',
        nextScheduledSync: '2024-04-13T10:30:00Z',
        syncedDataTypes: ['blood_pressure', 'glucose_levels', 'medication_adherence'],
      };

      // Mock consultations
      const mockConsultations = [
        {
          id: 1,
          patientId: 1,
          patientName: 'John Doe',
          nutritionist: 'Dr. Sarah Johnson',
          date: '2024-04-15T14:00:00Z',
          type: 'Medication Review',
          status: 'scheduled',
          notes: 'Review medication effectiveness and side effects',
        },
      ];

      // Mock compliance data
      const mockComplianceData = [
        {
          patientId: 1,
          patientName: 'John Doe',
          medicationName: 'Lisinopril',
          adherenceRate: 85,
          missedDoses: 3,
          last30Days: 27,
          riskLevel: 'low',
        },
        {
          patientId: 1,
          patientName: 'John Doe',
          medicationName: 'Metformin',
          adherenceRate: 92,
          missedDoses: 2,
          last30Days: 58,
          riskLevel: 'low',
        },
      ];

      // Mock profile
      const mockProfile = {
        id: user?.id,
        name: 'HealthPlus Pharmacy',
        email: 'pharmacy@healthplus.com',
        license: 'PH-2024-001',
        address: '123 Main St, New York, NY 10001',
        phone: '+1-555-0123',
        status: 'verified',
        integrationStatus: 'active',
        totalPatients: 45,
        activePrescriptions: 89,
        joinDate: '2024-01-15',
      };

      dispatch({ type: 'SET_PATIENTS', payload: mockPatients });
      dispatch({ type: 'SET_MEDICATIONS', payload: mockMedications });
      dispatch({ type: 'SET_PRESCRIPTIONS', payload: mockPrescriptions });
      dispatch({ type: 'SET_INVENTORY', payload: mockInventory });
      dispatch({ type: 'SET_HEALTH_DATA_SYNC', payload: mockHealthDataSync });
      dispatch({ type: 'SET_CONSULTATIONS', payload: mockConsultations });
      dispatch({ type: 'SET_COMPLIANCE_DATA', payload: mockComplianceData });
      dispatch({ type: 'SET_PROFILE', payload: mockProfile });

    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === 'PHARMACY_PARTNER') {
      loadPharmacyData();
    }
  }, [user, loadPharmacyData]);

  const addPatient = async (patientData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPatient = {
        id: Date.now(),
        ...patientData,
        registeredDate: new Date().toISOString(),
      };

      dispatch({ type: 'ADD_PATIENT', payload: newPatient });
      return { success: true, patient: newPatient };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const updateInventory = async (inventoryId, inventoryData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedInventory = {
        ...state.inventory.find(item => item.id === inventoryId),
        ...inventoryData,
        lastUpdated: new Date().toISOString(),
      };

      dispatch({ type: 'UPDATE_INVENTORY', payload: updatedInventory });
      return { success: true, inventory: updatedInventory };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const addPrescription = async (prescriptionData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPrescription = {
        id: Date.now(),
        ...prescriptionData,
        createdDate: new Date().toISOString(),
        status: 'active',
      };

      dispatch({ type: 'ADD_PRESCRIPTION', payload: newPrescription });
      return { success: true, prescription: newPrescription };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const syncHealthData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const updatedSync = {
        ...state.healthDataSync,
        lastSync: new Date().toISOString(),
        syncStatus: 'success',
        totalPatientsSynced: state.patients.length,
      };

      dispatch({ type: 'SET_HEALTH_DATA_SYNC', payload: updatedSync });
      return { success: true, syncData: updatedSync };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const trackCompliance = async (patientId, medicationId, adherenceData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newComplianceData = {
        id: Date.now(),
        patientId,
        medicationId,
        ...adherenceData,
        lastUpdated: new Date().toISOString(),
      };

      dispatch({ 
        type: 'SET_COMPLIANCE_DATA', 
        payload: [...state.complianceData, newComplianceData] 
      });

      return { success: true, compliance: newComplianceData };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const value = {
    ...state,
    loadPharmacyData,
    addPatient,
    updateInventory,
    addPrescription,
    syncHealthData,
    trackCompliance,
  };

  return (
    <PharmacyContext.Provider value={value}>
      {children}
    </PharmacyContext.Provider>
  );
};

export const usePharmacy = () => {
  const context = useContext(PharmacyContext);
  if (!context) {
    throw new Error('usePharmacy must be used within a PharmacyProvider');
  }
  return context;
};
