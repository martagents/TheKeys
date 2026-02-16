'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface ReflectionData {
  worked: string
  didntWork: string
  nextWeek: string
  date: string
}

export default function WeeklyReflection() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [reflection, setReflection] = useState<ReflectionData>({
    worked: '',
    didntWork: '',
    nextWeek: '',
    date: new Date().toISOString(),
  })

  // Only show on Fridays
  const isFriday = new Date().getDay() === 5

  if (!isFriday) return null

  const handleSave = () => {
    console.log('Saving weekly reflection:', reflection)
    if ('vibrate' in navigator) navigator.vibrate(30)
    setIsExpanded(false)
  }

  const prompts = [
    { key: 'worked' as const, label: 'What worked?', icon: '✅' },
    { key: 'didntWork' as const, label: "What didn't?", icon: '⚠️' },
    { key: 'nextWeek' as const, label: 'What matters next week?', icon: '🎯' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-pillar rounded-2xl p-4 border border-gold/30"
    >
      <button
        onClick={() => {
          setIsExpanded(!isExpanded)
          if ('vibrate' in navigator) navigator.vibrate(30)
        }}
        className="w-full flex items-center justify-between touch-target"
      >
        <h3 className="text-white font-semibold flex items-center gap-2">
          <span className="text-gold">📝</span>
          Weekly Reflection
          <span className="text-xs text-gold bg-gold/10 px-2 py-1 rounded">Friday</span>
        </h3>
        <span className="text-steel text-lg">
          {isExpanded ? '−' : '+'}
        </span>
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 space-y-3 overflow-hidden"
        >
          {prompts.map((prompt) => (
            <div key={prompt.key} className="space-y-1">
              <label className="text-steel text-sm flex items-center gap-2">
                <span>{prompt.icon}</span>
                {prompt.label}
              </label>
              <textarea
                value={reflection[prompt.key]}
                onChange={(e) =>
                  setReflection({ ...reflection, [prompt.key]: e.target.value })
                }
                className="w-full bg-black/30 border border-steel/20 rounded-xl p-3 text-white placeholder-steel/50 resize-none focus:outline-none focus:border-gold/50 min-h-[60px]"
                placeholder="Reflect..."
              />
            </div>
          ))}

          <button
            onClick={handleSave}
            className="w-full bg-gold hover:bg-gold/90 text-black font-semibold py-3 rounded-xl transition-all touch-target"
          >
            Save Reflection
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
