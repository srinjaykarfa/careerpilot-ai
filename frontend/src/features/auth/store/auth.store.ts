"use client"

import { create } from "zustand"

import type {
  AuthResponse,
  AuthUser,
  LoginPayload,
  SignupPayload,
} from "../types/auth.types"
import { login as loginRequest, signup as signupRequest } from "../api/auth.api"

const AUTH_STORAGE_KEY = "career-ai-auth"

export type AuthState = {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  login: (payload: LoginPayload) => Promise<AuthResponse>
  signup: (payload: SignupPayload) => Promise<AuthResponse>
  setAuth: (auth: AuthResponse) => void
  logout: () => void
  initializeAuth: () => void
}

const isBrowser = typeof window !== "undefined"

const writeAuthToStorage = (auth: AuthResponse) => {
  if (!isBrowser) return
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth))
}

const readAuthFromStorage = (): AuthResponse | null => {
  if (!isBrowser) return null
  const raw = localStorage.getItem(AUTH_STORAGE_KEY)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as AuthResponse
    if (!parsed?.token || !parsed?.user) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

const clearAuthStorage = () => {
  if (!isBrowser) return
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: async (payload) => {
    const response = await loginRequest(payload)
    writeAuthToStorage(response)
    set({
      user: response.user,
      token: response.token,
      isAuthenticated: true,
    })
    return response
  },
  signup: async (payload) => {
    const response = await signupRequest(payload)
    writeAuthToStorage(response)
    set({
      user: response.user,
      token: response.token,
      isAuthenticated: true,
    })
    return response
  },
  setAuth: (auth) => {
    writeAuthToStorage(auth)
    set({ user: auth.user, token: auth.token, isAuthenticated: true })
  },
  logout: () => {
    clearAuthStorage()
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    })
  },
  initializeAuth: () => {
    const stored = readAuthFromStorage()
    if (stored) {
      set({
        user: stored.user,
        token: stored.token,
        isAuthenticated: true,
      })
      return
    }
    clearAuthStorage()
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    })
  },
}))
