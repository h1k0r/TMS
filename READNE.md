# Teaching Management System (TMS)

## Overview

The Teaching Management System is a web-based educational platform designed for managing students, courses, assignments, attendance, and academic activities. Built as a BCA project, it provides a comprehensive dashboard for administrators, teachers, and students to handle various academic operations efficiently.

## System Architecture

### Frontend Architecture
- **Technology Stack**: HTML5, CSS3, JavaScript (Vanilla)
- **UI Framework**: Bootstrap 5 with dark theme support
- **Icons**: Font Awesome 6.0
- **Charts**: Chart.js for data visualization
- **Architecture Pattern**: Multi-page application (MPA) with client-side routing
- **Responsive Design**: Mobile-first approach with Bootstrap grid system

### Backend Architecture
- **Data Storage**: Browser localStorage (mock data simulation)
- **Authentication**: Client-side session management
- **API Simulation**: JavaScript modules for data operations
- **State Management**: Global JavaScript objects and localStorage persistence

## Key Components

### 1. Authentication System (`js/auth.js`)
- Role-based login (Administrator, Teacher, Student)
- Session management with localStorage
- User credential validation
- Automatic redirect after successful authentication

### 2. Data Management (`js/mockData.js`)
- Mock data initialization for all entities
- Student records management
- Course information handling
- Assignment and attendance tracking
- Schedule management
- User account management

### 3. Core Application (`js/main.js`)
- Application initialization
- Global alert notification system
- Form validation utilities
- Mobile sidebar functionality
- Bootstrap component initialization

### 4. User Interface Pages
- **Landing Page** (`index.html`): Hero section with system overview
- **Login Page** (`login.html`): Authentication interface
- **Dashboard** (`dashboard.html`): Main overview with charts and statistics
- **Students Management** (`students.html`): Student records and operations
- **Courses Management** (`courses.html`): Course information and enrollment
- **Assignments** (`assignments.html`): Assignment creation and tracking
- **Attendance** (`attendance.html`): Attendance marking and reports
- **Schedule** (`schedule.html`): Class scheduling and calendar
- **Reports** (`reports.html`): Analytics and reporting dashboard

### 5. Styling System (`css/styles.css`)
- Custom CSS variables for theming
- Sidebar navigation styling
- Dark theme customizations
- Responsive layout adjustments

## Data Flow

1. **Authentication Flow**:
   - User selects role and enters credentials
   - System validates against mock user database
   - Successful login stores user session in localStorage
   - User is redirected to appropriate dashboard

2. **Data Operations**:
   - All data stored in browser localStorage
   - CRUD operations simulated through JavaScript functions
   - Real-time updates reflected in UI components
   - Data persistence across browser sessions

3. **Navigation Flow**:
   - Role-based sidebar navigation
   - Dynamic content loading based on user permissions
   - Breadcrumb navigation for complex workflows

## External Dependencies

### CDN Dependencies
- **Bootstrap 5**: UI framework and components
- **Font Awesome 6.0**: Icon library
- **Chart.js**: Data visualization and charting
- **Bootstrap Dark Theme**: Custom dark theme styling

### Browser APIs
- **localStorage**: Client-side data persistence
- **DOM API**: Dynamic content manipulation
- **History API**: Navigation management

## Deployment Strategy

### Current Setup
- **Static Hosting**: Pure frontend application suitable for any web server
- **No Backend Required**: All functionality runs client-side
- **Cross-Platform**: Compatible with all modern browsers
- **Mobile Responsive**: Progressive web app characteristics

### Scalability Considerations
- Ready for backend integration (REST APIs)
- Database schema designed for easy migration
- Modular architecture supports microservices transition
- Authentication system prepared for JWT/OAuth integration

## Changelog

```
Changelog:
- June 28, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```