"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-muted/30 py-8 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-base sm:text-lg font-semibold">Divesh Kumar</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Backend Developer</p>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/mrrajput04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com/in/diveshkumar03"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="mailto:rajpootdivesh5@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="sr-only">Email</span>
            </Link>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollToTop} 
              className="rounded-full h-8 w-8 border-primary/20 bg-background/50 hover:bg-primary/10"
            >
              <ChevronUp className="h-4 w-4" />
              <span className="sr-only">Scroll to top</span>
            </Button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Divesh Kumar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

