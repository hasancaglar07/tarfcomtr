'use client'

import { useEffect, useState } from 'react'

const noop = () => {}

function attachListener(query: MediaQueryList, handler: (event: MediaQueryListEvent) => void) {
  if (query.addEventListener) {
    query.addEventListener('change', handler)
    return () => query.removeEventListener('change', handler)
  }

  // Fallback for Safari < 14
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - older browsers use addListener
  query.addListener(handler)
  return () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    query.removeListener(handler)
  }
}

/**
 * Returns true when we should avoid or simplify animations.
 * Triggers on browsers that request reduced motion and on narrow viewports
 * where complex effects often drop frames.
 */
export function useShouldReduceMotion(maxViewportWidth = 768) {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
      return noop
    }

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const viewportQuery =
      typeof maxViewportWidth === 'number' && maxViewportWidth > 0
        ? window.matchMedia(`(max-width: ${maxViewportWidth}px)`)
        : null

    const updatePreference = () => {
      const viewportMatches = viewportQuery?.matches ?? false
      setShouldReduceMotion(reducedMotionQuery.matches || viewportMatches)
    }

    updatePreference()

    const detachReducedMotion = attachListener(reducedMotionQuery, updatePreference)
    const detachViewport = viewportQuery ? attachListener(viewportQuery, updatePreference) : noop

    return () => {
      detachReducedMotion()
      detachViewport()
    }
  }, [maxViewportWidth])

  return shouldReduceMotion
}
