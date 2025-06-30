// Authentication module for Teaching Management System

// Current user session
let currentUser = null;

// Initialize authentication
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateCurrentUserDisplay();
    }
});

// Login function
function login(username, password, userType) {
    const users = getUsers();
    
    // Find user with matching credentials and role
    const user = users.find(u => 
        u.username === username && 
        u.password === password && 
        u.role === userType
    );
    
    if (user) {
        // Update last login time
        user.lastLogin = new Date().toISOString();
        
        // Save updated user data
        const updatedUsers = users.map(u => u.id === user.id ? user : u);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        // Set current user
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update UI
        updateCurrentUserDisplay();
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
        
        return { success: true, user: user };
    } else {
        return { 
            success: false, 
            message: 'Invalid credentials or user type. Please check your username, password, and selected user type.' 
        };
    }
}

// Logout function
function logout() {
    // Clear current user
    currentUser = null;
    localStorage.removeItem('currentUser');
    
    // Show logout message
    if (typeof showAlert === 'function') {
        showAlert('You have been logged out successfully.', 'info');
    }
    
    // Redirect to login page after a short delay
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// Check if user is authenticated
function isAuthenticated() {
    return currentUser !== null;
}

// Get current user
function getCurrentUser() {
    return currentUser;
}

// Check authentication and redirect if needed
function checkAuth() {
    const publicPages = ['index.html', 'login.html', ''];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (!isAuthenticated() && !publicPages.includes(currentPage)) {
        if (typeof showAlert === 'function') {
            showAlert('Please login to access this page.', 'warning');
        }
        window.location.href = 'login.html';
        return false;
    }
    
    return true;
}

// Check user role permissions
function hasPermission(requiredRole) {
    if (!currentUser) return false;
    
    const roleHierarchy = {
        'admin': 3,
        'teacher': 2,
        'student': 1
    };
    
    const userLevel = roleHierarchy[currentUser.role] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;
    
    return userLevel >= requiredLevel;
}

// Restrict access based on user role
function requireRole(requiredRole) {
    if (!hasPermission(requiredRole)) {
        if (typeof showAlert === 'function') {
            showAlert('You do not have permission to access this feature.', 'danger');
        }
        return false;
    }
    return true;
}

// Update current user display in navigation
function updateCurrentUserDisplay() {
    const userElements = document.querySelectorAll('#currentUser');
    
    userElements.forEach(element => {
        if (currentUser) {
            element.textContent = currentUser.fullName || currentUser.username;
        } else {
            element.textContent = 'User';
        }
    });
}

// Change password function
function changePassword(oldPassword, newPassword) {
    if (!currentUser) {
        return { success: false, message: 'No user logged in.' };
    }
    
    if (currentUser.password !== oldPassword) {
        return { success: false, message: 'Current password is incorrect.' };
    }
    
    if (newPassword.length < 6) {
        return { success: false, message: 'New password must be at least 6 characters long.' };
    }
    
    // Update password
    const users = getUsers();
    const updatedUsers = users.map(user => {
        if (user.id === currentUser.id) {
            user.password = newPassword;
            return user;
        }
        return user;
    });
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    currentUser.password = newPassword;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    return { success: true, message: 'Password changed successfully.' };
}

// Update user profile
function updateProfile(profileData) {
    if (!currentUser) {
        return { success: false, message: 'No user logged in.' };
    }
    
    // Validate email format
    if (profileData.email && !validateEmail(profileData.email)) {
        return { success: false, message: 'Invalid email format.' };
    }
    
    // Update user data
    const users = getUsers();
    const updatedUsers = users.map(user => {
        if (user.id === currentUser.id) {
            return { ...user, ...profileData };
        }
        return user;
    });
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Update current user
    currentUser = { ...currentUser, ...profileData };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    updateCurrentUserDisplay();
    
    return { success: true, message: 'Profile updated successfully.' };
}

// Get user activity log
function getUserActivityLog() {
    const activities = JSON.parse(localStorage.getItem('userActivities')) || [];
    return activities.filter(activity => activity.userId === currentUser?.id);
}

// Log user activity
function logUserActivity(action, details = '') {
    if (!currentUser) return;
    
    const activities = JSON.parse(localStorage.getItem('userActivities')) || [];
    
    const activity = {
        id: Date.now(),
        userId: currentUser.id,
        username: currentUser.username,
        action: action,
        details: details,
        timestamp: new Date().toISOString(),
        ipAddress: 'localhost', // In real app, this would be actual IP
        userAgent: navigator.userAgent
    };
    
    activities.push(activity);
    
    // Keep only last 100 activities
    if (activities.length > 100) {
        activities.splice(0, activities.length - 100);
    }
    
    localStorage.setItem('userActivities', JSON.stringify(activities));
}

// Reset password (admin function)
function resetUserPassword(userId, newPassword) {
    if (!hasPermission('admin')) {
        return { success: false, message: 'Admin permission required.' };
    }
    
    const users = getUsers();
    const updatedUsers = users.map(user => {
        if (user.id === userId) {
            user.password = newPassword;
            return user;
        }
        return user;
    });
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    logUserActivity('password_reset', `Reset password for user ID: ${userId}`);
    
    return { success: true, message: 'Password reset successfully.' };
}

// Session timeout handling
let sessionTimeout;
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

function resetSessionTimeout() {
    clearTimeout(sessionTimeout);
    
    if (currentUser) {
        sessionTimeout = setTimeout(() => {
            if (typeof showAlert === 'function') {
                showAlert('Your session has expired. Please login again.', 'warning');
            }
            logout();
        }, SESSION_DURATION);
    }
}

// Reset timeout on user activity
document.addEventListener('click', resetSessionTimeout);
document.addEventListener('keypress', resetSessionTimeout);
document.addEventListener('scroll', resetSessionTimeout);

// Initialize session timeout when user logs in
if (currentUser) {
    resetSessionTimeout();
}

// Login form handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const userType = document.getElementById('userType').value;
            
            // Validate inputs
            if (!username) {
                showAlert('Please enter your username.', 'warning');
                return;
            }
            
            if (!password) {
                showAlert('Please enter your password.', 'warning');
                return;
            }
            
            if (!userType) {
                showAlert('Please select your user type.', 'warning');
                return;
            }
            
            // Attempt login
            const result = login(username, password, userType);
            
            if (result.success) {
                showAlert('Login successful! Redirecting...', 'success');
                logUserActivity('login', 'User logged in successfully');
            } else {
                showAlert(result.message, 'danger');
                logUserActivity('login_failed', 'Failed login attempt');
            }
        });
        
        // Toggle password visibility
        const togglePassword = document.getElementById('togglePassword');
        const passwordField = document.getElementById('password');
        
        if (togglePassword && passwordField) {
            togglePassword.addEventListener('click', function() {
                const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordField.setAttribute('type', type);
                
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-eye');
                    icon.classList.toggle('fa-eye-slash');
                }
            });
        }
    }
});

// Auto-logout when page is closed (for security)
window.addEventListener('beforeunload', function() {
    if (currentUser) {
        logUserActivity('logout', 'User session ended');
    }
});

// Export authentication functions
window.Auth = {
    login,
    logout,
    isAuthenticated,
    getCurrentUser,
    checkAuth,
    hasPermission,
    requireRole,
    changePassword,
    updateProfile,
    getUserActivityLog,
    logUserActivity,
    resetUserPassword
};
