const router = require('express').Router();
const { Post } = require('../../models');

// Route to create a new post
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create(req.body);
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
