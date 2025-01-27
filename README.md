# Chalkstone Council Portal

A Next.js application for managing and reporting community issues to the local council. This portal allows citizens to report issues in their community and council staff to manage and track these reports.

## Features

### Public Features

- Report community issues with location mapping
- Upload images of issues
- Provide detailed descriptions
- View issue status updates

### Admin Features

- View and manage reported issues
- Update issue statuses (Open, In Progress, Resolved, Closed)
- View analytics dashboard
- Assign staff to issues
- Track resolution times

### API Routes

- `/api/issues` - CRUD operations for issues
- `/api/issues/[id]` - Individual issue operations
- `/api/upload` - Image upload handling
- `/api/staff` - Staff management
- `/api/analytics` - Analytics data

## Getting Started

### Prerequisites

1. Install [Node.js](https://nodejs.org/) (version 18.0.0 or higher)
2. Git for version control

### Development Setup

1. Clone the repository:

```bash
git clone https://github.com/username/chalkstone-council-portal.git
cd chalkstone-council-portal
```

2. Install dependencies:

```bash
npm install
```

3. Environment Variables:

   - Contact the development team to obtain the necessary `.env` file
   - Required variables include:
     - `NEXT_PUBLIC_DB_URL`
     - `NEXT_PUBLIC_DB_API_ANON_KEY`
     - `NEXT_PUBLIC_IMAGE_BUCKET`
     - `NEXT_PUBLIC_SITE_URL`

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Testing

Run the test suite:

```bash
npm test
```

Watch mode for development:

```bash
npm run test:watch
```

## Technology Stack

- Next.js 15.1
- React 19
- TypeScript
- Tailwind CSS
- Jest for testing
- Supabase for backend
- Leaflet for maps

## Project Structure

The project follows Next.js 15+ app directory structure

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Write/update tests
4. Submit a pull request

For detailed contribution guidelines, please contact the development team.
