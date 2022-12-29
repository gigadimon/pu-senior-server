const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
    },
    role: String,
    token: {
      type: String,
      required: [true, 'Token is required'],
    },
  },
  { versionKey: false }
);

const userJoiSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const User = mongoose.model('user', userSchema);

module.exports = { User, userJoiSchema };
