# 🚀 Vercel Deployment Guide

Complete guide to deploy your LMS to Vercel.

---

## Prerequisites

1. ✅ GitHub account
2. ✅ Vercel account (sign up at vercel.com)
3. ✅ Your project pushed to GitHub

---

## Step 1: Push to GitHub

If not already done:

```bash
# Initialize git (if needed)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - LMS with sample data"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push
git push -u origin main
```

---

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repository
5. Vercel will auto-detect Vite

**Configure Build Settings:**
- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

6. **Add Environment Variables** (CRITICAL!):

Click "Environment Variables" and add:

```
VITE_SUPABASE_URL=https://plslnsqlpdhyfghfvbpk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsc2xuc3FscGRoeWZnaGZ2YnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTkyODQsImV4cCI6MjA3ODE5NTI4NH0.I1QMKmZ9VutZC3QL8GhUfHMz5atEbgxRdu4E7l-jOXE
```

7. Click **"Deploy"**

8. Wait 1-2 minutes for deployment

9. ✅ Your app is live!

---

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? (enter name)
# - Directory? ./
# - Override settings? N

# Add environment variables
vercel env add VITE_SUPABASE_URL
# Paste: https://plslnsqlpdhyfghfvbpk.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsc2xuc3FscGRoeWZnaGZ2YnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTkyODQsImV4cCI6MjA3ODE5NTI4NH0.I1QMKmZ9VutZC3QL8GhUfHMz5atEbgxRdu4E7l-jOXE

# Deploy to production
vercel --prod
```

---

## Step 3: Verify Deployment

1. Open your Vercel URL (e.g., `your-app.vercel.app`)

2. Test teacher login:
   - Click "Enter as Teacher"
   - Email: `2301420015@krmu.edu.in`
   - Password: `sarthakl1`

3. Test student login:
   - Click "Enter as Student"
   - Email: `2301420002@krmu.edu.in`
   - Password: `sarthakl1`

4. ✅ Both should work with all sample data!

---

## Troubleshooting

### Issue: "Environment variables not found"

**Solution:** Make sure you added both env vars in Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. Redeploy: `vercel --prod` or trigger redeploy in dashboard

### Issue: "404 on page refresh"

**Solution:** Already fixed! The `vercel.json` file handles SPA routing.

### Issue: "Login not working"

**Solution:** 
1. Check browser console (F12) for errors
2. Verify environment variables are set in Vercel
3. Make sure you're using the correct credentials

### Issue: "Data not showing"

**Solution:**
1. All sample data is in the Supabase database
2. Make sure Supabase project is running
3. Check that env variables match your Supabase project

---

## Configuration Files

### vercel.json ✅
Already created with SPA routing support:
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### package.json ✅
Build scripts already configured:
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## Environment Variables Required

**CRITICAL:** These MUST be set in Vercel:

```env
VITE_SUPABASE_URL=https://plslnsqlpdhyfghfvbpk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsc2xuc3FscGRoeWZnaGZ2YnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTkyODQsImV4cCI6MjA3ODE5NTI4NH0.I1QMKmZ9VutZC3QL8GhUfHMz5atEbgxRdu4E7l-jOXE
```

**How to add in Vercel Dashboard:**
1. Go to your project in Vercel
2. Click "Settings" tab
3. Click "Environment Variables" in sidebar
4. Add each variable
5. Set scope to: Production, Preview, and Development
6. Click "Save"
7. Redeploy your project

---

## Post-Deployment Checklist

After deployment, verify:

- [ ] Home page loads
- [ ] Can navigate to login pages
- [ ] Teacher login works
- [ ] Student login works
- [ ] Teacher dashboard shows data (6 stats)
- [ ] Student dashboard shows data (courses)
- [ ] All tabs load without errors
- [ ] Page refresh works (no 404)
- [ ] All routes work correctly

---

## Continuous Deployment

Once set up, every push to your GitHub main branch will:
1. ✅ Automatically trigger a new build
2. ✅ Run tests (if configured)
3. ✅ Deploy to production
4. ✅ Update your live site

---

## Custom Domain (Optional)

To add a custom domain:

1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `lms.yourdomain.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-60 minutes)
6. ✅ Your app is live on your custom domain!

---

## Sample Data on Production

All sample data is already in your Supabase database and will work on Vercel:

✅ Teacher account: 2301420015@krmu.edu.in  
✅ Student account: 2301420002@krmu.edu.in  
✅ 3 courses  
✅ 6 assignments  
✅ 3 submissions  
✅ 18 attendance records  
✅ 4 announcements  
✅ 7 timetable entries  

Everything will work exactly like localhost!

---

## Quick Deploy Command

```bash
# One-command deploy (after setup)
vercel --prod
```

---

## 🎉 Success!

Your LMS is now live on Vercel with:
- ✅ Working authentication
- ✅ All sample data
- ✅ Teacher & student portals
- ✅ SPA routing
- ✅ Supabase integration
- ✅ Auto-deployments

**Share your Vercel URL with others to demo!** 🚀
