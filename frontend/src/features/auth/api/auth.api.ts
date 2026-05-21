import axios from "axios"

import type {
  AuthResponse,
  ForgotPasswordPayload,
  LoginPayload,
  MessageResponse,
  ResetPasswordPayload,
  SignupPayload,
} from "../types/auth.types"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3002"

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

type ApiErrorResponse = {
  message?: string | string[]
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorResponse | undefined

    if (Array.isArray(data?.message) && data.message.length > 0) {
      return data.message[0]
    }

    if (typeof data?.message === "string") {
      return data.message
    }

    if (error.message) {
      return error.message
    }
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return "Something went wrong. Please try again."
}

export async function signup(payload: SignupPayload): Promise<AuthResponse> {
  try {
    const { data } = await authApi.post<AuthResponse>("/auth/signup", payload)
    return data
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  try {
    const { data } = await authApi.post<AuthResponse>("/auth/login", payload)
    return data
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

export async function forgotPassword(
  payload: ForgotPasswordPayload,
): Promise<MessageResponse> {
  try {
    const { data } = await authApi.post<MessageResponse>(
      "/auth/forgot-password",
      payload,
    )
    return data
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

export async function resetPassword(
  payload: ResetPasswordPayload,
): Promise<MessageResponse> {
  try {
    const { data } = await authApi.post<MessageResponse>(
      "/auth/reset-password",
      payload,
    )
    return data
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

export function getGoogleAuthUrl(): string {
  return `${API_BASE_URL}/auth/google`
}
