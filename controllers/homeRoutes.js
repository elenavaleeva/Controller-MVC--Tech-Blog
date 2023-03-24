const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

router.get('/', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/homepage');
        return;
    }
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });
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

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { email: req.body.email },
        });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.get('/post', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
            include: [{ model: User, attributes: ['username'] }, { model: Comment }],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('post', {
            posts,
            loggedIn: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
            ],
        });

        const post = postData.get({ plain: true });

        res.render('singlepost', { post, loggedIn: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;










