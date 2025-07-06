#!/bin/bash

# Build script that fixes deployment directory structure
echo "🔨 Building application for deployment..."

# Run the original build command
echo "Running npm run build..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully"
    
    # Run the post-build script to fix directory structure
    echo "Running post-build script to fix directory structure..."
    node scripts/post-build.js
    
    if [ $? -eq 0 ]; then
        echo "✅ Post-build script completed successfully"
        echo "🚀 Application is ready for deployment!"
        echo ""
        echo "Files in dist directory:"
        ls -la dist/
    else
        echo "❌ Post-build script failed"
        exit 1
    fi
else
    echo "❌ Build failed"
    exit 1
fi