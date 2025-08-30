"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { motion, type HTMLMotionProps } from 'framer-motion'

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  glow?: boolean
  children?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    glow = false,
    children,
    disabled,
    ...props
  }, ref) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'relative overflow-hidden',
      fullWidth && 'w-full'
    )

    const variantClasses = {
      primary: cn(
        'bg-gradient-to-r from-primary-500 to-primary-600 text-white',
        'hover:from-primary-600 hover:to-primary-700',
        'focus:ring-primary-500',
        'shadow-lg hover:shadow-xl',
        glow && 'btn-glow'
      ),
      secondary: cn(
        'bg-gradient-to-r from-accent-500 to-accent-600 text-white',
        'hover:from-accent-600 hover:to-accent-700',
        'focus:ring-accent-500',
        'shadow-lg hover:shadow-xl'
      ),
      outline: cn(
        'border-2 border-primary-500 text-primary-500 bg-transparent',
        'hover:bg-primary-500 hover:text-white',
        'focus:ring-primary-500',
        'dark:border-primary-400 dark:text-primary-400'
      ),
      ghost: cn(
        'text-gray-700 bg-transparent hover:bg-gray-100',
        'focus:ring-gray-500',
        'dark:text-gray-300 dark:hover:bg-gray-800'
      ),
      danger: cn(
        'bg-gradient-to-r from-red-500 to-red-600 text-white',
        'hover:from-red-600 hover:to-red-700',
        'focus:ring-red-500',
        'shadow-lg hover:shadow-xl'
      ),
    }

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={disabled || isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </div>
        )}
        
        <div className={cn('flex items-center gap-2', isLoading && 'opacity-0')}>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </div>
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button
