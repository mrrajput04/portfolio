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
    "Portfolio website of Divesh Kumar, a Backend Developer specializing in Node.js, Express.js, and Nest.js",
  keywords: ["Backend Developer", "Node.js", "Express.js", "Nest.js", "MySQL", "MongoDB", "TypeScript", "JavaScript", "API Development"],
  authors: [{ name: "Divesh Kumar" }],
  creator: "Divesh Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://divesh-kumar-dev.vercel.app",
    title: "Divesh Kumar - Backend Developer",
    description: "Backend Developer specializing in Node.js, Express.js and Nest.js",
    siteName: "Divesh Kumar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divesh Kumar - Backend Developer",
    description: "Backend Developer specializing in Node.js, Express.js and Nest.js",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://img.icons8.com/bubbles/100/d.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

