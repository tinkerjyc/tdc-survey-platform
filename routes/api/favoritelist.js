const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Favoritelist = require('../../models/favoritelist');
const checkObjectId = require('../../middleware/checkObjectId');
const User = require('../../models/User');
var ObjectId = require('mongodb').ObjectId;

// @route    POST api/favoritelist
// @desc     Create a favoritelist data
// @access   Private
router.post(
    '/',
    [auth, [check('text', 'Text is required').not().isEmpty()]],
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            const newWatchMovie = new Favoritelist({
                user: req.user.id,
                movie: req.body.movie
            });

            const post = await newWatchMovie.save();

            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    GET api/favoritelist
// @desc     Get all favoritelist
// @access   Private
router.get('/',
    // [auth, [check('text', 'Text is required').not().isEmpty()]],
    async (req, res) => {
        try {
            const favoritelist = await Favoritelist.find();
            res.json(favoritelist);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

// @route    GET api/favoritelist/:favoritelistId
// @desc     Get all favoritelist
// @access   Private
router.get('/:favoritelistId',
    // [auth, [check('text', 'Text is required').not().isEmpty()]],
    checkObjectId('favoritelistId'),
    async (req, res) => {
        try {
            const favoritelist = await Favoritelist.findOne({_id: req.params.favoritelistId});
            res.json(favoritelist);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

// @route    DELETE api/favoritelist
// @desc     Delete favoritelist data
// @access   Private
router.delete('/:favoritelistId',
    [auth, checkObjectId('favoritelistId')],
    async (req, res) => {
        try {
            const movie = await Favoritelist.findOne({_id: req.params.favoritelistId});

            if (!movie) {
                return res.status(404).json({ msg: 'Movie record not found' });
            }

            await movie.remove();

            res.json({ msg: 'Movie record removed' });
        } catch (err) {
            console.error(err.message);

            res.status(500).send('Server Error');
        }
    });

module.exports = router;
