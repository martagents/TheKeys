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
import DueTodayView from './DueTodayView'
import CalendarView from '../calendar/CalendarView'
import StreakView from './StreakView'
import AnalyticsView from './AnalyticsView'

export type PillarData = {
  id: string
  name: string
  compliance: number // 0-100
  color: string
}

type NavView = 'home' | 'today' | 'calendar' | 'streaks' | 'analytics'

export default function TheCitadel() {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null)
  const [currentView, setCurrentView] = useState<NavView>('home')

  // Mock data - will be replaced with Supabase data
  const pillars: PillarData[] = [
    { id: 'sharp', name: 'Sharp', compliance: 75, color: '#60A5FA' },
    { id: 'fitness', name: 'Fitness', compliance: 85, color: '#34D399' },
    { id: 'presence', name: 'Presence', compliance: 60, color: '#A78BFA' },
    { id: 'temple', name: 'Temple', compliance: 90, color: '#F472B6' },
    { id: 'warrior', name: 'Warrior', compliance: 70, color: '#FB923C' },
  ]

  // Render the current view
  if (currentView === 'today') {
    return (
      <>
        <DueTodayView />
        <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
      </>
    )
  }

  if (currentView === 'calendar') {
    return (
      <>
        <CalendarView />
        <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
      </>
    )
  }

  if (currentView === 'streaks') {
    return (
      <>
        <StreakView />
        <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
      </>
    )
  }

  if (currentView === 'analytics') {
    return (
      <>
        <AnalyticsView />
        <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
      </>
    )
  }

  // Home view (The Citadel)
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
      <BottomNav currentView={currentView} setCurrentView={setCurrentView} />

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

// Bottom Navigation Component
function BottomNav({
  currentView,
  setCurrentView,
}: {
  currentView: NavView
  setCurrentView: (view: NavView) => void
}) {
  const navItems: Array<{ id: NavView; icon: string; label: string }> = [
    { id: 'home', icon: '🏛️', label: 'Home' },
    { id: 'today', icon: '📋', label: 'Today' },
    { id: 'calendar', icon: '📅', label: 'Calendar' },
    { id: 'streaks', icon: '🔥', label: 'Streaks' },
    { id: 'analytics', icon: '📊', label: 'Stats' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 pb-8 px-6 z-20">
      <motion.div
        className="glass rounded-2xl p-4 flex items-center justify-around touch-target max-w-2xl mx-auto"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setCurrentView(item.id)
              if ('vibrate' in navigator) navigator.vibrate(30)
            }}
            className="flex flex-col items-center gap-1 touch-target transition-all"
          >
            <div
              className={`text-2xl transition-all ${
                currentView === item.id ? 'scale-110' : 'opacity-60'
              }`}
            >
              {item.icon}
            </div>
            <span
              className={`text-xs ${
                currentView === item.id ? 'text-gold font-semibold' : 'text-steel'
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </motion.div>
    </div>
  )
}
