const express = require('express');
const { registration, login, logout, changePassword } = require('../../controllers/authController');
const { authMiddleware } = require('../../middlewares/auth');
const { userValidation } = require('../../validation/userValidation');

const router = express.Router();

router.post('/registration', userValidation, registration);
router.post('/login', userValidation, login);
router.get('/logout', authMiddleware, logout);
router.patch('/changePass', authMiddleware, changePassword);

module.exports = router;
