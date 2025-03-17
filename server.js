
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// API endpoint for contact form submissions
app.use(express.json());
app.post('/api/contact', (req, res) => {
  const formData = req.body;
  
  // In a real app, you'd save this data to a database or send an email
  console.log('Contact form submission:', formData);
  
  // For demonstration, save to a JSON file
  const data = JSON.stringify(formData, null, 2);
  fs.appendFileSync('contact-submissions.json', data + ',\n', { flag: 'a+' });
  
  res.json({ success: true, message: 'Form submitted successfully!' });
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
