
#!/usr/bin/env node

/**
 * This is a simple script to run both Vite dev server and the Express backend
 * You can run it with: node start-server.js
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Check if the dist directory exists
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  console.log('Building the frontend...');
  const buildProcess = spawn('npm', ['run', 'build'], { 
    stdio: 'inherit',
    shell: true 
  });
  
  buildProcess.on('close', (code) => {
    if (code !== 0) {
      console.error('Build failed. Please run "npm run build" manually.');
      process.exit(1);
    }
    startServer();
  });
} else {
  startServer();
}

function startServer() {
  console.log('Starting the server...');
  const serverProcess = spawn('node', ['server.js'], { 
    stdio: 'inherit',
    shell: true 
  });
  
  serverProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Server process exited with code ${code}`);
    }
  });
  
  console.log('Server is now running at http://localhost:3000');
}
