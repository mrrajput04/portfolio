/**
 * Gets the CSRF token from meta tag
 * @returns {string} The CSRF token
 */
export function getCsrfToken(): string {
	const meta = document.querySelector('meta[name="csrf-token"]')
	return meta ? meta.getAttribute('content') || '' : ''
}

/**
 * Fetches data with CSRF protection
 * @param {string} url - The URL to fetch from
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<any>} The fetch response
 */
export async function fetchWithCsrf(url: string, options: RequestInit = {}) {
	const csrfToken = getCsrfToken()

	return fetch(url, {
		...options,
		headers: {
			...options.headers,
			'X-CSRF-Token': csrfToken,
		},
	})
}