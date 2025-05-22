/**
 * Fingerprint protection configuration and utilities
 * Helps prevent browser fingerprinting by normalizing browser behavior
 */

/**
 * Interface for fingerprint protection options
 */
interface FingerprintProtectionOptions {
	blockCanvas: boolean;
	blockWebGL: boolean;
	spoofTimeZone: boolean;
	maskUserAgent: boolean;
	preventAudioContext: boolean;
}

/**
 * Default protection configuration
 */
const defaultProtection: FingerprintProtectionOptions = {
	blockCanvas: true,
	blockWebGL: true,
	spoofTimeZone: true,
	maskUserAgent: true,
	preventAudioContext: true,
}

/**
 * Applies fingerprint protection measures
 */
export function applyFingerprintProtection(options: Partial<FingerprintProtectionOptions> = {}) {
	const config = { ...defaultProtection, ...options }

	// Protect against Canvas fingerprinting
	if (config.blockCanvas) {
		const originalGetContext = HTMLCanvasElement.prototype.getContext

		HTMLCanvasElement.prototype.getContext = function (
			contextType: string,
			contextAttributes?: any
		): any {
			if (contextType === '2d') {
				const context = originalGetContext.call(this, contextType, contextAttributes) as CanvasRenderingContext2D | null
				if (context) {
					const originalGetImageData = context.getImageData.bind(context)
					context.getImageData = function (
						sx: number,
						sy: number,
						sw: number,
						sh: number
					): ImageData {
						try {
							const imageData = originalGetImageData(sx, sy, sw, sh)
							const uint8Array = new Uint8ClampedArray(imageData.data)
							for (let i = 0; i < uint8Array.length; i += 4) {
								uint8Array[i] += Math.random() < 0.5 ? 1 : -1
							}
							return new ImageData(uint8Array, imageData.width, imageData.height)
						} catch (error) {
							console.warn('Error in canvas fingerprint protection:', error)
							return originalGetImageData(sx, sy, sw, sh)
						}
					}
				}
				return context
			}

			return originalGetContext.call(this, contextType, contextAttributes)
		}
	}


	// Protect against WebGL fingerprinting
	if (config.blockWebGL) {
		const originalGetParameter = WebGLRenderingContext.prototype.getParameter
		WebGLRenderingContext.prototype.getParameter = function (parameter: number) {
			// Return consistent values for commonly fingerprinted parameters
			const standardizedParams: Record<number, any> = {
				37445: 'Intel Open Source Technology Center', // UNMASKED_VENDOR_WEBGL
				37446: 'Mesa DRI Intel(R) HD Graphics (Standardized)', // UNMASKED_RENDERER_WEBGL
			}
			return standardizedParams[parameter] || originalGetParameter.call(this, parameter)
		}
	}

	// Spoof timezone if enabled
	if (config.spoofTimeZone) {
		Object.defineProperty(Intl, 'DateTimeFormat', {
			get: function () {
				return function (...args: any[]) {
					return new Date().toLocaleString('en-US', { timeZone: 'UTC' })
				}
			}
		})
	}

	// Mask User Agent
	if (config.maskUserAgent) {
		Object.defineProperty(navigator, 'userAgent', {
			get: function () {
				return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
			}
		})
	}

	// Prevent AudioContext fingerprinting
	// Prevent AudioContext fingerprinting
	if (config.preventAudioContext) {
		const OriginalBiquadFilterNode = window.BiquadFilterNode
		window.BiquadFilterNode = class extends OriginalBiquadFilterNode {
			getFrequencyResponse(frequencyHz: Float32Array, magResponse: Float32Array, phaseResponse: Float32Array): void {
				// Slightly perturb the frequency response to prevent fingerprinting
				super.getFrequencyResponse(frequencyHz, magResponse, phaseResponse)
				for (let i = 0; i < magResponse.length; i++) {
					magResponse[i] += (Math.random() - 0.5) * 0.0001
					phaseResponse[i] += (Math.random() - 0.5) * 0.0001
				}
			}
		}
	}

}