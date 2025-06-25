const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const logger = require('../utils/logger');

const prisma = new PrismaClient();

// Register a new user
exports.register = async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName, phone } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        phone,
      },
    });

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret_key_here',
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    });
  } catch (error) {
    logger.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret_key_here',
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    });
  } catch (error) {
    logger.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

// Refresh token
exports.refreshToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here');

      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      // Generate new token
      const newToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'your_jwt_secret_key_here',
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
      );

      res.status(200).json({
        message: 'Token refreshed',
        token: newToken,
      });
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    logger.error('Error refreshing token:', error);
    res.status(500).json({ message: 'Server error during token refresh', error: error.message });
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, purpose: 'password-reset' },
      process.env.JWT_SECRET || 'your_jwt_secret_key_here',
      { expiresIn: '1h' }
    );

    // In a real app, you would send an email with the reset link
    // For this example, we'll just return the token
    res.status(200).json({
      message: 'Password reset email sent',
      resetToken: token, // In production, don't send this directly to the client
    });
  } catch (error) {
    logger.error('Error in forgot password:', error);
    res.status(500).json({ message: 'Server error during password reset request', error: error.message });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token, password } = req.body;

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here');

      if (decoded.purpose !== 'password-reset') {
        return res.status(400).json({ message: 'Invalid token purpose' });
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      // Update user password
      await prisma.user.update({
        where: { id: decoded.id },
        data: { passwordHash },
      });

      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  } catch (error) {
    logger.error('Error resetting password:', error);
    res.status(500).json({ message: 'Server error during password reset', error: error.message });
  }
};

// Verify email
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here');

      if (decoded.purpose !== 'email-verification') {
        return res.status(400).json({ message: 'Invalid token purpose' });
      }

      // Update user to verified
      await prisma.user.update({
        where: { id: decoded.id },
        data: { emailVerified: true },
      });

      res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  } catch (error) {
    logger.error('Error verifying email:', error);
    res.status(500).json({ message: 'Server error during email verification', error: error.message });
  }
};