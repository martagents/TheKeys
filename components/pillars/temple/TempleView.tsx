'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SkincareStep {
  id: string
  name: string
  completed: boolean
}

interface DailyRoutine {
  day: string
  morning: string[]
  evening: string[]
}

interface SkincareRoutine {
  morning: SkincareStep[]
  night: SkincareStep[]
}

interface TempleHabit {
  id: string
  name: string
  frequency: number // in days
  lastCompleted: Date
}

// Daily face care schedule
const weeklyFaceCareSchedule: DailyRoutine[] = [
  {
    day: 'Sunday',
    morning: ['Cleanse', 'Toner', 'Vitamin C Serum', 'Moisturizer', 'Sunscreen'],
    evening: ['Double Cleanse', 'Toner', 'Retinol', 'Eye Cream', 'Night Cream']
  },
  {
    day: 'Monday',
    morning: ['Cleanse', 'Toner', 'Hydrating Serum', 'Moisturizer', 'Sunscreen'],
    evening: ['Double Cleanse', 'Toner', 'Niacinamide', 'Eye Cream', 'Night Cream']
  },
  {
    day: 'Tuesday',
    morning: ['Cleanse', 'Toner', 'Vitamin C Serum', 'Moisturizer', 'Sunscreen'],
    evening: ['Double Cleanse', 'Exfoliant (AHA/BHA)', 'Toner', 'Eye Cream', 'Night Cream']
  },
  {
    day: 'Wednesday',
    morning: ['Cleanse', 'Toner', 'Peptide Serum', 'Moisturizer', 'Sunscreen'],
    evening: ['Double Cleanse', 'Toner', 'Retinol', 'Eye Cream', 'Night Cream']
  },
  {
    day: 'Thursday',
    morning: ['Cleanse', 'Toner', 'Hyaluronic Acid', 'Moisturizer', 'Sunscreen'],
    evening: ['Double Cleanse', 'Toner', 'Treatment Mask', 'Eye Cream', 'Night Cream']
  },
  {
    day: 'Friday',
    morning: ['Cleanse', 'Toner', 'Vitamin C Serum', 'Moisturizer', 'Sunscreen'],
    evening: ['Double Cleanse', 'Exfoliant (Gentle)', 'Toner', 'Eye Cream', 'Night Cream']
  },
  {
    day: 'Saturday',
    morning: ['Cleanse', 'Toner', 'Brightening Serum', 'Moisturizer', 'Sunscreen'],
    evening: ['Double Cleanse', 'Toner', 'Sheet Mask', 'Eye Cream', 'Night Cream']
  }
]

export default function TempleView() {
  const [showSkincareDetail, setShowSkincareDetail] = useState<'morning' | 'night' | null>(null)
  const [editingRoutine, setEditingRoutine] = useState(false)
  const [newStepName, setNewStepName] = useState('')

  // Get today's routine
  const today = new Date()
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const todayName = dayNames[today.getDay()]
  const todayRoutine = weeklyFaceCareSchedule.find(r => r.day === todayName) || weeklyFaceCareSchedule[0]

  // Initialize skincare routine with today's schedule
  const [skincareRoutine, setSkincareRoutine] = useState<SkincareRoutine>({
    morning: todayRoutine.morning.map((step, i) => ({
      id: `m${i}`,
      name: step,
      completed: false
    })),
    night: todayRoutine.evening.map((step, i) => ({
      id: `n${i}`,
      name: step,
      completed: false
    })),
  })

  const [habits, setHabits] = useState<TempleHabit[]>([
    {
      id: 'hair',
      name: 'Hair (3min)',
      frequency: 3,
      lastCompleted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'removal',
      name: 'Hair Removal',
      frequency: 7,
      lastCompleted: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'massage',
      name: 'Massage',
      frequency: 14,
      lastCompleted: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
  ])

  const toggleSkincareStep = (routine: 'morning' | 'night', stepId: string) => {
    setSkincareRoutine((prev) => ({
      ...prev,
      [routine]: prev[routine].map((step) =>
        step.id === stepId ? { ...step, completed: !step.completed } : step
      ),
    }))
    if ('vibrate' in navigator) navigator.vibrate(30)
  }

  const addSkincareStep = (routine: 'morning' | 'night') => {
    if (newStepName.trim()) {
      const newStep: SkincareStep = {
        id: Date.now().toString(),
        name: newStepName,
        completed: false,
      }
      setSkincareRoutine((prev) => ({
        ...prev,
        [routine]: [...prev[routine], newStep],
      }))
      setNewStepName('')
      if ('vibrate' in navigator) navigator.vibrate(30)
    }
  }

  const removeSkincareStep = (routine: 'morning' | 'night', stepId: string) => {
    setSkincareRoutine((prev) => ({
      ...prev,
      [routine]: prev[routine].filter((step) => step.id !== stepId),
    }))
  }

  const calculateDecay = (habit: TempleHabit) => {
    const now = new Date()
    const daysSinceLastCompleted =
      (now.getTime() - habit.lastCompleted.getTime()) / (1000 * 60 * 60 * 24)
    const decay = Math.max(0, 1 - daysSinceLastCompleted / habit.frequency)
    return decay
  }

  const markComplete = (id: string) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, lastCompleted: new Date() } : habit
      )
    )
    if ('vibrate' in navigator) navigator.vibrate(30)
  }

  const getDecayColor = (decay: number) => {
    return '#E8E8E8' // Silver/white for all states
  }

  const getDecayStatus = (decay: number) => {
    if (decay > 0.6) return 'Fresh'
    if (decay > 0.3) return 'Fading'
    if (decay > 0.1) return 'Cracking'
    return 'Eroded'
  }

  const getSkincareProgress = (routine: 'morning' | 'night') => {
    const steps = skincareRoutine[routine]
    const completed = steps.filter((s) => s.completed).length
    return Math.round((completed / steps.length) * 100)
  }

  // Skincare detail modal
  if (showSkincareDetail) {
    const routine = skincareRoutine[showSkincareDetail]
    const progress = getSkincareProgress(showSkincareDetail)

    return (
      <div className="min-h-screen bg-black p-6 pt-16 pb-24">
        <button
          onClick={() => {
            setShowSkincareDetail(null)
            setEditingRoutine(false)
          }}
          className="mb-6 text-steel hover:text-white transition-colors"
        >
          ← Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="font-serif text-3xl gold-gradient mb-2 capitalize">
            {showSkincareDetail} Skincare
          </h2>
          <p className="text-steel text-sm mb-1">
            {todayName}&apos;s Routine
          </p>
          <p className="text-steel text-xs">
            {routine.filter((s) => s.completed).length} of {routine.length} steps complete
          </p>
        </motion.div>

        {/* Progress ring */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="70"
              fill="none"
              stroke="rgba(142, 142, 147, 0.1)"
              strokeWidth="10"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="70"
              fill="none"
              stroke="#E8E8E8"
              strokeWidth="10"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              style={{ strokeDasharray: '1 1' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">{progress}%</span>
          </div>
        </div>

        {/* Steps checklist */}
        <div className="space-y-3 max-w-md mx-auto mb-6">
          <AnimatePresence>
            {routine.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`glass-dark rounded-xl p-4 flex items-center justify-between ${
                  step.completed ? 'bg-white/10' : ''
                }`}
              >
                <button
                  onClick={() => toggleSkincareStep(showSkincareDetail, step.id)}
                  className="flex items-center gap-3 flex-1"
                >
                  <div
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                      step.completed
                        ? 'bg-white border-white'
                        : 'border-steel/50'
                    }`}
                  >
                    {step.completed && <span className="text-white text-sm">✓</span>}
                  </div>
                  <span
                    className={`${
                      step.completed ? 'text-steel line-through' : 'text-white'
                    }`}
                  >
                    {step.name}
                  </span>
                </button>

                {editingRoutine && (
                  <button
                    onClick={() => removeSkincareStep(showSkincareDetail, step.id)}
                    className="text-white text-xs ml-2 hover:text-white"
                  >
                    Remove
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Edit routine controls */}
        <div className="max-w-md mx-auto">
          {!editingRoutine ? (
            <button
              onClick={() => setEditingRoutine(true)}
              className="w-full glass rounded-xl py-3 text-steel hover:bg-white/10 transition-colors"
            >
              ✏️ Edit Routine
            </button>
          ) : (
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newStepName}
                  onChange={(e) => setNewStepName(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && addSkincareStep(showSkincareDetail)
                  }
                  placeholder="Add new step..."
                  className="flex-1 bg-luxury-charcoal border border-steel/30 rounded-xl px-4 py-3 text-white placeholder-steel/50 focus:border-gold focus:outline-none"
                />
                <button
                  onClick={() => addSkincareStep(showSkincareDetail)}
                  className="glass px-4 rounded-xl text-gold hover:bg-gold/10"
                >
                  + Add
                </button>
              </div>
              <button
                onClick={() => setEditingRoutine(false)}
                className="w-full glass rounded-xl py-3 text-white hover:bg-white/10 transition-colors"
              >
                Done Editing
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Main temple view
  return (
    <div className="min-h-screen bg-black p-6 pt-16 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="font-serif text-4xl gold-gradient mb-2">Temple</h1>
        <p className="text-steel text-sm tracking-widest uppercase">
          Physical Worship
        </p>
      </motion.div>

      <div className="space-y-6 max-w-md mx-auto">
        {/* Skincare Routines */}
        <div className="glass-dark rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <span className="text-white">✨</span>
            Skincare Routines
          </h3>
          <p className="text-steel text-xs mb-4">
            {todayName}&apos;s Schedule
          </p>

          <div className="space-y-3">
            {/* Morning Routine */}
            <button
              onClick={() => setShowSkincareDetail('morning')}
              className="w-full glass rounded-xl p-4 text-left hover:bg-white/10 transition-colors touch-target"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Morning Routine</p>
                  <p className="text-steel text-xs mt-1">
                    {skincareRoutine.morning.filter((s) => s.completed).length} /{' '}
                    {skincareRoutine.morning.length} steps
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">
                    {getSkincareProgress('morning')}%
                  </p>
                  <p className="text-steel text-xs">→</p>
                </div>
              </div>
            </button>

            {/* Night Routine */}
            <button
              onClick={() => setShowSkincareDetail('night')}
              className="w-full glass rounded-xl p-4 text-left hover:bg-white/10 transition-colors touch-target"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Night Routine</p>
                  <p className="text-steel text-xs mt-1">
                    {skincareRoutine.night.filter((s) => s.completed).length} /{' '}
                    {skincareRoutine.night.length} steps
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">
                    {getSkincareProgress('night')}%
                  </p>
                  <p className="text-steel text-xs">→</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Other Temple Habits */}
        {habits.map((habit, index) => {
          const decay = calculateDecay(habit)
          const decayColor = getDecayColor(decay)
          const decayStatus = getDecayStatus(decay)

          return (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-dark rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-semibold">{habit.name}</h3>
                  <p className="text-steel text-xs">
                    Every {habit.frequency} day{habit.frequency > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold" style={{ color: decayColor }}>
                    {decayStatus}
                  </p>
                  <p className="text-steel text-xs">{Math.round(decay * 100)}%</p>
                </div>
              </div>

              {/* Decay Ring */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="58"
                    fill="none"
                    stroke="rgba(142, 142, 147, 0.1)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r="58"
                    fill="none"
                    stroke={decayColor}
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: decay }}
                    style={{
                      strokeDasharray: '1 1',
                      filter:
                        decay < 0.1
                          ? 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.8))'
                          : 'none',
                    }}
                  />
                  {decay < 0.3 && (
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="58"
                      fill="none"
                      stroke={decayColor}
                      strokeWidth="8"
                      strokeDasharray="2 8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold" style={{ color: decayColor }}>
                    {Math.round(decay * 100)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => markComplete(habit.id)}
                className="w-full glass rounded-xl py-3 text-white font-medium touch-target hover:bg-white/10 transition-colors"
              >
                Mark Complete
              </button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
