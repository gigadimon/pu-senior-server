const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../schemas/User');
const { getAgents } = require('../services/getAgents');
const { ForbiddenError, ConflictError, UnauthorizedError } = require('../errors/user');

const registration = async (req, res, next) => {
  try {
    const { body } = req;
    const { email } = body;

    const allAgents = await getAgents();
    const [currentAgent] = allAgents.filter(agent => agent.email === email);
    if (!currentAgent) {
      throw new ForbiddenError('Access denied');
    }

    const [user] = await User.find({ email });
    if (user) {
      throw new ConflictError('User exists');
    }

    const token = jwt.sign(body, process.env.JWT_SECRET);
    const newUser = { name: currentAgent.name, email, role: currentAgent.roles[0], token };
    const { name, role } = await User.create(newUser);

    res.cookie('token', token, { signed: true });

    res.status(201).json({ message: 'User created success', user: { name, role } });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { body } = req;
    const { email, password } = body;

    const [user] = await User.find({ email });
    if (!user) {
      throw new UnauthorizedError('User doesn`t exist');
    }

    const decoded = jwt.verify(user.token, process.env.JWT_SECRET);
    if (decoded.password !== password) {
      throw new UnauthorizedError('Email or password is wrong');
    }

    res.cookie('token', user.token, { signed: true });
    res.json({ message: 'Success', user: { name: user.name, role: user.role } });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'OK' });
};

const changePassword = async (req, res) => {};

module.exports = { changePassword, logout, login, registration };
