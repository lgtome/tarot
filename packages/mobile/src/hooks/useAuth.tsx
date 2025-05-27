import { STORAGE_KEYS } from '@/constants/storage.constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

type User = {
  id: string
  email?: string
  name?: string
  provider: 'google' | 'apple' | 'guest'
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isLoggedIn: boolean
  login: (user: User) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isLoggedIn: false,
  login: async () => {},
  logout: async () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER)
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (userData: User) => {
    try {
      setIsLoading(true)

      setUser(userData)

      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)

      setUser(null)

      await AsyncStorage.removeItem(STORAGE_KEYS.USER)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default useAuth
