const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./config/connection');

class Post extends Model { }

Post.init(
    {
        title: DataTransferTypes.STRING,
        content: DataTransferTypes.STRING,
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Post;