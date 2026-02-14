'use client'

import { Home, History, MapPin, Wrench } from 'lucide-react'
import { Snowflake } from './snowflake'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { icon: Home, href: '/', label: 'Home' },
    { icon: History, href: '/sessions', label: 'Sessions' },
    { icon: MapPin, href: '/rinks', label: 'Rinks' },
    { icon: Wrench, href: '/maintenance', label: 'Maintenance' },
  ]

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md">
      <div className="bg-white rounded-full shadow-lg border-2 border-gray-200 px-6 py-3">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`p-2 transition-colors ${
                  isActive
                    ? 'text-[hsl(var(--text-primary))]'
                    : 'text-[hsl(var(--text-muted))]'
                }`}
                aria-label={item.label}
              >
                <Icon className="w-6 h-6" />
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
