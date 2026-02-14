'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { BottomNav } from '@/components/bottom-nav'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { BladeLife, Session, Rink, ActiveSession, IceType } from '@/lib/types'
import { defaultRinks } from '@/lib/rinks-data'
import { ActiveSessionView } from '@/components/active-session'
import { StartSessionModal } from '@/components/start-session-modal'
import { Scissors, Play, ChevronRight, Activity } from 'lucide-react'
import { Snowflake } from '@/components/snowflake'
import Link from 'next/link'

const defaultBladeLife: BladeLife = {
  currentMm: 21,
  maxMm: 21,
  minMm: 12,
  hoursRemaining: 15,
  totalHours: 15,
}

export default function HomePage() {
  const [bladeLife, setBladeLife] = useLocalStorage<BladeLife>('bladeLife', defaultBladeLife)
  const [sessions, setSessions] = useLocalStorage<Session[]>('sessions', [])
  const [homeRink] = useLocalStorage<Rink>('homeRink', defaultRinks[0])
  const [activeSession, setActiveSession] = useLocalStorage<ActiveSession | null>('activeSession', null)
  const [rinks] = useLocalStorage<Rink[]>('rinks', defaultRinks)
  const [showStartModal, setShowStartModal] = useState(false)

  const handleStartSession = (rinkId: string, rinkName: string, iceType: IceType) => {
    setActiveSession({
      rinkId,
      rinkName,
      iceType,
      startTime: Date.now(),
    })
    setShowStartModal(false)
  }

  const handleStopSession = () => {
    if (!activeSession) return

    const endTime = Date.now()
    const durationMs = endTime - activeSession.startTime
    const durationHours = +(durationMs / (1000 * 60 * 60)).toFixed(1)

    const now = new Date()
    const dateLabel = now.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })

    const newSession: Session = {
      id: crypto.randomUUID(),
      rinkId: activeSession.rinkId,
      rinkName: activeSession.rinkName,
      date: dateLabel,
      startTime: activeSession.startTime,
      endTime,
      duration: Math.max(durationHours, 0.1),
      iceType: activeSession.iceType,
    }

    setSessions([newSession, ...sessions])

    // Deduct blade life
    const multiplier = activeSession.iceType === 'Hard' ? 1.5 : activeSession.iceType === 'Rough' ? 2 : 1
    const hoursDeducted = newSession.duration * multiplier
    setBladeLife({
      ...bladeLife,
      hoursRemaining: Math.max(0, +(bladeLife.hoursRemaining - hoursDeducted).toFixed(1)),
    })

    setActiveSession(null)
  }

  const usagePercent = Math.round((bladeLife.hoursRemaining / bladeLife.totalHours) * 100)

  const getRating = (percent: number) => {
    if (percent >= 75) return { label: 'EXCELLENT', color: 'bg-[hsl(var(--status-green))]' }
    if (percent >= 50) return { label: 'GOOD', color: 'bg-[hsl(var(--status-green))]' }
    if (percent >= 25) return { label: 'FAIR', color: 'bg-[hsl(var(--status-orange))]' }
    return { label: 'POOR', color: 'bg-[hsl(var(--status-red))]' }
  }

  const rating = getRating(usagePercent)
  const recentSession = sessions[0]

  const getTimeAgo = (session: Session) => {
    if (!session.endTime) return session.date
    const diff = Date.now() - session.endTime
    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <div className="min-h-screen pb-24 px-4 pt-8 max-w-md mx-auto">
      <PageHeader title="BladeLife" />

      {/* Active Session Stopwatch */}
      {activeSession && (
        <ActiveSessionView activeSession={activeSession} onStop={handleStopSession} />
      )}

      {/* Current Edge Status */}
      <div className="mb-4 p-6 bg-white rounded-3xl border-[3px] border-black">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8" />
            <span className="text-lg font-semibold">Current Edge</span>
          </div>
          <span className={`${rating.color} text-white px-4 py-1 rounded-full text-sm font-medium`}>
            {rating.label}
          </span>
        </div>

        <div className="text-center mb-2">
          <div className="text-5xl font-bold">
            {bladeLife.currentMm}
            <span className="text-2xl text-[hsl(var(--text-secondary))]">/15hrs</span>
          </div>
          <div className="text-[hsl(var(--text-secondary))] mt-1">
            {bladeLife.hoursRemaining}hrs left
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">Usage Left</span>
            <span className="font-semibold">{usagePercent}%</span>
          </div>
          <div className="h-3 bg-[hsl(var(--progress-bg))] rounded-full overflow-hidden">
            <div
              className="h-full bg-[hsl(var(--progress-fill))] transition-all duration-300"
              style={{ width: `${usagePercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Link
          href="/maintenance"
          className="p-6 bg-white rounded-3xl border-[3px] border-black flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <Scissors className="w-8 h-8" />
          <span className="font-semibold text-center">Log Sharpening</span>
        </Link>

        <button
          onClick={() => {
            if (activeSession) return
            setShowStartModal(true)
          }}
          disabled={!!activeSession}
          className={`p-6 rounded-3xl border-[3px] border-black flex flex-col items-center justify-center gap-3 active:scale-95 transition-all ${
            activeSession
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[hsl(var(--primary-blue))] hover:bg-[hsl(var(--primary-blue-hover))] text-white'
          }`}
        >
          <Play className={`w-8 h-8 ${activeSession ? '' : 'fill-white'}`} />
          <span className="font-semibold text-center">Start Session</span>
        </button>
      </div>

      {/* Recent Session */}
      {recentSession && (
        <div className="mb-4 p-5 bg-white rounded-3xl border-[3px] border-black">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Recent Session</span>
            <span className="text-sm text-[hsl(var(--text-muted))]">{getTimeAgo(recentSession)}</span>
          </div>
          <div className="text-[hsl(var(--text-secondary))] text-sm">
            {recentSession.duration}h @ {recentSession.rinkName}
          </div>
        </div>
      )}

      {/* Home Rink */}
      <Link
        href="/rinks"
        className="p-5 bg-white rounded-3xl border-[3px] border-black flex items-center justify-between active:scale-95 transition-transform"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[hsl(var(--snowflake))] rounded-full flex items-center justify-center">
            <Snowflake className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-[hsl(var(--text-secondary))]">Home Rink</div>
            <div className="font-semibold">{homeRink.name}</div>
          </div>
        </div>
        <ChevronRight className="w-6 h-6 text-[hsl(var(--text-muted))]" />
      </Link>

      {showStartModal && (
        <StartSessionModal
          rinks={rinks}
          onStart={handleStartSession}
          onClose={() => setShowStartModal(false)}
        />
      )}

      <BottomNav />
    </div>
  )
}
