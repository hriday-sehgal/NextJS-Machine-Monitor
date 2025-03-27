# Machine Monitoring Dashboard - Backend

A NestJS-based backend for the Machine Monitoring Dashboard application.

## Features

- JWT-based authentication system
- RESTful API endpoints for machine data
- Hot reloading during development
- TypeScript support
- Swagger API documentation

## Tech Stack

- NestJS framework
- TypeScript
- JWT Authentication
- Swagger UI for API documentation
- Hot reloading with ts-node-dev

## Setup & Installation

### Prerequisites

- Node.js (v16 or later)
- npm

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server with hot reloading:
```bash
npm run dev
```

The backend will run on http://localhost:3001

## API Endpoints

### Authentication

- `POST /auth/login` - Login with email and password
  - Body: `{ email: "admin@example.com", password: "password123" }`
  - Returns: JWT token

### Machines (Protected Routes)

- `GET /machines` - Get all machines
- `GET /machines/:id` - Get a specific machine by ID
- `POST /machines/:id/update` - Update a machine's readings

## Default Login Credentials

- Email: admin@example.com
- Password: password123

## Project Structure

```
src/
├── auth/          # Authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── machines/      # Machines module
│   ├── machines.controller.ts
│   ├── machines.service.ts
│   ├── interfaces/
│   └── dto/
├── main.ts        # Application entry point
└── app.module.ts  # Root module
```

## Development

The backend uses hot reloading with `ts-node-dev`, so any changes to the TypeScript files will automatically restart the server.

## Testing

To run tests:
```bash
npm run test
```

For watch mode:
```bash
npm run test:watch
```

## Building for Production

To build the project:
```bash
npm run build
```

To start the production server:
```bash
npm run start:prod
```

## API Documentation

Swagger UI is available at http://localhost:3001/api when the server is running.

## License

UNLICENSED
