# Cloud Service Crosswalk Tool - Setup Guide

## 🚀 Quick Start

This guide will help you set up and run the Cloud Service Crosswalk Tool locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm
- **PostgreSQL** 14+ (optional - mock data available)
- **Redis** (optional - mock data available)
- **Git**

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd cloud-service-crosswalk
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install all workspace dependencies
npm run install:all
```

### 3. Environment Setup

```bash
# Copy environment files
cp .env.example .env
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

### 4. Choose Your Setup Method

#### Option A: Mock Data (Recommended for Development)

This option runs the application with mock data and doesn't require external databases.

```bash
# Start both frontend and backend with mock data
npm run dev:mock
```

#### Option B: Full Database Setup

This option requires PostgreSQL and Redis for full functionality.

**Set up databases:**

```bash
# Using Docker (recommended)
docker run --name cloudcrosswalk-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=cloudcrosswalk -p 5432:5432 -d postgres:14
docker run --name cloudcrosswalk-redis -p 6379:6379 -d redis:7-alpine

# Or install locally
# PostgreSQL: https://postgresql.org/download/
# Redis: https://redis.io/download/
```

**Run migrations and seed data:**

```bash
cd backend
npm run db:migrate
npm run db:seed
```

**Start the application:**

```bash
# From project root
npm run dev
```

## 🏗️ Development

### Project Structure

```
cloud-service-crosswalk/
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── store/       # Redux store and slices
│   │   ├── services/    # API service functions
│   │   └── types/       # TypeScript type definitions
├── backend/           # Node.js + Express backend
│   ├── src/
│   │   ├── routes/      # API route handlers
│   │   ├── config/      # Database and Redis config
│   │   ├── middleware/  # Express middleware
│   │   ├── services/    # Business logic services
│   │   └── scripts/     # Database scripts
└── shared/            # Shared types and utilities
    └── src/types/     # Common TypeScript types
```

### Available Scripts

#### Root Level
- `npm run dev` - Start both frontend and backend (full database)
- `npm run dev:mock` - Start with mock data (no database required)
- `npm run build` - Build all packages
- `npm run test` - Run all tests
- `npm run lint` - Lint all packages

#### Frontend
- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run test` - Run Jest tests
- `npm run lint` - ESLint checking

#### Backend
- `npm run dev` - Start development server with mock data
- `npm run dev:full` - Start with full database
- `npm run build` - Build TypeScript
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data

## 🌐 Accessing the Application

Once started, you can access:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/health
- **API Documentation**: http://localhost:3001/api/v1

## 🧪 Testing

### Frontend Testing

```bash
cd frontend
npm run test              # Run all tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Run tests with coverage report
```

### Backend Testing

```bash
cd backend
npm run test              # Run all tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Run tests with coverage report
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/cloudcrosswalk
REDIS_URL=redis://localhost:6379

# Server
PORT=3001
NODE_ENV=development

# Authentication
JWT_SECRET=your-jwt-secret
```

#### Frontend (.env)
```bash
VITE_API_BASE_URL=http://localhost:3001/api/v1
```

## 📊 Features

### Current Implementation

✅ **Backend Infrastructure**
- Express.js server with TypeScript
- PostgreSQL database with migrations
- Redis caching layer
- RESTful API endpoints
- Mock data service for development

✅ **Frontend Application**
- React 19 with TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- Responsive design
- Service search and filtering
- Service comparison functionality
- Detailed service pages

✅ **Core Features**
- Service discovery across 5 cloud providers
- Advanced search with filters
- Side-by-side service comparison
- Feature matrix comparison
- Mobile-responsive design
- Provider-specific branding

### Data Coverage

The application includes comprehensive data for:

- **Providers**: AWS, Azure, GCP, Alibaba Cloud, IBM Cloud
- **Categories**: Compute, Storage, Database, Networking, AI/ML, Analytics, Security, Developer Tools
- **Services**: Sample services with detailed specifications
- **Features**: Comprehensive feature comparison matrix

## 🚀 Deployment

### Production Build

```bash
# Build all packages
npm run build

# Frontend build output: frontend/dist/
# Backend build output: backend/dist/
```

### Docker Deployment

```bash
# Build Docker images
docker build -t cloudcrosswalk-frontend ./frontend
docker build -t cloudcrosswalk-backend ./backend

# Run with Docker Compose
docker-compose up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for new functionality
5. Run tests: `npm run test`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📞 Support

If you encounter any issues:

1. Check this setup guide
2. Review the documentation files
3. Check existing GitHub issues
4. Create a new issue with detailed information

## 🎯 Next Steps

After setup, you can:

1. **Explore the Dashboard**: View provider and category overviews
2. **Search Services**: Use the global search with filters
3. **Compare Services**: Select multiple services for detailed comparison
4. **View Service Details**: Deep dive into individual service specifications

## 📚 Additional Resources

- [Product Requirements Document](PRD_CloudServiceCrosswalk.md)
- [UI Mockup Design](UI_Mockup_Design.md)
- [Service Data Structure](Service_Data_Structure.md)
- [Main README](README.md)

---

**Happy coding! 🎉**

The Cloud Service Crosswalk Tool is designed to simplify cloud service selection and comparison. If you have any questions or suggestions, please don't hesitate to reach out to the development team.