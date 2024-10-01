// Import Express
const express = require('express');
require('dotenv').config();
var db = require('./config/db');  // Ensure db is correctly configured
var roleRouter = require("./routes/roleRoute"); // Ensure this path is correct
// const cors = require('cors');
// app.use(cors());
// Initialize the Express app
const app = express();

// Define the port
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.use("/role", roleRouter);  

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
