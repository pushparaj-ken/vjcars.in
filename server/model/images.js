const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    id : {
        type : Number,
        required: true
    },
    name : {
        type: String,
        required: true,
    },
    created_at: String,
    status: Number 
 
})

const db_images = mongoose.model('db_images', schema);

module.exports = db_images;