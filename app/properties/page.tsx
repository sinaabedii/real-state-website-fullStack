'use client'

import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button, Card, Badge } from '@/design-system'
import PropertyCard from '@/components/PropertyCard'
import SearchBar from '@/components/SearchBarNew'
import { mockProperties } from '@/lib/mock-data'
import { SearchFilters } from '@/types'
import { 
  Grid3X3, 
  List, 
  MapPin,
  Filter
} from 'lucide-react'

const PropertiesPage: React.FC = () => {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high' | 'area'>('newest')
  const [searchResults, setSearchResults] = useState(mockProperties)
  const [filters, setFilters] = useState<SearchFilters>({})
  const [showMap, setShowMap] = useState(false)

  const filteredAndSortedProperties = useMemo(() => {
    const filtered = searchResults.filter(property => {
      // Apply filters
      if (filters.propertyType && filters.propertyType.length > 0) {
        if (!filters.propertyType.includes(property.propertyType)) return false
      }
      
      if (filters.listingType && property.listingType !== filters.listingType) {
        return false
      }
      
      if (filters.priceRange) {
        if (property.price < filters.priceRange.min || property.price > filters.priceRange.max) {
          return false
        }
      }
      
      if (filters.areaRange) {
        if (filters.areaRange.min && property.area < filters.areaRange.min) return false
        if (filters.areaRange.max && property.area > filters.areaRange.max) return false
      }
      
      if (filters.bedrooms && filters.bedrooms.length > 0) {
        if (!filters.bedrooms.includes(property.bedrooms)) return false
      }
      
      if (filters.location) {
        const searchTerm = filters.location.toLowerCase()
        if (!property.location.city.toLowerCase().includes(searchTerm) &&
            !property.location.district.toLowerCase().includes(searchTerm) &&
            !property.location.address.toLowerCase().includes(searchTerm)) {
          return false
        }
      }
      
      return true
    })

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.price - b.price
        case 'price_high':
          return b.price - a.price
        case 'area':
          return b.area - a.area
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    return filtered
  }, [filters, sortBy, searchResults])

  const handleSearch = (results: any[]) => {
    setSearchResults(results)
  }

  const sortOptions = [
    { value: 'newest', label: 'جدیدترین' },
    { value: 'price_low', label: 'ارزان‌ترین' },
    { value: 'price_high', label: 'گران‌ترین' },
    { value: 'area', label: 'بزرگ‌ترین' },
  ]

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
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">جستجوی املاک</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {filteredAndSortedProperties.length} ملک یافت شد
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => router.push('/map')}
                size="sm"
              >
                <MapPin className="h-4 w-4 ml-1" />
                نقشه
              </Button>
              
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
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />
        </motion.div>

        {/* Filters and Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-2 flex-wrap">
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null
              
              let label = ''
              if (key === 'propertyType' && Array.isArray(value)) {
                label = `نوع: ${value.length} انتخاب`
              } else if (key === 'listingType') {
                label = `آگهی: ${value === 'sale' ? 'فروش' : 'اجاره'}`
              } else if (key === 'priceRange') {
                label = 'محدوده قیمت'
              } else if (key === 'location') {
                label = `مکان: ${value}`
              }
              
              return label ? (
                <Badge key={key} variant="primary" className="flex items-center gap-1">
                  {label}
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, [key]: undefined }))}
                    className="hover:bg-primary-600 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </Badge>
              ) : null
            })}
            
            {Object.keys(filters).length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilters({})}
              >
                پاک کردن همه
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">مرتب‌سازی:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Properties Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredAndSortedProperties.length === 0 ? (
            <Card padding="xl" className="text-center">
              <div className="py-12">
                <Filter className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">هیچ ملکی یافت نشد</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  لطفاً فیلترهای خود را تغییر دهید یا جستجوی جدیدی انجام دهید
                </p>
                <Button onClick={() => setFilters({})}>
                  پاک کردن فیلترها
                </Button>
              </div>
            </Card>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-6'
            }>
              {filteredAndSortedProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <PropertyCard 
                    property={property} 
                    variant={viewMode === 'list' ? 'featured' : 'default'}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Load More */}
        {filteredAndSortedProperties.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button size="lg" variant="outline">
              نمایش املاک بیشتر
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default PropertiesPage
