const router = require("express").Router();
const { Post, Users } = require("../models");


router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [Users],

        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('allPosts',
            {
                posts,

            });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

router.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [Users],
        });
        if (postData) {
            const post = postData.get({ plain: true });
            res.render('singlePost', {
                post,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signUp', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
});

module.exports = router;

