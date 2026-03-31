# 🎓 LMS Demo Web App

A complete Learning Management System demo with mock data - perfect for project demonstrations!

## ✨ Key Features

- **NO Real Database** - All data is mock/sample
- **Login with Anything** - Use any email/password combination
- **Fully Functional UI** - Complete teacher and student portals
- **Ready to Deploy** - Works on Vercel with zero configuration
- **No Setup Required** - Just npm install and run!

## 🚀 Quick Start

```bash
# Install
npm install

# Run locally
npm run dev

# Build
npm run build
```

Visit `http://localhost:5173`

## 🔐 Login

Just use **any** email and **any** password!

**Teacher Portal:**
- Click "Enter as Teacher"
- Email: `anything@example.com`
- Password: `anything`

**Student Portal:**
- Click "Enter as Student"
- Email: `student@test.com`
- Password: `test123`

## 📊 What's Included

### Teacher Dashboard
- Manage 3 courses
- 6 assignments with submissions
- 135 total students
- Grade submissions
- Track attendance
- Post announcements
- View timetable

### Student Dashboard  
- 3 enrolled courses
- Assignment tracking
- View grades (95% avg)
- Attendance records
- Class schedule
- Read announcements

## 🌐 Deploy to Vercel

1. Push code to GitHub
2. Import repository in Vercel
3. Click Deploy
4. **That's it!** No environment variables needed

## 💡 Perfect For

- Project presentations
- Portfolio demonstrations
- UI/UX showcases
- Learning React/TypeScript
- Quick prototypes
- School/college projects

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Mock Data** - No backend needed!

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
├── contexts/        # Auth context with mock auth
├── lib/            
│   ├── mockAuth.ts  # Mock authentication system
│   └── mockData.ts  # All sample data
├── pages/
│   ├── auth/       # Login pages
│   ├── teacher/    # Teacher portal pages
│   └── student/    # Student portal pages
└── App.tsx         # Main app component
```

## 🎯 No Database Setup

This app uses **mock data stored in memory**. No Supabase, PostgreSQL, or any database required!

All data resets when you refresh the page - perfect for demos!

## 📝 License

Free to use for any project, demonstration, or learning purpose!

---

Built with ❤️ for easy project demonstrations
