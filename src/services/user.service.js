const { User } = require('../database/models');
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

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });
  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id } });
  if (!user) {
    const err = new Error('User does not exist');
    err.name = 'NotFoundError';
    return err;
  }
  const result = {
    id: user.id, displayName: user.displayName, email: user.email, image: user.image,
  };
  return result;
};

module.exports = {
  getUserByEmail,
  createUser,
  getAllUsers,
  getUserById,
};