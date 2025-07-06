import React from 'react';
import { 
  Calendar, 
  FileText, 
  Clock, 
  CheckCircle,
  DollarSign,
  Phone,
  MapPin,
  User
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../UI/Card';

const PatientDashboard = () => {
  const { patients, getPatientIncidents } = useData();
  const { user } = useAuth();
  
  const patient = patients.find(p => p.id === user?.patientId);
  const patientIncidents = patient ? getPatientIncidents(patient.id) : [];
  
  // Filter appointments
  const upcomingAppointments = patientIncidents
    .filter(i => new Date(i.appointmentDate) > new Date())
    .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime());
    
  const recentTreatments = patientIncidents
    .filter(i => i.status === 'Completed')
    .sort((a, b) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime())
    .slice(0, 3);

  const totalCost = patientIncidents
    .filter(i => i.status === 'Completed' && i.cost)
    .reduce((sum, i) => sum + (i.cost || 0), 0);

  if (!patient) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-800">Patient record not found. Please contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {patient.name}!
        </h1>
        <p className="text-primary-100 text-lg">
          Your dental health dashboard
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary-200" />
            <span className="text-primary-100">
              {upcomingAppointments.length} upcoming appointment{upcomingAppointments.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-primary-200" />
            <span className="text-primary-100">
              {recentTreatments.length} completed treatment{recentTreatments.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Next Appointment</p>
              {upcomingAppointments.length > 0 ? (
                <div className="mt-2">
                  <p className="text-lg font-bold text-gray-900">
                    {new Date(upcomingAppointments[0].appointmentDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(upcomingAppointments[0].appointmentDate).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              ) : (
                <p className="text-lg font-bold text-gray-900 mt-2">None scheduled</p>
              )}
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Treatments</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{patientIncidents.length}</p>
              <p className="text-sm text-green-600 mt-1">{recentTreatments.length} completed</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${totalCost}</p>
              <p className="text-sm text-gray-600 mt-1">All treatments</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
            <Calendar className="w-6 h-6 text-primary-500" />
          </div>
          
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => {
                const appointmentDate = new Date(appointment.appointmentDate);
                
                return (
                  <div key={appointment.id} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{appointment.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{appointment.description}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {appointmentDate.toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No upcoming appointments</p>
              <p className="text-sm mt-2">Contact us to schedule your next visit</p>
            </div>
          )}
        </Card>

        {/* Recent Treatments */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Treatments</h2>
            <CheckCircle className="w-6 h-6 text-primary-500" />
          </div>
          
          {recentTreatments.length > 0 ? (
            <div className="space-y-4">
              {recentTreatments.map((treatment) => (
                <div key={treatment.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{treatment.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{treatment.treatment}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm text-gray-500">
                          {new Date(treatment.appointmentDate).toLocaleDateString()}
                        </span>
                        {treatment.cost && (
                          <span className="text-sm font-medium text-green-600">
                            ${treatment.cost}
                          </span>
                        )}
                      </div>
                      {treatment.files && treatment.files.length > 0 && (
                        <div className="mt-2">
                          <span className="text-xs text-gray-500">
                            {treatment.files.length} file{treatment.files.length !== 1 ? 's' : ''} attached
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No treatments yet</p>
            </div>
          )}
        </Card>
      </div>

      {/* Patient Information */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">My Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <User className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Full Name</p>
                <p className="text-sm text-gray-600">{patient.name}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Date of Birth</p>
                <p className="text-sm text-gray-600">
                  {new Date(patient.dob).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Contact</p>
                <p className="text-sm text-gray-600">{patient.contact}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {patient.address && (
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Address</p>
                  <p className="text-sm text-gray-600">{patient.address}</p>
                </div>
              </div>
            )}

            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Health Information</p>
                <p className="text-sm text-gray-600">{patient.healthInfo}</p>
              </div>
            </div>

            {patient.emergencyContact && (
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Emergency Contact</p>
                  <p className="text-sm text-gray-600">{patient.emergencyContact}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PatientDashboard;