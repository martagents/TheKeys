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
      {/* Title with decorative arrows */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="text-white/40 text-sm">→</span>
        <h2 className="text-white text-lg title-font tracking-wider">
          Today&apos;s Win
        </h2>
        <span className="text-white/40 text-sm">←</span>
      </div>

      {/* Win Box */}
      <div className="bordered-box rounded-xl p-6">
        <textarea
          value={win}
          onChange={(e) => setWin(e.target.value)}
          className="w-full bg-transparent border-none text-white body-font italic text-center text-base focus:outline-none resize-none placeholder-white/30"
          placeholder="What's your win today?"
          rows={2}
        />
      </div>

      {/* Diamond divider */}
      <div className="flex items-center justify-center mt-6">
        <div className="ornate-diamond"></div>
      </div>
    </motion.div>
  )
}
