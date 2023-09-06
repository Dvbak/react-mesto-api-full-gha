const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_KEY } = process.env;
const UnautorizedError = require('../errors/UnautorizedError');

console.log(SECRET_KEY);
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnautorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? SECRET_KEY : 'secret signature key',
    );
  } catch (err) {
    throw new UnautorizedError('Необходима авторизация');
  }

  req.user = payload;
  next();
};

module.exports = auth;
