import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import pool from '../db/connection.js';
import {
  registerUser,
  loginUser,
  verifyToken,
  changePassword,
  sendVerificationCode,
  verifyEmail,
  forgotPassword,
  resetPassword,
  deleteAccount,
} from '../services/authService.js';
import { getUserById, getOrCreateGoogleUser, updateUser } from '../services/userService.js';

const router = express.Router();

// Initialize Google OAuth2 Client
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '207538615932-3i1f6ur0en2s88tjfjhrseu84d6rtar3.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

/**
 * Middleware to extract token from header
 */
const extractToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    req.token = authHeader.slice(7);
  }
  next();
};

router.use(extractToken);

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    if (!username || !email || !password || !fullName) {
      return res.status(400).json({
        result: { status: 'error', message: 'Missing required fields' },
      });
    }

    const result = await registerUser(username, email, password, fullName);
    res.status(result.result.status === 'success' ? 201 : 400).json(result);
  } catch (error) {
    console.error('Register endpoint error:', error);
    res.status(500).json({ result: { status: 'error', message: 'Internal server error' } });
  }
});

/**
 * POST /api/auth/login
 * Login a user
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        result: { status: 'error', message: 'Username and password required' },
      });
    }

    const result = await loginUser(username, password);

    if (result.result.status === 'success') {
      // Set session
      req.session.userId = result.result.data.user_id;
      req.session.username = result.result.data.username;
    }

    res.status(result.result.status === 'success' ? 200 : 401).json(result);
  } catch (error) {
    console.error('Login endpoint error:', error);
    res.status(500).json({ result: { status: 'error', message: 'Internal server error' } });
  }
});

/**
 * POST /api/auth/verify-token
 * Verify JWT token
 */
router.post('/verify-token', (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        result: { status: 'error', message: 'Token required' },
      });
    }

    const result = verifyToken(token);
    res.status(result.result.status === 'success' ? 200 : 401).json(result);
  } catch (error) {
    console.error('Verify token endpoint error:', error);
    res.status(500).json({ result: { status: 'error', message: 'Internal server error' } });
  }
});

/**
 * POST /api/auth/change-password
 * Change user password (requires authentication)
 */
router.post('/change-password', async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!req.session || !req.session.userId) {
      return res.status(401).json({
        result: { status: 'error', message: 'Not authenticated' },
      });
    }

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        result: { status: 'error', message: 'Old password and new password required' },
      });
    }

    const result = await changePassword(req.session.userId, oldPassword, newPassword);
    res.status(result.result.status === 'success' ? 200 : 400).json(result);
  } catch (error) {
    console.error('Change password endpoint error:', error);
    res.status(500).json({ result: { status: 'error', message: 'Internal server error' } });
  }
});

/**
 * POST /api/auth/send-verification-code
 * Send verification code to email (requires authentication)
 */
router.post('/send-verification-code', async (req, res) => {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({
        result: { status: 'error', message: 'Not authenticated' },
      });
    }

    const result = await sendVerificationCode(req.session.userId);
    res.status(result.result.status === 'success' ? 200 : 400).json(result);
  } catch (error) {
    console.error('Send verification code endpoint error:', error);
    res.status(500).json({ result: { status: 'error', message: 'Internal server error' } });
  }
});

/**
 * POST /api/auth/verify-email
 * Verify email with code
 */
router.post('/verify-email', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        result: { status: 'error', message: 'Verification code required' },
      });
    }

    const result = await verifyEmail(code);
    res.status(result.result.status === 'success' ? 200 : 400).json(result);
  } catch (error) {
    console.error('Verify email endpoint error:', error);
    res.status(500).json({ result: { status: 'error', message: 'Internal server error' } });
  }
});

/**
 * POST /api/auth/forgot-password
 * Request password reset
 */
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        result: { status: 'error', message: 'Email required' },
      });
    }

    const result = await forgotPassword(email);
    res.status(200).json(result);
  } catch (error) {
    console.error('Forgot password endpoint error:', error);
    res.status(500).json({ result: { status: 'error', message: 'Internal server error' } });
  }
});

/**
 * POST /api/auth/reset-password
 * Reset password with code
 */
router.post('/reset-password', async (req, res) => {
  try {
    const { code, newPassword } = req.body;

    if (!code || !newPassword) {
      return res.status(400).json({
        result: { status: 'error', message: 'Reset code and new password required' },
      });
    }

    const result = await resetPassword(code, newPassword);
    res.status(result.result.status === 'success' ? 200 : 400).json(result);
  } catch (error) {
    console.error('Reset password endpoint error:', error);
    res.status(500).json({ result: { status: 'error', message: 'Internal server error' } });
  }
});

/**
 * POST /api/auth/delete-account
 * Delete user account (requires authentication)
 */
router.post('/delete-account', async (req, res) => {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({
        result: { status: 'error', message: 'Not authenticated' },
      });
    }

    const result = await deleteAccount(req.session.userId);
    
    if (result.result.status === 'success') {
      // Destroy session
      req.session.destroy();
    }

    res.status(result.result.status === 'success' ? 200 : 400).json(result);
  } catch (error) {
    console.error('Delete account endpoint error:', error);
    res.status(500).json({ result: { status: 'error', message: 'Internal server error' } });
  }
});

/**
 * POST /api/auth/google-login
 * Login with Google token and create session
 */
router.post('/google-login', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        result: { status: 'error', message: 'Google token required' },
      });
    }

    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const fullName = payload.name || email.split('@')[0];

    // Get or create user in database
    const user = await getOrCreateGoogleUser(email, fullName);

    // Set session with real database user
    req.session.userId = user.user_id;
    req.session.username = user.username;
    req.session.googleToken = token;

    res.json({
      result: {
        status: 'success',
        message: 'Google login successful',
        data: {
          userId: user.user_id,
          username: user.username,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.error('Google login endpoint error:', error.message);
    
    // Handle invalid token errors
    if (error.message.includes('Token used too late') || error.message.includes('Unable to find a signing key')) {
      return res.status(401).json({
        result: { status: 'error', message: 'Invalid or expired Google token' },
      });
    }

    res.status(500).json({ result: { status: 'error', message: 'Internal server error' } });
  }
});

/**
 * GET /api/auth/me
 * Get current user info (requires authentication)
 */
router.get('/me', async (req, res) => {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({
        result: { status: 'error', message: 'Not authenticated' },
      });
    }

    // Fetch user from database
    const user = await getUserById(req.session.userId);

    if (!user) {
      return res.status(404).json({
        result: { status: 'error', message: 'User not found' },
      });
    }

    res.json({
      result: {
        status: 'success',
        user: {
          userId: user.user_id,
          username: user.username,
          email: user.email,
          fullName: user.full_name,
          email_verified: user.email_verified,
          created_at: user.created_at,
        },
      },
    });
  } catch (error) {
    console.error('Get user info endpoint error:', error);
    res.status(500).json({ result: { status: 'error', message: 'Internal server error' } });
  }
});

/**
 * POST /api/auth/logout
 * Logout user
 */
router.post('/logout', (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          result: { status: 'error', message: 'Logout failed' },
        });
      }
      res.clearCookie('connect.sid');
      res.json({ result: { status: 'success', message: 'Logout successful' } });
    });
  } catch (error) {
    console.error('Logout endpoint error:', error);
    res.status(500).json({ result: { status: 'error', message: 'Internal server error' } });
  }
});


router.post('/edit-profile', async (req, res) => {
  try {
    const { username, fullName } = req.body;

    if (!req.session || !req.session.userId) {
      return res.status(401).json({
        result: { status: 'error', message: 'Not authenticated' },
      });
    }

    if (!username) {
      return res.status(400).json({
        result: { status: 'error', message: 'Username is required' },
      });
    }

    // Check if new username already exists (and it's not the user's current username)
    const existingUser = await getUserById(req.session.userId);
    if (existingUser.username !== username) {
      const userWithUsername = await pool.query(
        'SELECT user_id FROM users WHERE username = $1',
        [username]
      );
      if (userWithUsername.rows.length > 0) {
        return res.status(400).json({
          result: { status: 'error', message: 'Username already taken' },
        });
      }
    }

    // Update user profile
    const updatedUser = await updateUser(req.session.userId, username, fullName || '');

    res.json({
      result: {
        status: 'success',
        message: 'Profile updated successfully',
        data: {
          userId: updatedUser.user_id,
          username: updatedUser.username,
          fullName: updatedUser.full_name,
          email: updatedUser.email,
        },
      },
    });
  } catch (error) {
    console.error('Edit profile endpoint error:', error);
    res.status(500).json({ result: { status: 'error', message: 'Internal server error' } });
  }
});

export default router;
