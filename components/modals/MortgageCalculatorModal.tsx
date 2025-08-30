'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calculator, TrendingUp, DollarSign, Calendar, Percent, Info } from 'lucide-react'
import { Button, Card, Input } from '@/design-system'
import { formatPrice } from '@/lib/utils'

interface MortgageCalculatorModalProps {
  isOpen: boolean
  onClose: () => void
  propertyPrice: number
}

interface CalculationResult {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  downPaymentAmount: number
  loanAmount: number
}

const MortgageCalculatorModal: React.FC<MortgageCalculatorModalProps> = ({
  isOpen,
  onClose,
  propertyPrice
}) => {
  const [downPayment, setDownPayment] = useState(20) // percentage
  const [interestRate, setInterestRate] = useState(18) // annual percentage
  const [loanTerm, setLoanTerm] = useState(20) // years
  const [result, setResult] = useState<CalculationResult | null>(null)

  const calculateMortgage = () => {
    const downPaymentAmount = (propertyPrice * downPayment) / 100
    const loanAmount = propertyPrice - downPaymentAmount
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12

    if (monthlyRate === 0) {
      const monthlyPayment = loanAmount / numberOfPayments
      setResult({
        monthlyPayment,
        totalPayment: monthlyPayment * numberOfPayments + downPaymentAmount,
        totalInterest: 0,
        downPaymentAmount,
        loanAmount
      })
      return
    }

    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    
    const totalPayment = monthlyPayment * numberOfPayments + downPaymentAmount
    const totalInterest = totalPayment - propertyPrice

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      downPaymentAmount,
      loanAmount
    })
  }

  useEffect(() => {
    calculateMortgage()
  }, [downPayment, interestRate, loanTerm, propertyPrice])

  const getPaymentSchedule = () => {
    if (!result) return []
    
    const schedule = []
    let remainingBalance = result.loanAmount
    const monthlyRate = interestRate / 100 / 12
    
    for (let month = 1; month <= Math.min(12, loanTerm * 12); month++) {
      const interestPayment = remainingBalance * monthlyRate
      const principalPayment = result.monthlyPayment - interestPayment
      remainingBalance -= principalPayment
      
      schedule.push({
        month,
        payment: result.monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, remainingBalance)
      })
    }
    
    return schedule
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-2xl">
                <Calculator className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">محاسبه وام و اقساط</h2>
                <p className="text-gray-600 dark:text-gray-400">محاسبه دقیق اقساط ماهانه و هزینه‌های وام</p>
              </div>
            </div>
            <Button variant="ghost" size="lg" onClick={onClose} className="hover:bg-gray-100 dark:hover:bg-gray-800">
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
                <Card padding="lg" className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary-500" />
                    اطلاعات ملک و وام
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">قیمت ملک</label>
                      <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-200 dark:border-primary-800">
                        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          {formatPrice(propertyPrice)}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">پیش پرداخت ({downPayment}%)</label>
                      <input
                        type="range"
                        min="10"
                        max="50"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>10%</span>
                        <span className="font-medium text-primary-600 dark:text-primary-400">
                          {formatPrice((propertyPrice * downPayment) / 100)}
                        </span>
                        <span>50%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">نرخ سود سالانه (%)</label>
                      <Input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        min="1"
                        max="30"
                        step="0.1"
                        className="text-center text-lg font-semibold"
                      />
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                        <Info className="h-4 w-4" />
                        <span>نرخ فعلی بانک‌ها: 18-22%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">مدت وام (سال)</label>
                      <div className="grid grid-cols-4 gap-2">
                        {[10, 15, 20, 25].map((years) => (
                          <Button
                            key={years}
                            variant={loanTerm === years ? 'primary' : 'outline'}
                            size="md"
                            onClick={() => setLoanTerm(years)}
                            className="font-medium"
                          >
                            {years}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Results Section */}
              <div className="space-y-6">
                {result && (
                  <>
                    <Card padding="lg" className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        نتایج محاسبه
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-green-200 dark:border-green-700">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">قسط ماهانه</div>
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {formatPrice(result.monthlyPayment)}
                          </div>
                        </div>
                        
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-200 dark:border-blue-700">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">مبلغ وام</div>
                          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            {formatPrice(result.loanAmount)}
                          </div>
                        </div>
                        
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-orange-200 dark:border-orange-700">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">کل سود پرداختی</div>
                          <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                            {formatPrice(result.totalInterest)}
                          </div>
                        </div>
                        
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-purple-200 dark:border-purple-700">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">کل پرداختی</div>
                          <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                            {formatPrice(result.totalPayment)}
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Payment Schedule Preview */}
                    <Card padding="lg">
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary-500" />
                        جدول اقساط (12 ماه اول)
                      </h3>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                              <th className="text-right py-2">ماه</th>
                              <th className="text-right py-2">قسط</th>
                              <th className="text-right py-2">اصل</th>
                              <th className="text-right py-2">سود</th>
                              <th className="text-right py-2">باقیمانده</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getPaymentSchedule().map((payment) => (
                              <tr key={payment.month} className="border-b border-gray-100 dark:border-gray-800">
                                <td className="py-2 font-medium">{payment.month}</td>
                                <td className="py-2">{formatPrice(payment.payment)}</td>
                                <td className="py-2 text-green-600 dark:text-green-400">{formatPrice(payment.principal)}</td>
                                <td className="py-2 text-red-600 dark:text-red-400">{formatPrice(payment.interest)}</td>
                                <td className="py-2">{formatPrice(payment.balance)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex gap-4 justify-end">
                <Button variant="outline" size="lg" onClick={onClose}>
                  بستن
                </Button>
                <Button size="lg" glow>
                  درخواست وام
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default MortgageCalculatorModal
