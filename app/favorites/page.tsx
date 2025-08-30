'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Card } from '@/design-system'
import PropertyCard from '@/components/PropertyCard'
import { mockProperties } from '@/lib/mock-data'
import { useFavorites } from '@/hooks/useFavorites'
import { Heart, Grid3X3, List, Filter, Trash2, Share2 } from 'lucide-react'
import Link from 'next/link'

const FavoritesPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedProperties, setSelectedProperties] = useState<string[]>([])
  const { getFavoriteProperties, removeFromFavorites } = useFavorites()
  const favoriteProperties = getFavoriteProperties(mockProperties)

  const handleSelectProperty = (propertyId: string) => {
    setSelectedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  const handleSelectAll = () => {
    if (selectedProperties.length === favoriteProperties.length) {
      setSelectedProperties([])
    } else {
      setSelectedProperties(favoriteProperties.map(p => p.id))
    }
  }

  const handleRemoveSelected = () => {
    selectedProperties.forEach(propertyId => {
      removeFromFavorites(propertyId)
    })
    setSelectedProperties([])
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-3">
                <Heart className="h-8 w-8 text-red-500" />
                املاک مورد علاقه
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {favoriteProperties.length} ملک در لیست علاقه‌مندی‌های شما
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 ml-2" />
                فیلتر
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          {favoriteProperties.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedProperties.length === favoriteProperties.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm">
                    {selectedProperties.length > 0 
                      ? `${selectedProperties.length} ملک انتخاب شده`
                      : 'انتخاب همه'
                    }
                  </span>
                </label>
              </div>
              
              {selectedProperties.length > 0 && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 ml-2" />
                    اشتراک‌گذاری
                  </Button>
                  <Button variant="danger" size="sm" onClick={handleRemoveSelected}>
                    <Trash2 className="h-4 w-4 ml-2" />
                    حذف از علاقه‌مندی‌ها
                  </Button>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Properties List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {favoriteProperties.length === 0 ? (
            <Card padding="xl" className="text-center">
              <div className="py-12">
                <Heart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">هیچ ملکی در علاقه‌مندی‌ها نیست</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  شروع کنید و املاک مورد علاقه خود را ذخیره کنید
                </p>
                <Link href="/properties">
                  <Button>
                    جستجوی املاک
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-6'
            }>
              {favoriteProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative"
                >
                  {/* Selection Checkbox */}
                  <div className="absolute top-3 left-3 z-10">
                    <input
                      type="checkbox"
                      checked={selectedProperties.includes(property.id)}
                      onChange={() => handleSelectProperty(property.id)}
                      className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 bg-white shadow-lg"
                    />
                  </div>
                  
                  <PropertyCard 
                    property={property} 
                    variant={viewMode === 'list' ? 'featured' : 'default'}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Quick Stats */}
        {favoriteProperties.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">خلاصه علاقه‌مندی‌ها</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {favoriteProperties.filter(p => p.propertyType === 'apartment').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">آپارتمان</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {favoriteProperties.filter(p => p.propertyType === 'villa').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">ویلا</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {favoriteProperties.filter(p => p.listingType === 'sale').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">فروش</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {favoriteProperties.filter(p => p.listingType === 'rent').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">اجاره</div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage
