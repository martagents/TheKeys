'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface System {
  id: string
  content: string
  createdAt: Date
}

export default function WarriorView() {
  const [daily10x, setDaily10x] = useState('')
  const [weeklyPlan, setWeeklyPlan] = useState('')
  const [newSystem, setNewSystem] = useState('')
  const [showForge, setShowForge] = useState(false)
  const [systems, setSystems] = useState<System[]>([
    {
      id: '1',
      content: 'Morning cold shower resets the nervous system and primes for focus.',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      content: 'No phone for first 90 minutes = sovereignty over attention.',
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    },
  ])
  const [searchQuery, setSearchQuery] = useState('')

  const addSystem = () => {
    if (newSystem.trim()) {
      setSystems([
        { id: Date.now().toString(), content: newSystem, createdAt: new Date() },
        ...systems,
      ])
      setNewSystem('')
      setShowForge(false)
      if ('vibrate' in navigator) navigator.vibrate([50, 30, 50])
    }
  }

  const filteredSystems = systems.filter((s) =>
    s.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Check if today is Friday
  const today = new Date()
  const isFriday = today.getDay() === 5

  return (
    <div className="min-h-screen bg-black p-6 pt-16 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="font-serif text-4xl gold-gradient mb-2">Warrior</h1>
        <p className="text-steel text-sm tracking-widest uppercase">
          Relentless Progress
        </p>
      </motion.div>

      <div className="space-y-6 max-w-md mx-auto">
        {/* Daily 10X */}
        <div className="glass-dark rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="text-orange-400">⚡</span>
            Daily 10X
          </h3>
          <p className="text-steel text-xs mb-3">
            One action today that moves you 10x forward
          </p>
          <textarea
            value={daily10x}
            onChange={(e) => setDaily10x(e.target.value)}
            placeholder="What's your 10X move today?"
            className="w-full bg-luxury-charcoal border border-steel/30 rounded-xl px-4 py-3 text-white placeholder-steel/50 focus:border-gold focus:outline-none resize-none h-24"
          />
          {daily10x && (
            <button className="mt-3 w-full glass rounded-xl py-3 text-gold font-medium touch-target hover:bg-gold/10 transition-colors">
              Lock In
            </button>
          )}
        </div>

        {/* Weekly Planning - Only on Fridays */}
        {isFriday && (
          <div className="glass-dark rounded-2xl p-6 border-2 border-gold/30">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="text-gold">📋</span>
              Weekly Planning
            </h3>
            <p className="text-steel text-xs mb-3">
              Plan your week ahead every Friday
            </p>
            <textarea
              value={weeklyPlan}
              onChange={(e) => setWeeklyPlan(e.target.value)}
              placeholder="What are your top 3 priorities for next week?"
              className="w-full bg-luxury-charcoal border border-steel/30 rounded-xl px-4 py-3 text-white placeholder-steel/50 focus:border-gold focus:outline-none resize-none h-32"
            />
            {weeklyPlan && (
              <button className="mt-3 w-full glass rounded-xl py-3 text-gold font-medium touch-target hover:bg-gold/10 transition-colors">
                Save Weekly Plan
              </button>
            )}
          </div>
        )}

        {/* The Forge - Add New System */}
        <div className="glass-dark rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="text-red-400">🔥</span>
            The Forge
          </h3>
          <p className="text-steel text-xs mb-4">
            Capture new systems & principles weekly
          </p>

          {!showForge ? (
            <button
              onClick={() => setShowForge(true)}
              className="w-full glass rounded-xl py-3 text-gold font-medium touch-target hover:bg-gold/10 transition-colors"
            >
              + Forge New System
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <textarea
                value={newSystem}
                onChange={(e) => setNewSystem(e.target.value)}
                placeholder="What did you learn this week?"
                autoFocus
                className="w-full bg-luxury-charcoal border border-gold rounded-xl px-4 py-3 text-white placeholder-steel/50 focus:border-gold focus:outline-none resize-none h-32 mb-3"
              />
              <div className="flex gap-2">
                <button
                  onClick={addSystem}
                  className="flex-1 bg-gold/20 border border-gold rounded-xl py-3 text-gold font-medium touch-target hover:bg-gold/30 transition-colors"
                >
                  Add to Wisdom
                </button>
                <button
                  onClick={() => {
                    setShowForge(false)
                    setNewSystem('')
                  }}
                  className="px-4 glass rounded-xl text-steel hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Book of Wisdom */}
        <div className="glass-dark rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="text-gold">📖</span>
            Book of Wisdom
          </h3>
          <p className="text-steel text-xs mb-4">
            {systems.length} system{systems.length !== 1 ? 's' : ''} captured
          </p>

          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search wisdom..."
            className="w-full bg-luxury-charcoal border border-steel/30 rounded-xl px-4 py-3 text-white placeholder-steel/50 focus:border-gold focus:outline-none mb-4 text-sm"
          />

          {/* Systems list */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {filteredSystems.map((system, index) => (
                <motion.div
                  key={system.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-luxury-charcoal rounded-xl border border-steel/20"
                >
                  <p className="text-white text-sm leading-relaxed mb-2">
                    {system.content}
                  </p>
                  <p className="text-steel text-xs">
                    {system.createdAt.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredSystems.length === 0 && (
              <p className="text-steel text-sm text-center py-8">
                {searchQuery ? 'No matching wisdom found' : 'No systems yet'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
