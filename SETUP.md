# 🚀 Quick Setup Guide - JemCRUD Application

## Step-by-Step Setup Instructions

### 1️⃣ Install Dependencies

#### Backend (Root Directory)
```powershell
npm install
```

#### Frontend (Client Directory)
```powershell
cd client
npm install
cd ..
```

---

### 2️⃣ Database Setup

1. **Create MySQL Database:**
```sql
CREATE DATABASE jemcrud;
```

2. **Configure Database Connection:**
   - Copy `.env.example` to `.env`
   - Update the following values in `.env`:
```env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=your_mysql_username
DATABASE_PASSWORD=your_mysql_password
DATABASE_NAME=jemcrud
JWT_SECRET=your_super_secret_key_here
```

> **Note:** The tables will be created automatically when you start the backend server!

---

### 3️⃣ Start the Application

#### Option A: Using PowerShell Script (Recommended)
```powershell
.\start-dev.ps1
```

#### Option B: Manual Start

**Terminal 1 - Backend:**
```powershell
npm run start:dev
```

**Terminal 2 - Frontend:**
```powershell
cd client
npm run dev
```

---

### 4️⃣ Access the Application

Once both servers are running:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000

---

## 🎯 First Steps After Setup

1. **Register a New Account:**
   - Go to http://localhost:5173/register
   - Create your account

2. **Login:**
   - Use your credentials to login
   - You'll be redirected to the Positions Management page

3. **Try CRUD Operations:**
   - Click "Add New Position" to create a position
   - Edit or delete existing positions
   - See real-time updates!

---

## 🐛 Troubleshooting

### Backend won't start?
- ✅ Check if MySQL is running
- ✅ Verify database credentials in `.env`
- ✅ Make sure port 3000 is not in use

### Frontend won't start?
- ✅ Make sure you ran `npm install` in the `client` directory
- ✅ Check if port 5173 is available

### Can't login?
- ✅ Make sure backend is running
- ✅ Check browser console for errors
- ✅ Verify database connection

### CORS errors?
- ✅ Backend should have CORS enabled by default
- ✅ Make sure you're using http://localhost:5173

---

## 📚 Additional Information

### Available Backend Endpoints:

**Authentication:**
- POST `/auth/signup` - Register
- POST `/auth/login` - Login

**Positions (Requires Authentication):**
- GET `/positions` - List all
- GET `/positions/:id` - Get one
- POST `/positions` - Create
- PATCH `/positions/:id` - Update
- DELETE `/positions/:id` - Delete

### Technologies Used:

**Backend:**
- NestJS
- TypeScript
- MySQL
- JWT
- bcrypt

**Frontend:**
- React 18
- TypeScript
- Vite
- React Router v6
- Axios

---

## 🎨 Features

✨ User Authentication (Login/Register)
✨ JWT Token-based Security
✨ Protected Routes
✨ Full CRUD Operations
✨ Responsive Design
✨ Form Validation
✨ Error Handling
✨ Modal Dialogs
✨ Real-time Updates

---

## 📝 Default Test Credentials

After registration, you can use any credentials you created.

Example:
- Username: `testuser`
- Password: `password123`

---

## 🚀 Next Steps

- Customize the styles in `client/src/styles/`
- Add more features to the Positions model
- Deploy to production
- Add more modules (e.g., Users management)

---

## 📞 Need Help?

Check the main README.md for more detailed information!

Happy Coding! 🎉
