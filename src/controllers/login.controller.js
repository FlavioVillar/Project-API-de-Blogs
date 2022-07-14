const jwtService = require('../services/jwt.service');

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const token = await jwtService.createToken({ email, password });
  return res.status(200).json({ token });
};

module.exports = { signIn };
