import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { DataProvider } from './contexts/DataContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Layout from './components/Layout/Layout.jsx';
import Login from './components/Auth/Login.jsx';
import AdminDashboard from './components/Dashboard/AdminDashboard.jsx';
import PatientDashboard from './components/Dashboard/PatientDashboard.jsx';
import PatientList from './components/Patients/PatientList.jsx';
import AppointmentList from './components/Appointments/AppointmentList.jsx';
import CalendarView from './components/Calendar/CalendarView.jsx';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              {/* Default redirect based on role - handled by ProtectedRoute */}
              <Route index element={<Navigate to="/dashboard" replace />} />
              
              {/* Admin Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute requiredRole="Admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/patients" element={
                <ProtectedRoute requiredRole="Admin">
                  <PatientList />
                </ProtectedRoute>
              } />
              <Route path="/appointments" element={
                <ProtectedRoute requiredRole="Admin">
                  <AppointmentList />
                </ProtectedRoute>
              } />
              <Route path="/calendar" element={
                <ProtectedRoute requiredRole="Admin">
                  <CalendarView />
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute requiredRole="Admin">
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Reports</h2>
                    <p className="text-gray-600">Reports feature coming soon...</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute requiredRole="Admin">
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
                    <p className="text-gray-600">Settings feature coming soon...</p>
                  </div>
                </ProtectedRoute>
              } />

              {/* Patient Routes */}
              <Route path="/patient-dashboard" element={
                <ProtectedRoute requiredRole="Patient">
                  <PatientDashboard />
                </ProtectedRoute>
              } />
              <Route path="/my-appointments" element={
                <ProtectedRoute requiredRole="Patient">
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">My Appointments</h2>
                    <p className="text-gray-600">Detailed appointments view coming soon...</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/treatment-history" element={
                <ProtectedRoute requiredRole="Patient">
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Treatment History</h2>
                    <p className="text-gray-600">Treatment history feature coming soon...</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute requiredRole="Patient">
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">My Profile</h2>
                    <p className="text-gray-600">Profile management coming soon...</p>
                  </div>
                </ProtectedRoute>
              } />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;