import crypto from 'crypto'


/**
 * Validates a CSRF token against a session token
 * @param {string} token - The CSRF token to validate
 * @param {string} sessionToken - The session token to compare against
 * @returns {boolean} Whether the token is valid
 */
/**
 * Custom error class for CSRF validation failures
 */
class CSRFValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CSRFValidationError'
  }
}

export function validateToken(token: string, sessionToken: string): boolean {
  if (!token || !sessionToken) {
    throw new CSRFValidationError('Missing CSRF token or session token')
  }

  try {
    // Use constant-time comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(token.trim()),
      Buffer.from(sessionToken.trim())
    )
  } catch (error) {
    console.error('CSRF token validation error:', error)
    throw new CSRFValidationError('Token validation failed')
  }
}

/**
 * Enhanced token generation with additional entropy
 */
export function generateToken(): string {
  try {
    const entropy = crypto.randomBytes(16).toString('hex')
    const timestamp = Date.now().toString(36)
    const tokenData = {
      random: crypto.randomBytes(32).toString('hex'),
      entropy: entropy,
      timestamp: timestamp,
      expires: Date.now() + (60 * 60 * 1000) // 1 hour expiration
    }
    return Buffer.from(JSON.stringify(tokenData)).toString('base64')
  } catch (error) {
    console.error('Token generation error:', error)
    throw new Error('Failed to generate secure token')
  }
}