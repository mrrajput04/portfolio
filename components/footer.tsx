import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-8 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">Divesh Kumar</span>
            <span className="text-muted-foreground">• Backend Developer</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com"
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
          </div>

          <div className="text-sm text-muted-foreground">© {currentYear} Divesh Kumar. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}

