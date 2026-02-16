'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function MoonOrb() {
  const [isHolding, setIsHolding] = useState(false)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleStart = () => {
    setIsHolding(true)
    let currentProgress = 0

    timerRef.current = setInterval(() => {
      currentProgress += 2
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        handleComplete()
      }
    }, 30)

    if ('vibrate' in navigator) navigator.vibrate(10)
  }

  const handleEnd = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsHolding(false)
    setProgress(0)
  }

  const handleComplete = () => {
    handleEnd()
    // Trigger day start or navigation
    if ('vibrate' in navigator) navigator.vibrate([50, 100, 50])
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="relative z-10 flex flex-col items-center justify-center my-8"
    >
      {/* Moon Orb */}
      <div className="relative w-48 h-48 mb-8">
        {/* Outer glow rings */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute inset-[-10px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 60%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Main Moon */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 60px rgba(255, 255, 255, 0.4), inset 0 0 30px rgba(255, 255, 255, 0.1)',
              '0 0 80px rgba(255, 255, 255, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.15)',
              '0 0 60px rgba(255, 255, 255, 0.4), inset 0 0 30px rgba(255, 255, 255, 0.1)',
            ]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(220, 220, 230, 0.8) 40%, rgba(180, 180, 200, 0.6) 100%)',
          }}
        />

        {/* Moon surface details */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div
            className="absolute top-1/4 right-1/3 w-8 h-8 rounded-full"
            style={{
              background: 'rgba(150, 150, 170, 0.3)',
              filter: 'blur(4px)',
            }}
          />
          <div
            className="absolute bottom-1/3 left-1/4 w-6 h-6 rounded-full"
            style={{
              background: 'rgba(150, 150, 170, 0.2)',
              filter: 'blur(3px)',
            }}
          />
          <div
            className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full"
            style={{
              background: 'rgba(150, 150, 170, 0.25)',
              filter: 'blur(2px)',
            }}
          />
        </div>

        {/* Sparkles around moon */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${50 + 45 * Math.sin((i * Math.PI * 2) / 8)}%`,
              left: `${50 + 45 * Math.cos((i * Math.PI * 2) / 8)}%`,
              boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)',
            }}
          />
        ))}
      </div>

      {/* Platform beneath moon */}
      <div className="relative mb-4">
        <div
          className="w-64 h-2 rounded-full"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent)',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
          }}
        />
      </div>

      {/* HOLD TO IGNITE Button */}
      <button
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        className="relative px-12 py-4 rounded-full title-font tracking-widest text-white transition-all"
        style={{
          background: isHolding
            ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.4), rgba(255, 215, 0, 0.3))'
            : 'rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: isHolding
            ? '0 0 30px rgba(212, 175, 55, 0.5)'
            : '0 4px 16px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Progress bar */}
        {isHolding && (
          <motion.div
            className="absolute inset-0 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.6), rgba(255, 215, 0, 0.4))',
              }}
            />
          </motion.div>
        )}

        <span className="relative z-10 text-sm font-semibold">
          HOLD TO IGNITE
        </span>
      </button>

      {/* Instruction text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
        className="mt-4 text-white/50 text-xs body-font italic"
      >
        Press and hold to begin your day
      </motion.p>
    </motion.div>
  )
}
