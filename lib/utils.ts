import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fa-IR', {
    style: 'currency',
    currency: 'IRR',
    minimumFractionDigits: 0,
  })
    .format(price)
    .replace('IRR', 'تومان')
}

export function formatArea(area: number): string {
  return `${area.toLocaleString('fa-IR')} متر مربع`
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getPropertyTypeLabel(type: string): string {
  const labels = {
    apartment: 'آپارتمان',
    villa: 'ویلا',
    commercial: 'تجاری',
    land: 'زمین',
    office: 'اداری',
  }
  return labels[type as keyof typeof labels] || type
}

export function getListingTypeLabel(type: string): string {
  const labels = {
    sale: 'فروش',
    rent: 'اجاره',
  }
  return labels[type as keyof typeof labels] || type
}
