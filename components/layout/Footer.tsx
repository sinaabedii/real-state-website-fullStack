"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Home, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from 'lucide-react'

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'دسترسی سریع',
      links: [
        { href: '/properties', label: 'جستجوی املاک' },
        { href: '/agents', label: 'مشاوران املاک' },
        { href: '/about', label: 'درباره ما' },
        { href: '/contact', label: 'تماس با ما' },
      ]
    },
    {
      title: 'خدمات',
      links: [
        { href: '/services/valuation', label: 'ارزیابی ملک' },
        { href: '/services/consultation', label: 'مشاوره املاک' },
        { href: '/services/legal', label: 'خدمات حقوقی' },
        { href: '/services/mortgage', label: 'وام مسکن' },
      ]
    },
    {
      title: 'انواع املاک',
      links: [
        { href: '/properties?type=apartment', label: 'آپارتمان' },
        { href: '/properties?type=villa', label: 'ویلا' },
        { href: '/properties?type=commercial', label: 'تجاری' },
        { href: '/properties?type=land', label: 'زمین' },
      ]
    }
  ]

  const socialLinks = [
    { href: '#', icon: Instagram, label: 'اینستاگرام' },
    { href: '#', icon: Twitter, label: 'توییتر' },
    { href: '#', icon: Facebook, label: 'فیسبوک' },
    { href: '#', icon: Linkedin, label: 'لینکدین' },
  ]

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <Home className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">املاک پلاس</span>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                بهترین پلتفرم جستجو و خرید املاک در ایران. ما به شما کمک می‌کنیم تا خانه رویایی خود را پیدا کنید.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 space-x-reverse text-gray-300">
                  <Phone className="h-4 w-4" />
                  <span>021-1234-5678</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-gray-300">
                  <Mail className="h-4 w-4" />
                  <span>info@amlakplus.ir</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-gray-300">
                  <MapPin className="h-4 w-4" />
                  <span>تهران، خیابان ولیعصر، پلاک 123</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2">عضویت در خبرنامه</h3>
            <p className="text-gray-300 mb-4">از آخرین املاک و پیشنهادات ویژه باخبر شوید</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg hover:from-primary-600 hover:to-accent-600 transition-all duration-200">
                عضویت
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm mb-4 md:mb-0">
            © 2024 املاک پلاس. تمامی حقوق محفوظ است.
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
