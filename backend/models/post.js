const mongoose = require('mongoose');

const post = mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true}
});

module.exports = mongoose.model('Post', post);