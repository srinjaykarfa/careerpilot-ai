import { Injectable } from '@nestjs/common';
import { buildOnboardingPrompt, OnboardingPromptInput } from '../prompts/onboarding.prompt';
import { GroqService } from './groq.service';
import { extractJsonBlock, safeJsonParse } from '../utils/json';

export type OnboardingAiResponse = {
  message: string;
  field?: string;
  step?: string;
  saveMemory: boolean;
  isComplete: boolean;
  progress?: number;
};

export type OnboardingAiInput = OnboardingPromptInput;

@Injectable()
export class OnboardingAiService {
  constructor(private readonly groq: GroqService) {}

  async generateNext(input: OnboardingAiInput): Promise<OnboardingAiResponse> {
    const prompt = buildOnboardingPrompt(input);
    const text = await this.groq.generateText(prompt);

    const jsonBlock = extractJsonBlock(text) ?? text;
    const parsed = safeJsonParse<OnboardingAiResponse>(jsonBlock);

    if (!parsed || !parsed.message) {
      return {
        message: text.trim() || 'Tell me a bit more about your goals.',
        saveMemory: false,
        isComplete: false,
      };
    }

    const progress =
      typeof parsed.progress === 'number'
        ? Math.min(100, Math.max(0, parsed.progress))
        : undefined;

    return {
      message: parsed.message,
      field: parsed.field,
      step: parsed.step,
      saveMemory: Boolean(parsed.saveMemory),
      isComplete: Boolean(parsed.isComplete),
      progress,
    };
  }
}
