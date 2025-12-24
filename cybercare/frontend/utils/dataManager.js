// JSON Data Manager - No backend needed!
class DataManager {
    constructor() {
        this.dataPath = 'data/';
        this.cache = new Map();
        this.cacheDuration = 5 * 60 * 1000; // 5 minutes cache
    }

    // Load JSON file
    async loadJSON(filename) {
        const cacheKey = filename;
        const now = Date.now();
        
        // Check cache
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (now - cached.timestamp < this.cacheDuration) {
                return cached.data;
            }
        }
        
        try {
            const response = await fetch(`${this.dataPath}${filename}`);
            if (!response.ok) throw new Error('Failed to load data');
            
            const data = await response.json();
            
            // Cache the data
            this.cache.set(cacheKey, {
                data: data,
                timestamp: now
            });
            
            return data;
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            
            // Return default data if file doesn't exist
            return this.getDefaultData(filename);
        }
    }

    // Save data to JSON (simulated - in real app, this would be backend API)
    async saveJSON(filename, data) {
        try {
            // In browser, we can't write to files directly
            // So we save to localStorage and simulate file save
            const dataKey = `json_data_${filename}`;
            localStorage.setItem(dataKey, JSON.stringify(data));
            
            // Update cache
            this.cache.set(filename, {
                data: data,
                timestamp: Date.now()
            });
            
            // Simulate API call
            console.log(`Data saved to ${filename}:`, data);
            
            return {
                success: true,
                message: 'Data saved successfully',
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

    // Get default data for each file
    getDefaultData(filename) {
        const defaults = {
            'posts.json': {
                posts: [],
                lastUpdated: new Date().toISOString(),
                stats: {
                    totalPosts: 0,
                    totalLikes: 0,
                    totalComments: 0
                }
            },
            'experts.json': {
                experts: [],
                categories: [],
                stats: {
                    totalExperts: 0,
                    onlineExperts: 0,
                    averageRating: 0
                }
            },
            'tickets.json': {
                tickets: [],
                lastTicketId: 0,
                stats: {
                    openTickets: 0,
                    resolvedTickets: 0,
                    averageResolutionTime: 0
                }
            },
            'users.json': {
                users: [],
                lastUserId: 0,
                stats: {
                    totalUsers: 0,
                    activeUsers: 0
                }
            }
        };
        
        return defaults[filename] || {};
    }

    // Clear cache
    clearCache(filename = null) {
        if (filename) {
            this.cache.delete(filename);
        } else {
            this.cache.clear();
        }
    }

    // Generate ID for new items
    generateId(prefix = '') {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 9);
        return `${prefix}${timestamp}_${random}`;
    }

    // Add new post
    async addNewPost(postData) {
        try {
            const data = await this.loadJSON('posts.json');
            const newPost = {
                id: this.generateId('post_'),
                ...postData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                stats: {
                    likes: 0,
                    comments: 0,
                    shares: 0,
                    saves: 0,
                    helpful: 95
                }
            };
            
            data.posts.unshift(newPost); // Add to beginning
            data.stats.totalPosts = data.posts.length;
            
            const result = await this.saveJSON('posts.json', data);
            
            // Update localStorage for immediate access
            localStorage.setItem('latest_posts', JSON.stringify(data.posts.slice(0, 10)));
            
            return {
                ...result,
                post: newPost
            };
        } catch (error) {
            console.error('Error adding post:', error);
            return {
                success: false,
                message: 'Failed to add post',
                error: error.message
            };
        }
    }

    // Add new ticket
    async addNewTicket(ticketData) {
        try {
            const data = await this.loadJSON('tickets.json');
            const newTicket = {
                id: `TICKET_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
                ...ticketData,
                status: 'open',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                assignedExpert: null,
                messages: []
            };
            
            data.tickets.unshift(newTicket);
            data.stats.openTickets = data.tickets.filter(t => t.status === 'open').length;
            data.lastTicketId = newTicket.id;
            
            const result = await this.saveJSON('tickets.json', data);
            
            // Update user's tickets in localStorage
            this.updateUserTickets(newTicket);
            
            return {
                ...result,
                ticket: newTicket
            };
        } catch (error) {
            console.error('Error adding ticket:', error);
            return {
                success: false,
                message: 'Failed to create ticket',
                error: error.message
            };
        }
    }

    // Update user tickets in localStorage
    updateUserTickets(ticket) {
        try {
            const userTickets = JSON.parse(localStorage.getItem('user_tickets') || '[]');
            userTickets.unshift(ticket);
            localStorage.setItem('user_tickets', JSON.stringify(userTickets.slice(0, 50)));
        } catch (error) {
            console.error('Error updating user tickets:', error);
        }
    }

    // Like a post
    async likePost(postId, userId) {
        try {
            const data = await this.loadJSON('posts.json');
            const post = data.posts.find(p => p.id === postId);
            
            if (post) {
                if (!post.likedBy) post.likedBy = [];
                
                if (post.likedBy.includes(userId)) {
                    // Unlike
                    post.likedBy = post.likedBy.filter(id => id !== userId);
                    post.stats.likes = Math.max(0, post.stats.likes - 1);
                } else {
                    // Like
                    post.likedBy.push(userId);
                    post.stats.likes += 1;
                }
                
                post.updatedAt = new Date().toISOString();
                data.stats.totalLikes = data.posts.reduce((sum, p) => sum + p.stats.likes, 0);
                
                await this.saveJSON('posts.json', data);
                
                return {
                    success: true,
                    likes: post.stats.likes,
                    isLiked: post.likedBy.includes(userId)
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

    // Save a post
    async savePost(postId, userId) {
        try {
            const data = await this.loadJSON('posts.json');
            const post = data.posts.find(p => p.id === postId);
            
            if (post) {
                if (!post.savedBy) post.savedBy = [];
                
                if (post.savedBy.includes(userId)) {
                    // Unsave
                    post.savedBy = post.savedBy.filter(id => id !== userId);
                    post.stats.saves = Math.max(0, post.stats.saves - 1);
                } else {
                    // Save
                    post.savedBy.push(userId);
                    post.stats.saves += 1;
                }
                
                post.updatedAt = new Date().toISOString();
                await this.saveJSON('posts.json', data);
                
                // Update user's saved posts in localStorage
                this.updateUserSavedPosts(postId, userId, post.savedBy.includes(userId));
                
                return {
                    success: true,
                    saves: post.stats.saves,
                    isSaved: post.savedBy.includes(userId)
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

    // Update user's saved posts in localStorage
    updateUserSavedPosts(postId, userId, isSaved) {
        try {
            const userSavedPosts = JSON.parse(localStorage.getItem(`saved_posts_${userId}`) || '[]');
            
            if (isSaved) {
                if (!userSavedPosts.includes(postId)) {
                    userSavedPosts.push(postId);
                }
            } else {
                const index = userSavedPosts.indexOf(postId);
                if (index > -1) {
                    userSavedPosts.splice(index, 1);
                }
            }
            
            localStorage.setItem(`saved_posts_${userId}`, JSON.stringify(userSavedPosts));
        } catch (error) {
            console.error('Error updating saved posts:', error);
        }
    }

    // Get user data
    async getUserData(userId) {
        try {
            const data = await this.loadJSON('users.json');
            return data.users.find(user => user.id === userId) || null;
        } catch (error) {
            console.error('Error getting user data:', error);
            return null;
        }
    }

    // Create new user
    async createUser(userData) {
        try {
            const data = await this.loadJSON('users.json');
            const newUser = {
                id: this.generateId('user_'),
                ...userData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                role: userData.role || 'victim',
                isAnonymous: userData.isAnonymous || false,
                tickets: [],
                savedPosts: [],
                stats: {
                    postsViewed: 0,
                    ticketsCreated: 0,
                    casesResolved: 0
                }
            };
            
            data.users.push(newUser);
            data.stats.totalUsers = data.users.length;
            data.lastUserId = newUser.id;
            
            await this.saveJSON('users.json', data);
            
            // Save to localStorage for session
            localStorage.setItem('current_user', JSON.stringify(newUser));
            localStorage.setItem('user_id', newUser.id);
            
            return {
                success: true,
                message: 'User created successfully',
                user: newUser
            };
        } catch (error) {
            console.error('Error creating user:', error);
            return {
                success: false,
                message: 'Failed to create user',
                error: error.message
            };
        }
    }

    // Search posts
    async searchPosts(query, category = null) {
        try {
            const data = await this.loadJSON('posts.json');
            let results = data.posts;
            
            // Filter by search query
            if (query) {
                const searchTerm = query.toLowerCase();
                results = results.filter(post => 
                    post.title.toLowerCase().includes(searchTerm) ||
                    post.description.toLowerCase().includes(searchTerm) ||
                    post.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                    post.solution?.some(step => step.toLowerCase().includes(searchTerm))
                );
            }
            
            // Filter by category
            if (category && category !== 'all') {
                results = results.filter(post => post.category === category);
            }
            
            return {
                success: true,
                results: results,
                count: results.length
            };
        } catch (error) {
            console.error('Error searching posts:', error);
            return {
                success: false,
                results: [],
                count: 0,
                message: 'Search failed'
            };
        }
    }

    // Get dashboard stats
    async getDashboardStats(userId = null) {
        try {
            const [postsData, ticketsData, expertsData] = await Promise.all([
                this.loadJSON('posts.json'),
                this.loadJSON('tickets.json'),
                this.loadJSON('experts.json')
            ]);
            
            const stats = {
                posts: {
                    total: postsData.posts.length,
                    today: postsData.posts.filter(p => {
                        const postDate = new Date(p.createdAt);
                        const today = new Date();
                        return postDate.toDateString() === today.toDateString();
                    }).length,
                    popular: postsData.posts.sort((a, b) => b.stats.likes - a.stats.likes).slice(0, 5)
                },
                tickets: {
                    total: ticketsData.tickets.length,
                    open: ticketsData.tickets.filter(t => t.status === 'open').length,
                    resolved: ticketsData.tickets.filter(t => t.status === 'resolved').length
                },
                experts: {
                    total: expertsData.experts.length,
                    online: expertsData.experts.filter(e => e.availability === 'online').length,
                    topRated: expertsData.experts.sort((a, b) => b.rating - a.rating).slice(0, 5)
                }
            };
            
            // Add user-specific stats if userId provided
            if (userId) {
                const user = await this.getUserData(userId);
                if (user) {
                    stats.user = {
                        savedPosts: user.savedPosts?.length || 0,
                        ticketsCreated: user.tickets?.length || 0,
                        lastActive: user.updatedAt
                    };
                }
            }
            
            return {
                success: true,
                stats: stats,
                updatedAt: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error getting dashboard stats:', error);
            return {
                success: false,
                stats: {},
                message: 'Failed to load statistics'
            };
        }
    }
}

// Create global instance
window.dataManager = new DataManager();