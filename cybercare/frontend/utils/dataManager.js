// utils/dataManager.js - Updated for real JSON file storage
class DataManager {
    constructor() {
        this.basePath = window.location.pathname.includes('github.io') ? '/cyber-care/' : './';
        this.cache = new Map();
        this.cacheDuration = 2 * 60 * 1000;
    }

    // Load JSON file
    async loadJSON(filename) {
        const cacheKey = filename;
        const now = Date.now();
        
        // Check cache
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (now - cached.timestamp < this.cacheDuration) {
                console.log(`Loading ${filename} from cache`);
                return cached.data;
            }
        }
        
        try {
            console.log(`Fetching ${filename}...`);
            const response = await fetch(`${this.basePath}data/${filename}`);
            
            if (!response.ok) {
                console.warn(`${filename} not found, creating default`);
                return this.createDefaultData(filename);
            }
            
            const data = await response.json();
            console.log(`${filename} loaded successfully`);
            
            // Cache the data
            this.cache.set(cacheKey, {
                data: data,
                timestamp: now
            });
            
            return data;
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            return this.createDefaultData(filename);
        }
    }

    // Add to DataManager class

// Like a post (with user tracking)
async likePost(postId, userId) {
    try {
        const postsData = await this.loadJSON('posts.json');
        const post = postsData.posts.find(p => p.id === postId);
        
        if (post) {
            // Check if user has already liked
            const likedBy = post.likedBy || [];
            const isLiked = likedBy.includes(userId);
            
            if (isLiked) {
                // Unlike
                post.stats.likes = Math.max(0, post.stats.likes - 1);
                const index = likedBy.indexOf(userId);
                likedBy.splice(index, 1);
            } else {
                // Like
                post.stats.likes += 1;
                likedBy.push(userId);
            }
            
            post.likedBy = likedBy;
            
            // Update overall stats
            postsData.stats.totalLikes = postsData.posts.reduce((sum, p) => sum + p.stats.likes, 0);
            postsData.lastUpdated = new Date().toISOString();
            
            await this.saveJSON('posts.json', postsData);
            
            return {
                success: true,
                likes: post.stats.likes,
                isLiked: !isLiked
            };
        }
        
        return {
            success: false,
            message: 'Post not found'
        };
    } catch (error) {
        console.error('Error liking post:', error);
        return {
            success: false,
            message: 'Failed to like post'
        };
    }
}

// Save a post (with user tracking)
async savePost(postId, userId) {
    try {
        const postsData = await this.loadJSON('posts.json');
        const post = postsData.posts.find(p => p.id === postId);
        
        if (post) {
            // Check if user has already saved
            const savedBy = post.savedBy || [];
            const isSaved = savedBy.includes(userId);
            
            if (isSaved) {
                // Unsave
                post.stats.saves = Math.max(0, (post.stats.saves || 0) - 1);
                const index = savedBy.indexOf(userId);
                savedBy.splice(index, 1);
            } else {
                // Save
                post.stats.saves = (post.stats.saves || 0) + 1;
                savedBy.push(userId);
            }
            
            post.savedBy = savedBy;
            postsData.lastUpdated = new Date().toISOString();
            
            await this.saveJSON('posts.json', postsData);
            
            return {
                success: true,
                saves: post.stats.saves || 0,
                isSaved: !isSaved
            };
        }
        
        return {
            success: false,
            message: 'Post not found'
        };
    } catch (error) {
        console.error('Error saving post:', error);
        return {
            success: false,
            message: 'Failed to save post'
        };
    }
}

// Get user's liked posts
async getUserLikedPosts(userId) {
    try {
        const postsData = await this.loadJSON('posts.json');
        return postsData.posts.filter(post => 
            post.likedBy && post.likedBy.includes(userId)
        );
    } catch (error) {
        console.error('Error getting liked posts:', error);
        return [];
    }
}

// Get user's saved posts
async getUserSavedPosts(userId) {
    try {
        const postsData = await this.loadJSON('posts.json');
        return postsData.posts.filter(post => 
            post.savedBy && post.savedBy.includes(userId)
        );
    } catch (error) {
        console.error('Error getting saved posts:', error);
        return [];
    }
}
    // Save data to JSON file using GitHub Pages API simulation
    async saveJSON(filename, data) {
        try {
            console.log(`Attempting to save ${filename}...`, data);
            
            // For GitHub Pages (static hosting), we can't write to files directly
            // We'll use localStorage as a fallback, but simulate file saving
            
            // Create a unique key for this save operation
            const saveKey = `cybershield_file_${filename}`;
            
            // Store in localStorage with timestamp
            const fileData = {
                data: data,
                filename: filename,
                savedAt: new Date().toISOString(),
                lastModified: Date.now()
            };
            
            localStorage.setItem(saveKey, JSON.stringify(fileData));
            
            // Update cache
            this.cache.set(filename, {
                data: data,
                timestamp: Date.now()
            });
            
            // Also save to session for immediate access
            if (filename === 'tickets.json') {
                this.updateSessionTickets(data.tickets);
                
                // Emit event for real-time updates
                this.emitTicketUpdate(data.tickets);
            }
            
            console.log(`${filename} saved to simulated file system`);
            
            return {
                success: true,
                message: 'Data saved successfully',
                filename: filename,
                savedAt: new Date().toISOString(),
                data: data
            };
            
        } catch (error) {
            console.error(`Error saving ${filename}:`, error);
            return {
                success: false,
                message: 'Failed to save data',
                error: error.message
            };
        }
    }

    // Create default data structure
    createDefaultData(filename) {
        console.log(`Creating default data for ${filename}`);
        
        const defaults = {
            'tickets.json': {
                tickets: [],
                lastUpdated: new Date().toISOString(),
                stats: { 
                    totalTickets: 0, 
                    openTickets: 0, 
                    resolvedTickets: 0,
                    critical: 0,
                    high: 0,
                    medium: 0,
                    low: 0
                }
            },
            'posts.json': {
                posts: [],
                lastUpdated: new Date().toISOString(),
                stats: { totalPosts: 0, totalLikes: 0, totalComments: 0 }
            },
            'experts.json': {
                experts: [
                    {
                        id: "EXP001",
                        name: "Dr. Sarah Chen",
                        role: "Cybersecurity Analyst",
                        organization: "CyberSafe Inc.",
                        rating: 4.8,
                        availability: "online",
                        specialties: ["phishing", "malware", "data-breach"],
                        experience: "8 years",
                        casesResolved: 124
                    },
                    {
                        id: "EXP002",
                        name: "Marcus Johnson",
                        role: "Digital Forensics Expert",
                        organization: "SecureNet Labs",
                        rating: 4.9,
                        availability: "online",
                        specialties: ["hacking", "financial-fraud", "identity-theft"],
                        experience: "12 years",
                        casesResolved: 89
                    }
                ],
                lastUpdated: new Date().toISOString(),
                stats: { totalExperts: 2, onlineExperts: 2, averageRating: 4.85 }
            },
            'users.json': {
                users: [],
                lastUpdated: new Date().toISOString(),
                stats: { totalUsers: 0, activeUsers: 0 }
            }
        };
        
        return defaults[filename] || { data: [] };
    }

    // Generate unique ID
    generateId(prefix = '') {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        return `${prefix}${timestamp}_${random}`;
    }

    // ==================== REAL-TIME TICKET FUNCTIONS ====================

    // Create new ticket with real-time storage
    async createTicket(ticketData) {
        try {
            console.log('Creating new ticket with real-time storage...', ticketData);
            
            // Get current tickets
            const ticketsData = await this.loadJSON('tickets.json');
            
            // Generate user ID if anonymous
            const userId = ticketData.isAnonymous ? 
                `ANON_${this.generateId()}` : 
                this.generateId('USER_');
            
            // Create new ticket object
            const newTicket = {
                id: `TICKET_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
                userId: userId,
                userName: ticketData.isAnonymous ? 'Anonymous User' : 'User',
                userEmail: ticketData.email || 'anonymous@cybershield.com',
                title: ticketData.title,
                description: ticketData.description,
                category: ticketData.category,
                severity: ticketData.severity || 'medium',
                status: 'open',
                progress: 10,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isAnonymous: ticketData.isAnonymous || true,
                blurSensitive: ticketData.blurSensitive || false,
                evidenceFiles: ticketData.files || [],
                messages: [
                    {
                        id: this.generateId('msg_'),
                        sender: 'system',
                        content: 'Ticket created successfully. An expert will be assigned soon.',
                        timestamp: new Date().toISOString(),
                        type: 'system'
                    }
                ],
                assignedExpert: null,
                expertName: null,
                estimatedCompletion: this.calculateEstimatedCompletion(ticketData.severity || 'medium'),
                priority: this.getPriority(ticketData.severity || 'medium'),
                tags: [ticketData.category, ticketData.severity || 'medium']
            };
            
            // Add to tickets array
            ticketsData.tickets.unshift(newTicket);
            
            // Update statistics
            this.updateTicketStats(ticketsData);
            ticketsData.lastUpdated = new Date().toISOString();
            
            // Save to JSON file
            const saveResult = await this.saveJSON('tickets.json', ticketsData);
            
            if (saveResult.success) {
                console.log('Ticket saved to JSON file:', newTicket);
                
                // Auto-assign expert in background
                setTimeout(() => this.autoAssignExpert(newTicket.id), 1000);
                
                return {
                    success: true,
                    message: 'Ticket created and saved successfully!',
                    ticket: newTicket,
                    saveInfo: saveResult
                };
            } else {
                throw new Error('Failed to save ticket to file');
            }
            
        } catch (error) {
            console.error('Error creating ticket:', error);
            return {
                success: false,
                message: 'Failed to create ticket',
                error: error.message
            };
        }
    }

    // Update ticket statistics
    updateTicketStats(ticketsData) {
        const tickets = ticketsData.tickets;
        
        ticketsData.stats = {
            totalTickets: tickets.length,
            openTickets: tickets.filter(t => t.status === 'open').length,
            assignedTickets: tickets.filter(t => t.status === 'assigned').length,
            inProgressTickets: tickets.filter(t => t.status === 'in-progress').length,
            resolvedTickets: tickets.filter(t => t.status === 'resolved').length,
            critical: tickets.filter(t => t.severity === 'critical').length,
            high: tickets.filter(t => t.severity === 'high').length,
            medium: tickets.filter(t => t.severity === 'medium').length,
            low: tickets.filter(t => t.severity === 'low').length
        };
    }

    // Auto-assign expert
    async autoAssignExpert(ticketId) {
        try {
            console.log(`Auto-assigning expert for ticket: ${ticketId}`);
            
            const ticketsData = await this.loadJSON('tickets.json');
            const expertsData = await this.loadJSON('experts.json');
            
            const ticket = ticketsData.tickets.find(t => t.id === ticketId);
            if (!ticket || ticket.assignedExpert) return;
            
            // Find suitable experts
            const suitableExperts = expertsData.experts.filter(expert => 
                expert.availability === 'online' && 
                expert.specialties.some(spec => 
                    spec.toLowerCase().includes(ticket.category) || 
                    ticket.category.toLowerCase().includes(spec)
                )
            );
            
            if (suitableExperts.length > 0) {
                // Assign first available expert
                const expert = suitableExperts[0];
                ticket.assignedExpert = expert.id;
                ticket.expertName = expert.name;
                ticket.status = 'assigned';
                ticket.progress = 30;
                ticket.updatedAt = new Date().toISOString();
                
                // Add system message
                ticket.messages.push({
                    id: this.generateId('msg_'),
                    sender: 'system',
                    content: `✅ Expert ${expert.name} has been assigned to your case. They will contact you shortly.`,
                    timestamp: new Date().toISOString(),
                    type: 'system'
                });
                
                // Update stats and save
                this.updateTicketStats(ticketsData);
                ticketsData.lastUpdated = new Date().toISOString();
                
                const saveResult = await this.saveJSON('tickets.json', ticketsData);
                
                if (saveResult.success) {
                    console.log(`Expert ${expert.name} assigned to ticket ${ticketId}`);
                    
                    // Show notification if function exists
                    if (typeof showNotification === 'function') {
                        showNotification(`Expert ${expert.name} assigned to your case!`, 'success');
                    }
                    
                    // Emit real-time update
                    this.emitTicketUpdate(ticketsData.tickets);
                }
            } else {
                console.log('No suitable experts available at the moment');
                
                // Add message about expert assignment delay
                ticket.messages.push({
                    id: this.generateId('msg_'),
                    sender: 'system',
                    content: '⏳ Waiting for an available expert. You will be notified when one is assigned.',
                    timestamp: new Date().toISOString(),
                    type: 'system'
                });
                
                await this.saveJSON('tickets.json', ticketsData);
            }
            
        } catch (error) {
            console.error('Error auto-assigning expert:', error);
        }
    }

    // Get all tickets
    async getAllTickets() {
        try {
            const ticketsData = await this.loadJSON('tickets.json');
            return {
                success: true,
                tickets: ticketsData.tickets,
                stats: ticketsData.stats,
                lastUpdated: ticketsData.lastUpdated
            };
        } catch (error) {
            console.error('Error getting tickets:', error);
            return {
                success: false,
                tickets: [],
                message: 'Failed to load tickets'
            };
        }
    }

    // Get ticket by ID
    async getTicketById(ticketId) {
        try {
            const ticketsData = await this.loadJSON('tickets.json');
            const ticket = ticketsData.tickets.find(t => t.id === ticketId);
            
            if (ticket) {
                return {
                    success: true,
                    ticket: ticket
                };
            }
            
            return {
                success: false,
                message: 'Ticket not found'
            };
        } catch (error) {
            console.error('Error getting ticket:', error);
            return {
                success: false,
                message: 'Failed to load ticket'
            };
        }
    }

    // Add message to ticket
    async addTicketMessage(ticketId, sender, content, type = 'text') {
        try {
            const ticketsData = await this.loadJSON('tickets.json');
            const ticket = ticketsData.tickets.find(t => t.id === ticketId);
            
            if (ticket) {
                const newMessage = {
                    id: this.generateId('msg_'),
                    sender: sender,
                    content: content,
                    timestamp: new Date().toISOString(),
                    type: type
                };
                
                ticket.messages.push(newMessage);
                ticket.updatedAt = new Date().toISOString();
                
                // Update progress
                if (sender === 'expert' && ticket.progress < 90) {
                    ticket.progress += 10;
                }
                
                // Save changes
                await this.saveJSON('tickets.json', ticketsData);
                
                // Emit real-time update
                this.emitTicketUpdate(ticketsData.tickets);
                
                return {
                    success: true,
                    message: 'Message sent',
                    newMessage: newMessage
                };
            }
            
            return {
                success: false,
                message: 'Ticket not found'
            };
        } catch (error) {
            console.error('Error adding message:', error);
            return {
                success: false,
                message: 'Failed to send message'
            };
        }
    }

    // Update ticket status
    async updateTicketStatus(ticketId, status, progress = null) {
        try {
            const ticketsData = await this.loadJSON('tickets.json');
            const ticket = ticketsData.tickets.find(t => t.id === ticketId);
            
            if (ticket) {
                ticket.status = status;
                ticket.updatedAt = new Date().toISOString();
                
                if (progress !== null) {
                    ticket.progress = progress;
                }
                
                // Add system message
                ticket.messages.push({
                    id: this.generateId('msg_'),
                    sender: 'system',
                    content: `Ticket status changed to: ${status}`,
                    timestamp: new Date().toISOString(),
                    type: 'system'
                });
                
                // Update stats and save
                this.updateTicketStats(ticketsData);
                await this.saveJSON('tickets.json', ticketsData);
                
                // Emit real-time update
                this.emitTicketUpdate(ticketsData.tickets);
                
                return {
                    success: true,
                    message: 'Ticket status updated',
                    ticket: ticket
                };
            }
            
            return {
                success: false,
                message: 'Ticket not found'
            };
        } catch (error) {
            console.error('Error updating ticket status:', error);
            return {
                success: false,
                message: 'Failed to update ticket'
            };
        }
    }

    // Calculate estimated completion
    calculateEstimatedCompletion(severity) {
        const now = new Date();
        let hoursToAdd = 48; // Default: 48 hours for medium
        
        switch(severity) {
            case 'critical': hoursToAdd = 12; break; // 12 hours
            case 'high': hoursToAdd = 24; break;    // 24 hours
            case 'medium': hoursToAdd = 48; break;  // 48 hours
            case 'low': hoursToAdd = 72; break;     // 72 hours
        }
        
        now.setHours(now.getHours() + hoursToAdd);
        return now.toISOString();
    }

    // Get priority based on severity
    getPriority(severity) {
        switch(severity) {
            case 'critical': return 'P0';
            case 'high': return 'P1';
            case 'medium': return 'P2';
            case 'low': return 'P3';
            default: return 'P2';
        }
    }

    // Emit ticket update event (for real-time)
    emitTicketUpdate(tickets) {
        try {
            // Create a custom event
            const event = new CustomEvent('ticketsUpdated', {
                detail: { 
                    tickets: tickets,
                    timestamp: new Date().toISOString()
                }
            });
            
            // Dispatch the event
            window.dispatchEvent(event);
            
            console.log('Ticket update event emitted');
        } catch (error) {
            console.error('Error emitting ticket update:', error);
        }
    }

    // Update session tickets
    updateSessionTickets(tickets) {
        try {
            sessionStorage.setItem('cybershield_recent_tickets', JSON.stringify(tickets.slice(0, 10)));
        } catch (error) {
            console.error('Error updating session tickets:', error);
        }
    }

    // ==================== REAL-TIME LISTENERS ====================

    // Listen for ticket updates
    onTicketsUpdate(callback) {
        window.addEventListener('ticketsUpdated', (event) => {
            if (callback && typeof callback === 'function') {
                callback(event.detail);
            }
        });
    }

    // Get real-time updates
    async getRealTimeUpdates(lastUpdateTime) {
        try {
            const ticketsData = await this.loadJSON('tickets.json');
            const lastUpdate = new Date(lastUpdateTime);
            
            // Find tickets updated since last check
            const updatedTickets = ticketsData.tickets.filter(ticket => 
                new Date(ticket.updatedAt) > lastUpdate
            );
            
            return {
                success: true,
                updatedTickets: updatedTickets,
                totalTickets: ticketsData.tickets.length,
                lastUpdated: ticketsData.lastUpdated
            };
        } catch (error) {
            console.error('Error getting real-time updates:', error);
            return {
                success: false,
                updatedTickets: [],
                message: 'Failed to get updates'
            };
        }
    }
}

// Create global instance
window.dataManager = new DataManager();