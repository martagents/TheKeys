'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface CompassItem {
  id: string
  category: string
  task: string
  icon: string
  completed: boolean
}

export default function TodaysCompass() {
  const [items, setItems] = useState<CompassItem[]>([
    { id: '1', category: 'Business', task: 'Review Q1 metrics', icon: '🚀', completed: false },
    { id: '2', category: 'Health', task: 'Morning workout', icon: '❤️', completed: false },
    { id: '3', category: 'Family', task: 'Evening call with parents', icon: '👥', completed: false },
    { id: '4', category: 'Growth', task: 'Read 30 pages', icon: '📖', completed: false },
  ])

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
    if ('vibrate' in navigator) navigator.vibrate(30)
  }

  const updateItemTask = (id: string, task: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, task } : item
    ))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative z-10"
    >
      {/* Title with decorative arrows */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="text-white/40 text-sm">→</span>
        <h2 className="text-white text-lg title-font tracking-wider">
          Today&apos;s Compass
        </h2>
        <span className="text-white/40 text-sm">←</span>
      </div>

      {/* Compass Items */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-center gap-4"
          >
            {/* Icon Circle */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-white/5"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <span className="text-2xl">{item.icon}</span>
            </div>

            {/* Category and Task */}
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-white font-medium text-sm">{item.category}:</span>
                <input
                  type="text"
                  value={item.task}
                  onChange={(e) => updateItemTask(item.id, e.target.value)}
                  className={`flex-1 bg-transparent border-none text-white/70 body-font text-sm focus:outline-none focus:text-white ${
                    item.completed ? 'line-through opacity-50' : ''
                  }`}
                  placeholder="Add task..."
                />
              </div>
            </div>

            {/* Checkbox */}
            <button
              onClick={() => toggleItem(item.id)}
              className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 transition-all ${
                item.completed
                  ? 'bg-green-500/30'
                  : 'bg-white/5'
              }`}
              style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {item.completed && <span className="text-green-400 text-sm">✓</span>}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
