# Quick Deployment Guide 🚀

## Deploy Your App in 15 Minutes

### Step 1: Deploy Backend to Railway (5 min)

1. **Go to Railway**: https://railway.app/
2. **Sign up** with GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Select** your `jemcrud` repository
5. **Add Environment Variables**:
   ```
   DATABASE_HOST=mysql-ba2f967-gbox-3dee.g.aivencloud.com
   DATABASE_PORT=26297
   DATABASE_USER=avnadmin
   DATABASE_PASSWORD=<your-password>
   DATABASE_NAME=defaultdb
   DATABASE_SSL_MODE=REQUIRED
   DATABASE_SSL_CA_PATH=./ca-certificate.crt
   JWT_SECRET=<generate-a-strong-secret>
   JWT_REFRESH_SECRET=<generate-another-strong-secret>
   PORT=3000
   ```
6. **Deploy** - Railway will build automatically
7. **Copy your backend URL** (e.g., `https://jemcrud-production.up.railway.app`)

### Step 2: Configure Frontend (2 min)

1. **Edit** `client/.env.production`:
   ```
   VITE_API_URL=https://your-actual-backend-url.railway.app
   ```

2. **Commit changes**:
   ```bash
   git add .
   git commit -m "Configure for production deployment"
   git push
   ```

### Step 3: Deploy Frontend to Vercel (5 min)

1. **Go to Vercel**: https://vercel.com/
2. **Sign up** with GitHub
3. **Import Project** → Select your `jemcrud` repository
4. **Configure**:
   - Framework: **Vite**
   - Root Directory: **client**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Add Environment Variable**:
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-url.railway.app`
6. **Deploy** - Vercel will build automatically

### Step 4: Test (3 min)

1. **Open your Vercel URL**: `https://your-app.vercel.app`
2. **Register** a new account
3. **Login** and test CRUD operations
4. **Verify** everything works!

---

## Generate Strong Secrets

Use these commands to generate secure JWT secrets:

```bash
# Windows PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Troubleshooting

### Backend won't start on Railway?
- Check the deployment logs
- Verify all environment variables are set
- Make sure `ca-certificate.crt` is in the repository

### Frontend can't connect to backend?
- Check CORS errors in browser console (F12)
- Verify `VITE_API_URL` is set correctly in Vercel
- Make sure backend URL in `.env.production` matches Railway URL

### Database connection issues?
- Verify database credentials in Railway
- Check that SSL certificate is accessible
- Test database connection from Railway logs

---

## Custom Domain (Optional)

### Add custom domain to Vercel:
1. Go to Project Settings → Domains
2. Add your domain (e.g., `myapp.com`)
3. Update DNS records as instructed

### Add custom domain to Railway:
1. Go to Service Settings → Domains
2. Add your domain (e.g., `api.myapp.com`)
3. Update DNS records as instructed

---

## Cost

- ✅ **Railway**: FREE (500 hours/month)
- ✅ **Vercel**: FREE (unlimited for personal)
- ✅ **Total**: **$0/month** for hobby projects!

---

## Support

Need help? Check:
- Railway docs: https://docs.railway.app/
- Vercel docs: https://vercel.com/docs
- NestJS docs: https://docs.nestjs.com/

---

**That's it!** Your full-stack app is now live! 🎉
