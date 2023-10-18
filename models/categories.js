const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String
    
    }
}, {
    collection: 'categories' // Specify the collection name
});

module.exports = mongoose.model('categories', categorySchema)