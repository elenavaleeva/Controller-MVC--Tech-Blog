const sequelize = require('./config/connection');
const express = require('express');
const path = require('path');
const seedUsers = require('./seed/seedUsers');
const seedPosts = require('./seed/seedPosts');
const seedComments = require('./seed/seedComments');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPosts();
    await seedComments();
    process.exit(0);
};

seedAll();
