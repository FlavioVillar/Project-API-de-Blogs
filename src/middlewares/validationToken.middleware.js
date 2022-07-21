const jwtService = require('../services/jwt.service');

const validationToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization === 'undefined' || authorization === '') {
    return res.status(401).json({ message: 'Token not found' });
  }

  const isValidToken = jwtService.validateToken(authorization);
  // “instanceof” pode ser lida como “é um”.
  if (isValidToken instanceof Error) {
    return res.status(401).json({ message: isValidToken.message });
  }

  next();
 };

 module.exports = validationToken;