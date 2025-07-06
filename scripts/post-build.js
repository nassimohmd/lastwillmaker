#!/usr/bin/env node

import { copyFileSync, mkdirSync, readdirSync, statSync, rmSync, existsSync } from 'fs';
import { join } from 'path';

const sourceDir = 'dist/public';
const targetDir = 'dist';

function copyRecursive(src, dest) {
  try {
    const stat = statSync(src);
    if (stat.isDirectory()) {
      mkdirSync(dest, { recursive: true });
      const entries = readdirSync(src);
      for (const entry of entries) {
        copyRecursive(join(src, entry), join(dest, entry));
      }
    } else {
      copyFileSync(src, dest);
    }
  } catch (error) {
    console.error(`Error copying ${src} to ${dest}:`, error.message);
  }
}

function main() {
  console.log('Post-build: Fixing deployment directory structure...');
  
  try {
    // Check if dist/public exists
    if (existsSync(sourceDir)) {
      console.log('Found dist/public directory. Moving files to dist root...');
      
      // First, get all files from dist/public
      const entries = readdirSync(sourceDir);
      
      // Copy each entry to dist root
      for (const entry of entries) {
        const srcPath = join(sourceDir, entry);
        const destPath = join(targetDir, entry);
        
        if (statSync(srcPath).isDirectory()) {
          // If it's a directory, copy recursively
          copyRecursive(srcPath, destPath);
        } else {
          // If it's a file, copy directly
          copyFileSync(srcPath, destPath);
        }
      }
      
      // Remove dist/public directory
      rmSync(sourceDir, { recursive: true, force: true });
      console.log('✅ Post-build: Successfully moved files to dist/ directory');
    } else {
      console.log('No dist/public directory found. Build output may already be in correct location.');
    }
    
    // Verify that dist directory has the expected files
    if (existsSync(targetDir)) {
      const files = readdirSync(targetDir);
      console.log('Files in dist directory:', files);
      
      // Check for common static files
      const hasIndex = files.includes('index.html');
      if (hasIndex) {
        console.log('✅ index.html found in dist directory');
      } else {
        console.log('⚠️  index.html not found in dist directory');
      }
    }
  } catch (error) {
    console.error('Post-build failed:', error.message);
    process.exit(1);
  }
}

main();