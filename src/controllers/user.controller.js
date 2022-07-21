const { User } = require('../database/models');
const { getUserByToken } = require('../services/jwt.service');
const userService = require('../services/user.service');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    const user = await userService.createUser(displayName, email, password, image);
    if (!user) return res.status(409).json({ message: 'User already registered' });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(user.dataValues);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  const { authorization } = req.headers;
  const UserEmail = await getUserByToken(authorization);
  const getUser = await User.findOne({ where: { email: UserEmail } });
  if (!getUser) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  try {
    await userService.deleteUser(getUser.id);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};