# 🔧 Troubleshooting Guide

## Blank White Screen on Vercel

If you see a blank white screen after deploying to Vercel, this is **almost always** caused by missing environment variables.

---

### ✅ Solution: Add Environment Variables

1. **Go to Vercel Dashboard**
   - Open your project in Vercel
   - Click **Settings** tab
   - Click **Environment Variables** in sidebar

2. **Add Both Variables**

   **Variable 1:**
   ```
   Name: VITE_SUPABASE_URL
   Value: https://plslnsqlpdhyfghfvbpk.supabase.co
   ```

   **Variable 2:**
   ```
   Name: VITE_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsc2xuc3FscGRoeWZnaGZ2YnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTkyODQsImV4cCI6MjA3ODE5NTI4NH0.I1QMKmZ9VutZC3QL8GhUfHMz5atEbgxRdu4E7l-jOXE
   ```

3. **Set Scope**
   - Check all three: Production, Preview, Development

4. **Redeploy**
   - Go to Deployments tab
   - Click the three dots (...) on latest deployment
   - Click "Redeploy"

5. **Wait & Test**
   - Wait 1-2 minutes for deployment
   - Refresh your Vercel URL
   - ✅ Should now work!

---

## Summary

**90% of blank screen issues = missing env vars**

1. Add VITE_SUPABASE_URL in Vercel
2. Add VITE_SUPABASE_ANON_KEY in Vercel  
3. Redeploy
4. ✅ It works!
