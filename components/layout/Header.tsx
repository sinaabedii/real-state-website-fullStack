'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/design-system'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'
import { 
  Home, 
  Search, 
  Heart, 
  User, 
  Menu, 
  X, 
  Moon, 
  Sun,
  Bell,
  // MessageCircle
} from 'lucide-react'

interface HeaderProps {
  className?: string
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const router = useRouter()
  const { isAuthenticated, currentUser, setAuthenticated, setCurrentUser } = useAppStore()

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const navItems = [
    { href: '/', label: 'خانه', icon: Home },
    { href: '/properties', label: 'املاک', icon: Search },
    { href: '/favorites', label: 'علاقه‌مندی‌ها', icon: Heart },
    // Hide dashboard for guests
    ...(isAuthenticated ? [{ href: '/dashboard', label: 'داشبورد', icon: User }] : []),
  ]

  const handleLogout = () => {
    // Clear client auth persistence
    try {
      localStorage.removeItem('auth-user')
    } catch {}
    // Expire auth cookies
    if (typeof document !== 'undefined') {
      document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      document.cookie = 'auth-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
    // Reset state
    setAuthenticated(false)
    setCurrentUser(null)
    setIsUserMenuOpen(false)
    router.push('/')
  }

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full border-b border-gray-200/20 dark:border-gray-800/20',
      'glass-effect backdrop-blur-xl',
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 space-x-reverse">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 space-x-reverse"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">املاک پلاس</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 space-x-reverse px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3 space-x-reverse">
            {/* Notifications (only when authenticated) */}
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                className="relative"
                onClick={() => router.push('/dashboard')}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            )}

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="hidden sm:flex"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Auth Area */}
            {!isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-2 space-x-reverse">
                <Button variant="ghost" size="sm" onClick={() => router.push('/auth/login')}>
                  ورود
                </Button>
                <Button size="sm" glow onClick={() => router.push('/auth/register')}>
                  ثبت نام
                </Button>
              </div>
            ) : (
              <div className="relative hidden sm:flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setIsUserMenuOpen((v) => !v)}
                >
                  {/* Avatar */}
                  {currentUser?.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm">
                      {(currentUser?.name || 'U').slice(0, 1)}
                    </div>
                  )}
                  <span className="max-w-[120px] truncate">{currentUser?.name || 'کاربر'}</span>
                </Button>
                {isUserMenuOpen && (
                  <div className="absolute top-10 left-0 w-44 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2">
                    <button className="w-full text-right px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => { setIsUserMenuOpen(false); router.push('/dashboard') }}>
                      داشبورد
                    </button>
                    <button className="w-full text-right px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => { setIsUserMenuOpen(false); router.push('/favorites') }}>
                      علاقه‌مندی‌ها
                    </button>
                    <div className="my-1 h-px bg-gray-200 dark:bg-gray-700" />
                    <button className="w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-800" onClick={handleLogout}>
                      خروج
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-gray-200/20 dark:border-gray-800/20"
          >
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
              {!isAuthenticated ? (
                <div className="flex items-center justify-between pt-4 border-t border-gray-200/20 dark:border-gray-800/20">
                  <Button variant="ghost" size="sm" fullWidth onClick={() => { setIsMenuOpen(false); router.push('/auth/login') }}>
                    ورود
                  </Button>
                  <Button size="sm" fullWidth className="mr-2" onClick={() => { setIsMenuOpen(false); router.push('/auth/register') }}>
                    ثبت نام
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-4 border-t border-gray-200/20 dark:border-gray-800/20">
                  <Button variant="ghost" size="sm" fullWidth onClick={() => { setIsMenuOpen(false); router.push('/dashboard') }}>
                    داشبورد
                  </Button>
                  <Button variant="ghost" size="sm" fullWidth onClick={() => { setIsMenuOpen(false); router.push('/favorites') }}>
                    علاقه‌مندی‌ها
                  </Button>
                  <Button variant="outline" size="sm" fullWidth onClick={() => { setIsMenuOpen(false); handleLogout() }}>
                    خروج
                  </Button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Header

