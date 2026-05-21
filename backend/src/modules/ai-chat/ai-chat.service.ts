import { Injectable } from '@nestjs/common';
import {
  OnboardingAiInput,
  OnboardingAiResponse,
  OnboardingAiService,
} from './services/onboarding-ai.service';

@Injectable()
export class AiChatService {
  constructor(private readonly onboardingAi: OnboardingAiService) {}

  generateOnboardingResponse(input: OnboardingAiInput): Promise<OnboardingAiResponse> {
    return this.onboardingAi.generateNext(input);
  }
}
