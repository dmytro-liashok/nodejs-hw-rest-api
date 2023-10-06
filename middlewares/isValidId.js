const { HttpError } = require("../helpers");

const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return next(HttpError(404, "Not found"));
  }
  next();
};

module.exports = isValidId;
