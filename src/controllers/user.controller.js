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

module.exports = {
  createUser,
  getAllUsers,
};