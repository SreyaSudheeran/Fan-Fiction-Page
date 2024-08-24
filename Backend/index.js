const express = require('express');
const cors = require('cors');
const connectToMongo = require("./db");

const app = express();
const port = 5000;

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', require("./routes/auth")); // Assuming routes/auth.js handles authentication routes
app.use('/api/notes', require("./routes/books")); // Assuming routes/notes.js handles notes routes
app.use('/api/chapter', require("./routes/chapter"));
// Start server
app.listen(port, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
  } else {
    console.log(`Server is running on http://localhost:${port}`);
  }
});
