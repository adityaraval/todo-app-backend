class ErrorHandler extends Error {
  constructor (statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleErrorResponse = (err, res) => {
  if (err && err.error && err.error.isJoi) {
    return res.status(400).json({
      message: err.error.toString()
    });
  }else{
    const { statusCode, message } = err;
    res.status(statusCode).json({
      message
    });
  }
};

module.exports = {
  ErrorHandler,
  handleErrorResponse
};
