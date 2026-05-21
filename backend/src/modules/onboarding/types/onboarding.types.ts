export type OnboardingChatResponse = {
  sessionId: string;
  message: string;
  field?: string;
  step?: string;
  saveMemory: boolean;
  isComplete: boolean;
  progress?: number;
};
