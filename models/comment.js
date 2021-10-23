const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    movie: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('comment', commentSchema);
