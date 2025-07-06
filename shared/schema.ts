import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("member"),
  avatar: text("avatar"),
});

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo"),
  platforms: text("platforms").array().notNull().default([]),
  postsCount: integer("posts_count").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  content: text("content").notNull(),
  platforms: text("platforms").array().notNull(),
  mediaUrls: text("media_urls").array().notNull().default([]),
  hashtags: text("hashtags").array().notNull().default([]),
  mentions: text("mentions").array().notNull().default([]),
  status: text("status").notNull().default("draft"), // draft, scheduled, published
  scheduledAt: timestamp("scheduled_at"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  authorId: integer("author_id").notNull(),
});

export const mediaFiles = pgTable("media_files", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(),
  url: text("url").notNull(),
  clientId: integer("client_id"),
  uploadedById: integer("uploaded_by_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const teamActivity = pgTable("team_activity", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  action: text("action").notNull(),
  targetType: text("target_type").notNull(), // post, client, media
  targetId: integer("target_id").notNull(),
  details: text("details"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  postsCount: true,
});

export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
  createdAt: true,
  publishedAt: true,
});

export const insertMediaFileSchema = createInsertSchema(mediaFiles).omit({
  id: true,
  createdAt: true,
});

export const insertTeamActivitySchema = createInsertSchema(teamActivity).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Client = typeof clients.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;

export type Post = typeof posts.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;

export type MediaFile = typeof mediaFiles.$inferSelect;
export type InsertMediaFile = z.infer<typeof insertMediaFileSchema>;

export type TeamActivity = typeof teamActivity.$inferSelect;
export type InsertTeamActivity = z.infer<typeof insertTeamActivitySchema>;

// Platform types
export type Platform = "instagram" | "facebook" | "twitter" | "tiktok" | "linkedin";

export const PLATFORMS: { [key in Platform]: { name: string; icon: string; color: string } } = {
  instagram: { name: "Instagram", icon: "fab fa-instagram", color: "#E4405F" },
  facebook: { name: "Facebook", icon: "fab fa-facebook", color: "#1877F2" },
  twitter: { name: "Twitter", icon: "fab fa-twitter", color: "#1DA1F2" },
  tiktok: { name: "TikTok", icon: "fab fa-tiktok", color: "#000000" },
  linkedin: { name: "LinkedIn", icon: "fab fa-linkedin", color: "#0A66C2" },
};
