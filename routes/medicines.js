const express = require('express');
const router = express.Router();
const { redisCacheMiddleware } = require('../middleware/redis'); // Importing Redis caching middleware

// Importing controller functions for handling requests
const {
    getAllMedicines,
    createMedicine,
    getMedicine,
    updateMedicine,
    deleteMedicine,
} = require('../controllers/medicines');

// Route for getting all medicines and creating a new medicine
// Applies Redis caching middleware to the GET request
router.route('/')
    .get(redisCacheMiddleware(), getAllMedicines) // Cache the response for getting all medicines
    .post(createMedicine); // Create a new medicine

// Route for getting, updating, and deleting a specific medicine by ID
router.route('/:id')
    .get(getMedicine) // Get a single medicine by ID
    .patch(updateMedicine) // Update a single medicine by ID
    .delete(deleteMedicine); // Delete a single medicine by ID

module.exports = router; // Exporting the router
