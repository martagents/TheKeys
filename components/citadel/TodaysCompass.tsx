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
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold"></div>
        <h2 className="script-font text-4xl text-gold"
          style={{
            textShadow: '0 0 20px rgba(212, 175, 55, 0.6), 0 2px 8px rgba(0, 0, 0, 0.8)'
          }}
        >
          Today&apos;s Compass
        </h2>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold"></div>
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
              className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                item.completed
                  ? 'bg-green-500/30 shadow-lg'
                  : 'bg-black/50 hover:bg-gold/20'
              }`}
              style={{
                boxShadow: item.completed
                  ? '0 0 15px rgba(34, 197, 94, 0.5)'
                  : '0 2px 8px rgba(0, 0, 0, 0.8), inset 0 0 0 1px rgba(212, 175, 55, 0.3)'
              }}
            >
              {item.completed && <span className="text-green-400 text-base">✓</span>}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={item.text}
              onChange={(e) => updateItemText(item.id, e.target.value)}
              className={`flex-1 bg-transparent border-none text-parchment body-font text-base focus:outline-none focus:text-white ${
                item.completed ? 'line-through opacity-60' : ''
              }`}
              style={{
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
              }}
              placeholder="Add task..."
            />

            {/* Delete Button */}
            <button
              onClick={() => deleteItem(item.id)}
              className="w-7 h-7 flex items-center justify-center text-steel hover:text-red-400 transition-colors flex-shrink-0 opacity-50 hover:opacity-100"
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
          className="flex items-center gap-3 pt-2 opacity-70 hover:opacity-100 transition-opacity"
        >
          <div className="w-7 h-7 flex-shrink-0"></div>
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addItem()
              }
            }}
            className="flex-1 bg-transparent border-b border-gold/20 text-parchment body-font text-base focus:outline-none focus:border-gold/60 pb-1"
            style={{
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
            }}
            placeholder="+ Add new item..."
          />
          {newItemText && (
            <button
              onClick={addItem}
              className="text-gold hover:text-gold-light text-sm title-font font-semibold transition-colors px-3 py-1 rounded-full bg-gold/10 hover:bg-gold/20"
            >
              Add
            </button>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
