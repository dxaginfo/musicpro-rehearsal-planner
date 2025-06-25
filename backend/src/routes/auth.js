const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { 
  register, 
  login, 
  refreshToken, 
  forgotPassword, 
  resetPassword, 
  verifyEmail 
} = require('../controllers/auth');

// Register new user
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    body('firstName').trim().not().isEmpty().withMessage('First name is required'),
    body('lastName').trim().not().isEmpty().withMessage('Last name is required'),
  ],
  register
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').not().isEmpty().withMessage('Password is required'),
  ],
  login
);

// Refresh token
router.post('/refresh-token', refreshToken);

// Forgot password
router.post(
  '/forgot-password',
  [body('email').isEmail().withMessage('Enter a valid email address')],
  forgotPassword
);

// Reset password
router.post(
  '/reset-password',
  [
    body('token').not().isEmpty().withMessage('Token is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  ],
  resetPassword
);

// Verify email
router.get('/verify-email/:token', verifyEmail);

module.exports = router;