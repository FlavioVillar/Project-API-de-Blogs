require('dotenv/config');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
  const token = jwt.sign({ data: user }, process.env.JWT_SECRET, {
    expiresIn: '8h',
    algorithm: 'HS256',
  });

  return token;
};

const validateToken = (token) => {
  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (error) {
    const err = new Error('Expired or invalid token');
    err.name = 'UnauthorizedError';
    return err;
  }
};

const getUserByToken = (token) => {
  const { data } = jwt.verify(token, process.env.JWT_SECRET);
  const { email } = data;
  return email;
};

module.exports = {
  createToken,
  validateToken,
  getUserByToken,
};