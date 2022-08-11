const User = require('./user');

const updateWins = (userObj) => {
  const filter = { email: userObj.email };
  return User.findOneAndUpdate(filter, {
    $inc: { wins: 1, games_played: 1 },
  }, { new: true });
};

const updateGamesPlayed = (userObj) => {
  const filter = { email: userObj.email };
  return User.findOneAndUpdate(filter, {
    $inc: { games_played: 1 },
  }, { new: true });
};

const updateHighCount = (userObj) => {
  const filter = { email: userObj.email };
  return User.findOneAndUpdate(filter, {
    highest_count: userObj.score,
  }, { new: true });
};

const checkinUser = (userObj) => {
  const filter = { email: userObj.email };
  const update = {
    last_login: userObj.last_login,
    displayName: userObj.displayName,
    photoURL: userObj.photoURL,
  };
  return User.findOneAndUpdate(filter, update, { new: true, upsert: true });
};

const getUser = ({ email }) => User.findOne({ email });
const getAllUsers = () => User.find().sort({ wins: -1 }).lean().exec();

module.exports = {
  updateWins,
  getUser,
  checkinUser,
  getAllUsers,
  updateGamesPlayed,
  updateHighCount,
};
