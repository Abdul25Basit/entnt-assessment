# Dental Center Management System

A comprehensive dental practice management system built with React and modern web technologies for ENTNT Technical Assignment.

## 🚀 Live Demo

**[View Live Application](https://entntassesment.netlify.app/dashboard)**

## 📋 Demo Credentials

### Admin Access
- **Email**: `admin@entnt.in`
- **Password**: `admin123`

### Patient Access
- **Email**: `john@entnt.in`
- **Password**: `patient123`

## ✨ Features

### 🏥 Admin Dashboard
- **Practice Overview**: Real-time metrics and key performance indicators
- **Patient Management**: Complete patient record system with search and filtering
- **Appointment Scheduling**: Interactive calendar with drag-and-drop functionality
- **Treatment Tracking**: Comprehensive treatment history and documentation
- **Revenue Analytics**: Financial insights and reporting

### 👤 Patient Portal
- **Personal Dashboard**: Personalized health overview
- **Appointment Management**: View and track upcoming appointments
- **Treatment History**: Access to complete medical records
- **Profile Management**: Update personal information and preferences

### 🎨 Design Features
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Accessibility**: WCAG compliant with keyboard navigation support
- **Dark Mode Ready**: Prepared for theme switching capabilities

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with Hooks
- **Build Tool**: Vite (Lightning-fast development)
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React (Beautiful, customizable icons)
- **Routing**: React Router DOM v6
- **State Management**: React Context API with useReducer
- **Data Persistence**: Local Storage (Production-ready for backend integration)
- **Type Safety**: JSDoc comments for better development experience

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dental-management-system.git
   cd dental-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth/              # Authentication components
│   ├── Dashboard/         # Admin & Patient dashboards
│   ├── Layout/           # Navigation, header, sidebar
│   ├── Patients/         # Patient management
│   ├── Appointments/     # Appointment system
│   ├── Calendar/         # Calendar views
│   └── UI/              # Reusable UI components
├── contexts/             # React Context providers
│   ├── AuthContext.jsx  # Authentication state
│   └── DataContext.jsx  # Application data management
├── utils/               # Utility functions
│   └── localStorage.js  # Data persistence layer
└── types/              # Type definitions and schemas
```

## 🔧 Key Implementation Details

### State Management
- **Context API**: Centralized state management for authentication and data
- **Local Storage**: Persistent data storage with automatic initialization
- **Optimistic Updates**: Immediate UI feedback with data synchronization

### Security Features
- **Role-based Access Control**: Separate admin and patient interfaces
- **Protected Routes**: Authentication-required page access
- **Input Validation**: Form validation and sanitization

### Performance Optimizations
- **Code Splitting**: Lazy loading for optimal bundle size
- **Memoization**: React.memo and useMemo for expensive operations
- **Efficient Rendering**: Optimized re-renders with proper dependency arrays

## 🎯 Business Logic

### Patient Management
- Complete CRUD operations for patient records
- Advanced search and filtering capabilities
- Health information tracking and emergency contacts

### Appointment System
- Multi-status appointment workflow (Scheduled → In Progress → Completed)
- Calendar integration with multiple view modes
- Automated scheduling conflict detection

### Treatment Documentation
- Comprehensive treatment history
- File attachment support with base64 encoding
- Cost tracking and revenue analytics

## 🔮 Future Enhancements

- **Backend Integration**: REST API with database persistence
- **Real-time Updates**: WebSocket integration for live updates
- **Advanced Analytics**: Detailed reporting and insights
- **Mobile App**: React Native companion application
- **Payment Integration**: Stripe/PayPal payment processing
- **Notification System**: Email/SMS appointment reminders

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🙏 Acknowledgments

- **ENTNT**: For providing the technical assignment opportunity
- **React Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide**: For the beautiful icon library

---

**Built with ❤️ for ENTNT Technical Assignment**
