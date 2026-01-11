import bcrypt from 'bcrypt';
import pool from '../db/connection.js';

export const createUser = async (username, fullName, email, passwordHash, emailVerified = false) => {
  try {
    const result = await pool.query(
      `INSERT INTO users (username, full_name, email, password_hash, email_verified) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING user_id, username, full_name, email, email_verified, created_at`,
      [username, fullName, email, passwordHash || '', emailVerified]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const result = await pool.query(
      'SELECT user_id, username, full_name, email, email_verified, created_at, active FROM users WHERE user_id = $1',
      [userId]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const getOrCreateGoogleUser = async (email, fullName) => {
  try {
    // Check if user already exists with this email
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return existingUser;
    }

    // Create a new user from Google data
    // Generate a unique username from email
    const baseUsername = email.split('@')[0];
    let username = baseUsername;
    let counter = 1;

    // Ensure username is unique
    while (true) {
      const result = await pool.query(
        'SELECT user_id FROM users WHERE username = $1',
        [username]
      );
      if (result.rows.length === 0) {
        break;
      }
      username = `${baseUsername}${counter}`;
      counter++;
    }

    // Create new user with Google data - email is already verified by Google
    const newUser = await createUser(username, fullName || baseUsername, email, null, true);
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId, username, fullName) => {
  try {
    const result = await pool.query(
      `UPDATE users 
       SET username = $1, full_name = $2, updated_at = CURRENT_TIMESTAMP 
       WHERE user_id = $3 
       RETURNING user_id, username, full_name, email, email_verified, created_at`,
      [username, fullName, userId]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};
