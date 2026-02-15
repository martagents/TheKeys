'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function FitnessView() {
  const [caloriesMet, setCaloriesMet] = useState(false)
  const [proteinMet, setProteinMet] = useState(false)
  const [steps, setSteps] = useState(0)
  const [weight, setWeight] = useState('')

  // Mock 7-day weight data
  const weeklyWeights = [165.2, 164.8, 165.5, 164.9, 165.1, 164.7, 165.0]
  const averageWeight = (
    weeklyWeights.reduce((a, b) => a + b, 0) / weeklyWeights.length
  ).toFixed(1)

  return (
    <div className="min-h-screen bg-black p-6 pt-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="font-serif text-4xl gold-gradient mb-2">Fitness</h1>
        <p className="text-steel text-sm tracking-widest uppercase">
          Nutrition & Movement
        </p>
      </motion.div>

      <div className="space-y-6 max-w-md mx-auto">
        {/* Nutrition Adherence */}
        <div className="glass-dark rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-400">🎯</span>
            Nutrition Targets
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => {
                setCaloriesMet(!caloriesMet)
                if ('vibrate' in navigator) navigator.vibrate(30)
              }}
              className={`w-full p-4 rounded-xl border-2 transition-all touch-target ${
                caloriesMet
                  ? 'bg-green-400/10 border-green-400'
                  : 'bg-steel/5 border-steel/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-white">1400 Calories</span>
                <div
                  className={`w-6 h-6 rounded-full ${
                    caloriesMet ? 'bg-green-400' : 'bg-steel/30'
                  }`}
                />
              </div>
            </button>

            <button
              onClick={() => {
                setProteinMet(!proteinMet)
                if ('vibrate' in navigator) navigator.vibrate(30)
              }}
              className={`w-full p-4 rounded-xl border-2 transition-all touch-target ${
                proteinMet
                  ? 'bg-green-400/10 border-green-400'
                  : 'bg-steel/5 border-steel/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-white">100g Protein</span>
                <div
                  className={`w-6 h-6 rounded-full ${
                    proteinMet ? 'bg-green-400' : 'bg-steel/30'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="glass-dark rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="text-blue-400">👟</span>
            Steps
          </h3>
          <input
            type="number"
            value={steps || ''}
            onChange={(e) => setSteps(parseInt(e.target.value) || 0)}
            placeholder="Enter today's steps"
            className="w-full bg-luxury-charcoal border border-steel/30 rounded-xl px-4 py-3 text-white placeholder-steel/50 focus:border-gold focus:outline-none"
          />
          <div className="mt-3 flex justify-between text-sm">
            <span className="text-steel">Target: 10,000</span>
            <span
              className={`${
                steps >= 10000 ? 'text-green-400' : 'text-steel'
              }`}
            >
              {steps >= 10000 ? '✓ Goal met' : `${10000 - steps} to go`}
            </span>
          </div>
          {/* Progress bar */}
          <div className="mt-2 h-2 bg-steel/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-green-400"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((steps / 10000) * 100, 100)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Weight Tracking */}
        <div className="glass-dark rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="text-purple-400">⚖️</span>
            Weight (7-day average)
          </h3>
          <div className="flex gap-3">
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Today's weight"
              className="flex-1 bg-luxury-charcoal border border-steel/30 rounded-xl px-4 py-3 text-white placeholder-steel/50 focus:border-gold focus:outline-none"
            />
            <span className="text-white self-center">lbs</span>
          </div>

          {/* 7-day average */}
          <div className="mt-4 p-4 bg-luxury-charcoal rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-steel text-sm">7-Day Average</span>
              <span className="text-gold text-2xl font-bold">
                {averageWeight} lbs
              </span>
            </div>
            <p className="text-steel/70 text-xs mt-2">
              Smoothed to reduce fluctuation anxiety
            </p>
          </div>

          {/* Mini chart visualization */}
          <div className="mt-4 flex items-end gap-1 h-16">
            {weeklyWeights.map((w, i) => (
              <div
                key={i}
                className="flex-1 bg-purple-400/30 rounded-t"
                style={{
                  height: `${((w - Math.min(...weeklyWeights)) / (Math.max(...weeklyWeights) - Math.min(...weeklyWeights))) * 100}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
