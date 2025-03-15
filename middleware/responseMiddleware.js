export const responseHandler = (req, res, next) => {
  res.handleResponse = ({
    data = null,
    message = "Success",
    status = 200,
    meta = null,
  }) => {
    res.status(status).json({ status, message, data, meta });
  };
  next();
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: statusCode,
    message: err.message || "Internal Server Error",
  });
};
