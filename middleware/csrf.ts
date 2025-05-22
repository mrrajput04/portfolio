import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { generateToken, validateToken } from '@/lib/csrf'

/**
 * CSRF Protection Middleware
 * Validates CSRF tokens for POST, PUT, DELETE requests
 * 
 * @param {NextRequest} request - The incoming request object
 * @returns {NextResponse} The response object
 */
export async function csrfMiddleware(request: NextRequest) {
	// Skip CSRF check for GET and HEAD requests
	if (['GET', 'HEAD'].includes(request.method)) {
		return NextResponse.next()
	}

	const csrfToken = request.headers.get('X-CSRF-Token')
	const sessionToken = request.cookies.get('csrf-token')?.value

	if (!csrfToken || !sessionToken || !validateToken(csrfToken, sessionToken)) {
		return new NextResponse(
			JSON.stringify({ error: 'Invalid CSRF token' }),
			{ status: 403, headers: { 'Content-Type': 'application/json' } }
		)
	}

	return NextResponse.next()
}