'use client'

import { motion } from 'framer-motion'

interface EnergyRatingDisplayProps {
  rating: number
  onRatingChange: (rating: number) => void
}

export default function EnergyRatingDisplay({ rating, onRatingChange }: EnergyRatingDisplayProps) {
  const getEnergyColor = (r: number): string => {
    if (r >= 80) return '#34D399' // Green
    if (r >= 60) return '#F59E0B' // Amber
    return '#EF4444' // Red
  }

  const getEnergyLabel = (r: number): string => {
    if (r >= 80) return 'Peak Performance'
    if (r >= 60) return 'Good Energy'
    return 'Need Recovery'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="glass-pillar rounded-2xl p-4 border-2"
      style={{
        borderColor: `${getEnergyColor(rating)}50`,
        boxShadow: `0 8px 32px ${getEnergyColor(rating)}20`,
      }}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              key={rating}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="text-4xl font-bold"
              style={{ color: getEnergyColor(rating) }}
            >
              {rating}
            </motion.div>
            <div>
              <p className="text-white font-semibold flex items-center gap-2">
                <span className="text-purple-400">⚡</span>
                Energy Rating
              </p>
              <p className="text-steel text-xs">{getEnergyLabel(rating)}</p>
            </div>
          </div>
        </div>

        {/* Slider Input */}
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="100"
            value={rating}
            onChange={(e) => {
              onRatingChange(parseInt(e.target.value))
              if ('vibrate' in navigator) navigator.vibrate(10)
            }}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${getEnergyColor(rating)} 0%, ${getEnergyColor(rating)} ${rating}%, rgba(212, 175, 55, 0.2) ${rating}%, rgba(212, 175, 55, 0.2) 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-steel">
            <span>Recovering</span>
            <span>Peak</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
