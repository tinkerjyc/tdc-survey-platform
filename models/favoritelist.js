const mongoose = require('mongoose');

const favoritelistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    movie: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('favoritelist', favoritelistSchema);
