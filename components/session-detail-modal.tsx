'use client'

import { useState } from 'react'
import { Session, IceType, Rink } from '@/lib/types'
import { X, Edit3, Trash2, AlertCircle, Snowflake as SnowflakeIcon, Droplets, Flame } from 'lucide-react'

interface SessionDetailModalProps {
  session: Session
  rinks: Rink[]
  onClose: () => void
  onUpdate: (updated: Session) => void
  onDelete: (id: string) => void
}

function formatSessionDate(date: string, startTime?: number): string {
  if (startTime) {
    const d = new Date(startTime)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      ' \u2022 ' +
      d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }
  return date
}

function getImpact(duration: number, iceType: IceType): { deducted: number; multiplier: number; description: string } {
  const multiplier = iceType === 'Hard' ? 1.5 : iceType === 'Rough' ? 2 : 1
  const deducted = +(duration * multiplier).toFixed(1)
  const desc = iceType === 'Hard'
    ? `Hard ice accelerates dulling by ${multiplier}x. This session counts as ${deducted} hours of wear.`
    : iceType === 'Rough'
      ? `Rough ice accelerates dulling by ${multiplier}x. This session counts as ${deducted} hours of wear.`
      : `Soft ice has standard wear. This session counts as ${deducted} hours of wear.`
  return { deducted, multiplier, description: desc }
}

function getIceIcon(type: IceType) {
  if (type === 'Hard') return SnowflakeIcon
  if (type === 'Soft') return Droplets
  return Flame
}

function getIceColor(type: IceType) {
  if (type === 'Hard') return 'bg-[hsl(var(--ice-hard-bg))] text-[hsl(var(--ice-hard-text))]'
  if (type === 'Soft') return 'bg-[hsl(var(--ice-soft-bg))] text-[hsl(var(--ice-soft-text))]'
  return 'bg-[hsl(var(--ice-rough-bg))] text-[hsl(var(--ice-rough-text))]'
}

export function SessionDetailModal({ session, rinks, onClose, onUpdate, onDelete }: SessionDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editRinkId, setEditRinkId] = useState(session.rinkId)
  const [editDuration, setEditDuration] = useState(String(session.duration))
  const [editIceType, setEditIceType] = useState<IceType>(session.iceType)

  const impact = getImpact(session.duration, session.iceType)
  const IceIcon = getIceIcon(session.iceType)

  const handleSave = () => {
    const rink = rinks.find((r) => r.id === editRinkId)
    onUpdate({
      ...session,
      rinkId: editRinkId,
      rinkName: rink?.name || session.rinkName,
      duration: parseFloat(editDuration) || session.duration,
      iceType: editIceType,
    })
    setIsEditing(false)
  }

  const iceOptions: { type: IceType; icon: typeof SnowflakeIcon; label: string }[] = [
    { type: 'Hard', icon: SnowflakeIcon, label: 'Hard' },
    { type: 'Soft', icon: Droplets, label: 'Soft' },
    { type: 'Rough', icon: Flame, label: 'Rough' },
  ]

  if (isEditing) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl border-[3px] border-black p-6 w-full max-w-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Edit Session</h3>
            <button onClick={() => setIsEditing(false)} className="p-1.5 rounded-full hover:bg-[hsl(var(--input-bg))] transition-colors" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[hsl(var(--text-secondary))] mb-2 uppercase">Rink</label>
              <select
                value={editRinkId}
                onChange={(e) => setEditRinkId(e.target.value)}
                className="w-full p-3 bg-[hsl(var(--input-bg))] rounded-xl border-2 border-gray-200 font-medium"
              >
                {rinks.map((rink) => (
                  <option key={rink.id} value={rink.id}>{rink.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[hsl(var(--text-secondary))] mb-2 uppercase">Duration (hours)</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={editDuration}
                onChange={(e) => setEditDuration(e.target.value)}
                className="w-full p-3 bg-[hsl(var(--input-bg))] rounded-xl border-2 border-gray-200 font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[hsl(var(--text-secondary))] mb-2 uppercase">Ice Type</label>
              <div className="flex gap-3">
                {iceOptions.map((opt) => {
                  const Icon = opt.icon
                  const isSelected = editIceType === opt.type
                  return (
                    <button
                      key={opt.type}
                      onClick={() => setEditIceType(opt.type)}
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
              onClick={handleSave}
              className="w-full p-4 bg-[hsl(var(--primary-blue))] hover:bg-[hsl(var(--primary-blue-hover))] text-white rounded-xl font-semibold active:scale-[0.98] transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl border-[3px] border-black p-6 w-full max-w-sm">
        {/* Close button */}
        <div className="flex justify-end mb-2">
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-[hsl(var(--input-bg))] transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Skate icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-[hsl(var(--ice-hard-bg))] rounded-2xl flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary-blue))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a2 2 0 0 1 2-2h2z" />
              <path d="M12 10v3a3 3 0 0 1-3 3H4" />
              <path d="M2 18h18" />
              <path d="M6 14v4" />
            </svg>
          </div>
        </div>

        {/* Session info */}
        <div className="text-center mb-5">
          <h2 className="text-xl font-bold mb-1">{session.rinkName}</h2>
          <p className="text-sm text-[hsl(var(--text-secondary))]">
            {formatSessionDate(session.date, session.startTime)}
          </p>
        </div>

        {/* Duration + Ice Type */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-[hsl(var(--input-bg))] rounded-xl p-3 text-center">
            <div className="text-xs text-[hsl(var(--text-muted))] font-semibold uppercase mb-1">Duration</div>
            <div className="text-lg font-bold">{session.duration} hrs</div>
          </div>
          <div className={`rounded-xl p-3 text-center ${getIceColor(session.iceType)}`}>
            <div className="text-xs font-semibold uppercase mb-1 opacity-70">Ice Type</div>
            <div className="flex items-center justify-center gap-1.5 text-lg font-bold">
              <IceIcon className="w-4 h-4" />
              {session.iceType}
            </div>
          </div>
        </div>

        {/* Blade Life Impact */}
        <div className="bg-[hsl(var(--input-bg))] rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold uppercase">Blade Life Impact</span>
            <AlertCircle className="w-4 h-4 text-[hsl(var(--text-muted))]" />
          </div>
          <div className="mb-2">
            <span className="text-3xl font-bold text-[hsl(var(--status-red))]">-{impact.deducted}</span>
            <span className="text-sm text-[hsl(var(--text-secondary))] ml-1">hrs deducted</span>
          </div>
          <p className="text-xs text-[hsl(var(--text-secondary))] leading-relaxed">
            {impact.description}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setIsEditing(true)}
            className="flex-1 py-3.5 bg-[hsl(var(--primary-blue))] hover:bg-[hsl(var(--primary-blue-hover))] text-white rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => onDelete(session.id)}
            className="flex-1 py-3.5 bg-white border-[3px] border-black rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all text-[hsl(var(--text-primary))]"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
