'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Card, Button } from '@/design-system'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card padding="xl" className="text-center max-w-md w-full">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            
            <h2 className="text-xl font-bold mb-4">خطایی رخ داده است</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              متأسفانه مشکلی در نمایش این صفحه پیش آمده است. لطفاً دوباره تلاش کنید.
            </p>
            
            <div className="space-y-3">
              <Button
                fullWidth
                onClick={() => this.setState({ hasError: false, error: undefined })}
                leftIcon={<RefreshCw className="h-4 w-4" />}
              >
                تلاش مجدد
              </Button>
              
              <Button
                variant="outline"
                fullWidth
                onClick={() => window.location.href = '/'}
              >
                بازگشت به صفحه اصلی
              </Button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500">
                  جزئیات خطا (فقط در حالت توسعه)
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
