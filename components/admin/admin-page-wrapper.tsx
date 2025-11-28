'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { type ReactNode, Suspense } from 'react'
import { AdminSkeleton } from '@/components/admin/admin-skeleton'

type AdminPageWrapperProps = {
  children: ReactNode
}

export function AdminPageWrapper({ children }: AdminPageWrapperProps) {
  const pathname = usePathname()

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <Suspense fallback={<AdminSkeleton subtle />}>{children}</Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
