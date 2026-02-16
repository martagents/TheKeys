'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type TenXCategory = 'Business Impact' | 'Personal Capacity' | 'Physical Vitality & Strength' | 'Mental Peace & Sharpness'

interface TenXEntry {
  id: string
  statement: string
  category: TenXCategory
  date: string
}

export default function Daily10XSection() {
  const [statement, setStatement] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<TenXCategory>('Business Impact')
  const [currentEntry, setCurrentEntry] = useState<TenXEntry | null>(null)

  const categories: TenXCategory[] = [
    'Business Impact',
    'Personal Capacity',
    'Physical Vitality & Strength',
    'Mental Peace & Sharpness',
  ]

  const categoryIcons: Record<TenXCategory, string> = {
    'Business Impact': '💼',
    'Personal Capacity': '🚀',
    'Physical Vitality & Strength': '💪',
    'Mental Peace & Sharpness': '🧠',
  }

  const handleSave = () => {
    if (statement.trim()) {
      setCurrentEntry({
        id: Date.now().toString(),
        statement: statement.trim(),
        category: selectedCategory,
        date: new Date().toISOString(),
      })
      if ('vibrate' in navigator) navigator.vibrate(30)
    }
  }

  const handleClose = () => {
    setCurrentEntry(null)
    setStatement('')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-pillar rounded-2xl p-4 border border-orange-400/30"
    >
      <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
        <span className="text-orange-400">🎯</span>
        Daily 10X
      </h3>

      {currentEntry ? (
        <div className="space-y-3">
          <div className="bg-black/30 rounded-xl p-4 border border-orange-400/20">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{categoryIcons[currentEntry.category]}</span>
                <span className="text-steel text-xs">{currentEntry.category}</span>
              </div>
              <button
                onClick={handleClose}
                className="text-steel hover:text-white text-sm touch-target"
              >
                ✕
              </button>
            </div>
            <p className="text-white leading-relaxed">{currentEntry.statement}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <textarea
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            placeholder="What's your 10X initiative today?"
            className="w-full bg-black/30 border border-steel/20 rounded-xl p-3 text-white placeholder-steel/50 resize-none focus:outline-none focus:border-orange-400/50 min-h-[80px]"
          />

          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  if ('vibrate' in navigator) navigator.vibrate(10)
                }}
                className={`p-2 rounded-xl text-xs transition-all touch-target ${
                  selectedCategory === category
                    ? 'bg-orange-400/20 border-2 border-orange-400 text-white'
                    : 'bg-steel/5 border-2 border-transparent text-steel'
                }`}
              >
                <span className="mr-1">{categoryIcons[category]}</span>
                {category}
              </button>
            ))}
          </div>

          <button
            onClick={handleSave}
            disabled={!statement.trim()}
            className="w-full bg-orange-400 hover:bg-orange-500 disabled:bg-steel/20 disabled:text-steel text-black font-semibold py-3 rounded-xl transition-all touch-target"
          >
            Set Daily 10X
          </button>
        </div>
      )}
    </motion.div>
  )
}
