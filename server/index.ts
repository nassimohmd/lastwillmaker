// Static website - redirecting to Vite development server
import { spawn } from 'child_process';

console.log('Starting static website with Vite...');

const vite = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5000'], {
  stdio: 'inherit',
  cwd: process.cwd().replace('/server', '')
});

vite.on('close', (code) => {
  console.log(`Static website process exited with code ${code}`);
});

process.on('SIGINT', () => {
  vite.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  vite.kill('SIGTERM');
  process.exit(0);
});