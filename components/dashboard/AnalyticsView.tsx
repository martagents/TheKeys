'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { format, subDays } from 'date-fns'

type TimeRange = '7d' | '30d' | '90d'

interface PillarData {
  pillar: string
  color: string
  icon: string
  weeklyData: number[] // 7 days of compliance %
  monthlyData: number[] // 30 days
}

export default function AnalyticsView() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d')

  // Mock historical data - will be replaced with Supabase
  const pillars: PillarData[] = [
    {
      pillar: 'Sharp',
      color: '#60A5FA',
      icon: '🧠',
      weeklyData: [80, 90, 85, 95, 90, 100, 95],
      monthlyData: Array.from({ length: 30 }, () => Math.random() * 40 + 60),
    },
    {
      pillar: 'Fitness',
      color: '#34D399',
      icon: '💪',
      weeklyData: [70, 75, 80, 85, 90, 85, 90],
      monthlyData: Array.from({ length: 30 }, () => Math.random() * 30 + 65),
    },
    {
      pillar: 'Presence',
      color: '#A78BFA',
      icon: '🧘',
      weeklyData: [60, 70, 75, 80, 85, 90, 85],
      monthlyData: Array.from({ length: 30 }, () => Math.random() * 35 + 55),
    },
    {
      pillar: 'Temple',
      color: '#F472B6',
      icon: '✨',
      weeklyData: [95, 100, 100, 90, 95, 100, 100],
      monthlyData: Array.from({ length: 30 }, () => Math.random() * 20 + 80),
    },
    {
      pillar: 'Warrior',
      color: '#FB923C',
      icon: '⚔️',
      weeklyData: [75, 80, 85, 80, 90, 85, 90],
      monthlyData: Array.from({ length: 30 }, () => Math.random() * 30 + 65),
    },
  ]

  const getDataForRange = (pillar: PillarData) => {
    return timeRange === '7d' ? pillar.weeklyData : pillar.monthlyData.slice(0, 30)
  }

  const getDaysInRange = () => {
    const days = timeRange === '7d' ? 7 : 30
    return Array.from({ length: days }, (_, i) => subDays(new Date(), days - 1 - i))
  }

  const calculateAverage = (data: number[]) => {
    return Math.round(data.reduce((a, b) => a + b, 0) / data.length)
  }

  const calculateTrend = (data: number[]) => {
    const recent = data.slice(-3).reduce((a, b) => a + b, 0) / 3
    const previous = data.slice(-6, -3).reduce((a, b) => a + b, 0) / 3
    return recent - previous
  }

  return (
    <div className="min-h-screen bg-black p-6 pt-16 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-serif text-4xl gold-gradient mb-2">Analytics</h1>
        <p className="text-steel text-sm tracking-widest uppercase">
          Compliance Trends
        </p>
      </motion.div>

      {/* Time Range Selector */}
      <div className="flex justify-center gap-3 mb-8">
        {(['7d', '30d', '90d'] as TimeRange[]).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-6 py-2 rounded-xl font-medium transition-all touch-target ${
              timeRange === range
                ? 'bg-gold text-black'
                : 'glass text-steel hover:bg-white/10'
            }`}
          >
            {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
          </button>
        ))}
      </div>

      {/* Pillar Charts */}
      <div className="max-w-4xl mx-auto space-y-6">
        {pillars.map((pillar, pillarIndex) => {
          const data = getDataForRange(pillar)
          const average = calculateAverage(data)
          const trend = calculateTrend(data)
          const isUpward = trend > 0
          const isDownward = trend < 0

          return (
            <motion.div
              key={pillar.pillar}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: pillarIndex * 0.1 }}
              className="glass-dark rounded-2xl p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{pillar.icon}</span>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {pillar.pillar}
                    </h3>
                    <p className="text-steel text-xs">
                      Avg: <span className="text-white font-semibold">{average}%</span>
                    </p>
                  </div>
                </div>

                {/* Trend indicator */}
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
                    isUpward
                      ? 'bg-green-400/20 border border-green-400/30'
                      : isDownward
                      ? 'bg-red-400/20 border border-red-400/30'
                      : 'bg-steel/20'
                  }`}
                >
                  <span className="text-lg">
                    {isUpward ? '📈' : isDownward ? '📉' : '➡️'}
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      isUpward
                        ? 'text-green-400'
                        : isDownward
                        ? 'text-red-400'
                        : 'text-steel'
                    }`}
                  >
                    {isUpward ? '+' : ''}
                    {Math.round(trend)}%
                  </span>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="flex items-end gap-1 h-32 mb-3">
                {data.map((value, index) => {
                  const height = `${value}%`
                  const isRecent = index >= data.length - 3

                  return (
                    <motion.div
                      key={index}
                      className="flex-1 relative group"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{
                        delay: pillarIndex * 0.1 + index * 0.03,
                        duration: 0.5,
                      }}
                    >
                      {/* Bar */}
                      <div
                        className="w-full rounded-t relative cursor-pointer transition-all hover:opacity-80"
                        style={{
                          height,
                          background: `linear-gradient(to top, ${pillar.color}, ${pillar.color}80)`,
                          opacity: isRecent ? 1 : 0.6,
                        }}
                      >
                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <div className="bg-luxury-charcoal border border-steel/30 rounded-lg px-3 py-2 whitespace-nowrap">
                            <p className="text-white text-xs font-semibold">
                              {Math.round(value)}%
                            </p>
                            <p className="text-steel text-xs">
                              {format(
                                getDaysInRange()[index],
                                'MMM d'
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between text-steel text-xs">
                <span>{format(getDaysInRange()[0], 'MMM d')}</span>
                <span>
                  {format(
                    getDaysInRange()[Math.floor(data.length / 2)],
                    'MMM d'
                  )}
                </span>
                <span>{format(getDaysInRange()[data.length - 1], 'MMM d')}</span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-steel/20">
                <div>
                  <p className="text-steel text-xs mb-1">Peak</p>
                  <p className="text-white font-semibold">
                    {Math.max(...data)}%
                  </p>
                </div>
                <div>
                  <p className="text-steel text-xs mb-1">Low</p>
                  <p className="text-white font-semibold">
                    {Math.min(...data)}%
                  </p>
                </div>
                <div>
                  <p className="text-steel text-xs mb-1">Consistency</p>
                  <p className="text-white font-semibold">
                    {Math.round(
                      100 -
                        ((Math.max(...data) - Math.min(...data)) / Math.max(...data)) *
                          100
                    )}
                    %
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Overall Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-4xl mx-auto mt-8"
      >
        <div className="glass-dark rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Overall Performance</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-luxury-charcoal rounded-xl">
              <p className="text-4xl mb-2">📊</p>
              <p className="text-steel text-xs mb-1">Total Average</p>
              <p className="text-white text-2xl font-bold">
                {Math.round(
                  pillars.reduce((sum, p) => sum + calculateAverage(getDataForRange(p)), 0) /
                    pillars.length
                )}
                %
              </p>
            </div>
            <div className="text-center p-4 bg-luxury-charcoal rounded-xl">
              <p className="text-4xl mb-2">⭐</p>
              <p className="text-steel text-xs mb-1">Best Pillar</p>
              <p className="text-white text-xl font-bold">
                {pillars.reduce((best, p) =>
                  calculateAverage(getDataForRange(p)) >
                  calculateAverage(getDataForRange(best))
                    ? p
                    : best
                ).pillar}
              </p>
            </div>
            <div className="text-center p-4 bg-luxury-charcoal rounded-xl">
              <p className="text-4xl mb-2">🎯</p>
              <p className="text-steel text-xs mb-1">Focus Area</p>
              <p className="text-white text-xl font-bold">
                {pillars.reduce((worst, p) =>
                  calculateAverage(getDataForRange(p)) <
                  calculateAverage(getDataForRange(worst))
                    ? p
                    : worst
                ).pillar}
              </p>
            </div>
            <div className="text-center p-4 bg-luxury-charcoal rounded-xl">
              <p className="text-4xl mb-2">🔥</p>
              <p className="text-steel text-xs mb-1">Momentum</p>
              <p className="text-white text-xl font-bold">
                {pillars.filter((p) => calculateTrend(getDataForRange(p)) > 0).length}/5
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
