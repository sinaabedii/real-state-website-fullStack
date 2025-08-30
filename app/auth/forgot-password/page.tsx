'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button, Card, Input } from '@/design-system'
import { Mail, Home, ArrowRight, CheckCircle } from 'lucide-react'

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validation
    if (!email) {
      setError('ایمیل الزامی است')
      setIsLoading(false)
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('فرمت ایمیل صحیح نیست')
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsEmailSent(true)
    }, 2000)
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card padding="xl" variant="elevated">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                
                <h1 className="text-2xl font-bold mb-4">ایمیل ارسال شد</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  لینک بازیابی رمز عبور به ایمیل <strong>{email}</strong> ارسال شد.
                  لطفاً صندوق ورودی خود را بررسی کنید.
                </p>
                
                <div className="space-y-3">
                  <Button fullWidth size="lg" onClick={() => setIsEmailSent(false)}>
                    ارسال مجدد ایمیل
                  </Button>
                  <Button fullWidth variant="outline" size="lg">
                    <Link href="/auth/login" className="flex items-center justify-center w-full">
                      بازگشت به ورود
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    )
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
          <h1 className="text-3xl font-bold mb-2">فراموشی رمز عبور</h1>
          <p className="text-gray-600 dark:text-gray-400">
            ایمیل خود را وارد کنید تا لینک بازیابی برایتان ارسال شود
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card padding="xl" variant="elevated">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="ایمیل"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
                leftIcon={<Mail className="h-5 w-5" />}
                error={error}
                fullWidth
              />

              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={isLoading}
                glow
              >
                ارسال لینک بازیابی
              </Button>
            </form>
          </Card>
        </motion.div>

        {/* Back Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-6 space-y-4"
        >
          <p className="text-gray-600 dark:text-gray-400">
            رمز عبور خود را به یاد آوردید؟{' '}
            <Link
              href="/auth/login"
              className="text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium"
            >
              وارد شوید
            </Link>
          </p>
          
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

export default ForgotPasswordPage
