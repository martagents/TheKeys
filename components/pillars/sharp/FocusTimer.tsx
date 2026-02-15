'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FocusTimerProps {
  onExit: () => void
}

export default function FocusTimer({ onExit }: FocusTimerProps) {
  const [timeLeft, setTimeLeft] = useState(90 * 60) // 90 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [shutterMode, setShutterMode] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            // Haptic feedback on completion
            if ('vibrate' in navigator) {
              navigator.vibrate([100, 50, 100, 50, 100])
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = ((90 * 60 - timeLeft) / (90 * 60)) * 100

  const toggleTimer = () => {
    setIsRunning(!isRunning)
    if ('vibrate' in navigator) {
      navigator.vibrate(30)
    }
  }

  const toggleShutter = () => {
    setShutterMode(!shutterMode)
    if ('vibrate' in navigator) {
      navigator.vibrate(50)
    }
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Background gradient that intensifies when running */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-black to-black"
        animate={{
          opacity: isRunning ? 1 : 0.5,
        }}
      />

      <div className="relative z-10 text-center px-6">
        {/* Exit button (hidden in shutter mode) */}
        <AnimatePresence>
          {!shutterMode && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onExit}
              className="absolute top-4 left-4 text-steel hover:text-white transition-colors touch-target"
            >
              ← Back
            </motion.button>
          )}
        </AnimatePresence>

        {/* Title (hidden in shutter mode) */}
        <AnimatePresence>
          {!shutterMode && (
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="font-serif text-2xl gold-gradient mb-8"
            >
              90-Minute Focus Block
            </motion.h2>
          )}
        </AnimatePresence>

        {/* Timer Display */}
        <motion.div
          className="mb-12"
          animate={{
            scale: isRunning ? [1, 1.02, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: isRunning ? Infinity : 0,
          }}
        >
          <div className="text-8xl md:text-9xl font-bold text-white font-mono tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          {!shutterMode && (
            <p className="text-steel text-sm mt-2 tracking-widest uppercase">
              {isRunning ? 'In Deep Work' : 'Paused'}
            </p>
          )}
        </motion.div>

        {/* Progress Ring */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="120"
              fill="none"
              stroke="rgba(142, 142, 147, 0.1)"
              strokeWidth="8"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="120"
              fill="none"
              stroke="#60A5FA"
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              style={{
                strokeDasharray: '1 1',
              }}
            />
          </svg>
        </div>

        {/* Controls (hidden in shutter mode) */}
        <AnimatePresence>
          {!shutterMode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex gap-4 justify-center"
            >
              <button
                onClick={toggleTimer}
                className="glass px-8 py-4 rounded-xl text-white font-medium touch-target hover:bg-white/10 transition-colors"
              >
                {isRunning ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={toggleShutter}
                className="glass px-8 py-4 rounded-xl text-steel font-medium touch-target hover:bg-white/10 transition-colors"
              >
                Shutter Mode
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shutter Mode Indicator */}
        {shutterMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            <button
              onClick={toggleShutter}
              className="text-steel/50 text-xs uppercase tracking-widest touch-target"
            >
              Exit Shutter Mode
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
