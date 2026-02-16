'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface CompassItem {
  id: string
  text: string
  completed: boolean
}

export default function TodaysCompass() {
  const [items, setItems] = useState<CompassItem[]>([
    { id: '1', text: 'Review Q1 metrics', completed: false },
    { id: '2', text: 'Morning workout', completed: false },
    { id: '3', text: 'Evening call with parents', completed: false },
    { id: '4', text: 'Read 30 pages', completed: false },
  ])
  const [newItemText, setNewItemText] = useState('')

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
    if ('vibrate' in navigator) navigator.vibrate(30)
  }

  const updateItemText = (id: string, text: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, text } : item
    ))
  }

  const addItem = () => {
    if (newItemText.trim()) {
      setItems([...items, {
        id: Date.now().toString(),
        text: newItemText.trim(),
        completed: false
      }])
      setNewItemText('')
      if ('vibrate' in navigator) navigator.vibrate(30)
    }
  }

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
    if ('vibrate' in navigator) navigator.vibrate(30)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative z-10"
    >
      {/* Title */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold"></div>
        <h2 className="font-serif text-3xl text-gold font-bold tracking-widest">
          TODAY&apos;S COMPASS
        </h2>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold"></div>
      </div>

      {/* Compass Items */}
      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-center gap-3"
          >
            {/* Checkbox */}
            <button
              onClick={() => toggleItem(item.id)}
              className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                item.completed
                  ? 'bg-green-500/20 border-green-500'
                  : 'border-gold/40 hover:border-gold'
              }`}
            >
              {item.completed && <span className="text-green-500 text-sm">✓</span>}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={item.text}
              onChange={(e) => updateItemText(item.id, e.target.value)}
              className={`flex-1 bg-transparent border-none text-white/80 font-serif text-sm focus:outline-none focus:text-white ${
                item.completed ? 'line-through opacity-60' : ''
              }`}
              placeholder="Add task..."
            />

            {/* Delete Button */}
            <button
              onClick={() => deleteItem(item.id)}
              className="w-6 h-6 flex items-center justify-center text-steel hover:text-red-400 transition-colors flex-shrink-0"
            >
              ✕
            </button>
          </motion.div>
        ))}

        {/* Add New Item */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-3 pt-2"
        >
          <div className="w-6 h-6 flex-shrink-0"></div>
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addItem()
              }
            }}
            className="flex-1 bg-transparent border-b border-gold/30 text-white font-serif text-sm focus:outline-none focus:border-gold pb-1"
            placeholder="+ Add new item..."
          />
          {newItemText && (
            <button
              onClick={addItem}
              className="text-gold hover:text-gold-light text-sm font-semibold transition-colors"
            >
              Add
            </button>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
