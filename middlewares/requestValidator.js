export default function requestValidator(validator) {
  return (req, res, next) => {
    const { error } = validator.validate(req.body);

    if (error)
      return res.status(500).json({
        success: false,
        message: error.message,
      });

    next();
  };
}
