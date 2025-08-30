'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Card } from '@/design-system'
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  Search,
  Phone,
} from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  suggestions?: string[]
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'سلام! من دستیار هوشمند املاک پلاس هستم. چطور می‌تونم کمکتون کنم؟',
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        'جستجوی ملک در تهران',
        'محاسبه وام مسکن',
        'قیمت املاک منطقه',
        'مشاوره خرید'
      ]
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickResponses = {
    'جستجوی ملک در تهران': 'برای جستجوی ملک در تهران، می‌تونید از فیلترهای پیشرفته استفاده کنید. چه نوع ملکی دنبال هستید؟ آپارتمان، ویلا یا زمین؟',
    'محاسبه وام مسکن': 'برای محاسبه وام مسکن نیاز به اطلاعاتی مثل درآمد ماهانه، سن و مبلغ پیش پرداخت دارم. درآمد ماهانه‌تون چقدره؟',
    'قیمت املاک منطقه': 'کدوم منطقه رو مدنظر دارید؟ من می‌تونم آخرین قیمت‌های بازار رو براتون بیارم.',
    'مشاوره خرید': 'عالیه! برای مشاوره خرید، بهتره اول بدونم بودجه‌تون چقدره و چه نوع ملکی دنبال هستید؟'
  }

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('سلام') || message.includes('درود')) {
      return 'سلام! خوش اومدید. چطور می‌تونم کمکتون کنم؟'
    }
    
    if (message.includes('قیمت') || message.includes('نرخ')) {
      return 'برای اطلاع از قیمت‌های روز، لطفاً منطقه مورد نظرتون رو بگید. همچنین می‌تونید از بخش جستجو استفاده کنید.'
    }
    
    if (message.includes('وام') || message.includes('تسهیلات')) {
      return 'برای محاسبه وام مسکن، نیاز به اطلاعات درآمد و سن دارم. آیا مایل به ارائه این اطلاعات هستید؟'
    }
    
    if (message.includes('آپارتمان') || message.includes('ویلا') || message.includes('زمین')) {
      return 'عالی! چه منطقه‌ای رو ترجیح می‌دید؟ و بودجه‌تون در چه محدوده‌ای هست؟'
    }
    
    if (message.includes('تهران') || message.includes('اصفهان') || message.includes('مشهد')) {
      return 'منطقه خوبی انتخاب کردید! چه نوع ملکی دنبال هستید؟ برای جستجوی دقیق‌تر می‌تونم شما رو به بخش املاک راهنمایی کنم.'
    }
    
    return 'متوجه نشدم منظورتون چیه. می‌تونید سوالتون رو واضح‌تر بپرسید؟ یا از پیشنهادهای زیر استفاده کنید.'
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = quickResponses[inputText as keyof typeof quickResponses] || generateBotResponse(inputText)
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          'جستجوی ملک در تهران',
          'محاسبه وام مسکن',
          'قیمت املاک منطقه',
          'تماس با مشاور'
        ]
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full shadow-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0"
          size="lg"
        >
          <MessageCircle className="h-8 w-8 text-white" />
        </Button>
        
        {/* Notification Badge */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">1</span>
        </div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] z-50"
          >
            <Card variant="elevated" padding="none" className="h-full flex flex-col overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">دستیار املاک پلاس</h3>
                      <p className="text-xs opacity-90">آنلاین</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      }`}>
                        {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className={`p-3 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-blue-500 text-white rounded-br-md'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md border'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                        </div>
                        
                        {/* Suggestions */}
                        {message.suggestions && message.sender === 'bot' && (
                          <div className="mt-2 space-y-1">
                            {message.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="block w-full text-right p-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-md border">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="پیام خود را بنویسید..."
                    className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className="px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Quick Actions */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleSuggestionClick('جستجوی ملک')}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <Search className="h-3 w-3" />
                    جستجو
                  </button>
                  <button
                    onClick={() => handleSuggestionClick('محاسبه وام')}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <Search className="h-4 w-4" />
                    وام
                  </button>
                  <button
                    onClick={() => handleSuggestionClick('تماس با مشاور')}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <Phone className="h-3 w-3" />
                    تماس
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot
