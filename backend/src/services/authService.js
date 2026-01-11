import pool from '../db/connection.js';
import AuthManager from '../utilities/authManager.js';
import EmailService from '../utilities/emailService.js';
import { checkEmailVerified, validateEmail, validateUsername } from '../utilities/utilities.js';

const MAX_ATTEMPTS = 3;

/**
 * Register a user
 */
export const registerUser = async (username, email, password, fullName) => {
  try {
    // Validate password strength
    const [isValid, message] = await AuthManager.validatePasswordStrength(password);
    if (!isValid) {
      return { result: { status: 'error', message } };
    }

    // Validate username format
    if (!validateUsername(username)) {
      return {
        result: {
          status: 'error',
          message: 'Username must be 3-20 characters (alphanumeric and underscore only)',
        },
      };
    }

    // Validate email format
    if (!validateEmail(email)) {
      return { result: { status: 'error', message: 'Invalid email format' } };
    }

    // Check if username exists
    const usernameExists = await pool.query('SELECT user_id FROM users WHERE username = $1', [
      username,
    ]);
    if (usernameExists.rows.length > 0) {
      return { result: { status: 'error', message: 'Username already exists' } };
    }

    // Check if email exists
    const emailExists = await pool.query('SELECT user_id FROM users WHERE email = $1', [email]);
    if (emailExists.rows.length > 0) {
      return { result: { status: 'error', message: 'Email already exists' } };
    }

    // Hash password
    const passwordHash = await AuthManager.hashPassword(password);

    // Insert user
    const result = await pool.query(
      `INSERT INTO users (username, full_name, email, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING user_id, username, full_name, email, created_at`,
      [username, fullName, email, passwordHash]
    );

    const user = result.rows[0];
    const token = AuthManager.createToken(user.user_id, user.username);

    return {
      result: {
        status: 'success',
        message: 'User registered successfully',
        data: {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          full_name: user.full_name,
          token,
        },
      },
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { result: { status: 'error', message: error.message } };
  }
};

/**
 * Login a user
 */
export const loginUser = async (username, password) => {
  try {
    // Find user by username
    const result = await pool.query(
      'SELECT user_id, username, password_hash, full_name, email FROM users WHERE username = $1 AND active = TRUE',
      [username]
    );

    if (result.rows.length === 0) {
      return { result: { status: 'error', message: 'Invalid username or password' } };
    }

    const user = result.rows[0];

    // Verify password
    const passwordMatch = await AuthManager.verifyPassword(password, user.password_hash);
    if (!passwordMatch) {
      return { result: { status: 'error', message: 'Invalid username or password' } };
    }

    const token = AuthManager.createToken(user.user_id, user.username);

    return {
      result: {
        status: 'success',
        message: 'Login successful',
        data: {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          full_name: user.full_name,
          token,
        },
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    return { result: { status: 'error', message: error.message } };
  }
};

/**
 * Verify JWT token
 */
export const verifyToken = (token) => {
  try {
    const payload = AuthManager.verifyToken(token);
    if (!payload) {
      return { result: { status: 'error', message: 'Invalid or expired token' } };
    }

    return {
      result: {
        status: 'success',
        message: 'Token is valid',
        data: { user_id: payload.user_id, username: payload.username },
      },
    };
  } catch (error) {
    console.error('Token verification error:', error);
    return { result: { status: 'error', message: error.message } };
  }
};

/**
 * Change password
 */
export const changePassword = async (userId, oldPassword, newPassword) => {
  try {
    // Validate new password strength
    const [isValid, message] = await AuthManager.validatePasswordStrength(newPassword);
    if (!isValid) {
      return { result: { status: 'error', message } };
    }

    // Get user
    const result = await pool.query('SELECT password_hash FROM users WHERE user_id = $1', [
      userId,
    ]);

    if (result.rows.length === 0) {
      return { result: { status: 'error', message: 'User not found' } };
    }

    const user = result.rows[0];

    // Verify old password
    const passwordMatch = await AuthManager.verifyPassword(oldPassword, user.password_hash);
    if (!passwordMatch) {
      return { result: { status: 'error', message: 'Wrong password' } };
    }

    // Hash and update new password
    const newHash = await AuthManager.hashPassword(newPassword);
    await pool.query(
      'UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2',
      [newHash, userId]
    );

    return { result: { status: 'success', message: 'Password changed successfully' } };
  } catch (error) {
    console.error('Change password error:', error);
    return { result: { status: 'error', message: error.message } };
  }
};

/**
 * Send verification code
 */
export const sendVerificationCode = async (userId) => {
  try {
    // Get user
    const result = await pool.query(
      'SELECT email, username, email_verified FROM users WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return { result: { status: 'error', message: 'User not found' } };
    }

    const user = result.rows[0];

    if (user.email_verified) {
      return { result: { status: 'info', message: 'Email already verified' } };
    }

    // Generate verification code
    const verificationCode = EmailService.generateCode();
    const codeExpires = EmailService.getCodeExpiry(5);

    // Update user with verification code
    await pool.query(
      `UPDATE users
       SET verification_token = $1, verification_token_expires = $2, verification_attempts = 0
       WHERE user_id = $3`,
      [verificationCode, codeExpires, userId]
    );

    // Send email
    const [success, emailMessage] = await EmailService.sendVerificationCode(
      user.email,
      user.username,
      verificationCode
    );

    if (success) {
      return { result: { status: 'success', message: 'Verification code sent to your email' } };
    } else {
      return { result: { status: 'error', message: emailMessage } };
    }
  } catch (error) {
    console.error('Send verification code error:', error);
    return { result: { status: 'error', message: error.message } };
  }
};

/**
 * Verify email
 */
export const verifyEmail = async (code) => {
  try {
    // Find user with this verification code
    const result = await pool.query(
      `SELECT user_id, username, verification_token, verification_token_expires, verification_attempts
       FROM users WHERE verification_token = $1`,
      [code]
    );

    if (result.rows.length === 0) {
      return { result: { status: 'error', message: 'Invalid verification code' } };
    }

    const user = result.rows[0];

    // Check if max attempts exceeded
    if (user.verification_attempts >= MAX_ATTEMPTS) {
      await pool.query(
        `UPDATE users
         SET verification_token = NULL, verification_token_expires = NULL, verification_attempts = 0
         WHERE user_id = $1`,
        [user.user_id]
      );
      return {
        result: {
          status: 'error',
          message: 'Too many failed attempts. Please request a new verification code.',
        },
      };
    }

    // Check if code expired
    if (new Date(user.verification_token_expires) < new Date()) {
      await pool.query(
        `UPDATE users
         SET verification_token = NULL, verification_token_expires = NULL, verification_attempts = 0
         WHERE user_id = $1`,
        [user.user_id]
      );
      return { result: { status: 'error', message: 'Code expired. Request a new one' } };
    }

    // Mark email as verified
    await pool.query(
      `UPDATE users
       SET email_verified = TRUE, verification_token = NULL, verification_token_expires = NULL, verification_attempts = 0
       WHERE user_id = $1`,
      [user.user_id]
    );

    return { result: { status: 'success', message: 'Email verified successfully' } };
  } catch (error) {
    console.error('Email verification error:', error);
    return { result: { status: 'error', message: error.message } };
  }
};

/**
 * Forgot password request
 */
export const forgotPassword = async (email) => {
  try {
    // Find user by email
    const result = await pool.query(
      'SELECT user_id, username, email, email_verified FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      // Don't reveal if email exists
      return {
        result: {
          status: 'success',
          message: 'If this email exists, a reset code has been sent.',
        },
      };
    }

    const user = result.rows[0];

    // Check if email is verified
    if (!checkEmailVerified(user)) {
      return { result: { status: 'error', message: 'Email address needs to be verified first' } };
    }

    // Generate reset code
    const resetCode = EmailService.generateCode();
    const codeExpires = EmailService.getCodeExpiry(5);

    // Update user with reset code
    await pool.query(
      `UPDATE users
       SET reset_token = $1, reset_token_expires = $2, reset_attempts = 0
       WHERE user_id = $3`,
      [resetCode, codeExpires, user.user_id]
    );

    // Send email
    const [success, emailMessage] = await EmailService.sendPasswordResetCode(
      user.email,
      user.username,
      resetCode
    );

    if (success) {
      return { result: { status: 'success', message: 'Reset code sent to your email' } };
    } else {
      return { result: { status: 'error', message: emailMessage } };
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    return { result: { status: 'error', message: error.message } };
  }
};

/**
 * Reset password
 */
export const resetPassword = async (code, newPassword) => {
  try {
    // Validate new password strength
    const [isValid, message] = await AuthManager.validatePasswordStrength(newPassword);
    if (!isValid) {
      return { result: { status: 'error', message } };
    }

    // Find user with this reset code
    const result = await pool.query(
      `SELECT user_id, username, reset_token_expires, reset_attempts, email_verified
       FROM users WHERE reset_token = $1`,
      [code]
    );

    if (result.rows.length === 0) {
      return { result: { status: 'error', message: 'Invalid reset code' } };
    }

    const user = result.rows[0];

    // Check if max attempts exceeded
    if (user.reset_attempts >= MAX_ATTEMPTS) {
      await pool.query(
        `UPDATE users
         SET reset_token = NULL, reset_token_expires = NULL, reset_attempts = 0
         WHERE user_id = $1`,
        [user.user_id]
      );
      return {
        result: {
          status: 'error',
          message: 'Too many failed attempts. Please request a new reset code.',
        },
      };
    }

    // Check if code expired
    if (new Date(user.reset_token_expires) < new Date()) {
      await pool.query(
        `UPDATE users
         SET reset_token = NULL, reset_token_expires = NULL, reset_attempts = 0
         WHERE user_id = $1`,
        [user.user_id]
      );
      return { result: { status: 'error', message: 'Code expired. Please request a new reset code.' } };
    }

    // Check if email is verified
    if (!checkEmailVerified(user)) {
      return { result: { status: 'error', message: 'Email address needs to be verified first' } };
    }

    // Hash and update password
    const newHash = await AuthManager.hashPassword(newPassword);
    await pool.query(
      `UPDATE users
       SET password_hash = $1, reset_token = NULL, reset_token_expires = NULL, reset_attempts = 0
       WHERE user_id = $2`,
      [newHash, user.user_id]
    );

    return {
      result: {
        status: 'success',
        message: `Password reset successfully for ${user.username}!`,
      },
    };
  } catch (error) {
    console.error('Reset password error:', error);
    return { result: { status: 'error', message: error.message } };
  }
};

/**
 * Delete user account
 */
export const deleteAccount = async (userId) => {
  try {
    // Get user
    const result = await pool.query(
      'SELECT username, active, email_verified FROM users WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return { result: { status: 'error', message: 'User not found' } };
    }

    const user = result.rows[0];

    // Check if email is verified
    if (!checkEmailVerified(user)) {
      return { result: { status: 'error', message: 'Email not verified' } };
    }

    // Delete user
    await pool.query('DELETE FROM users WHERE user_id = $1', [userId]);

    return {
      result: {
        status: 'success',
        message: `Deleted account of ${user.username} successfully`,
      },
    };
  } catch (error) {
    console.error('Delete account error:', error);
    return { result: { status: 'error', message: error.message } };
  }
};
