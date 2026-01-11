import pool from './connection.js';

export const initializeDatabase = async () => {
  try {
    // Create pgcrypto extension
    await pool.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;');

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(60) UNIQUE NOT NULL,
        full_name VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        active BOOLEAN DEFAULT TRUE,
        
        -- Email verification fields
        email_verified BOOLEAN DEFAULT FALSE,
        verification_token VARCHAR(255),
        verification_token_expires TIMESTAMP,
        verification_attempts INTEGER DEFAULT 0,
        
        -- Password reset fields
        reset_token VARCHAR(255),
        reset_token_expires TIMESTAMP,
        reset_attempts INTEGER DEFAULT 0
      );
    `);

    // Create Express session table (for connect-pg-simple)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "session" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL,
        PRIMARY KEY ("sid")
      ) WITH (OIDS=FALSE);
    `);
    
    await pool.query('CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");');

    // Create sessions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP NOT NULL,
        last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_active BOOLEAN DEFAULT TRUE,
        user_agent TEXT,
        ip_address VARCHAR(45)
      );
    `);

    await pool.query('CREATE INDEX IF NOT EXISTS idx_session_user_id ON sessions(user_id);');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_session_expires ON sessions(expires_at);');

    // Create transactions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
        transaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        
        transaction_type VARCHAR(20) DEFAULT 'expense'
          CHECK (transaction_type IN ('expense', 'credit')),
        
        transaction_date DATE DEFAULT CURRENT_DATE,
        amount DECIMAL(20, 2) NOT NULL,
        
        category VARCHAR(60) NOT NULL,
        tags TEXT,
        notes TEXT,

        payment_method VARCHAR(50) DEFAULT 'cash',

        status VARCHAR(20) DEFAULT 'pending'
          CHECK (status IN ('pending', 'completed', 'cancelled')),

        frequency VARCHAR(20) DEFAULT 'none'
          CHECK (frequency IN ('none', 'daily', 'weekly', 'monthly', 'yearly')),
        
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query('CREATE INDEX IF NOT EXISTS idx_user_id ON transactions(user_id);');

    console.log('Database schema initialized successfully');
  } catch (error) {
    console.error('Error initializing database schema:', error);
    throw error;
  }
};

export default pool;
