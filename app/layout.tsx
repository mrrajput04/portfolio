import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import ScrollProgress from "@/components/scroll-progress"
import FloatingNav from "@/components/floating-nav"
import { generateStructuredData, generatePersonSchema, generatePortfolioSchema } from '@/components/structured-data'
import { generateToken } from "@/lib/csrf"
import { applyFingerprintProtection } from '@/lib/fingerprint-protection'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

/**
 * @typedef {Object} RootLayoutProps
 * @property {React.ReactNode} children - The child components to be rendered within the layout
 */

/**
 * Root layout component that wraps the entire application
 * Provides theme support, navigation, and global UI elements
 * 
 * @component
 * @param {RootLayoutProps} props - Component properties
 * @returns {JSX.Element} The root layout component with theme provider and navigation
 */
export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	// Apply fingerprint protection on client side
	if (typeof window !== 'undefined') {
		applyFingerprintProtection()
	}

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/icons/laptop_favicon.ico" sizes="any" />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(generatePersonSchema()),
					}}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(generatePortfolioSchema()),
					}}
				/>
				{/* Add CSRF meta tag */}
				<meta name="csrf-token" content={generateToken()} />
			</head>
			<body className={inter.className} suppressHydrationWarning>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<ScrollProgress />
					<Navbar />
					{children}
					<FloatingNav />
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	)
}

/**
 * @constant
 * @type {Metadata}
 * @description Metadata configuration for SEO and Open Graph
 */
export const metadata: Metadata = {
	...generateStructuredData(),
	manifest: undefined,
	icons: {
		icon: '/icons/laptop_favicon.ico',
		shortcut: '/icons/laptop_favicon.ico',
	},

	// Enhanced meta description and keywords
	title: 'Divesh Kumar - Backend Developer Portfolio',
	description: "Experienced Backend Developer specializing in Node.js, TypeScript, and cloud architecture. Portfolio showcasing innovative projects, system design expertise, and scalable solutions for modern web applications.",
	keywords: [
		"backend development",
		"Node.js developer",
		"TypeScript expert",
		"cloud architecture",
		"system design",
		"API development",
		"database optimization",
		"microservices",
		"web development",
		"software engineering",
		"full-stack development",
		"DevOps",
		"portfolio",
		"Divesh Kumar"
	],

	// Enhance OpenGraph and Twitter cards

	openGraph: {
		type: 'website',
		title: 'Divesh Kumar - Backend Developer Portfolio',
		description: 'Professional portfolio showcasing backend development projects and skills',
		images: ['/og-image.jpg'],
		locale: 'en_US',
		siteName: 'Divesh Kumar Portfolio'
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Divesh Kumar - Backend Developer Portfolio',
		description: 'Professional portfolio showcasing backend development projects and skills',
		images: ['/og-image.jpg'],
		creator: '@rajpoot_divesh'
	},
	// Add additional metadata
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		google: 'bvP_Z3gRWN9LsmsDI93DWLFjVcdllXUb6PdUz8hgu44', // Replace with your verification code
	},
	authors: [{ name: 'Divesh Kumar' }],
}

/**
 * @constant
 * @type {Viewport}
 * @description Viewport configuration for responsive design
 */
export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
}

