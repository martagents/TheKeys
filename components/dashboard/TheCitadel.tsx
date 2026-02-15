'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import VitalityCore from './VitalityCore'
import Pillar from './Pillar'
import SharpView from '../pillars/sharp/SharpView'
import FitnessView from '../pillars/fitness/FitnessView'
import PresenceView from '../pillars/presence/PresenceView'
import TempleView from '../pillars/temple/TempleView'
import WarriorView from '../pillars/warrior/WarriorView'

export type PillarData = {
  id: string
  name: string
  compliance: number // 0-100
  color: string
}

export default function TheCitadel() {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null)

  // Mock data - will be replaced with Supabase data
  const pillars: PillarData[] = [
    { id: 'sharp', name: 'Sharp', compliance: 75, color: '#60A5FA' },
    { id: 'fitness', name: 'Fitness', compliance: 85, color: '#34D399' },
    { id: 'presence', name: 'Presence', compliance: 60, color: '#A78BFA' },
    { id: 'temple', name: 'Temple', compliance: 90, color: '#F472B6' },
    { id: 'warrior', name: 'Warrior', compliance: 70, color: '#FB923C' },
  ]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark via-luxury-charcoal to-black opacity-60" />

      {/* Vitality Core */}
      <VitalityCore />

      {/* The Five Pillars */}
      <div className="relative z-10 flex items-end justify-center gap-4 px-6 h-[60vh] mt-32">
        {pillars.map((pillar, index) => (
          <Pillar
            key={pillar.id}
            pillar={pillar}
            index={index}
            onSelect={() => setSelectedPillar(pillar.id)}
          />
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 pb-8 px-6 z-20">
        <motion.div
          className="glass rounded-2xl p-4 flex items-center justify-around touch-target"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button className="flex flex-col items-center gap-1 touch-target">
            <div className="w-6 h-6 rounded-full bg-gold" />
            <span className="text-xs text-steel">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 touch-target">
            <div className="w-6 h-6 rounded-full bg-steel/30" />
            <span className="text-xs text-steel">Log</span>
          </button>
          <button className="flex flex-col items-center gap-1 touch-target">
            <div className="w-6 h-6 rounded-full bg-steel/30" />
            <span className="text-xs text-steel">Wisdom</span>
          </button>
        </motion.div>
      </div>

      {/* Pillar detail views */}
      <AnimatePresence>
        {selectedPillar && (
          <motion.div
            className="fixed inset-0 bg-black z-30"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Back button */}
            <button
              onClick={() => setSelectedPillar(null)}
              className="fixed top-6 left-6 z-40 text-steel hover:text-white transition-colors touch-target"
            >
              ← Back
            </button>

            {/* Render the appropriate pillar view */}
            {selectedPillar === 'sharp' && <SharpView />}
            {selectedPillar === 'fitness' && <FitnessView />}
            {selectedPillar === 'presence' && <PresenceView />}
            {selectedPillar === 'temple' && <TempleView />}
            {selectedPillar === 'warrior' && <WarriorView />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
