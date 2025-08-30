import { create } from 'zustand'
import { Property, User, SearchFilters } from '@/types'

type VoidFn1<T> = (..._: [T]) => void
type VoidFn0 = () => void

interface AppState {
  // User state
  currentUser: User | null
  isAuthenticated: boolean
  
  // Properties state
  properties: Property[]
  favoriteProperties: string[]
  searchFilters: SearchFilters
  
  // UI state
  isDarkMode: boolean
  isLoading: boolean
  
  // Actions
  setCurrentUser: VoidFn1<User | null>
  setAuthenticated: VoidFn1<boolean>
  setProperties: VoidFn1<Property[]>
  addToFavorites: VoidFn1<string>
  removeFromFavorites: VoidFn1<string>
  setSearchFilters: VoidFn1<SearchFilters>
  toggleDarkMode: VoidFn0
  setLoading: VoidFn1<boolean>
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  currentUser: null,
  isAuthenticated: false,
  properties: [],
  favoriteProperties: [],
  searchFilters: {},
  isDarkMode: true,
  isLoading: false,

  // Actions
  setCurrentUser: (user) => set({ currentUser: user }),
  
  setAuthenticated: (isAuth) => set({ isAuthenticated: isAuth }),
  
  setProperties: (properties) => set({ properties }),
  
  addToFavorites: (propertyId) => {
    const { favoriteProperties } = get()
    if (!favoriteProperties.includes(propertyId)) {
      set({ favoriteProperties: [...favoriteProperties, propertyId] })
    }
  },
  
  removeFromFavorites: (propertyId) => {
    const { favoriteProperties } = get()
    set({ 
      favoriteProperties: favoriteProperties.filter(id => id !== propertyId) 
    })
  },
  
  setSearchFilters: (filters) => set({ searchFilters: filters }),
  
  toggleDarkMode: () => {
    const { isDarkMode } = get()
    const newMode = !isDarkMode
    set({ isDarkMode: newMode })
    
    // Update DOM
    if (typeof window !== 'undefined') {
      if (newMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('dark-mode', JSON.stringify(newMode))
    }
  },
  
  setLoading: (loading) => set({ isLoading: loading }),
}))
