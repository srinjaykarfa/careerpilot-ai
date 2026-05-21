import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { OnboardingAiService } from '../ai-chat/services/onboarding-ai.service';
import { StartOnboardingDto } from './dto/start-onboarding.dto';
import { OnboardingMessageDto } from './dto/onboarding-message.dto';
import { OnboardingChatResponse } from './types/onboarding.types';
import {
  createEmptyMemory,
  OnboardingMemory,
  appendAssistantMessage,
  appendUserMessage,
  storeFieldValue,
} from './utils/onboarding-memory';

@Injectable()
export class OnboardingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly onboardingAi: OnboardingAiService,
  ) {}

  async start(dto: StartOnboardingDto): Promise<OnboardingChatResponse> {
    const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    let session = await this.prisma.onboardingSession.findUnique({
      where: { userId: dto.userId },
    });

    if (!session) {
      const memoryJson = createEmptyMemory() as unknown as Prisma.InputJsonValue;
      session = await this.prisma.onboardingSession.create({
        data: {
          userId: dto.userId,
          status: 'IN_PROGRESS',
          memory: memoryJson,
        },
      });
    }

    const memory = (session.memory as OnboardingMemory) ?? createEmptyMemory();
    const aiResponse = await this.onboardingAi.generateNext({
      userMessage: 'start onboarding',
      memory,
    });

    appendAssistantMessage(memory, aiResponse.message);

    const memoryJson = memory as unknown as Prisma.InputJsonValue;
    const updated = await this.prisma.onboardingSession.update({
      where: { id: session.id },
      data: {
        memory: memoryJson,
        currentStep: aiResponse.step ?? session.currentStep,
        currentField: aiResponse.field ?? session.currentField,
        lastMessageAt: new Date(),
      },
    });

    return {
      sessionId: updated.id,
      message: aiResponse.message,
      field: aiResponse.field ?? undefined,
      step: aiResponse.step ?? undefined,
      saveMemory: aiResponse.saveMemory,
      isComplete: aiResponse.isComplete,
      progress: aiResponse.progress,
    };
  }

  async handleMessage(dto: OnboardingMessageDto): Promise<OnboardingChatResponse> {
    const session = await this.findSession(dto.userId, dto.sessionId);
    const memory = (session.memory as OnboardingMemory) ?? createEmptyMemory();

    appendUserMessage(memory, dto.message);

    const aiResponse = await this.onboardingAi.generateNext({
      userMessage: dto.message,
      memory,
    });

    if (aiResponse.saveMemory && aiResponse.field) {
      storeFieldValue(memory, aiResponse.field, dto.message);
    }

    appendAssistantMessage(memory, aiResponse.message);

    await this.prisma.onboardingResponse.create({
      data: {
        sessionId: session.id,
        userId: session.userId,
        step: aiResponse.step ?? undefined,
        field: aiResponse.field ?? undefined,
        question: aiResponse.message,
        answer: dto.message,
      },
    });

    const status = aiResponse.isComplete ? 'COMPLETED' : 'IN_PROGRESS';

    const memoryJson = memory as unknown as Prisma.InputJsonValue;
    await this.prisma.onboardingSession.update({
      where: { id: session.id },
      data: {
        status,
        memory: memoryJson,
        currentStep: aiResponse.step ?? session.currentStep,
        currentField: aiResponse.field ?? session.currentField,
        lastMessageAt: new Date(),
        completedAt: aiResponse.isComplete ? new Date() : null,
      },
    });

    if (aiResponse.isComplete) {
      await this.prisma.careerProfile.upsert({
        where: { userId: session.userId },
        update: {
          summary: memory.profile as unknown as Prisma.InputJsonValue,
        },
        create: {
          userId: session.userId,
          summary: memory.profile as unknown as Prisma.InputJsonValue,
        },
      });
    }

    return {
      sessionId: session.id,
      message: aiResponse.message,
      field: aiResponse.field ?? undefined,
      step: aiResponse.step ?? undefined,
      saveMemory: aiResponse.saveMemory,
      isComplete: aiResponse.isComplete,
      progress: aiResponse.progress,
    };
  }

  private async findSession(userId: string, sessionId?: string) {
    if (sessionId) {
      const session = await this.prisma.onboardingSession.findUnique({
        where: { id: sessionId },
      });
      if (!session || session.userId !== userId) {
        throw new BadRequestException('Invalid session');
      }
      return session;
    }

    const session = await this.prisma.onboardingSession.findUnique({
      where: { userId },
    });

    if (!session) {
      throw new BadRequestException('Onboarding session not found');
    }

    return session;
  }
}
