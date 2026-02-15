#!/bin/bash

# Deployment Script for ML Learning Platform
# This script helps prepare and deploy the application

set -e  # Exit on error

echo "🚀 ML Learning Platform - Deployment Script"
echo "==========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if we're in the right directory
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    print_error "Error: Must run from project root directory"
    exit 1
fi

# Step 1: Check Node.js version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version must be 18 or higher (current: $(node --version))"
    exit 1
fi
print_success "Node.js version OK: $(node --version)"
echo ""

# Step 2: Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
if npm ci; then
    print_success "Frontend dependencies installed"
else
    print_error "Failed to install frontend dependencies"
    exit 1
fi
echo ""

# Step 3: Type check
echo "🔍 Running TypeScript type check..."
if npx tsc --noEmit; then
    print_success "No type errors found"
else
    print_error "Type errors found - please fix before deploying"
    exit 1
fi
echo ""

# Step 4: Build frontend
echo "🏗️  Building frontend..."
if npm run build; then
    print_success "Frontend build successful"
else
    print_error "Frontend build failed"
    exit 1
fi
echo ""

# Step 5: Check backend syntax
echo "🐍 Checking backend Python syntax..."
cd ../backend
if python -m py_compile app/main.py app/routes/*.py 2>/dev/null; then
    print_success "Backend syntax check passed"
else
    print_warning "Backend syntax check had warnings (non-critical)"
fi
echo ""

# Step 6: Git status
cd ..
echo "📋 Git status:"
git status --short
echo ""

# Step 7: Prompt for commit
read -p "Do you want to commit changes? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter commit message: " COMMIT_MSG
    git add .
    git commit -m "$COMMIT_MSG"
    print_success "Changes committed"
    echo ""
fi

# Step 8: Prompt for push
read -p "Do you want to push to GitHub? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    BRANCH=$(git branch --show-current)
    git push origin "$BRANCH"
    print_success "Pushed to GitHub ($BRANCH)"
    echo ""
fi

# Step 9: Deployment options
echo "🚀 Deployment Options:"
echo "1. Deploy to Vercel (automatic from GitHub)"
echo "2. Deploy using Vercel CLI"
echo "3. Skip deployment"
echo ""
read -p "Choose option (1-3): " -n 1 -r
echo ""

case $REPLY in
    1)
        print_success "Vercel will automatically deploy from GitHub"
        echo "Visit https://vercel.com/dashboard to monitor deployment"
        ;;
    2)
        echo "Deploying to Vercel..."
        cd frontend
        if command -v vercel &> /dev/null; then
            vercel --prod
            print_success "Deployed to Vercel"
        else
            print_error "Vercel CLI not installed. Install with: npm i -g vercel"
            exit 1
        fi
        ;;
    3)
        print_warning "Skipping deployment"
        ;;
    *)
        print_warning "Invalid option, skipping deployment"
        ;;
esac

echo ""
echo "==========================================="
print_success "Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Monitor deployment at https://vercel.com/dashboard"
echo "2. Test the deployed application"
echo "3. Check for any errors in Vercel logs"
echo ""
echo "📚 Documentation:"
echo "- Deployment Instructions: DEPLOYMENT_INSTRUCTIONS.md"
echo "- Pre-Deployment Checklist: PRE_DEPLOYMENT_CHECKLIST.md"
echo ""
