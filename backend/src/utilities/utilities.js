/**
 * Check if user email is verified
 */
export const checkEmailVerified = (user) => {
  return user && user.email_verified === true;
};

/**
 * Format response object
 */
export const formatResponse = (status, message, data = null) => {
  return {
    result: {
      status,
      message,
      ...(data && { data }),
    },
  };
};

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate username format
 */
export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};
