'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button, Card, Input, Badge } from '@/design-system'
import { useSearch } from '@/hooks/useSearch'
import { mockProperties } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'
import { 
  Search, 
  Filter, 
  MapPin, 
  Home, 
  Building, 
  Briefcase,
  Car,
  Trees,
  Package,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

interface SearchBarProps {
  onSearch?: (results: any[]) => void
  className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className }) => {
  const [showAdvanced, setShowAdvanced] = useState(false)
  // Only notify parent after an explicit search action to avoid initial redirects/clears
  const [didSearch, setDidSearch] = useState(false)
  const { 
    filters, 
    updateFilter, 
    resetFilters, 
    searchProperties, 
    getActiveFiltersCount,
    searchResults,
    isSearching
  } = useSearch()

  const propertyTypes = [
    { value: 'apartment', label: 'آپارتمان', icon: Building },
    { value: 'villa', label: 'ویلا', icon: Home },
    { value: 'commercial', label: 'تجاری', icon: Briefcase },
    { value: 'land', label: 'زمین', icon: Trees },
  ]

  const listingTypes = [
    { value: 'sale', label: 'فروش' },
    { value: 'rent', label: 'اجاره' },
  ]

  const handleSearch = () => {
    setDidSearch(true)
    searchProperties(mockProperties)
  }

  const handleReset = () => {
    resetFilters()
    // Reset the flag so parent isn't notified until user searches again
    setDidSearch(false)
  }

  // Notify parent component when search results change
  useEffect(() => {
    if (onSearch && didSearch) {
      onSearch(searchResults)
    }
  }, [searchResults, onSearch, didSearch])

  return (
    <div className={`w-full ${className}`}>
      <Card variant="elevated" padding="lg" className="backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
        {/* Main Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="جستجو در املاک..."
                value={filters.query}
                onChange={(e) => updateFilter('query', e.target.value)}
                className="w-full pl-10"
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="flex gap-2">
            <select
              value={filters.propertyType}
              onChange={(e) => updateFilter('propertyType', e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">همه انواع</option>
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            <select
              value={filters.listingType}
              onChange={(e) => updateFilter('listingType', e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">فروش و اجاره</option>
              {listingTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            glow
            disabled={isSearching}
            className="px-8"
          >
            {isSearching ? 'در حال جستجو...' : 'جستجو'}
          </Button>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            فیلترهای پیشرفته
            {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {getActiveFiltersCount() > 0 && (
              <Badge variant="primary" size="sm">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>

          {getActiveFiltersCount() > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              پاک کردن فیلترها
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium mb-2">محدوده قیمت</label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="50000000000"
                    step="100000000"
                    value={filters.priceRange[0]}
                    onChange={(e) => updateFilter('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{formatPrice(filters.priceRange[0])}</span>
                    <span>{formatPrice(filters.priceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Area Range */}
              <div>
                <label className="block text-sm font-medium mb-2">متراژ</label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={filters.areaRange[0]}
                    onChange={(e) => updateFilter('areaRange', [parseInt(e.target.value), filters.areaRange[1]])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{filters.areaRange[0]} متر</span>
                    <span>{filters.areaRange[1]} متر</span>
                  </div>
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium mb-2">تعداد خواب</label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => updateFilter('bedrooms', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                >
                  <option value={0}>همه</option>
                  <option value={1}>1+</option>
                  <option value={2}>2+</option>
                  <option value={3}>3+</option>
                  <option value={4}>4+</option>
                </select>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-sm font-medium mb-2">تعداد سرویس</label>
                <select
                  value={filters.bathrooms}
                  onChange={(e) => updateFilter('bathrooms', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                >
                  <option value={0}>همه</option>
                  <option value={1}>1+</option>
                  <option value={2}>2+</option>
                  <option value={3}>3+</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-2">منطقه</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="نام منطقه یا شهر..."
                    value={filters.location}
                    onChange={(e) => updateFilter('location', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Amenities */}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium mb-3">امکانات</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.hasParking}
                      onChange={(e) => updateFilter('hasParking', e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <Car className="h-4 w-4" />
                    <span className="text-sm">پارکینگ</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.hasElevator}
                      onChange={(e) => updateFilter('hasElevator', e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <Package className="h-4 w-4" />
                    <span className="text-sm">آسانسور</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.hasBalcony}
                      onChange={(e) => updateFilter('hasBalcony', e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <Home className="h-4 w-4" />
                    <span className="text-sm">بالکن</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.hasStorage}
                      onChange={(e) => updateFilter('hasStorage', e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <Package className="h-4 w-4" />
                    <span className="text-sm">انباری</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search Results Count */}
        {searchResults.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Search className="h-4 w-4" />
              <span>{searchResults.length} ملک یافت شد</span>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export default SearchBar

