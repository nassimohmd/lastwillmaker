#!/usr/bin/env node
import { spawn } from 'child_process';

const vite = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5000'], {
  stdio: 'inherit',
  cwd: process.cwd()
});

vite.on('close', (code) => {
  console.log(`Vite process exited with code ${code}`);
});

process.on('SIGINT', () => {
  vite.kill('SIGINT');
});