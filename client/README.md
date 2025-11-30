# JemCRUD - React Login System with CRUD

A full-stack application with NestJS backend and React frontend featuring authentication and CRUD operations for managing positions.

## Features

### Authentication
- ✅ User Registration
- ✅ User Login
- ✅ JWT Token-based Authentication
- ✅ Protected Routes
- ✅ Auto Logout on Token Expiry

### CRUD Operations
- ✅ Create new positions
- ✅ Read/List all positions
- ✅ Update existing positions
- ✅ Delete positions
- ✅ Real-time table updates

### UI/UX
- 🎨 Modern, responsive design
- 📱 Mobile-friendly interface
- ⚡ Smooth animations and transitions
- 🎯 User-friendly forms with validation
- 🔔 Error handling and user feedback

## Project Structure

```
jemcrud/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Positions.tsx
│   │   │   ├── PositionForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── context/       # React context
│   │   │   └── AuthContext.tsx
│   │   ├── services/      # API services
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   └── positionsService.ts
│   │   ├── styles/        # CSS styles
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── src/                   # NestJS Backend
│   ├── auth/             # Authentication module
│   ├── positions/        # Positions CRUD module
│   ├── guards/           # JWT guards
│   └── main.ts
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MySQL database
- npm or yarn

### Backend Setup

1. Install backend dependencies:
```powershell
npm install
```

2. Create a `.env` file in the root directory:
```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=jemcrud
JWT_SECRET=your_secret_key_here
```

3. Start the backend server:
```powershell
npm run start:dev
```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the client directory:
```powershell
cd client
```

2. Install frontend dependencies:
```powershell
npm install
```

3. Start the development server:
```powershell
npm run dev
```

The frontend will run on `http://localhost:5173`

## Usage

### 1. Register a New Account
- Navigate to `http://localhost:5173/register`
- Fill in username, email (optional), and password
- Click "Register"

### 2. Login
- Navigate to `http://localhost:5173/login`
- Enter your username and password
- Click "Login"

### 3. Manage Positions
After logging in, you'll be redirected to the Positions Management page where you can:

- **Create**: Click "Add New Position" button
- **Read**: View all positions in the table
- **Update**: Click "Edit" button on any position
- **Delete**: Click "Delete" button on any position

### 4. Logout
- Click the "Logout" button in the header

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user

### Positions (Protected)
- `GET /positions` - Get all positions
- `GET /positions/:id` - Get single position
- `POST /positions` - Create new position
- `PATCH /positions/:id` - Update position
- `DELETE /positions/:id` - Delete position

## Technologies Used

### Frontend
- React 18
- TypeScript
- React Router DOM v6
- Axios
- Vite
- CSS3

### Backend
- NestJS
- TypeScript
- JWT Authentication
- MySQL
- bcrypt

## Screenshots

The application includes:
- Modern login/register forms
- Responsive data table
- Modal forms for create/edit
- Beautiful gradient background
- Smooth animations

## Development

### Build for Production

Backend:
```powershell
npm run build
npm run start:prod
```

Frontend:
```powershell
cd client
npm run build
```

The production build will be in the `client/dist` directory.

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Secure HTTP-only cookies (can be configured)
- Input validation
- Error handling

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License.
