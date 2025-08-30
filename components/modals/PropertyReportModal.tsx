'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, Download, Share2, TrendingUp, MapPin, Calendar, Eye, Star, Building, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import { Button, Card, Badge } from '@/design-system'
import { formatPrice, formatArea, formatDate, getPropertyTypeLabel, getListingTypeLabel } from '@/lib/utils'
import { Property } from '@/types'
import Image from 'next/image'

interface PropertyReportModalProps {
  isOpen: boolean
  onClose: () => void
  property: Property
}

const PropertyReportModal: React.FC<PropertyReportModalProps> = ({
  isOpen,
  onClose,
  property
}) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'analysis' | 'market' | 'investment'>('overview')

  const marketAnalysis = {
    pricePerSqm: Math.round(property.price / property.area),
    marketTrend: 'صعودی',
    averagePrice: property.price * 0.95,
    priceGrowth: '+12%',
    demandLevel: 'بالا',
    liquidityScore: 85,
    investmentGrade: 'A'
  }

  const investmentMetrics = {
    roi: '8.5%',
    paybackPeriod: '12 سال',
    rentalYield: '6.2%',
    appreciationRate: '12%',
    riskLevel: 'متوسط',
    marketScore: 92
  }

  const sections = [
    { id: 'overview', label: 'خلاصه اجرایی', icon: FileText },
    { id: 'analysis', label: 'تحلیل ملک', icon: TrendingUp },
    { id: 'market', label: 'تحلیل بازار', icon: Building },
    { id: 'investment', label: 'تحلیل سرمایه‌گذاری', icon: Star }
  ]

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
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl">
                <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">گزارش کامل ملک</h2>
                <p className="text-gray-600 dark:text-gray-400">تحلیل جامع و ارزیابی تخصصی</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="lg">
                <Download className="h-5 w-5 ml-2" />
                دانلود PDF
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5 ml-2" />
                اشتراک
              </Button>
              <Button variant="ghost" size="lg" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <div className="flex h-[calc(90vh-80px)]">
            {/* Sidebar Navigation */}
            <div className="w-64 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4">
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id as any)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-right transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{section.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeSection === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card padding="lg">
                      <h3 className="text-xl font-bold mb-4">اطلاعات کلی</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">عنوان:</span>
                          <span className="font-medium">{property.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">نوع ملک:</span>
                          <Badge variant="secondary">{getPropertyTypeLabel(property.propertyType)}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">نوع آگهی:</span>
                          <Badge variant={property.listingType === 'sale' ? 'primary' : 'secondary'}>
                            {getListingTypeLabel(property.listingType)}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">قیمت:</span>
                          <span className="font-bold text-primary-600 dark:text-primary-400">
                            {formatPrice(property.price)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">متراژ:</span>
                          <span className="font-medium">{formatArea(property.area)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">موقعیت:</span>
                          <span className="font-medium">{property.location.district}، {property.location.city}</span>
                        </div>
                      </div>
                    </Card>

                    <Card padding="lg">
                      <h3 className="text-xl font-bold mb-4">امتیاز کلی</h3>
                      <div className="text-center">
                        <div className="text-6xl font-bold text-green-500 mb-2">A+</div>
                        <div className="text-lg text-gray-600 dark:text-gray-400 mb-4">عالی</div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>موقعیت عالی</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>قیمت مناسب</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>امکانات کامل</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            <span>سن ساختمان</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Card padding="lg">
                    <h3 className="text-xl font-bold mb-4">خلاصه تحلیل</h3>
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        این ملک در منطقه {property.location.district} واقع شده و با توجه به موقعیت مکانی عالی، 
                        دسترسی آسان به مراکز خرید و حمل‌ونقل عمومی، یکی از بهترین گزینه‌های سرمایه‌گذاری محسوب می‌شود.
                        قیمت ملک نسبت به متوسط منطقه مناسب بوده و پتانسیل رشد قیمت در آینده را دارد.
                      </p>
                    </div>
                  </Card>
                </div>
              )}

              {activeSection === 'analysis' && (
                <div className="space-y-6">
                  <Card padding="lg">
                    <h3 className="text-xl font-bold mb-6">تحلیل فنی ملک</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-bold text-lg">مشخصات فیزیکی</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span>متراژ کل:</span>
                            <span className="font-medium">{formatArea(property.area)}</span>
                          </div>
                          <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span>تعداد اتاق:</span>
                            <span className="font-medium">{property.bedrooms} اتاق</span>
                          </div>
                          <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span>سال ساخت:</span>
                            <span className="font-medium">{property.yearBuilt || 'نامشخص'}</span>
                          </div>
                          <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span>طبقه:</span>
                            <span className="font-medium">{property.floorNumber || 'نامشخص'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-bold text-lg">امکانات و ویژگی‌ها</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {property.amenities.slice(0, 6).map((amenity, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {activeSection === 'market' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card padding="lg" className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                      <h4 className="font-bold mb-2">قیمت هر متر</h4>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {formatPrice(marketAnalysis.pricePerSqm)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        متوسط منطقه: {formatPrice(marketAnalysis.pricePerSqm * 0.9)}
                      </div>
                    </Card>

                    <Card padding="lg" className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                      <h4 className="font-bold mb-2">روند بازار</h4>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {marketAnalysis.marketTrend}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        رشد: {marketAnalysis.priceGrowth}
                      </div>
                    </Card>

                    <Card padding="lg" className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                      <h4 className="font-bold mb-2">سطح تقاضا</h4>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {marketAnalysis.demandLevel}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        امتیاز نقدینگی: {marketAnalysis.liquidityScore}
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {activeSection === 'investment' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card padding="lg">
                      <h3 className="text-xl font-bold mb-4">شاخص‌های سرمایه‌گذاری</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                          <span>بازده سرمایه (ROI):</span>
                          <span className="font-bold text-green-600 dark:text-green-400">{investmentMetrics.roi}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                          <span>بازده اجاره:</span>
                          <span className="font-bold text-blue-600 dark:text-blue-400">{investmentMetrics.rentalYield}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                          <span>دوره بازگشت سرمایه:</span>
                          <span className="font-bold text-purple-600 dark:text-purple-400">{investmentMetrics.paybackPeriod}</span>
                        </div>
                      </div>
                    </Card>

                    <Card padding="lg">
                      <h3 className="text-xl font-bold mb-4">ارزیابی ریسک</h3>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-yellow-500 mb-2">{investmentMetrics.marketScore}/100</div>
                        <div className="text-lg text-gray-600 dark:text-gray-400 mb-4">امتیاز بازار</div>
                        <Badge variant="warning" size="lg">{investmentMetrics.riskLevel}</Badge>
                      </div>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PropertyReportModal
