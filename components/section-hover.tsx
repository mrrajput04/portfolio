'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHoverProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function SectionHover({ children, className, delay = 0 }: SectionHoverProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={cn(
        "relative group",
        "before:absolute before:inset-0 before:bg-primary/5 before:rounded-lg before:opacity-0 before:transition-opacity before:duration-300",
        "hover:before:opacity-100",
        "after:absolute after:inset-0 after:border-2 after:border-primary/20 after:rounded-lg after:opacity-0 after:transition-opacity after:duration-300",
        "hover:after:opacity-100",
        className
      )}
    >
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
} 