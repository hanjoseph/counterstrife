const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  displayName: String,
  photoURL: String,
  email: { type: String, unique: true, required: true },
  wins: { type: Number, default: 0 },
  games_played: { type: Number, default: 0 },
  highest_count: { type: Number, default: 0 },
  last_login: { type: Date, default: new Date() },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
