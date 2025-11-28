'use client'

import { type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { useAdminTheme } from '@/components/admin/admin-theme-provider'
import { cn } from '@/lib/utils'

type AdminSkeletonProps = {
  subtle?: boolean
}

const quickCardPlaceholders = Array.from({ length: 6 })
const rowPlaceholders = Array.from({ length: 4 })

export function AdminSkeleton({ subtle = false }: AdminSkeletonProps) {
  const { theme } = useAdminTheme()

  const palette =
    theme === 'light'
      ? {
          page: 'bg-gradient-to-br from-orange-50 via-white to-sky-50 text-slate-900',
          card: 'bg-white/80 border border-orange-100 shadow-lg',
          muted: 'bg-orange-100/80 border border-orange-200/80',
          pill: 'bg-orange-50 border border-orange-100',
          shine: 'rgba(249,115,22,0.06)',
          accentGlow: null,
        }
      : {
          page: 'bg-slate-950 text-slate-100',
          card: 'bg-slate-900/70 border border-slate-800 shadow-2xl',
          muted: 'bg-slate-800/70 border border-slate-700/70',
          pill: 'bg-slate-800/70 border border-slate-700/70',
          shine: 'rgba(255,255,255,0.08)',
          accentGlow: null,
        }

  const shimmerStyle: CSSProperties = { ['--skeleton-shine' as string]: palette.shine }

const SkeletonLine = ({ className }: { className?: string }) => (
  <div
    className={cn('admin-skeleton h-3 rounded-full', palette.muted, 'transition-opacity duration-300', className)}
    style={shimmerStyle}
  />
)

const SkeletonBadge = ({ className }: { className?: string }) => (
  <div
    className={cn('admin-skeleton rounded-full', palette.pill, 'transition-opacity duration-300', className)}
    style={shimmerStyle}
  />
)

  return (
    <div className={cn('relative min-h-screen overflow-hidden px-6 py-8 transition-colors duration-300', palette.page)}>
      {!subtle && palette.accentGlow && (
        <motion.div
          initial={{ opacity: 0.2, scale: 0.98 }}
          animate={{ opacity: 0.45, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-0"
        >
          <div className={cn('absolute inset-0 blur-3xl', `bg-gradient-to-br ${palette.accentGlow}`)} />
        </motion.div>
      )}

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className={cn('overflow-hidden rounded-3xl border p-6 sm:p-8', palette.card)}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3">
              <SkeletonLine className="h-3 w-32" />
              <SkeletonLine className="h-5 w-56" />
              <div className="space-y-2">
                <SkeletonLine className="h-3 w-80 max-w-full" />
                <SkeletonLine className="h-3 w-64 max-w-full" />
              </div>
              <div className="flex gap-2">
                <SkeletonBadge className="h-9 w-28 px-4" />
                <SkeletonBadge className="h-9 w-24 px-4" />
              </div>
            </div>
            <div className="flex gap-3">
              <SkeletonBadge className="h-12 w-12 rounded-2xl" />
              <div className="space-y-2">
                <SkeletonLine className="h-3 w-24" />
                <SkeletonLine className="h-3 w-16" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className={cn('rounded-3xl border p-5', palette.card)}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-2">
              <SkeletonLine className="h-3 w-28" />
              <SkeletonLine className="h-4 w-40" />
            </div>
            <SkeletonBadge className="h-9 w-28 rounded-xl" />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quickCardPlaceholders.map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + idx * 0.03, duration: 0.35 }}
                className={cn('rounded-2xl border p-4', palette.card)}
              >
                <div className="flex items-center gap-3">
                  <SkeletonBadge className="h-11 w-11 rounded-2xl" />
                  <div className="w-full space-y-2">
                    <SkeletonLine className="h-3 w-24" />
                    <SkeletonLine className="h-3 w-16" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className={cn('rounded-3xl border p-5', palette.card)}
          >
            <SkeletonLine className="h-3 w-32" />
            <div className="mt-4 space-y-3">
              {rowPlaceholders.map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-transparent"
                >
                  <div className="flex w-full items-center gap-3">
                    <SkeletonBadge className="h-10 w-10 rounded-2xl" />
                    <div className="w-full space-y-2">
                      <SkeletonLine className="h-3 w-40 max-w-full" />
                      <SkeletonLine className="h-3 w-24" />
                    </div>
                  </div>
                  <SkeletonBadge className="hidden h-9 w-16 rounded-xl sm:block" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className={cn('rounded-3xl border p-5', palette.card)}
          >
            <div className="flex items-center justify-between">
              <SkeletonLine className="h-3 w-28" />
              <SkeletonBadge className="h-9 w-20 rounded-xl" />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {rowPlaceholders.slice(0, 4).map((_, idx) => (
                <div key={idx} className={cn('rounded-2xl border p-4', palette.card)}>
                  <SkeletonLine className="h-3 w-24" />
                  <div className="mt-3 space-y-2">
                    <SkeletonLine className="h-3 w-full" />
                    <SkeletonLine className="h-3 w-4/5" />
                  </div>
                  <SkeletonBadge className="mt-3 h-8 w-24 rounded-xl" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
