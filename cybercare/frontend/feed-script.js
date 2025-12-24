// Mock Data for Feed Posts
const feedPosts = [
    {
        id: 1,
        author: {
            name: "Dr. Sarah Wilson",
            role: "Cyber Security Expert",
            initials: "SW",
            isVerified: true
        },
        category: "phishing",
        categoryLabel: "🎣 Phishing Attack",
        title: "How I helped recover ₹50,000 from a fake bank call",
        description: "Victim received call from someone claiming to be bank manager asking for OTP to 'secure account'.",
        solution: [
            "Immediately blocked all bank cards",
            "Filed complaint with cyber crime portal",
            "Contacted bank's fraud department",
            "Changed all online banking passwords",
            "Enabled 2FA on all financial accounts"
        ],
        prevention: [
            "Never share OTP with anyone",
            "Banks never call asking for sensitive info",
            "Verify caller identity by calling bank's official number",
            "Enable transaction alerts"
        ],
        stats: {
            likes: 245,
            comments: 42,
            shares: 89,
            saves: 156,
            helpful: 98
        },
        timestamp: "2 hours ago",
        severity: "high",
        isAnonymous: false,
        tags: ["bank-fraud", "otp-scam", "financial-safety"]
    },
    {
        id: 2,
        author: {
            name: "Alex Johnson",
            role: "Digital Forensics Specialist",
            initials: "AJ",
            isVerified: true
        },
        category: "hacking",
        categoryLabel: "💻 Account Hacking",
        title: "Instagram account hacked and being used for scams - Recovery Guide",
        description: "Hacker took over Instagram account, changed email/password, and started posting crypto scams.",
        solution: [
            "Used Instagram's account recovery process",
            "Provided government ID for verification",
            "Contacted friends to report the hacked account",
            "Checked connected apps and removed suspicious ones",
            "Set up login alerts"
        ],
        prevention: [
            "Use strong unique password",
            "Enable two-factor authentication",
            "Don't use same password across sites",
            "Regularly check active sessions",
            "Be wary of suspicious login links"
        ],
        stats: {
            likes: 189,
            comments: 31,
            shares: 67,
            saves: 124,
            helpful: 87
        },
        timestamp: "5 hours ago",
        severity: "critical",
        isAnonymous: true,
        tags: ["instagram", "social-media", "account-recovery"]
    },
    {
        id: 3,
        author: {
            name: "CyberShield Team",
            role: "Official Awareness",
            initials: "CS",
            isVerified: true
        },
        category: "fraud",
        categoryLabel: "💰 Online Shopping Fraud",
        title: "⚠️ ALERT: New Flipkart/Amazon delivery scam circulating",
        description: "Scammers calling as delivery agents asking for 'advance payment' for COD orders.",
        solution: [
            "Never pay delivery person in advance",
            "Only pay when product is physically received",
            "Verify order status on official app/website",
            "Report suspicious calls to customer care",
            "Use official payment methods only"
        ],
        prevention: [
            "Enable order notifications",
            "Save customer care numbers",
            "Check seller ratings before purchase",
            "Use secure payment gateways",
            "Keep transaction records"
        ],
        stats: {
            likes: 432,
            comments: 89,
            shares: 210,
            saves: 345,
            helpful: 95
        },
        timestamp: "1 day ago",
        severity: "high",
        isAnonymous: false,
        tags: ["ecommerce", "delivery-scam", "online-shopping"]
    },
    {
        id: 4,
        author: {
            name: "Priya Sharma",
            role: "Legal Advisor",
            initials: "PS",
            isVerified: true
        },
        category: "bullying",
        categoryLabel: "😔 Cyber Bullying",
        title: "Helped teenager deal with online harassment - Legal steps taken",
        description: "15-year old facing continuous bullying on WhatsApp groups and Instagram comments.",
        solution: [
            "Documented all evidence (screenshots, messages)",
            "Filed police complaint under IT Act",
            "Got restraining order against perpetrators",
            "Worked with school authorities",
            "Provided counseling support"
        ],
        prevention: [
            "Don't engage with bullies",
            "Use privacy settings effectively",
            "Block and report offenders",
            "Talk to trusted adults",
            "Save evidence before blocking"
        ],
        stats: {
            likes: 178,
            comments: 45,
            shares: 92,
            saves: 167,
            helpful: 91
        },
        timestamp: "2 days ago",
        severity: "medium",
        isAnonymous: true,
        tags: ["teen-safety", "legal-help", "mental-health"]
    },
    {
        id: 5,
        author: {
            name: "Mike Chen",
            role: "Social Media Security",
            initials: "MC",
            isVerified: true
        },
        category: "job-fraud",
        categoryLabel: "💼 Job Offer Scam",
        title: "Fake WFH job offer - How to identify and avoid",
        description: "Victim paid 'registration fee' for fake work-from-home job that promised high earnings.",
        solution: [
            "Filed complaint with cyber crime portal",
            "Contacted payment gateway for refund",
            "Reported fake company website",
            "Shared awareness in job groups",
            "Helped recover partial amount"
        ],
        prevention: [
            "Legitimate companies don't ask for registration fees",
            "Research company thoroughly",
            "Check employee reviews on LinkedIn",
            "Never share bank details upfront",
            "Verify email domains"
        ],
        stats: {
            likes: 156,
            comments: 38,
            shares: 78,
            saves: 145,
            helpful: 89
        },
        timestamp: "3 days ago",
        severity: "medium",
        isAnonymous: false,
        tags: ["job-scam", "work-from-home", "online-fraud"]
    },
    {
        id: 6,
        author: {
            name: "Dr. Sarah Wilson",
            role: "Cyber Security Expert",
            initials: "SW",
            isVerified: true
        },
        category: "investment",
        categoryLabel: "📈 Investment Scam",
        title: "Fake crypto investment platform - Lost ₹2,00,000 recovered",
        description: "Victim invested in fake cryptocurrency platform promising 5% daily returns.",
        solution: [
            "Traced cryptocurrency wallet addresses",
            "Coordinated with crypto exchange",
            "Filed detailed police FIR",
            "Contacted financial regulators",
            "Managed to freeze some funds"
        ],
        prevention: [
            "Only use SEBI registered platforms",
            "Avoid 'guaranteed returns' promises",
            "Research company registration",
            "Start with small test amounts",
            "Use trusted wallet services"
        ],
        stats: {
            likes: 289,
            comments: 67,
            shares: 134,
            saves: 234,
            helpful: 94
        },
        timestamp: "1 week ago",
        severity: "critical",
        isAnonymous: true,
        tags: ["crypto-scam", "investment", "financial-fraud"]
    },
    {
        id: 7,
        author: {
            name: "Alex Johnson",
            role: "Digital Forensics",
            initials: "AJ",
            isVerified: true
        },
        category: "whatsapp",
        categoryLabel: "💬 WhatsApp Hack",
        title: "WhatsApp account stolen and used to ask money from contacts",
        description: "Hacker took over WhatsApp and sent money requests to all contacts pretending to be victim.",
        solution: [
            "Immediately informed all contacts via other channels",
            "Used WhatsApp's account recovery",
            "Enabled two-step verification",
            "Checked linked devices",
            "Educated contacts about such scams"
        ],
        prevention: [
            "Never share verification code",
            "Enable two-step verification",
            "Regularly check linked devices",
            "Set up biometric lock",
            "Be careful with WhatsApp Web"
        ],
        stats: {
            likes: 321,
            comments: 89,
            shares: 156,
            saves: 278,
            helpful: 96
        },
        timestamp: "1 week ago",
        severity: "high",
        isAnonymous: false,
        tags: ["whatsapp", "messaging", "account-security"]
    },
    {
        id: 8,
        author: {
            name: "CyberShield Team",
            role: "Official Awareness",
            initials: "CS",
            isVerified: true
        },
        category: "loan",
        categoryLabel: "🏦 Fake Loan App",
        title: "Warning: Fake loan apps accessing personal data and blackmailing",
        description: "Apps offering instant loans then accessing gallery/contacts and threatening to share personal photos.",
        solution: [
            "Helped uninstall malicious apps",
            "Reset all device permissions",
            "Filed complaint with cyber cell",
            "Reported apps to Play Store",
            "Provided digital cleaning steps"
        ],
        prevention: [
            "Only download from official stores",
            "Check app reviews and ratings",
            "Review permission requests",
            "Avoid 'instant loan' promises",
            "Use trusted financial apps only"
        ],
        stats: {
            likes: 412,
            comments: 123,
            shares: 245,
            saves: 367,
            helpful: 97
        },
        timestamp: "2 weeks ago",
        severity: "critical",
        isAnonymous: true,
        tags: ["loan-apps", "privacy", "mobile-security"]
    }
];

let likedPosts = new Set();
let savedPosts = new Set();

// Initialize Feed
document.addEventListener('DOMContentLoaded', function() {
    loadFeedPosts();
    setupInfiniteScroll();
});

// Load Feed Posts
function loadFeedPosts(filter = 'all') {
    const feedContainer = document.getElementById('feedPosts');
    const exploreContainer = document.getElementById('explorePosts');
    
    if (!feedContainer && !exploreContainer) return;
    
    let filteredPosts = [...feedPosts];
    
    // Apply filters
    if (filter !== 'all') {
        switch(filter) {
            case 'phishing':
                filteredPosts = feedPosts.filter(post => post.category === 'phishing');
                break;
            case 'hacking':
                filteredPosts = feedPosts.filter(post => post.category === 'hacking');
                break;
            case 'fraud':
                filteredPosts = feedPosts.filter(post => post.category === 'fraud');
                break;
            case 'bullying':
                filteredPosts = feedPosts.filter(post => post.category === 'bullying');
                break;
            case 'resolved':
                filteredPosts = feedPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                break;
            case 'popular':
                filteredPosts = feedPosts.sort((a, b) => b.stats.helpful - a.stats.helpful);
                break;
            case 'trending':
                filteredPosts = feedPosts.sort((a, b) => (b.stats.likes + b.stats.shares) - (a.stats.likes + a.stats.shares));
                break;
            case 'job-fraud':
                filteredPosts = feedPosts.filter(post => post.tags.includes('job-scam'));
                break;
            case 'online-shopping':
                filteredPosts = feedPosts.filter(post => post.tags.includes('ecommerce'));
                break;
            case 'investment':
                filteredPosts = feedPosts.filter(post => post.tags.includes('investment'));
                break;
            case 'whatsapp':
                filteredPosts = feedPosts.filter(post => post.tags.includes('whatsapp'));
                break;
        }
    }
    
    // Clear containers
    if (feedContainer) {
        feedContainer.innerHTML = '';
    }
    if (exploreContainer) {
        exploreContainer.innerHTML = '';
    }
    
    // Render posts
    filteredPosts.forEach(post => {
        const postElement = createPostElement(post);
        
        if (feedContainer) {
            feedContainer.appendChild(postElement);
        }
        if (exploreContainer) {
            exploreContainer.appendChild(postElement.cloneNode(true));
        }
    });
    
    // Update active filter button
    updateActiveFilter(filter);
}

// Create Post Element
function createPostElement(post) {
    const postElement = document.createElement('article');
    postElement.className = 'post-card';
    postElement.dataset.id = post.id;
    
    return `
        <div class="post-header">
            <div class="post-avatar">${post.author.initials}</div>
            <div class="post-user-info">
                <h4>
                    ${post.author.name}
                    ${post.author.isVerified ? '<i class="fas fa-check-circle verified-badge"></i>' : ''}
                </h4>
                <div class="post-meta">
                    <span>${post.author.role}</span>
                    <span>•</span>
                    <span>${post.timestamp}</span>
                    <div class="post-category">${post.categoryLabel}</div>
                </div>
            </div>
        </div>
        
        <div class="post-content">
            <h3 class="post-title">${post.title}</h3>
            <p class="post-description">${post.description}</p>
            
            <div class="post-solution">
                <h5><i class="fas fa-check-circle"></i> SOLUTION APPLIED</h5>
                <ul class="solution-steps">
                    ${post.solution.map(step => `<li>${step}</li>`).join('')}
                </ul>
            </div>
            
            <div class="post-prevention">
                <h5><i class="fas fa-shield-alt"></i> PREVENTION TIPS</h5>
                <ul class="prevention-steps">
                    ${post.prevention.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
            
            <div class="post-tags">
                ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
            </div>
        </div>
        
        <div class="post-footer">
            <div class="post-actions">
                <button class="action-btn ${likedPosts.has(post.id) ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                    <i class="fas fa-heart"></i>
                    <span>${post.stats.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                </button>
                <button class="action-btn" onclick="showComments(${post.id})">
                    <i class="fas fa-comment"></i>
                    <span>${post.stats.comments}</span>
                </button>
                <button class="action-btn" onclick="sharePost(${post.id})">
                    <i class="fas fa-share"></i>
                    <span>${post.stats.shares}</span>
                </button>
                <button class="action-btn ${savedPosts.has(post.id) ? 'saved' : ''}" onclick="toggleSave(${post.id})">
                    <i class="fas fa-bookmark"></i>
                    <span>Save</span>
                </button>
            </div>
            
            <div class="post-helpful">
                <i class="fas fa-thumbs-up"></i>
                <span>${post.stats.helpful}% found helpful</span>
            </div>
        </div>
    `;
}

// Filter Feed
function filterFeed(filter) {
    loadFeedPosts(filter);
    showNotification(`Showing ${filter} cases`, 'info');
}

function updateActiveFilter(activeFilter) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.textContent.toLowerCase().includes(activeFilter)) {
            btn.classList.add('active');
        }
    });
}

// Post Interactions
function toggleLike(postId) {
    if (likedPosts.has(postId)) {
        likedPosts.delete(postId);
        showNotification('Like removed', 'info');
    } else {
        likedPosts.add(postId);
        showNotification('Post liked!', 'success');
    }
    
    // Update UI
    const likeStat = document.querySelector(`.post-card[data-id="${postId}"] .stat:nth-child(1)`);
    if (likeStat) {
        likeStat.classList.toggle('liked');
        const span = likeStat.querySelector('span');
        const currentLikes = parseInt(span.textContent);
        span.textContent = likedPosts.has(postId) ? currentLikes + 1 : currentLikes - 1;
    }
}

function toggleSave(postId) {
    if (savedPosts.has(postId)) {
        savedPosts.delete(postId);
        showNotification('Removed from saved', 'info');
    } else {
        savedPosts.add(postId);
        showNotification('Post saved!', 'success');
    }
    
    // Update UI
    const saveStat = document.querySelector(`.post-card[data-id="${postId}"] .stat:nth-child(4)`);
    if (saveStat) {
        saveStat.classList.toggle('saved');
    }
}

function showComments(postId) {
    showNotification('Comments feature coming soon!', 'info');
}

function sharePost(postId) {
    const post = feedPosts.find(p => p.id === postId);
    if (post) {
        const shareText = `Check out this cyber crime case: ${post.title}\n\nLearn more at CyberShield`;
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: shareText,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(shareText);
            showNotification('Link copied to clipboard!', 'success');
        }
    }
}

// Search Functionality
function searchCases() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
        showNotification('Please enter search terms', 'error');
        return;
    }
    
    const results = feedPosts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.includes(query))
    );
    
    if (results.length === 0) {
        showNotification(`No cases found for "${query}"`, 'info');
        return;
    }
    
    // Show results
    const feedContainer = document.getElementById('feedPosts') || document.getElementById('explorePosts');
    if (feedContainer) {
        feedContainer.innerHTML = '';
        results.forEach(post => {
            feedContainer.appendChild(createPostElement(post));
        });
        showNotification(`Found ${results.length} case(s)`, 'success');
    }
}

// Infinite Scroll
function setupInfiniteScroll() {
    window.addEventListener('scroll', function() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            loadMorePosts();
        }
    });
}

function loadMorePosts() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
        
        // Simulate loading delay
        setTimeout(() => {
            // In real app, this would fetch more posts from API
            loadingIndicator.style.display = 'none';
            showNotification('No more posts to load', 'info');
        }, 1500);
    }
}

// Other Functions
function viewReport() {
    showNotification('Monthly report will open in new tab', 'info');
    // In real app: window.open('/monthly-report.html', '_blank');
}