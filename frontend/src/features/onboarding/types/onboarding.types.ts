export type OnboardingChatResponse = {
  sessionId: string
  message: string
  field?: string
  step?: string
  saveMemory: boolean
  isComplete: boolean
  progress?: number
}

export type StartOnboardingPayload = {
  userId: string
}

export type OnboardingMessagePayload = {
  userId: string
  message: string
  sessionId?: string
}

export type OnboardingMessage = {
  id: string
  role: "assistant" | "user"
  content: string
}
