export interface Property {
  id: string
  title: string
  description: string
  price: number
  area: number
  bedrooms: number
  bathrooms: number
  parkingSpaces: number
  hasElevator: boolean
  hasBalcony: boolean
  hasStorage: boolean
  propertyType: 'apartment' | 'villa' | 'commercial' | 'land' | 'office'
  listingType: 'sale' | 'rent'
  location: {
    city: string
    district: string
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  images: string[]
  video?: string
  amenities: string[]
  yearBuilt?: number
  floorNumber?: number
  totalFloors?: number
  agent: Agent
  createdAt: string
  updatedAt: string
  views: number
  isFeatured: boolean
  status: 'active' | 'pending' | 'sold' | 'rented'
}

export interface Agent {
  id: string
  name: string
  avatar: string
  phone: string
  email: string
  rating: number
  reviewsCount: number
  isVerified: boolean
  specialties: string[]
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  role: 'user' | 'agent' | 'admin'
  isVerified: boolean
  createdAt: string
  preferences?: {
    propertyTypes: Property['propertyType'][]
    priceRange: {
      min: number
      max: number
    }
    locations: string[]
  }
}

export interface SearchFilters {
  propertyType?: Property['propertyType'][]
  listingType?: Property['listingType']
  priceRange?: {
    min: number
    max: number
  }
  areaRange?: {
    min: number
    max: number
  }
  bedrooms?: number[]
  bathrooms?: number[]
  location?: string
  amenities?: string[]
  hasElevator?: boolean
  hasParking?: boolean
  hasBalcony?: boolean
}

export interface Review {
  id: string
  propertyId: string
  userId: string
  rating: number
  comment: string
  createdAt: string
  user: Pick<User, 'name' | 'avatar'>
}

export interface Favorite {
  id: string
  userId: string
  propertyId: string
  createdAt: string
}

export interface ChatMessage {
  id: string
  senderId: string
  receiverId: string
  propertyId?: string
  message: string
  timestamp: string
  isRead: boolean
}

export interface Notification {
  id: string
  userId: string
  type: 'message' | 'property_update' | 'price_change' | 'new_property'
  title: string
  message: string
  isRead: boolean
  createdAt: string
  actionUrl?: string
}
