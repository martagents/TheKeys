'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'

interface DailyTask {
  id: string
  pillar: 'sharp' | 'fitness' | 'presence' | 'temple' | 'warrior'
  name: string
  completed: boolean
  color: string
  icon: string
}

export default function DueTodayView() {
  const today = new Date()

  // Mock daily tasks - will be replaced with Supabase data
  const [tasks, setTasks] = useState<DailyTask[]>([
    {
      id: '1',
      pillar: 'sharp',
      name: 'Morning Routine',
      completed: false,
      color: '#60A5FA',
      icon: '🧠',
    },
    {
      id: '2',
      pillar: 'sharp',
      name: '90m Focus Block',
      completed: false,
      color: '#60A5FA',
      icon: '⏱️',
    },
    {
      id: '3',
      pillar: 'fitness',
      name: '1400 Calories',
      completed: true,
      color: '#34D399',
      icon: '🎯',
    },
    {
      id: '4',
      pillar: 'fitness',
      name: '100g Protein',
      completed: true,
      color: '#34D399',
      icon: '🥩',
    },
    {
      id: '5',
      pillar: 'fitness',
      name: '2L Water',
      completed: false,
      color: '#34D399',
      icon: '💧',
    },
    {
      id: '6',
      pillar: 'fitness',
      name: '10K Steps',
      completed: false,
      color: '#34D399',
      icon: '👟',
    },
    {
      id: '7',
      pillar: 'presence',
      name: 'Faith Statement',
      completed: false,
      color: '#A78BFA',
      icon: '✨',
    },
    {
      id: '8',
      pillar: 'temple',
      name: 'Morning Skincare',
      completed: true,
      color: '#F472B6',
      icon: '🌅',
    },
    {
      id: '9',
      pillar: 'temple',
      name: 'Night Skincare',
      completed: false,
      color: '#F472B6',
      icon: '🌙',
    },
    {
      id: '10',
      pillar: 'warrior',
      name: 'Daily 10X',
      completed: false,
      color: '#FB923C',
      icon: '⚡',
    },
  ])

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
    if ('vibrate' in navigator) navigator.vibrate(30)
  }

  const completedCount = tasks.filter((t) => t.completed).length
  const totalCount = tasks.length
  const completionPercentage = Math.round((completedCount / totalCount) * 100)

  // Group tasks by pillar
  const tasksByPillar = tasks.reduce((acc, task) => {
    if (!acc[task.pillar]) acc[task.pillar] = []
    acc[task.pillar].push(task)
    return acc
  }, {} as Record<string, DailyTask[]>)

  const pillarNames = {
    sharp: 'Sharp',
    fitness: 'Fitness',
    presence: 'Presence',
    temple: 'Temple',
    warrior: 'Warrior',
  }

  return (
    <div className="min-h-screen bg-black p-6 pt-16 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-serif text-4xl gold-gradient mb-2">Due Today</h1>
        <p className="text-steel text-sm tracking-widest uppercase">
          {format(today, 'EEEE, MMMM d')}
        </p>
      </motion.div>

      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto mb-8"
      >
        <div className="glass-dark rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-steel text-sm">Daily Progress</p>
              <p className="text-white text-3xl font-bold">
                {completedCount}/{totalCount}
              </p>
            </div>
            <div className="relative w-24 h-24">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="40"
                  fill="none"
                  stroke="rgba(142, 142, 147, 0.1)"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="40"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: completionPercentage / 100 }}
                  style={{ strokeDasharray: '1 1' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gold text-xl font-bold">
                  {completionPercentage}%
                </span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-steel/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold via-yellow-500 to-gold"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Tasks by Pillar */}
      <div className="max-w-md mx-auto space-y-6">
        {Object.entries(tasksByPillar).map(([pillar, pillarTasks], pillarIndex) => (
          <motion.div
            key={pillar}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: pillarIndex * 0.1 }}
          >
            <h3 className="text-white font-semibold mb-3 px-2">
              {pillarNames[pillar as keyof typeof pillarNames]}
              <span className="text-steel text-sm ml-2">
                ({pillarTasks.filter((t) => t.completed).length}/{pillarTasks.length})
              </span>
            </h3>

            <div className="space-y-2">
              {pillarTasks.map((task, taskIndex) => (
                <motion.button
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: pillarIndex * 0.1 + taskIndex * 0.05 }}
                  onClick={() => toggleTask(task.id)}
                  className={`w-full glass-dark rounded-xl p-4 flex items-center gap-4 transition-all touch-target ${
                    task.completed ? 'opacity-60' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <div
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                      task.completed
                        ? 'border-transparent'
                        : 'border-steel/50'
                    }`}
                    style={{
                      backgroundColor: task.completed ? task.color : 'transparent',
                    }}
                  >
                    {task.completed && <span className="text-white text-sm">✓</span>}
                  </div>

                  {/* Icon */}
                  <span className="text-2xl">{task.icon}</span>

                  {/* Task name */}
                  <span
                    className={`flex-1 text-left ${
                      task.completed
                        ? 'text-steel line-through'
                        : 'text-white font-medium'
                    }`}
                  >
                    {task.name}
                  </span>

                  {/* Pillar color indicator */}
                  <div
                    className="w-1 h-8 rounded-full"
                    style={{ backgroundColor: task.color }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Completion celebration */}
      {completionPercentage === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
        >
          <div className="text-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-4"
            >
              👑
            </motion.div>
            <h2 className="font-serif text-4xl gold-gradient">
              Day Complete!
            </h2>
          </div>
        </motion.div>
      )}
    </div>
  )
}
