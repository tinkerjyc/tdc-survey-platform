const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');

const Comment = require('../../models/comment');
const User = require('../../models/User');
var ObjectId = require('mongodb').ObjectId;

// @route    POST api/comments
// @desc     Create a comment
// @access   Private
router.post(
    '/',
    [auth, [check('text', 'Text is required').not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newComment = new Comment({
                user: req.user.id,
                movie: req.body.movieId,
                text: req.body.text,
                avatar: user.avatar,
                date: Date.now()
            });

            const post = await newComment.save();

            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    GET api/comments
// @desc     Get all comments
// @access   Private
router.get('/',
    // [auth, [check('text', 'Text is required').not().isEmpty()]],
    async (req, res) => {
        try {
            const comments = await Comment.find().sort({ date: -1 });
            res.json(comments);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

// @route    GET api/comments/user/:user_id
// @desc     Get all comments made by a specified user
// @access   Public
router.get('/user/:user_id',
    // [auth, [check('text', 'Text is required').not().isEmpty()]],
    async ({ params: { user_id } }, res) => {
        try {
            // const comments = await Comment.aggregate([
            //     { $match: { user: ObjectId(user_id) } },
            //     {
            //         $lookup: {
            //             from: "user",
            //             localField: "user",
            //             foreignField: "_id",
            //             as: "userObject"
            //         }
            //     }
            // ]).sort({ date: -1 });
            const comments = await Comment.find({user: ObjectId(user_id)}).sort({ date: -1 });
            res.json(comments);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });


// @route    GET api/comments/movie/:movie_id
// @desc     Get all comments made to a specified movie
// @access   Public
router.get('/movie/:movie_id',
    // [auth, [check('text', 'Text is required').not().isEmpty()]],
    async ({ params: { movie_id } }, res) => {
        try {
            // const comments = await Comment.aggregate([
            //     { $match: { movie: movie_id } },
            //     { $addFields: { user: { $toObjectId: "$user" }}},
            //     {
            //         $lookup: {
            //             from: "Users",
            //             localField: "user",
            //             foreignField: "_id",
            //             as: "userItem"
            //         }
            //     }
            // ]).sort({ date: -1 });
            const comments = await Comment.find({movie: movie_id}).sort({ date: -1 });
            res.json(comments);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

// @route    DELETE api/comments/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }
        // Check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await comment.remove();

        res.json(req.params.id);
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});
//
// // @route    PUT api/posts/like/:id
// // @desc     Like a post
// // @access   Private
// router.put('/like/:id', [auth, checkObjectId('id')], async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//
//         // Check if the post has already been liked
//         if (post.likes.some(like => like.user.toString() === req.user.id)) {
//             return res.status(400).json({ msg: 'Post already liked' });
//         }
//
//         post.likes.unshift({ user: req.user.id });
//
//         await post.save();
//
//         return res.json(post.likes);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });
//
// // @route    PUT api/posts/unlike/:id
// // @desc     Unlike a post
// // @access   Private
// router.put('/unlike/:id', [auth, checkObjectId('id')], async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//
//         // Check if the post has not yet been liked
//         if (!post.likes.some(like => like.user.toString() === req.user.id)) {
//             return res.status(400).json({ msg: 'Post has not yet been liked' });
//         }
//
//         // remove the like
//         post.likes = post.likes.filter(
//             ({ user }) => user.toString() !== req.user.id
//         );
//
//         await post.save();
//
//         return res.json(post.likes);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });
//
// // @route    POST api/posts/comment/:id
// // @desc     Comment on a post
// // @access   Private
// router.post(
//     '/comment/:id',
//     [
//         auth,
//         checkObjectId('id'),
//         [check('text', 'Text is required').not().isEmpty()]
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//
//         try {
//             const user = await User.findById(req.user.id).select('-password');
//             const post = await Post.findById(req.params.id);
//
//             const newComment = {
//                 text: req.body.text,
//                 name: user.name,
//                 avatar: user.avatar,
//                 user: req.user.id
//             };
//
//             post.comments.unshift(newComment);
//
//             await post.save();
//
//             res.json(post.comments);
//         } catch (err) {
//             console.error(err.message);
//             res.status(500).send('Server Error');
//         }
//     }
// );
//
// // @route    DELETE api/posts/comment/:id/:comment_id
// // @desc     Delete comment
// // @access   Private
// router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//
//         // Pull out comment
//         const comment = post.comments.find(
//             comment => comment.id === req.params.comment_id
//         );
//         // Make sure comment exists
//         if (!comment) {
//             return res.status(404).json({ msg: 'Comment does not exist' });
//         }
//         // Check user
//         if (comment.user.toString() !== req.user.id) {
//             return res.status(401).json({ msg: 'User not authorized' });
//         }
//
//         post.comments = post.comments.filter(
//             ({ id }) => id !== req.params.comment_id
//         );
//
//         await post.save();
//
//         return res.json(post.comments);
//     } catch (err) {
//         console.error(err.message);
//         return res.status(500).send('Server Error');
//     }
// });
//
module.exports = router;
