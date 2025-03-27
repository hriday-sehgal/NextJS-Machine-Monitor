# Machine Monitoring Dashboard

A full-stack application for monitoring machine data in real-time built with Next.js and NestJS.

## Features

- Login with JWT authentication
- Machine dashboard with auto-refresh
- Machine details page with temperature charts
- NestJS backend with protected routes
- Real-time data updates (every 10 seconds)

## Tech Stack

### Frontend (Next.js)
- React with Next.js
- TypeScript
- Tailwind CSS for styling
- Shadcn UI components
- Framer Motion for animations
- React Query for data fetching

### Backend (NestJS)
- NestJS framework
- JWT authentication
- RESTful API endpoints
- TypeScript
- Swagger API documentation

## Setup & Installation

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The backend will run on http://localhost:3001.

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will run on http://localhost:3002.

## API Endpoints

### Authentication
- `POST /login` - Login with email and password (admin@example.com / password123)

### Machines (Protected Routes)
- `GET /machines` - Get all machines
- `GET /machines/:id` - Get a specific machine by ID
- `POST /machines/:id/update` - Update a machine's readings

## Default Login Credentials
- Email: admin@example.com
- Password: password123

## Project Structure

### Frontend
- `/pages` - Next.js pages
- `/components` - Reusable UI components
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and API client
- `/styles` - Global styles

### Backend
- `/auth` - Authentication module
- `/machines` - Machines module
- `main.ts` - Application entry point

## Copyright Disclaimer

Copyright 2025 Hriday Sehgal. All rights reserved.

This project and its source code are the proprietary intellectual property of Hriday Sehgal. Unauthorized copying, modification, distribution, or reproduction in any form without explicit permission is strictly prohibited.

## Contact

For inquiries or collaborations, reach out via:
- **Email**: hriday.career@gmail.com
