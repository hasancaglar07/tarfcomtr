'use client'

import { Moon, SunMedium } from 'lucide-react'
import { useAdminTheme } from '@/components/admin/admin-theme-provider'

export function AdminThemeSwitch() {
  const { theme, setTheme } = useAdminTheme()
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      className={`fixed right-4 top-4 z-40 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:shadow-xl ${
        isLight
          ? 'border border-orange-200/80 bg-white/80 text-orange-700 hover:border-orange-400'
          : 'border border-slate-700 bg-slate-900/80 text-slate-100 hover:border-orange-400'
      }`}
      aria-label={`Tema değiştir (${isLight ? 'koyu' : 'açık'})`}
    >
      {isLight ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {isLight ? 'Açık' : 'Koyu'}
    </button>
  )
}
