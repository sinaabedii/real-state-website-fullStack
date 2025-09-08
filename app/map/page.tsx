'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import LeafletMap from '@/components/LeafletMap'
import { mockProperties } from '@/lib/mock-data'
import { formatPrice, getPropertyTypeLabel } from '@/lib/utils'
import { Button, Card, Badge } from '@/design-system'
import { MapPin, X, Home, Building, Briefcase, TreePine, Filter } from 'lucide-react'

const MapPage: React.FC = () => {
  const router = useRouter()
  const [typeFilter, setTypeFilter] = useState<'all' | 'apartment' | 'villa' | 'commercial' | 'land' | 'office'>('all')
  const [listingFilter, setListingFilter] = useState<'all' | 'sale' | 'rent'>('all')

  const filtered = useMemo(() => {
    return mockProperties.filter(p => {
      if (typeFilter !== 'all' && p.propertyType !== typeFilter) return false
      if (listingFilter !== 'all' && p.listingType !== listingFilter) return false
      return true
    })
  }, [typeFilter, listingFilter])

  const markers = filtered.map(p => ({
    id: p.id,
    position: [p.location.coordinates.lat, p.location.coordinates.lng] as [number, number],
    title: p.title,
    price: formatPrice(p.price),
    type: getPropertyTypeLabel(p.propertyType)
  }))

  const center: [number, number] = [35.6892, 51.389]

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary-500" />
            <h1 className="text-xl font-bold">نقشه املاک</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => router.push('/properties')}>
              <X className="h-4 w-4 ml-1" /> بستن نقشه
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card padding="sm" className="mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <Filter className="h-4 w-4" /> فیلتر نوع ملک:
            </span>
            <Button size="sm" variant={typeFilter==='all'?'primary':'ghost'} onClick={()=>setTypeFilter('all')}>همه</Button>
            <Button size="sm" variant={typeFilter==='apartment'?'primary':'ghost'} onClick={()=>setTypeFilter('apartment')}>
              <Building className="h-4 w-4 ml-1"/> آپارتمان
            </Button>
            <Button size="sm" variant={typeFilter==='villa'?'primary':'ghost'} onClick={()=>setTypeFilter('villa')}>
              <Home className="h-4 w-4 ml-1"/> ویلا
            </Button>
            <Button size="sm" variant={typeFilter==='commercial'?'primary':'ghost'} onClick={()=>setTypeFilter('commercial')}>
              <Briefcase className="h-4 w-4 ml-1"/> تجاری
            </Button>
            <Button size="sm" variant={typeFilter==='land'?'primary':'ghost'} onClick={()=>setTypeFilter('land')}>
              <TreePine className="h-4 w-4 ml-1"/> زمین
            </Button>

            <span className="mx-2 h-6 w-px bg-gray-200 dark:bg-gray-700" />

            <span className="text-sm text-gray-600 dark:text-gray-400">نوع آگهی:</span>
            <Button size="sm" variant={listingFilter==='all'?'primary':'ghost'} onClick={()=>setListingFilter('all')}>همه</Button>
            <Button size="sm" variant={listingFilter==='sale'?'primary':'ghost'} onClick={()=>setListingFilter('sale')}>فروش</Button>
            <Button size="sm" variant={listingFilter==='rent'?'primary':'ghost'} onClick={()=>setListingFilter('rent')}>اجاره</Button>

            <Badge variant="secondary" size="sm" className="ml-auto">{filtered.length} ملک روی نقشه</Badge>
          </div>
        </Card>

        {/* Map */}
        <LeafletMap
          mapId="all-properties-map"
          center={center}
          zoom={11}
          markers={markers}
          height="calc(100vh - 180px)"
          className="rounded-2xl"
          useDarkTiles
          fitToMarkers
          onMarkerClick={(id)=>router.push(`/properties/${id}`)}
        />
      </div>
    </div>
  )
}

export default MapPage
