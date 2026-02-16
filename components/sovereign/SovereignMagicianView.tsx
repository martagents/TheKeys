'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface SovereignData {
  identity: string
  financeGoal: string
  impactGoal: string
  operationsGoal: string
  structureGoal: string
  templeGoal: string
}

export default function SovereignMagicianView() {
  const [data, setData] = useState<SovereignData>({
    identity: 'I am a powerful, sovereign business owner (vs operator) who drives impact through smart solutions, strategic focus, and effective systems – technologies, people and processes -- across my portfolio of ownership. These systems drive 20X-100X growth in everything I touch.',
    financeGoal: 'all financial operations timely, effective and informing – beyond the basics',
    impactGoal: 'vision, precise rhythms and effective delegation',
    operationsGoal: 'clear KPIs and OKRs (with automated dashboards)',
    structureGoal: 'organized, professional, impactful and effective',
    templeGoal: 'A strong, lean physique is the outcome of how I prioritize being at my best every day.',
  })

  const sections = [
    {
      title: 'My Identity',
      key: 'identity' as const,
      icon: '👑',
      color: '#D4AF37',
      multiline: true,
    },
    {
      title: 'Finance as a Strategic Function',
      key: 'financeGoal' as const,
      icon: '💰',
      color: '#34D399',
      description: 'Monthly financials, future cash flows, project profitability across Usekase, Mavile and Home',
    },
    {
      title: 'Impact Creating Sovereign',
      key: 'impactGoal' as const,
      icon: '🎯',
      color: '#60A5FA',
      description: "My 'day job' will be run through clarity of...",
    },
    {
      title: 'Operations As a Offensive Weapon',
      key: 'operationsGoal' as const,
      icon: '⚙️',
      color: '#F59E0B',
      description: 'Operations and roadmaps will be managed effectively with...',
    },
    {
      title: 'Structure as a Foundation',
      key: 'structureGoal' as const,
      icon: '🏛️',
      color: '#A78BFA',
      description: 'My operation can be defined as...',
    },
    {
      title: 'The Worshipped Temple',
      key: 'templeGoal' as const,
      icon: '💎',
      color: '#F472B6',
      multiline: true,
    },
  ]

  return (
    <div className="min-h-screen bg-black p-6 pt-16 pb-24">
      {/* Radial gradient background */}
      <div className="fixed inset-0 pointer-events-none obsidian-bg-top" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 relative z-10"
      >
        <h1 className="font-serif text-4xl gold-gradient mb-2">The Sovereign Magician</h1>
        <p className="text-steel text-sm tracking-widest uppercase">
          2026 Mission & Identity
        </p>
      </motion.div>

      <div className="space-y-4 max-w-2xl mx-auto relative z-10">
        {sections.map((section, index) => (
          <motion.div
            key={section.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-pillar rounded-2xl p-5 border"
            style={{
              borderColor: `${section.color}30`,
              boxShadow: `0 8px 32px ${section.color}10`,
            }}
          >
            <div className="mb-3">
              <h3 className="text-white font-semibold flex items-center gap-2 mb-1">
                <span className="text-2xl">{section.icon}</span>
                {section.title}
              </h3>
              {section.description && (
                <p className="text-steel text-xs ml-8">{section.description}</p>
              )}
            </div>

            {section.multiline ? (
              <textarea
                value={data[section.key]}
                onChange={(e) => setData({ ...data, [section.key]: e.target.value })}
                className="w-full bg-black/30 border border-steel/20 rounded-xl p-3 text-white leading-relaxed resize-none focus:outline-none focus:border-gold/50 min-h-[100px]"
              />
            ) : (
              <input
                type="text"
                value={data[section.key]}
                onChange={(e) => setData({ ...data, [section.key]: e.target.value })}
                className="w-full bg-black/30 border border-steel/20 rounded-xl p-3 text-white focus:outline-none focus:border-gold/50"
              />
            )}
          </motion.div>
        ))}

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full bg-gold hover:bg-gold/90 text-black font-bold py-4 rounded-xl transition-all touch-target"
          onClick={() => {
            console.log('Saving Sovereign Magician data:', data)
            if ('vibrate' in navigator) navigator.vibrate(50)
          }}
        >
          Save Mission & Identity
        </motion.button>
      </div>
    </div>
  )
}
