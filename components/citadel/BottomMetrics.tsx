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
    { id: '1', label: 'Sleep', value: '6.5 hrs', icon: '☾', completed: true },
    { id: '2', label: 'Nutrition', value: 'On Track', icon: '◈', completed: true },
    { id: '3', label: 'Training', value: 'Complete', icon: '◆', completed: true },
    { id: '4', label: 'Mindset', value: 'Low Stress', icon: '◉', completed: true },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="relative z-10"
    >
      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + index * 0.05 }}
            className="bordered-box rounded-xl p-4 flex flex-col items-center gap-2"
          >
            {/* Icon */}
            <div className="text-5xl silver-icon silver-glow">{metric.icon}</div>

            {/* Label and Value */}
            <div className="text-center">
              <p className="text-white text-xs font-medium mb-1">{metric.label}</p>
              <p className="text-white/70 text-sm body-font">{metric.value}</p>
            </div>

            {/* Checkmark */}
            {metric.completed && (
              <span className="text-green-400 text-sm">✓</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
