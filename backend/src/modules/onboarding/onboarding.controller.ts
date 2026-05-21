import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { StartOnboardingDto } from './dto/start-onboarding.dto';
import { OnboardingMessageDto } from './dto/onboarding-message.dto';
import { OnboardingChatResponse } from './types/onboarding.types';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post('start')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  start(@Body() dto: StartOnboardingDto): Promise<OnboardingChatResponse> {
    return this.onboardingService.start(dto);
  }

  @Post('message')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  message(@Body() dto: OnboardingMessageDto): Promise<OnboardingChatResponse> {
    return this.onboardingService.handleMessage(dto);
  }
}
