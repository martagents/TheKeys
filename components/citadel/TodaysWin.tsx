'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function TodaysWin() {
  const [win, setWin] = useState('Secured a key partnership deal.')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="relative z-10"
    >
      {/* Title */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold"></div>
        <h2 className="script-font text-4xl text-gold"
          style={{
            textShadow: '0 0 20px rgba(212, 175, 55, 0.6), 0 2px 8px rgba(0, 0, 0, 0.8)'
          }}
        >
          Today&apos;s Win
        </h2>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold"></div>
      </div>

      {/* Win Box */}
      <div
        className="glass rounded-2xl p-6"
      >
        <textarea
          value={win}
          onChange={(e) => setWin(e.target.value)}
          className="w-full bg-transparent border-none text-parchment body-font italic text-center text-lg focus:outline-none resize-none placeholder-parchment-dark"
          style={{
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
          }}
          placeholder="What's your win today?"
          rows={3}
        />
      </div>
    </motion.div>
  )
}
