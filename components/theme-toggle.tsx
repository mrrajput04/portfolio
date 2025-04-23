"use client"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show theme UI after hydration to avoid mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground hidden sm:inline-block w-12 opacity-0">
          Mode
        </span>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          disabled
        >
          <Sun className="h-5 w-5 opacity-0" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground hidden sm:inline-block">
        {theme === "dark" ? "Dark" : "Light"} Mode
      </span>
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
    </div>
  )
}

