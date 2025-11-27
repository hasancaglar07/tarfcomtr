'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type AdminTheme = 'light' | 'dark'

type AdminThemeContextValue = {
  theme: AdminTheme
  setTheme: (theme: AdminTheme) => void
}

const AdminThemeContext = createContext<AdminThemeContextValue | null>(null)

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<AdminTheme>('dark')

  useEffect(() => {
    const stored = window.localStorage.getItem('admin-theme')
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('admin-light', 'admin-dark')
    root.classList.add(theme === 'light' ? 'admin-light' : 'admin-dark')
    window.localStorage.setItem('admin-theme', theme)
    return () => {
      root.classList.remove('admin-light', 'admin-dark')
    }
  }, [theme])

  return <AdminThemeContext.Provider value={{ theme, setTheme }}>{children}</AdminThemeContext.Provider>
}

export function useAdminTheme() {
  const ctx = useContext(AdminThemeContext)
  if (!ctx) {
    throw new Error('useAdminTheme must be used within an AdminThemeProvider')
  }
  return ctx
}
