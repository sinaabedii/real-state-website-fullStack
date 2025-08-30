import { useEffect, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'

export function useDarkMode() {
  const [enabledState, setEnabledState] = useLocalStorage<boolean>('dark-mode', true)
  const [isEnabled, setIsEnabled] = useState<boolean>(enabledState)

  useEffect(() => {
    setIsEnabled(enabledState)
  }, [enabledState])

  useEffect(() => {
    const className = 'dark'
    const bodyClass = window.document.documentElement.classList
    
    if (isEnabled) {
      bodyClass.add(className)
    } else {
      bodyClass.remove(className)
    }
  }, [isEnabled])

  const toggle = () => {
    setEnabledState(!isEnabled)
    setIsEnabled(!isEnabled)
  }

  return { isDarkMode: isEnabled, toggleDarkMode: toggle }
}
