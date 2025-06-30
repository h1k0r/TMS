-- Teaching Management System Database Schema
-- For XAMPP MySQL Integration
-- Created: 2025
-- Team: TUNU KUMAR, PUSHKAR KUMAR, RITESH KUMAR, CHITRANJAN KUMAR, SHUBHAM KUMAR

-- Create database
CREATE DATABASE IF NOT EXISTS teaching_management_system;
USE teaching_management_system;

-- Set charset
SET charset utf8mb4;
SET collation_connection = utf8mb4_unicode_ci;

-- Users table for authentication
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL COMMENT 'Use password_hash() function',
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('admin', 'teacher', 'student') NOT NULL,
    full_name VARCHAR(100),
    last_login TIMESTAMP NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB COMMENT='User authentication and authorization';

-- Departments table
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    head_of_department VARCHAR(100),
    description TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_code (code)
) ENGINE=InnoDB COMMENT='Academic departments';

-- Courses table
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    department_id INT,
    credits INT NOT NULL CHECK (credits > 0 AND credits <= 10),
    instructor VARCHAR(100),
    semester VARCHAR(10),
    duration INT NOT NULL COMMENT 'Duration in weeks',
    status ENUM('active', 'inactive', 'completed') DEFAULT 'active',
    description TEXT,
    prerequisites TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    INDEX idx_code (code),
    INDEX idx_name (name),
    INDEX idx_status (status),
    INDEX idx_semester (semester)
) ENGINE=InnoDB COMMENT='Academic courses';

-- Students table
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(20) UNIQUE NOT NULL,
    user_id INT UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    date_of_birth DATE,
    enrollment_date DATE NOT NULL,
    status ENUM('active', 'inactive', 'graduated', 'dropped') DEFAULT 'active',
    address TEXT,
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_student_id (student_id),
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_enrollment_date (enrollment_date)
) ENGINE=InnoDB COMMENT='Student information';

-- Student course enrollments
CREATE TABLE student_enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date DATE NOT NULL,
    completion_date DATE NULL,
    grade VARCHAR(5),
    status ENUM('enrolled', 'completed', 'dropped', 'failed') DEFAULT 'enrolled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (student_id, course_id),
    INDEX idx_status (status),
    INDEX idx_enrollment_date (enrollment_date)
) ENGINE=InnoDB COMMENT='Student course enrollments';

-- Teachers table
CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id VARCHAR(20) UNIQUE NOT NULL,
    user_id INT UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    department_id INT,
    designation VARCHAR(50),
    qualification VARCHAR(200),
    experience_years INT DEFAULT 0,
    hire_date DATE,
    status ENUM('active', 'inactive', 'retired') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    INDEX idx_teacher_id (teacher_id),
    INDEX idx_email (email),
    INDEX idx_status (status)
) ENGINE=InnoDB COMMENT='Teacher information';

-- Assignments table
CREATE TABLE assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    course_id INT NOT NULL,
    teacher_id INT,
    due_date DATETIME NOT NULL,
    max_marks INT NOT NULL CHECK (max_marks > 0),
    type ENUM('homework', 'project', 'quiz', 'exam', 'lab') NOT NULL,
    difficulty ENUM('easy', 'medium', 'hard') NOT NULL,
    description TEXT NOT NULL,
    instructions TEXT,
    allow_late_submission BOOLEAN DEFAULT FALSE,
    late_penalty_percent DECIMAL(5,2) DEFAULT 0.00,
    status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE SET NULL,
    INDEX idx_due_date (due_date),
    INDEX idx_status (status),
    INDEX idx_type (type)
) ENGINE=InnoDB COMMENT='Course assignments';

-- Assignment submissions
CREATE TABLE assignment_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    assignment_id INT NOT NULL,
    student_id INT NOT NULL,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    submission_text TEXT,
    file_path VARCHAR(500),
    marks_obtained DECIMAL(5,2) NULL,
    feedback TEXT,
    status ENUM('submitted', 'graded', 'late', 'missing') DEFAULT 'submitted',
    graded_by INT,
    graded_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (graded_by) REFERENCES teachers(id) ON DELETE SET NULL,
    UNIQUE KEY unique_submission (assignment_id, student_id),
    INDEX idx_submission_date (submission_date),
    INDEX idx_status (status)
) ENGINE=InnoDB COMMENT='Student assignment submissions';

-- Attendance table
CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    date DATE NOT NULL,
    present BOOLEAN NOT NULL DEFAULT FALSE,
    time TIME NULL,
    notes TEXT,
    marked_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (marked_by) REFERENCES teachers(id) ON DELETE SET NULL,
    UNIQUE KEY unique_attendance (student_id, course_id, date),
    INDEX idx_date (date),
    INDEX idx_present (present)
) ENGINE=InnoDB COMMENT='Student attendance records';

-- Class schedule table
CREATE TABLE schedule (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    teacher_id INT,
    day_of_week ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday') NOT NULL,
    room VARCHAR(50) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    type ENUM('lecture', 'lab', 'tutorial', 'seminar') NOT NULL,
    capacity INT NOT NULL CHECK (capacity > 0),
    notes TEXT,
    recurring BOOLEAN DEFAULT TRUE,
    active BOOLEAN DEFAULT TRUE,
    effective_from DATE,
    effective_to DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE SET NULL,
    INDEX idx_day_time (day_of_week, start_time),
    INDEX idx_room (room),
    INDEX idx_active (active),
    CONSTRAINT chk_time_order CHECK (start_time < end_time)
) ENGINE=InnoDB COMMENT='Class schedules';

-- Grades table
CREATE TABLE grades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    assignment_id INT NULL,
    grade_type ENUM('assignment', 'quiz', 'midterm', 'final', 'project', 'overall') NOT NULL,
    marks_obtained DECIMAL(5,2) NOT NULL,
    max_marks DECIMAL(5,2) NOT NULL,
    percentage DECIMAL(5,2) GENERATED ALWAYS AS ((marks_obtained / max_marks) * 100) STORED,
    letter_grade VARCHAR(5),
    remarks TEXT,
    graded_by INT,
    graded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE SET NULL,
    FOREIGN KEY (graded_by) REFERENCES teachers(id) ON DELETE SET NULL,
    INDEX idx_grade_type (grade_type),
    INDEX idx_percentage (percentage),
    INDEX idx_graded_at (graded_at)
) ENGINE=InnoDB COMMENT='Student grades and assessments';

-- User activity log
CREATE TABLE user_activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action VARCHAR(100) NOT NULL,
    details TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_action (user_id, action),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB COMMENT='User activity tracking';

-- Notifications table
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
    read_status BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_read (user_id, read_status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB COMMENT='User notifications';

-- System settings table
CREATE TABLE system_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    updated_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_key (setting_key)
) ENGINE=InnoDB COMMENT='System configuration settings';

-- Insert default departments
INSERT INTO departments (name, code, head_of_department, description) VALUES
('Computer Science', 'CS', 'Dr. Rajesh Kumar', 'Computer Science and Programming'),
('Information Technology', 'IT', 'Prof. Sunita Sharma', 'Information Technology and Systems'),
('Electronics', 'EC', 'Dr. Pradeep Singh', 'Electronics and Communication'),
('Mathematics', 'MATH', 'Prof. Meera Gupta', 'Mathematics and Statistics');

-- Insert default admin user (password should be hashed in real implementation)
INSERT INTO users (username, password_hash, email, role, full_name) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@tms.edu', 'admin', 'System Administrator');

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('system_name', 'Teaching Management System', 'Name of the system'),
('academic_year', '2024-2025', 'Current academic year'),
('semester', 'Spring 2025', 'Current semester'),
('attendance_threshold', '75', 'Minimum attendance percentage required'),
('max_login_attempts', '3', 'Maximum failed login attempts before lockout'),
('session_timeout', '30', 'Session timeout in minutes');

-- Create views for common queries

-- Student enrollment summary view
CREATE VIEW student_enrollment_summary AS
SELECT 
    s.id,
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS full_name,
    s.email,
    s.status,
    COUNT(se.course_id) AS enrolled_courses,
    s.enrollment_date
FROM students s
LEFT JOIN student_enrollments se ON s.id = se.student_id AND se.status = 'enrolled'
GROUP BY s.id;

-- Course statistics view
CREATE VIEW course_statistics AS
SELECT 
    c.id,
    c.code,
    c.name,
    c.instructor,
    COUNT(DISTINCT se.student_id) AS enrolled_students,
    COUNT(DISTINCT a.id) AS total_assignments,
    AVG(att.present) * 100 AS average_attendance
FROM courses c
LEFT JOIN student_enrollments se ON c.id = se.course_id AND se.status = 'enrolled'
LEFT JOIN assignments a ON c.id = a.course_id AND a.status = 'active'
LEFT JOIN attendance att ON c.id = att.course_id
GROUP BY c.id;

-- Assignment completion view
CREATE VIEW assignment_completion AS
SELECT 
    a.id,
    a.title,
    c.name AS course_name,
    a.due_date,
    COUNT(DISTINCT se.student_id) AS total_students,
    COUNT(DISTINCT asub.student_id) AS submitted_students,
    (COUNT(DISTINCT asub.student_id) / COUNT(DISTINCT se.student_id)) * 100 AS completion_percentage
FROM assignments a
JOIN courses c ON a.course_id = c.id
LEFT JOIN student_enrollments se ON c.id = se.course_id AND se.status = 'enrolled'
LEFT JOIN assignment_submissions asub ON a.id = asub.assignment_id
WHERE a.status = 'active'
GROUP BY a.id;

-- Create stored procedures for common operations

DELIMITER //

-- Procedure to calculate student GPA
CREATE PROCEDURE CalculateStudentGPA(IN student_id INT, OUT gpa DECIMAL(3,2))
BEGIN
    DECLARE total_points DECIMAL(10,2) DEFAULT 0;
    DECLARE total_credits INT DEFAULT 0;
    
    SELECT 
        SUM(g.percentage * c.credits) / 100,
        SUM(c.credits)
    INTO total_points, total_credits
    FROM grades g
    JOIN courses c ON g.course_id = c.id
    WHERE g.student_id = student_id 
    AND g.grade_type = 'overall';
    
    IF total_credits > 0 THEN
        SET gpa = total_points / total_credits;
    ELSE
        SET gpa = 0.00;
    END IF;
END //

-- Procedure to mark attendance for a class
CREATE PROCEDURE MarkClassAttendance(
    IN p_course_id INT,
    IN p_date DATE,
    IN p_marked_by INT
)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_student_id INT;
    
    DECLARE student_cursor CURSOR FOR
        SELECT s.id 
        FROM students s
        JOIN student_enrollments se ON s.id = se.student_id
        WHERE se.course_id = p_course_id 
        AND se.status = 'enrolled'
        AND s.status = 'active';
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN student_cursor;
    
    student_loop: LOOP
        FETCH student_cursor INTO v_student_id;
        IF done THEN
            LEAVE student_loop;
        END IF;
        
        INSERT IGNORE INTO attendance (student_id, course_id, date, present, marked_by)
        VALUES (v_student_id, p_course_id, p_date, FALSE, p_marked_by);
    END LOOP;
    
    CLOSE student_cursor;
END //

DELIMITER ;

-- Create triggers for data integrity

DELIMITER //

-- Trigger to update student enrollment status when course is completed
CREATE TRIGGER update_enrollment_on_course_completion
    AFTER UPDATE ON courses
    FOR EACH ROW
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        UPDATE student_enrollments 
        SET status = 'completed', completion_date = CURDATE()
        WHERE course_id = NEW.id AND status = 'enrolled';
    END IF;
END //

-- Trigger to log user activities
CREATE TRIGGER log_user_login
    AFTER UPDATE ON users
    FOR EACH ROW
BEGIN
    IF NEW.last_login != OLD.last_login THEN
        INSERT INTO user_activities (user_id, action, details)
        VALUES (NEW.id, 'login', 'User logged in');
    END IF;
END //

DELIMITER ;

-- Grant permissions (adjust as needed for security)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON teaching_management_system.* TO 'tms_user'@'localhost';
-- FLUSH PRIVILEGES;

-- End of schema
