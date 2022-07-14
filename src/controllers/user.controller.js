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

module.exports = {
  createUser,
};