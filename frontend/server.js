const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// First, we need to build the app if it hasn't been built
const { execSync } = require('child_process');
console.log('Building the React application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Error building the application:', error);
  process.exit(1);
}

// Serve static files from the dist directory (where Vite puts the build output)
app.use(express.static(path.join(__dirname, 'dist')));

// For any request that doesn't match a static file, serve the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Open your browser and navigate to: http://localhost:${PORT}`);
});