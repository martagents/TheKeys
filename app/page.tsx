'use client'

import { useState } from 'react'
import TheVow from '@/components/splash/TheVow'
import TheCitadel from '@/components/dashboard/TheCitadel'

export default function Home() {
  const [showVow, setShowVow] = useState(true)

  return (
    <main>
      {showVow ? (
        <TheVow onComplete={() => setShowVow(false)} />
      ) : (
        <TheCitadel />
      )}
    </main>
  )
}
