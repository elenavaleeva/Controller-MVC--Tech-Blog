const router = require('express').Router();
const apiRoutes = require('./api');
const { Post } = require('../models');
const withAuth = require('../utils/auth');

router.post('/', withAuth, async (req, res) => {
    const body = req.body;

    try {
        const newPost = await Post.create({
            ...body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const [rows] = await
            Post.update(req.body, {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                },

            });
        if (rows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const [rows] = Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (rows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
