const { isValidObjectId } = require('mongoose');

const { RequestError } = require('../helpers');

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);

  if (!isCorrectId) {
    const error = RequestError(400, 'ID is not correct');
    next(error);
  }
  next();
};

module.exports = isValidId;
