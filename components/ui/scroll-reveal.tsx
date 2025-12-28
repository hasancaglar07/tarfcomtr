'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
    children: React.ReactNode
    width?: 'fit-content' | '100%'
    delay?: number
    duration?: number
    threshold?: number
}

export function ScrollReveal({
    children,
    width = '100%',
    delay = 0,
    duration = 0.8,
    threshold = 0.2,
    className,
    ...props
}: ScrollRevealProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: threshold }}
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={cn(width === '100%' ? 'w-full' : '', className)}
            {...props}
        >
            {children}
        </motion.div>
    )
}
