import { useState, useEffect } from 'react'
import { Property } from '@/types'

const FAVORITES_KEY = 'real-estate-favorites'

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(FAVORITES_KEY)
      if (stored) {
        try {
          setFavorites(JSON.parse(stored))
        } catch (error) {
          console.error('Error parsing favorites from localStorage:', error)
          setFavorites([])
        }
      }
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    }
  }, [favorites])

  const addToFavorites = (propertyId: string) => {
    setFavorites(prev => {
      if (!prev.includes(propertyId)) {
        return [...prev, propertyId]
      }
      return prev
    })
  }

  const removeFromFavorites = (propertyId: string) => {
    setFavorites(prev => prev.filter(id => id !== propertyId))
  }

  const toggleFavorite = (propertyId: string) => {
    if (favorites.includes(propertyId)) {
      removeFromFavorites(propertyId)
    } else {
      addToFavorites(propertyId)
    }
  }

  const isFavorite = (propertyId: string) => {
    return favorites.includes(propertyId)
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  const getFavoriteProperties = (allProperties: Property[]) => {
    return allProperties.filter(property => favorites.includes(property.id))
  }

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    getFavoriteProperties,
    favoritesCount: favorites.length
  }
}
