import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertClientSchema, insertPostSchema, insertMediaFileSchema, insertTeamActivitySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Dashboard Stats
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Users
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Clients
  app.get("/api/clients", async (req, res) => {
    try {
      const clients = await storage.getAllClients();
      res.json(clients);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch clients" });
    }
  });

  app.get("/api/clients/active", async (req, res) => {
    try {
      const clients = await storage.getActiveClients();
      res.json(clients);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch active clients" });
    }
  });

  app.get("/api/clients/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const client = await storage.getClient(id);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.json(client);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch client" });
    }
  });

  app.post("/api/clients", async (req, res) => {
    try {
      const validatedData = insertClientSchema.parse(req.body);
      const client = await storage.createClient(validatedData);
      res.status(201).json(client);
    } catch (error) {
      res.status(400).json({ message: "Invalid client data" });
    }
  });

  app.put("/api/clients/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertClientSchema.partial().parse(req.body);
      const client = await storage.updateClient(id, validatedData);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.json(client);
    } catch (error) {
      res.status(400).json({ message: "Invalid client data" });
    }
  });

  app.delete("/api/clients/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteClient(id);
      if (!deleted) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete client" });
    }
  });

  // Posts
  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await storage.getAllPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.get("/api/posts/recent", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const posts = await storage.getRecentPosts(limit);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent posts" });
    }
  });

  app.get("/api/posts/scheduled", async (req, res) => {
    try {
      const posts = await storage.getScheduledPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch scheduled posts" });
    }
  });

  app.get("/api/posts/client/:clientId", async (req, res) => {
    try {
      const clientId = parseInt(req.params.clientId);
      const posts = await storage.getPostsByClient(clientId);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts for client" });
    }
  });

  app.get("/api/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getPost(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  app.post("/api/posts", async (req, res) => {
    try {
      const validatedData = insertPostSchema.parse(req.body);
      const post = await storage.createPost(validatedData);
      
      // Create team activity
      await storage.createTeamActivity({
        userId: validatedData.authorId,
        action: validatedData.status === "published" ? "published" : "created",
        targetType: "post",
        targetId: post.id,
        details: `${validatedData.status === "published" ? "Published" : "Created"} post for client`
      });
      
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: "Invalid post data" });
    }
  });

  app.put("/api/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertPostSchema.partial().parse(req.body);
      const post = await storage.updatePost(id, validatedData);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(400).json({ message: "Invalid post data" });
    }
  });

  app.delete("/api/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deletePost(id);
      if (!deleted) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete post" });
    }
  });

  // Media Files
  app.get("/api/media", async (req, res) => {
    try {
      const mediaFiles = await storage.getAllMediaFiles();
      res.json(mediaFiles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch media files" });
    }
  });

  app.get("/api/media/client/:clientId", async (req, res) => {
    try {
      const clientId = parseInt(req.params.clientId);
      const mediaFiles = await storage.getMediaFilesByClient(clientId);
      res.json(mediaFiles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch media files for client" });
    }
  });

  app.post("/api/media", async (req, res) => {
    try {
      const validatedData = insertMediaFileSchema.parse(req.body);
      const mediaFile = await storage.createMediaFile(validatedData);
      
      // Create team activity
      await storage.createTeamActivity({
        userId: validatedData.uploadedById,
        action: "uploaded",
        targetType: "media",
        targetId: mediaFile.id,
        details: `Uploaded media file: ${validatedData.originalName}`
      });
      
      res.status(201).json(mediaFile);
    } catch (error) {
      res.status(400).json({ message: "Invalid media file data" });
    }
  });

  app.delete("/api/media/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteMediaFile(id);
      if (!deleted) {
        return res.status(404).json({ message: "Media file not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete media file" });
    }
  });

  // Team Activity
  app.get("/api/team-activity", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const activities = await storage.getTeamActivity(limit);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team activity" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
