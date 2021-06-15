const mongoose = require('../db');

const productSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        quantity: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
    }, 
    {timestamps: true},
);

module.exports = mongoose.model('ProductTable',productSchema);