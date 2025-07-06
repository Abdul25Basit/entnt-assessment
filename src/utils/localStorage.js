const STORAGE_KEYS = {
  users: 'medicare_pro_users',
  patients: 'medicare_pro_patients', 
  incidents: 'medicare_pro_appointments',
};

// My custom initial data with Indian context
const INITIAL_DATA = {
  users: [
    {
      id: "1",
      role: "Admin",
      email: "admin@entnt.in",
      password: "admin123",
      name: "Dr. Priya Sharma"
    },
    {
      id: "2", 
      role: "Patient",
      email: "john@entnt.in",
      password: "patient123",
      patientId: "p1",
      name: "Rajesh Kumar"
    },
    {
      id: "3",
      role: "Patient", 
      email: "jane@entnt.in",
      password: "patient123",
      patientId: "p2",
      name: "Anita Desai"
    }
  ],
  
  patients: [
    {
      id: "p1",
      name: "Rajesh Kumar",
      dob: "1988-03-15",
      contact: "+91-9876543210",
      email: "john@entnt.in",
      address: "A-204, Sunrise Apartments, Sector 12, Noida, UP 201301",
      healthInfo: "No known allergies. Previous root canal on upper left molar. Regular smoker - advised to quit.",
      emergencyContact: "Sunita Kumar (Wife) - +91-9876543211",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z"
    },
    {
      id: "p2", 
      name: "Anita Desai",
      dob: "1992-07-08",
      contact: "+91-8765432109",
      email: "jane@entnt.in", 
      address: "B-45, Green Valley Society, Pune, Maharashtra 411028",
      healthInfo: "Allergic to Penicillin. Diabetes Type 2 - requires special care. Wears partial dentures.",
      emergencyContact: "Vikram Desai (Husband) - +91-8765432108",
      createdAt: "2024-01-20T14:30:00Z",
      updatedAt: "2024-01-20T14:30:00Z"
    },
    {
      id: "p3",
      name: "Arjun Patel", 
      dob: "1975-11-22",
      contact: "+91-7654321098",
      email: "arjun@example.com",
      address: "C-12, Shanti Nagar, Ahmedabad, Gujarat 380015",
      healthInfo: "Hypertension - on medication. Previous dental implant. Sensitive to cold foods.",
      emergencyContact: "Meera Patel (Wife) - +91-7654321097",
      createdAt: "2024-02-01T09:15:00Z", 
      updatedAt: "2024-02-01T09:15:00Z"
    },
    {
      id: "p4",
      name: "Kavya Reddy",
      dob: "1995-05-30", 
      contact: "+91-6543210987",
      email: "kavya@example.com",
      address: "D-78, Tech City, Hyderabad, Telangana 500032",
      healthInfo: "No major health issues. Orthodontic treatment completed last year. Regular checkups.",
      emergencyContact: "Ravi Reddy (Father) - +91-6543210986",
      createdAt: "2024-02-10T11:20:00Z",
      updatedAt: "2024-02-10T11:20:00Z"
    }
  ],
  
  incidents: [
    {
      id: "i1",
      patientId: "p1", 
      title: "Routine Dental Checkup",
      description: "6-month routine cleaning and oral health assessment",
      comments: "Patient maintains good oral hygiene. Slight plaque buildup on lower teeth. Advised to reduce smoking.",
      appointmentDate: "2025-01-15T10:30:00",
      cost: 1500, // INR
      treatment: "Professional scaling, polishing, fluoride treatment",
      status: "Completed",
      nextDate: "2025-07-15T10:30:00",
      files: [
        {
          id: "f1",
          name: "dental_report_rajesh.pdf",
          url: "data:text/plain;base64,RGVudGFsIFJlcG9ydCAtIFJhamVzaCBLdW1hciAtIFJvdXRpbmUgQ2hlY2t1cA==",
          type: "application/pdf", 
          size: 2048,
          uploadedAt: "2025-01-15T11:00:00Z"
        }
      ],
      createdAt: "2025-01-01T08:00:00Z",
      updatedAt: "2025-01-15T11:00:00Z"
    },
    {
      id: "i2",
      patientId: "p1",
      title: "Tooth Pain Consultation", 
      description: "Complaint of severe pain in upper right molar",
      comments: "Patient experiencing sharp pain when chewing. Possible cavity detected. X-ray recommended.",
      appointmentDate: "2025-01-28T15:00:00",
      cost: 800,
      treatment: "Clinical examination, digital X-ray, pain medication prescribed",
      status: "Completed", 
      nextDate: "2025-02-10T15:00:00",
      files: [
        {
          id: "f2",
          name: "xray_upper_right_molar.jpg",
          url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
          type: "image/jpeg",
          size: 3072,
          uploadedAt: "2025-01-28T15:30:00Z"
        }
      ],
      createdAt: "2025-01-25T09:00:00Z",
      updatedAt: "2025-01-28T15:30:00Z"
    },
    {
      id: "i3", 
      patientId: "p2",
      title: "Dental Implant Consultation",
      description: "Consultation for missing lower left premolar replacement",
      comments: "Patient is a good candidate for implant. Bone density adequate. Discussed procedure and costs.",
      appointmentDate: "2025-02-12T11:30:00",
      status: "Scheduled",
      files: [],
      createdAt: "2025-01-30T16:00:00Z",
      updatedAt: "2025-01-30T16:00:00Z"
    },
    {
      id: "i4",
      patientId: "p3", 
      title: "Denture Adjustment",
      description: "Upper denture causing discomfort and sore spots",
      comments: "Patient reporting pain while eating. Denture needs relining and adjustment for better fit.",
      appointmentDate: "2025-02-08T14:00:00",
      cost: 1200,
      treatment: "Denture relining, pressure spot adjustment, soft liner application",
      status: "In Progress",
      files: [],
      createdAt: "2025-02-01T12:00:00Z", 
      updatedAt: "2025-02-05T09:00:00Z"
    },
    {
      id: "i5",
      patientId: "p4",
      title: "Wisdom Tooth Extraction",
      description: "Impacted wisdom tooth causing pain and swelling",
      comments: "Lower right wisdom tooth is impacted. Surgical extraction recommended. Patient counseled about procedure.",
      appointmentDate: "2025-02-15T09:00:00", 
      status: "Scheduled",
      files: [],
      createdAt: "2025-02-02T10:30:00Z",
      updatedAt: "2025-02-02T10:30:00Z"
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
    console.error(`Error retrieving data for ${key}:`, error);
    return [];
  }
};

export const storeData = (key, data) => {
  try {
    const storageKey = STORAGE_KEYS[key];
    localStorage.setItem(storageKey, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data for ${key}:`, error);
  }
};

export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
  localStorage.removeItem('currentUser');
};

// File handling utilities
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

// Custom utility functions I added
export const generatePatientId = () => {
  return `p${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const formatIndianCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};

export const getTimeAgo = (date) => {
  const now = new Date();
  const diffInMs = now - new Date(date);
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday'; 
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return `${Math.floor(diffInDays / 30)} months ago`;
};
