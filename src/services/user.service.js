const { User } = require('../database/models');
// const userSchema = require('../schemas/user.schema');
const jwtService = require('./jwt.service');

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const createUser = async ({ displayName, email, password, image }) => {
  const emailExists = await User.findOne({ where: { email } });

  if (emailExists) {
    const err = new Error('User already registered');
    err.name = 'ConflictError';
    throw err;
  }

  const user = await User.create({ displayName, email, password, image });
  const token = await jwtService.createToken(user);
  return { token };
};

module.exports = {
  getUserByEmail,
  createUser,
};