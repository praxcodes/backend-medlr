const mongoose = require('mongoose');

// Function to connect to the MongoDB database using the provided URL
const connectDB = (url) => {
    return mongoose.connect(url);
}

module.exports = connectDB;
