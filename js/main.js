// Main JavaScript utilities for Teaching Management System

// Global alert container for notifications
let alertContainer = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mock data first
    if (typeof initializeMockData === 'function') {
        initializeMockData();
    }
    
    // Then initialize the app
    initializeApp();
});

function initializeApp() {
    // Create alert container if it doesn't exist
    if (!document.getElementById('alertContainer')) {
        alertContainer = document.createElement('div');
        alertContainer.id = 'alertContainer';
        alertContainer.className = 'position-fixed top-0 end-0 p-3';
        alertContainer.style.zIndex = '9999';
        document.body.appendChild(alertContainer);
    } else {
        alertContainer = document.getElementById('alertContainer');
    }

    // Initialize tooltips
    initializeTooltips();
    
    // Initialize mobile sidebar toggle
    initializeMobileSidebar();
    
    // Initialize form validation
    initializeFormValidation();
}

// Show alert notifications
function showAlert(message, type = 'info', autoHide = true) {
    const alertId = 'alert-' + Date.now();
    const alertHTML = `
        <div id="${alertId}" class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    alertContainer.insertAdjacentHTML('beforeend', alertHTML);
    
    if (autoHide) {
        setTimeout(() => {
            const alertElement = document.getElementById(alertId);
            if (alertElement) {
                const bsAlert = new bootstrap.Alert(alertElement);
                bsAlert.close();
            }
        }, 5000);
    }
}

// Initialize Bootstrap tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Initialize mobile sidebar toggle
function initializeMobileSidebar() {
    // Add mobile toggle button if it doesn't exist
    const navbar = document.querySelector('.navbar');
    if (navbar && window.innerWidth <= 768) {
        const existingToggle = navbar.querySelector('.sidebar-toggle');
        if (!existingToggle) {
            const toggleButton = document.createElement('button');
            toggleButton.className = 'btn btn-outline-light sidebar-toggle d-md-none';
            toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
            toggleButton.onclick = toggleSidebar;
            
            const navbarBrand = navbar.querySelector('.navbar-brand');
            navbarBrand.parentNode.insertBefore(toggleButton, navbarBrand.nextSibling);
        }
    }
}

// Toggle sidebar visibility on mobile
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('show');
    }
}

// Initialize form validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                showAlert('Please fill in all required fields correctly.', 'warning');
            }
            
            form.classList.add('was-validated');
        }, false);
    });
}

// Utility function to format dates
function formatDate(dateString, options = {}) {
    const defaultOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    return new Date(dateString).toLocaleDateString('en-US', finalOptions);
}

// Utility function to format time
function formatTime(timeString) {
    return new Date('1970-01-01T' + timeString + ':00').toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

// Utility function to calculate age
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}

// Utility function to validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility function to validate phone number
function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Utility function to generate random ID
function generateId() {
    return 'id-' + Math.random().toString(36).substr(2, 9);
}

// Utility function to capitalize first letter
function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Utility function to format currency
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Utility function to debounce function calls
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Utility function to throttle function calls
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Loading state management
function showLoading(element) {
    if (element) {
        element.classList.add('loading');
        element.style.pointerEvents = 'none';
    }
}

function hideLoading(element) {
    if (element) {
        element.classList.remove('loading');
        element.style.pointerEvents = 'auto';
    }
}

// Local storage utilities
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        showAlert('Error saving data. Please try again.', 'danger');
        return false;
    }
}

function getFromLocalStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
    }
}

function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
}

// Export utilities for CSV
function exportToCSV(data, filename) {
    const csvContent = convertToCSV(data);
    downloadCSV(csvContent, filename);
}

function convertToCSV(data) {
    if (!data || data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    
    const csvRows = data.map(row => {
        return headers.map(header => {
            const value = row[header];
            // Escape quotes and wrap in quotes if contains comma
            const escaped = value?.toString().replace(/"/g, '""') || '';
            return escaped.includes(',') ? `"${escaped}"` : escaped;
        }).join(',');
    });
    
    return [csvHeaders, ...csvRows].join('\n');
}

function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename + '.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

// Search and filter utilities
function searchInArray(array, searchTerm, fields) {
    if (!searchTerm) return array;
    
    const term = searchTerm.toLowerCase();
    
    return array.filter(item => {
        return fields.some(field => {
            const value = getNestedProperty(item, field);
            return value && value.toString().toLowerCase().includes(term);
        });
    });
}

function getNestedProperty(obj, path) {
    return path.split('.').reduce((current, key) => current && current[key], obj);
}

// Sort utilities
function sortArray(array, field, direction = 'asc') {
    return array.sort((a, b) => {
        const aVal = getNestedProperty(a, field);
        const bVal = getNestedProperty(b, field);
        
        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
        return 0;
    });
}

// Animation utilities
function fadeIn(element, duration = 300) {
    element.style.opacity = 0;
    element.style.display = 'block';
    
    const start = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        element.style.opacity = progress;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

function fadeOut(element, duration = 300) {
    const start = performance.now();
    const initialOpacity = parseFloat(getComputedStyle(element).opacity);
    
    function animate(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        element.style.opacity = initialOpacity * (1 - progress);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.style.display = 'none';
        }
    }
    
    requestAnimationFrame(animate);
}

// Responsive utilities
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
    return window.innerWidth > 1024;
}

// Update current user display
function updateCurrentUserDisplay() {
    // Check if getCurrentUser function exists (from auth.js)
    let currentUser = null;
    if (typeof getCurrentUser === 'function') {
        currentUser = getCurrentUser();
    } else {
        // Fallback to localStorage directly
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            try {
                currentUser = JSON.parse(savedUser);
            } catch (e) {
                console.warn('Error parsing current user from localStorage:', e);
            }
        }
    }
    
    const userElements = document.querySelectorAll('#currentUser');
    
    userElements.forEach(element => {
        if (currentUser) {
            element.textContent = currentUser.fullName || currentUser.username || 'User';
        } else {
            element.textContent = 'User';
        }
    });
}

// Initialize user display on load
document.addEventListener('DOMContentLoaded', updateCurrentUserDisplay);

// Handle window resize
window.addEventListener('resize', debounce(() => {
    initializeMobileSidebar();
}, 250));

// Handle clicks outside sidebar on mobile
document.addEventListener('click', (event) => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    
    if (sidebar && sidebar.classList.contains('show') && 
        !sidebar.contains(event.target) && 
        !sidebarToggle.contains(event.target)) {
        sidebar.classList.remove('show');
    }
});

// Global error handler - suppress alerts for common initialization errors
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    
    // Don't show alerts for function not defined errors during initial load
    const errorMessage = event.error?.message || '';
    if (errorMessage.includes('not defined') && 
        (errorMessage.includes('getCurrentUser') || errorMessage.includes('initializeMockData'))) {
        // These are expected during initial load before all scripts are loaded
        return;
    }
    
    // Only show alert for unexpected errors
    if (typeof showAlert === 'function') {
        showAlert('An unexpected error occurred. Please refresh the page.', 'danger');
    }
});

// Export main utilities
window.TMS = {
    showAlert,
    formatDate,
    formatTime,
    calculateAge,
    validateEmail,
    validatePhone,
    generateId,
    capitalizeFirst,
    formatCurrency,
    debounce,
    throttle,
    showLoading,
    hideLoading,
    saveToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage,
    exportToCSV,
    searchInArray,
    sortArray,
    fadeIn,
    fadeOut,
    isMobile,
    isTablet,
    isDesktop
};
