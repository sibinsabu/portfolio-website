// server.js - Simple Express Server for Sibin's Portfolio
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname)));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.url} - ${req.ip}`);
  next();
});

// Routes
// Homepage route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API route for contact form (if you want to add a contact form later)
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Log the contact form submission
  console.log('Contact form submission:', { name, email, message });
  
  // Here you could add email functionality or database storage
  // For now, just send a success response
  res.json({ 
    success: true, 
    message: 'Thank you for your message! I will get back to you soon.' 
  });
});

// API route to get portfolio info
app.get('/api/portfolio', (req, res) => {
  const portfolioData = {
    name: 'Sibin Sabu',
    title: 'Full-Stack Developer',
    skills: [
      'HTML5 & CSS3',
      'JavaScript (ES6+)',
      'Node.js',
      'MongoDB & Mongoose',
      'Express.js',
      'Git & GitHub'
    ],
    contact: {
      github: 'https://github.com/sibinsabu',
      linkedin: 'https://www.linkedin.com/in/sibin-sabu-729511262',
      email: 'sibincareerinquiries@gmail.com'
    }
  };
  
  res.json(portfolioData);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log('🚀 Sibin\'s Portfolio Server Started!');
  console.log(`📍 Server is running at http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⚡ Ready to serve your amazing portfolio!`);
  console.log('-------------------------------------------');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});