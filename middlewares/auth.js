const { UnauthorizedError } = require('../errors/user');
const { User } = require('../schemas/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.signedCookies['token'];
    const [user] = await User.find({ token });
    if (!token || !user) {
      throw new UnauthorizedError('Unauthorized');
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authMiddleware };
