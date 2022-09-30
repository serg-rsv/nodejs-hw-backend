const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { RequestError } = require('../helpers');
const { SECRET_JWT } = process.env;

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(RequestError(401, 'Not authorized'));
  }

  try {
    const { id } = jwt.verify(token, SECRET_JWT);
    const user = await User.findById(id);

    if (!user?.token) {
      next(RequestError(401, 'Not authorized'));
    }

    req.user = user;

    next();
  } catch (error) {
    if (
      error.message === 'invalid signature' ||
      error.message === 'invalid token'
    ) {
      error.status = 401;
    }

    next(error);
  }
};

module.exports = auth;
