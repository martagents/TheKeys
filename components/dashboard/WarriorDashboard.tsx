'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'

type TenXCategory = 'Business Impact' | 'Personal Capacity' | 'Physical Vitality & Strength' | 'Mental Peace & Sharpness'

interface TenXActivity {
  id: string
  statement: string
  category: TenXCategory
  scheduledDate: string
  completed: boolean
  completedDate?: string
}

export default function WarriorDashboard() {
  const [activities, setActivities] = useState<TenXActivity[]>([
    {
      id: '1',
      statement: 'Launch new product feature',
      category: 'Business Impact',
      scheduledDate: format(new Date(), 'yyyy-MM-dd'),
      completed: false,
    },
    {
      id: '2',
      statement: 'Complete morning meditation routine',
      category: 'Mental Peace & Sharpness',
      scheduledDate: format(new Date(), 'yyyy-MM-dd'),
      completed: true,
      completedDate: format(new Date(), 'yyyy-MM-dd'),
    },
  ])

  const [newStatement, setNewStatement] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<TenXCategory>('Business Impact')
  const [scheduledDate, setScheduledDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [showForm, setShowForm] = useState(false)
  const [filterCategory, setFilterCategory] = useState<TenXCategory | 'All'>('All')

  const categories: TenXCategory[] = [
    'Business Impact',
    'Personal Capacity',
    'Physical Vitality & Strength',
    'Mental Peace & Sharpness',
  ]

  const categoryIcons: Record<TenXCategory, string> = {
    'Business Impact': '💼',
    'Personal Capacity': '🚀',
    'Physical Vitality & Strength': '💪',
    'Mental Peace & Sharpness': '🧠',
  }

  const categoryColors: Record<TenXCategory, string> = {
    'Business Impact': '#E8E8E8',
    'Personal Capacity': '#E8E8E8',
    'Physical Vitality & Strength': '#E8E8E8',
    'Mental Peace & Sharpness': '#E8E8E8',
  }

  const handleAddActivity = () => {
    if (newStatement.trim()) {
      const newActivity: TenXActivity = {
        id: Date.now().toString(),
        statement: newStatement.trim(),
        category: selectedCategory,
        scheduledDate,
        completed: false,
      }
      setActivities([newActivity, ...activities])
      setNewStatement('')
      setShowForm(false)
      if ('vibrate' in navigator) navigator.vibrate(30)
    }
  }

  const toggleComplete = (id: string) => {
    setActivities(activities.map(activity =>
      activity.id === id
        ? {
            ...activity,
            completed: !activity.completed,
            completedDate: !activity.completed ? format(new Date(), 'yyyy-MM-dd') : undefined,
          }
        : activity
    ))
    if ('vibrate' in navigator) navigator.vibrate(30)
  }

  const deleteActivity = (id: string) => {
    setActivities(activities.filter(a => a.id !== id))
    if ('vibrate' in navigator) navigator.vibrate(30)
  }

  const filteredActivities = filterCategory === 'All'
    ? activities
    : activities.filter(a => a.category === filterCategory)

  const todayActivities = filteredActivities.filter(a => a.scheduledDate === format(new Date(), 'yyyy-MM-dd'))
  const upcomingActivities = filteredActivities.filter(a => a.scheduledDate > format(new Date(), 'yyyy-MM-dd'))
  const completedActivities = filteredActivities.filter(a => a.completed)

  // Calculate stats by category
  const statsByCategory = categories.map(category => ({
    category,
    total: activities.filter(a => a.category === category).length,
    completed: activities.filter(a => a.category === category && a.completed).length,
  }))

  return (
    <div className="min-h-screen p-4 pt-6 pb-40 overflow-y-auto no-scrollbar">
      {/* Fantasy mystical background */}
      <div className="fixed inset-0 fantasy-bg" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 relative z-10"
      >
        <h1 className="title-font text-4xl gold-gradient font-black tracking-widest mb-2"
          style={{
            textShadow: '0 0 30px rgba(212, 175, 55, 0.5)'
          }}
        >
          WARRIOR
        </h1>
        <p className="script-font text-2xl text-parchment">
          Daily 10X Activities Tracker
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-4 relative z-10">
        {/* Category Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          {statsByCategory.map((stat, index) => (
            <div
              key={stat.category}
              className="parchment rounded-xl p-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{categoryIcons[stat.category]}</span>
                <p className="text-bronze-darker text-xs font-bold">{stat.category}</p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold" style={{ color: categoryColors[stat.category] }}>
                  {stat.completed}
                </span>
                <span className="text-steel text-xs">/ {stat.total}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-pillar rounded-xl p-3"
        >
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setFilterCategory('All')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterCategory === 'All'
                  ? 'bg-gold text-black'
                  : 'bg-steel/10 text-steel hover:bg-steel/20'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filterCategory === category
                    ? 'text-black'
                    : 'bg-steel/10 text-steel hover:bg-steel/20'
                }`}
                style={{
                  backgroundColor: filterCategory === category ? categoryColors[category] : undefined,
                }}
              >
                {categoryIcons[category]} {category.split(' ')[0]}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Add New Activity Button */}
        {!showForm && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => setShowForm(true)}
            className="w-full glass-pillar rounded-xl p-4 text-gold font-semibold flex items-center justify-center gap-2 hover:bg-gold/10 transition-all"
          >
            <span className="text-2xl">+</span>
            Add New 10X Activity
          </motion.button>
        )}

        {/* Add New Activity Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="glass-pillar rounded-xl p-4 border-2 border-gold/30 overflow-hidden"
            >
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="text-gold">🎯</span>
                New 10X Activity
              </h3>

              <div className="space-y-3">
                <textarea
                  value={newStatement}
                  onChange={(e) => setNewStatement(e.target.value)}
                  placeholder="What's your 10X initiative?"
                  className="w-full bg-black/30 border border-steel/20 rounded-xl p-3 text-white placeholder-steel/50 resize-none focus:outline-none focus:border-gold/50 min-h-[80px]"
                  autoFocus
                />

                <div>
                  <label className="text-steel text-xs mb-2 block">Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`p-2 rounded-xl text-xs transition-all ${
                          selectedCategory === category
                            ? 'border-2 text-white'
                            : 'bg-steel/5 border-2 border-transparent text-steel'
                        }`}
                        style={{
                          backgroundColor: selectedCategory === category ? `${categoryColors[category]}20` : undefined,
                          borderColor: selectedCategory === category ? categoryColors[category] : undefined,
                        }}
                      >
                        <span className="mr-1">{categoryIcons[category]}</span>
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-steel text-xs mb-2 block">Schedule for</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full bg-black/30 border border-steel/20 rounded-xl p-3 text-white focus:outline-none focus:border-gold/50"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleAddActivity}
                    disabled={!newStatement.trim()}
                    className="flex-1 bg-gold hover:bg-gold-light disabled:bg-steel/20 disabled:text-steel text-black font-semibold py-3 rounded-xl transition-all"
                  >
                    Add Activity
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(false)
                      setNewStatement('')
                    }}
                    className="px-6 bg-steel/10 hover:bg-steel/20 text-steel font-semibold py-3 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Today's Activities */}
        {todayActivities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-gold font-semibold mb-3 flex items-center gap-2">
              <span>📅</span>
              Today
            </h2>
            <div className="space-y-2">
              {todayActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onToggle={toggleComplete}
                  onDelete={deleteActivity}
                  categoryColor={categoryColors[activity.category]}
                  categoryIcon={categoryIcons[activity.category]}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Upcoming Activities */}
        {upcomingActivities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-gold font-semibold mb-3 flex items-center gap-2">
              <span>🗓️</span>
              Upcoming
            </h2>
            <div className="space-y-2">
              {upcomingActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onToggle={toggleComplete}
                  onDelete={deleteActivity}
                  categoryColor={categoryColors[activity.category]}
                  categoryIcon={categoryIcons[activity.category]}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Completed Activities */}
        {completedActivities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>✓</span>
              Completed ({completedActivities.length})
            </h2>
            <div className="space-y-2">
              {completedActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onToggle={toggleComplete}
                  onDelete={deleteActivity}
                  categoryColor={categoryColors[activity.category]}
                  categoryIcon={categoryIcons[activity.category]}
                />
              ))}
            </div>
          </motion.div>
        )}

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-steel text-sm">No activities yet. Add your first 10X initiative!</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ActivityCard({
  activity,
  onToggle,
  onDelete,
  categoryColor,
  categoryIcon,
}: {
  activity: TenXActivity
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  categoryColor: string
  categoryIcon: string
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`cosmic-panel rounded-xl p-4 ${activity.completed ? 'opacity-60' : ''}`}
      style={{
        borderColor: `${categoryColor}40`,
      }}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(activity.id)}
          className={`w-6 h-6 mt-1 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
            activity.completed
              ? 'bg-white/20 border-white'
              : 'border-gold/40 hover:border-gold'
          }`}
        >
          {activity.completed && <span className="text-white text-sm">✓</span>}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xl">{categoryIcon}</span>
              <span
                className="text-xs font-semibold px-2 py-1 rounded"
                style={{
                  backgroundColor: `${categoryColor}20`,
                  color: categoryColor,
                }}
              >
                {activity.category}
              </span>
            </div>
            <button
              onClick={() => onDelete(activity.id)}
              className="text-steel hover:text-red-400 transition-colors flex-shrink-0"
            >
              ✕
            </button>
          </div>

          <p className={`text-white leading-relaxed mb-2 ${activity.completed ? 'line-through' : ''}`}>
            {activity.statement}
          </p>

          <div className="flex items-center gap-3 text-xs text-steel">
            <span>📅 {format(new Date(activity.scheduledDate), 'MMM dd, yyyy')}</span>
            {activity.completed && activity.completedDate && (
              <span className="text-white">✓ {format(new Date(activity.completedDate), 'MMM dd, yyyy')}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
