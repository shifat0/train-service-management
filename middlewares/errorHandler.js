export default function errorHandler(error, req, res, next) {
  console.error(error);

  const errorStatus = error.statusCode || 500;
  const errorMessage = error.message || "Something went wrong!";

  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });
}
