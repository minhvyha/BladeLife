'use client'

import { useState, useMemo } from 'react'
import { PageHeader } from '@/components/page-header'
import { BottomNav } from '@/components/bottom-nav'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { Session, Rink } from '@/lib/types'
import { defaultRinks } from '@/lib/rinks-data'
import { SessionDetailModal } from '@/components/session-detail-modal'
import { ChevronRight, Snowflake as SnowflakeIcon, Droplets, Flame, FileText } from 'lucide-react'
import { Snowflake } from '@/components/snowflake'

export default function SessionsPage() {
  const [sessions, setSessions] = useLocalStorage<Session[]>('sessions', [])
  const [rinks] = useLocalStorage<Rink[]>('rinks', defaultRinks)
  const [filter, setFilter] = useState<'all' | string>('all')
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)

  // Build dynamic filter buttons from actual sessions
  const rinkFilters = useMemo(() => {
    const unique = [...new Set(sessions.map((s) => s.rinkName))]
    return unique.slice(0, 3)
  }, [sessions])

  const filteredSessions =
    filter === 'all' ? sessions : sessions.filter((s) => s.rinkName.includes(filter))

  // Group sessions by month
  const getMonthLabel = (session: Session): string => {
    if (session.startTime) {
      const d = new Date(session.startTime)
      return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()
    }
    return session.date
  }

  const getIceIcon = (type: string) => {
    if (type === 'Hard') return SnowflakeIcon
    if (type === 'Soft') return Droplets
    return Flame
  }

  const getIceColor = (type: string) => {
    if (type === 'Hard') return 'bg-[hsl(var(--ice-hard-bg))] text-[hsl(var(--ice-hard-text))]'
    if (type === 'Soft') return 'bg-[hsl(var(--ice-soft-bg))] text-[hsl(var(--ice-soft-text))]'
    return 'bg-[hsl(var(--ice-rough-bg))] text-[hsl(var(--ice-rough-text))]'
  }

  const getStatusColor = (status?: string) => {
    if (status === 'JUST SHARPENED') return 'text-[hsl(var(--text-muted))]'
    if (status === 'NEEDS SHARPEN') return 'text-[hsl(var(--text-muted))]'
    return ''
  }

  const handleUpdateSession = (updated: Session) => {
    setSessions(sessions.map((s) => (s.id === updated.id ? updated : s)))
    setSelectedSession(null)
  }

  const handleDeleteSession = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id))
    setSelectedSession(null)
  }

  const getDateDisplay = (session: Session): string => {
    if (session.startTime) {
      const d = new Date(session.startTime)
      const now = new Date()
      const diff = now.getTime() - d.getTime()
      const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24))
      if (daysDiff === 0) return 'Today'
      if (daysDiff === 1) return 'Yesterday'
      return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })
    }
    return session.date
  }

  return (
    <div className="min-h-screen pb-24 px-8 pt-8 max-w-md mx-auto">
      <PageHeader title="Session Logs" />

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-4 overflow-x-auto pb-1">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
            filter === 'all'
              ? 'bg-black text-white'
              : 'bg-white text-black border-2 border-gray-300'
          }`}
        >
          All Rinks
        </button>
        {rinkFilters.map((name) => (
          <button
            key={name}
            onClick={() => setFilter(name)}
            className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
              filter === name
                ? 'bg-black text-white'
                : 'bg-white text-black border-2 border-gray-300'
            }`}
          >
            {name.split(' ')[0]}
          </button>
        ))}
      </div>

      {sessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 bg-[hsl(var(--input-bg))] rounded-full flex items-center justify-center mb-4">
            <FileText className="w-10 h-10 text-[hsl(var(--text-muted))]" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No Sessions Yet</h3>
          <p className="text-sm text-[hsl(var(--text-secondary))] max-w-xs leading-relaxed">
            Start your first skating session from the home page. Your session logs will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Date Header */}
          <div className="text-sm text-[hsl(var(--text-muted))] font-semibold mb-3 uppercase">
            {filteredSessions.length > 0 ? getMonthLabel(filteredSessions[0]) : ''}
          </div>

          {/* Sessions List */}
          <div className="space-y-4">
            {filteredSessions.map((session) => {
              const IceIcon = getIceIcon(session.iceType)
              return (
                <button
                  key={session.id}
                  onClick={() => setSelectedSession(session)}
                  className="w-full p-5 bg-white rounded-3xl border-[3px] border-black active:scale-[0.98] transition-transform"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-left">{session.rinkName}</h3>
                    <ChevronRight className="w-5 h-5 text-[hsl(var(--text-muted))]" />
                  </div>

                  <div className="text-sm text-[hsl(var(--text-secondary))] mb-4 text-left">
                    {getDateDisplay(session)} &middot; {session.duration} hours
                  </div>

                  <div className="border-t-2 border-gray-100 pt-4 flex items-center justify-between">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm ${getIceColor(session.iceType)}`}>
                      <IceIcon className="w-4 h-4" />
                      {session.iceType} Ice
                    </div>
                    {session.status && (
                      <div className={`text-xs font-semibold uppercase tracking-wide ${getStatusColor(session.status)}`}>
                        {session.status}
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </>
      )}

      {selectedSession && (
        <SessionDetailModal
          session={selectedSession}
          rinks={rinks}
          onClose={() => setSelectedSession(null)}
          onUpdate={handleUpdateSession}
          onDelete={handleDeleteSession}
        />
      )}

      <BottomNav />
    </div>
  )
}
