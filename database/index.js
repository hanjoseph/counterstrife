/* eslint-disable no-console */
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb://${process.env.DB_HOST}/mvpgames`);

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

module.exports = db;
