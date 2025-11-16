import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

const variantClasses: Record<string, string> = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  slideInLeft: 'animate-slide-in-left',
  slideInRight: 'animate-slide-in-right',
  scaleUp: 'animate-scale-in',
}

interface AnimateProps {
  children: ReactNode
  variant?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scaleUp'
  delay?: number
  className?: string
  viewport?: { once?: boolean; margin?: string; amount?: number }
}

export function Animate({
  children,
  variant = 'fadeIn',
  delay = 0,
  className = '',
}: AnimateProps) {
  const animationClass = variantClasses[variant] ?? variantClasses.fadeIn
  const style: CSSProperties | undefined = delay ? { animationDelay: `${delay}s` } : undefined

  return (
    <div className={cn('animation-wrapper', animationClass, className)} style={style}>
      {children}
    </div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  viewport?: { once?: boolean; margin?: string; amount?: number }
}

export function StaggerContainer({
  children,
  className = '',
}: StaggerContainerProps) {
  return <div className={className}>{children}</div>
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return <div className={cn('animation-wrapper animate-fade-in', className)}>{children}</div>
}

interface AnimatedCardProps {
  children: ReactNode
  className?: string
}

export function AnimatedCard({ children, className = '' }: AnimatedCardProps) {
  return (
    <div
      className={cn(
        'transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01]',
        className
      )}
    >
      {children}
    </div>
  )
}
