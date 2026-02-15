'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface TheVowProps {
  onComplete: () => void
}

export default function TheVow({ onComplete }: TheVowProps) {
  // Auto-proceed after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-serif text-5xl md:text-6xl gold-gradient font-bold tracking-tight">
          I am not done.
        </h1>
      </motion.div>
    </div>
  )
}
