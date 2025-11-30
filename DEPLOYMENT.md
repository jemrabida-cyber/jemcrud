# Deployment Guide

## Overview
This guide covers deploying your full-stack application with:
- **Frontend (React)**: Vercel
- **Backend (NestJS)**: Railway.app (recommended) or Render.com

---

## Part 1: Deploy Backend to Railway.app

### Step 1: Prepare Backend for Production

1. **Update CORS settings** in `src/main.ts` to allow your Vercel domain:

```typescript
app.enableCors({
  origin: [
    /^http:\/\/localhost:\d+$/,
    'https://your-app.vercel.app', // Add your Vercel domain
    /^https:\/\/.*\.vercel\.app$/, // Allow all Vercel preview deployments
  ],
  credentials: true,
});
```

2. **Create `.env.production` file** (optional):
```env
# Production environment variables
NODE_ENV=production
PORT=3000
```

3. **Add start script** to `package.json` (already exists):
```json
"scripts": {
  "start": "node dist/main",
  "start:prod": "node dist/main",
  "build": "nest build"
}
```

### Step 2: Deploy to Railway.app

1. **Create Railway account**: Go to https://railway.app/ and sign up

2. **Create new project**:
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Connect your GitHub account
   - Select your `jemcrud` repository

3. **Configure environment variables** in Railway:
   - Click on your service → "Variables" tab
   - Add all variables from your `.env` file:
     ```
     DATABASE_HOST=mysql-ba2f967-gbox-3dee.g.aivencloud.com
     DATABASE_PORT=26297
     DATABASE_USER=avnadmin
     DATABASE_PASSWORD=<your-password>
     DATABASE_NAME=defaultdb
     DATABASE_SSL_MODE=REQUIRED
     DATABASE_SSL_CA_PATH=./ca-certificate.crt
     JWT_SECRET=<your-secret>
     JWT_REFRESH_SECRET=<your-refresh-secret>
     PORT=3000
     ```

4. **Configure build settings**:
   - Railway auto-detects Node.js
   - Build command: `npm install && npm run build`
   - Start command: `npm run start:prod`

5. **Upload SSL certificate**:
   - In Railway, go to your service settings
   - Under "Files", upload your `ca-certificate.crt`
   - Or use Railway's file system to add it

6. **Deploy**:
   - Railway will automatically deploy
   - You'll get a URL like: `https://your-app.railway.app`

7. **Test your backend**:
   ```bash
   curl https://your-app.railway.app/health
   ```

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Prepare Frontend

1. **Update API base URL** in `client/src/services/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? 'http://localhost:3000' : 'https://your-backend.railway.app');

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
```

2. **Create `client/.env.production` file**:
```env
VITE_API_URL=https://your-backend.railway.app
```

3. **Create `client/vercel.json` file** for SPA routing:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel CLI

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy from client folder**:
```bash
cd client
vercel
```

4. **Follow the prompts**:
   - Set up and deploy? `Y`
   - Which scope? Select your account
   - Link to existing project? `N`
   - Project name? `jemcrud-client`
   - In which directory is your code? `./`
   - Want to override settings? `Y`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Development command: `npm run dev`

5. **Set environment variables**:
```bash
vercel env add VITE_API_URL
# Enter: https://your-backend.railway.app
```

6. **Deploy to production**:
```bash
vercel --prod
```

#### Option B: Deploy via Vercel Dashboard

1. **Go to Vercel dashboard**: https://vercel.com/

2. **Import project**:
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure project**:
   - Framework Preset: `Vite`
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Add environment variables**:
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend.railway.app`

5. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy automatically

---

## Part 3: Alternative - Deploy Backend to Render.com

### Render.com Setup

1. **Create Render account**: https://render.com/

2. **Create new Web Service**:
   - Connect your GitHub repository
   - Name: `jemcrud-backend`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`

3. **Add environment variables** (same as Railway)

4. **Deploy**:
   - Render will give you a URL: `https://jemcrud-backend.onrender.com`

**Note**: Render's free tier spins down after inactivity, causing cold starts.

---

## Part 4: Update Frontend to Use Backend URL

After deploying backend, update your frontend API configuration:

1. **Edit `client/src/services/api.ts`**:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-actual-backend-url.railway.app';
```

2. **Redeploy frontend**:
```bash
cd client
vercel --prod
```

---

## Testing Deployment

1. **Test backend health**:
   ```bash
   curl https://your-backend.railway.app/health
   ```

2. **Test backend auth**:
   ```bash
   curl -X POST https://your-backend.railway.app/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"username":"testuser","password":"test123","email":"test@test.com"}'
   ```

3. **Open frontend**:
   - Visit your Vercel URL: `https://your-app.vercel.app`
   - Try to register and login
   - Test CRUD operations

---

## Troubleshooting

### CORS Issues
- Make sure backend CORS includes your Vercel domain
- Check browser console for CORS errors

### Database Connection Issues
- Verify all database environment variables are set correctly
- Ensure SSL certificate is uploaded/accessible
- Check Railway/Render logs for connection errors

### Build Failures
- Check build logs in Vercel/Railway dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation succeeds locally

### Environment Variables Not Working
- Use `VITE_` prefix for all frontend env vars
- Restart/redeploy after adding new env vars
- Check that vars are set for "Production" environment

---

## Cost Estimate

- **Railway**: Free tier (500 hours/month, $5 credit)
- **Render**: Free tier (750 hours/month)
- **Vercel**: Free tier (unlimited for personal projects)
- **Aiven MySQL**: Current free trial

**Total**: FREE for hobby projects!

---

## Automatic Deployments

Both Vercel and Railway support automatic deployments:

1. **Push to GitHub** → Automatically deploys
2. **Pull Request** → Creates preview deployment
3. **Merge to main** → Deploys to production

Configure in:
- Railway: Settings → GitHub integration
- Vercel: Project Settings → Git

---

## Security Checklist

Before deploying to production:

- [ ] Use strong JWT secrets (not 'dev-secret')
- [ ] Enable rate limiting on backend
- [ ] Use HTTPS only (automatic on Vercel/Railway)
- [ ] Sanitize user inputs
- [ ] Keep database credentials secure
- [ ] Regular dependency updates
- [ ] Enable CORS only for your domains
- [ ] Use environment variables for all secrets

---

## Next Steps

1. Deploy backend to Railway.app
2. Get backend URL
3. Update frontend API configuration
4. Deploy frontend to Vercel
5. Test the full application
6. Set up custom domain (optional)

Good luck with your deployment! 🚀
