import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';
const TOKEN_EXPIRY = '7d';

export const AuthManager = {
  /**
   * Hash password using bcrypt
   */
  hashPassword: async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  },

  /**
   * Verify password against hash
   */
  verifyPassword: async (password, hash) => {
    return bcrypt.compare(password, hash);
  },

  /**
   * Validate password strength
   * Requirements: min 8 chars, uppercase, lowercase, digit
   */
  validatePasswordStrength: async (password) => {
    if (!password || password.length < 8) {
      return [false, 'Password must be at least 8 characters long'];
    }

    if (!/[A-Z]/.test(password)) {
      return [false, 'Password must contain at least one uppercase letter'];
    }

    if (!/[a-z]/.test(password)) {
      return [false, 'Password must contain at least one lowercase letter'];
    }

    if (!/\d/.test(password)) {
      return [false, 'Password must contain at least one digit'];
    }

    return [true, 'Password is strong'];
  },

  /**
   * Create JWT token
   */
  createToken: (userId, username) => {
    return jwt.sign({ user_id: userId, username }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRY,
    });
  },

  /**
   * Verify JWT token
   */
  verifyToken: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  },
};

export default AuthManager;
