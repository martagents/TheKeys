'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TheVowProps {
  onComplete: () => void
}

export default function TheVow({ onComplete }: TheVowProps) {
  const [isHolding, setIsHolding] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showText, setShowText] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Long-press progress
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isHolding && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 2 // Complete in ~2 seconds (50 ticks)

          // Haptic feedback at 25%, 50%, 75%
          if ('vibrate' in navigator) {
            if (next >= 25 && prev < 25) navigator.vibrate(30)
            if (next >= 50 && prev < 50) navigator.vibrate(40)
            if (next >= 75 && prev < 75) navigator.vibrate(50)
          }

          if (next >= 100) {
            // Final haptic
            if ('vibrate' in navigator) navigator.vibrate([50, 100, 50])
            setShowText(true)
            return 100
          }
          return next
        })
      }, 40)
    } else if (!isHolding && progress > 0 && progress < 100) {
      // Reset if released early
      setProgress(0)
    }

    return () => clearInterval(interval)
  }, [isHolding, progress])

  // Transition to dashboard after text shows
  useEffect(() => {
    if (showText) {
      const timer = setTimeout(() => {
        setIsComplete(true)
        setTimeout(onComplete, 800) // Wait for animation
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showText, onComplete])

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Radial gradient background - the "Obsidian" atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, #0F0F0F 0%, #0A0A0A 60%, #000000 100%)',
        }}
      />

      <AnimatePresence mode="wait">
        {!showText ? (
          // The Ember
          <motion.div
            key="ember"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* The Ember - Breathing animation */}
            <motion.div
              className="relative z-10 cursor-pointer select-none"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              onMouseDown={() => setIsHolding(true)}
              onMouseUp={() => setIsHolding(false)}
              onMouseLeave={() => setIsHolding(false)}
              onTouchStart={() => setIsHolding(true)}
              onTouchEnd={() => setIsHolding(false)}
              whileTap={{ scale: 0.9 }}
            >
              {/* The glowing ember core with flicker */}
              <motion.div
                className="w-24 h-24 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #F4D03F 0%, #D4AF37 50%, #B8860B 100%)',
                  boxShadow: `
                    0 0 50px rgba(212, 175, 55, 0.6),
                    0 0 100px rgba(212, 175, 55, 0.4),
                    0 0 150px rgba(212, 175, 55, 0.2),
                    inset 0 0 20px rgba(244, 208, 63, 0.8)
                  `,
                }}
                animate={{
                  opacity: [0.9, 1, 0.9],
                  filter: [
                    'brightness(1)',
                    'brightness(1.2)',
                    'brightness(1)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Progress ring */}
              <svg
                className="absolute -inset-4 w-32 h-32 -rotate-90"
                viewBox="0 0 128 128"
              >
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  fill="none"
                  stroke="rgba(212, 175, 55, 0.1)"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="60"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 60}`}
                  strokeDashoffset={2 * Math.PI * 60 * (1 - progress / 100)}
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.8))',
                  }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F4D03F" />
                    <stop offset="100%" stopColor="#D4AF37" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Instruction text */}
            {progress === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-steel text-sm tracking-widest uppercase whitespace-nowrap"
              >
                Hold to ignite
              </motion.p>
            )}
          </motion.div>
        ) : (
          // "I am not done" - The Vow with letter-spacing animation
          <motion.div
            key="vow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8 }}
            className="text-center relative z-10"
          >
            <motion.h1
              initial={{ letterSpacing: '0.5em', opacity: 0 }}
              animate={{
                letterSpacing: '0.05em',
                opacity: 1,
              }}
              transition={{
                duration: 1.5,
                ease: 'easeOut',
              }}
              className="font-serif text-5xl md:text-7xl gold-gradient font-bold uppercase"
            >
              I am not done.
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
