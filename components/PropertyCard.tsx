'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button, Card, Badge } from '@/design-system'
import { Property } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useFavorites } from '@/hooks/useFavorites'
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart, 
  Eye, 
  Star,
  Phone,
  MessageCircle,
  Car,
} from 'lucide-react'

interface PropertyCardProps {
  property: Property
  variant?: 'default' | 'featured' | 'compact'
  showAgent?: boolean
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  variant = 'default',
  showAgent = true 
}) => {
  const [imageError, setImageError] = React.useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleFavorite(property.id)
  }

  const cardVariants = {
    default: 'w-full',
    featured: 'w-full lg:flex lg:space-x-4 lg:space-x-reverse',
    compact: 'w-full max-w-sm'
  }

  const imageVariants = {
    default: 'aspect-[4/3]',
    featured: 'lg:w-1/2 aspect-[4/3] lg:aspect-[3/2]',
    compact: 'aspect-[4/3]'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        variant={property.isFeatured ? 'elevated' : 'default'}
        padding="none" 
        hover 
        className={cardVariants[variant]}
      >
        <Link href={`/properties/${property.id}`} className="block">
          <div className={variant === 'featured' ? 'lg:flex' : ''}>
            {/* Image Section */}
            <div className={`relative ${imageVariants[variant]} overflow-hidden rounded-t-2xl ${variant === 'featured' ? 'lg:rounded-l-2xl lg:rounded-tr-none' : ''}`}>
              {!imageError ? (
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <Square className="h-12 w-12 text-gray-400" />
                </div>
              )}
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Status Badges */}
              <div className="absolute top-3 right-3 flex gap-2">
                <Badge 
                  variant={property.listingType === 'sale' ? 'primary' : 'secondary'}
                  size="sm"
                  rounded
                >
                  {property.listingType === 'sale' ? 'فروش' : 'اجاره'}
                </Badge>
                {property.isFeatured && (
                  <Badge variant="warning" size="sm" rounded>
                    ویژه
                  </Badge>
                )}
              </div>

              {/* Favorite Button */}
              <button
                onClick={handleFavoriteClick}
                className="absolute top-3 left-3 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
              >
                <Heart 
                  className={`h-5 w-5 ${isFavorite(property.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                />
              </button>

              {/* Views Counter */}
              <div className="absolute bottom-3 left-3 flex items-center space-x-1 space-x-reverse text-white text-sm">
                <Eye className="h-4 w-4" />
                <span>{property.area} متر</span>
              </div>

              {/* Price */}
              <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-lg px-3 py-1">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatPrice(property.price)}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className={`p-4 ${variant === 'featured' ? 'lg:w-1/2 lg:flex lg:flex-col lg:justify-between' : ''}`}>
              {/* Property Type */}
              <div className="mb-2">
                <Badge variant="secondary" size="sm">
                  {property.propertyType === 'apartment' ? 'آپارتمان' : property.propertyType === 'villa' ? 'ویلا' : property.propertyType === 'land' ? 'زمین' : 'تجاری'}
                </Badge>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {property.title}
              </h3>

              {/* Location */}
              <div className="flex items-center space-x-1 space-x-reverse text-gray-600 dark:text-gray-400 mb-3">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{property.location.district}، {property.location.city}</span>
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                <div className="flex items-center space-x-1 space-x-reverse text-gray-600 dark:text-gray-400">
                  <Square className="h-4 w-4" />
                  <span className="text-sm">{property.area} متر</span>
                </div>
                {property.bedrooms > 0 && (
                  <div className="flex items-center space-x-1 space-x-reverse text-gray-600 dark:text-gray-400">
                    <Bed className="h-4 w-4" />
                    <span className="text-sm">{property.bedrooms} خواب</span>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="flex items-center space-x-1 space-x-reverse text-gray-600 dark:text-gray-400">
                    <Bath className="h-4 w-4" />
                    <span className="text-sm">{property.bathrooms} سرویس</span>
                  </div>
                )}
                {property.parkingSpaces > 0 && (
                  <div className="flex items-center space-x-1 space-x-reverse text-gray-600 dark:text-gray-400">
                    <Car className="h-4 w-4" />
                    <span className="text-sm">{property.parkingSpaces} پارکینگ</span>
                  </div>
                )}
              </div>

              {/* Agent Info */}
              {showAgent && (
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Image
                      src={property.agent.avatar}
                      alt={property.agent.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {property.agent.name}
                      </p>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {property.agent.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Link>
      </Card>
    </motion.div>
  )
}

export default PropertyCard
