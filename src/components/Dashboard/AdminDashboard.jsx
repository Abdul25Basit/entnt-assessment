import React from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../UI/Card';

const AdminDashboard = () => {
  const { getDashboardStats, patients, incidents } = useData();
  const { user } = useAuth();
  const stats = getDashboardStats();

  // Get recent appointments
  const recentAppointments = incidents
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Get upcoming appointments
  const upcomingAppointments = incidents
    .filter(i => new Date(i.appointmentDate) > new Date() && i.status === 'Scheduled')
    .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime())
    .slice(0, 5);

  const statCards = [
    {
      title: 'Total Patients',
      value: stats.totalPatients,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Today\'s Appointments',
      value: stats.todayAppointments,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '2 pending',
      changeType: 'neutral'
    },
    {
      title: 'Completed Treatments',
      value: stats.completedTreatments,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      change: '+15%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name || 'Doctor'}!
        </h1>
        <p className="text-primary-100 text-lg">
          Here's what's happening in your dental practice today
        </p>
        <div className="mt-6 flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-primary-200" />
            <span className="text-primary-100">
              {stats.upcomingAppointments} upcoming appointments
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary-200" />
            <span className="text-primary-100">
              {stats.totalAppointments} total appointments
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 
                    stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </span>
                  {stat.changeType === 'positive' && (
                    <TrendingUp className="w-4 h-4 text-green-600 ml-1" />
                  )}
                </div>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
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
                const patient = patients.find(p => p.id === appointment.patientId);
                const appointmentDate = new Date(appointment.appointmentDate);
                
                return (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{patient?.name}</h3>
                      <p className="text-sm text-gray-600">{appointment.title}</p>
                      <div className="flex items-center mt-1 space-x-4">
                        <span className="text-sm text-gray-500">
                          {appointmentDate.toLocaleDateString()}
                        </span>
                        <span className="text-sm text-gray-500">
                          {appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      appointment.status === 'Scheduled' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No upcoming appointments</p>
            </div>
          )}
        </Card>

        {/* Recent Activity */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <Activity className="w-6 h-6 text-primary-500" />
          </div>
          
          {recentAppointments.length > 0 ? (
            <div className="space-y-4">
              {recentAppointments.map((appointment) => {
                const patient = patients.find(p => p.id === appointment.patientId);
                
                return (
                  <div key={appointment.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      appointment.status === 'Completed' 
                        ? 'bg-green-100'
                        : appointment.status === 'In Progress'
                        ? 'bg-yellow-100'
                        : 'bg-blue-100'
                    }`}>
                      {appointment.status === 'Completed' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : appointment.status === 'In Progress' ? (
                        <Clock className="w-4 h-4 text-yellow-600" />
                      ) : (
                        <Calendar className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {appointment.title} - {patient?.name}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {appointment.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(appointment.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      appointment.status === 'Completed' 
                        ? 'bg-green-100 text-green-800'
                        : appointment.status === 'In Progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No recent activity</p>
            </div>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all">
            <Users className="w-8 h-8 text-primary-500 mb-2" />
            <span className="text-sm font-medium text-gray-700">Add Patient</span>
          </button>
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all">
            <Calendar className="w-8 h-8 text-primary-500 mb-2" />
            <span className="text-sm font-medium text-gray-700">Schedule Appointment</span>
          </button>
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all">
            <Activity className="w-8 h-8 text-primary-500 mb-2" />
            <span className="text-sm font-medium text-gray-700">View Reports</span>
          </button>
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all">
            <AlertTriangle className="w-8 h-8 text-primary-500 mb-2" />
            <span className="text-sm font-medium text-gray-700">Emergency</span>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;