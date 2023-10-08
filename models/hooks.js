const handleSaveError = (error, data, next) => {
  error.status = 400;
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
