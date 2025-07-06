# Tagzo - Social Media Management Platform

## Overview

Tagzo is a comprehensive social media management platform built with a modern full-stack architecture. It enables users to manage clients, create and schedule posts across multiple social media platforms, handle media assets, and track analytics. The application uses Django REST Framework for the backend API with SQLite database for data persistence.

## System Architecture

### Backend Architecture
- **Framework**: Django 5.2.4 with Python 3.11
- **API Framework**: Django REST Framework for RESTful APIs
- **Database**: SQLite (development) with Django ORM
- **Admin Interface**: Django Admin for backend management
- **Authentication**: Django's built-in authentication system
- **API Serialization**: Django REST Framework serializers
- **Development**: Django development server with auto-reload

### Frontend Architecture (Legacy - Available for Integration)
- **Framework**: React 18 with TypeScript
- **UI Framework**: Radix UI components with custom styling
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation resolvers
- **Build Tool**: Vite for fast development and optimized builds

### Database Schema
The application uses a SQLite database with the following core entities:
- **Users**: Django's built-in User model for authentication
- **Clients**: Customer accounts with platform associations
- **Posts**: Content with scheduling, multi-platform support, and metadata
- **Media Files**: Asset management with client associations
- **Team Activity**: Activity logging and audit trail

## Key Components

### Multi-Platform Support
- Instagram, Facebook, Twitter, TikTok, and LinkedIn integration
- Platform-specific content formatting and constraints
- Cross-platform posting and scheduling capabilities

### Content Management
- Rich text post composer with hashtag and mention support
- Media file upload and management system
- Content scheduling with calendar interface
- Draft, scheduled, and published post states

### Client Management
- Client onboarding and profile management
- Platform account linking per client
- Usage tracking and analytics per client

### Analytics Dashboard
- Post performance metrics
- Client engagement statistics
- Platform-specific analytics
- Team activity monitoring

## Data Flow

1. **User Authentication**: Session-based authentication with PostgreSQL session storage
2. **Client Management**: CRUD operations for client profiles and platform associations
3. **Content Creation**: Multi-step content creation with media upload, platform selection, and scheduling
4. **Publishing**: Scheduled post execution with platform-specific API integrations
5. **Analytics**: Real-time data aggregation and reporting

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **UI Components**: Radix UI component library for accessibility
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Database**: Drizzle ORM, Neon Database serverless driver
- **Utilities**: date-fns for date manipulation, clsx for conditional classes

### Development Dependencies
- **Build Tools**: Vite, esbuild for production builds
- **TypeScript**: Full TypeScript support across frontend and backend
- **Development**: tsx for TypeScript execution, Replit-specific plugins

## Deployment Strategy

### Development Environment
- Vite development server with HMR for frontend
- Express server with middleware for API routes
- TypeScript compilation with tsx for backend
- Replit-specific development enhancements

### Production Build
- Vite build process for frontend assets
- esbuild bundling for backend with external package handling
- Static asset serving through Express
- Environment-based configuration management

### Database Management
- Drizzle Kit for schema migrations
- PostgreSQL connection through environment variables
- Schema versioning and migration tracking

## Changelog

- July 06, 2025. Successfully converted from Node.js/Express to Django REST Framework
  - Migrated backend from Express.js to Django 5.2.4
  - Implemented Django models for Client, Post, MediaFile, and TeamActivity
  - Created REST API endpoints using Django REST Framework
  - Added Django Admin interface for backend management
  - Seeded database with sample data
  - All API endpoints tested and functional
- July 05, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.