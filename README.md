# Machine Monitoring Dashboard

A modern dashboard for monitoring industrial machines built with Next.js.

## Features

- Responsive dashboard with machine data
- Auto-refresh every 10 seconds
- Machine details page with temperature history
- JWT authentication
- Modern UI with Tailwind CSS

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- React Query
- Vite
- Shadcn UI

## Setup & Installation

### Prerequisites

- Node.js (v16 or later)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will run on http://localhost:3002

## Default Login Credentials

- Email: admin@example.com
- Password: password123

## Project Structure

```
src/
├── components/    # Reusable UI components
├── pages/         # Next.js pages
├── lib/           # Utility functions and API client
├── hooks/         # Custom React hooks
└── styles/        # Global styles
```

## Development

The frontend uses Vite for fast development with hot module replacement.

## Environment Variables

Create a `.env` file in the root directory with:
```
VITE_API_URL=http://localhost:3001
```

## License

UNLICENSED
