'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { BottomNav } from '@/components/bottom-nav'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { Rink, RinkScheduleDay } from '@/lib/types'
import { defaultRinks } from '@/lib/rinks-data'
import { Search, Navigation2, Info, X, Clock, MapPin, CalendarDays } from 'lucide-react'
import { Snowflake } from '@/components/snowflake'

const RINK_DIRECTIONS: Record<string, string> = {
  'marquarie-ice-rink': 'https://www.google.com/maps/dir/?api=1&destination=Macquarie+Ice+Rink,+Waterloo+Rd,+North+Ryde+NSW+2113&destination_place_id=ChIJmyZZwQymEmsRKTR2ywCdRac',
  'lcc-ice-rink': 'https://www.google.com/maps/dir/?api=1&destination=LCC+Ice+Rink,+424-458+Hoxton+Park+Rd,+Prestons+NSW+2170&destination_place_id=ChIJr3pOaK2VEmsRcLzmQNJVo6I',
  'ice-zoo-sydney': 'https://www.google.com/maps/dir/?api=1&destination=Ice+Zoo+Sydney,+Johnson+St,+Alexandria+NSW&destination_place_id=ChIJVYOSQFS4EmsRYhYEBPAgn_o',
}

function getNextSession(rink: Rink) {
  if (!rink.schedule || rink.schedule.length === 0) return null

  const now = new Date()
  const currentDate = now.toISOString().split('T')[0]
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

  for (const day of rink.schedule) {
    if (day.date >= currentDate) {
      for (const session of day.sessions) {
        if (day.date > currentDate || session.start > currentTime) {
          const isToday = day.date === currentDate
          const dateLabel = isToday ? 'Today' : new Date(day.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

          const timeRange = session.end
            ? `${formatTime(session.start)} - ${formatTime(session.end)}`
            : formatTime(session.start)

          return {
            date: dateLabel,
            time: timeRange,
            type: session.type,
          }
        }
      }
    }
  }

  return null
}

function formatTime(time24: string): string {
  const [hours, minutes] = time24.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 || 12
  return `${hours12}:${String(minutes).padStart(2, '0')} ${period}`
}

function formatScheduleDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  if (date.toDateString() === today.toDateString()) return 'Today'
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow'

  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function RinkInfoModal({ rink, onClose }: { rink: Rink; onClose: () => void }) {
  const upcomingDays = (rink.schedule || []).filter((day) => {
    const today = new Date().toISOString().split('T')[0]
    return day.date >= today
  }).slice(0, 5)

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-t-3xl max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[hsl(var(--border))]">
          <div className="flex items-center gap-3">

            <div>
              <h2 className="text-lg font-bold">{rink.name}</h2>
              <div className="flex items-center gap-1 text-sm text-[hsl(var(--text-secondary))]">
                <span className="line-clamp-1">{rink.address}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[hsl(var(--input-bg))] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Schedule */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="w-5 h-5 text-[hsl(var(--primary-blue))]" />
            <h3 className="font-semibold text-base">Upcoming Schedule</h3>
          </div>

          {upcomingDays.length === 0 ? (
            <p className="text-[hsl(var(--text-secondary))] text-sm text-center py-8">No upcoming sessions scheduled.</p>
          ) : (
            <div className="space-y-5">
              {upcomingDays.map((day: RinkScheduleDay) => (
                <div key={day.date}>
                  <div className="text-sm font-semibold text-[hsl(var(--primary-blue))] mb-2">
                    {formatScheduleDate(day.date)}
                  </div>
                  <div className="space-y-2">
                    {day.sessions.map((session, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-[hsl(var(--input-bg))] rounded-xl"
                      >
                        <Clock className="w-4 h-4 text-[hsl(var(--text-muted))] shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">{session.type}</div>
                          <div className="text-xs text-[hsl(var(--text-secondary))]">
                            {formatTime(session.start)}
                            {session.end ? ` - ${formatTime(session.end)}` : ''}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer action */}
        <div className="p-5 border-t border-[hsl(var(--border))]">
          <a
            href={RINK_DIRECTIONS[rink.id] || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(rink.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-[hsl(var(--primary-blue))] hover:bg-[hsl(var(--primary-blue-hover))] text-white rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <Navigation2 className="w-4 h-4" />
            Get Directions
          </a>
        </div>
      </div>
    </div>
  )
}

export default function RinksPage() {
  const [rinks] = useLocalStorage<Rink[]>('rinks', defaultRinks)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRink, setSelectedRink] = useState<Rink | null>(null)

  const filteredRinks = rinks.filter((rink) =>
    rink.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen pb-24 px-8 pt-8 max-w-md mx-auto">
      <PageHeader title="Ice Rinks" />

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--text-muted))]" />
        <input
          type="text"
          placeholder="Search Rinks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white rounded-full border-2 border-gray-200 focus:outline-none focus:border-[hsl(var(--primary-blue))] transition-colors"
        />
      </div>

      {/* Rinks List */}
      <div className="space-y-4">
        {filteredRinks.map((rink) => {
          const nextSession = getNextSession(rink)

          return (
            <div
              key={rink.id}
              className="bg-white rounded-3xl border-[3px] border-black overflow-hidden"
            >
              <div className="relative h-40 bg-gradient-to-br from-blue-200 to-blue-300 overflow-hidden">
                {rink.mapEmbedUrl ? (
                  <iframe
                    src={rink.mapEmbedUrl}
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${rink.name}`}
                  />
                ) : (
                  <img
                    src={rink.imageUrl || ''}
                    alt={rink.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold mb-2">{rink.name}</h3>
                <p className="text-sm text-[hsl(var(--text-secondary))] mb-4">
                  {rink.address}
                </p>

                {nextSession && (
                  <div className="bg-[hsl(var(--ice-hard-bg))] rounded-xl p-3 mb-4">
                    <div className="text-xs text-[hsl(var(--primary-blue))] font-semibold mb-1 uppercase">
                      Next Public Session
                    </div>
                    <div className="text-sm font-semibold text-[hsl(var(--primary-blue))]">
                      {nextSession.date}, {nextSession.time}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <a
                    href={RINK_DIRECTIONS[rink.id] || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(rink.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-[hsl(var(--primary-blue))] hover:bg-[hsl(var(--primary-blue-hover))] text-white rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                  >
                    <Navigation2 className="w-4 h-4" />
                    Direction
                  </a>
                  <button
                    onClick={() => setSelectedRink(rink)}
                    className="flex-1 py-3 bg-white border-[3px] border-black rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all text-[hsl(var(--text-primary))]"
                  >
                    <Info className="w-4 h-4" />
                    More Info
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Snowflake className=" left-8 w-12 h-12 opacity-30" />

      {selectedRink && (
        <RinkInfoModal rink={selectedRink} onClose={() => setSelectedRink(null)} />
      )}

      <BottomNav />
    </div>
  )
}
