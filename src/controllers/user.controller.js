const { User } = require('../database/models');
const { getUserByToken } = require('../services/jwt.service');
const userService = require('../services/user.service');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    const user = await userService.createUser({ displayName, email, password, image });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    const result = users.map((user) => ({
      id: user.id, displayName: user.displayName, email: user.email, image: user.image,
    }));
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
// “instanceof” pode ser lida como “é um”.
    if (user instanceof Error) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
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
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};