'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { BottomNav } from '@/components/bottom-nav'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { BladeLife, Sharpening, ChecklistItem, Rink } from '@/lib/types'
import { defaultRinks } from '@/lib/rinks-data'
import { Scissors, CheckCircle2, Circle, ListChecks } from 'lucide-react'
import { Snowflake } from '@/components/snowflake'

const defaultBladeLife: BladeLife = {
  currentMm: 21,
  maxMm: 21,
  minMm: 12,
  hoursRemaining: 15,
  totalHours: 15,
}

const defaultChecklist: ChecklistItem[] = [
  { id: '1', label: 'Steel Integrity', checked: false },
  { id: '2', label: 'Rivet Check', checked: false },
  { id: '3', label: 'Boot Drying', checked: false },
]

export default function MaintenancePage() {
  const [bladeLife, setBladeLife] = useLocalStorage<BladeLife>('bladeLife', defaultBladeLife)
  const [checklist, setChecklist] = useLocalStorage<ChecklistItem[]>(
    'checklist',
    defaultChecklist
  )
  const [sharpenings, setSharpenings] = useLocalStorage<Sharpening[]>('sharpenings', [])
  const [rinks] = useLocalStorage<Rink[]>('rinks', defaultRinks)
  const [showSharpeningModal, setShowSharpeningModal] = useState(false)

  // Sharpening form state
  const [sharpDate, setSharpDate] = useState(() => new Date().toISOString().split('T')[0])
  const [sharpShop, setSharpShop] = useState(defaultRinks[0]?.name || '')
  const [sharpHollow, setSharpHollow] = useState('1/2"')
  const [sharpHardness, setSharpHardness] = useState<'Soft' | 'Hard'>('Soft')

  const handleConfirmSharpening = () => {
    const d = new Date(sharpDate + 'T00:00:00')
    const dateLabel = `${d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}`

    const newSharpening: Sharpening = {
      id: crypto.randomUUID(),
      date: dateLabel,
      shop: sharpShop,
      hollowRadius: sharpHollow,
      iceHardness: sharpHardness,
    }

    setSharpenings([newSharpening, ...sharpenings])

    // Reset blade life to full
    setBladeLife({
      ...bladeLife,
      currentMm: Math.max(bladeLife.currentMm - 0.5, bladeLife.minMm), // each sharpening removes ~0.5mm of steel
      hoursRemaining: bladeLife.totalHours,
    })

    // Reset checklist
    setChecklist(defaultChecklist)

    setShowSharpeningModal(false)

    // Reset form
    setSharpDate(new Date().toISOString().split('T')[0])
    setSharpShop(defaultRinks[0]?.name || '')
    setSharpHollow('1/2"')
    setSharpHardness('Soft')
  }

  const usagePercent = Math.round((bladeLife.hoursRemaining / bladeLife.totalHours) * 100)

  const getRating = (percent: number) => {
    if (percent >= 75) return { label: 'EXCELLENT', color: 'bg-[hsl(var(--status-green))]' }
    if (percent >= 50) return { label: 'GOOD', color: 'bg-[hsl(var(--status-green))]' }
    if (percent >= 25) return { label: 'FAIR', color: 'bg-[hsl(var(--status-orange))]' }
    return { label: 'POOR', color: 'bg-[hsl(var(--status-red))]' }
  }

  const rating = getRating(usagePercent)

  const toggleChecklistItem = (id: string) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    )
  }

  return (
    <div className="min-h-screen pb-24 px-8 pt-8 max-w-md mx-auto">
      <PageHeader title="Maintenance" />

      {/* Blade Life */}
      <div className="mb-4 p-6 bg-white rounded-3xl border-[3px] border-black">
        <div className="flex items-start justify-between mb-4">
          <div className="font-semibold">Blade Life Remaining</div>
          <span className={`${rating.color} text-white px-4 py-1 rounded-full text-sm font-medium`}>
            {rating.label}
          </span>
        </div>

        <div className="flex items-end gap-3 mb-2">
          <div className="text-4xl font-bold">{bladeLife.currentMm}</div>
          <div className="text-2xl text-[hsl(var(--text-secondary))] mb-1">mm</div>
          <div className="text-4xl font-bold ml-auto">{usagePercent}%</div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">Usage Left</span>
            <span className="font-semibold">{bladeLife.hoursRemaining}hrs</span>
          </div>
          <div className="h-3 bg-[hsl(var(--progress-bg))] rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${rating.color}`}
              style={{ width: `${usagePercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Log Sharpening Button */}
      <button
        onClick={() => setShowSharpeningModal(true)}
        className="w-full mb-4 p-5 bg-[hsl(var(--primary-blue))] hover:bg-[hsl(var(--primary-blue-hover))] text-white rounded-3xl border-[3px] border-black font-semibold flex items-center justify-center gap-3 active:scale-98 transition-all"
      >
        <Scissors className="w-5 h-5" />
        LOG NEW SHARPENING
      </button>

      {/* Weekly Checklist */}
      <div className="mb-4 p-6 bg-white rounded-3xl border-[3px] border-black">
        <div className="flex items-center gap-2 mb-4 font-semibold">
          <div className="w-6 h-6 bg-[hsl(var(--status-orange))] rounded flex items-center justify-center text-white text-sm">
            <ListChecks className="w-4 h-4" />
          </div>
          Weekly Checklist
        </div>

        <div className="space-y-4">
          {checklist.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleChecklistItem(item.id)}
              className="flex items-center gap-3 w-full text-left"
            >
              {item.checked ? (
                <CheckCircle2 className="w-6 h-6 text-[hsl(var(--primary-blue))] flex-shrink-0" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300 flex-shrink-0" />
              )}
              <span className={item.checked ? 'text-[hsl(var(--text-secondary))]' : ''}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Sharpening History */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Sharpening History</h2>
        </div>

        {sharpenings.length === 0 ? (
          <div className="p-8 text-center text-[hsl(var(--text-muted))] text-sm">
            No sharpenings logged yet. Tap the button above to log your first sharpening.
          </div>
        ) : (
          <div className="space-y-3">
            {sharpenings.slice(0, 5).map((sharpening) => (
              <div
                key={sharpening.id}
                className="p-5 bg-white rounded-3xl border-[3px] border-black"
              >
                <div className="flex gap-4">
                  <div className="text-center min-w-[50px] bg-[#F1F5F9] rounded-[8px] px-4 py-2 border-[#E2E8F0] border">
                    <div className="text-xs text-[hsl(var(--text-muted))] uppercase">
                      {sharpening.date.split(' ')[1] || sharpening.date.split(' ')[0]}
                    </div>
                    <div className="text-xl font-bold">
                      {sharpening.date.split(' ')[0]}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="font-semibold mb-1">{sharpening.shop}</div>
                    <div className="text-sm text-[hsl(var(--text-secondary))]">
                      {sharpening.hollowRadius} Hollow
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      {/* Sharpening Modal */}
      {showSharpeningModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl border-[3px] border-black p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Log Sharpening</h3>
              <button
                onClick={() => setShowSharpeningModal(false)}
                className="text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[hsl(var(--text-secondary))] mb-2 uppercase">
                  Date
                </label>
                <input
                  type="date"
                  value={sharpDate}
                  onChange={(e) => setSharpDate(e.target.value)}
                  className="w-full p-3 bg-[hsl(var(--input-bg))] rounded-xl border-2 border-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[hsl(var(--text-secondary))] mb-2 uppercase">
                  Shop / Location
                </label>
                <select
                  value={sharpShop}
                  onChange={(e) => setSharpShop(e.target.value)}
                  className="w-full p-3 bg-[hsl(var(--input-bg))] rounded-xl border-2 border-gray-200"
                >
                  {rinks.map((r) => (
                    <option key={r.id} value={r.name}>{r.name}</option>
                  ))}
                  <option value="Sydney Pro Shop">Sydney Pro Shop</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[hsl(var(--text-secondary))] mb-2 uppercase">
                  Hollow Radius
                </label>
                <div className="flex gap-2">
                  <select
                    value={sharpHollow}
                    onChange={(e) => setSharpHollow(e.target.value)}
                    className="flex-1 p-3 bg-[hsl(var(--input-bg))] rounded-xl border-2 border-gray-200"
                  >
                    <option value={'3/8"'}>{'3/8"'}</option>
                    <option value={'7/16"'}>{'7/16"'}</option>
                    <option value={'1/2"'}>{'1/2"'}</option>
                    <option value={'9/16"'}>{'9/16"'}</option>
                    <option value={'5/8"'}>{'5/8"'}</option>
                    <option value={'3/4"'}>{'3/4"'}</option>
                    <option value={'1"'}>{'1"'}</option>
                  </select>
                  <div className="p-3 bg-[hsl(var(--input-bg))] rounded-xl border-2 border-gray-200 text-[hsl(var(--text-muted))]">
                    in.
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[hsl(var(--text-secondary))] mb-2 uppercase">
                  Ice Hardness
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSharpHardness('Soft')}
                    className={`flex-1 p-3 rounded-xl border-2 font-semibold transition-all ${
                      sharpHardness === 'Soft'
                        ? 'border-[hsl(var(--primary-blue))] bg-[hsl(var(--ice-soft-bg))] text-[hsl(var(--primary-blue))]'
                        : 'border-gray-200 bg-white text-[hsl(var(--text-secondary))]'
                    }`}
                  >
                    Soft
                  </button>
                  <button
                    onClick={() => setSharpHardness('Hard')}
                    className={`flex-1 p-3 rounded-xl border-2 font-semibold transition-all ${
                      sharpHardness === 'Hard'
                        ? 'border-[hsl(var(--primary-blue))] bg-[hsl(var(--ice-hard-bg))] text-[hsl(var(--primary-blue))]'
                        : 'border-gray-200 bg-white text-[hsl(var(--text-secondary))]'
                    }`}
                  >
                    Hard
                  </button>
                </div>
              </div>

              <button
                onClick={handleConfirmSharpening}
                className="w-full p-4 bg-[hsl(var(--primary-blue))] hover:bg-[hsl(var(--primary-blue-hover))] text-white rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
              >
                <CheckCircle2 className="w-5 h-5" />
                Confirm Sharpening
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
