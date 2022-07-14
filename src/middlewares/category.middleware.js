const categorySchema = require('../schemas/category.schema');

const validateCategory = async (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error) {
    const { message } = error;
    return res.status(400).json({ message });
  }

  next();
};

module.exports = validateCategory;