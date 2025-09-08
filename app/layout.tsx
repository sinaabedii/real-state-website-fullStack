import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import AppFrame from '@/components/layout/AppFrame'

// Local IranSans font setup (preloaded and applied globally)
const iranSans = localFont({
  src: [
    { path: '../public/fonts/iransansx-light.woff', weight: '300', style: 'normal' },
    { path: '../public/fonts/iransansx-regular.woff', weight: '400', style: 'normal' },
    { path: '../public/fonts/iransansx-bold.woff', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-iran',
})

export const metadata: Metadata = {
  title: 'املاک پلاس - بهترین پلتفرم املاک ایران',
  description: 'جستجو، خرید و فروش املاک با بهترین قیمت‌ها در املاک پلاس',
  keywords: 'املاک، خرید خانه، فروش خانه، اجاره آپارتمان، ویلا، زمین، املاک تجاری',
  authors: [{ name: 'املاک پلاس' }],
  creator: 'املاک پلاس',
  publisher: 'املاک پلاس',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://amlakplus.ir'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'املاک پلاس - بهترین پلتفرم املاک ایران',
    description: 'جستجو، خرید و فروش انواع املاک در سراسر ایران',
    url: 'https://amlakplus.ir',
    siteName: 'املاک پلاس',
    locale: 'fa_IR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'املاک پلاس',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'املاک پلاس - بهترین پلتفرم املاک ایران',
    description: 'جستجو، خرید و فروش انواع املاک در سراسر ایران',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className={`${iranSans.variable} dark`}>
      <head>
      </head>
      <body className={`${iranSans.className} min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 text-gray-900 dark:text-gray-100`}>
        <AppFrame>
          {children}
        </AppFrame>
      </body>
    </html>
  )
}
