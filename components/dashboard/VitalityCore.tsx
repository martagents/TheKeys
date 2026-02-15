'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function VitalityCore() {
  // Mock data - will be replaced with Supabase data
  const [caloriesMet, setCaloriesMet] = useState(true)
  const [proteinMet, setProteinMet] = useState(false)

  const bothMet = caloriesMet && proteinMet
  const orbColor = bothMet ? '#34D399' : caloriesMet || proteinMet ? '#F59E0B' : '#EF4444'

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-20">
      <motion.div
        className="relative"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      >
        {/* Outer glow */}
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            background: `radial-gradient(circle, ${orbColor}40 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Main orb */}
        <motion.div
          className="relative glass-dark rounded-full p-6 w-32 h-32 flex flex-col items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              `0 0 20px ${orbColor}40`,
              `0 0 40px ${orbColor}60`,
              `0 0 20px ${orbColor}40`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          {/* Center dot indicator */}
          <motion.div
            className="w-8 h-8 rounded-full mb-2"
            style={{
              background: `radial-gradient(circle, ${orbColor}, ${orbColor}80)`,
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />

          {/* Status indicators */}
          <div className="flex gap-2">
            {/* Calorie indicator */}
            <motion.div
              className={`w-2 h-2 rounded-full ${
                caloriesMet ? 'bg-green-400' : 'bg-red-400'
              }`}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0,
              }}
            />

            {/* Protein indicator */}
            <motion.div
              className={`w-2 h-2 rounded-full ${
                proteinMet ? 'bg-green-400' : 'bg-red-400'
              }`}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5,
              }}
            />
          </div>

          {/* Label */}
          <p className="text-[8px] text-steel mt-1 uppercase tracking-widest">
            Vitality
          </p>
        </motion.div>

        {/* Expansion on hover */}
        <motion.div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 glass rounded-lg px-4 py-2 whitespace-nowrap opacity-0 pointer-events-none"
          whileHover={{ opacity: 1 }}
        >
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${caloriesMet ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="text-steel">1400 cal</span>
            </div>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${proteinMet ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="text-steel">100g protein</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
