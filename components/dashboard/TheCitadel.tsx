'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SharpView from '../pillars/sharp/SharpView'
import FitnessView from '../pillars/fitness/FitnessView'
import PresenceView from '../pillars/presence/PresenceView'
import TempleView from '../pillars/temple/TempleView'
import WarriorView from '../pillars/warrior/WarriorView'
import DueTodayView from './DueTodayView'
import CalendarView from '../calendar/CalendarView'
import StreakView from './StreakView'
import SovereignMagicianView from '../sovereign/SovereignMagicianView'
import WarriorDashboard from './WarriorDashboard'
import FaithStatementSection from '../citadel/FaithStatementSection'
import EnergyRatingDisplay from '../citadel/EnergyRatingDisplay'
import NightlyCheckIn from '../citadel/NightlyCheckIn'
import WeeklyReflection from '../citadel/WeeklyReflection'
import OrnateCorners from '../decorations/OrnateCorners'
import TodaysCompass from '../citadel/TodaysCompass'
import TodaysWin from '../citadel/TodaysWin'

export type PillarData = {
  id: string
  name: string
  compliance: number // 0-100
  color: string
}

type NavView = 'home' | 'today' | 'calendar' | 'warrior' | 'streaks' | 'sovereign'

export default function TheCitadel() {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null)
  const [currentView, setCurrentView] = useState<NavView>('home')
  const [energyRating, setEnergyRating] = useState(75) // Default energy rating

  // Mock data - will be replaced with Supabase data
  const pillars: PillarData[] = [
    { id: 'sharp', name: 'Sharp', compliance: 0, color: '#60A5FA' },
    { id: 'fitness', name: 'Fitness', compliance: 0, color: '#34D399' },
    { id: 'presence', name: 'Presence', compliance: 0, color: '#A78BFA' },
    { id: 'temple', name: 'Temple', compliance: 0, color: '#F472B6' },
    { id: 'warrior', name: 'Warrior', compliance: 0, color: '#FB923C' },
  ]

  // Mock daily tasks
  const [dailyTasks, setDailyTasks] = useState({
    warrior: [
      { id: 'w1', name: 'Daily 10X', completed: false },
      { id: 'w2', name: 'Weekly Review (Friday)', completed: false },
    ],
    sharp: [
      { id: 's1', name: 'Morning Routine', completed: false, hasSubtasks: true },
      { id: 's2', name: '90m Focus Block', completed: false },
    ],
    fitness: [
      { id: 'f1', name: 'Workout', completed: false, hasSubtasks: true },
      { id: 'f2', name: '1400 Calories', completed: false },
      { id: 'f3', name: '100g Protein', completed: false },
      { id: 'f4', name: '2L Water', completed: false },
      { id: 'f5', name: '10K Steps', completed: false },
    ],
    presence: [
      { id: 'p1', name: 'Faith Statement', completed: false },
    ],
    temple: [
      { id: 't1', name: 'Morning Skincare', completed: false },
      { id: 't2', name: 'Night Skincare', completed: false },
    ],
  })

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

  if (currentView === 'warrior') {
    return (
      <>
        <WarriorDashboard />
        <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
      </>
    )
  }

  if (currentView === 'sovereign') {
    return (
      <>
        <SovereignMagicianView />
        <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
      </>
    )
  }

  // Filter warrior tasks based on day of week
  const isFriday = new Date().getDay() === 5
  const filteredWarriorTasks = dailyTasks.warrior.filter(task => {
    if (task.name.includes('Weekly Review')) {
      return isFriday
    }
    return true
  })

  const toggleTask = (pillar: string, taskId: string) => {
    setDailyTasks((prev) => ({
      ...prev,
      [pillar]: prev[pillar as keyof typeof prev].map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }))
    if ('vibrate' in navigator) navigator.vibrate(30)
  }

  // Calculate momentum score based on task completion
  const calculateMomentumScore = (): number => {
    const allTasks = [
      ...dailyTasks.warrior,
      ...dailyTasks.sharp,
      ...dailyTasks.fitness,
      ...dailyTasks.presence,
      ...dailyTasks.temple,
    ]
    const completed = allTasks.filter(t => t.completed).length
    const total = allTasks.length
    return total > 0 ? Math.round((completed / total) * 100) : 0
  }

  const momentumScore = calculateMomentumScore()

  const getMomentumLabel = (score: number): string => {
    if (score >= 80) return 'ON FIRE'
    if (score >= 60) return 'BUILDING'
    if (score >= 40) return 'STEADY'
    return 'IGNITING'
  }

  // Home view (Founder OS) - Dashboard with tasks by pillar
  return (
    <div className="h-screen p-4 pt-6 pb-40 overflow-y-auto no-scrollbar relative">
      {/* Fantasy mystical background */}
      <div className="fixed inset-0 fantasy-bg" />

      {/* Ornate corner decorations */}
      <OrnateCorners />

      {/* Header - THE KEYS / FOUNDER OS */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-6 relative z-10"
      >
        {/* Ornate decorative flourish */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-gold"></div>
          <div className="ornate-diamond"></div>
          <div className="h-px w-16 bg-gradient-to-l from-transparent via-gold to-gold"></div>
        </div>

        {/* THE KEYS */}
        <p className="text-gold text-sm tracking-[0.3em] mb-2 title-font font-medium">
          THE KEYS
        </p>

        {/* FOUNDER OS */}
        <h1 className="title-font text-4xl md:text-5xl gold-gradient font-black tracking-widest mb-3"
          style={{
            textShadow: '0 0 30px rgba(212, 175, 55, 0.5), 0 0 10px rgba(255, 215, 0, 0.3)'
          }}
        >
          FOUNDER OS
        </h1>

        {/* Divider with diamond */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold"></div>
          <span className="text-gold text-xs">◆</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold"></div>
        </div>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="script-font text-2xl text-parchment max-w-md mx-auto px-4"
          style={{
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
          }}
        >
          I am not measured by my input, but by my output.
        </motion.p>
      </motion.div>

      {/* Momentum & Energy Scores */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-2xl mx-auto mb-6 relative z-10"
      >
        <div className="glass rounded-2xl p-4 flex items-center justify-around">
          {/* Momentum Score */}
          <div className="text-center flex-1">
            <p className="script-font text-xl text-gold mb-2">
              Momentum Score
            </p>
            <div className="flex items-center justify-center gap-3">
              <motion.span
                key={momentumScore}
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="title-font text-6xl font-black"
                style={{
                  color: '#FFD700',
                  textShadow: '0 0 20px rgba(255, 215, 0, 0.6)'
                }}
              >
                {momentumScore}
              </motion.span>
            </div>
            <p className="text-amber text-sm mt-2 tracking-wider title-font font-semibold">
              {getMomentumLabel(momentumScore)}
            </p>
          </div>

          {/* Divider */}
          <div className="h-24 w-px bg-gradient-to-b from-transparent via-gold to-transparent mx-4"></div>

          {/* Energy Score */}
          <div className="text-center flex-1">
            <p className="script-font text-xl text-gold mb-2">
              Energy Score
            </p>
            <div className="flex items-center justify-center gap-3">
              <motion.span
                key={energyRating}
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="title-font text-6xl font-black"
                style={{
                  color: '#FFD700',
                  textShadow: '0 0 20px rgba(255, 215, 0, 0.6)'
                }}
              >
                {energyRating}
              </motion.span>
            </div>
            <p className="text-amber text-sm mt-2 tracking-wider title-font font-semibold">
              {energyRating >= 80 ? 'PEAK' : energyRating >= 60 ? 'FOCUSED' : 'RECOVERING'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* New Citadel Sections */}
      <div className="max-w-2xl mx-auto space-y-3 mb-3 relative z-10">
        {/* Faith Statement - Collapsible */}
        <FaithStatementSection />

        {/* Energy Rating */}
        <EnergyRatingDisplay rating={energyRating} onRatingChange={setEnergyRating} />

        {/* Today's Compass */}
        <TodaysCompass />

        {/* Today's Win */}
        <TodaysWin />
      </div>

      {/* Warrior - Full width across top - Rising from bottom */}
      <div className="max-w-2xl mx-auto mb-3 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', damping: 20, stiffness: 100 }}
          className="glass-pillar rounded-2xl p-4 border-2 border-orange-400/30"
          style={{
            boxShadow: '0 8px 32px rgba(251, 146, 60, 0.1)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-orange-400 flex items-center gap-2">
              <span>⚔️</span>
              Warrior
            </h2>
            <button
              onClick={() => setSelectedPillar('warrior')}
              className="text-steel hover:text-white text-sm"
            >
              View All →
            </button>
          </div>
          <div className="space-y-2">
            {filteredWarriorTasks.map((task) => (
              <button
                key={task.id}
                onClick={() => toggleTask('warrior', task.id)}
                className={`w-full glass rounded-xl p-3 flex items-center gap-3 transition-all touch-target ${
                  task.completed ? 'opacity-60' : ''
                }`}
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                    task.completed
                      ? 'bg-orange-400 border-orange-400'
                      : 'border-steel/50'
                  }`}
                >
                  {task.completed && <span className="text-white text-xs">✓</span>}
                </div>
                <span
                  className={`text-left flex-1 ${
                    task.completed ? 'text-steel line-through' : 'text-white'
                  }`}
                >
                  {task.name}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Other Pillars - Grid layout - Rising from bottom sequentially */}
      <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10">
        {/* Sharp */}
        <PillarCard
          title="Sharp"
          icon="🧠"
          color="#60A5FA"
          tasks={dailyTasks.sharp}
          onToggle={(id) => toggleTask('sharp', id)}
          onViewAll={() => setSelectedPillar('sharp')}
          delay={0.4}
        />

        {/* Fitness */}
        <PillarCard
          title="Fitness"
          icon="💪"
          color="#34D399"
          tasks={dailyTasks.fitness}
          onToggle={(id) => toggleTask('fitness', id)}
          onViewAll={() => setSelectedPillar('fitness')}
          delay={0.5}
        />

        {/* Presence */}
        <PillarCard
          title="Presence"
          icon="🙏"
          color="#A78BFA"
          tasks={dailyTasks.presence}
          onToggle={(id) => toggleTask('presence', id)}
          onViewAll={() => setSelectedPillar('presence')}
          delay={0.6}
        />

        {/* Temple */}
        <PillarCard
          title="Temple"
          icon="✨"
          color="#F472B6"
          tasks={dailyTasks.temple}
          onToggle={(id) => toggleTask('temple', id)}
          onViewAll={() => setSelectedPillar('temple')}
          delay={0.7}
        />
      </div>

      {/* Nightly Check-In & Weekly Reflection */}
      <div className="max-w-2xl mx-auto space-y-3 mt-4 mb-4 relative z-10">
        <NightlyCheckIn />
        <WeeklyReflection />
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
    </div>
  )
}

// Pillar Card Component
function PillarCard({
  title,
  icon,
  color,
  tasks,
  onToggle,
  onViewAll,
  delay = 0,
}: {
  title: string
  icon: string
  color: string
  tasks: Array<{ id: string; name: string; completed: boolean; hasSubtasks?: boolean }>
  onToggle: (id: string) => void
  onViewAll: () => void
  delay?: number
}) {
  const borderColor = `${color}33` // 20% opacity

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', damping: 20, stiffness: 100 }}
      className="glass-pillar rounded-2xl p-4"
      style={{
        borderColor,
        boxShadow: `0 8px 32px ${color}10`,
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <span>{icon}</span>
          {title}
        </h2>
        <button
          onClick={onViewAll}
          className="text-steel hover:text-white text-sm"
        >
          View →
        </button>
      </div>
      <div className="space-y-1.5">
        {tasks.slice(0, 3).map((task) => (
          <button
            key={task.id}
            onClick={() => onToggle(task.id)}
            className={`w-full glass rounded-xl p-2.5 flex items-center gap-2.5 transition-all touch-target ${
              task.completed ? 'opacity-60' : ''
            }`}
          >
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                task.completed ? 'border-transparent' : 'border-steel/50'
              }`}
              style={{
                backgroundColor: task.completed ? color : 'transparent',
              }}
            >
              {task.completed && <span className="text-white text-xs">✓</span>}
            </div>
            <span
              className={`text-left flex-1 text-sm ${
                task.completed ? 'text-steel line-through' : 'text-white'
              }`}
            >
              {task.name}
            </span>
            {task.hasSubtasks && (
              <span className="text-steel text-xs">📝</span>
            )}
          </button>
        ))}
        {tasks.length > 3 && (
          <p className="text-steel text-xs text-center pt-1">
            +{tasks.length - 3} more
          </p>
        )}
      </div>
    </motion.div>
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
    { id: 'warrior', icon: '⚔️', label: 'Warrior' },
    { id: 'streaks', icon: '🔥', label: 'Streaks' },
    { id: 'sovereign', icon: '👑', label: 'Sovereign' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 pb-8 px-6 z-20">
      <motion.div
        className="glass rounded-2xl p-4 flex items-center justify-around touch-target max-w-2xl mx-auto"
        style={{
          boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.5)',
        }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring', damping: 20 }}
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
