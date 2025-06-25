# MusicPro Rehearsal Planner

A comprehensive web application for music groups to efficiently schedule rehearsals, track attendance, and manage repertoire.

## Features

- **User Management**: Registration, authentication, and role-based access
- **Group Management**: Create and manage musical groups/ensembles
- **Smart Scheduling**: Create rehearsal events with intelligent conflict detection
- **Availability Management**: Members set availability for optimal scheduling
- **Attendance Tracking**: RSVP and attendance history reporting
- **Notifications**: Email and in-app alerts for schedule changes
- **Repertoire Management**: Track practice materials and music progress
- **Mobile-Responsive**: Fully functional on all devices

## Technology Stack

### Frontend
- React.js with Next.js
- Redux Toolkit for state management
- Material-UI for components
- Tailwind CSS for styling
- FullCalendar for calendar views

### Backend
- Node.js with Express.js
- RESTful API architecture
- JWT authentication
- PostgreSQL database with Prisma ORM

### DevOps
- Docker containerization
- CI/CD with GitHub Actions
- Vercel/Railway for hosting

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL (v14+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/musicpro-rehearsal-planner.git
cd musicpro-rehearsal-planner
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
```bash
# Create .env files in both frontend and backend directories
# See .env.example for required variables
```

4. Set up the database
```bash
# In the backend directory
npx prisma migrate dev
```

5. Start development servers
```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm run dev
```

6. Access the application at http://localhost:3000

## Project Structure

```
musicpro-rehearsal-planner/
├── backend/                  # Backend API server
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Express middleware
│   │   ├── models/           # Prisma schema and models
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   └── utils/            # Helper functions
│   ├── prisma/               # Database schema and migrations
│   └── tests/                # Backend tests
├── frontend/                 # React frontend
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── hooks/            # Custom hooks
│   │   ├── pages/            # Next.js pages
│   │   ├── redux/            # Redux store and slices
│   │   ├── services/         # API services
│   │   ├── styles/           # Global styles
│   │   └── utils/            # Utility functions
│   └── tests/                # Frontend tests
├── docs/                     # Documentation
└── docker/                   # Docker configuration
```

## API Documentation

The API follows RESTful principles with the following main endpoints:

- `/api/auth` - Authentication endpoints
- `/api/users` - User management
- `/api/groups` - Group/ensemble management
- `/api/rehearsals` - Rehearsal scheduling
- `/api/availability` - Availability management
- `/api/attendance` - Attendance tracking
- `/api/repertoire` - Repertoire management

Detailed API documentation is available at `/api/docs` when running the development server.

## Deployment

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Manual Deployment

The application can be deployed separately:
- Frontend: Deploy to Vercel or similar static hosting
- Backend: Deploy to Railway, Heroku, or any Node.js hosting
- Database: Use a managed PostgreSQL service like Neon

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Material-UI](https://mui.com/)
- [FullCalendar](https://fullcalendar.io/)