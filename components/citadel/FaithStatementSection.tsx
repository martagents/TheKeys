'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FaithStatementSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-pillar rounded-2xl p-4 border border-purple-400/30"
    >
      <button
        onClick={() => {
          setIsExpanded(!isExpanded)
          if ('vibrate' in navigator) navigator.vibrate(30)
        }}
        className="w-full flex items-center justify-between touch-target"
      >
        <h3 className="text-white font-semibold flex items-center gap-2">
          <span className="text-purple-400">✨</span>
          Faith Statement
        </h3>
        <span className="text-steel text-lg">
          {isExpanded ? '−' : '+'}
        </span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 bg-black/30 rounded-xl p-4 border border-purple-400/20">
              <p className="text-white/90 leading-relaxed text-sm font-serif italic mb-3">
                &ldquo;By the first day of January, 2027, I will have in my possession{' '}
                <span className="text-gold font-bold">10m SGD</span> in liquid assets
                with an active portfolio of{' '}
                <span className="text-gold font-bold">100m SGD</span> assets.
              </p>
              <p className="text-white/90 leading-relaxed text-sm font-serif italic mb-3">
                The money will come to me from time to time in various amounts in the
                interim. For this money I will give the most valuable and impactful
                delivery of services in the greatest volume and impact that I can, to
                enable our firm&apos;s delivery of transformative AI products and solutions
                to businesses and individuals which changes their lives, businesses and
                prospects.
              </p>
              <p className="text-white/90 leading-relaxed text-sm font-serif italic">
                I will have this or something better, I commit myself to the cause.
                My faith knows this: this or something better now manifests for me
                in completely satisfying and harmonious ways for the highest good of all concerned.&rdquo;
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
