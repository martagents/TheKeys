'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface CheckInData {
  businessForward: string
  proud: string
  energy: string
  date: string
}

export default function NightlyCheckIn() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [checkIn, setCheckIn] = useState<CheckInData>({
    businessForward: '',
    proud: '',
    energy: '',
    date: new Date().toISOString(),
  })

  const handleSave = () => {
    // Save to localStorage or backend
    console.log('Saving check-in:', checkIn)
    if ('vibrate' in navigator) navigator.vibrate(30)
    setIsExpanded(false)
  }

  const prompts = [
    { key: 'businessForward' as const, label: 'What moved the business forward?', icon: '📈' },
    { key: 'proud' as const, label: 'What made me proud today?', icon: '🌟' },
    { key: 'energy' as const, label: 'What gave me energy?', icon: '⚡' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="glass-pillar rounded-2xl p-4 border border-blue-400/30"
    >
      <button
        onClick={() => {
          setIsExpanded(!isExpanded)
          if ('vibrate' in navigator) navigator.vibrate(30)
        }}
        className="w-full flex items-center justify-between touch-target"
      >
        <h3 className="text-white font-semibold flex items-center gap-2">
          <span className="text-blue-400">🌙</span>
          Nightly Check-In
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
                value={checkIn[prompt.key]}
                onChange={(e) =>
                  setCheckIn({ ...checkIn, [prompt.key]: e.target.value })
                }
                className="w-full bg-black/30 border border-steel/20 rounded-xl p-3 text-white placeholder-steel/50 resize-none focus:outline-none focus:border-blue-400/50 min-h-[60px]"
                placeholder="Reflect..."
              />
            </div>
          ))}

          <button
            onClick={handleSave}
            className="w-full bg-blue-400 hover:bg-blue-500 text-black font-semibold py-3 rounded-xl transition-all touch-target"
          >
            Save Check-In
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
