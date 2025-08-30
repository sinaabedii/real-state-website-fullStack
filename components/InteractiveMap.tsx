'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button, Card } from '@/design-system'
import { mockProperties } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'
import LeafletMap from './LeafletMap'
import Image from 'next/image'
import { 
  MapPin, 
  X, 
  Home,
  Building,
  TreePine,
  Briefcase,
  Eye,
  Heart
} from 'lucide-react'

interface MapProperty {
  id: string
  title: string
  price: number
  propertyType: string
  coordinates: [number, number]
  images: string[]
  district: string
  area: number
  bedrooms: number
}

const InteractiveMap: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<MapProperty | null>(null)
  const [mapCenter] = useState<[number, number]>([35.6892, 51.3890]) // Tehran center
  const [zoom] = useState(12)
  const [filteredProperties, setFilteredProperties] = useState<MapProperty[]>([])
  const [activeFilter, setActiveFilter] = useState<string>('all')

  useEffect(() => {
    // Convert mock properties to map format
    const mapProperties: MapProperty[] = mockProperties.map(property => ({
      id: property.id,
      title: property.title,
      price: property.price,
      propertyType: property.propertyType,
      coordinates: [property.location.coordinates.lat, property.location.coordinates.lng] as [number, number],
      images: property.images,
      district: property.location.district,
      area: property.area,
      bedrooms: property.bedrooms
    }))

    // Apply filters
    if (activeFilter === 'all') {
      setFilteredProperties(mapProperties)
    } else {
      setFilteredProperties(mapProperties.filter(p => p.propertyType === activeFilter))
    }
  }, [activeFilter])


  const filters = [
    { key: 'all', label: 'همه', icon: MapPin },
    { key: 'apartment', label: 'آپارتمان', icon: Building },
    { key: 'villa', label: 'ویلا', icon: Home },
    { key: 'land', label: 'زمین', icon: TreePine },
    { key: 'commercial', label: 'تجاری', icon: Briefcase }
  ]

  // Convert properties to map markers
  const mapMarkers = filteredProperties.map(property => ({
    id: property.id,
    position: property.coordinates,
    title: property.title,
    price: formatPrice(property.price),
    type: property.propertyType
  }))

  return (
    <div className="relative h-full min-h-[600px]">
      {/* Filters */}
      <div className="absolute top-4 left-4 z-20">
        <Card variant="elevated" padding="sm" className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const Icon = filter.icon
              return (
                <Button
                  key={filter.key}
                  variant={activeFilter === filter.key ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.key)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {filter.label}
                </Button>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Map Container */}
      <LeafletMap
        center={mapCenter}
        zoom={zoom}
        markers={mapMarkers}
        height="600px"
        className="rounded-2xl"
      />

      {/* Property Details Panel */}
      {selectedProperty && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="absolute top-4 right-4 w-80 z-30"
        >
          <Card variant="elevated" padding="lg" className="backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold">{selectedProperty.title}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedProperty(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="relative h-48 rounded-lg overflow-hidden mb-4">
              <Image
                src={selectedProperty.images[0]}
                alt={selectedProperty.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-3">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {formatPrice(selectedProperty.price)}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>{selectedProperty.area} متر</span>
                <span>{selectedProperty.bedrooms} خواب</span>
                <span>{selectedProperty.district}</span>
              </div>

              <div className="flex gap-2">
                <Button size="sm" glow className="flex-1">
                  <Eye className="h-4 w-4 ml-2" />
                  مشاهده جزئیات
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Properties Count */}
      <div className="absolute bottom-4 left-4 z-20">
        <Card variant="elevated" padding="sm" className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary-500" />
            <span>{filteredProperties.length} ملک یافت شد</span>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default InteractiveMap
