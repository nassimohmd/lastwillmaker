#!/usr/bin/env node
import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, { 
      stdio: 'inherit',
      shell: true 
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
  });
}

async function moveFiles() {
  try {
    const publicDir = path.join(process.cwd(), 'dist', 'public');
    const distDir = path.join(process.cwd(), 'dist');
    
    // Check if dist/public exists
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
    throw error;
  }
}

async function build() {
  try {
    console.log('Starting build process...');
    
    // Run vite build
    console.log('Building frontend...');
    await runCommand('npx', ['vite', 'build']);
    
    // Move files from dist/public to dist
    await moveFiles();
    
    // Build server
    console.log('Building server...');
    await runCommand('npx', ['esbuild', 'server/index.ts', '--platform=node', '--packages=external', '--bundle', '--format=esm', '--outdir=dist']);
    
    console.log('Build completed successfully!');
    
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();