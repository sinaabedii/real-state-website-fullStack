'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/design-system'
import 'leaflet/dist/leaflet.css'
import { MapPin, Layers, Navigation } from 'lucide-react'

interface MapProps {
  center?: [number, number]
  zoom?: number
  markers?: Array<{
    id: string
    position: [number, number]
    title: string
    price?: string
    type?: string
  }>
  height?: string
  className?: string
  mapId?: string
  useDarkTiles?: boolean
  fitToMarkers?: boolean
  onMarkerClick?: (id: string) => void
}

const LeafletMap: React.FC<MapProps> = ({
  center = [35.6892, 51.3890], // Tehran coordinates
  zoom = 12,
  markers = [],
  height = '400px',
  className = '',
  mapId = 'map',
  useDarkTiles = false,
  fitToMarkers = false,
  onMarkerClick
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Dynamically import Leaflet to avoid SSR issues
    const loadMap = async () => {
      if (typeof window === 'undefined') return

      try {
        const L = (await import('leaflet')).default
        
        // Fix for default markers
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        })

        const mapInstance = L.map(mapId, {
          center: center,
          zoom: zoom,
          zoomControl: false
        })

        // Add tile layer (dark/light)
        const tileUrl = useDarkTiles
          ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        const attribution = useDarkTiles
          ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          : '© OpenStreetMap contributors'
        L.tileLayer(tileUrl, { attribution }).addTo(mapInstance)

        // Custom zoom control
        const zoomControl = L.control.zoom({
          position: 'bottomright'
        })
        zoomControl.addTo(mapInstance)

        // Add markers
        const latLngs: any[] = []
        markers.forEach(marker => {
          const customIcon = L.divIcon({
            html: `
              <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white">
                ${marker.price ? '₹' : '📍'}
              </div>
            `,
            className: 'custom-marker',
            iconSize: [32, 32],
            iconAnchor: [16, 16]
          })

          const m = L.marker(marker.position, { icon: customIcon })
            .addTo(mapInstance)
            .bindPopup(`
              <div class="p-2">
                <h3 class="font-bold text-sm mb-1">${marker.title}</h3>
                ${marker.price ? `<p class="text-blue-600 font-semibold">${marker.price}</p>` : ''}
                ${marker.type ? `<p class="text-gray-500 text-xs">${marker.type}</p>` : ''}
              </div>
            `)
          if (onMarkerClick) {
            m.on('click', () => onMarkerClick(marker.id))
          }
          latLngs.push(marker.position)
        })

        // Fit map to markers
        if (fitToMarkers && latLngs.length > 0) {
          const bounds = L.latLngBounds(latLngs)
          mapInstance.fitBounds(bounds, { padding: [40, 40] })
        }

        // Map instance ready
        setIsLoaded(true)

        return () => {
          mapInstance.remove()
        }
      } catch (error) {
        console.error('Error loading map:', error)
        setIsLoaded(false)
      }
    }

    loadMap()
  }, [center, zoom, markers, mapId])

  return (
    <Card variant="elevated" padding="none" className={`overflow-hidden ${className}`}>
      <div className="relative">
        {/* Map Container */}
        <div 
          id={mapId} 
          style={{ height }}
          className="w-full relative z-10"
        />
        
        {/* Loading State */}
        {!isLoaded && (
          <div 
            className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
            style={{ height }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">در حال بارگذاری نقشه...</p>
            </motion.div>
          </div>
        )}

        {/* Map Controls Overlay */}
        <div className="absolute top-4 left-4 z-20 space-y-2">
          <button className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Layers className="h-4 w-4" />
          </button>
          <button className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Navigation className="h-4 w-4" />
          </button>
        </div>

        {/* Map Info */}
        <div className="absolute bottom-4 left-4 z-20">
          <div className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span className="text-gray-700 dark:text-gray-300">
                {markers.length} ملک در این منطقه
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default LeafletMap
