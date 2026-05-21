"use client"

import { useAuthStore, type AuthState } from "../store/auth.store"

export function useAuth<T>(selector: (state: AuthState) => T): T {
  return useAuthStore(selector)
}
