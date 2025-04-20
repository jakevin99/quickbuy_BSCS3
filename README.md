# QuickBuy E-Commerce Platform

This application has been fully refactored to follow RESTful API principles and DRY (Don't Repeat Yourself) methodology, creating a maintainable, scalable, and consistent codebase.

## Architecture Overview

### Backend Architecture

The backend follows a layered architecture with clear separation of concerns:

#### 1. Routes Layer (`/backend/src/routes/`)
- Defines API endpoints following RESTful conventions
- Organizes resources hierarchically (auth, products, admin)
- Groups related functionality (user authentication, product management)

#### 2. Controllers Layer (`/backend/src/controllers/`)
- Handles HTTP requests and responses
- Validates input data
- Delegates business logic to services
- Returns appropriate status codes and responses

#### 3. Services Layer (`/backend/src/services/`)
- Contains business logic
- Interacts with data models
- Implements domain-specific operations

#### 4. Models Layer (`/backend/src/models/`)
- Represents data entities
- Handles database operations
- Encapsulates data access logic

#### 5. Middleware Layer (`/backend/src/middlewares/`)
- Implements cross-cutting concerns
- Handles authentication/authorization
- Manages error handling
- Provides request/response processing

### Frontend Architecture

The frontend is organized around:

#### 1. API Service Layer (`/src/lib/services/api.ts`)
- Centralizes all API communication
- Follows RESTful patterns
- Handles authentication and error management
- Provides type-safe API methods

#### 2. Store Layer (`/src/lib/stores/`)
- Implements state management
- Provides reactive data stores
- Encapsulates business logic
- Handles API interactions

#### 3. Components Layer (`/src/lib/components/`)
- Reusable UI elements
- Presentation logic
- Event handling

#### 4. Routes/Pages (`/src/routes/`)
- Page-level components
- Route-specific logic
- Layout management

#### 5. Shared Types (`/src/lib/types/`)
- Type definitions shared across the application
- Ensures type consistency
- Facilitates DRY principles

## RESTful API Structure

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/logout` - Log out user
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - List all products (with filtering)
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create new product (authenticated sellers)
- `PUT /api/products/:id` - Update product (authenticated sellers)
- `DELETE /api/products/:id` - Delete product (authenticated sellers)

### Admin
- `GET /api/admin/users` - List all users (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)

## DRY Principles Implementation

1. **Shared Type Definitions**
   - Common interfaces used across frontend and backend
   - Consistent data structures

2. **Centralized API Service**
   - Single point for API communication
   - Consistent error handling
   - Authentication management

3. **Reusable Components**
   - UI elements shared across pages
   - Consistent styling and behavior

4. **Middleware Patterns**
   - Common request processing
   - Authentication and authorization
   - Error handling

5. **Service Abstractions**
   - Business logic isolated in services
   - Reusable data operations

## Getting Started

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
npm install
npm run dev
```

## Project Structure
```
├── backend/
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── middlewares/   # Middleware functions
│   │   ├── models/        # Data models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── types/         # Type definitions
│   │   ├── utils/         # Utility functions
│   │   └── app.ts         # Main application
│   └── package.json
│
├── src/
│   ├── lib/
│   │   ├── components/    # Reusable UI components
│   │   ├── services/      # API and other services
│   │   ├── stores/        # State management
│   │   └── types/         # Shared type definitions
│   │
│   ├── routes/            # Application pages/routes
│   └── app.ts             # Main frontend application
│
└── package.json
```
