import { 
  users, clients, posts, mediaFiles, teamActivity,
  type User, type InsertUser,
  type Client, type InsertClient,
  type Post, type InsertPost,
  type MediaFile, type InsertMediaFile,
  type TeamActivity, type InsertTeamActivity
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;

  // Clients
  getClient(id: number): Promise<Client | undefined>;
  getAllClients(): Promise<Client[]>;
  getActiveClients(): Promise<Client[]>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: number, client: Partial<InsertClient>): Promise<Client | undefined>;
  deleteClient(id: number): Promise<boolean>;
  incrementClientPostsCount(id: number): Promise<void>;

  // Posts
  getPost(id: number): Promise<Post | undefined>;
  getAllPosts(): Promise<Post[]>;
  getPostsByClient(clientId: number): Promise<Post[]>;
  getPostsByStatus(status: string): Promise<Post[]>;
  getRecentPosts(limit?: number): Promise<Post[]>;
  getScheduledPosts(): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: number): Promise<boolean>;

  // Media Files
  getMediaFile(id: number): Promise<MediaFile | undefined>;
  getAllMediaFiles(): Promise<MediaFile[]>;
  getMediaFilesByClient(clientId: number): Promise<MediaFile[]>;
  createMediaFile(mediaFile: InsertMediaFile): Promise<MediaFile>;
  deleteMediaFile(id: number): Promise<boolean>;

  // Team Activity
  getTeamActivity(limit?: number): Promise<TeamActivity[]>;
  createTeamActivity(activity: InsertTeamActivity): Promise<TeamActivity>;
  
  // Dashboard Stats
  getDashboardStats(): Promise<{
    totalPosts: number;
    activeClients: number;
    scheduledPosts: number;
    totalEngagement: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private clients: Map<number, Client> = new Map();
  private posts: Map<number, Post> = new Map();
  private mediaFiles: Map<number, MediaFile> = new Map();
  private teamActivity: Map<number, TeamActivity> = new Map();
  private currentUserId = 1;
  private currentClientId = 1;
  private currentPostId = 1;
  private currentMediaFileId = 1;
  private currentTeamActivityId = 1;

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData() {
    // Seed users
    const sampleUsers: InsertUser[] = [
      {
        username: "sarah.johnson",
        email: "sarah@tagzo.com",
        password: "password123",
        name: "Sarah Johnson",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c97e?w=100&h=100&fit=crop&crop=face"
      },
      {
        username: "mike.smith",
        email: "mike@tagzo.com",
        password: "password123",
        name: "Mike Smith",
        role: "manager",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
      },
      {
        username: "emma.davis",
        email: "emma@tagzo.com",
        password: "password123",
        name: "Emma Davis",
        role: "member",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
      }
    ];

    sampleUsers.forEach(user => {
      this.createUser(user);
    });

    // Seed clients
    const sampleClients: InsertClient[] = [
      {
        name: "Tech Startup Co.",
        logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
        platforms: ["instagram", "twitter", "linkedin"],
        postsCount: 12,
        isActive: true
      },
      {
        name: "Creative Agency",
        logo: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=100&h=100&fit=crop",
        platforms: ["instagram", "facebook", "linkedin"],
        postsCount: 8,
        isActive: true
      },
      {
        name: "Fashion Brand",
        logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop",
        platforms: ["instagram", "tiktok", "twitter"],
        postsCount: 15,
        isActive: true
      }
    ];

    sampleClients.forEach(client => {
      this.createClient(client);
    });

    // Seed posts
    const samplePosts: InsertPost[] = [
      {
        clientId: 1,
        content: "Excited to announce our new product launch! 🚀 #innovation #tech",
        platforms: ["instagram"],
        mediaUrls: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop"],
        hashtags: ["#innovation", "#tech", "#startup"],
        mentions: [],
        status: "published",
        scheduledAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        authorId: 1
      },
      {
        clientId: 2,
        content: "Behind the scenes of our latest campaign... The creative process is magical! ✨",
        platforms: ["linkedin"],
        mediaUrls: ["https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=400&h=400&fit=crop"],
        hashtags: ["#creativity", "#design", "#agency"],
        mentions: [],
        status: "published",
        scheduledAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        authorId: 2
      },
      {
        clientId: 3,
        content: "New collection dropping tomorrow! 👗✨ Get ready for something amazing!",
        platforms: ["twitter"],
        mediaUrls: ["https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop"],
        hashtags: ["#fashion", "#newcollection", "#style"],
        mentions: [],
        status: "published",
        scheduledAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        authorId: 3
      },
      {
        clientId: 1,
        content: "Product launch announcement with detailed specs and pricing information.",
        platforms: ["instagram"],
        mediaUrls: [],
        hashtags: ["#product", "#launch"],
        mentions: [],
        status: "scheduled",
        scheduledAt: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
        authorId: 1
      },
      {
        clientId: 2,
        content: "Industry insights and trends for the upcoming quarter.",
        platforms: ["linkedin"],
        mediaUrls: [],
        hashtags: ["#insights", "#trends"],
        mentions: [],
        status: "scheduled",
        scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
        authorId: 2
      }
    ];

    samplePosts.forEach(post => {
      this.createPost(post);
    });

    // Seed team activity
    const sampleActivity: InsertTeamActivity[] = [
      {
        userId: 2,
        action: "approved",
        targetType: "post",
        targetId: 1,
        details: "Approved post for Tech Startup Co."
      },
      {
        userId: 3,
        action: "uploaded",
        targetType: "media",
        targetId: 1,
        details: "Uploaded new media for Fashion Brand"
      },
      {
        userId: 1,
        action: "scheduled",
        targetType: "post",
        targetId: 4,
        details: "Scheduled 3 posts for Creative Agency"
      }
    ];

    sampleActivity.forEach(activity => {
      this.createTeamActivity(activity);
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updateUser: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updateUser };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Clients
  async getClient(id: number): Promise<Client | undefined> {
    return this.clients.get(id);
  }

  async getAllClients(): Promise<Client[]> {
    return Array.from(this.clients.values());
  }

  async getActiveClients(): Promise<Client[]> {
    return Array.from(this.clients.values()).filter(client => client.isActive);
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const id = this.currentClientId++;
    const client: Client = { ...insertClient, id };
    this.clients.set(id, client);
    return client;
  }

  async updateClient(id: number, updateClient: Partial<InsertClient>): Promise<Client | undefined> {
    const client = this.clients.get(id);
    if (!client) return undefined;
    
    const updatedClient = { ...client, ...updateClient };
    this.clients.set(id, updatedClient);
    return updatedClient;
  }

  async deleteClient(id: number): Promise<boolean> {
    return this.clients.delete(id);
  }

  async incrementClientPostsCount(id: number): Promise<void> {
    const client = this.clients.get(id);
    if (client) {
      client.postsCount++;
      this.clients.set(id, client);
    }
  }

  // Posts
  async getPost(id: number): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async getAllPosts(): Promise<Post[]> {
    return Array.from(this.posts.values());
  }

  async getPostsByClient(clientId: number): Promise<Post[]> {
    return Array.from(this.posts.values()).filter(post => post.clientId === clientId);
  }

  async getPostsByStatus(status: string): Promise<Post[]> {
    return Array.from(this.posts.values()).filter(post => post.status === status);
  }

  async getRecentPosts(limit: number = 10): Promise<Post[]> {
    return Array.from(this.posts.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async getScheduledPosts(): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.status === "scheduled" && post.scheduledAt)
      .sort((a, b) => a.scheduledAt!.getTime() - b.scheduledAt!.getTime());
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = this.currentPostId++;
    const post: Post = { 
      ...insertPost, 
      id,
      createdAt: new Date(),
      publishedAt: insertPost.status === "published" ? new Date() : null
    };
    this.posts.set(id, post);
    
    // Increment client posts count
    await this.incrementClientPostsCount(insertPost.clientId);
    
    return post;
  }

  async updatePost(id: number, updatePost: Partial<InsertPost>): Promise<Post | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;
    
    const updatedPost = { ...post, ...updatePost };
    if (updatePost.status === "published" && !post.publishedAt) {
      updatedPost.publishedAt = new Date();
    }
    
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  async deletePost(id: number): Promise<boolean> {
    return this.posts.delete(id);
  }

  // Media Files
  async getMediaFile(id: number): Promise<MediaFile | undefined> {
    return this.mediaFiles.get(id);
  }

  async getAllMediaFiles(): Promise<MediaFile[]> {
    return Array.from(this.mediaFiles.values());
  }

  async getMediaFilesByClient(clientId: number): Promise<MediaFile[]> {
    return Array.from(this.mediaFiles.values()).filter(media => media.clientId === clientId);
  }

  async createMediaFile(insertMediaFile: InsertMediaFile): Promise<MediaFile> {
    const id = this.currentMediaFileId++;
    const mediaFile: MediaFile = { 
      ...insertMediaFile, 
      id,
      createdAt: new Date()
    };
    this.mediaFiles.set(id, mediaFile);
    return mediaFile;
  }

  async deleteMediaFile(id: number): Promise<boolean> {
    return this.mediaFiles.delete(id);
  }

  // Team Activity
  async getTeamActivity(limit: number = 10): Promise<TeamActivity[]> {
    return Array.from(this.teamActivity.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async createTeamActivity(insertActivity: InsertTeamActivity): Promise<TeamActivity> {
    const id = this.currentTeamActivityId++;
    const activity: TeamActivity = { 
      ...insertActivity, 
      id,
      createdAt: new Date()
    };
    this.teamActivity.set(id, activity);
    return activity;
  }

  // Dashboard Stats
  async getDashboardStats(): Promise<{
    totalPosts: number;
    activeClients: number;
    scheduledPosts: number;
    totalEngagement: number;
  }> {
    const totalPosts = this.posts.size;
    const activeClients = Array.from(this.clients.values()).filter(c => c.isActive).length;
    const scheduledPosts = Array.from(this.posts.values()).filter(p => p.status === "scheduled").length;
    const totalEngagement = Math.floor(Math.random() * 20000 + 10000); // Mock engagement data

    return {
      totalPosts,
      activeClients,
      scheduledPosts,
      totalEngagement
    };
  }
}

export const storage = new MemStorage();
