# Vault — Product Store

A full-stack product store application built with PostgreSQL, Express, React, and Node.js, focused on clean architecture, secure data handling, and scalable design.

## 🚀 Tech Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express 5** - Fast, unopinionated web framework
- **TypeScript 5.9.3** - Typed superset of JavaScript
- **PostgreSQL** - Relational database (hosted on Neon)
- **Drizzle ORM 0.44.7** - TypeScript ORM for SQL databases
- **Drizzle Kit 0.31.7** - Database migration and introspection tool
- **Clerk** - Authentication and user management (`@clerk/express`)
- **pg 8.16.3** - PostgreSQL client for Node.js
- **dotenv** - Environment variable management


### Frontend
- **React 19** - UI library
- **Vite 7** - Next-generation frontend build tool
- **TypeScript** - Type safety and better DX
- **ESLint** - Code linting and quality

### Development Tools
- **nodemon 3.1.11** - Automatic server restarts during development
- **ts-node 10.9.2** - TypeScript execution for Node.js
- **TypeScript 5.9.3** - Type-safe JavaScript

## 📁 Project Structure

```
Vault (PERN Stack)/
├── backend/
│   ├── src/
│   │   ├── config/        # Configuration files (env.ts)
│   │   ├── controllers/   # Route controllers
│   │   ├── db/            # Database setup and schema
│   │   │   ├── index.ts   # Database connection
│   │   │   └── schema.ts  # Drizzle schema definitions
│   │   ├── routes/        # API routes
│   │   └── index.ts       # Express app entry point
│   ├── drizzle.config.ts  # Drizzle Kit configuration
│   └── package.json
├── frontend/
│   ├── src/               # React application source
│   └── package.json
└── README.md
```

## 🔧 Setup & Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- PostgreSQL database (Neon recommended)
- Clerk account for authentication

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=3000
DB_URL=your_postgresql_connection_string
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

4. Push database schema:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🗄️ Database Schema

The application uses the following main entities:

- **Users** - User accounts (synced with Clerk)
- **Products** - Product listings
- **Comments** - Product comments

Relationships:
- Users have many Products
- Users have many Comments
- Products belong to one User
- Products have many Comments
- Comments belong to one User and one Product

## 🔐 Authentication

Authentication is handled by **Clerk**, providing:
- User authentication and session management
- Secure API route protection via `@clerk/express` middleware
- User profile management

## 📝 API Endpoints

- `GET /` - API information and available endpoints
- `GET /api/users` - User endpoints
- `GET /api/products` - Product endpoints
- `GET /api/comments` - Comment endpoints

## 🛠️ Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm run db:push` - Push schema changes to database using Drizzle Kit

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔒 Security

- Environment variables are securely managed via `.env` files (never committed)
- CORS configured to allow requests from specified frontend URL
- Clerk authentication middleware protects sensitive routes
- Database credentials stored securely in environment variables

## 📦 Database Migrations

This project uses **Drizzle Kit** for database schema management:

```bash
npm run db:push
```

This command syncs your schema changes to the database without creating migration files (useful for development).

## 🌐 Environment Variables

Required environment variables for the backend:

- `PORT` - Server port (default: 3000)
- `DB_URL` - PostgreSQL connection string (Neon recommended)
- `NODE_ENV` - Environment mode (development/production)
- `FRONTEND_URL` - Frontend application URL for CORS
- `CLERK_SECRET_KEY` - Clerk secret key
- `CLERK_PUBLISHABLE_KEY` - Clerk publishable key

## 📄 License

ISC

## 🔗 Links

- [Clerk Documentation](https://clerk.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Neon Database](https://neon.tech/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
