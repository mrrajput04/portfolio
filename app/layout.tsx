import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Divesh Kumar - Backend Developer",
  description:
    "Portfolio of Divesh Kumar, a skilled Backend Developer specializing in Node.js, Express.js, and Nest.js with experience in building scalable applications",
  keywords: ["Backend Developer", "Node.js", "Express.js", "Nest.js", "MySQL", "MongoDB", "TypeScript", "JavaScript", "API Development", "Full Stack", "Web Development", "Software Engineer"],
  authors: [{ name: "Divesh Kumar" }],
  creator: "Divesh Kumar",
  metadataBase: new URL('https://diveshkumar.vercel.app'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: "https://img.icons8.com/color/48/000000/backend-development.png",
    shortcut: "https://img.icons8.com/color/48/000000/backend-development.png",
    apple: "https://img.icons8.com/color/48/000000/backend-development.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://divesh-kumar-dev.vercel.app",
    title: "Divesh Kumar - Backend Developer Portfolio",
    description: "Experienced Backend Developer specializing in Node.js, Express.js and Nest.js with a passion for building high-quality software solutions",
    siteName: "Divesh Kumar Portfolio",
    images: [
      {
        url: 'https://divesh-kumar-dev.vercel.app/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Divesh Kumar - Backend Developer',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Divesh Kumar - Backend Developer",
    description: "Backend Developer specializing in Node.js, Express.js and Nest.js",
    images: ['https://divesh-kumar-dev.vercel.app/opengraph-image.jpg'],
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  robots: "index, follow",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

