"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Backend Developer"
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [typedText])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-6 pt-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/80" />
      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 py-8">
        <h1 className={`text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          Hi, I&apos;m Divesh Kumar
        </h1>
        <h2 className={`text-xl sm:text-2xl md:text-3xl font-medium text-primary h-8 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          {typedText}
          <span className="animate-blink">|</span>
        </h2>
        <p className={`text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1.2s' }}>
          Motivated and detail-oriented Software Developer with experience in full stack development. Proficient in
          Node.js, Express.js, and Nest.js.
        </p>
        <div className={`flex flex-wrap justify-center gap-3 sm:gap-4 pt-4 stagger-animation ${isLoaded ? '' : 'opacity-0'}`}>
          <Button asChild size="sm" className="sm:text-base sm:h-10">
            <Link href="#contact">Contact Me</Link>
          </Button>
          <Button variant="outline" asChild size="sm" className="sm:text-base sm:h-10">
            <Link href="#projects">View Projects</Link>
          </Button>
          <Button variant="secondary" asChild size="sm" className="sm:text-base sm:h-10">
            <a 
              href="https://drive.google.com/file/d/1oduxkHuFjOcFXYiXm1sm2qMDv_bJbisn/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View CV
            </a>
          </Button>
        </div>
        <div className={`flex justify-center gap-4 sm:gap-6 pt-4 sm:pt-6 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1.8s' }}>
          <Link
            href="https://github.com/mrrajput04"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 transition-transform duration-200"
          >
            <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://linkedin.com/in/diveshkumar03"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 transition-transform duration-200"
          >
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="mailto:rajpootdivesh5@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 transition-transform duration-200"
          >
            <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

