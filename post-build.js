#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';

async function moveFiles() {
  try {
    // Check if dist/public exists
    const publicDir = path.join(process.cwd(), 'dist', 'public');
    const distDir = path.join(process.cwd(), 'dist');
    
    try {
      await fs.access(publicDir);
    } catch (error) {
      console.log('No dist/public directory found, skipping file move');
      return;
    }

    console.log('Moving files from dist/public to dist...');
    
    // Read all files in dist/public
    const files = await fs.readdir(publicDir, { withFileTypes: true });
    
    // Move each file/directory
    for (const file of files) {
      const sourcePath = path.join(publicDir, file.name);
      const targetPath = path.join(distDir, file.name);
      
      // Remove target if it exists
      try {
        await fs.rm(targetPath, { recursive: true, force: true });
      } catch (error) {
        // Ignore errors if target doesn't exist
      }
      
      // Move the file/directory
      await fs.rename(sourcePath, targetPath);
      console.log(`Moved ${file.name}`);
    }
    
    // Remove the now-empty public directory
    await fs.rmdir(publicDir);
    console.log('File move completed successfully');
    
  } catch (error) {
    console.error('Error moving files:', error);
    process.exit(1);
  }
}

moveFiles();