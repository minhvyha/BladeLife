'use client'

import { useState, useEffect } from 'react'
import { ActiveSession, IceType } from '@/lib/types'
import { StopCircle, Timer } from 'lucide-react'

function formatElapsed(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

interface ActiveSessionViewProps {
  activeSession: ActiveSession
  onStop: () => void
}

export function ActiveSessionView({ activeSession, onStop }: ActiveSessionViewProps) {
  const [elapsed, setElapsed] = useState(Date.now() - activeSession.startTime)

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Date.now() - activeSession.startTime)
    }, 1000)
    return () => clearInterval(interval)
  }, [activeSession.startTime])

  return (
    <div className="mb-4 p-6 bg-[hsl(var(--primary-blue))] rounded-3xl border-[3px] border-black text-white">
      <div className="flex items-center gap-2 mb-3">
        <Timer className="w-5 h-5" />
        <span className="font-semibold uppercase text-sm tracking-wider opacity-80">Active Session</span>
      </div>

      <div className="text-center mb-2">
        <div className="text-5xl font-bold font-mono tracking-wider">
          {formatElapsed(elapsed)}
        </div>
      </div>

      <div className="text-center text-white/80 text-sm mb-5">
        {activeSession.rinkName} &middot; {activeSession.iceType} Ice
      </div>

      <button
        onClick={onStop}
        className="w-full py-3.5 bg-white text-[hsl(var(--text-primary))] rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
      >
        <StopCircle className="w-5 h-5" />
        Stop Session
      </button>
    </div>
  )
}
