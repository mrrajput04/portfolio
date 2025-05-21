import crypto from 'crypto'


/**
 * Validates a CSRF token against a session token
 * @param {string} token - The CSRF token to validate
 * @param {string} sessionToken - The session token to compare against
 * @returns {boolean} Whether the token is valid
 */
export function validateToken(token: string, sessionToken: string): boolean {
	if (!token || !sessionToken) return false

	try {
		// Use constant-time comparison to prevent timing attacks
		return crypto.timingSafeEqual(
			Buffer.from(token.trim()),
			Buffer.from(sessionToken.trim())
		)
	} catch (error) {
		console.error('CSRF token validation error:', error)
		return false
	}
}

// Add token expiration check
export function isTokenExpired(token: string): boolean {
	try {
		const tokenData = JSON.parse(Buffer.from(token, 'base64').toString())
		return Date.now() > tokenData.expires
	} catch {
		return true
	}
}

// Generate token with expiration
export function generateToken(): string {
	const tokenData = {
		random: crypto.randomBytes(32).toString('hex'),
		expires: Date.now() + (60 * 60 * 1000) // 1 hour expiration
	}
	return Buffer.from(JSON.stringify(tokenData)).toString('base64')
}