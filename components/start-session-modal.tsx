'use client'

import { useState } from 'react'
import { IceType, Rink } from '@/lib/types'
import { X, Play, Snowflake as SnowflakeIcon, Droplet, Flame } from 'lucide-react'

interface StartSessionModalProps {
  rinks: Rink[]
  onStart: (rinkId: string, rinkName: string, iceType: IceType) => void
  onClose: () => void
}

export function StartSessionModal({ rinks, onStart, onClose }: StartSessionModalProps) {
  const [selectedRinkId, setSelectedRinkId] = useState(rinks[0]?.id || '')
  const [iceType, setIceType] = useState<IceType>('Hard')

  const selectedRink = rinks.find((r) => r.id === selectedRinkId)

  const handleStart = () => {
    if (selectedRink) {
      onStart(selectedRink.id, selectedRink.name, iceType)
    }
  }

  const iceOptions: { type: IceType; icon: typeof SnowflakeIcon; label: string }[] = [
    { type: 'Hard', icon: SnowflakeIcon, label: 'Hard' },
    { type: 'Soft', icon: Droplet, label: 'Soft' },
    { type: 'Rough', icon: Flame, label: 'Rough' },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl border-[3px] border-black p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Start Session</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[hsl(var(--input-bg))] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[hsl(var(--text-secondary))] mb-2 uppercase">
              Rink
            </label>
            <select
              value={selectedRinkId}
              onChange={(e) => setSelectedRinkId(e.target.value)}
              className="w-full p-3 bg-[hsl(var(--input-bg))] rounded-xl border-2 border-gray-200 font-medium"
            >
              {rinks.map((rink) => (
                <option key={rink.id} value={rink.id}>
                  {rink.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[hsl(var(--text-secondary))] mb-2 uppercase">
              Ice Type
            </label>
            <div className="flex gap-3">
              {iceOptions.map((opt) => {
                const Icon = opt.icon
                const isSelected = iceType === opt.type
                return (
                  <button
                    key={opt.type}
                    onClick={() => setIceType(opt.type)}
                    className={`flex-1 p-3 rounded-xl border-2 font-semibold flex items-center justify-center gap-2 transition-all ${
                      isSelected
                        ? 'border-[hsl(var(--primary-blue))] bg-[hsl(var(--ice-hard-bg))] text-[hsl(var(--primary-blue))]'
                        : 'border-gray-200 bg-white text-[hsl(var(--text-secondary))]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full p-4 bg-[hsl(var(--primary-blue))] hover:bg-[hsl(var(--primary-blue-hover))] text-white rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <Play className="w-5 h-5 fill-white" />
            Start Skating
          </button>
        </div>
      </div>
    </div>
  )
}
