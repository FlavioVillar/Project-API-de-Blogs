const userSchema = require('../schemas/user.schema');

const validateUser = async (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const { message } = error;
    return res.status(400).json({ message });
  }

  next();
};

module.exports = validateUser;