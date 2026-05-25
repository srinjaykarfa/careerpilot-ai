import axios from "axios"

export type AtsCheckResponse = {
  score: number
  matchedKeywords: string[]
  missingKeywords: string[]
  summary: string
  sectionScores: Array<{ section: string; score: number; notes: string }>
  recommendations: string[]
  historyId?: string
}

export type AtsHistoryItem = {
  id: string
  fileName: string
  fileType: string
  score: number
  summary: string
  createdAt: string
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3002"

const resolvedBaseUrl =
  API_BASE_URL.startsWith("http") || API_BASE_URL.startsWith("https")
    ? API_BASE_URL
    : "http://localhost:3002"

const atsApi = axios.create({
  baseURL: resolvedBaseUrl,
})

export async function checkAtsScore(
  resume: File,
  jobDescription: string,
  userId?: string,
): Promise<AtsCheckResponse> {
  const formData = new FormData()
  formData.append("resume", resume)
  formData.append("jobDescription", jobDescription)
  if (userId) {
    formData.append("userId", userId)
  }

  const { data } = await atsApi.post<AtsCheckResponse>(
    "/ai-chat/ats-check",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  )

  return data
}

export async function getAtsHistory(userId?: string): Promise<AtsHistoryItem[]> {
  const { data } = await atsApi.get<AtsHistoryItem[]>("/ai-chat/ats-history", {
    params: userId ? { userId } : undefined,
  })

  return data
}

export async function getAtsHistoryDetail(id: string) {
  const { data } = await atsApi.get(`/ai-chat/ats-history/${id}`)
  return data
}
