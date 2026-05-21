export type AuthUser = {
  id: string
  name: string
  email: string
  provider?: "LOCAL" | "GOOGLE"
  googleId?: string | null
  createdAt?: string
  updatedAt?: string
}

export type AuthResponse = {
  token: string
  user: AuthUser
}

export type MessageResponse = {
  message: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type SignupPayload = {
  name: string
  email: string
  password: string
}

export type ForgotPasswordPayload = {
  email: string
}

export type ResetPasswordPayload = {
  token: string
  password: string
}
