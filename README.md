# 🏥 CareSync – Healthcare Patient Portal

CareSync is a modern, production-oriented healthcare patient portal designed to provide patients with a secure and intuitive platform for managing their healthcare journey.

The portal allows patients to authenticate securely, access their dashboard, search for doctors, book and manage appointments, view medical records, and manage their profile.

---

## 🚀 Tech Stack

### Frontend

- **React 19** – Component-based UI development
- **Vite** – Fast development and optimized production builds
- **React Router v7** – Client-side routing and protected routes
- **TanStack React Query v5** – Server-state management, caching, retries, and data synchronization
- **Context API** – Global authentication state management
- **JavaScript (ES6+)**
- **HTML5**
- **CSS3**

### Development & Code Quality

- ESLint
- React Fast Refresh
- Functional React Components
- Custom React Hooks
- Responsive UI
- Accessibility-focused development

---

## ✨ Key Features

### 🔐 Authentication

- Patient registration
- Patient login
- Persistent authentication session
- Protected dashboard routes
- Automatic redirect for unauthenticated users
- Logout functionality
- Password visibility controls
- Form validation
- Google authentication support

> For production deployment, authentication should use secure httpOnly cookies and refresh-token based sessions.

---

### 📊 Patient Dashboard

The dashboard provides patients with a centralized overview of their healthcare activity.

Features include:

- Patient profile summary
- Upcoming appointments
- Appointment information
- Quick access to healthcare services
- Notification controls
- Navigation to appointments, doctors, medical records, and profile settings

---

### 👨‍⚕️ Doctor Search

Patients can search and filter available doctors using:

- Doctor name
- Medical specialty
- Location
- Availability
- Consultation fee
- Minimum rating

Additional functionality:

- Recommended doctor sorting
- Doctor rating information
- Clinic/location information
- Doctor specialty information

---

### 📅 Appointment Management

Patients can manage their appointments from a dedicated appointments dashboard.

Supported functionality includes:

- Book new appointments
- View upcoming appointments
- View past appointments
- View all appointments
- Appointment details
- Doctor information
- Specialty
- Date and time
- Clinic/location
- Appointment type
- Appointment notes
- Reschedule appointments
- Cancel appointments
- Booking confirmation feedback

---

### 🏥 Medical Records

The portal provides a dedicated area for managing patient medical information.

Medical records can include:

- Medical history
- Prescriptions
- Consultation information
- Previous healthcare records
- Treatment information

---

### 👤 Profile & Settings

Patients can manage their account information through the profile section.

The profile area is designed to provide access to:

- Patient information
- Account settings
- Profile details
- Authentication-related settings

---

## 🎨 UI/UX

CareSync follows a professional healthcare-focused visual design.

### Design Principles

- Clean and modern interface
- Healthcare-appropriate visual language
- Consistent spacing and typography
- Clear visual hierarchy
- Responsive layouts
- Accessible form controls
- Clear success and error states
- Reusable UI components
- Consistent buttons, cards, inputs, and modals

The application uses a combination of healthcare-oriented colors with a modern purple/blue interface to provide a trustworthy yet contemporary experience.

---

# 📁 Project Structure

The project follows a scalable structure designed to keep UI, business logic, API logic, and reusable components separated.

```text
src/
│
├── api/
│   ├── queries/
│   │   └── React Query GET hooks
│   │
│   ├── mutations/
│   │   └── React Query POST/PUT/DELETE hooks
│   │
│   └── mockApi.js
│
├── components/
│   ├── common/
│   │   ├── Button
│   │   ├── Card
│   │   ├── Modal
│   │   └── other reusable components
│   │
│   ├── appointments/
│   │   └── Appointment-related components
│   │
│   ├── doctors/
│   │   └── Doctor search and filtering components
│   │
│   └── records/
│       └── Medical record components
│
├── context/
│   ├── authContextCore.js
│   ├── AuthContext.jsx
│   └── useAuth.js
│
├── hooks/
│   ├── useDebounce.js
│   └── useLocalStorage.js
│
├── layouts/
│   └── DashboardLayout.jsx
│
├── pages/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── AppointmentsPage.jsx
│   ├── FindDoctorsPage.jsx
│   ├── MedicalRecordsPage.jsx
│   └── ProfilePage.jsx
│
├── utils/
│   ├── formatters.js
│   └── validators.js
│
├── App.jsx
├── main.jsx
└── App.css
