"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { motion, type HTMLMotionProps } from 'framer-motion'

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'glass' | 'elevated' | 'bordered'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  glow?: boolean
  children?: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant = 'default',
    padding = 'md',
    hover = false,
    glow = false,
    children,
    ...props
  }, ref) => {
    const baseClasses = cn(
      'rounded-2xl transition-all duration-300',
      hover && 'card-hover cursor-pointer'
    )

    const variantClasses = {
      default: cn(
        'bg-white dark:bg-dark-100 border border-gray-200 dark:border-dark-200',
        'shadow-sm hover:shadow-md'
      ),
      glass: cn(
        'glass-effect backdrop-blur-xl',
        'border border-white/20 dark:border-white/10'
      ),
      elevated: cn(
        'bg-white dark:bg-dark-100',
        'shadow-xl hover:shadow-2xl',
        'border-0'
      ),
      bordered: cn(
        'bg-white dark:bg-dark-100',
        'border-2 border-primary-200 dark:border-primary-800',
        'shadow-sm'
      ),
    }

    const paddingClasses = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    }

    const glowClasses = glow ? 'ring-2 ring-primary-500/20 ring-offset-2 ring-offset-background' : ''

    return (
      <motion.div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          paddingClasses[padding],
          glowClasses,
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export default Card
