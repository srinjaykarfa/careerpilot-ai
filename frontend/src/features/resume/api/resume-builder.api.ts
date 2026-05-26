import axios from "axios"

import type {
  ResumeBuilderContent,
  ResumeSaveResponse,
  ResumeStatus,
  SaveResumePayload,
} from "../types/resume-builder.types"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3002"

const resumeApi = axios.create({
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

export async function saveResumeDraft(
  payload: SaveResumePayload,
): Promise<ResumeSaveResponse> {
  try {
    const { data } = await resumeApi.post<ResumeSaveResponse>(
      "/resumes/save",
      payload,
    )
    return data
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

export async function getLatestResume(
  userId: string,
  status?: ResumeStatus,
): Promise<{ id: string; content: ResumeBuilderContent; status: ResumeStatus } | null> {
  const { data } = await resumeApi.get(
    "/resumes/latest",
    status ? { params: { userId, status } } : { params: { userId } },
  )

  return data ?? null
}

export async function getResumeById(id: string) {
  const { data } = await resumeApi.get(`/resumes/${id}`)
  return data
}
