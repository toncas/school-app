const User = require('../models/User');

const findUserById = async (id) => {
  return await User.findById(id);
};

module.exports = {
  findUserById,
};
