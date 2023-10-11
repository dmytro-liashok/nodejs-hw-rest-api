const handleSaveError = (error, data, next) => {
  const { name, code } = error;

  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;

  error.status = status;
  next();
};

const runValidatorsAtUpdate = function (next) {
  if (this._update.$set && Object.keys(this._update.$set).length > 0) {
    this.options.runValidators = true;
    this.options.new = true;
  }
  next();
};

module.exports = {
  handleSaveError,
  runValidatorsAtUpdate,
};
