'use client'

import { motion } from 'framer-motion'

interface Streak {
  pillar: string
  currentStreak: number
  longestStreak: number
  color: string
  icon: string
}

export default function StreakView() {
  // Mock streak data - will be replaced with Supabase calculations
  const streaks: Streak[] = [
    {
      pillar: 'Sharp',
      currentStreak: 12,
      longestStreak: 28,
      color: '#60A5FA',
      icon: '🧠',
    },
    {
      pillar: 'Fitness',
      currentStreak: 7,
      longestStreak: 45,
      color: '#34D399',
      icon: '💪',
    },
    {
      pillar: 'Presence',
      currentStreak: 21,
      longestStreak: 21,
      color: '#A78BFA',
      icon: '🧘',
    },
    {
      pillar: 'Temple',
      currentStreak: 14,
      longestStreak: 30,
      color: '#F472B6',
      icon: '✨',
    },
    {
      pillar: 'Warrior',
      currentStreak: 9,
      longestStreak: 15,
      color: '#FB923C',
      icon: '⚔️',
    },
  ]

  const totalCurrentStreak = 7 // Days where all pillars were completed
  const totalLongestStreak = 14

  return (
    <div className="min-h-screen bg-black p-6 pt-16 pb-40">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="font-serif text-4xl gold-gradient mb-2">Streaks</h1>
        <p className="text-steel text-sm tracking-widest uppercase">
          Your Relentless Discipline
        </p>
      </motion.div>

      {/* Overall Streak */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto mb-8"
      >
        <div className="glass-dark rounded-2xl p-8 text-center relative overflow-hidden">
          {/* Background glow */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />

          <div className="relative z-10">
            <p className="text-steel text-sm mb-2 uppercase tracking-widest">
              Total Streak
            </p>
            <motion.div
              className="text-7xl font-bold gold-gradient mb-2"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              {totalCurrentStreak}
            </motion.div>
            <p className="text-white text-lg mb-4">Days of Discipline</p>
            <div className="inline-block bg-luxury-charcoal rounded-lg px-4 py-2">
              <p className="text-steel text-xs">
                Best: <span className="text-gold font-bold">{totalLongestStreak} days</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pillar Streaks */}
      <div className="max-w-md mx-auto space-y-4">
        {streaks.map((streak, index) => {
          const progress = (streak.currentStreak / streak.longestStreak) * 100
          const isRecord = streak.currentStreak === streak.longestStreak

          return (
            <motion.div
              key={streak.pillar}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-dark rounded-2xl p-6 relative overflow-hidden"
            >
              {/* Record indicator */}
              {isRecord && (
                <motion.div
                  className="absolute top-4 right-4 bg-gold/20 border border-gold rounded-full px-3 py-1"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <span className="text-gold text-xs font-bold">🏆 RECORD</span>
                </motion.div>
              )}

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{streak.icon}</span>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">
                    {streak.pillar}
                  </h3>
                  <p className="text-steel text-xs">Current Streak</p>
                </div>
                <div className="text-right">
                  <p
                    className="text-4xl font-bold"
                    style={{ color: streak.color }}
                  >
                    {streak.currentStreak}
                  </p>
                  <p className="text-steel text-xs">days</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="h-3 bg-steel/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${streak.color}, ${streak.color}80)`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-between text-sm">
                <span className="text-steel">
                  Best: <span className="text-white font-semibold">{streak.longestStreak} days</span>
                </span>
                <span className="text-steel">
                  {Math.round(progress)}% of record
                </span>
              </div>

              {/* Flame visualization for current streak */}
              <div className="flex gap-1 mt-4">
                {Array.from({ length: Math.min(streak.currentStreak, 30) }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 h-1 rounded-full"
                    style={{ backgroundColor: streak.color }}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ delay: index * 0.1 + i * 0.02 }}
                  />
                ))}
                {streak.currentStreak > 30 && (
                  <span className="text-xs text-steel ml-2">+{streak.currentStreak - 30}</span>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Streak Milestones */}
      <div className="max-w-md mx-auto mt-8">
        <h3 className="text-white font-semibold mb-4 px-2">Milestone Goals</h3>
        <div className="glass-dark rounded-2xl p-6 space-y-3">
          {[
            { days: 7, label: 'Week Warrior', unlocked: true },
            { days: 30, label: 'Month Master', unlocked: false },
            { days: 100, label: 'Century Sovereign', unlocked: false },
            { days: 365, label: 'Year Titan', unlocked: false },
          ].map((milestone, index) => (
            <motion.div
              key={milestone.days}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`flex items-center justify-between p-3 rounded-xl ${
                milestone.unlocked
                  ? 'bg-gold/10 border border-gold/30'
                  : 'bg-luxury-charcoal'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {milestone.unlocked ? '🏆' : '🔒'}
                </span>
                <div>
                  <p className={milestone.unlocked ? 'text-gold font-semibold' : 'text-white'}>
                    {milestone.label}
                  </p>
                  <p className="text-steel text-xs">{milestone.days} day streak</p>
                </div>
              </div>
              {milestone.unlocked && (
                <span className="text-gold text-xs font-bold">UNLOCKED</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
