import axios from "axios"

import type {
  OnboardingChatResponse,
  OnboardingMessagePayload,
  StartOnboardingPayload,
} from "../types/onboarding.types"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3002"

const onboardingApi = axios.create({
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

function authHeaders(token?: string) {
  return token ? { Authorization: `Bearer ${token}` } : undefined
}

export async function startOnboarding(
  payload: StartOnboardingPayload,
  token?: string,
): Promise<OnboardingChatResponse> {
  try {
    const { data } = await onboardingApi.post<OnboardingChatResponse>(
      "/onboarding/start",
      payload,
      { headers: authHeaders(token) },
    )
    return data
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

export async function sendOnboardingMessage(
  payload: OnboardingMessagePayload,
  token?: string,
): Promise<OnboardingChatResponse> {
  try {
    const { data } = await onboardingApi.post<OnboardingChatResponse>(
      "/onboarding/message",
      payload,
      { headers: authHeaders(token) },
    )
    return data
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}
