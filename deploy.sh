#!/bin/bash
# Deploy script: commit, push to GitHub and trigger Vercel deploy

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if message is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Commit message required${NC}"
    echo "Usage: npm run deploy -- \"your commit message\""
    exit 1
fi

echo -e "${YELLOW}🚀 Starting deploy process...${NC}"

# Add all changes
echo -e "${YELLOW}📦 Adding changes...${NC}"
git add .

# Commit
echo -e "${YELLOW}💾 Committing: $1${NC}"
git commit -m "$1"

# Push to GitHub
echo -e "${YELLOW}⬆️  Pushing to GitHub...${NC}"
git push origin main

# Check if push was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Push successful!${NC}"
    echo -e "${GREEN}🌐 Vercel will automatically deploy from GitHub${NC}"
    echo -e "${YELLOW}⏳ Check your Vercel dashboard for deployment status${NC}"
else
    echo -e "${RED}❌ Push failed${NC}"
    exit 1
fi
