// Mock Data
const mockTickets = [
    {
        id: 'TICKET-456789',
        title: 'Facebook account hacked',
        description: 'Someone accessed my account and changed password',
        category: 'hacking',
        severity: 'high',
        status: 'in-progress',
        createdAt: '2024-01-15T10:30:00Z',
        expert: { name: 'Alex Johnson', rating: 4.8 },
        lastUpdated: '2 hours ago'
    },
    {
        id: 'TICKET-456788',
        title: 'Phishing email from fake bank',
        description: 'Received email asking for banking details',
        category: 'phishing',
        severity: 'medium',
        status: 'open',
        createdAt: '2024-01-14T14:20:00Z',
        expert: null,
        lastUpdated: '1 day ago'
    },
    {
        id: 'TICKET-456787',
        title: 'Online payment fraud',
        description: 'Paid for product but never received',
        category: 'financial-fraud',
        severity: 'critical',
        status: 'resolved',
        createdAt: '2024-01-10T09:15:00Z',
        expert: { name: 'Sarah Wilson', rating: 4.9 },
        lastUpdated: '5 days ago',
        resolution: 'Funds recovered through bank dispute'
    },
    {
        id: 'TICKET-456786',
        title: 'Cyber bullying on Instagram',
        description: 'Getting harassing messages from fake account',
        category: 'cyber-bullying',
        severity: 'medium',
        status: 'in-progress',
        createdAt: '2024-01-12T16:45:00Z',
        expert: { name: 'Mike Chen', rating: 4.7 },
        lastUpdated: '3 days ago'
    }
];

const mockExperts = [
    {
        id: 1,
        name: 'Dr. Sarah Wilson',
        title: 'Cyber Security Expert',
        specialties: ['Phishing', 'Malware', 'Data Breach'],
        rating: 4.9,
        casesSolved: 234,
        responseTime: '15 min',
        avatar: 'SW'
    },
    {
        id: 2,
        name: 'Alex Johnson',
        title: 'Digital Forensics Specialist',
        specialties: ['Hacking', 'Data Recovery', 'Mobile Security'],
        rating: 4.8,
        casesSolved: 189,
        responseTime: '20 min',
        avatar: 'AJ'
    },
    {
        id: 3,
        name: 'Priya Sharma',
        title: 'Cyber Crime Legal Advisor',
        specialties: ['Legal Issues', 'Police Liaison', 'Fraud Cases'],
        rating: 4.9,
        casesSolved: 156,
        responseTime: '30 min',
        avatar: 'PS'
    },
    {
        id: 4,
        name: 'Mike Chen',
        title: 'Social Media Security Expert',
        specialties: ['Cyber Bullying', 'Account Security', 'Privacy'],
        rating: 4.7,
        casesSolved: 127,
        responseTime: '25 min',
        avatar: 'MC'
    }
];

// DOM Elements
let currentUser = null;
let selectedRole = 'victim';
let selectedSeverity = 'medium';
let uploadedFiles = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadTickets();
    loadExperts();
    setupPasswordStrength();
    
    // Auto-hide mobile menu on link click
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('mobileMenu').classList.remove('active');
        });
    });
});

// Navigation Functions
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

function toggleLogin() {
    const modal = document.getElementById('loginModal');
    modal.classList.toggle('active');
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Role Selection
function selectRole(role) {
    selectedRole = role;
    const buttons = document.querySelectorAll('.role-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    event.target.closest('.role-btn').classList.add('active');
    
    // Update form based on role
    if (role === 'anonymous') {
        document.getElementById('anonymousMode').checked = true;
        document.getElementById('anonymousMode').disabled = true;
    } else {
        document.getElementById('anonymousMode').disabled = false;
    }
}

// Login Handler
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const isAnonymous = document.getElementById('anonymousMode').checked;
    
    if (!username || !password) {
        showNotification('Please fill all fields', 'error');
        return;
    }
    
    // Mock login - in real app, this would be API call
    currentUser = {
        username: username,
        role: selectedRole,
        isAnonymous: isAnonymous,
        joinedAt: new Date().toISOString()
    };
    
    // Update UI
    document.querySelector('.btn-login').innerHTML = 
        `<i class="fas fa-user"></i> ${username}`;
    
    // Show success message
    showNotification(`Welcome ${username}! Successfully logged in as ${selectedRole}.`, 'success');
    
    // Close modal
    toggleLogin();
    
    // Update dashboard if visible
    if (document.getElementById('dashboard')) {
        loadTickets();
    }
}

function showRegister() {
    showNotification('Registration form will be implemented in next version', 'info');
}

// Ticket Functions
function loadTickets() {
    const ticketsList = document.getElementById('ticketsList');
    if (!ticketsList) return;
    
    ticketsList.innerHTML = '';
    
    mockTickets.forEach(ticket => {
        const statusClass = getStatusClass(ticket.status);
        const severityClass = getSeverityClass(ticket.severity);
        
        const ticketElement = document.createElement('div');
        ticketElement.className = 'ticket-item';
        ticketElement.innerHTML = `
            <div class="ticket-info">
                <h4>${ticket.title}</h4>
                <div class="ticket-meta">
                    <span><i class="fas fa-tag"></i> ${ticket.category}</span>
                    <span><i class="fas fa-clock"></i> ${ticket.lastUpdated}</span>
                    <span class="${severityClass}">${ticket.severity.toUpperCase()}</span>
                </div>
            </div>
            <div class="ticket-status ${statusClass}">
                ${getStatusText(ticket.status)}
            </div>
        `;
        
        ticketElement.addEventListener('click', () => viewTicket(ticket.id));
        ticketsList.appendChild(ticketElement);
    });
}

function viewTicket(ticketId) {
    const ticket = mockTickets.find(t => t.id === ticketId);
    if (ticket) {
        showNotification(`Viewing ticket: ${ticket.title}`, 'info');
        // In real app, this would redirect to ticket detail page
    }
}

function showAllTickets() {
    showNotification('Loading all tickets...', 'info');
}

// Create Ticket
function selectSeverity(severity) {
    selectedSeverity = severity;
    
    // Update UI
    const buttons = document.querySelectorAll('.severity-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function handleFileUpload() {
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    
    if (!fileInput.files.length) return;
    
    Array.from(fileInput.files).forEach(file => {
        const fileItem = {
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2),
            type: file.type.split('/')[0]
        };
        
        uploadedFiles.push(fileItem);
        
        const fileElement = document.createElement('div');
        fileElement.className = 'file-item';
        fileElement.innerHTML = `
            <div class="file-info">
                <i class="fas fa-${fileItem.type === 'image' ? 'image' : 'file'}"></i>
                <div>
                    <div class="file-name">${fileItem.name}</div>
                    <div class="file-size">${fileItem.size} MB</div>
                </div>
            </div>
            <button class="remove-file" onclick="removeFile('${fileItem.name}')">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        fileList.appendChild(fileElement);
    });
    
    // Reset file input
    fileInput.value = '';
    
    showNotification(`${fileInput.files.length} file(s) uploaded`, 'success');
}

function removeFile(fileName) {
    uploadedFiles = uploadedFiles.filter(file => file.name !== fileName);
    loadFileList();
    showNotification('File removed', 'info');
}

function loadFileList() {
    const fileList = document.getElementById('fileList');
    if (!fileList) return;
    
    fileList.innerHTML = '';
    
    uploadedFiles.forEach(file => {
        const fileElement = document.createElement('div');
        fileElement.className = 'file-item';
        fileElement.innerHTML = `
            <div class="file-info">
                <i class="fas fa-${file.type === 'image' ? 'image' : 'file'}"></i>
                <div>
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${file.size} MB</div>
                </div>
            </div>
            <button class="remove-file" onclick="removeFile('${file.name}')">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        fileList.appendChild(fileElement);
    });
}

function createTicket() {
    const title = document.getElementById('ticketTitle');
    const description = document.getElementById('ticketDescription');
    const category = document.getElementById('category');
    const isAnonymous = document.getElementById('anonymous');
    const blurSensitive = document.getElementById('blurSensitive');
    
    if (!title.value || !description.value) {
        showNotification('Please fill all required fields', 'error');
        return;
    }
    
    // Create new ticket
    const newTicket = {
        id: `TICKET-${Math.floor(100000 + Math.random() * 900000)}`,
        title: title.value,
        description: description.value,
        category: category.value,
        severity: selectedSeverity,
        status: 'open',
        createdAt: new Date().toISOString(),
        lastUpdated: 'Just now',
        isAnonymous: isAnonymous.checked,
        blurSensitive: blurSensitive.checked,
        files: [...uploadedFiles]
    };
    
    // Add to mock data
    mockTickets.unshift(newTicket);
    
    // Reset form
    title.value = '';
    description.value = '';
    uploadedFiles = [];
    loadFileList();
    
    // Update tickets list
    loadTickets();
    
    // Show success
    showNotification(`Ticket created successfully! ID: ${newTicket.id}`, 'success');
    
    // Auto-assign expert (mock)
    setTimeout(() => {
        const randomExpert = mockExperts[Math.floor(Math.random() * mockExperts.length)];
        showNotification(`${randomExpert.name} has been assigned to your ticket`, 'info');
    }, 2000);
}

// Experts Functions
function loadExperts() {
    const expertsGrid = document.getElementById('expertsGrid');
    if (!expertsGrid) return;
    
    expertsGrid.innerHTML = '';
    
    mockExperts.forEach(expert => {
        const expertCard = document.createElement('div');
        expertCard.className = 'expert-card';
        expertCard.innerHTML = `
            <div class="expert-header">
                <div class="expert-avatar">
                    <img src="https://ui-avatars.com/api/?name=${expert.avatar}&background=3b82f6&color=fff&size=100" alt="${expert.name}">
                </div>
                <h3>${expert.name}</h3>
                <p class="expert-title">${expert.title}</p>
            </div>
            <div class="expert-body">
                <div class="expert-specialties">
                    ${expert.specialties.map(spec => 
                        `<span class="specialty-tag">${spec}</span>`
                    ).join('')}
                </div>
                <div class="expert-stats">
                    <div class="stat">
                        <span class="stat-value">${expert.rating}</span>
                        <span class="stat-label">Rating</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${expert.casesSolved}</span>
                        <span class="stat-label">Cases Solved</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${expert.responseTime}</span>
                        <span class="stat-label">Response Time</span>
                    </div>
                </div>
                <button class="assign-btn" onclick="assignExpert(${expert.id})">
                    <i class="fas fa-user-plus"></i> Request Help
                </button>
            </div>
        `;
        
        expertsGrid.appendChild(expertCard);
    });
}

function assignExpert(expertId) {
    const expert = mockExperts.find(e => e.id === expertId);
    if (expert) {
        showNotification(`Help requested from ${expert.name}. They will contact you shortly.`, 'success');
    }
}

// Safety Tools Functions
function setupPasswordStrength() {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strengthBar = document.getElementById('strengthBar');
            const strengthText = document.getElementById('strengthText');
            
            let strength = 0;
            let color = '#ef4444';
            let text = 'Weak';
            
            if (password.length >= 8) strength += 25;
            if (/[A-Z]/.test(password)) strength += 25;
            if (/[0-9]/.test(password)) strength += 25;
            if (/[^A-Za-z0-9]/.test(password)) strength += 25;
            
            if (strength >= 75) {
                color = '#10b981';
                text = 'Strong';
            } else if (strength >= 50) {
                color = '#f59e0b';
                text = 'Medium';
            } else if (strength >= 25) {
                color = '#f97316';
                text = 'Fair';
            }
            
            strengthBar.style.width = `${strength}%`;
            strengthBar.style.background = color;
            strengthText.textContent = text;
            strengthText.style.color = color;
        });
    }
}

function scanURL() {
    const urlInput = document.getElementById('urlInput');
    if (!urlInput.value) {
        showNotification('Please enter a URL to scan', 'error');
        return;
    }
    
    // Mock scan result
    const isSafe = Math.random() > 0.3;
    
    if (isSafe) {
        showNotification(`✅ ${urlInput.value} appears to be safe`, 'success');
    } else {
        showNotification(`⚠️ ${urlInput.value} might be dangerous! Avoid this site.`, 'error');
    }
}

function checkEmail() {
    showNotification('Email checker will analyze suspicious emails for phishing attempts', 'info');
}

function showEmergencyGuide() {
    document.getElementById('emergencyModal').classList.add('active');
}

function closeEmergencyGuide() {
    document.getElementById('emergencyModal').classList.remove('active');
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');
    
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
    
    // Auto hide after 5 seconds
    setTimeout(hideNotification, 5000);
}

function hideNotification() {
    document.getElementById('notification').style.display = 'none';
}

function getStatusClass(status) {
    switch(status) {
        case 'open': return 'status-open';
        case 'in-progress': return 'status-progress';
        case 'resolved': return 'status-resolved';
        case 'escalated': return 'status-escalated';
        default: return 'status-open';
    }
}

function getSeverityClass(severity) {
    switch(severity) {
        case 'critical': return 'severity-critical';
        case 'high': return 'severity-high';
        case 'medium': return 'severity-medium';
        case 'low': return 'severity-low';
        default: return 'severity-medium';
    }
}

function getStatusText(status) {
    switch(status) {
        case 'open': return 'Open';
        case 'in-progress': return 'In Progress';
        case 'resolved': return 'Resolved';
        case 'escalated': return 'Escalated';
        default: return 'Open';
    }
}