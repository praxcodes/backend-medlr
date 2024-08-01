const express = require('express'); // Import the Express library

const medicines = require('./routes/medicines'); // Import the medicines routes
const connectDB = require('./db/connect'); // Import the database connection function
require('dotenv').config(); // Load environment variables from a .env file
const notFound = require('./middleware/not-found'); // Import the 404 middleware
const redis = require('redis'); // Import the Redis library
const { initialiseRedisClient } = require('./middleware/redis'); // Import the Redis initialization function

// Middleware
async function initialiseExpress() {
    const app = express(); // Create an Express application
    app.use(express.json()); // Middleware to parse JSON request bodies

    await initialiseRedisClient(); // Initialize the Redis client
    app.use('/api/v1/medicines', medicines); // Use the medicines routes
    app.use(notFound); // Middleware to handle 404 errors

    const port = process.env.port || 3000; // Define the port from environment variables or default to 3000

    // Function to start the server and connect to the database
    const start = async () => {
        try {
            await connectDB(process.env.MONGO_URI); // Connect to the MongoDB database
            app.listen(port, () =>
                console.log(`Server is listening on port ${port}...`)
            );
        } catch (error) {
            console.log(error); // Log any errors
        }
    };

    start(); // Start the server
}

// Initialize the Express application
initialiseExpress()
    .then()
    .catch((e) => console.log(e)); // Log any errors during initialization

