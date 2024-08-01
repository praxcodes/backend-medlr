const mongoose = require('mongoose');

// Define the schema for the Medicine model
const MedicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'] // Name is required
    },
    price: {
        type: Number,
        required: [true, 'must provide price'] // Price is required
    },
    discountPrice: {
        type: Number, // Discounted price is optional
    },
    quantity: {
        type: Number,
        required: [true, 'must provide quantity'] // Quantity is required
    },
    manufacturer: {
        type: String,
        required: [true, 'must provide manufacturer'] // Manufacturer is required
    },
    imageUrl: {
        type: String, // Image URL is optional
    },
});

// Create the Medicine model from the schema
module.exports = mongoose.model('Medicine', MedicineSchema);
