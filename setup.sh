#!/bin/bash

# Setup script para desarrollo local

echo "🚀 Kōdo Development Setup"
echo "========================"

# Backend setup
echo "📦 Setting up backend..."
cd backend

# Check Python version
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Please install Python 3.9+"
    exit 1
fi

# Create venv
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate venv
source venv/bin/activate || . venv\Scripts\activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Copy .env
if [ ! -f ".env" ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
fi

cd ..

# Frontend setup
echo "📦 Setting up frontend..."
cd frontend

# Check Node version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

# Install dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
fi

# Copy .env
if [ ! -f ".env" ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
fi

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "  1. Backend: cd backend && python main.py"
echo "  2. Frontend: cd frontend && npm run dev"
echo ""
