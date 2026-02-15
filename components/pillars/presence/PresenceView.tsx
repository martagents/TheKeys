'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Spark {
  id: string
  item: string
  purchased: boolean
  photoUrl?: string
}

export default function PresenceView() {
  const [showFaithStatement, setShowFaithStatement] = useState(false)
  const [mood, setMood] = useState<string>('')
  const [sparks, setSparks] = useState<Spark[]>([
    { id: '1', item: 'Leather journal', purchased: false },
    { id: '2', item: 'Wireless earbuds', purchased: true },
  ])
  const [newSpark, setNewSpark] = useState('')

  const addSpark = () => {
    if (newSpark.trim()) {
      setSparks([
        ...sparks,
        { id: Date.now().toString(), item: newSpark, purchased: false },
      ])
      setNewSpark('')
      if ('vibrate' in navigator) navigator.vibrate(30)
    }
  }

  const toggleSpark = (id: string) => {
    setSparks(
      sparks.map((spark) =>
        spark.id === id ? { ...spark, purchased: !spark.purchased } : spark
      )
    )
    if ('vibrate' in navigator) navigator.vibrate(30)
  }

  const moods = ['🔥', '😌', '💪', '🧘', '⚡']

  return (
    <div className="min-h-screen bg-black p-6 pt-16 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="font-serif text-4xl gold-gradient mb-2">Presence</h1>
        <p className="text-steel text-sm tracking-widest uppercase">
          Sovereign Mind
        </p>
      </motion.div>

      <div className="space-y-6 max-w-md mx-auto">
        {/* Faith Statement */}
        <div className="glass-dark rounded-2xl p-6">
          <button
            onClick={() => {
              setShowFaithStatement(!showFaithStatement)
              if ('vibrate' in navigator) navigator.vibrate(30)
            }}
            className="w-full flex items-center justify-between mb-4"
          >
            <h3 className="text-white font-semibold flex items-center gap-2">
              <span className="text-purple-400">✨</span>
              Faith Statement
            </h3>
            <span className="text-steel text-lg">
              {showFaithStatement ? '−' : '+'}
            </span>
          </button>

          <AnimatePresence>
            {showFaithStatement && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-luxury-charcoal/50 rounded-xl p-5 border border-purple-400/20">
                  <p className="text-white/90 leading-relaxed text-sm font-serif italic mb-4">
                    "By the first day of January, 2027, I will have in my possession{' '}
                    <span className="text-gold font-bold">10m SGD</span> in liquid assets
                    with an active portfolio of{' '}
                    <span className="text-gold font-bold">100m SGD</span> assets.
                  </p>
                  <p className="text-white/90 leading-relaxed text-sm font-serif italic mb-4">
                    The money will come to me from time to time in various amounts in the
                    interim. For this money I will give the most valuable and impactful
                    delivery of services in the greatest volume and impact that I can, to
                    enable our firm's delivery of transformative AI products and solutions
                    to businesses and individuals which changes their lives, businesses and
                    prospects.
                  </p>
                  <p className="text-white/90 leading-relaxed text-sm font-serif italic mb-4">
                    I believe that I will have this money in my possession and my faith is
                    so strong that I can now see this money before my eyes, I can touch it
                    with my hands, it is now awaiting transfer to me at the time and in the
                    proportion that I deliver the service in return for this money.
                  </p>
                  <p className="text-gold/90 leading-relaxed text-sm font-serif italic font-semibold">
                    I am awaiting the plan and I will follow that plan when it is received.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mood Log */}
        <div className="glass-dark rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="text-blue-400">💭</span>
            Mood Log
          </h3>
          <div className="flex gap-3 justify-around">
            {moods.map((emoji) => (
              <motion.button
                key={emoji}
                onClick={() => {
                  setMood(emoji)
                  if ('vibrate' in navigator) navigator.vibrate(30)
                }}
                whileTap={{ scale: 0.9 }}
                className={`text-4xl p-4 rounded-xl touch-target transition-all ${
                  mood === emoji
                    ? 'bg-gold/20 border-2 border-gold'
                    : 'bg-steel/5 border-2 border-transparent'
                }`}
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sparks List (Shopping/Wish List) */}
        <div className="glass-dark rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="text-gold">✧</span>
            Sparks
          </h3>
          <p className="text-steel text-xs mb-4">
            Items to acquire. Check off when purchased.
          </p>

          {/* Add new spark */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newSpark}
              onChange={(e) => setNewSpark(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSpark()}
              placeholder="Add new item..."
              className="flex-1 bg-luxury-charcoal border border-steel/30 rounded-xl px-4 py-3 text-white placeholder-steel/50 focus:border-gold focus:outline-none text-sm"
            />
            <button
              onClick={addSpark}
              className="glass px-4 py-3 rounded-xl text-gold font-bold touch-target hover:bg-gold/10 transition-colors"
            >
              +
            </button>
          </div>

          {/* Sparks list */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <AnimatePresence>
              {sparks.map((spark) => (
                <motion.div
                  key={spark.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`p-4 rounded-xl border transition-all ${
                    spark.purchased
                      ? 'bg-green-400/10 border-green-400/30'
                      : 'bg-luxury-charcoal border-steel/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleSpark(spark.id)}
                      className="flex items-center gap-3 flex-1 text-left"
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          spark.purchased
                            ? 'bg-green-400 border-green-400'
                            : 'border-steel/50'
                        }`}
                      >
                        {spark.purchased && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </div>
                      <span
                        className={`${
                          spark.purchased
                            ? 'text-steel line-through'
                            : 'text-white'
                        }`}
                      >
                        {spark.item}
                      </span>
                    </button>

                    {spark.purchased && (
                      <button className="text-xs text-gold hover:text-yellow-300 transition-colors">
                        📸 Enshrine
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
