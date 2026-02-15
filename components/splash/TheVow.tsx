'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TheVowProps {
  onComplete: () => void
}

export default function TheVow({ onComplete }: TheVowProps) {
  const [pressing, setPressing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showMantra, setShowMantra] = useState(false)
  const pressTimer = useRef<NodeJS.Timeout | null>(null)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)

  const handlePressStart = () => {
    setPressing(true)
    setProgress(0)

    // Haptic feedback (if supported)
    if ('vibrate' in navigator) {
      navigator.vibrate(50)
    }

    // Progress counter
    let currentProgress = 0
    progressInterval.current = setInterval(() => {
      currentProgress += 1.67 // 60 updates over 3 seconds
      setProgress(Math.min(currentProgress, 100))
    }, 50)

    // 3-second timer
    pressTimer.current = setTimeout(() => {
      setShowMantra(true)
      if ('vibrate' in navigator) {
        navigator.vibrate(200) // Heavy vibration
      }
      setTimeout(() => {
        onComplete()
      }, 2000)
    }, 3000)
  }

  const handlePressEnd = () => {
    setPressing(false)
    if (pressTimer.current) clearTimeout(pressTimer.current)
    if (progressInterval.current) clearInterval(progressInterval.current)
    setProgress(0)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pressTimer.current) clearTimeout(pressTimer.current)
      if (progressInterval.current) clearInterval(progressInterval.current)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {!showMantra ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.6 }}
            className="relative flex flex-col items-center"
          >
            {/* The Ember */}
            <motion.div
              className="relative w-32 h-32 cursor-pointer touch-target"
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              onTouchStart={handlePressStart}
              onTouchEnd={handlePressEnd}
              animate={{
                scale: pressing ? [1, 1.1, 1] : [1, 1.05, 1],
              }}
              transition={{
                duration: pressing ? 0.3 : 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Outer glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(212,175,55,0.6) 0%, rgba(212,175,55,0) 70%)',
                  filter: 'blur(20px)',
                }}
                animate={{
                  opacity: pressing ? [0.6, 1, 0.6] : [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />

              {/* Core ember */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-gold via-yellow-500 to-gold"
                style={{
                  boxShadow: '0 0 40px rgba(212,175,55,0.8), inset 0 0 20px rgba(0,0,0,0.3)',
                }}
                animate={{
                  boxShadow: pressing
                    ? '0 0 60px rgba(212,175,55,1), inset 0 0 20px rgba(0,0,0,0.3)'
                    : '0 0 40px rgba(212,175,55,0.8), inset 0 0 20px rgba(0,0,0,0.3)',
                }}
              />

              {/* Progress ring */}
              {pressing && (
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="60"
                    fill="none"
                    stroke="rgba(212,175,55,0.3)"
                    strokeWidth="3"
                  />
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r="60"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: progress / 100 }}
                    style={{
                      pathLength: progress / 100,
                      strokeDasharray: '1 1',
                    }}
                  />
                </svg>
              )}
            </motion.div>

            {/* Instruction text */}
            <motion.p
              className="mt-12 text-steel text-sm tracking-widest uppercase"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Hold to ignite
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <h1 className="font-serif text-5xl md:text-6xl gold-gradient font-bold tracking-tight">
              I am not done.
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
