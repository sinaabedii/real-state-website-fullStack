'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button, Card, Badge } from '@/design-system'
import { mockProperties } from '@/lib/mock-data'
import { formatPrice, formatArea, formatDate, getPropertyTypeLabel, getListingTypeLabel } from '@/lib/utils'
import Link from 'next/link'
import { 
  Heart, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Square, 
  Eye,
  Star,
  Phone,
  MessageCircle,
  Calendar,
  Building,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react'
import LeafletMap from '@/components/LeafletMap'
import MortgageCalculatorModal from '@/components/modals/MortgageCalculatorModal'
import PropertyComparisonModal from '@/components/modals/PropertyComparisonModal'
import PropertyReportModal from '@/components/modals/PropertyReportModal'

interface PropertyDetailsPageProps {
  params: { id: string }
}

const PropertyDetailsPage: React.FC<PropertyDetailsPageProps> = ({ params }) => {
  const property = mockProperties.find(p => p.id === params.id)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [showMortgageCalculator, setShowMortgageCalculator] = useState(false)
  const [showPropertyComparison, setShowPropertyComparison] = useState(false)
  const [showPropertyReport, setShowPropertyReport] = useState(false)

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card padding="xl" className="text-center">
          <h1 className="text-2xl font-bold mb-4">ملک یافت نشد</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            ملک مورد نظر شما یافت نشد یا حذف شده است.
          </p>
          <Link href="/properties">
            <Button>بازگشت به لیست املاک</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const amenityIcons = {
    'پارکینگ': Car,
    'آسانسور': Building,
    'بالکن': Building,
    'انباری': Building,
    'سیستم گرمایشی': Building,
    'سیستم سرمایشی': Building,
    'حیاط': Building,
    'استخر': Building,
    'باربیکیو': Building,
    'سیستم امنیتی': Building,
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Prevent unused state warnings while keeping future feature hooks */}
        <span className="hidden">{String(showContactForm)}{String(showImageModal)}</span>
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 text-sm mb-8"
        >
          <Link href="/" className="text-gray-500 hover:text-primary-600 transition-colors">خانه</Link>
          <span className="text-gray-300">/</span>
          <Link href="/properties" className="text-gray-500 hover:text-primary-600 transition-colors">املاک</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-xs">{property.title}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mb-10"
            >
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                
                {/* Navigation Buttons */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Expand Button */}
                <button
                  onClick={() => setShowImageModal(true)}
                  className="absolute top-6 left-6 p-3 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
                >
                  <Maximize2 className="h-5 w-5" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} از {property.images.length}
                </div>

                {/* Status Badges */}
                <div className="absolute top-6 right-6 flex gap-3">
                  <Badge 
                    variant={property.listingType === 'sale' ? 'primary' : 'secondary'}
                    size="lg"
                    className="backdrop-blur-sm"
                  >
                    {getListingTypeLabel(property.listingType)}
                  </Badge>
                  {property.isFeatured && (
                    <Badge variant="warning" size="lg" className="backdrop-blur-sm">ویژه</Badge>
                  )}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {property.images.length > 1 && (
                <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-200 ${
                        index === currentImageIndex 
                          ? 'ring-3 ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 scale-105' 
                          : 'hover:scale-105 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${property.title} - تصویر ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Property Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary" size="md" className="font-medium">
                      {getPropertyTypeLabel(property.propertyType)}
                    </Badge>
                    {property.isFeatured && (
                      <Badge variant="warning" size="md" className="font-medium">
                        <Star className="h-3 w-3 ml-1" />
                        ویژه
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">{property.title}</h1>
                  <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary-500" />
                      <span className="font-medium">{property.location.district}، {property.location.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-gray-400" />
                      <span>{property.views} بازدید</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span>{formatDate(property.createdAt)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setIsFavorited(!isFavorited)}
                    className="hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                  >
                    <Heart className={`h-6 w-6 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="ghost" size="lg" className="hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/20">
                    <Share2 className="h-6 w-6" />
                  </Button>
                </div>
              </div>

              {/* Price Card */}
              <Card padding="lg" className="bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-primary-900/30 dark:via-gray-800 dark:to-accent-900/30 border-primary-200 dark:border-primary-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl lg:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                      {formatPrice(property.price)}
                    </div>
                    {property.listingType === 'rent' && (
                      <div className="text-lg text-gray-600 dark:text-gray-400 font-medium">ماهانه</div>
                    )}
                  </div>
                  <Badge 
                    variant={property.listingType === 'sale' ? 'primary' : 'secondary'}
                    size="lg"
                    className="text-lg px-4 py-2"
                  >
                    {getListingTypeLabel(property.listingType)}
                  </Badge>
                </div>
              </Card>
            </motion.div>

            {/* Property Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Card padding="lg" className="mb-8">

                <h2 className="text-2xl font-bold mb-6">مشخصات ملک</h2>
                
                {/* Property Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl hover:shadow-lg transition-all duration-200">
                    <Square className="h-8 w-8 mx-auto mb-3 text-primary-500" />
                    <div className="text-2xl font-bold mb-1">{formatArea(property.area)}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">متراژ</div>
                  </div>
                  
                  {property.bedrooms > 0 && (
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl hover:shadow-lg transition-all duration-200">
                      <Bed className="h-8 w-8 mx-auto mb-3 text-blue-500" />
                      <div className="text-2xl font-bold mb-1">{property.bedrooms}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">اتاق خواب</div>
                    </div>
                  )}
                  
                  {property.bathrooms > 0 && (
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl hover:shadow-lg transition-all duration-200">
                      <Bath className="h-8 w-8 mx-auto mb-3 text-green-500" />
                      <div className="text-2xl font-bold mb-1">{property.bathrooms}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">سرویس بهداشتی</div>
                    </div>
                  )}
                  
                  {property.parkingSpaces > 0 && (
                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl hover:shadow-lg transition-all duration-200">
                      <Car className="h-8 w-8 mx-auto mb-3 text-purple-500" />
                      <div className="text-2xl font-bold mb-1">{property.parkingSpaces}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">پارکینگ</div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary-500" />
                    توضیحات ملک
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {property.description}
                    </p>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    امکانات و ویژگی‌ها
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {property.amenities.map((amenity, index) => {
                      const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || CheckCircle
                      return (
                        <div key={index} className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                          <IconComponent className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <span className="text-gray-800 dark:text-gray-200 font-medium">{amenity}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Additional Info */}
                {(property.yearBuilt || property.floorNumber) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
                    {property.yearBuilt && (
                      <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl">
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">سال ساخت</div>
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{property.yearBuilt}</div>
                      </div>
                    )}
                    {property.floorNumber && (
                      <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-2xl">
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">طبقه</div>
                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{property.floorNumber} از {property.totalFloors}</div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Location & Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card padding="lg" className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                      <MapPin className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    موقعیت و دسترسی
                  </h3>
                  <Badge variant="secondary" size="lg" className="font-medium">
                    {property.location.district}، {property.location.city}
                  </Badge>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-xl mb-6">
                  <LeafletMap
                    mapId={`property-map-${property.id}`}
                    center={[property.location.coordinates.lat, property.location.coordinates.lng]}
                    zoom={15}
                    markers={[{
                      id: property.id,
                      position: [property.location.coordinates.lat, property.location.coordinates.lng],
                      title: property.title,
                      price: formatPrice(property.price),
                      type: getPropertyTypeLabel(property.propertyType)
                    }]}
                    height="400px"
                    className="rounded-2xl"
                    useDarkTiles
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-300 font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      دسترسی عالی به حمل‌ونقل
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-medium">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      محله {property.location.district}
                    </div>
                  </div>
                  <a
                    className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-primary-200 dark:border-primary-800 hover:shadow-lg transition-all duration-200 group"
                    href={`https://www.google.com/maps?q=${property.location.coordinates.lat},${property.location.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-2 text-primary-700 dark:text-primary-300 font-medium group-hover:text-primary-800 dark:group-hover:text-primary-200">
                      <MapPin className="h-4 w-4" />
                      مسیریابی در گوگل مپس
                    </div>
                  </a>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Agent Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card padding="xl" className="sticky top-8 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border-2 border-gray-100 dark:border-gray-700">
                <div className="text-center mb-8">
                  <div className="relative inline-block mb-6">
                    <Image
                      src={property.agent.avatar}
                      alt={property.agent.name}
                      width={100}
                      height={100}
                      className="rounded-2xl shadow-xl ring-4 ring-white dark:ring-gray-700"
                    />
                    {property.agent.isVerified && (
                      <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{property.agent.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">مشاور املاک</p>
                  
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(property.agent.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{property.agent.rating}</span>
                    <span className="text-sm text-gray-500">({property.agent.reviewsCount} نظر)</span>
                  </div>
                  
                  {property.agent.isVerified && (
                    <Badge variant="success" size="lg" className="mb-6">
                      <CheckCircle className="h-4 w-4 ml-2" />
                      مشاور تایید شده
                    </Badge>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  <Button fullWidth size="xl" glow className="text-lg font-semibold py-4">
                    <Phone className="h-6 w-6 ml-3" />
                    تماس فوری
                  </Button>
                  <Button fullWidth variant="outline" size="xl" className="text-lg font-semibold py-4">
                    <MessageCircle className="h-6 w-6 ml-3" />
                    چت آنلاین
                  </Button>
                  <Button 
                    fullWidth 
                    variant="secondary" 
                    size="xl"
                    className="text-lg font-semibold py-4"
                    onClick={() => setShowContactForm(true)}
                  >
                    <Calendar className="h-6 w-6 ml-3" />
                    رزرو بازدید
                  </Button>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary-500" />
                    تخصص‌ها
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {property.agent.specialties.map((specialty, index) => (
                      <Badge key={index} variant="primary" size="md" className="font-medium">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Quick Tools */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card padding="lg" className="bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-primary-900/20 dark:via-gray-800 dark:to-accent-900/20">
                <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                    <Building className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  ابزارهای کاربردی
                </h3>
                <div className="space-y-4">
                  <Button 
                    fullWidth 
                    variant="outline" 
                    size="lg" 
                    className="justify-start text-lg font-medium py-4"
                    onClick={() => setShowMortgageCalculator(true)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <Building className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      محاسبه وام و اقساط
                    </div>
                  </Button>
                  <Button 
                    fullWidth 
                    variant="outline" 
                    size="lg" 
                    className="justify-start text-lg font-medium py-4"
                    onClick={() => setShowPropertyComparison(true)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      مقایسه با املاک مشابه
                    </div>
                  </Button>
                  <Button 
                    fullWidth 
                    variant="outline" 
                    size="lg" 
                    className="justify-start text-lg font-medium py-4"
                    onClick={() => setShowPropertyReport(true)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <Share2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      گزارش کامل ملک
                    </div>
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <MortgageCalculatorModal
        isOpen={showMortgageCalculator}
        onClose={() => setShowMortgageCalculator(false)}
        propertyPrice={property.price}
      />
      
      <PropertyComparisonModal
        isOpen={showPropertyComparison}
        onClose={() => setShowPropertyComparison(false)}
        currentProperty={property}
      />
      
      <PropertyReportModal
        isOpen={showPropertyReport}
        onClose={() => setShowPropertyReport(false)}
        property={property}
      />
    </div>
  )
}

export default PropertyDetailsPage
