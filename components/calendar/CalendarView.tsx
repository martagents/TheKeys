'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  getWeekDays,
  getMonthDays,
  formatDate,
  isToday,
  isSameDay
} from '@/lib/calendar'
import { addDays, format } from 'date-fns'

type ViewMode = 'week' | 'month'

interface TaskDue {
  id: string
  pillar: string
  name: string
  color: string
}

export default function CalendarView() {
  const [viewMode, setViewMode] = useState<ViewMode>('week')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Mock tasks - will be replaced with real data from Supabase
  const mockTasks: Record<string, TaskDue[]> = {
    [format(new Date(), 'yyyy-MM-dd')]: [
      { id: '1', pillar: 'Sharp', name: 'Morning Routine', color: '#60A5FA' },
      { id: '2', pillar: 'Fitness', name: '1400 Cal', color: '#34D399' },
      { id: '3', pillar: 'Temple', name: 'Skincare AM', color: '#F472B6' },
    ],
    [format(addDays(new Date(), 1), 'yyyy-MM-dd')]: [
      { id: '4', pillar: 'Warrior', name: 'Daily 10X', color: '#FB923C' },
    ],
    [format(addDays(new Date(), 3), 'yyyy-MM-dd')]: [
      { id: '5', pillar: 'Temple', name: 'Hair', color: '#F472B6' },
    ],
  }

  const days = viewMode === 'week' ? getWeekDays() : getMonthDays()

  const getTasksForDate = (date: Date): TaskDue[] => {
    const dateKey = format(date, 'yyyy-MM-dd')
    return mockTasks[dateKey] || []
  }

  return (
    <div className="min-h-screen p-6 pt-16 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-serif text-4xl gold-gradient mb-2">Calendar</h1>
        <p className="text-steel text-sm tracking-widest uppercase">
          Your Ritual Timeline
        </p>
      </motion.div>

      {/* View Mode Toggle */}
      <div className="flex justify-center gap-3 mb-8">
        <button
          onClick={() => setViewMode('week')}
          className={`px-6 py-2 rounded-xl font-medium transition-all touch-target ${
            viewMode === 'week'
              ? 'bg-gold text-black'
              : 'glass text-steel hover:bg-white/10'
          }`}
        >
          Week
        </button>
        <button
          onClick={() => setViewMode('month')}
          className={`px-6 py-2 rounded-xl font-medium transition-all touch-target ${
            viewMode === 'month'
              ? 'bg-gold text-black'
              : 'glass text-steel hover:bg-white/10'
          }`}
        >
          Month
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="max-w-4xl mx-auto">
        {viewMode === 'week' ? (
          // Week View - Larger cards
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              const tasks = getTasksForDate(day)
              const isCurrentDay = isToday(day)

              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedDate(day)}
                  className={`glass-dark rounded-xl p-3 min-h-[120px] flex flex-col items-center ${
                    isCurrentDay ? 'border-2 border-gold' : ''
                  }`}
                >
                  {/* Day name */}
                  <p className="text-steel text-xs mb-1">
                    {format(day, 'EEE')}
                  </p>

                  {/* Date */}
                  <p
                    className={`text-2xl font-bold mb-2 ${
                      isCurrentDay ? 'text-gold' : 'text-white'
                    }`}
                  >
                    {format(day, 'd')}
                  </p>

                  {/* Task dots */}
                  <div className="flex flex-wrap gap-1 justify-center">
                    {tasks.slice(0, 4).map((task) => (
                      <div
                        key={task.id}
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: task.color }}
                      />
                    ))}
                    {tasks.length > 4 && (
                      <p className="text-xs text-steel">+{tasks.length - 4}</p>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>
        ) : (
          // Month View - Compact grid
          <div>
            {/* Month header */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <p key={day} className="text-center text-steel text-xs font-semibold">
                  {day}
                </p>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => {
                const tasks = getTasksForDate(day)
                const isCurrentDay = isToday(day)

                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.02 }}
                    onClick={() => setSelectedDate(day)}
                    className={`glass-dark rounded-lg p-2 aspect-square flex flex-col items-center justify-center ${
                      isCurrentDay ? 'border-2 border-gold' : ''
                    }`}
                  >
                    <p
                      className={`text-sm font-semibold ${
                        isCurrentDay ? 'text-gold' : 'text-white'
                      }`}
                    >
                      {format(day, 'd')}
                    </p>
                    {tasks.length > 0 && (
                      <p className="text-xs text-steel mt-1">{tasks.length}</p>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 left-6 right-6 glass-dark rounded-2xl p-6 max-w-md mx-auto"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-white font-semibold text-lg">
                {formatDate(selectedDate, 'EEEE, MMM d')}
              </h3>
              <p className="text-steel text-sm">
                {getTasksForDate(selectedDate).length} tasks due
              </p>
            </div>
            <button
              onClick={() => setSelectedDate(null)}
              className="text-steel hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2">
            {getTasksForDate(selectedDate).map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 bg-luxury-charcoal rounded-xl"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: task.color }}
                />
                <div>
                  <p className="text-white text-sm">{task.name}</p>
                  <p className="text-steel text-xs">{task.pillar}</p>
                </div>
              </div>
            ))}

            {getTasksForDate(selectedDate).length === 0 && (
              <p className="text-steel text-sm text-center py-4">
                No tasks due this day
              </p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}
