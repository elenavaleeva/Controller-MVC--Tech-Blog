const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const sequelize = require('./config/connection');

router.use('/posts', postRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);

router.use((req, res) => {
    res.status(404).json({ message: 'This route does not exist' });
});

router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
});


module.exports = router;