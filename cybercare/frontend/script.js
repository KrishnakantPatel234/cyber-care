// Common Functions for all pages

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');
    
    if (!notification || !notificationMessage) return;
    
    // Set message and style
    notificationMessage.textContent = message;
    
    // Set color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    // Show notification
    notification.style.display = 'block';
    notification.style.animation = 'slideIn 0.3s ease';
    
    // Auto hide after 5 seconds
    setTimeout(hideNotification, 5000);
}

function hideNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.style.display = 'none';
    }
}

// Toggle Mobile Menu
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.menu-btn');
    
    if (mobileMenu && mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(event.target) && 
        !menuBtn.contains(event.target)) {
        mobileMenu.classList.remove('active');
    }
});

// Login Modal Functions
function toggleLogin() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.toggle('active');
    }
}

function selectRole(role) {
    const buttons = document.querySelectorAll('.role-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (event && event.target) {
        event.target.closest('.role-btn').classList.add('active');
    }
}

function handleLogin(event) {
    if (event) event.preventDefault();
    
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    
    if (!username || !password) return;
    
    if (!username.value || !password.value) {
        showNotification('Please fill all fields', 'error');
        return;
    }
    
    // Mock login
    showNotification(`Welcome ${username.value}! Login successful.`, 'success');
    
    // Close modal
    toggleLogin();
    
    // Update UI
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) {
        loginBtn.innerHTML = `<i class="fas fa-user"></i> ${username.value}`;
    }
    
    // Reset form
    if (username) username.value = '';
    if (password) password.value = '';
}

function showRegister() {
    showNotification('Registration will be implemented in the full version', 'info');
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize common functionality
document.addEventListener('DOMContentLoaded', function() {
    // Close notifications when clicked
    const notification = document.getElementById('notification');
    if (notification) {
        notification.addEventListener('click', hideNotification);
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                toggleLogin();
            }
        });
    }
    
    // Set current year in footer if exists
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});