const loginService = require('../services/user.service');
const { loginSchema } = require('../schemas/login.schema');

const loginValidate = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const user = await loginService.getUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  return next();
};

module.exports = loginValidate;
