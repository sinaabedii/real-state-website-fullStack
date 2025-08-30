import { Property, Agent, User } from '@/types'

export const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'علی احمدی',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    phone: '09123456789',
    email: 'ali.ahmadi@example.com',
    rating: 4.8,
    reviewsCount: 127,
    isVerified: true,
    specialties: ['آپارتمان', 'ویلا', 'تجاری']
  },
  {
    id: '2',
    name: 'مریم کریمی',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    phone: '09123456788',
    email: 'maryam.karimi@example.com',
    rating: 4.9,
    reviewsCount: 89,
    isVerified: true,
    specialties: ['آپارتمان', 'اداری']
  },
  {
    id: '3',
    name: 'حسن محمدی',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    phone: '09123456787',
    email: 'hassan.mohammadi@example.com',
    rating: 4.7,
    reviewsCount: 156,
    isVerified: true,
    specialties: ['ویلا', 'زمین']
  }
]

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'آپارتمان لوکس در نیاوران',
    description: 'آپارتمان 120 متری با امکانات کامل در بهترین نقطه نیاوران',
    price: 15000000000,
    area: 120,
    bedrooms: 2,
    bathrooms: 2,
    parkingSpaces: 1,
    propertyType: 'apartment',
    listingType: 'sale',
    location: {
      address: 'تهران، نیاوران، خیابان شهید بهشتی',
      city: 'تهران',
      district: 'نیاوران',
      coordinates: { lat: 35.7219, lng: 51.4677 }
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
    ],
    amenities: ['پارکینگ', 'انباری', 'آسانسور', 'بالکن', 'سیستم گرمایشی', 'سیستم سرمایشی'],
    yearBuilt: 2018,
    floorNumber: 3,
    totalFloors: 5,
    hasElevator: true,
    hasBalcony: true,
    hasStorage: true,
    agent: mockAgents[0],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    views: 245,
    isFeatured: true,
    status: 'active'
  },
  {
    id: '2',
    title: 'ویلای مدرن در لواسان',
    description: 'ویلای 300 متری دوبلکس با حیاط 500 متری، استخر و باغچه. مناسب برای خانواده‌های بزرگ.',
    price: 35000000000,
    area: 300,
    bedrooms: 4,
    bathrooms: 3,
    parkingSpaces: 2,
    hasElevator: false,
    hasBalcony: true,
    hasStorage: true,
    propertyType: 'villa',
    listingType: 'sale',
    location: {
      city: 'تهران',
      district: 'لواسان',
      address: 'لواسان بالا، خیابان کوهستان، کوچه صنوبر',
      coordinates: { lat: 35.8217, lng: 51.6122 }
    },
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'
    ],
    amenities: ['پارکینگ', 'حیاط', 'استخر', 'باربیکیو'],
    yearBuilt: 2020,
    agent: mockAgents[1],
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    views: 189,
    isFeatured: true,
    status: 'active'
  },
  {
    id: '3',
    title: 'آپارتمان اجاره‌ای در ولنجک',
    description: 'آپارتمان 85 متری مبله در منطقه ولنجک، مناسب برای اجاره کوتاه مدت یا بلند مدت.',
    price: 25000000,
    area: 85,
    bedrooms: 2,
    bathrooms: 1,
    parkingSpaces: 1,
    hasElevator: true,
    hasBalcony: false,
    hasStorage: true,
    propertyType: 'apartment',
    listingType: 'rent',
    location: {
      city: 'تهران',
      district: 'ولنجک',
      address: 'خیابان ولنجک، کوچه دوم، پلاک 8',
      coordinates: { lat: 35.7797, lng: 51.4026 }
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600'
    ],
    amenities: ['پارکینگ', 'لابی', 'نگهبانی 24 ساعته'],
    yearBuilt: 2019,
    floorNumber: 2,
    totalFloors: 8,
    agent: mockAgents[0],
    createdAt: '2024-01-12T09:15:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
    views: 156,
    isFeatured: false,
    status: 'active'
  },
  {
    id: '4',
    title: 'دفتر کار در مرکز شهر',
    description: 'فضای اداری 200 متری در برج تجاری مدرن، مناسب برای شرکت‌های کوچک و متوسط.',
    price: 45000000,
    area: 200,
    bedrooms: 0,
    bathrooms: 2,
    parkingSpaces: 3,
    hasElevator: true,
    hasBalcony: false,
    hasStorage: true,
    propertyType: 'office',
    listingType: 'rent',
    location: {
      city: 'تهران',
      district: 'میدان ولیعصر',
      address: 'میدان ولیعصر، برج تجاری پارسیان، طبقه 12',
      coordinates: { lat: 35.7219, lng: 51.4056 }
    },
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600'
    ],
    amenities: ['پارکینگ', 'انباری', 'آسانسور', 'سیستم تهویه', 'اینترنت پرسرعت'],
    yearBuilt: 2019,
    floorNumber: 12,
    totalFloors: 20,
    agent: mockAgents[0],
    createdAt: '2024-01-08T16:45:00Z',
    updatedAt: '2024-01-08T16:45:00Z',
    views: 98,
    isFeatured: false,
    status: 'active'
  },
  {
    id: '5',
    title: 'زمین مسکونی در کرج',
    description: 'زمین 500 متری در منطقه مسکونی کرج، مناسب برای ساخت ویلا یا مجتمع مسکونی.',
    price: 8000000000,
    area: 500,
    bedrooms: 0,
    bathrooms: 0,
    parkingSpaces: 0,
    hasElevator: false,
    hasBalcony: false,
    hasStorage: false,
    propertyType: 'land',
    listingType: 'sale',
    location: {
      city: 'کرج',
      district: 'گوهردشت',
      address: 'گوهردشت، فاز 2، خیابان گلها',
      coordinates: { lat: 35.7308, lng: 50.9915 }
    },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600'
    ],
    amenities: ['دسترسی به جاده اصلی'],
    agent: mockAgents[1],
    createdAt: '2024-01-05T11:20:00Z',
    updatedAt: '2024-01-05T11:20:00Z',
    views: 67,
    isFeatured: false,
    status: 'active'
  },
  {
    id: '6',
    title: 'مغازه تجاری در بازار',
    description: 'مغازه 50 متری در مرکز بازار، مناسب برای کسب و کارهای خرده فروشی.',
    price: 12000000000,
    area: 50,
    bedrooms: 0,
    bathrooms: 1,
    parkingSpaces: 0,
    hasElevator: false,
    hasBalcony: false,
    hasStorage: true,
    propertyType: 'commercial',
    listingType: 'sale',
    location: {
      city: 'تهران',
      district: 'بازار',
      address: 'بازار بزرگ، راسته طلافروشان',
      coordinates: { lat: 35.6892, lng: 51.4097 }
    },
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600'
    ],
    amenities: ['انباری', 'دسترسی آسان', 'ترافیک بالا'],
    agent: mockAgents[1],
    createdAt: '2024-01-03T13:10:00Z',
    updatedAt: '2024-01-03T13:10:00Z',
    views: 134,
    isFeatured: false,
    status: 'active'
  }
]

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'احمد رضایی',
    email: 'ahmad.rezaei@example.com',
    phone: '09121234567',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'user',
    isVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
    preferences: {
      propertyTypes: ['apartment', 'villa'],
      priceRange: { min: 5000000000, max: 20000000000 },
      locations: ['تهران', 'کرج']
    }
  },
  {
    id: '2',
    name: 'فاطمه موسوی',
    email: 'fateme.mousavi@example.com',
    phone: '09129876543',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    role: 'agent',
    isVerified: true,
    createdAt: '2023-12-15T00:00:00Z'
  }
]
