#!/bin/bash

echo "🚀 Starting College Connect LMS..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create .env with your Supabase credentials."
    exit 1
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check build
echo "🔨 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "🌐 Starting development server..."
    echo "📱 Open http://localhost:5173 in your browser"
    echo ""
    npm run dev
else
    echo "❌ Build failed! Check errors above."
    exit 1
fi
