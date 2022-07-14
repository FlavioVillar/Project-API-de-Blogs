const loginService = require('../services/user.service');
const { loginSchema } = require('../schemas/login.schema');

const loginValidate = async (req, _res, next) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    const err = new Error(error.message);
    err.name = 'ValidationError';
    return next(err);
  }

  const user = await loginService.getUserByEmail(email);
  if (!user || user.password !== password) {
    const err = new Error('Invalid fields');
    err.name = 'ValidationError';
    return next(err);
  }

  return next();
};

module.exports = loginValidate;
