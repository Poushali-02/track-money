import pool from '../db/connection.js';

export const createSession = async (userId, userAgent, ipAddress) => {
  try {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const result = await pool.query(
      `INSERT INTO sessions (user_id, expires_at, user_agent, ip_address) 
       VALUES ($1, $2, $3, $4) 
       RETURNING session_id, user_id, created_at, expires_at`,
      [userId, expiresAt, userAgent, ipAddress]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const getSession = async (sessionId) => {
  try {
    const result = await pool.query(
      `SELECT * FROM sessions 
       WHERE session_id = $1 AND is_active = true AND expires_at > NOW()`,
      [sessionId]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const updateSessionActivity = async (sessionId) => {
  try {
    await pool.query(
      `UPDATE sessions 
       SET last_activity = NOW() 
       WHERE session_id = $1`,
      [sessionId]
    );
  } catch (error) {
    throw error;
  }
};

export const invalidateSession = async (sessionId) => {
  try {
    await pool.query(
      `UPDATE sessions 
       SET is_active = false 
       WHERE session_id = $1`,
      [sessionId]
    );
  } catch (error) {
    throw error;
  }
};
