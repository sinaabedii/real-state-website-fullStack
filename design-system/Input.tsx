"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { motion, type HTMLMotionProps } from 'framer-motion'

type MotionInputBaseProps = Omit<HTMLMotionProps<'input'>, 'size'>

export interface InputProps extends MotionInputBaseProps {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'filled' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    label,
    error,
    leftIcon,
    rightIcon,
    variant = 'default',
    size = 'md',
    fullWidth = false,
    id,
    ...props
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    const baseClasses = cn(
      'w-full rounded-xl border transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'placeholder:text-gray-400 dark:placeholder:text-gray-500',
      leftIcon && 'pr-10',
      rightIcon && 'pl-10',
      fullWidth && 'w-full'
    )

    const variantClasses = {
      default: cn(
        'border-gray-300 dark:border-dark-300',
        'bg-white dark:bg-dark-100',
        'text-gray-900 dark:text-gray-100',
        'focus:border-primary-500 focus:ring-primary-500',
        error && 'border-red-500 focus:border-red-500 focus:ring-red-500'
      ),
      filled: cn(
        'border-transparent',
        'bg-gray-100 dark:bg-dark-200',
        'text-gray-900 dark:text-gray-100',
        'focus:bg-white dark:focus:bg-dark-100',
        'focus:border-primary-500 focus:ring-primary-500',
        error && 'bg-red-50 dark:bg-red-900/20 focus:border-red-500 focus:ring-red-500'
      ),
      outline: cn(
        'border-2 border-primary-300 dark:border-primary-700',
        'bg-transparent',
        'text-gray-900 dark:text-gray-100',
        'focus:border-primary-500 focus:ring-primary-500',
        error && 'border-red-500 focus:border-red-500 focus:ring-red-500'
      ),
    }

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    }

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {leftIcon}
            </div>
          )}
          
          <motion.input
            ref={ref}
            id={inputId}
            className={cn(
              baseClasses,
              variantClasses[variant],
              sizeClasses[size],
              className
            )}
            whileFocus={{ scale: 1.01 }}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </motion.p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
