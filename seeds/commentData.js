const { Comment } = require('../models');

const commentData = [
    {
        comment_text: 'ok',
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: 'good',
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: 'very good',
        user_id: 3,
        post_id: 3
    }

]

const seedComments = () => Comment.bulkCreate(commentData);
module.exports = seedComments;