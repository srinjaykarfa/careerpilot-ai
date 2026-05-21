import { Module } from '@nestjs/common';
import { AiChatController } from './ai-chat.controller';
import { AiChatService } from './ai-chat.service';
import { GroqService } from './services/groq.service';
import { OnboardingAiService } from './services/onboarding-ai.service';
import { RoadmapAiService } from './services/roadmap-ai.service';
import { MentorAiService } from './services/mentor-ai.service';
import { ResumeAiService } from './services/resume-ai.service';

@Module({
  controllers: [AiChatController],
  providers: [
    AiChatService,
    GroqService,
    OnboardingAiService,
    RoadmapAiService,
    MentorAiService,
    ResumeAiService,
  ],
  exports: [AiChatService, OnboardingAiService],
})
export class AiChatModule {}
