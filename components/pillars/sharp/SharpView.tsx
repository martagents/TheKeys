'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FocusTimer from './FocusTimer'

interface MorningRoutineSubtask {
  id: string
  name: string
  completed: boolean
}

export default function SharpView() {
  const [showTimer, setShowTimer] = useState(false)
  const [showMorningDetails, setShowMorningDetails] = useState(false)
  const [morningSubtasks, setMorningSubtasks] = useState<MorningRoutineSubtask[]>([
    { id: 'learning', name: 'Learning', completed: false },
    { id: 'tracking', name: 'Tracking', completed: false },
    { id: 'meditation', name: 'Meditation', completed: false },
  ])

  const toggleSubtask = (id: string) => {
    setMorningSubtasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
    if ('vibrate' in navigator) navigator.vibrate(30)
  }

  const morningCompleted = morningSubtasks.every((t) => t.completed)

  const habits = [
    { id: 'morning', name: 'Morning Routine', completed: morningCompleted, hasSubtasks: true },
    { id: 'focus', name: '90m Focus Block', completed: false, hasSubtasks: false },
  ]

  if (showTimer) {
    return <FocusTimer onExit={() => setShowTimer(false)} />
  }

  if (showMorningDetails) {
    return (
      <div className="min-h-screen bg-black p-6 pt-16 pb-24">
        <button
          onClick={() => setShowMorningDetails(false)}
          className="mb-6 text-steel hover:text-white transition-colors"
        >
          ← Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="font-serif text-3xl gold-gradient mb-2">
            Morning Routine
          </h2>
          <p className="text-steel text-sm">
            {morningSubtasks.filter((t) => t.completed).length} of {morningSubtasks.length} complete
          </p>
        </motion.div>

        <div className="space-y-3 max-w-md mx-auto">
          {morningSubtasks.map((task, index) => (
            <motion.button
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleSubtask(task.id)}
              className={`w-full glass-dark rounded-xl p-5 flex items-center gap-4 transition-all touch-target ${
                task.completed ? 'bg-white/10' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded border-2 flex items-center justify-center ${
                  task.completed
                    ? 'bg-white border-white'
                    : 'border-steel/50'
                }`}
              >
                {task.completed && <span className="text-white">✓</span>}
              </div>
              <span
                className={`text-lg ${
                  task.completed ? 'text-steel line-through' : 'text-white'
                }`}
              >
                {task.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    )
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
              } else if (habit.id === 'morning') {
                setShowMorningDetails(true)
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
            <div className="flex items-center gap-2">
              {habit.id === 'focus' && (
                <span className="text-xs text-steel">90 min</span>
              )}
              {habit.hasSubtasks && (
                <span className="text-steel text-xs">→</span>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
