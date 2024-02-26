export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODEENV === "production" ? null : err.stack,
  });
};

export const notFound = (req, res, next) => {
  const erorr = new Error(`${req.originalUrl} Not Found`);
  res.status(404);
  next(erorr);
};
