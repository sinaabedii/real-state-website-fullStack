'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, TrendingUp, TrendingDown, Minus, MapPin, Bed, Square, Star, Eye } from 'lucide-react'
import { Button, Card, Badge } from '@/design-system'
import { mockProperties } from '@/lib/mock-data'
import { formatPrice, formatArea, getListingTypeLabel } from '@/lib/utils'
import { Property } from '@/types'
import Image from 'next/image'

interface PropertyComparisonModalProps {
  isOpen: boolean
  onClose: () => void
  currentProperty: Property
}

interface ComparisonMetric {
  label: string
  getValue: (property: Property) => number | string
  format?: (value: number) => string
  isNumeric?: boolean
  unit?: string
}

const PropertyComparisonModal: React.FC<PropertyComparisonModalProps> = ({
  isOpen,
  onClose,
  currentProperty
}) => {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([])
  const [activeTab, setActiveTab] = useState<'similar' | 'selected'>('similar')

  // Find similar properties based on type, location, and price range
  const similarProperties = useMemo(() => {
    const priceRange = currentProperty.price * 0.3 // 30% price range
    const minPrice = currentProperty.price - priceRange
    const maxPrice = currentProperty.price + priceRange

    return mockProperties
      .filter(p => 
        p.id !== currentProperty.id &&
        p.propertyType === currentProperty.propertyType &&
        p.location.city === currentProperty.location.city &&
        p.price >= minPrice &&
        p.price <= maxPrice
      )
      .sort((a, b) => Math.abs(a.price - currentProperty.price) - Math.abs(b.price - currentProperty.price))
      .slice(0, 6)
  }, [currentProperty])

  const comparisonMetrics: ComparisonMetric[] = [
    {
      label: 'قیمت',
      getValue: (p) => p.price,
      format: formatPrice,
      isNumeric: true
    },
    {
      label: 'متراژ',
      getValue: (p) => p.area,
      format: formatArea,
      isNumeric: true
    },
    {
      label: 'قیمت هر متر',
      getValue: (p) => Math.round(p.price / p.area),
      format: formatPrice,
      isNumeric: true
    },
    {
      label: 'اتاق خواب',
      getValue: (p) => p.bedrooms,
      isNumeric: true
    },
    {
      label: 'سرویس',
      getValue: (p) => p.bathrooms,
      isNumeric: true
    },
    {
      label: 'پارکینگ',
      getValue: (p) => p.parkingSpaces,
      isNumeric: true
    },
    {
      label: 'سال ساخت',
      getValue: (p) => p.yearBuilt || 0,
      isNumeric: true
    },
    {
      label: 'بازدید',
      getValue: (p) => p.views,
      isNumeric: true
    }
  ]

  const togglePropertySelection = (property: Property) => {
    setSelectedProperties(prev => {
      const isSelected = prev.some(p => p.id === property.id)
      if (isSelected) {
        return prev.filter(p => p.id !== property.id)
      } else if (prev.length < 3) {
        return [...prev, property]
      }
      return prev
    })
  }

  const getComparisonIcon = (currentValue: number, compareValue: number) => {
    if (currentValue > compareValue) {
      return <TrendingUp className="h-4 w-4 text-green-500" />
    } else if (currentValue < compareValue) {
      return <TrendingDown className="h-4 w-4 text-red-500" />
    }
    return <Minus className="h-4 w-4 text-gray-400" />
  }

  const getComparisonColor = (currentValue: number, compareValue: number, isHigherBetter: boolean = true) => {
    if (currentValue === compareValue) return 'text-gray-600 dark:text-gray-400'
    
    const isCurrentHigher = currentValue > compareValue
    const isGood = isHigherBetter ? isCurrentHigher : !isCurrentHigher
    
    return isGood ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
  }

  const PropertyCard: React.FC<{ property: Property; isSelected?: boolean; onToggle?: () => void }> = ({ 
    property, 
    isSelected = false, 
    onToggle 
  }) => (
    <Card 
      padding="md" 
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isSelected ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20' : ''
      }`}
      onClick={onToggle}
    >
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={property.listingType === 'sale' ? 'primary' : 'secondary'} size="sm">
            {getListingTypeLabel(property.listingType)}
          </Badge>
        </div>
        {isSelected && (
          <div className="absolute inset-0 bg-primary-500/20 flex items-center justify-center">
            <div className="bg-primary-500 text-white p-2 rounded-full">
              <Star className="h-4 w-4 fill-current" />
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <h4 className="font-bold text-lg leading-tight line-clamp-2">{property.title}</h4>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="h-4 w-4" />
          <span>{property.location.district}</span>
        </div>
        
        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          {formatPrice(property.price)}
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4 text-gray-400" />
              <span>{formatArea(property.area)}</span>
            </div>
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4 text-gray-400" />
                <span>{property.bedrooms}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Eye className="h-4 w-4" />
            <span>{property.views}</span>
          </div>
        </div>
      </div>
    </Card>
  )

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
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">مقایسه با املاک مشابه</h2>
                <p className="text-gray-600 dark:text-gray-400">مقایسه جامع ملک با سایر گزینه‌های موجود</p>
              </div>
            </div>
            <Button variant="ghost" size="lg" onClick={onClose} className="hover:bg-gray-100 dark:hover:bg-gray-800">
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            {/* Tabs */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex gap-4">
                <Button
                  variant={activeTab === 'similar' ? 'primary' : 'outline'}
                  size="lg"
                  onClick={() => setActiveTab('similar')}
                >
                  املاک مشابه ({similarProperties.length})
                </Button>
                <Button
                  variant={activeTab === 'selected' ? 'primary' : 'outline'}
                  size="lg"
                  onClick={() => setActiveTab('selected')}
                >
                  املاک انتخابی ({selectedProperties.length})
                </Button>
              </div>
            </div>

            {activeTab === 'similar' && (
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    املاک مشابه بر اساس نوع، منطقه و محدوده قیمت انتخاب شده‌اند. برای مقایسه دقیق، حداکثر 3 ملک انتخاب کنید.
                  </p>
                  {selectedProperties.length > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-primary-600 dark:text-primary-400 font-medium">
                        {selectedProperties.length} ملک انتخاب شده
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedProperties([])}
                      >
                        پاک کردن همه
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {similarProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      isSelected={selectedProperties.some(p => p.id === property.id)}
                      onToggle={() => togglePropertySelection(property)}
                    />
                  ))}
                </div>

                {similarProperties.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <TrendingUp className="h-16 w-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">ملک مشابهی یافت نشد</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      در حال حاضر ملک مشابهی در این منطقه و محدوده قیمت وجود ندارد.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'selected' && (
              <div className="p-6">
                {selectedProperties.length > 0 ? (
                  <div className="space-y-8">
                    {/* Comparison Table */}
                    <Card padding="lg">
                      <h3 className="text-xl font-bold mb-6">جدول مقایسه تفصیلی</h3>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                              <th className="text-right py-4 px-2 font-bold">ویژگی</th>
                              <th className="text-center py-4 px-2 font-bold text-primary-600 dark:text-primary-400">
                                ملک فعلی
                              </th>
                              {selectedProperties.map((property) => (
                                <th key={property.id} className="text-center py-4 px-2 font-bold">
                                  ملک {selectedProperties.indexOf(property) + 1}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {comparisonMetrics.map((metric) => (
                              <tr key={metric.label} className="border-b border-gray-100 dark:border-gray-800">
                                <td className="py-4 px-2 font-medium">{metric.label}</td>
                                <td className="text-center py-4 px-2 font-bold text-primary-600 dark:text-primary-400">
                                  {metric.format 
                                    ? metric.format(metric.getValue(currentProperty) as number)
                                    : metric.getValue(currentProperty)
                                  }
                                </td>
                                {selectedProperties.map((property) => {
                                  const currentValue = metric.getValue(currentProperty) as number
                                  const compareValue = metric.getValue(property) as number
                                  const isHigherBetter = !['قیمت', 'قیمت هر متر'].includes(metric.label)
                                  
                                  return (
                                    <td key={property.id} className="text-center py-4 px-2">
                                      <div className="flex items-center justify-center gap-2">
                                        {metric.isNumeric && getComparisonIcon(currentValue, compareValue)}
                                        <span className={metric.isNumeric ? getComparisonColor(currentValue, compareValue, isHigherBetter) : ''}>
                                          {metric.format 
                                            ? metric.format(compareValue)
                                            : compareValue
                                          }
                                        </span>
                                      </div>
                                    </td>
                                  )
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>

                    {/* Property Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {selectedProperties.map((property) => (
                        <PropertyCard
                          key={property.id}
                          property={property}
                          isSelected={true}
                          onToggle={() => togglePropertySelection(property)}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <TrendingUp className="h-16 w-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">هیچ ملکی انتخاب نشده</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      برای مقایسه، از تب &quot;املاک مشابه&quot; حداقل یک ملک انتخاب کنید.
                    </p>
                    <Button onClick={() => setActiveTab('similar')}>
                      مشاهده املاک مشابه
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex gap-4 justify-end">
                <Button variant="outline" size="lg" onClick={onClose}>
                  بستن
                </Button>
                {selectedProperties.length > 0 && (
                  <Button size="lg" glow>
                    ذخیره مقایسه
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PropertyComparisonModal
