# Deployment Guide - Render + Vercel + Aiven

## Your Setup
- **Backend**: Render.com (Node.js hosting)
- **Frontend**: Vercel (React hosting)
- **Database**: Aiven MySQL (already configured ✅)

---

## Part 1: Deploy Backend to Render.com

### Step 1: Prepare for Deployment

Your backend is already configured! Just need to ensure production settings.

### Step 2: Deploy to Render

1. **Go to Render Dashboard**: https://dashboard.render.com/

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub account if not connected
   - Select your `jemcrud` repository

3. **Configure Web Service**:
   ```
   Name: jemcrud-backend
   Region: Choose closest to you (e.g., Oregon, Frankfurt)
   Branch: main
   Root Directory: (leave blank - uses root)
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: npm run start:prod
   Instance Type: Free
   ```

4. **Add Environment Variables**:
   
   Click "Advanced" → "Add Environment Variable" and add these **as text values**:

   ```
   DATABASE_HOST=mysql-ba2f967-gbox-3dee.g.aivencloud.com
   DATABASE_PORT=26297
   DATABASE_USER=avnadmin
   DATABASE_PASSWORD=<your-aiven-password>
   DATABASE_NAME=defaultdb
   DATABASE_SSL_MODE=REQUIRED
   DATABASE_SSL_CA_PATH=./ca-certificate.crt
   JWT_SECRET=<generate-strong-secret>
   JWT_REFRESH_SECRET=<generate-strong-secret>
   PORT=10000
   NODE_ENV=production
   ```
   
   **⚠️ Important:** For `DATABASE_SSL_CA_PATH`, just enter the text `./ca-certificate.crt` (the file path). Do NOT paste the certificate content. The actual certificate file is already in your repository.

   **Generate strong secrets**:
   ```powershell
   # Run in PowerShell to generate random secrets
   -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
   ```

5. **Add SSL Certificate File**:
   
   Your `ca-certificate.crt` is already in your repository, so Render will have access to it automatically. ✅

6. **Create Web Service**:
   - Click "Create Web Service"
   - Render will start building and deploying
   - Wait 2-5 minutes for first deployment

7. **Get Your Backend URL**:
   - After deployment, you'll see: `https://jemcrud-backend.onrender.com`
   - Copy this URL - you'll need it for frontend!

8. **Test Backend**:
   ```powershell
   # Test health endpoint
   Invoke-RestMethod -Uri "https://jemcrud-backend.onrender.com/health"
   
   # Test signup
   $body = @{ username='testuser'; password='test123'; email='test@test.com' } | ConvertTo-Json
   Invoke-RestMethod -Uri "https://jemcrud-backend.onrender.com/auth/signup" -Method Post -ContentType 'application/json' -Body $body
   ```

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Update Frontend Configuration

1. **Update** `client/.env.production`:
   ```
   VITE_API_URL=https://jemcrud-backend.onrender.com
   ```
   (Replace with your actual Render URL)

2. **Commit changes**:
   ```powershell
   git add .
   git commit -m "Configure for Render deployment"
   git push origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com/

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Click "Import" next to your `jemcrud` repository
   - If not connected, connect your GitHub account

3. **Configure Project**:
   ```
   Project Name: jemcrud
   Framework Preset: Vite
   Root Directory: client
   Build Command: npm run build (auto-detected)
   Output Directory: dist (auto-detected)
   Install Command: npm install (auto-detected)
   ```

4. **Environment Variables**:
   - Click "Environment Variables"
   - Add variable:
     - Key: `VITE_API_URL`
     - Value: `https://jemcrud-backend.onrender.com`
   - Select: Production, Preview, Development (all)

5. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy (takes 1-2 minutes)
   - You'll get URL: `https://jemcrud.vercel.app` (or similar)

### Step 3: Update Backend CORS (Important!)

After you get your Vercel URL, update backend to allow it:

1. The CORS is already configured to accept `*.vercel.app` domains ✅
2. If you have a custom domain, add it to Render environment variables:
   ```
   FRONTEND_URL=https://your-custom-domain.com
   ```

---

## Part 3: Test Your Deployment

1. **Open Frontend**: Visit `https://jemcrud.vercel.app`

2. **Register New Account**:
   - Click "Register"
   - Fill in details
   - Submit

3. **Login**:
   - Use your credentials
   - Should redirect to positions page

4. **Test CRUD Operations**:
   - ✅ View positions
   - ✅ Add new position
   - ✅ Edit position
   - ✅ Delete position

---

## Important Notes About Render Free Tier

### ⚠️ Cold Start Warning

Render's **free tier spins down after 15 minutes of inactivity**:
- First request after inactivity takes **30-60 seconds** to wake up
- Subsequent requests are fast
- This is normal for free tier

### Solutions:

**Option 1: Accept Cold Starts** (Free)
- Just wait 30-60 seconds on first load
- Subsequent requests are instant

**Option 2: Keep-Alive Service** (Free)
- Use a service like UptimeRobot to ping your backend every 10 minutes
- Keeps service warm and responsive
- Setup: https://uptimerobot.com/

**Option 3: Upgrade to Paid** ($7/month)
- Eliminates cold starts completely
- Service stays always-on

---

## Automatic Deployments

Both platforms support auto-deploy on git push:

✅ **Render**:
- Push to `main` branch → Automatically deploys backend
- Check deployment status in Render dashboard

✅ **Vercel**:
- Push to `main` branch → Automatically deploys frontend
- Pull requests create preview deployments

---

## Environment Variables Quick Reference

### Render (Backend):
```
DATABASE_HOST=mysql-ba2f967-gbox-3dee.g.aivencloud.com
DATABASE_PORT=26297
DATABASE_USER=avnadmin
DATABASE_PASSWORD=<your-password>
DATABASE_NAME=defaultdb
DATABASE_SSL_MODE=REQUIRED
DATABASE_SSL_CA_PATH=./ca-certificate.crt
```
**Note:** `DATABASE_SSL_CA_PATH` is the file path (text: `./ca-certificate.crt`), not the certificate content.

```
JWT_SECRET=<32-char-random-string>
JWT_REFRESH_SECRET=<32-char-random-string>
PORT=10000
NODE_ENV=production
```

### Vercel (Frontend):
```
VITE_API_URL=https://jemcrud-backend.onrender.com
```

---

## Troubleshooting

### Backend deployment fails on Render?
- Check build logs in Render dashboard
- Verify Node.js version compatibility
- Ensure `package.json` has `start:prod` script

### Frontend can't connect to backend?
- Open browser console (F12) to check errors
- Verify CORS errors - backend should allow `*.vercel.app`
- Check that `VITE_API_URL` is set correctly in Vercel
- Try accessing backend URL directly to verify it's running

### Database connection errors?
- Verify all Aiven credentials are correct in Render
- Check that `ca-certificate.crt` exists in repository
- Look at Render logs for specific error messages

### 500 Internal Server Error?
- Check Render logs: Dashboard → Your Service → Logs
- Look for database connection issues
- Verify JWT secrets are set

### Slow first load (30-60 seconds)?
- This is normal for Render free tier cold starts
- Consider using UptimeRobot to keep it warm
- Or upgrade to paid tier ($7/month)

---

## Monitoring Your App

### Render Dashboard:
- View logs: Real-time server logs
- Metrics: CPU, Memory usage
- Events: Deployment history

### Vercel Dashboard:
- Analytics: Page views, performance
- Deployments: Build history
- Logs: Function logs

---

## Cost Summary

✅ **Render**: FREE (750 hours/month)
✅ **Vercel**: FREE (unlimited for personal projects)
✅ **Aiven**: FREE trial (check trial duration)

**Total**: **$0/month** during free tiers!

---

## Next Steps After Deployment

1. **Custom Domain** (Optional):
   - Add custom domain in Vercel for frontend
   - Add custom domain in Render for backend
   - Update DNS records

2. **Set Up Monitoring**:
   - UptimeRobot for uptime monitoring
   - Render logs for error tracking

3. **Security**:
   - Ensure JWT secrets are strong and unique
   - Keep dependencies updated
   - Monitor Aiven database security

4. **Backup Strategy**:
   - Aiven provides automated backups
   - Export important data regularly

---

## Quick Commands

**Generate JWT Secret**:
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

**Test Backend**:
```powershell
Invoke-RestMethod -Uri "https://your-backend.onrender.com/health"
```

**View Render Logs**:
```
Dashboard → Your Service → Logs (real-time)
```

---

## Support Resources

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Aiven Docs: https://aiven.io/docs

---

**Ready to deploy?** Follow the steps above and your app will be live in 15-20 minutes! 🚀
