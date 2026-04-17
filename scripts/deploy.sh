#!/bin/bash
# Deploy script for Performance Pregão
# Usage: ./deploy.sh [message]

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting deploy process...${NC}"

# Check if there are changes to commit
if git diff --quiet && git diff --staged --quiet; then
    echo -e "${YELLOW}⚠️  No changes to commit${NC}"
    exit 0
fi

# Get commit message
if [ -z "$1" ]; then
    COMMIT_MSG="update: $(date '+%Y-%m-%d %H:%M:%S')"
else
    COMMIT_MSG="$1"
fi

echo -e "${YELLOW}📦 Committing changes...${NC}"
git add -A
git commit -m "$COMMIT_MSG"

echo -e "${YELLOW}📤 Pushing to GitHub...${NC}"
git push origin main

echo -e "${YELLOW}🌐 Deploying to Vercel...${NC}"
vercel deploy --prod -y

echo -e "${GREEN}✅ Deploy completed successfully!${NC}"
echo -e "${GREEN}🌐 Production: https://www.performancepregao.online${NC}"
