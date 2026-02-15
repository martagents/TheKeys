'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface TempleHabit {
  id: string
  name: string
  frequency: number // in days
  lastCompleted: Date
}

export default function TempleView() {
  const [habits, setHabits] = useState<TempleHabit[]>([
    {
      id: 'skin',
      name: 'Skin Care',
      frequency: 1,
      lastCompleted: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'hair',
      name: 'Hair (3min)',
      frequency: 3,
      lastCompleted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'removal',
      name: 'Hair Removal',
      frequency: 7,
      lastCompleted: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'massage',
      name: 'Massage',
      frequency: 14,
      lastCompleted: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
  ])

  const calculateDecay = (habit: TempleHabit) => {
    const now = new Date()
    const daysSinceLastCompleted =
      (now.getTime() - habit.lastCompleted.getTime()) / (1000 * 60 * 60 * 24)
    const decay = Math.max(0, 1 - daysSinceLastCompleted / habit.frequency)
    return decay
  }

  const markComplete = (id: string) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, lastCompleted: new Date() } : habit
      )
    )
    if ('vibrate' in navigator) navigator.vibrate(30)
  }

  const getDecayColor = (decay: number) => {
    if (decay > 0.6) return '#34D399' // Green
    if (decay > 0.3) return '#F59E0B' // Orange
    return '#EF4444' // Red
  }

  const getDecayStatus = (decay: number) => {
    if (decay > 0.6) return 'Fresh'
    if (decay > 0.3) return 'Fading'
    if (decay > 0.1) return 'Cracking'
    return 'Eroded'
  }

  return (
    <div className="min-h-screen bg-black p-6 pt-16 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="font-serif text-4xl gold-gradient mb-2">Temple</h1>
        <p className="text-steel text-sm tracking-widest uppercase">
          Physical Worship
        </p>
      </motion.div>

      <div className="space-y-6 max-w-md mx-auto">
        {habits.map((habit, index) => {
          const decay = calculateDecay(habit)
          const decayColor = getDecayColor(decay)
          const decayStatus = getDecayStatus(decay)

          return (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-dark rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-semibold">{habit.name}</h3>
                  <p className="text-steel text-xs">
                    Every {habit.frequency} day{habit.frequency > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className="text-xs font-bold"
                    style={{ color: decayColor }}
                  >
                    {decayStatus}
                  </p>
                  <p className="text-steel text-xs">
                    {Math.round(decay * 100)}%
                  </p>
                </div>
              </div>

              {/* Decay Ring */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90">
                  {/* Background ring */}
                  <circle
                    cx="50%"
                    cy="50%"
                    r="58"
                    fill="none"
                    stroke="rgba(142, 142, 147, 0.1)"
                    strokeWidth="8"
                  />

                  {/* Decay ring */}
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r="58"
                    fill="none"
                    stroke={decayColor}
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: decay }}
                    style={{
                      strokeDasharray: '1 1',
                      filter:
                        decay < 0.1
                          ? 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.8))'
                          : 'none',
                    }}
                  />

                  {/* Crack overlay when decaying */}
                  {decay < 0.3 && (
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="58"
                      fill="none"
                      stroke={decayColor}
                      strokeWidth="8"
                      strokeDasharray="2 8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </svg>

                {/* Center percentage */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-3xl font-bold"
                    style={{ color: decayColor }}
                  >
                    {Math.round(decay * 100)}
                  </span>
                </div>
              </div>

              {/* Action button */}
              <button
                onClick={() => markComplete(habit.id)}
                className="w-full glass rounded-xl py-3 text-white font-medium touch-target hover:bg-white/10 transition-colors"
              >
                Mark Complete
              </button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
