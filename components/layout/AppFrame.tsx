"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ChatBot from '@/components/ChatBot'
import ErrorBoundary from '@/components/ErrorBoundary'
import { useAppStore } from '@/lib/store'

const AppFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  const { setAuthenticated, setCurrentUser } = useAppStore()

  const isAuthRoute = pathname?.startsWith('/auth')
  const isHome = pathname === '/'

  // Hydrate auth from cookies/localStorage on mount
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const hasToken = document.cookie.split('; ').some((c) => c.startsWith('auth-token='))
    try {
      const raw = localStorage.getItem('auth-user')
      if (hasToken && raw) {
        const user = JSON.parse(raw)
        setAuthenticated(true)
        setCurrentUser(user)
      }
    } catch {}

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'auth-user' && e.newValue == null) {
        setAuthenticated(false)
        setCurrentUser(null)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [setAuthenticated, setCurrentUser])

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-hero-pattern opacity-30 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {!isAuthRoute && <Header />}
        <main className="flex-1">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
        {!isAuthRoute && <Footer />}
        {!isAuthRoute && isHome && <ChatBot />}
      </div>
    </div>
  )
}

export default AppFrame
