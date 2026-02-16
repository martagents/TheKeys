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
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold"></div>
        <h2 className="font-serif text-3xl text-gold font-bold tracking-widest">
          TODAY&apos;S WIN
        </h2>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold"></div>
      </div>

      {/* Win Box */}
      <div
        className="cosmic-panel rounded-2xl p-4"
        style={{
          border: '2px solid rgba(212, 175, 55, 0.4)',
        }}
      >
        <textarea
          value={win}
          onChange={(e) => setWin(e.target.value)}
          className="w-full bg-transparent border-none text-white font-serif text-center text-base focus:outline-none resize-none"
          placeholder="What&apos;s your win today?"
          rows={2}
        />
      </div>
    </motion.div>
  )
}
