#!/bin/bash

# Simple script to automatically save and push changes to GitHub
# Usage: ./save.sh "Your commit message"

COMMIT_MSG=${1:-"Auto-save update"}

echo "📦 Adding all changes..."
git add .

echo "💾 Committing changes with message: '$COMMIT_MSG'..."
git commit -m "$COMMIT_MSG"

echo "🚀 Pushing to GitHub..."
git push

echo "✅ All done! Your project is saved and pushed."
