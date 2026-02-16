'use client'

import { motion } from 'framer-motion'

interface Metric {
  id: string
  label: string
  value: string
  icon: string
  completed: boolean
}

export default function BottomMetrics() {
  const metrics: Metric[] = [
    { id: '1', label: 'Sleep', value: '8h', icon: '🌙', completed: true },
    { id: '2', label: 'Training', value: 'Done', icon: '🏋️', completed: true },
    { id: '3', label: 'Nutrition', value: '1400 cal', icon: '🍎', completed: true },
    { id: '4', label: 'Mindset', value: 'Focused', icon: '🧠', completed: true },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="relative z-10"
    >
      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + index * 0.05 }}
            className="cosmic-panel rounded-xl p-3 flex items-center gap-3"
          >
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.05) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
              }}
            >
              <span className="text-xl">{metric.icon}</span>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-gold text-xs font-semibold">{metric.label}</p>
              <p className="text-white text-sm font-serif truncate">{metric.value}</p>
            </div>

            {/* Checkmark */}
            {metric.completed && (
              <span className="text-green-500 text-sm flex-shrink-0">✓</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
