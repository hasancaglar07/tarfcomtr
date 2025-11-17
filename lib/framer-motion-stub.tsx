import { createElement, forwardRef, type PropsWithChildren, type ReactNode } from 'react'

type MotionProps = Record<string, unknown> & PropsWithChildren

const animationKeys = new Set([
  'initial',
  'animate',
  'exit',
  'variants',
  'whileHover',
  'whileTap',
  'whileInView',
  'transition',
  'layout',
  'layoutId',
  'viewport',
  'drag',
  'dragConstraints',
  'dragElastic',
  'dragMomentum',
])

const createMotionComponent = (tag: string) => {
  const Component = forwardRef<HTMLElement, MotionProps>(({ children, ...rest }, ref) => {
    const safeProps: Record<string, unknown> = {}

    Object.entries(rest).forEach(([key, value]) => {
      if (!animationKeys.has(key)) {
        safeProps[key] = value
      }
    })

    return createElement(tag, { ref, ...safeProps }, children as ReactNode)
  })

  Component.displayName = `motion.${tag}`
  return Component
}

export const motion = new Proxy(
  {},
  {
    get: (_target, prop: string) => createMotionComponent(prop),
  }
) as Record<string, ReturnType<typeof createMotionComponent>>

export const AnimatePresence = ({ children }: PropsWithChildren) => <>{children}</>
