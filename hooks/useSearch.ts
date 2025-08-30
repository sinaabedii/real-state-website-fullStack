import { useState, useEffect } from 'react'
import { Property } from '@/types'

interface SearchFilters {
  query: string
  propertyType: string
  listingType: string
  priceRange: [number, number]
  areaRange: [number, number]
  bedrooms: number
  bathrooms: number
  location: string
  hasParking: boolean
  hasElevator: boolean
  hasBalcony: boolean
  hasStorage: boolean
}

const SEARCH_KEY = 'real-estate-search-filters'

const defaultFilters: SearchFilters = {
  query: '',
  propertyType: 'all',
  listingType: 'all',
  priceRange: [0, 50000000000],
  areaRange: [0, 1000],
  bedrooms: 0,
  bathrooms: 0,
  location: '',
  hasParking: false,
  hasElevator: false,
  hasBalcony: false,
  hasStorage: false
}

export const useSearch = () => {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters)
  const [searchResults, setSearchResults] = useState<Property[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Load filters from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(SEARCH_KEY)
      if (stored) {
        try {
          const parsedFilters = JSON.parse(stored)
          setFilters({ ...defaultFilters, ...parsedFilters })
        } catch (error) {
          console.error('Error parsing search filters from localStorage:', error)
        }
      }
    }
  }, [])

  // Save filters to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SEARCH_KEY, JSON.stringify(filters))
    }
  }, [filters])

  const updateFilter = <K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const resetFilters = () => {
    setFilters(defaultFilters)
    setSearchResults([])
  }

  const searchProperties = (allProperties: Property[]) => {
    setIsSearching(true)
    
    // Simulate search delay
    setTimeout(() => {
      let results = allProperties

      // Filter by query (title, description, location)
      if (filters.query.trim()) {
        const query = filters.query.toLowerCase().trim()
        results = results.filter(property =>
          property.title.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query) ||
          property.location.district.toLowerCase().includes(query) ||
          property.location.city.toLowerCase().includes(query)
        )
      }

      // Filter by property type
      if (filters.propertyType !== 'all') {
        results = results.filter(property => property.propertyType === filters.propertyType)
      }

      // Filter by listing type
      if (filters.listingType !== 'all') {
        results = results.filter(property => property.listingType === filters.listingType)
      }

      // Filter by price range
      results = results.filter(property =>
        property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]
      )

      // Filter by area range
      results = results.filter(property =>
        property.area >= filters.areaRange[0] && property.area <= filters.areaRange[1]
      )

      // Filter by bedrooms
      if (filters.bedrooms > 0) {
        results = results.filter(property => property.bedrooms >= filters.bedrooms)
      }

      // Filter by bathrooms
      if (filters.bathrooms > 0) {
        results = results.filter(property => property.bathrooms >= filters.bathrooms)
      }

      // Filter by location
      if (filters.location.trim()) {
        const location = filters.location.toLowerCase().trim()
        results = results.filter(property =>
          property.location.district.toLowerCase().includes(location) ||
          property.location.city.toLowerCase().includes(location)
        )
      }

      // Filter by amenities
      if (filters.hasParking) {
        results = results.filter(property => property.parkingSpaces > 0)
      }

      if (filters.hasElevator) {
        results = results.filter(property => property.hasElevator)
      }

      if (filters.hasBalcony) {
        results = results.filter(property => property.hasBalcony)
      }

      if (filters.hasStorage) {
        results = results.filter(property => property.hasStorage)
      }

      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    
    if (filters.query.trim()) count++
    if (filters.propertyType !== 'all') count++
    if (filters.listingType !== 'all') count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 50000000000) count++
    if (filters.areaRange[0] > 0 || filters.areaRange[1] < 1000) count++
    if (filters.bedrooms > 0) count++
    if (filters.bathrooms > 0) count++
    if (filters.location.trim()) count++
    if (filters.hasParking) count++
    if (filters.hasElevator) count++
    if (filters.hasBalcony) count++
    if (filters.hasStorage) count++

    return count
  }

  return {
    filters,
    searchResults,
    isSearching,
    updateFilter,
    resetFilters,
    searchProperties,
    getActiveFiltersCount
  }
}
