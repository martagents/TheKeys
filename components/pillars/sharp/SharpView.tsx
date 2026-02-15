'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FocusTimer from './FocusTimer'

export default function SharpView() {
  const [showTimer, setShowTimer] = useState(false)

  const habits = [
    { id: 'morning', name: 'Morning Routine', completed: false },
    { id: 'focus', name: '90m Focus Block', completed: false },
    { id: 'mind', name: 'Mind Time', completed: false },
  ]

  if (showTimer) {
    return <FocusTimer onExit={() => setShowTimer(false)} />
  }

  return (
    <div className="min-h-screen bg-black p-6 pt-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="font-serif text-4xl gold-gradient mb-2">Sharp</h1>
        <p className="text-steel text-sm tracking-widest uppercase">
          Focused & Still
        </p>
      </motion.div>

      {/* Habits */}
      <div className="space-y-4 max-w-md mx-auto">
        {habits.map((habit, index) => (
          <motion.button
            key={habit.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => {
              if (habit.id === 'focus') {
                setShowTimer(true)
              }
            }}
            className="w-full glass rounded-xl p-6 flex items-center justify-between touch-target"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-6 h-6 rounded-full border-2 ${
                  habit.completed
                    ? 'bg-gold border-gold'
                    : 'border-steel/30'
                }`}
              />
              <span className="text-white font-medium">{habit.name}</span>
            </div>
            {habit.id === 'focus' && (
              <span className="text-xs text-steel">90 min</span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
