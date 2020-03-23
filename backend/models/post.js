// import mongoose

const mongoose = require('mongoose');

// creating schema
// passes javascript object in the schema() method
const postSchema = mongoose.Schema({


    // first name
    title: { type: String, required: true },

    // last name
    content: { type: String, required: true },

    //phone number
    firstName: { type: String, required: true },

    //Email
    email: { type: String, required: true},

    //Address
    address: { type: String, required: true },

    //vin
    vin: { type: String, required: true },

    //year
    year: { type: String, required: true },

    //model
    model: { type: String, required: true },

    //plate
    plate: { type: String, required: true },

    //mileage
    mileage: { type: String, required: true }
});

// creating a model for the schema and exporting it to use in the application
module.exports = mongoose.model('Post', postSchema);
