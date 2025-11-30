# Quick Render Setup Guide

## Environment Variables - Copy/Paste Ready

Open the `.env.render` file and copy these variables to Render:

### Method 1: One-by-One (Recommended)

1. Open Render Dashboard → Your Service → **Settings** → **Environment**
2. Click **"Add Environment Variable"**
3. For each variable in `.env.render`:
   - Copy the **KEY** (text before `=`)
   - Paste into "Key" field
   - Copy the **VALUE** (text after `=`)
   - Paste into "Value" field
   - Click "Save"

### Method 2: Bulk Import (If Available)

Some Render plans allow bulk import:
1. Click "Add from .env"
2. Copy all contents from `.env.render`
3. Paste and save

---

## Complete List (for reference):

```
DATABASE_HOST=mysql-ba2f967-gbox-3dee.g.aivencloud.com
DATABASE_PORT=26297
DATABASE_USER=avnadmin
DATABASE_PASSWORD=<YOUR_AIVEN_PASSWORD_HERE>
DATABASE_NAME=defaultdb
DATABASE_SSL_MODE=REQUIRED
DATABASE_SSL_CA_PATH=./ca-certificate.crt
JWT_SECRET=40aa43a4f39957f4c499fc159f1a819f04a5b42a9aaecd361a6620edd113e5aa
JWT_REFRESH_SECRET=80dd3ec92f534a15836ad604f9855930c84fe9b4a56f02846132b56eab092b01
PORT=10000
NODE_ENV=production
```

**Replace** `<YOUR_AIVEN_PASSWORD_HERE>` with your actual Aiven password from your `.env` file.

---

## After Adding Variables:

1. ✅ Save all environment variables
2. ✅ Go to "Manual Deploy" → "Deploy latest commit"
3. ✅ Watch build logs
4. ✅ Backend should deploy successfully!

---

## Your Backend URL

After deployment, your backend will be at:
```
https://jemcrud-backend-XXXX.onrender.com
```

Copy this URL - you'll need it for Vercel frontend deployment!
