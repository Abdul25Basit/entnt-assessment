const STORAGE_KEYS = {
  users: 'dental_users',
  patients: 'dental_patients',
  incidents: 'dental_incidents',
};

// Initialize with sample data
const INITIAL_DATA = {
  users: [
    {
      id: "1",
      role: "Admin",
      email: "admin@entnt.in",
      password: "admin123",
      name: "Dr. Sarah Johnson"
    },
    {
      id: "2",
      role: "Patient",
      email: "john@entnt.in",
      password: "patient123",
      patientId: "p1",
      name: "John Doe"
    },
    {
      id: "3",
      role: "Patient",
      email: "jane@entnt.in",
      password: "patient123",
      patientId: "p2",
      name: "Jane Smith"
    }
  ],
  
  patients: [
    {
      id: "p1",
      name: "John Doe",
      dob: "1990-05-10",
      contact: "1234567890",
      email: "john@entnt.in",
      address: "123 Main St, Cityville, State 12345",
      healthInfo: "No allergies. Previous root canal treatment.",
      emergencyContact: "Jane Doe - 0987654321",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z"
    },
    {
      id: "p2",
      name: "Jane Smith",
      dob: "1985-08-22",
      contact: "9876543210",
      email: "jane@entnt.in",
      address: "456 Oak Ave, Townsburg, State 54321",
      healthInfo: "Allergic to penicillin. Regular cleanings.",
      emergencyContact: "Mike Smith - 1122334455",
      createdAt: "2024-01-20T14:30:00Z",
      updatedAt: "2024-01-20T14:30:00Z"
    },
    {
      id: "p3",
      name: "Michael Brown",
      dob: "1978-12-03",
      contact: "5551234567",
      email: "mike@example.com",
      address: "789 Pine Rd, Villageton, State 98765",
      healthInfo: "Diabetes - requires special care. Wears dentures.",
      emergencyContact: "Lisa Brown - 5559876543",
      createdAt: "2024-02-01T09:15:00Z",
      updatedAt: "2024-02-01T09:15:00Z"
    }
  ],
  
  incidents: [
    {
      id: "i1",
      patientId: "p1",
      title: "Routine Cleaning",
      description: "6-month routine dental cleaning and checkup",
      comments: "Patient has good oral hygiene. No issues found.",
      appointmentDate: "2025-01-15T10:00:00",
      cost: 120,
      treatment: "Professional cleaning, fluoride treatment",
      status: "Completed",
      nextDate: "2025-07-15T10:00:00",
      files: [
        {
          id: "f1",
          name: "treatment_summary.pdf",
          url: "data:text/plain;base64,VHJlYXRtZW50IFN1bW1hcnkgLSBSb3V0aW5lIENsZWFuaW5n",
          type: "application/pdf",
          size: 1024,
          uploadedAt: "2025-01-15T10:30:00Z"
        }
      ],
      createdAt: "2025-01-01T08:00:00Z",
      updatedAt: "2025-01-15T10:30:00Z"
    },
    {
      id: "i2",
      patientId: "p1",
      title: "Toothache Consultation",
      description: "Upper molar pain complaint",
      comments: "Sensitive to cold beverages. Pain level 6/10.",
      appointmentDate: "2025-01-25T14:00:00",
      cost: 80,
      treatment: "Examination, X-ray, pain medication prescribed",
      status: "Completed",
      nextDate: "2025-02-08T14:00:00",
      files: [
        {
          id: "f2",
          name: "xray_upper_molar.jpg",
          url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
          type: "image/jpeg",
          size: 2048,
          uploadedAt: "2025-01-25T14:30:00Z"
        }
      ],
      createdAt: "2025-01-20T09:00:00Z",
      updatedAt: "2025-01-25T14:30:00Z"
    },
    {
      id: "i3",
      patientId: "p2",
      title: "Dental Implant Consultation",
      description: "Consultation for missing tooth replacement",
      comments: "Patient interested in implant options. Good candidate.",
      appointmentDate: "2025-02-10T11:00:00",
      status: "Scheduled",
      files: [],
      createdAt: "2025-01-28T16:00:00Z",
      updatedAt: "2025-01-28T16:00:00Z"
    },
    {
      id: "i4",
      patientId: "p3",
      title: "Denture Adjustment",
      description: "Adjustment of upper denture for better fit",
      comments: "Patient reporting discomfort. Needs minor adjustment.",
      appointmentDate: "2025-02-05T09:30:00",
      cost: 60,
      treatment: "Denture realignment and cushioning",
      status: "In Progress",
      files: [],
      createdAt: "2025-01-30T12:00:00Z",
      updatedAt: "2025-02-01T09:00:00Z"
    }
  ]
};

export const initializeData = () => {
  Object.entries(INITIAL_DATA).forEach(([key, data]) => {
    const storageKey = STORAGE_KEYS[key];
    if (!localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, JSON.stringify(data));
    }
  });
};

export const getStoredData = (key) => {
  try {
    const storageKey = STORAGE_KEYS[key];
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error getting stored data for ${key}:`, error);
    return [];
  }
};

export const storeData = (key, data) => {
  try {
    const storageKey = STORAGE_KEYS[key];
    localStorage.setItem(storageKey, JSON.stringify(data));
  } catch (error) {
    console.error(`Error storing data for ${key}:`, error);
  }
};

export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
  localStorage.removeItem('currentUser');
};

// File utility functions
export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};