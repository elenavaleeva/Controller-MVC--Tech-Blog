const router = require("express").Router();
const db = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
    try {
        const postData = db.Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("dashboard", {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.redirect("login");

    }
});

router.get('new', withAuth, (req, res) => {
    res.render('newPost', {
        layout: 'dashboard',
    });

});

router.get('posts', async (req, res) => {
    try {
        const postData = await db.Post.findAll({
            include: [db.User],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('allPosts', {
            posts,

        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await db.Post.findByPk(req.params.id);


        if (postData) {
            const post = postData.get({ plain: true });


            res.render('editPost', {
                layout: 'dashboard',
                post
            });

        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect('login');
    }
});

module.exports = router;


