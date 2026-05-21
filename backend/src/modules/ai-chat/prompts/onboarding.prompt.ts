export type OnboardingMemory = {
  history: { role: 'user' | 'assistant'; content: string }[];
  profile: Record<string, unknown>;
};

export type OnboardingPromptInput = {
  userMessage: string;
  memory: OnboardingMemory;
};

export function buildOnboardingPrompt({ userMessage, memory }: OnboardingPromptInput): string {
  return `You are Career AI, an onboarding mentor for students. Ask one focused question at a time.
Return ONLY valid JSON with this schema:
{
  "message": string,
  "field": string | null,
  "step": string,
  "saveMemory": boolean,
  "isComplete": boolean,
  "progress": number
}

Rules:
- Ask only one question per response.
- Use dynamic logic based on the memory and the user message.
- If the user just answered a question, set saveMemory=true and field to a stable key.
- When onboarding is complete, set isComplete=true and ask a final confirmation question or provide a short closing message.
- progress is 0-100 based on how complete the onboarding feels.

Memory:
${JSON.stringify(memory)}

User message:
${userMessage}
`;
}
