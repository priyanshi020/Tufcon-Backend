// Import Express
const express = require('express');
require('dotenv').config();
var db = require('./config/db')

// Initialize the Express app
const app = express();

// Define the port
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
