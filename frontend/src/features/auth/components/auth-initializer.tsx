"use client"

import { useEffect } from "react"

import { useAuth } from "../hooks/use-auth"

function AuthInitializer() {
  const initializeAuth = useAuth((state) => state.initializeAuth)

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return null
}

export { AuthInitializer }
