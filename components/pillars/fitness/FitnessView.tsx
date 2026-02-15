'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface WorkoutSubtask {
  id: string
  name: string
  completed: boolean
}

export default function FitnessView() {
  const [caloriesMet, setCaloriesMet] = useState(false)
  const [proteinMet, setProteinMet] = useState(false)
  const [waterMet, setWaterMet] = useState(false)
  const [steps, setSteps] = useState(0)
  const [weight, setWeight] = useState('')
  const [savedWeight, setSavedWeight] = useState<number | null>(null)
  const [showWorkoutDetails, setShowWorkoutDetails] = useState(false)
  const [workoutSubtasks, setWorkoutSubtasks] = useState<WorkoutSubtask[]>([
    { id: 'upper', name: 'Upper Body', completed: false },
    { id: 'lower', name: 'Lower Body', completed: false },
    { id: 'full', name: 'Full Body', completed: false },
    { id: 'cardio', name: 'Cardio', completed: false },
  ])

  const toggleWorkoutSubtask = (id: string) => {
    setWorkoutSubtasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
    if ('vibrate' in navigator) navigator.vibrate(30)
  }

  const saveWeight = () => {
    if (weight) {
      setSavedWeight(parseFloat(weight))
      if ('vibrate' in navigator) navigator.vibrate([50, 30, 50])
    }
  }

  const workoutCompleted = workoutSubtasks.some((t) => t.completed)

  // Mock 7-day weight data
  const weeklyWeights = savedWeight
    ? [165.2, 164.8, 165.5, 164.9, 165.1, 164.7, savedWeight]
    : [165.2, 164.8, 165.5, 164.9, 165.1, 164.7, 165.0]
  const averageWeight = (
    weeklyWeights.reduce((a, b) => a + b, 0) / weeklyWeights.length
  ).toFixed(1)

  if (showWorkoutDetails) {
    return (
      <div className="min-h-screen bg-black p-6 pt-16 pb-24">
        <button
          onClick={() => setShowWorkoutDetails(false)}
          className="mb-6 text-steel hover:text-white transition-colors"
        >
          ← Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="font-serif text-3xl gold-gradient mb-2">
            Today&apos;s Workout
          </h2>
          <p className="text-steel text-sm">
            Select workout type completed
          </p>
        </motion.div>

        <div className="space-y-3 max-w-md mx-auto">
          {workoutSubtasks.map((task, index) => (
            <motion.button
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleWorkoutSubtask(task.id)}
              className={`w-full glass-dark rounded-xl p-5 flex items-center gap-4 transition-all touch-target ${
                task.completed ? 'bg-green-400/10' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded border-2 flex items-center justify-center ${
                  task.completed
                    ? 'bg-green-400 border-green-400'
                    : 'border-steel/50'
                }`}
              >
                {task.completed && <span className="text-white">✓</span>}
              </div>
              <span
                className={`text-lg ${
                  task.completed ? 'text-steel line-through' : 'text-white'
                }`}
              >
                {task.name}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="max-w-md mx-auto mt-6">
          <button
            onClick={() => setShowWorkoutDetails(false)}
            className="w-full glass rounded-xl py-4 text-gold font-medium touch-target hover:bg-gold/10 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    )
  }

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
        {/* Workout Completion */}
        <div className="glass-dark rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-400">💪</span>
            Workout
          </h3>
          <button
            onClick={() => setShowWorkoutDetails(true)}
            className={`w-full p-4 rounded-xl border-2 transition-all touch-target ${
              workoutCompleted
                ? 'bg-green-400/10 border-green-400'
                : 'bg-steel/5 border-steel/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-white">
                {workoutCompleted
                  ? workoutSubtasks.find((t) => t.completed)?.name + ' Workout'
                  : 'Log Workout'}
              </span>
              <div className="flex items-center gap-2">
                {workoutCompleted && (
                  <div className="w-6 h-6 rounded-full bg-green-400" />
                )}
                <span className="text-steel text-xs">→</span>
              </div>
            </div>
          </button>
        </div>

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

            <button
              onClick={() => {
                setWaterMet(!waterMet)
                if ('vibrate' in navigator) navigator.vibrate(30)
              }}
              className={`w-full p-4 rounded-xl border-2 transition-all touch-target ${
                waterMet
                  ? 'bg-blue-400/10 border-blue-400'
                  : 'bg-steel/5 border-steel/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-white">2L Water</span>
                <div
                  className={`w-6 h-6 rounded-full ${
                    waterMet ? 'bg-blue-400' : 'bg-steel/30'
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
          <div className="flex gap-2 mb-3">
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Today's weight"
              className="flex-1 bg-luxury-charcoal border border-steel/30 rounded-xl px-4 py-3 text-white placeholder-steel/50 focus:border-gold focus:outline-none"
            />
            <span className="text-white self-center px-2">lbs</span>
            <button
              onClick={saveWeight}
              disabled={!weight}
              className={`px-6 rounded-xl font-medium transition-colors touch-target ${
                weight
                  ? 'bg-gold/20 text-gold border border-gold hover:bg-gold/30'
                  : 'bg-steel/10 text-steel/50 border border-steel/20 cursor-not-allowed'
              }`}
            >
              Save
            </button>
          </div>
          {savedWeight && (
            <p className="text-green-400 text-sm mb-3">
              ✓ Saved: {savedWeight} lbs
            </p>
          )}

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
