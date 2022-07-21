const jwtService = require('../services/jwt.service');

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
  const token = await jwtService.createToken({ email, password });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { signIn };
