"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Pre-load critical resources with a visual progress indicator
    const preloadResources = async () => {
      const totalSteps = 5;
      const stepTime = 160; // time per step in ms
      
      // Simulate resource loading steps
      for (let step = 1; step <= totalSteps; step++) {
        await new Promise(resolve => setTimeout(resolve, stepTime));
        setLoadingProgress(Math.floor((step / totalSteps) * 100));
      }
      
      // Small delay after reaching 100% before hiding loader
      await new Promise(resolve => setTimeout(resolve, 200));
      setLoading(false);
    }
    
    preloadResources()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background fixed inset-0 z-50">
        <div className="text-center transform-gpu relative">
          <div className="relative inline-flex mb-8">
            <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin will-change-transform"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-medium">{loadingProgress}%</span>
            </div>
          </div>
          <div className="w-48 h-2 bg-muted rounded-full overflow-hidden mb-2 mx-auto">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <h2 className="text-lg font-medium">Loading Portfolio</h2>
          <p className="text-sm text-muted-foreground mt-1">Preparing amazing experience...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}

