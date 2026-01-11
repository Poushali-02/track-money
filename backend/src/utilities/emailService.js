import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const EmailService = {
  /**
   * Generate 6-digit verification code
   */
  generateCode: () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  },

  /**
   * Get expiry time in minutes
   */
  getCodeExpiry: (minutes = 5) => {
    return new Date(Date.now() + minutes * 60 * 1000);
  },

  /**
   * Send verification code email
   */
  sendVerificationCode: async (email, username, code) => {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'TrackMoney - Email Verification',
        html: `
          <h2>Welcome to TrackMoney, ${username}!</h2>
          <p>Your verification code is:</p>
          <h1 style="color: #007bff;">${code}</h1>
          <p>This code expires in 5 minutes.</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      return [true, 'Verification code sent successfully'];
    } catch (error) {
      console.error('Email sending error:', error);
      return [false, 'Failed to send verification code'];
    }
  },

  /**
   * Send password reset code email
   */
  sendPasswordResetCode: async (email, username, code) => {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'TrackMoney - Password Reset',
        html: `
          <h2>Password Reset Request</h2>
          <p>Hi ${username},</p>
          <p>Your password reset code is:</p>
          <h1 style="color: #007bff;">${code}</h1>
          <p>This code expires in 5 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      return [true, 'Reset code sent successfully'];
    } catch (error) {
      console.error('Email sending error:', error);
      return [false, 'Failed to send reset code'];
    }
  },
};

export default EmailService;
