"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Backend Developer"
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const magneticRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)
    
    const handleScroll = () => {
      // Use requestAnimationFrame for smoother parallax
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      animationFrameRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY)
      })
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [typedText])

  // Apply parallax directly to the DOM for better performance
  useEffect(() => {
    if (parallaxRef.current) {
      parallaxRef.current.style.transform = `translate3d(0, ${scrollY * 0.15}px, 0)`
    }
  }, [scrollY])

  // Magnetic effect for profile
  useEffect(() => {
    if (!magneticRef.current) return;
    
    const magnetic = magneticRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = magnetic.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Only apply effect when mouse is close
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const maxDistance = 300;
      
      if (distance < maxDistance) {
        const strength = 10; // Adjust the strength of the effect
        const x = (distanceX / maxDistance) * strength;
        const y = (distanceY / maxDistance) * strength;
        
        magnetic.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      } else {
        magnetic.style.transform = 'translate3d(0, 0, 0)';
      }
    };
    
    const handleMouseLeave = () => {
      magnetic.style.transform = 'translate3d(0, 0, 0)';
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    magnetic.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      magnetic.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-6 pt-16 overflow-hidden">
      <div 
        ref={parallaxRef}
        className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/80 will-change-transform"
      />
      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 py-8 relative z-10">
        <div 
          ref={magneticRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-20 magnetic-element"
        >
          <div className="absolute inset-0 rounded-full animate-ripple"></div>
        </div>
        <h1 className={`text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight ${isLoaded ? 'animate-reveal-left' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          Hi, I&apos;m Divesh Kumar
        </h1>
        <h2 className={`text-xl sm:text-2xl md:text-3xl font-medium text-primary h-8 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.7s' }}>
          {typedText}
          <span className="animate-blink">|</span>
        </h2>
        <p className={`text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto ${isLoaded ? 'animate-reveal-right' : 'opacity-0'}`} style={{ animationDelay: '1.0s' }}>
          Full Stack Developer passionate about building robust backend systems with Node.js, Express.js, and Nest.js.
        </p>
        <div className={`flex flex-wrap justify-center gap-3 sm:gap-4 pt-4 stagger-animation ${isLoaded ? '' : 'opacity-0'}`}>
          <Button asChild size="sm" className="sm:text-base sm:h-10 animate-float" style={{ animationDelay: '0.1s' }}>
            <Link href="#contact">Contact Me</Link>
          </Button>
          <Button variant="outline" asChild size="sm" className="sm:text-base sm:h-10 animate-float" style={{ animationDelay: '0.2s' }}>
            <Link href="#projects">View Projects</Link>
          </Button>
          <Button variant="secondary" asChild size="sm" className="sm:text-base sm:h-10 animate-float" style={{ animationDelay: '0.3s' }}>
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
            className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transition-transform duration-200 relative group"
          >
            <span className="absolute inset-0 animate-spotlight rounded-full opacity-0 group-hover:opacity-100"></span>
            <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://linkedin.com/in/diveshkumar03"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transition-transform duration-200 relative group"
          >
            <span className="absolute inset-0 animate-spotlight rounded-full opacity-0 group-hover:opacity-100"></span>
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="mailto:rajpootdivesh5@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transition-transform duration-200 relative group"
          >
            <span className="absolute inset-0 animate-spotlight rounded-full opacity-0 group-hover:opacity-100"></span>
            <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

