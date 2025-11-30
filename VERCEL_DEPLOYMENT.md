# 🚀 Deploy Frontend to Vercel

## Prerequisites
✅ Backend must be running on Render first!
✅ Get your Render backend URL (e.g., `https://jemcrud-backend-xxxx.onrender.com`)

## Step-by-Step Vercel Deployment

### 1. Get Your Backend URL from Render

1. Go to **Render Dashboard**
2. Click on your **backend service**
3. Look for the **URL** at the top (e.g., `https://jemcrud-backend-xxxx.onrender.com`)
4. **Copy this URL** - you'll need it for Vercel

### 2. Update Frontend Environment File

Before deploying, update the production environment file:

```bash
# Navigate to client folder
cd client

# Edit .env.production and replace the placeholder with your actual Render URL
```

**Edit `client/.env.production`:**
```
VITE_API_URL=https://your-actual-render-backend-url.onrender.com
```

**Commit the change:**
```bash
git add .env.production
git commit -m "Update production API URL"
git push origin main
```

### 3. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Easiest)

1. **Go to**: https://vercel.com/
2. Click **"Add New..."** → **"Project"**
3. **Import** your GitHub repository: `jemrabida-cyber/jemcrud`
4. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `client` ⚠️ IMPORTANT!
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
5. **Add Environment Variable**:
   - Click **"Environment Variables"**
   - **Name**: `VITE_API_URL`
   - **Value**: Your Render backend URL (e.g., `https://jemcrud-backend-xxxx.onrender.com`)
6. Click **"Deploy"**
7. Wait 2-3 minutes for deployment

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to client folder
cd client

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

When prompted:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **jemcrud** (or your preferred name)
- Directory? **./client**
- Override settings? **N**

### 4. Configure Environment Variable (if using CLI)

After first deployment:

```bash
# Set environment variable
vercel env add VITE_API_URL

# When prompted, enter your Render backend URL
# Choose "Production" environment
```

Then redeploy:
```bash
vercel --prod
```

## 🎯 After Deployment

### Test Your Production App

1. **Open your Vercel URL** (e.g., `https://jemcrud.vercel.app`)
2. **Test Registration**:
   - Click "Register"
   - Create a new account
   - Should redirect to login
3. **Test Login**:
   - Enter credentials
   - Should redirect to positions page
4. **Test CRUD Operations**:
   - View positions
   - Add new position
   - Edit position
   - Delete position

### Common Issues

#### 1. "Network Error" or API not connecting
- ✅ Check `VITE_API_URL` is set correctly in Vercel
- ✅ Ensure backend URL ends without trailing slash
- ✅ Check backend is running on Render (visit backend URL in browser)
- ✅ Check CORS settings in backend allow Vercel domain

#### 2. Backend CORS Error
Your backend already allows `*.vercel.app`, but if you need to add specific domain:

Edit `src/main.ts`:
```typescript
app.enableCors({
  origin: [
    'http://localhost:5173',
    'https://*.vercel.app',
    'https://your-specific-domain.vercel.app' // Add your actual domain
  ],
  credentials: true,
});
```

#### 3. 401 Unauthorized on all requests
- ✅ Clear browser localStorage
- ✅ Register a new account
- ✅ Check JWT tokens are being stored

#### 4. Backend is slow (cold start)
- Render free tier spins down after 15 minutes
- First request takes 30-60 seconds
- Solution: Upgrade to paid tier OR use UptimeRobot to ping every 10 minutes

## 🔄 Updating Your Deployment

Whenever you make changes:

```bash
# Make your changes
# Commit and push to GitHub
git add .
git commit -m "Your update message"
git push origin main

# Vercel auto-deploys from GitHub (if connected)
# Or manually redeploy with CLI
vercel --prod
```

## 📊 Monitor Your Deployments

### Vercel Dashboard
- **Deployments**: See all deployment history
- **Logs**: View build and runtime logs
- **Analytics**: Track usage (paid feature)

### Render Dashboard
- **Logs**: View backend logs
- **Metrics**: CPU, memory usage
- **Events**: Deployment history

## 🎉 Success!

Your full-stack app is now live:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`

Share your production URL and start using your app! 🚀

---

## Next Steps (Optional)

1. **Custom Domain**: Add your own domain in Vercel settings
2. **Environment Separation**: Create staging environment
3. **Monitoring**: Set up error tracking (Sentry)
4. **Analytics**: Add Google Analytics
5. **SEO**: Add meta tags and Open Graph images
