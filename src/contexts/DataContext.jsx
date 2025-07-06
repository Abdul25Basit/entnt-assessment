import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getStoredData, storeData, initializeData } from '../utils/localStorage';

const initialState = {
  patients: [],
  incidents: [],
  loading: true,
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PATIENTS':
      return { ...state, patients: action.payload };
    case 'ADD_PATIENT':
      return { ...state, patients: [...state.patients, action.payload] };
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: state.patients.map(p => p.id === action.payload.id ? action.payload : p)
      };
    case 'DELETE_PATIENT':
      return {
        ...state,
        patients: state.patients.filter(p => p.id !== action.payload)
      };
    case 'SET_INCIDENTS':
      return { ...state, incidents: action.payload };
    case 'ADD_INCIDENT':
      return { ...state, incidents: [...state.incidents, action.payload] };
    case 'UPDATE_INCIDENT':
      return {
        ...state,
        incidents: state.incidents.map(i => i.id === action.payload.id ? action.payload : i)
      };
    case 'DELETE_INCIDENT':
      return {
        ...state,
        incidents: state.incidents.filter(i => i.id !== action.payload)
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const DataContext = createContext(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    // Initialize data and load from localStorage
    initializeData();
    const patients = getStoredData('patients');
    const incidents = getStoredData('incidents');
    
    dispatch({ type: 'SET_PATIENTS', payload: patients });
    dispatch({ type: 'SET_INCIDENTS', payload: incidents });
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  const addPatient = (patientData) => {
    const newPatient = {
      ...patientData,
      id: `p${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedPatients = [...state.patients, newPatient];
    storeData('patients', updatedPatients);
    dispatch({ type: 'ADD_PATIENT', payload: newPatient });
  };

  const updatePatient = (patient) => {
    const updatedPatient = { ...patient, updatedAt: new Date().toISOString() };
    const updatedPatients = state.patients.map(p => p.id === patient.id ? updatedPatient : p);
    storeData('patients', updatedPatients);
    dispatch({ type: 'UPDATE_PATIENT', payload: updatedPatient });
  };

  const deletePatient = (id) => {
    const updatedPatients = state.patients.filter(p => p.id !== id);
    const updatedIncidents = state.incidents.filter(i => i.patientId !== id);
    
    storeData('patients', updatedPatients);
    storeData('incidents', updatedIncidents);
    
    dispatch({ type: 'DELETE_PATIENT', payload: id });
    dispatch({ type: 'SET_INCIDENTS', payload: updatedIncidents });
  };

  const addIncident = (incidentData) => {
    const newIncident = {
      ...incidentData,
      id: `i${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedIncidents = [...state.incidents, newIncident];
    storeData('incidents', updatedIncidents);
    dispatch({ type: 'ADD_INCIDENT', payload: newIncident });
  };

  const updateIncident = (incident) => {
    const updatedIncident = { ...incident, updatedAt: new Date().toISOString() };
    const updatedIncidents = state.incidents.map(i => i.id === incident.id ? updatedIncident : i);
    storeData('incidents', updatedIncidents);
    dispatch({ type: 'UPDATE_INCIDENT', payload: updatedIncident });
  };

  const deleteIncident = (id) => {
    const updatedIncidents = state.incidents.filter(i => i.id !== id);
    storeData('incidents', updatedIncidents);
    dispatch({ type: 'DELETE_INCIDENT', payload: id });
  };

  const getDashboardStats = () => {
    const today = new Date().toDateString();
    const totalRevenue = state.incidents
      .filter(i => i.status === 'Completed' && i.cost)
      .reduce((sum, i) => sum + (i.cost || 0), 0);

    return {
      totalPatients: state.patients.length,
      totalAppointments: state.incidents.length,
      completedTreatments: state.incidents.filter(i => i.status === 'Completed').length,
      totalRevenue,
      todayAppointments: state.incidents.filter(i => 
        new Date(i.appointmentDate).toDateString() === today
      ).length,
      upcomingAppointments: state.incidents.filter(i => 
        new Date(i.appointmentDate) > new Date() && i.status === 'Scheduled'
      ).length,
    };
  };

  const getPatientIncidents = (patientId) => {
    return state.incidents.filter(i => i.patientId === patientId);
  };

  return (
    <DataContext.Provider value={{
      ...state,
      addPatient,
      updatePatient,
      deletePatient,
      addIncident,
      updateIncident,
      deleteIncident,
      getDashboardStats,
      getPatientIncidents,
    }}>
      {children}
    </DataContext.Provider>
  );
};