'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, Button, Badge } from '@/design-system'
import { mockProperties, mockUsers } from '@/lib/mock-data'
import { formatPrice, formatDate } from '@/lib/utils'
import Image from 'next/image'
import { 
  Home, 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageCircle,
  Plus,
  Search,
  Filter,
  Bell,
  Settings,
  User,
  BarChart3,
  Calendar,
  MapPin,
  
} from 'lucide-react'

const DashboardPage: React.FC = () => {
  const [userRole, setUserRole] = useState<'user' | 'agent' | 'admin'>('user') // Default role
  const [activeTab, setActiveTab] = useState('overview')

  // Mock user data
  const currentUser = mockUsers[0]
  // const userProperties = mockProperties.filter(p => p.agent.id === '1').slice(0, 3)
  const favoriteProperties = mockProperties.slice(0, 4)
  const recentViews = mockProperties.slice(2, 6)

  const stats = {
    user: [
      { label: 'املاک مورد علاقه', value: '12', icon: Heart, color: 'text-red-500' },
      { label: 'بازدیدهای اخیر', value: '28', icon: Eye, color: 'text-blue-500' },
      { label: 'پیام‌های جدید', value: '5', icon: MessageCircle, color: 'text-green-500' },
      { label: 'جستجوهای ذخیره شده', value: '8', icon: Search, color: 'text-purple-500' },
    ],
    agent: [
      { label: 'املاک فعال', value: '24', icon: Home, color: 'text-blue-500' },
      { label: 'بازدید امروز', value: '156', icon: Eye, color: 'text-green-500' },
      { label: 'درخواست جدید', value: '8', icon: MessageCircle, color: 'text-orange-500' },
      { label: 'فروش این ماه', value: '3', icon: TrendingUp, color: 'text-purple-500' },
    ],
    admin: [
      { label: 'کل املاک', value: '1,247', icon: Home, color: 'text-blue-500' },
      { label: 'کاربران فعال', value: '8,932', icon: User, color: 'text-green-500' },
      { label: 'معاملات امروز', value: '23', icon: TrendingUp, color: 'text-orange-500' },
      { label: 'درآمد ماهانه', value: '₹2.4M', icon: BarChart3, color: 'text-purple-500' },
    ]
  }

  const tabs = {
    user: [
      { id: 'overview', label: 'نمای کلی', icon: BarChart3 },
      { id: 'favorites', label: 'علاقه‌مندی‌ها', icon: Heart },
      { id: 'history', label: 'تاریخچه', icon: Calendar },
      { id: 'messages', label: 'پیام‌ها', icon: MessageCircle },
      { id: 'settings', label: 'تنظیمات', icon: Settings },
    ],
    agent: [
      { id: 'overview', label: 'نمای کلی', icon: BarChart3 },
      { id: 'properties', label: 'املاک من', icon: Home },
      { id: 'leads', label: 'مشتریان', icon: User },
      { id: 'messages', label: 'پیام‌ها', icon: MessageCircle },
      { id: 'analytics', label: 'آمار', icon: TrendingUp },
    ],
    admin: [
      { id: 'overview', label: 'نمای کلی', icon: BarChart3 },
      { id: 'properties', label: 'مدیریت املاک', icon: Home },
      { id: 'users', label: 'مدیریت کاربران', icon: User },
      { id: 'reports', label: 'گزارش‌ها', icon: BarChart3 },
      { id: 'settings', label: 'تنظیمات سیستم', icon: Settings },
    ]
  }

  const currentStats = stats[userRole]
  const currentTabs = tabs[userRole]

  // Read role from cookie (set by mock login)
  React.useEffect(() => {
    if (typeof document === 'undefined') return
    const match = document.cookie.split('; ').find(c => c.startsWith('auth-role='))
    if (match) {
      const role = decodeURIComponent(match.split('=')[1]) as 'user' | 'agent' | 'admin'
      if (role === 'user' || role === 'agent' || role === 'admin') {
        setUserRole(role)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                سلام {currentUser.name} 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {userRole === 'user' && 'به داشبورد شخصی خود خوش آمدید'}
                {userRole === 'agent' && 'آماده برای مدیریت املاک خود هستید؟'}
                {userRole === 'admin' && 'نمای کلی سیستم املاک پلاس'}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              {userRole === 'agent' && (
                <Button glow>
                  <Plus className="h-5 w-5 ml-2" />
                  ثبت ملک جدید
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {currentStats.map((stat, index) => (
            <Card key={index} padding="lg" hover className="text-center">
              <div className={`w-12 h-12 mx-auto mb-4 ${stat.color} bg-opacity-10 rounded-xl flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </Card>
          ))}
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex overflow-x-auto gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
            {currentTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Based on Active Tab */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <Card padding="lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  فعالیت‌های اخیر
                </h3>
                <div className="space-y-4">
                  {[
                    { action: 'بازدید ملک', property: 'آپارتمان نیاوران', time: '2 ساعت پیش' },
                    { action: 'ذخیره در علاقه‌مندی‌ها', property: 'ویلای لواسان', time: '5 ساعت پیش' },
                    { action: 'ارسال پیام', property: 'دفتر کار ولیعصر', time: '1 روز پیش' },
                    { action: 'جستجوی جدید', property: 'آپارتمان در تهران', time: '2 روز پیش' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <div className="font-medium">{activity.action}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{activity.property}</div>
                      </div>
                      <div className="text-xs text-gray-500">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card padding="lg">
                <h3 className="text-lg font-semibold mb-4">عملیات سریع</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" fullWidth className="h-20 flex-col">
                    <Search className="h-6 w-6 mb-2" />
                    <span className="text-sm">جستجوی پیشرفته</span>
                  </Button>
                  <Button variant="outline" fullWidth className="h-20 flex-col">
                    <Heart className="h-6 w-6 mb-2" />
                    <span className="text-sm">علاقه‌مندی‌ها</span>
                  </Button>
                  <Button variant="outline" fullWidth className="h-20 flex-col">
                    <MessageCircle className="h-6 w-6 mb-2" />
                    <span className="text-sm">پیام‌های من</span>
                  </Button>
                  <Button variant="outline" fullWidth className="h-20 flex-col">
                    <Settings className="h-6 w-6 mb-2" />
                    <span className="text-sm">تنظیمات</span>
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">املاک مورد علاقه</h3>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 ml-2" />
                  فیلتر
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProperties.map((property) => (
                  <Card key={property.id} padding="none" hover>
                    <div className="aspect-[4/3] relative rounded-t-2xl overflow-hidden">
                      <Image
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge variant="primary" size="sm">
                          {property.listingType === 'sale' ? 'فروش' : 'اجاره'}
                        </Badge>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Button variant="ghost" size="sm" className="bg-white/20 backdrop-blur-sm">
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold mb-2 line-clamp-1">{property.title}</h4>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-2">
                        <MapPin className="h-3 w-3" />
                        <span className="text-sm">{property.location.district}</span>
                      </div>
                      <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                        {formatPrice(property.price)}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">تاریخچه بازدیدها</h3>
              <div className="space-y-4">
                {recentViews.map((property) => (
                  <Card key={property.id} padding="lg" hover>
                    <div className="flex items-center gap-4">
                      <Image
                        src={property.images[0]}
                        alt={property.title}
                        width={80}
                        height={80}
                        className="rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{property.title}</h4>
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-2">
                          <MapPin className="h-3 w-3" />
                          <span className="text-sm">{property.location.district}</span>
                        </div>
                        <div className="text-primary-600 dark:text-primary-400 font-semibold">
                          {formatPrice(property.price)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-2">
                          {formatDate(property.createdAt)}
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Eye className="h-3 w-3" />
                          <span className="text-xs">{property.views} بازدید</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">پیام‌ها</h3>
              <div className="space-y-4">
                {[
                  { sender: 'علی احمدی', message: 'سلام، آیا این ملک هنوز موجود است؟', time: '10 دقیقه پیش', unread: true },
                  { sender: 'مریم کریمی', message: 'ممنون از پاسخ شما. چه زمانی می‌توانم بازدید کنم؟', time: '2 ساعت پیش', unread: true },
                  { sender: 'حسن محمدی', message: 'قیمت نهایی چقدر است؟', time: '1 روز پیش', unread: false },
                ].map((msg, index) => (
                  <Card key={index} padding="lg" hover className={msg.unread ? 'border-r-4 border-primary-500' : ''}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {msg.sender.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold mb-1">{msg.sender}</div>
                          <div className="text-gray-600 dark:text-gray-400">{msg.message}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">{msg.time}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">تنظیمات حساب کاربری</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card padding="lg">
                  <h4 className="font-semibold mb-4">اطلاعات شخصی</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">نام و نام خانوادگی</label>
                      <input
                        type="text"
                        value={currentUser.name}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">ایمیل</label>
                      <input
                        type="email"
                        value={currentUser.email}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">شماره موبایل</label>
                      <input
                        type="tel"
                        value={currentUser.phone}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                        readOnly
                      />
                    </div>
                    <Button>ویرایش اطلاعات</Button>
                  </div>
                </Card>

                <Card padding="lg">
                  <h4 className="font-semibold mb-4">تنظیمات اعلان‌ها</h4>
                  <div className="space-y-4">
                    {[
                      { label: 'اعلان املاک جدید', enabled: true },
                      { label: 'اعلان پیام‌های جدید', enabled: true },
                      { label: 'اعلان تغییر قیمت', enabled: false },
                      { label: 'خبرنامه هفتگی', enabled: true },
                    ].map((setting, index) => (
                      <label key={index} className="flex items-center justify-between">
                        <span>{setting.label}</span>
                        <input
                          type="checkbox"
                          checked={setting.enabled}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                      </label>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardPage
