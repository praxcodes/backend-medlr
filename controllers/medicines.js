const { query } = require('express');
const Medicine = require('../models/Medicine');

// Get all medicines with optional filtering, sorting, and searching
const getAllMedicines = async (req, res) => {
    try {
        const { name, manufacturer, numericFilters, sort } = req.query;
        const queryObject = {};

        // Add name filter if present
        if (name) {
            queryObject.name = { $regex: name, $options: 'i' };
        }

        // Add manufacturer filter if present
        if (manufacturer) {
            queryObject.manufacturer = { $regex: manufacturer, $options: 'i' };
        }

        // Add numeric filters if present
        if (numericFilters) {
            const operatorMap = {
                '>': '$gt',
                '>=': '$gte',
                '=': '$eq',
                '<': '$lt',
                '<=': '$lte',
            };
            const regEx = /\b(<|>|<=|>=|=)\b/g;
            let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
            const options = ['price', 'quantity', 'discountPrice'];
            filters = filters.split(',').forEach((item) => {
                const [field, operator, value] = item.split('-');
                if (options.includes(field)) {
                    queryObject[field] = { [operator]: Number(value) };
                }
            });
        }

        // Find medicines with the built query object
        let result = Medicine.find(queryObject);

        // Apply sorting if present
        if (sort) {
            const sortList = sort.split(',').join(' ');
            result = result.sort(sortList);
        } else {
            result = result.sort('name');
        }

        // Execute the query and send the response
        const medicines = await result;
        res.status(200).json({ medicines });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

// Create a new medicine
const createMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.create(req.body); // Adds to the database
        res.status(201).json({ medicine }); // Shows the new medicine added
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

// Get a single medicine by ID
const getMedicine = async (req, res, next) => {
    try {
        const { id: medID } = req.params;
        const medicine = await Medicine.findOne({ _id: medID });
        if (!medicine) {
            return res.status(404).json({ msg: `No medicine with id: ${medID}` });
        }
        res.status(200).json({ medicine });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

// Delete a medicine by ID
const deleteMedicine = async (req, res, next) => {
    try {
        const { id: medID } = req.params;
        const medicine = await Medicine.findOneAndDelete({ _id: medID });
        if (!medicine) {
            return res.status(404).json({ msg: `No medicine with id: ${medID}` });
        }
        res.status(200).send(); // Successful deletion
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

// Update a medicine by ID
const updateMedicine = async (req, res, next) => {
    try {
        const { id: medID } = req.params;
        const medicine = await Medicine.findOneAndUpdate({ _id: medID }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!medicine) {
            return res.status(404).json({ msg: `No medicine with id: ${medID}` });
        }
        res.status(200).json({ medicine });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    getAllMedicines,
    createMedicine,
    getMedicine,
    updateMedicine,
    deleteMedicine,
}
