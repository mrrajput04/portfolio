"use client"

import React, { useEffect, useRef, useState } from 'react'

type AnimationType = 'fade-up' | 'fade-down' | 'fade-in' | 'slide-in' | 'scale-up'

interface ScrollAnimationProps {
  children: React.ReactNode
  type?: AnimationType
  delay?: number
  threshold?: number
  className?: string
  rootMargin?: string
}

export default function ScrollAnimation({
  children,
  type = 'fade-up',
  delay = 0,
  threshold = 0.1,
  className = '',
  rootMargin = '0px 0px -100px 0px',
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin])

  return (
    <div
      ref={ref}
      className={`scroll-animation ${type} ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

// Staggered animation component
interface StaggerGroupProps {
  children: React.ReactNode
  threshold?: number
  className?: string
  rootMargin?: string
}

export function StaggerGroup({
  children,
  threshold = 0.1,
  className = '',
  rootMargin = '0px 0px -100px 0px',
}: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin])

  return (
    <div ref={ref} className={`stagger-group ${isVisible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

// Helper component for staggered items
interface StaggerItemProps {
  children: React.ReactNode
  index: number
  className?: string
}

export function StaggerItem({ children, index, className = '' }: StaggerItemProps) {
  return (
    <div data-stagger={index} className={className}>
      {children}
    </div>
  )
} 