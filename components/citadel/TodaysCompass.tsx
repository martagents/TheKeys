'use client'

import { motion } from 'framer-motion'

interface CompassItem {
  id: string
  category: string
  task: string
  icon: string
  completed: boolean
}

export default function TodaysCompass() {
  const compassItems: CompassItem[] = [
    { id: '1', category: 'Business', task: 'Review Q1 metrics', icon: '🏃', completed: false },
    { id: '2', category: 'Health', task: 'Morning workout', icon: '❤️', completed: true },
    { id: '3', category: 'Family', task: 'Evening call with parents', icon: '👥', completed: false },
    { id: '4', category: 'Growth', task: 'Read 30 pages', icon: '📖', completed: false },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative z-10"
    >
      {/* Title */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold"></div>
        <h2 className="script-font text-3xl text-gold">
          Today&apos;s Compass
        </h2>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold"></div>
      </div>

      {/* Compass Items */}
      <div className="space-y-3">
        {compassItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-center gap-3"
          >
            {/* Icon Circle */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, rgba(212, 175, 55, 0.1) 100%)',
                border: '2px solid rgba(212, 175, 55, 0.5)',
                boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)',
              }}
            >
              <span className="text-2xl">{item.icon}</span>
            </div>

            {/* Text */}
            <div className="flex-1">
              <p className="text-gold font-serif font-bold text-sm">{item.category}</p>
              <p className="text-white/80 font-serif text-sm">{item.task}</p>
            </div>

            {/* Checkbox */}
            <div
              className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                item.completed
                  ? 'bg-green-500/20 border-green-500'
                  : 'border-gold/40'
              }`}
            >
              {item.completed && <span className="text-green-500 text-sm">✓</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
