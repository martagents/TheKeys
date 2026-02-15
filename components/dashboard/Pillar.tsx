'use client'

import { motion } from 'framer-motion'
import { PillarData } from './TheCitadel'

interface PillarProps {
  pillar: PillarData
  index: number
  onSelect: () => void
}

export default function Pillar({ pillar, index, onSelect }: PillarProps) {
  const maxHeight = 400
  const height = (pillar.compliance / 100) * maxHeight

  return (
    <motion.div
      className="flex flex-col items-center gap-2 cursor-pointer group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onSelect}
    >
      {/* Pillar bar */}
      <motion.div
        className="relative w-12 rounded-t-lg overflow-hidden"
        style={{
          height: `${height}px`,
          background: `linear-gradient(to top, ${pillar.color}, ${pillar.color}80)`,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-white/20 backdrop-blur-sm" />

        {/* Compliance percentage */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2">
          <span className="text-xs font-bold text-white drop-shadow-lg">
            {Math.round(pillar.compliance)}%
          </span>
        </div>

        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent"
          initial={{ y: '100%' }}
          whileHover={{ y: '-100%' }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>

      {/* Base platform */}
      <div
        className="w-14 h-3 rounded-sm"
        style={{
          background: `linear-gradient(to right, ${pillar.color}40, ${pillar.color}20)`,
        }}
      />

      {/* Pillar name */}
      <motion.p
        className="text-xs text-steel font-medium tracking-wide mt-1"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
      >
        {pillar.name}
      </motion.p>
    </motion.div>
  )
}
