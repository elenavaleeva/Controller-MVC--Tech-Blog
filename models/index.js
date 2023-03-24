const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Sequelize = require('sequelize');

const router = express.Router();

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Post, Comment };
