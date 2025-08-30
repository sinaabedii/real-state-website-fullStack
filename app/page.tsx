'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button, Card, Badge } from '@/design-system'
import PropertyCard from '@/components/PropertyCard'
import SearchBar from '@/components/SearchBar'
import { mockProperties } from '@/lib/mock-data'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Shield, 
  Clock, 
  Users,
  Star,
  MapPin,
  ArrowLeft,
  Play,
  CheckCircle,
  Award,
  Search,
  Home,
  Building,
  TreePine,
  Quote
} from 'lucide-react'

const HomePage: React.FC = () => {
  const handleSearch = (results: any[]) => {
    // Navigate to properties page
    window.location.href = '/properties'
  }

  const featuredProperties = mockProperties.filter(p => p.isFeatured).slice(0, 3)
  const recentProperties = mockProperties.slice(0, 6)
  
  // Real testimonials data
  const testimonials = [
    {
      name: 'احمد محمدی',
      role: 'خریدار',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      text: 'تجربه فوق‌العاده‌ای داشتم. تیم املاک پلاس کمک کردند خانه رویایی‌ام را پیدا کنم.',
      rating: 5
    },
    {
      name: 'فاطمه کریمی', 
      role: 'فروشنده',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      text: 'ملک من در کمتر از یک ماه فروخته شد. خدمات حرفه‌ای و قابل اعتماد.',
      rating: 5
    },
    {
      name: 'علی رضایی',
      role: 'سرمایه‌گذار', 
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      text: 'بهترین پلتفرم برای سرمایه‌گذاری در املاک. تحلیل‌های دقیق و مشاوره تخصصی.',
      rating: 5
    }
  ]

  const stats = [
    { label: 'املاک فعال', value: '12,000+', icon: Home, color: 'from-blue-500 to-blue-600' },
    { label: 'مشاوران معتبر', value: '500+', icon: Users, color: 'from-green-500 to-green-600' },
    { label: 'معاملات موفق', value: '8,000+', icon: CheckCircle, color: 'from-purple-500 to-purple-600' },
    { label: 'شهرهای تحت پوشش', value: '50+', icon: MapPin, color: 'from-orange-500 to-orange-600' },
  ]
  
  const propertyTypes = [
    { name: 'آپارتمان', count: '8,500+', icon: Building, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop' },
    { name: 'ویلا', count: '2,200+', icon: Home, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop' },
    { name: 'زمین', count: '1,300+', icon: TreePine, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop' }
  ]

  const features = [
    {
      icon: Shield,
      title: 'امنیت تضمین شده',
      description: 'تمامی املاک و مشاوران ما تایید شده و معتبر هستند',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Search,
      title: 'جستجوی هوشمند',
      description: 'الگوریتم پیشرفته برای یافتن بهترین املاک متناسب با نیاز شما',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Award,
      title: 'مشاوره تخصصی',
      description: 'تیم مشاوران مجرب برای راهنمایی در تمام مراحل خرید و فروش',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Clock,
      title: 'پشتیبانی 24/7',
      description: 'تیم پشتیبانی ما همیشه در خدمت شماست',
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop"
            alt="Modern Real Estate"
            fill
            className="object-cover opacity-10 dark:opacity-5"
            priority
          />
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Badge variant="primary" size="lg" className="mb-6 inline-flex items-center gap-2">
                <Star className="h-4 w-4" />
                پلتفرم شماره یک املاک ایران
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
                خانه <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">رویایی</span> خود را
                <br />
                <span className="text-4xl lg:text-6xl">پیدا کنید</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                با بیش از <strong>12,000 ملک فعال</strong> و <strong>500 مشاور معتبر</strong>، 
                بهترین فرصت‌های سرمایه‌گذاری را کشف کنید
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-16"
            >
              <SearchBar onSearch={handleSearch} />
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Card variant="glass" padding="lg" className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/properties">
                <Button size="xl" glow className="group">
                  <Search className="h-5 w-5 ml-2 group-hover:scale-110 transition-transform" />
                  شروع جستجو
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="xl" variant="outline" className="group border-2">
                  <Home className="h-5 w-5 ml-2 group-hover:scale-110 transition-transform" />
                  ثبت ملک رایگان
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-white/50 dark:bg-black/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="primary" size="lg" className="mb-4">
              املاک ویژه
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              بهترین پیشنهادات
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              املاک منتخب و ویژه که توسط تیم ما بررسی و تایید شده‌اند
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              مشاهده همه املاک ویژه
              <ArrowLeft className="h-5 w-5 mr-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Property Types Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" size="lg" className="mb-4">
              انواع املاک
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              دسته‌بندی‌های محبوب
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              از آپارتمان‌های مدرن تا ویلاهای لوکس، هر آنچه نیاز دارید
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {propertyTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card variant="elevated" padding="none" className="group cursor-pointer hover:scale-105 transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={type.image}
                      alt={type.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <type.icon className="h-6 w-6" />
                        <span className="text-xl font-bold">{type.name}</span>
                      </div>
                      <p className="text-sm opacity-90">{type.count} ملک موجود</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <Button variant="outline" fullWidth className="group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-all duration-300">
                      مشاهده همه {type.name}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="primary" size="lg" className="mb-4">
              مزایای ما
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              چرا املاک پلاس؟
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              ویژگی‌هایی که ما را به بهترین پلتفرم املاک ایران تبدیل کرده
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="elevated" padding="xl" className="text-center h-full group hover:scale-105 transition-all duration-300">
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${feature.color} rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="warning" size="lg" className="mb-4">
              نظرات مشتریان
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              تجربه مشتریان ما
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              هزاران مشتری راضی که به ما اعتماد کرده‌اند
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card variant="elevated" padding="xl" className="h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-gray-300 mb-4" />
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Properties */}
      <section className="py-16 bg-white/50 dark:bg-black/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                جدیدترین املاک
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                تازه‌ترین آگهی‌های ثبت شده در پلتفرم
              </p>
            </div>
            <Button variant="outline">
              مشاهده همه
              <ArrowLeft className="h-5 w-5 mr-2" />
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PropertyCard property={property} variant="compact" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600" />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              آماده برای شروع هستید؟
            </h2>
            <p className="text-xl mb-8 opacity-90">
              همین حالا ملک خود را ثبت کنید یا جستجوی خود را شروع کنید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="secondary">
                ثبت ملک رایگان
              </Button>
              <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                <Play className="h-5 w-5 mr-2" />
                مشاهده ویدیو معرفی
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
