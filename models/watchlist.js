const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    movie: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('watchmovies', watchlistSchema);
