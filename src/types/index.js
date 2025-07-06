// Type definitions for reference (not enforced in JavaScript)

// User
// {
//   id: string,
//   role: 'Admin' | 'Patient',
//   email: string,
//   password: string,
//   patientId?: string,
//   name?: string
// }

// Patient
// {
//   id: string,
//   name: string,
//   dob: string,
//   contact: string,
//   email?: string,
//   address?: string,
//   healthInfo: string,
//   emergencyContact?: string,
//   createdAt: string,
//   updatedAt: string
// }

// Incident
// {
//   id: string,
//   patientId: string,
//   title: string,
//   description: string,
//   comments: string,
//   appointmentDate: string,
//   cost?: number,
//   treatment?: string,
//   status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled',
//   nextDate?: string,
//   files: FileAttachment[],
//   createdAt: string,
//   updatedAt: string
// }

// FileAttachment
// {
//   id: string,
//   name: string,
//   url: string,
//   type: string,
//   size: number,
//   uploadedAt: string
// }

// DashboardStats
// {
//   totalPatients: number,
//   totalAppointments: number,
//   completedTreatments: number,
//   totalRevenue: number,
//   todayAppointments: number,
//   upcomingAppointments: number
// }

// CalendarEvent
// {
//   id: string,
//   title: string,
//   date: string,
//   time: string,
//   patientName: string,
//   status: string,
//   type: 'appointment' | 'follow-up'
// }