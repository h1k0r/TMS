// Mock data for Teaching Management System

// Initialize mock data in localStorage if not present
function initializeMockData() {
    if (!localStorage.getItem('students')) {
        localStorage.setItem('students', JSON.stringify(getMockStudents()));
    }
    
    if (!localStorage.getItem('courses')) {
        localStorage.setItem('courses', JSON.stringify(getMockCourses()));
    }
    
    if (!localStorage.getItem('assignments')) {
        localStorage.setItem('assignments', JSON.stringify(getMockAssignments()));
    }
    
    if (!localStorage.getItem('attendance')) {
        localStorage.setItem('attendance', JSON.stringify(getMockAttendance()));
    }
    
    if (!localStorage.getItem('schedule')) {
        localStorage.setItem('schedule', JSON.stringify(getMockSchedule()));
    }
    
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(getMockUsers()));
    }
}

// Mock Students Data
function getMockStudents() {
    return [
        {
            studentId: 'BCA2021001',
            firstName: 'Amit',
            lastName: 'Kumar',
            email: 'amit.kumar@email.com',
            phone: '+91-9876543210',
            course: 'Data Structures',
            enrollmentDate: '2021-07-15',
            status: 'active',
            address: '123 College Street, New Delhi, India'
        },
        {
            studentId: 'BCA2021002',
            firstName: 'Priya',
            lastName: 'Sharma',
            email: 'priya.sharma@email.com',
            phone: '+91-9876543211',
            course: 'Database Management',
            enrollmentDate: '2021-07-15',
            status: 'active',
            address: '456 University Road, Mumbai, India'
        },
        {
            studentId: 'BCA2021003',
            firstName: 'Rahul',
            lastName: 'Gupta',
            email: 'rahul.gupta@email.com',
            phone: '+91-9876543212',
            course: 'Web Development',
            enrollmentDate: '2021-07-16',
            status: 'active',
            address: '789 Tech Plaza, Bangalore, India'
        },
        {
            studentId: 'BCA2021004',
            firstName: 'Sneha',
            lastName: 'Patel',
            email: 'sneha.patel@email.com',
            phone: '+91-9876543213',
            course: 'Data Structures',
            enrollmentDate: '2021-07-17',
            status: 'active',
            address: '321 Campus Drive, Pune, India'
        },
        {
            studentId: 'BCA2021005',
            firstName: 'Vikash',
            lastName: 'Singh',
            email: 'vikash.singh@email.com',
            phone: '+91-9876543214',
            course: 'Computer Networks',
            enrollmentDate: '2021-07-18',
            status: 'active',
            address: '654 Education Lane, Chennai, India'
        },
        {
            studentId: 'BCA2020001',
            firstName: 'Anita',
            lastName: 'Reddy',
            email: 'anita.reddy@email.com',
            phone: '+91-9876543215',
            course: 'Software Engineering',
            enrollmentDate: '2020-07-15',
            status: 'graduated',
            address: '987 Graduate Row, Hyderabad, India'
        },
        {
            studentId: 'BCA2021006',
            firstName: 'Rohit',
            lastName: 'Verma',
            email: 'rohit.verma@email.com',
            phone: '+91-9876543216',
            course: 'Database Management',
            enrollmentDate: '2021-07-20',
            status: 'inactive',
            address: '147 Student Street, Kolkata, India'
        },
        {
            studentId: 'BCA2021007',
            firstName: 'Kavya',
            lastName: 'Joshi',
            email: 'kavya.joshi@email.com',
            phone: '+91-9876543217',
            course: 'Web Development',
            enrollmentDate: '2021-07-21',
            status: 'active',
            address: '258 Learning Avenue, Jaipur, India'
        }
    ];
}

// Mock Courses Data
function getMockCourses() {
    return [
        {
            code: 'CS101',
            name: 'Data Structures',
            department: 'Computer Science',
            credits: 4,
            instructor: 'Dr. Rajesh Kumar',
            semester: '3',
            duration: 16,
            status: 'active',
            description: 'Introduction to fundamental data structures including arrays, linked lists, stacks, queues, trees, and graphs.',
            prerequisites: 'Programming Fundamentals, Mathematics'
        },
        {
            code: 'CS102',
            name: 'Database Management',
            department: 'Computer Science',
            credits: 4,
            instructor: 'Prof. Sunita Sharma',
            semester: '4',
            duration: 16,
            status: 'active',
            description: 'Comprehensive study of database design, normalization, SQL, and database administration.',
            prerequisites: 'Data Structures, Discrete Mathematics'
        },
        {
            code: 'CS103',
            name: 'Web Development',
            department: 'Information Technology',
            credits: 3,
            instructor: 'Mr. Arjun Patel',
            semester: '5',
            duration: 16,
            status: 'active',
            description: 'Modern web development using HTML5, CSS3, JavaScript, and popular frameworks.',
            prerequisites: 'Programming Fundamentals'
        },
        {
            code: 'CS104',
            name: 'Computer Networks',
            department: 'Computer Science',
            credits: 4,
            instructor: 'Dr. Pradeep Singh',
            semester: '5',
            duration: 16,
            status: 'active',
            description: 'Study of network protocols, architecture, security, and network administration.',
            prerequisites: 'Operating Systems, Computer Architecture'
        },
        {
            code: 'CS105',
            name: 'Software Engineering',
            department: 'Computer Science',
            credits: 4,
            instructor: 'Prof. Meera Gupta',
            semester: '6',
            duration: 16,
            status: 'active',
            description: 'Software development lifecycle, methodologies, testing, and project management.',
            prerequisites: 'Programming, Database Management'
        },
        {
            code: 'CS106',
            name: 'Operating Systems',
            department: 'Computer Science',
            credits: 4,
            instructor: 'Dr. Vikram Joshi',
            semester: '4',
            duration: 16,
            status: 'active',
            description: 'Process management, memory management, file systems, and system security.',
            prerequisites: 'Computer Architecture, C Programming'
        }
    ];
}

// Mock Assignments Data
function getMockAssignments() {
    return [
        {
            title: 'Binary Search Tree Implementation',
            course: 'Data Structures',
            dueDate: '2024-01-15T23:59',
            maxMarks: 100,
            type: 'project',
            difficulty: 'medium',
            description: 'Implement a complete binary search tree with insertion, deletion, and traversal operations.',
            instructions: 'Use any programming language of your choice. Include proper documentation and test cases.',
            allowLateSubmission: true,
            status: 'active',
            createdDate: '2024-01-01T10:00:00',
            submissions: []
        },
        {
            title: 'SQL Query Optimization',
            course: 'Database Management',
            dueDate: '2024-01-20T23:59',
            maxMarks: 75,
            type: 'homework',
            difficulty: 'hard',
            description: 'Optimize given SQL queries and explain the optimization techniques used.',
            instructions: 'Submit a report with original and optimized queries along with execution plans.',
            allowLateSubmission: false,
            status: 'active',
            createdDate: '2024-01-05T14:30:00',
            submissions: []
        },
        {
            title: 'Responsive Website Design',
            course: 'Web Development',
            dueDate: '2024-01-25T23:59',
            maxMarks: 150,
            type: 'project',
            difficulty: 'medium',
            description: 'Create a fully responsive website for a fictional business using modern web technologies.',
            instructions: 'Use HTML5, CSS3, and JavaScript. Ensure mobile-first design approach.',
            allowLateSubmission: true,
            status: 'active',
            createdDate: '2024-01-10T09:15:00',
            submissions: []
        },
        {
            title: 'Network Protocol Analysis',
            course: 'Computer Networks',
            dueDate: '2024-01-30T23:59',
            maxMarks: 80,
            type: 'lab',
            difficulty: 'hard',
            description: 'Analyze network traffic using Wireshark and identify different protocols.',
            instructions: 'Capture network packets and create a detailed analysis report.',
            allowLateSubmission: false,
            status: 'active',
            createdDate: '2024-01-12T11:00:00',
            submissions: []
        },
        {
            title: 'Midterm Quiz - Data Structures',
            course: 'Data Structures',
            dueDate: '2024-01-18T15:00',
            maxMarks: 50,
            type: 'quiz',
            difficulty: 'medium',
            description: 'Online quiz covering arrays, linked lists, stacks, and queues.',
            instructions: 'Complete within 60 minutes. No external resources allowed.',
            allowLateSubmission: false,
            status: 'active',
            createdDate: '2024-01-08T16:00:00',
            submissions: []
        }
    ];
}

// Mock Attendance Data
function getMockAttendance() {
    const students = getMockStudents();
    const courses = getMockCourses();
    const attendance = [];
    
    // Generate attendance for the last 30 days
    for (let day = 0; day < 30; day++) {
        const date = new Date();
        date.setDate(date.getDate() - day);
        const dateString = date.toISOString().split('T')[0];
        
        // Skip weekends
        if (date.getDay() === 0 || date.getDay() === 6) continue;
        
        courses.forEach(course => {
            students.filter(student => student.course === course.name).forEach(student => {
                // 85% attendance rate on average
                const isPresent = Math.random() > 0.15;
                
                attendance.push({
                    date: dateString,
                    course: course.name,
                    studentId: student.studentId,
                    studentName: `${student.firstName} ${student.lastName}`,
                    present: isPresent,
                    time: isPresent ? `${8 + Math.floor(Math.random() * 8)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : null
                });
            });
        });
    }
    
    return attendance;
}

// Mock Schedule Data
function getMockSchedule() {
    return [
        {
            course: 'Data Structures',
            instructor: 'Dr. Rajesh Kumar',
            day: 'monday',
            room: 'CS-101',
            startTime: '09:00',
            endTime: '10:30',
            type: 'lecture',
            capacity: 60,
            notes: 'Bring your laptops for hands-on coding',
            recurring: true
        },
        {
            course: 'Data Structures',
            instructor: 'Dr. Rajesh Kumar',
            day: 'wednesday',
            room: 'CS-Lab-1',
            startTime: '14:00',
            endTime: '16:00',
            type: 'lab',
            capacity: 30,
            notes: 'Lab session for practical implementation',
            recurring: true
        },
        {
            course: 'Database Management',
            instructor: 'Prof. Sunita Sharma',
            day: 'tuesday',
            room: 'CS-102',
            startTime: '10:00',
            endTime: '11:30',
            type: 'lecture',
            capacity: 60,
            notes: 'SQL practice session',
            recurring: true
        },
        {
            course: 'Database Management',
            instructor: 'Prof. Sunita Sharma',
            day: 'thursday',
            room: 'CS-Lab-2',
            startTime: '15:00',
            endTime: '17:00',
            type: 'lab',
            capacity: 30,
            notes: 'Database design workshop',
            recurring: true
        },
        {
            course: 'Web Development',
            instructor: 'Mr. Arjun Patel',
            day: 'monday',
            room: 'IT-201',
            startTime: '11:00',
            endTime: '12:30',
            type: 'lecture',
            capacity: 50,
            notes: 'Frontend development basics',
            recurring: true
        },
        {
            course: 'Web Development',
            instructor: 'Mr. Arjun Patel',
            day: 'friday',
            room: 'IT-Lab-1',
            startTime: '13:00',
            endTime: '15:00',
            type: 'lab',
            capacity: 25,
            notes: 'Responsive design practice',
            recurring: true
        },
        {
            course: 'Computer Networks',
            instructor: 'Dr. Pradeep Singh',
            day: 'tuesday',
            room: 'CS-103',
            startTime: '13:00',
            endTime: '14:30',
            type: 'lecture',
            capacity: 55,
            notes: 'Network protocols overview',
            recurring: true
        },
        {
            course: 'Computer Networks',
            instructor: 'Dr. Pradeep Singh',
            day: 'friday',
            room: 'Network-Lab',
            startTime: '10:00',
            endTime: '12:00',
            type: 'lab',
            capacity: 20,
            notes: 'Wireshark lab session',
            recurring: true
        },
        {
            course: 'Software Engineering',
            instructor: 'Prof. Meera Gupta',
            day: 'wednesday',
            room: 'CS-104',
            startTime: '10:00',
            endTime: '11:30',
            type: 'lecture',
            capacity: 60,
            notes: 'SDLC methodologies',
            recurring: true
        },
        {
            course: 'Operating Systems',
            instructor: 'Dr. Vikram Joshi',
            day: 'thursday',
            room: 'CS-105',
            startTime: '09:00',
            endTime: '10:30',
            type: 'lecture',
            capacity: 55,
            notes: 'Process synchronization',
            recurring: true
        }
    ];
}

// Mock Users Data for Authentication
function getMockUsers() {
    return [
        {
            id: 1,
            username: 'admin',
            password: 'admin123', // In real app, this would be hashed
            email: 'admin@tms.edu',
            role: 'admin',
            fullName: 'System Administrator',
            lastLogin: null
        },
        {
            id: 2,
            username: 'teacher',
            password: 'teacher123',
            email: 'teacher@tms.edu',
            role: 'teacher',
            fullName: 'Dr. Rajesh Kumar',
            lastLogin: null
        },
        {
            id: 3,
            username: 'student',
            password: 'student123',
            email: 'student@tms.edu',
            role: 'student',
            fullName: 'Amit Kumar',
            lastLogin: null
        }
    ];
}

// Data access functions
function getStudents() {
    return JSON.parse(localStorage.getItem('students')) || [];
}

function getCourses() {
    return JSON.parse(localStorage.getItem('courses')) || [];
}

function getAssignments() {
    return JSON.parse(localStorage.getItem('assignments')) || [];
}

function getAttendance() {
    return JSON.parse(localStorage.getItem('attendance')) || [];
}

function getSchedule() {
    return JSON.parse(localStorage.getItem('schedule')) || [];
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Initialize mock data when the script loads
initializeMockData();

// SQL equivalents for future MySQL integration (commented)
/*
-- Students table equivalent
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    course_id INT,
    enrollment_date DATE,
    status ENUM('active', 'inactive', 'graduated') DEFAULT 'active',
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Courses table equivalent
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    credits INT,
    instructor VARCHAR(100),
    semester VARCHAR(10),
    duration INT,
    status ENUM('active', 'inactive', 'completed') DEFAULT 'active',
    description TEXT,
    prerequisites TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Assignments table equivalent
CREATE TABLE assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    course_id INT,
    due_date DATETIME,
    max_marks INT,
    type ENUM('homework', 'project', 'quiz', 'exam', 'lab'),
    difficulty ENUM('easy', 'medium', 'hard'),
    description TEXT,
    instructions TEXT,
    allow_late_submission BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Attendance table equivalent
CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    date DATE,
    present BOOLEAN,
    time TIME,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE KEY unique_attendance (student_id, course_id, date)
);

-- Schedule table equivalent
CREATE TABLE schedule (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    instructor VARCHAR(100),
    day_of_week ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'),
    room VARCHAR(50),
    start_time TIME,
    end_time TIME,
    type ENUM('lecture', 'lab', 'tutorial', 'seminar'),
    capacity INT,
    notes TEXT,
    recurring BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Users table equivalent
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('admin', 'teacher', 'student') NOT NULL,
    full_name VARCHAR(100),
    last_login TIMESTAMP NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
*/
