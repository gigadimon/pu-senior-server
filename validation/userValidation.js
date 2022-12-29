const { userJoiSchema } = require('../schemas/User');
const { ValidationError } = require('../errors/user');

const userValidation = async (req, res, next) => {
  const { body } = req;
  const { error } = userJoiSchema.validate(body);
  if (error) {
    const [details] = error.details;
    return next(new ValidationError(details.message));
  }

  next();
};

module.exports = { userValidation };
