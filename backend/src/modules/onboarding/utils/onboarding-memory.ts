import { Prisma } from '@prisma/client';

export type OnboardingMemory = {
  history: { role: 'user' | 'assistant'; content: string }[];
  profile: Record<string, Prisma.InputJsonValue>;
};

export function createEmptyMemory(): OnboardingMemory {
  return { history: [], profile: {} };
}

export function appendUserMessage(memory: OnboardingMemory, message: string) {
  memory.history.push({ role: 'user', content: message });
}

export function appendAssistantMessage(memory: OnboardingMemory, message: string) {
  memory.history.push({ role: 'assistant', content: message });
}

export function storeFieldValue(
  memory: OnboardingMemory,
  field: string,
  value: Prisma.InputJsonValue,
) {
  memory.profile[field] = value;
}
