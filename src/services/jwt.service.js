require('dotenv/config');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256',
  });

  return token;
};

const validateToken = (token) => {
  try {
    if (!token) {
      const err = new Error('Token is missing');
      err.name = 'UnauthorizedError';
      throw err;
    }
    const { data } = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (error) {
    const err = new Error('Expired or invalid token');
    err.name = 'UnauthorizedError';
    throw err;
  }
};

module.exports = { createToken, validateToken };