const { User } = require('../database/models');

const getUserByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
  });
  return user;
};

module.exports = {
getUserByEmail,
};