'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export interface EnergyMetrics {
  sleep: number // 0-100
  training: number // 0-100
  nutrition: number // 0-100
  stress: number // 0-100 (inverted: lower stress = higher score)
  focus: number // 0-100
}

interface EnergyDashboardProps {
  onEnergyChange?: (rating: number) => void
}

export default function EnergyDashboard({ onEnergyChange }: EnergyDashboardProps) {
  const [metrics, setMetrics] = useState<EnergyMetrics>({
    sleep: 70,
    training: 70,
    nutrition: 70,
    stress: 50, // Lower is better, but displayed inverted
    focus: 70,
  })

  // Calculate weighted energy rating
  const calculateEnergyRating = (m: EnergyMetrics): number => {
    const weights = {
      sleep: 0.25,
      training: 0.20,
      nutrition: 0.20,
      stress: 0.20, // Inverted: (100 - stress) * weight
      focus: 0.15,
    }

    const stressScore = 100 - m.stress // Invert stress: low stress = high score

    const rating = Math.round(
      m.sleep * weights.sleep +
      m.training * weights.training +
      m.nutrition * weights.nutrition +
      stressScore * weights.stress +
      m.focus * weights.focus
    )

    return rating
  }

  const energyRating = calculateEnergyRating(metrics)

  const updateMetric = (key: keyof EnergyMetrics, value: number) => {
    const newMetrics = { ...metrics, [key]: value }
    setMetrics(newMetrics)
    const newRating = calculateEnergyRating(newMetrics)
    if (onEnergyChange) onEnergyChange(newRating)
    if ('vibrate' in navigator) navigator.vibrate(10)
  }

  const getEnergyColor = (rating: number): string => {
    if (rating >= 80) return '#34D399' // Green
    if (rating >= 60) return '#F59E0B' // Amber
    return '#EF4444' // Red
  }

  const sliders: Array<{
    key: keyof EnergyMetrics
    label: string
    icon: string
    invert?: boolean
  }> = [
    { key: 'sleep', label: 'Sleep Quality', icon: '😴' },
    { key: 'training', label: 'Training', icon: '🏃' },
    { key: 'nutrition', label: 'Nutrition', icon: '🥗' },
    { key: 'stress', label: 'Stress Level', icon: '😰', invert: true },
    { key: 'focus', label: 'Focus Quality', icon: '🎯' },
  ]

  return (
    <div className="space-y-6">
      {/* Energy Rating Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-pillar rounded-2xl p-6 text-center border-2"
        style={{
          borderColor: `${getEnergyColor(energyRating)}50`,
          boxShadow: `0 8px 32px ${getEnergyColor(energyRating)}20`,
        }}
      >
        <p className="text-steel text-xs uppercase tracking-widest mb-2">
          Energy Rating
        </p>
        <motion.div
          key={energyRating}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          className="text-6xl font-bold mb-1"
          style={{ color: getEnergyColor(energyRating) }}
        >
          {energyRating}
        </motion.div>
        <p className="text-steel text-sm">
          {energyRating >= 80 ? 'Peak Performance' : energyRating >= 60 ? 'Good Energy' : 'Need Recovery'}
        </p>
      </motion.div>

      {/* Sliders */}
      <div className="space-y-4">
        {sliders.map((slider, index) => {
          const displayValue = slider.invert ? 100 - metrics[slider.key] : metrics[slider.key]

          return (
            <motion.div
              key={slider.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{slider.icon}</span>
                  <span className="text-white font-medium">{slider.label}</span>
                </div>
                <span className="text-gold font-bold text-lg">
                  {displayValue}
                </span>
              </div>

              {/* Slider */}
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={metrics[slider.key]}
                  onChange={(e) => updateMetric(slider.key, parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${getEnergyColor(displayValue)} 0%, ${getEnergyColor(displayValue)} ${displayValue}%, rgba(142, 142, 147, 0.3) ${displayValue}%, rgba(142, 142, 147, 0.3) 100%)`,
                  }}
                />
              </div>

              <div className="flex justify-between mt-2 text-xs text-steel">
                <span>{slider.invert ? 'High' : 'Low'}</span>
                <span>{slider.invert ? 'Low' : 'High'}</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
