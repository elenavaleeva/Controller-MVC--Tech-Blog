const router = require('express').Router();
const { Users } = require('../db/models');

router.post('/', async (req, res, next) => {
    try {
        const user = await Users.create(req.body);
        res.session.userId = user.id;
        res.session.loggedIn = true;

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }

});

router.post('/login', async (req, res, next) => {
    try {
        const user = await Users.findOne({ where: { email: req.body.email } });
        if (!user) {
            res.status(401).send('Incorrect email or password');
            return;
        }

        const validPassword = await user.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(401).send('Incorrect email or password');
            return;
        }
        res.session.save(() => {
            req.session.userId = user.id;
            req.session.loggedIn = true;

            res.json({ user: user, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(401).send('Incorrect email or password');
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

module.exports = router;
