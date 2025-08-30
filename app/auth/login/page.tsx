'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button, Card, Input } from '@/design-system'
import { Eye, EyeOff, Mail, Lock, Home, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'

const LoginPage: React.FC = () => {
  // Mock users by role
  const mockUsers = [
    { email: 'user@example.com', password: 'user123', role: 'user' as const, name: 'کاربر عادی' },
    { email: 'agent@example.com', password: 'agent123', role: 'agent' as const, name: 'مشاور املاک' },
    { email: 'admin@example.com', password: 'admin123', role: 'admin' as const, name: 'مدیر سیستم' },
  ]

  const router = useRouter()
  const { setAuthenticated, setCurrentUser } = useAppStore()

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [authError, setAuthError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    // Validation
    const newErrors: Record<string, string> = {}
    if (!formData.email) {
      newErrors.email = 'ایمیل الزامی است'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'فرمت ایمیل صحیح نیست'
    }
    if (!formData.password) {
      newErrors.password = 'رمز عبور الزامی است'
    } else if (formData.password.length < 6) {
      newErrors.password = 'رمز عبور باید حداقل 6 کاراکتر باشد'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    // Mock auth check
    const found = mockUsers.find(u => u.email === formData.email && u.password === formData.password)
    if (!found) {
      setIsLoading(false)
      setAuthError('ایمیل یا رمز عبور نادرست است')
      return
    }

    // Set cookies for middleware and role (client-side for mock)
    const maxAge = formData.rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 24 // 7d or 1d
    document.cookie = `auth-token=${encodeURIComponent('mock-token')}; path=/; max-age=${maxAge}`
    document.cookie = `auth-role=${encodeURIComponent(found.role)}; path=/; max-age=${maxAge}`

    // Set global auth state and persist mock user
    const mockUser = {
      id: 'mock-user',
      name: found.name,
      email: found.email,
      phone: '',
      avatar: undefined,
      role: found.role,
      isVerified: true,
      createdAt: new Date().toISOString(),
    }
    try {
      localStorage.setItem('auth-user', JSON.stringify(mockUser))
    } catch {}
    setAuthenticated(true)
    setCurrentUser(mockUser as any)

    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard')
    }, 500)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const prefillAccount = (email: string, password: string) => {
    setAuthError('')
    setErrors({})
    setFormData(prev => ({ ...prev, email, password }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-flex items-center justify-center mb-6">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Home className="h-7 w-7 text-white" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold mb-2">ورود به حساب کاربری</h1>
          <p className="text-gray-600 dark:text-gray-400">
            به پلتفرم املاک پلاس خوش آمدید
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card padding="xl" variant="elevated">
            <form onSubmit={handleSubmit} className="space-y-6">
              {authError && (
                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
                  {authError}
                </div>
              )}
              {/* Email */}
              <Input
                label="ایمیل"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                leftIcon={<Mail className="h-5 w-5" />}
                error={errors.email}
                fullWidth
              />

              {/* Password */}
              <Input
                label="رمز عبور"
                type={showPassword ? 'text' : 'password'}
                placeholder="رمز عبور خود را وارد کنید"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                leftIcon={<Lock className="h-5 w-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                }
                error={errors.password}
                fullWidth
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    مرا به خاطر بسپار
                  </span>
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400"
                >
                  فراموشی رمز عبور؟
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={isLoading}
                glow
              >
                ورود
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">یا</span>
                </div>
              </div>

              {/* Mock accounts quick fill */}
              <div className="rounded-xl p-4 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-sm">
                <div className="font-semibold mb-3">ورود آزمایشی (انتخاب سریع حساب):</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => prefillAccount('user@example.com', 'user123')}
                  >
                    کاربر عادی
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => prefillAccount('agent@example.com', 'agent123')}
                  >
                    مشاور املاک
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => prefillAccount('admin@example.com', 'admin123')}
                  >
                    مدیر سیستم
                  </Button>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" fullWidth>
                  <svg className="h-5 w-5 ml-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  گوگل
                </Button>
                <Button variant="outline" fullWidth>
                  <svg className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  فیسبوک
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>

        {/* Sign Up Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-6"
        >
          <p className="text-gray-600 dark:text-gray-400">
            حساب کاربری ندارید؟{' '}
            <Link
              href="/auth/register"
              className="text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium"
            >
              ثبت نام کنید
            </Link>
          </p>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-4"
        >
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ArrowRight className="h-4 w-4 ml-1" />
            بازگشت به صفحه اصلی
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage
