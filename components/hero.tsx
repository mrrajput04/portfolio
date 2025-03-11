"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Backend Developer"

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [typedText])

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 md:px-6">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/80" />
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Hi, I&apos;m Divesh Kumar</h1>
        <h2 className="text-2xl md:text-3xl font-medium text-primary h-8">
          {typedText}
          <span className="animate-blink">|</span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Motivated and detail-oriented Software Developer with experience in full stack development. Proficient in
          Node.js, Express.js, and Nest.js.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button asChild>
            <Link href="#contact">Contact Me</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="#projects">View Projects</Link>
          </Button>
        </div>
        <div className="flex justify-center gap-6 pt-6">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="w-6 h-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="w-6 h-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="mailto:rajpootdivesh5@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="w-6 h-6" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

